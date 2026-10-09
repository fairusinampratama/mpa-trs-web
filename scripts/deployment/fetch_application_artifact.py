"""Fetch one successful same-repository Laravel Actions artifact; never use FTP credentials."""
import argparse
import hashlib
import io
import json
import os
from pathlib import Path
import re
import stat
import urllib.parse
import urllib.request
import zipfile
from application_release import MAX_TOTAL, verify

REPO='fairusinampratama/mpa-trs-web'
BASE='https://api.github.com/repos/'+REPO

class SafeRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self,req,fp,code,msg,headers,newurl):
        dest=urllib.parse.urlsplit(newurl)
        if dest.scheme!='https' or dest.username or dest.password:
            raise ValueError('Unsafe artifact redirect')
        redirected=super().redirect_request(req,fp,code,msg,headers,newurl)
        if dest.netloc!=urllib.parse.urlsplit(req.full_url).netloc:
            redirected.remove_header('Authorization')
        return redirected

def get(url,limit,token):
    request=urllib.request.Request(url,headers={'Authorization':'Bearer '+token,'Accept':'application/vnd.github+json','X-GitHub-Api-Version':'2022-11-28'})
    with urllib.request.build_opener(SafeRedirect()).open(request,timeout=60) as response:
        data=response.read(limit+1)
        if len(data)>limit: raise ValueError('Actions response exceeds bound')
        return data

def validate_run(run,revision):
    if run.get('conclusion')!='success' or run.get('status')!='completed' or run.get('head_sha')!=revision or run.get('head_repository',{}).get('full_name')!=REPO or run.get('path') not in {'.github/workflows/ci.yml','.github/workflows/package-application.yml'}:
        raise ValueError('Untrusted or unsuccessful source workflow')

def select_artifact(items,revision):
    artifacts=[x for x in items if x.get('name')=='application-'+revision]
    if len(artifacts)!=1 or artifacts[0].get('expired') or not re.fullmatch(r'sha256:[a-f0-9]{64}',artifacts[0].get('digest','')) or not isinstance(artifacts[0].get('id'),int) or not 0<artifacts[0].get('size_in_bytes',0)<=MAX_TOTAL+1024*1024:
        raise ValueError('Invalid exact source artifact')
    return artifacts[0]

def unpack(wrapper,artifact,revision,expected,source_run,destination):
    if hashlib.sha256(wrapper).hexdigest()!=artifact['digest'].removeprefix('sha256:'):
        raise ValueError('Trusted Actions artifact digest mismatch')
    name='application-'+revision+'.zip'
    with zipfile.ZipFile(io.BytesIO(wrapper)) as z:
        infos=z.infolist()
        if len(infos)!=2 or set(z.namelist())!={name,name+'.sha256'} or any(i.is_dir() or i.flag_bits&1 or i.file_size>MAX_TOTAL for i in infos) or sum(i.file_size for i in infos)>MAX_TOTAL+512:
            raise ValueError('Invalid Actions wrapper inventory')
        # The wrapper is created by Actions and may omit Unix mode information;
        # symlinks remain forbidden and inner archive modes are verified strictly.
        if any(stat.S_ISLNK(i.external_attr>>16) for i in infos): raise ValueError('Actions wrapper symlink')
        release=z.read(name); checksum=z.read(name+'.sha256')
    if hashlib.sha256(release).hexdigest()!=expected or checksum!=(expected+'  '+name+'\n').encode():
        raise ValueError('Approved release checksum mismatch')
    dest=Path(destination); dest.mkdir(parents=True,exist_ok=True)
    path=dest/name
    with path.open('xb') as stream: stream.write(release)
    manifest=verify(path,revision)
    if manifest['build']['run_id']!=source_run: raise ValueError('Release source run mismatch')
    return path

def main():
    p=argparse.ArgumentParser(description=__doc__)
    p.add_argument('--run',required=True);p.add_argument('--revision',required=True);p.add_argument('--digest',required=True);p.add_argument('--destination',required=True)
    a=p.parse_args()
    if not re.fullmatch(r'[0-9]{1,20}',a.run) or not re.fullmatch(r'[a-f0-9]{40}',a.revision) or not re.fullmatch(r'[a-f0-9]{64}',a.digest): raise ValueError('Invalid release identity')
    token=os.environ.get('GH_TOKEN','')
    if not token: raise ValueError('Read-only Actions token missing')
    run=json.loads(get(BASE+'/actions/runs/'+a.run,2*1024*1024,token));validate_run(run,a.revision)
    page=json.loads(get(BASE+'/actions/runs/'+a.run+'/artifacts?per_page=100',2*1024*1024,token))
    if page.get('total_count',0)>100: raise ValueError('Artifact list exceeds bounded page')
    artifact=select_artifact(page['artifacts'],a.revision)
    wrapper=get(BASE+'/actions/artifacts/'+str(artifact['id'])+'/zip',MAX_TOTAL+1024*1024,token)
    path=unpack(wrapper,artifact,a.revision,a.digest,a.run,a.destination)
    print('Verified exact successful Actions release '+a.revision)

if __name__=='__main__': main()
