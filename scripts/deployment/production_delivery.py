"""Manual, separately approved FTPS production delivery. No host commands or deletion.
Not usable before scoped accounts, private rename proof and initial cPanel bootstrap.
"""
import argparse
import ftplib
import hashlib
import io
import json
import os
from pathlib import Path
import re
import time

import ftps_transport as tls
import ftps_release_rehearsal as files

ROLES = {
    'runtime': ('mpatrs_runtime@mapalatursina.my.id', b'mpa-trs-production-runtime:v1\n'),
    'assets': ('mpatrs_assets@mapalatursina.my.id', b'mpa-trs-production-assets:v1\n'),
}
MARKER = '.mpa-trs-production-root'


def login_role(role, factory=tls.VerifiedFTPS):
    username, identity = ROLES[role]
    prefix = 'MPA_TRS_FTPS_' + role.upper()
    if os.environ.get(prefix+'_USER') != username or not os.environ.get(prefix+'_PASSWORD'):
        raise ValueError('Dedicated role credentials required')
    ftp, report = tls.connect_tls(factory)
    try:
        ftp.login(username, os.environ[prefix+'_PASSWORD'])
        ftp.prot_p(); ftp.set_pasv(True)
        if ftp.pwd() != '/':
            raise ValueError('Role root mismatch')
        ftp.cwd('..')
        if ftp.pwd() != '/':
            raise ValueError('Role parent escape')
        for path in ('/public_html', '/eletter', '/home/mapp5848'):
            try: ftp.cwd(path)
            except ftplib.error_perm: continue
            raise ValueError('Role jail mismatch')
        if tls.read_small(ftp, MARKER) != identity:
            raise ValueError('Role root identity mismatch')
        inventory = dict(ftp.mlsd())
        permitted = {'.', '..', '.ftpquota', MARKER}
        if role == 'assets':
            permitted.add('.htaccess')
            if tls.read_small(ftp, '.htaccess', 1024) != (Path(__file__).parent/'assets.htaccess').read_bytes():
                raise ValueError('Public metadata protection missing')
        if role == 'runtime':
            permitted |= {'releases', 'shared', 'rollback-originals'}
            if not {'releases','shared'} <= inventory.keys():
                raise ValueError('Bootstrap missing')
        if any(name not in permitted and not (role == 'assets' and tls.SHA.fullmatch(name) and fact.get('type') == 'dir')
               for name, fact in inventory.items()):
            raise ValueError('Unexpected role root inventory')
        return ftp, report
    except Exception:
        ftp.close(); raise


def read_selector(ftp):
    return tls.read_small(ftp, 'shared/active-release', 41)


def expected_selector(previous):
    if previous == 'NONE':
        return b'NONE\n'  # A private bootstrap marker, never a served revision.
    if not tls.SHA.fullmatch(previous):
        raise ValueError('Invalid prior revision')
    return (previous+'\n').encode()


def public_payload(payload, revision):
    prefix = 'application/public/mpa-trs-assets/'+revision+'/'
    public = {name.removeprefix(prefix): data for name,data in payload.items()
              if name.startswith(prefix) and name != prefix+'manifest.json'}
    if not public or any(not re.fullmatch(r'assets/[A-Za-z0-9_.-]+\.css', name) for name in public):
        raise ValueError('Only versioned compiled CSS permitted publicly')
    return public


def completion(ftp, revision):
    if not tls.SHA.fullmatch(revision):
        raise ValueError('Invalid release')
    data = json.loads(tls.read_small(ftp, 'releases/'+revision+'/COMPLETE.json', 4096))
    if data.get('revision') != revision or data.get('assets_verified') is not True or not tls.DIGEST.fullmatch(data.get('archive_sha256','')):
        raise ValueError('Release readiness missing')
    return data


def activate(ftp, revision, previous, run_id):
    if not re.fullmatch(r'[0-9]{1,20}', run_id):
        raise ValueError('Invalid activation run')
    completion(ftp, revision)
    if read_selector(ftp) != expected_selector(previous):
        raise ValueError('Unexpected active revision; stop')
    candidate = 'shared/candidate-'+run_id
    files.put_verified(ftp, candidate, (revision+'\n').encode())
    # Preserve old selector until daemon replacement succeeds. No unlink fallback.
    ftp.rename(candidate, 'shared/active-release')
    if read_selector(ftp) != (revision+'\n').encode():
        raise ValueError('Activation readback mismatch')


def deliver(archive, revision, digest, source_run, previous, run_id, factory=tls.VerifiedFTPS, stage_only=False):
    expected_selector(previous)
    if stage_only and previous != "NONE":
        raise ValueError("Private initial staging requires NONE selector")
    if not all(re.fullmatch(r'[0-9]{1,20}', value) for value in (source_run,run_id)):
        raise ValueError('Invalid release run identity')
    payload = files.payload(archive, revision, digest, source_run)
    public = public_payload(payload, revision)
    runtime, runtime_tls = login_role('runtime', factory)
    assets = None
    try:
        if read_selector(runtime) != expected_selector(previous):
            raise ValueError('Unexpected active revision before upload')
        if previous != 'NONE': completion(runtime, previous)
        assets, assets_tls = login_role('assets', factory)
        # Public static CSS first, under a new exact SHA namespace; no overwrite.
        assets.mkd(revision); assets.cwd(revision)
        started = time.monotonic()
        for name,data in sorted(public.items()):
            if 'assets' not in dict(assets.mlsd()): assets.mkd('assets')
            files.put_verified(assets, name, data)
        assets.cwd('..')
        runtime.cwd('releases')
        measured = files.upload_new_release(runtime, revision, payload)
        # Generic upload completion cannot activate production: replace with readiness
        # only AFTER all public assets and private files are verified.
        ready = {'revision':revision, 'assets_verified': True,
                 'archive_sha256':digest, 'source_run':source_run,
                 'manifest_sha256':hashlib.sha256(payload['manifest.json']).hexdigest(),
                 'public': {name: hashlib.sha256(data).hexdigest() for name,data in public.items()}}
        files.put_verified(runtime, revision+'/COMPLETE.json', (json.dumps(ready,sort_keys=True)+'\n').encode())
        runtime.cwd('..')
        if not stage_only:
            activate(runtime, revision, previous, run_id)
        return {'success': True, 'revision':revision, 'previous':previous,
                'archive_sha256':digest, 'source_run':source_run,
                'transfer': measured, 'total_seconds':round(time.monotonic()-started,3),
                'runtime_tls':runtime_tls, 'assets_tls':assets_tls,
                'public':ready['public'],
                'selector_readback_verified': not stage_only, 'stage_only':stage_only,
                'live_health_verified':False,
                'atomicity_verified':False}
    finally:
        runtime.close()
        if assets: assets.close()


def rollback(revision, previous, run_id, factory=tls.VerifiedFTPS):
    expected_selector(previous)
    runtime, report = login_role('runtime', factory)
    assets = None
    try:
        ready = completion(runtime, revision)
        assets, _ = login_role('assets', factory)
        # Verify retained runtime against its immutable manifest and public CSS.
        raw_manifest = tls.read_small(runtime, 'releases/'+revision+'/manifest.json', 2*1024*1024)
        if hashlib.sha256(raw_manifest).hexdigest() != ready.get('manifest_sha256'):
            raise ValueError('Retained manifest corruption')
        manifest = json.loads(raw_manifest)
        if manifest.get('source_commit') != revision or manifest.get('schema') != 2:
            raise ValueError('Retained manifest identity mismatch')
        for name, info in manifest['files'].items():
            files.release.safe(name)
            if tls.read_digest(runtime, 'releases/'+revision+'/'+name, info['size']) != (info['size'],info['sha256']):
                raise ValueError('Retained runtime corruption')
        for name,digest in ready['public'].items():
            if not re.fullmatch(r'assets/[A-Za-z0-9_.-]+\.css', name):
                raise ValueError('Invalid public readiness path')
            info = manifest['files']['application/public/mpa-trs-assets/'+revision+'/'+name]
            if tls.read_digest(assets, revision+'/'+name, info['size']) != (info['size'],digest):
                raise ValueError('Retained CSS corruption')
        activate(runtime, revision, previous, run_id)
        return {'success':True,'revision':revision,'previous':previous,
                'public':ready['public'],
                'rollback_selector_verified':True,'live_health_verified':False,'tls':report}
    finally:
        runtime.close()
        if assets: assets.close()


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('action', choices=['stage','deploy','rollback'])
    for name in ('revision','previous','run-id','report'):
        parser.add_argument('--'+name, required=True)
    for name in ('archive','digest','source-run'):
        parser.add_argument('--'+name)
    args = parser.parse_args()
    if os.environ.get('MPA_TRS_PRODUCTION_APPROVAL') != 'APPROVED_PRODUCTION_OPERATION':
        raise SystemExit('Separate production approval required')
    try:
        result = (deliver(args.archive,args.revision,args.digest,args.source_run,args.previous,args.run_id,stage_only=args.action == 'stage')
                  if args.action in ('stage','deploy') else rollback(args.revision,args.previous,args.run_id))
    except Exception as error:
        result = {'success':False,'error_type':type(error).__name__,'live_health_verified':False}
    Path(args.report).parent.mkdir(parents=True,exist_ok=True)
    Path(args.report).write_text(json.dumps(result,sort_keys=True,indent=2)+'\n')
    print(json.dumps(result,sort_keys=True))
    raise SystemExit(0 if result['success'] else 1)


if __name__ == '__main__':
    main()
