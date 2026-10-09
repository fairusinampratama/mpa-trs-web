"""Approved private-only file transfer/selector rehearsal. No web activation."""
import argparse
import hashlib
import io
import json
import os
from pathlib import Path
import re
import time
import zipfile

import application_release as release
import ftps_transport as transport


def payload(archive, revision, digest, source_run):
    manifest = release.verify(archive, revision)
    if manifest['build']['run_id'] != source_run:
        raise ValueError('Wrong source run')
    if not transport.DIGEST.fullmatch(digest) or hashlib.sha256(Path(archive).read_bytes()).hexdigest() != digest:
        raise ValueError('Wrong approved digest')
    # The bounded archive verifier runs before any file is extracted or uploaded.
    with zipfile.ZipFile(archive) as z:
        return {name: z.read(name) for name in z.namelist()}


def put_verified(ftp, name, data):
    release.safe(name)
    ftp.storbinary('STOR ' + name, io.BytesIO(data))
    size, digest = transport.read_digest(ftp, name, len(data))
    if size != len(data) or digest != hashlib.sha256(data).hexdigest():
        raise ValueError('Uploaded file integrity mismatch')


def upload_new_release(ftp, revision, files):
    if not transport.SHA.fullmatch(revision):
        raise ValueError('Invalid revision')
    started = time.monotonic()
    ftp.mkd(revision)  # Existing or partial destinations are never overwritten.
    ftp.cwd(revision)
    created = set()
    for count, (name, data) in enumerate(sorted(files.items()), 1):
        release.safe(name)
        parts = name.split('/')
        for depth in range(1, len(parts)):
            parent = '/'.join(parts[:depth])
            if parent not in created:
                ftp.mkd(parent)
                created.add(parent)
        put_verified(ftp, name, data)
        if count % 250 == 0:
            print(json.dumps({'revision': revision, 'verified_files': count,
                              'elapsed_seconds': round(time.monotonic()-started, 3)}), flush=True)
    # This completion record is last, and absent on failed/partial uploads.
    completed = (json.dumps({'revision': revision, 'files': len(files),
                            'payload_sha256': hashlib.sha256(files['manifest.json']).hexdigest()},
                           sort_keys=True) + '\n').encode()
    put_verified(ftp, 'COMPLETE.json', completed)
    facts = dict(ftp.mlsd('application/bootstrap'))
    mode = facts.get('cache', {}).get('unix.mode')
    ftp.cwd('..')
    return {'revision': revision, 'files': len(files),
            'bytes': sum(map(len, files.values())), 'seconds': round(time.monotonic()-started, 3),
            'bootstrap_cache_unix_mode': mode,
            'owner_write_permission_verified': bool(mode and int(mode, 8) & 0o200)}


def replace_selector(ftp, revision, expected_previous, complete_revisions, sequence):
    if revision not in complete_revisions or not transport.SHA.fullmatch(revision):
        raise ValueError('Incomplete release cannot be selected')
    if transport.read_small(ftp, 'active-release', 41) != (expected_previous+'\n').encode():
        raise ValueError('Unexpected prior selector; stop, do not overwrite')
    candidate = 'candidate-' + str(sequence)
    put_verified(ftp, candidate, (revision+'\n').encode())
    # Real overwrite semantics must pass privately before production implementation.
    # No delete-then-rename fallback; rejection leaves the old marker intact.
    ftp.rename(candidate, 'active-release')
    if transport.read_small(ftp, 'active-release', 41) != (revision+'\n').encode():
        raise ValueError('Selector replacement mismatch')


def rehearse(archive_a, revision_a, digest_a, source_a,
             archive_b, revision_b, digest_b, source_b, run_id, attempt,
             factory=transport.VerifiedFTPS):
    if revision_a == revision_b or not all(re.fullmatch(r'[0-9]{1,20}', x) for x in (source_a, source_b, run_id, attempt)):
        raise ValueError('Distinct verified releases and bounded run identity required')
    a = payload(archive_a, revision_a, digest_a, source_a)
    b = payload(archive_b, revision_b, digest_b, source_b)
    user = os.environ.get('MPA_TRS_FTPS_PROBE_USER', '')
    password = os.environ.get('MPA_TRS_FTPS_PROBE_PASSWORD', '')
    if user != transport.PROBE_USER or not password:
        raise ValueError('Only approved private probe credentials permitted')
    ftp, report = transport.connect_tls(factory)
    try:
        ftp.login(user, password)
        ftp.prot_p()
        ftp.set_pasv(True)
        root = transport.verify_probe_root(ftp)
        if 'probes' not in root:
            ftp.mkd('probes')
        ftp.cwd('probes')
        leaf = 'release-rehearsal-' + run_id + '-' + attempt
        ftp.mkd(leaf)
        ftp.cwd(leaf)
        ftp.mkd('releases')
        ftp.cwd('releases')
        measurements = [upload_new_release(ftp, revision_a, a), upload_new_release(ftp, revision_b, b)]
        ftp.cwd('..')
        put_verified(ftp, 'active-release', (revision_a+'\n').encode())
        replace_selector(ftp, revision_b, revision_a, {revision_a, revision_b}, 1)
        replace_selector(ftp, revision_a, revision_b, {revision_a, revision_b}, 2)
        # Retained release metadata still readable; never delete old files.
        for revision in (revision_a, revision_b):
            complete = json.loads(transport.read_small(ftp, 'releases/'+revision+'/COMPLETE.json', 512))
            if complete['revision'] != revision:
                raise ValueError('Retained release identity mismatch')
        report.update({'success': True, 'production_activation': False,
                       'private_selector_sequence': [revision_a, revision_b, revision_a],
                       'rename_over_existing_verified': True, 'atomicity_verified': False,
                       'web_runtime_verified': False, 'measurements': measurements,
                       'remote_relative_directory': 'probes/'+leaf})
        put_verified(ftp, 'receipt.json', (json.dumps(report, sort_keys=True)+'\n').encode())
        return report
    finally:
        ftp.close()


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    for variant in ('a', 'b'):
        for field in ('archive', 'revision', 'digest', 'source'):
            parser.add_argument('--'+field+'-'+variant, required=True)
    parser.add_argument('--run-id', required=True)
    parser.add_argument('--attempt', required=True)
    parser.add_argument('--report', required=True)
    args = parser.parse_args()
    try:
        report = rehearse(args.archive_a, args.revision_a, args.digest_a, args.source_a,
                          args.archive_b, args.revision_b, args.digest_b, args.source_b,
                          args.run_id, args.attempt)
    except Exception as error:
        # No arbitrary server text, paths from exceptions or credential values.
        report = {'success': False, 'error_type': type(error).__name__, 'production_activation': False}
    Path(args.report).parent.mkdir(parents=True, exist_ok=True)
    Path(args.report).write_text(json.dumps(report, sort_keys=True, indent=2)+'\n')
    print(json.dumps(report, sort_keys=True))
    raise SystemExit(0 if report['success'] else 1)


if __name__ == '__main__':
    main()
