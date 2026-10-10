"""Approved 64-file private sample, four TLS sessions, harmless selector only.
This is not a complete application release or production activation proof.
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

import ftps_transport as tls
import ftps_release_rehearsal as transfer

SOURCE_RUN = '37895631691'
REVISION = 'b76876e6ca5944feb2365d0347798004f658962d'
DIGEST = '29a2dc8d50041ffc7601700e0a13298ab9d47d35d89ca6319f0106002b6e84fd'
BRANCH = 'refs/heads/stage1/private-parallel-sample'
APPROVAL = 'PRIVATE_PARALLEL_SAMPLE'


def select_sample(payload):
    names = sorted(name for name in payload if name.startswith('application/vendor/') and name.endswith('.php'))
    if len(names) < 64:
        raise ValueError('Insufficient vendor sample')
    selected = [names[index*(len(names)-1)//63] for index in range(64)]
    items = []
    for index, name in enumerate(selected):
        transfer.release.safe(name)
        items.append(('files/sample-%03d.php' % index, name, payload[name]))
    if sum(len(data) for _, _, data in items) > 8*1024*1024:
        raise ValueError('Sample exceeds 8 MiB budget')
    return items


def copy_bucket(ftp, items, stop):
    started = time.monotonic()
    verified = 0
    try:
        for remote, source, data in items:
            if stop.is_set():
                raise ValueError('Sibling transfer failed')
            transfer.put_verified(ftp, remote, data)
            verified += 1
        return {'verified_files':verified, 'seconds':round(time.monotonic()-started, 3)}
    except Exception:
        stop.set()
        raise


def selector_cycle(ftp):
    transfer.put_verified(ftp, 'sample-selector', b'A\n')
    for sequence, previous, target in ((1,b'A\n',b'B\n'),(2,b'B\n',b'A\n')):
        if tls.read_small(ftp,'sample-selector',2) != previous:
            raise ValueError('Unexpected sample selector')
        candidate = 'sample-candidate-'+str(sequence)
        transfer.put_verified(ftp,candidate,target)
        ftp.rename(candidate,'sample-selector')
        if tls.read_small(ftp,'sample-selector',2) != target:
            raise ValueError('Sample selector replacement mismatch')
    return ['A','B','A']


def run(archive, run_id, attempt, factory=tls.VerifiedFTPS):
    if not all(re.fullmatch(r'[0-9]{1,20}', value) for value in (run_id,attempt)):
        raise ValueError('Invalid run identity')
    if os.environ.get('MPA_TRS_PRIVATE_APPROVAL') != APPROVAL or os.environ.get('GITHUB_REF') != BRANCH:
        raise ValueError('Exact private branch and approved operation required')
    user = os.environ.get('MPA_TRS_FTPS_PROBE_USER')
    password = os.environ.get('MPA_TRS_FTPS_PROBE_PASSWORD')
    if user != tls.PROBE_USER or not password:
        raise ValueError('Dedicated probe credentials required')
    items = select_sample(transfer.payload(archive,REVISION,DIGEST,SOURCE_RUN))
    sessions = []
    reports = []
    leaf = 'concurrency-selector-'+run_id+'-'+attempt
    started = time.monotonic()
    try:
        # All four independent jails/TLS sessions pass BEFORE any write.
        for _ in range(4):
            ftp, report = tls.connect_tls(factory)
            sessions.append(ftp)
            ftp.login(user,password); ftp.prot_p(); ftp.set_pasv(True)
            tls.verify_probe_root(ftp)
            reports.append(report)
        setup = sessions[0]
        if 'probes' not in dict(setup.mlsd()): setup.mkd('probes')
        setup.cwd('probes'); setup.mkd(leaf); setup.cwd(leaf)
        setup.mkd('files')
        for ftp in sessions[1:]: ftp.cwd('probes/'+leaf)
        stop = Event()
        transfer_started = time.monotonic()
        with ThreadPoolExecutor(max_workers=4) as pool:
            futures = [pool.submit(copy_bucket,ftp,items[index::4],stop) for index,ftp in enumerate(sessions)]
            measured = [future.result() for future in futures]
        elapsed = round(time.monotonic()-transfer_started,3)
        if sum(worker['verified_files'] for worker in measured) != 64:
            raise ValueError('Incomplete sample')
        # Capture actual upload modes; do not assume PHP ownership/writeability.
        modes = {name:fact.get('unix.mode') for name,fact in setup.mlsd('files')}
        sequence = selector_cycle(setup)
        result = {'success':True,'sample_only':True,'full_release_verified':False,
                  'production_activation':False,'atomicity_verified':False,
                  'rename_over_existing_verified':True,'selector_sequence':sequence,
                  'source_commit':REVISION,'source_run':SOURCE_RUN,'archive_sha256':DIGEST,
                  'run_id':run_id,'attempt':attempt,'connections':4,'verified_files':64,
                  'sample_bytes':sum(len(data) for _,_,data in items),
                  'transfer_seconds':elapsed,'total_seconds':round(time.monotonic()-started,3),
                  'workers':measured,'tls':reports,'observed_modes':modes,
                  'remote_relative_directory':'probes/'+leaf,
                  'files':[{'remote':remote,'source':source,'bytes':len(data),'sha256':hashlib.sha256(data).hexdigest()} for remote,source,data in items]}
        transfer.put_verified(setup,'sample-receipt.json',(json.dumps(result,sort_keys=True)+'\n').encode())
        return result
    finally:
        for ftp in sessions: ftp.close()


def main():
    parser=argparse.ArgumentParser(description=__doc__)
    for name in ('archive','run-id','attempt','report'): parser.add_argument('--'+name,required=True)
    args=parser.parse_args()
    try: result=run(args.archive,args.run_id,args.attempt)
    except Exception as error:
        result={'success':False,'error_type':type(error).__name__,'sample_only':True,'production_activation':False}
    Path(args.report).parent.mkdir(parents=True,exist_ok=True)
    Path(args.report).write_text(json.dumps(result,indent=2,sort_keys=True)+'\n')
    print(json.dumps(result,sort_keys=True))
    raise SystemExit(0 if result['success'] else 1)


if __name__ == '__main__': main()
