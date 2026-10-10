"""Prepared full private rehearsal. Requires NEW explicit full-test approval.
Four independent FTPS sessions; never production activation or host commands.
"""
import argparse
from concurrent.futures import ThreadPoolExecutor
import hashlib
import json
import os
from pathlib import Path
import re
from threading import Event
import time

import ftps_parallel_sample as sample
import ftps_release_rehearsal as serial
import ftps_transport as tls

APPROVAL = 'PRIVATE_FULL_PARALLEL_REHEARSAL'
A = ('37884284506','fcef4f76f77e30d383bd59c33af84292392d550f',
     'f0da119bbbffc8330fa117409dcca99c9fda9d3964b0022a1ec184fc75294081')
B = (sample.SOURCE_RUN,sample.REVISION,sample.DIGEST)


def upload(sessions, revision, payload):
    if len(sessions) != 4 or not tls.SHA.fullmatch(revision):
        raise ValueError('Four verified sessions and exact SHA required')
    for name in payload: serial.release.safe(name)
    started=time.monotonic(); control=sessions[0]
    control.mkd(revision); control.cwd(revision)
    parents={name.rsplit('/',1)[0] for name in payload if '/' in name}
    directories=set()
    for parent in parents:
        parts=parent.split('/')
        directories.update('/'.join(parts[:depth]) for depth in range(1,len(parts)+1))
    for directory in sorted(directories,key=lambda name:(name.count('/'),name)):
        control.mkd(directory)
    for ftp in sessions[1:]: ftp.cwd(revision)
    stop=Event();items=[(name,name,data) for name,data in sorted(payload.items())]
    with ThreadPoolExecutor(max_workers=4) as pool:
        futures=[pool.submit(sample.copy_bucket,ftp,items[index::4],stop) for index,ftp in enumerate(sessions)]
        results=[future.result() for future in futures]
    if sum(result['verified_files'] for result in results) != len(payload):
        raise ValueError('Incomplete full release')
    complete={'revision':revision,'files':len(payload),
              'payload_sha256':hashlib.sha256(payload['manifest.json']).hexdigest()}
    # Generic private completion only after all readbacks. No assets_verified flag.
    serial.put_verified(control,'COMPLETE.json',(json.dumps(complete,sort_keys=True)+'\n').encode())
    modes=dict(control.mlsd('application/bootstrap'))
    result={'revision':revision,'files':len(payload),'bytes':sum(map(len,payload.values())),
            'seconds':round(time.monotonic()-started,3),'workers':results,
            'bootstrap_cache_unix_mode':modes.get('cache',{}).get('unix.mode')}
    for ftp in sessions: ftp.cwd('..')
    return result


def run(archive_a,archive_b,run_id,attempt,factory=tls.VerifiedFTPS):
    if os.environ.get('MPA_TRS_PRIVATE_APPROVAL') != APPROVAL or os.environ.get('GITHUB_REF') != sample.BRANCH:
        raise ValueError('Separate full private approval required')
    if not all(re.fullmatch(r'[0-9]{1,20}',value) for value in (run_id,attempt)):
        raise ValueError('Invalid test identity')
    user=os.environ.get('MPA_TRS_FTPS_PROBE_USER');password=os.environ.get('MPA_TRS_FTPS_PROBE_PASSWORD')
    if user != tls.PROBE_USER or not password: raise ValueError('Probe credentials required')
    payloads=[serial.payload(path,identity[1],identity[2],identity[0]) for path,identity in ((archive_a,A),(archive_b,B))]
    sessions=[];reports=[];leaf='full-parallel-'+run_id+'-'+attempt
    try:
        for _ in range(4):
            ftp,report=tls.connect_tls(factory);sessions.append(ftp)
            ftp.login(user,password);ftp.prot_p();ftp.set_pasv(True)
            tls.verify_probe_root(ftp);reports.append(report)
        control=sessions[0]
        if 'probes' not in dict(control.mlsd()): control.mkd('probes')
        control.cwd('probes');control.mkd(leaf);control.cwd(leaf);control.mkd('releases');control.cwd('releases')
        for ftp in sessions[1:]: ftp.cwd('probes/'+leaf+'/releases')
        measurements=[upload(sessions,identity[1],payload) for identity,payload in zip((A,B),payloads)]
        control.cwd('..');serial.put_verified(control,'active-release',(A[1]+'\n').encode())
        serial.replace_selector(control,B[1],A[1],{A[1],B[1]},1)
        serial.replace_selector(control,A[1],B[1],{A[1],B[1]},2)
        for identity in (A,B):
            completed=json.loads(tls.read_small(control,'releases/'+identity[1]+'/COMPLETE.json',512))
            if completed['revision'] != identity[1]: raise ValueError('Retained release identity mismatch')
        report={'success':True,'certificate_verified':True,'full_release_verified':True,
                'production_activation':False,'web_runtime_verified':False,'atomicity_verified':False,
                'connections':4,'rename_over_existing_verified':True,'private_selector_sequence':[A[1],B[1],A[1]],
                'measurements':measurements,'tls':reports,'run_id':run_id,'attempt':attempt,
                'remote_relative_directory':'probes/'+leaf}
        serial.put_verified(control,'receipt.json',(json.dumps(report,sort_keys=True)+'\n').encode())
        return report
    finally:
        for ftp in sessions: ftp.close()


def main():
    parser=argparse.ArgumentParser(description=__doc__)
    for name in ('archive-a','archive-b','run-id','attempt','report'): parser.add_argument('--'+name,required=True)
    args=parser.parse_args()
    try: result=run(args.archive_a,args.archive_b,args.run_id,args.attempt)
    except Exception as error: result={'success':False,'error_type':type(error).__name__,'production_activation':False}
    Path(args.report).parent.mkdir(parents=True,exist_ok=True)
    Path(args.report).write_text(json.dumps(result,indent=2,sort_keys=True)+'\n')
    print(json.dumps(result,sort_keys=True));raise SystemExit(0 if result['success'] else 1)


if __name__=='__main__': main()
