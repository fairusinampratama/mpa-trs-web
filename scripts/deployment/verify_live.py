"""Read-only HTTPS revision/assets/private-file smoke checks; no login or commands."""
import argparse
import hashlib
import json
import re
import ssl
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

BASE = 'https://mapalatursina.my.id'


def get(path, limit=2*1024*1024):
    request=urllib.request.Request(BASE+path,headers={'Cache-Control':'no-cache','User-Agent':'MPA-TRS-release-verification'})
    try:
        with urllib.request.urlopen(request,timeout=30,context=ssl.create_default_context()) as response:
            target=urllib.parse.urlsplit(response.url)
            if target.scheme!='https' or target.hostname not in {'mapalatursina.my.id','www.mapalatursina.my.id'}:
                raise ValueError('Unexpected live redirect')
            body=response.read(limit+1)
            if len(body)>limit: raise ValueError('Live response too large')
            return response.status,body
    except urllib.error.HTTPError as error:
        return error.code,b''  # Never capture possible private content on denial.


def verify(revision, ready, fetch=get):
    if not re.fullmatch(r'[a-f0-9]{40}',revision) or ready.get('revision')!=revision or not ready.get('public'):
        raise ValueError('Invalid live verification identity')
    status,raw=fetch('/health')
    if status!=200 or json.loads(raw)!={'status':'ok','revision':revision}:
        raise ValueError('Live revision mismatch')
    status,html=fetch('/')
    if status!=200 or b'MAPALA TURSINA' not in html:
        raise ValueError('Landing failed')
    assets=[]
    expected_assets = {'/mpa-trs-assets/'+revision+'/'+path for path in ready['public']}
    linked_assets = {value.decode() for value in re.findall(rb'/mpa-trs-assets/[a-f0-9]{40}/assets/[A-Za-z0-9_.-]+\.css',html)}
    if linked_assets != expected_assets: raise ValueError('Mixed or missing CSS revisions')
    for path,digest in ready['public'].items():
        if not re.fullmatch(r'assets/[A-Za-z0-9_.-]+\.css',path) or not re.fullmatch(r'[a-f0-9]{64}',digest):
            raise ValueError('Invalid CSS identity')
        url='/mpa-trs-assets/'+revision+'/'+path
        if url.encode() not in html: raise ValueError('Mixed landing asset revision')
        status,data=fetch(url)
        if status!=200 or hashlib.sha256(data).hexdigest()!=digest:
            raise ValueError('Live CSS mismatch')
        assets.append(url)
    for path in ('/.env','/composer.json','/manifest.json','/application/vendor/autoload.php',
                 '/mpa-trs-assets/.mpa-trs-production-root','/mpa-trs-assets/.ftpquota','/mpa-trs-assets/.htaccess',
                 '/mpa-trs/production/shared/.env','/mpa-trs/production/releases/'+revision+'/manifest.json'):
        if fetch(path)[0] not in {403,404}:
            raise ValueError('Private URL not denied')
    return {'success':True,'revision':revision,'https_verified':True,'css':assets,
            'private_url_denial_verified':True,'browser_rendering_verified':False,
            'existing_app_regressions_verified':False}


if __name__=='__main__':
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--revision',required=True)
    source=parser.add_mutually_exclusive_group(required=True)
    source.add_argument('--ready');source.add_argument('--archive')
    parser.add_argument('--report',required=True); args=parser.parse_args()
    try:
        if args.archive:
            from application_release import verify as verify_archive
            from supervised_zip import css_files
            import zipfile
            verify_archive(args.archive,args.revision)
            with zipfile.ZipFile(args.archive) as z: expected={n:z.read(n) for n in z.namelist()}
            ready={'revision':args.revision,'public':{n:hashlib.sha256(b).hexdigest() for n,b in css_files(expected,args.revision).items()}}
        else: ready=json.loads(Path(args.ready).read_text())
        result=verify(args.revision,ready)
    except Exception as error:
        result={'success':False,'error_type':type(error).__name__}
    Path(args.report).parent.mkdir(parents=True,exist_ok=True)
    Path(args.report).write_text(json.dumps(result,sort_keys=True,indent=2)+'\n')
    print(json.dumps(result,sort_keys=True)); raise SystemExit(0 if result['success'] else 1)

