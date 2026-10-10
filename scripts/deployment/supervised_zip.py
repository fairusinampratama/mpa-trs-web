"""Approved ZIP transport and activation; extraction/copy are supervised cPanel steps.
Never commands, deletion, public FTP access, or a file-by-file application upload.
"""
import argparse
import ftplib
import hashlib
import io
import json
import os
from pathlib import Path
import re
import stat
import urllib.request
import zipfile

import application_release as release
import ftps_transport as tls
from ftps_release_rehearsal import payload, put_verified

USER = 'mpatrs_runtime@mapalatursina.my.id'
MARKER = '.mpa-trs-production-root'
IDENTITY = b'mpa-trs-production-runtime:v1\n'
ROOTS = {'incoming', 'releases', 'shared', 'verification', 'rollback-originals'}
CRITICAL = ('REVISION', 'application/REVISION', 'application/vendor/autoload.php',
            'application/bootstrap/app.php', 'manifest.json', 'SHA256SUMS')


def selector(value):
    if value != 'NONE' and not tls.SHA.fullmatch(value):
        raise ValueError('Invalid expected selector')
    return (value+'\n').encode()


def connect(factory=tls.VerifiedFTPS):
    if os.environ.get('MPA_TRS_FTPS_RUNTIME_USER') != USER or not os.environ.get('MPA_TRS_FTPS_RUNTIME_PASSWORD'):
        raise ValueError('Dedicated private runtime credentials required')
    ftp, report = tls.connect_tls(factory)
    try:
        ftp.login(USER, os.environ['MPA_TRS_FTPS_RUNTIME_PASSWORD'])
        ftp.prot_p(); ftp.set_pasv(True)
        if ftp.pwd() != '/': raise ValueError('Wrong private root')
        ftp.cwd('..')
        if ftp.pwd() != '/': raise ValueError('Parent escape')
        for path in ('/public_html', '/eletter', '/home/mapp5848'):
            try: ftp.cwd(path)
            except ftplib.error_perm: continue
            raise ValueError('Private jail escape')
        if tls.read_small(ftp, MARKER) != IDENTITY: raise ValueError('Wrong root identity')
        inventory = dict(ftp.mlsd())
        if set(inventory) - ROOTS - {'.', '..', '.ftpquota', MARKER}:
            raise ValueError('Unexpected private root entries')
        if not ROOTS <= inventory.keys() or any(inventory[n].get('type') != 'dir' for n in ROOTS):
            raise ValueError('Private bootstrap incomplete')
        return ftp, report
    except Exception:
        ftp.close(); raise


def read_bounded(ftp, name, limit):
    return tls.read_small(ftp, name, limit)


def verify_snapshot(snapshot, expected, revision):
    """Compare File Manager recompression against every trusted release byte.
    Accept its SHA-directory prefix and directory entries, never arbitrary extras.
    """
    if not tls.SHA.fullmatch(revision) or len(snapshot) > release.MAX_TOTAL:
        raise ValueError('Invalid extraction snapshot')
    parents = {''}
    for name in expected:
        release.safe(name)
        parts = name.split('/')
        parents.update('/'.join(parts[:i]) for i in range(1, len(parts)))
    found = {}; seen = set(); total = 0
    with zipfile.ZipFile(io.BytesIO(snapshot)) as z:
        infos = z.infolist()
        if len(infos) > release.MAX_ENTRIES * 2: raise ValueError('Snapshot entry bound')
        prefixed = any(i.filename == revision+'/' or i.filename.startswith(revision+'/') for i in infos)
        for info in infos:
            raw = info.filename
            if raw in seen: raise ValueError('Duplicate snapshot path')
            seen.add(raw)
            if prefixed:
                if not raw.startswith(revision+'/'): raise ValueError('Mixed snapshot roots')
                name = raw[len(revision)+1:]
            else: name = raw
            mode = info.external_attr >> 16
            if info.flag_bits & 1 or stat.S_ISLNK(mode): raise ValueError('Unsafe snapshot type')
            if info.is_dir():
                directory = name.rstrip('/')
                if directory: release.safe(directory)
                if directory not in parents or info.file_size: raise ValueError('Unexpected snapshot directory')
                continue
            release.safe(name)
            if stat.S_IFMT(mode) not in (0, stat.S_IFREG) or name not in expected or name in found:
                raise ValueError('Unexpected snapshot file')
            total += info.file_size
            if total > release.MAX_TOTAL or info.file_size > release.MAX_FILE or info.file_size != len(expected[name]):
                raise ValueError('Snapshot expansion bound or size mismatch')
            data = z.read(info)
            if data != expected[name]: raise ValueError('Extracted file integrity mismatch')
            found[name] = True
    if set(found) != set(expected): raise ValueError('Incomplete extraction snapshot')
    return {'files':len(found), 'bytes':total, 'snapshot_sha256':hashlib.sha256(snapshot).hexdigest()}


def css_files(expected, revision):
    prefix = 'application/public/mpa-trs-assets/'+revision+'/'
    result = {n[len(prefix):]:b for n,b in expected.items() if n.startswith(prefix) and not n.endswith('/manifest.json')}
    if not result or any(not re.fullmatch(r'assets/[A-Za-z0-9_.-]+\.css', n) for n in result):
        raise ValueError('Only compiled CSS can be published')
    return result


def verify_css(expected, revision, getter=None):
    def download(path, limit):
        url='https://mapalatursina.my.id/mpa-trs-assets/'+revision+'/'+path
        with urllib.request.urlopen(url, timeout=30) as response:
            if response.geturl() != url or response.status != 200: raise ValueError('CSS redirect or response mismatch')
            return response.read(limit+1)
    for name,data in css_files(expected, revision).items():
        if (getter or download)(name, len(data)) != data: raise ValueError('Published CSS integrity mismatch')


def verify_critical(ftp, expected, revision):
    for name in CRITICAL:
        if name not in expected: raise ValueError('Critical release file missing')
        if read_bounded(ftp,'releases/'+revision+'/'+name,len(expected[name])) != expected[name]:
            raise ValueError('Critical remote file mismatch')
    # Observe real filesystem permissions, not recompressed ZIP metadata.
    for directory, names in [('releases/'+revision+'/application/bootstrap', ['app.php','cache']),
                             ('shared/storage/framework', ['cache','sessions','views']),
                             ('shared/storage', ['logs'])]:
        facts=dict(ftp.mlsd(directory))
        for name in names:
            mode=facts.get(name,{}).get('unix.mode','')
            if (facts.get(name,{}).get('type') != ('file' if name=='app.php' else 'dir')
                or not re.fullmatch(r'[0-7]{3,4}',mode) or int(mode,8)&0o022 or not int(mode,8)&0o400):
                raise ValueError('Unknown or unsafe filesystem permissions')
            if name != 'app.php' and int(mode,8)&0o300 != 0o300:
                raise ValueError('Owner directory access missing')


    env=dict(ftp.mlsd('shared')).get('.env',{})
    if env.get('type')!='file' or env.get('unix.mode') not in ('0600','600'):
        raise ValueError('Private environment must be owner-only')


def upload(ftp, archive, expected, revision):
    if not tls.SHA.fullmatch(revision):
        raise ValueError('Invalid archive destination identity')
    data=Path(archive).read_bytes()
    ftp.mkd('incoming/'+revision)  # Existing/partial namespaces are never overwritten.
    # The verified transport envelope is a ZIP; payload file validation correctly
    # forbids nested archives and must not be relaxed for this private transfer.
    destination='incoming/'+revision+'/application.zip'
    ftp.storbinary('STOR '+destination,io.BytesIO(data))
    size,digest=tls.read_digest(ftp,destination,len(data))
    if size != len(data) or digest != hashlib.sha256(data).hexdigest():
        raise ValueError('Uploaded archive integrity mismatch')
    put_verified(ftp,'incoming/'+revision+'/archive.sha256',(hashlib.sha256(data).hexdigest()+'\n').encode())
    return {'zip_bytes':len(data), 'zip_upload_readback_verified':True, 'activation':False}


def ready(ftp, expected, revision, digest, source_run):
    snapshot=read_bounded(ftp,'verification/'+revision+'.zip',release.MAX_TOTAL)
    checked=verify_snapshot(snapshot,expected,revision)
    verify_critical(ftp,expected,revision)
    verify_css(expected,revision)
    record={'revision':revision,'archive_sha256':digest,'source_run':source_run,
            'manifest_sha256':hashlib.sha256(expected['manifest.json']).hexdigest(),
            'extraction_verified':True,'assets_verified':True,**checked}
    destination='releases/'+revision+'/COMPLETE.json'
    if 'COMPLETE.json' in dict(ftp.mlsd('releases/'+revision)):
        raise ValueError('Release already completed; no overwrite')
    put_verified(ftp,destination,(json.dumps(record,sort_keys=True)+'\n').encode())
    return record


def activate(ftp, expected, revision, digest, previous, run_id):
    if not re.fullmatch(r'[0-9]{1,20}',run_id): raise ValueError('Invalid activation identity')
    record=json.loads(read_bounded(ftp,'releases/'+revision+'/COMPLETE.json',4096))
    if (record.get('revision') != revision or record.get('archive_sha256') != digest
        or record.get('manifest_sha256') != hashlib.sha256(expected['manifest.json']).hexdigest()
        or record.get('extraction_verified') is not True or record.get('assets_verified') is not True):
        raise ValueError('Verified extraction and assets required')
    verify_critical(ftp,expected,revision); verify_css(expected,revision)
    if read_bounded(ftp,'shared/active-release',41) != selector(previous):
        raise ValueError('Unexpected previous release')
    candidate='shared/candidate-'+run_id
    if candidate.split('/')[-1] in dict(ftp.mlsd('shared')): raise ValueError('Candidate already exists')
    put_verified(ftp,candidate,selector(revision))
    ftp.rename(candidate,'shared/active-release')  # No delete fallback, no atomicity claim.
    if read_bounded(ftp,'shared/active-release',41) != selector(revision): raise ValueError('Selector readback mismatch')
    return {'revision':revision,'previous':previous,'selector_verified':True,'live_verified':False,
            'atomicity_verified':False,'retained_full_tree_reread':False}


def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('action',choices=['upload','verify-extracted','activate','rollback'])
    for name in ('archive','revision','digest','source-run','previous','run-id','report'):
        parser.add_argument('--'+name,required=True)
    args=parser.parse_args()
    if os.environ.get('MPA_TRS_PRODUCTION_APPROVAL') != 'APPROVED_SUPERVISED_ZIP_OPERATION' or os.environ.get('GITHUB_REF') != 'refs/heads/main':
        raise SystemExit('Approved main-only production operation required')
    result={'success':False,'action':args.action,'production_activation':False}
    ftp=None
    try:
        selector(args.previous)
        expected=payload(args.archive,args.revision,args.digest,args.source_run)
        css_files(expected,args.revision)
        ftp,report=connect()
        if read_bounded(ftp,'shared/active-release',41) != selector(args.previous): raise ValueError('Prior selector changed')
        if args.action=='upload': outcome=upload(ftp,args.archive,expected,args.revision)
        elif args.action=='verify-extracted': outcome=ready(ftp,expected,args.revision,args.digest,args.source_run)
        else: outcome=activate(ftp,expected,args.revision,args.digest,args.previous,args.run_id)
        result.update(success=True,tls=report,outcome=outcome,production_activation=args.action in ('activate','rollback'))
    except Exception as error:
        result['error_type']=type(error).__name__  # Never print arbitrary exception/credential text.
    finally:
        if ftp: ftp.close()
    Path(args.report).parent.mkdir(parents=True,exist_ok=True)
    Path(args.report).write_text(json.dumps(result,indent=2,sort_keys=True)+'\n')
    print(json.dumps(result,sort_keys=True));raise SystemExit(0 if result['success'] else 1)

if __name__=='__main__': main()

