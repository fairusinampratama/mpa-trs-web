"""Verified explicit FTPS: credential-free TLS discovery or approved private archive probe.
No production activation, extraction, mirroring, deletion, or command execution.
"""
import argparse
import ftplib
import hashlib
import io
import json
import os
from pathlib import Path
import re
import ssl

HOST = 'tokala.iixcp.rumahweb.net'
PORT = 21
PROBE_USER = 'mpatrs_probe@mapalatursina.my.id'
SENTINEL = b'mpa-trs-ftps-probe:v1\n'
SHA = re.compile(r'[a-f0-9]{40}')
DIGEST = re.compile(r'[a-f0-9]{64}')

class VerifiedFTPS(ftplib.FTP_TLS):
    def ntransfercmd(self, cmd, rest=None):
        # Reuse the verified control TLS session when supported by the FTP daemon.
        # Certificate verification remains enabled for the protected data socket.
        if not self._prot_p:
            raise ValueError('Encrypted data channel required')
        conn, size = ftplib.FTP.ntransfercmd(self, cmd, rest)
        try:
            conn = self.context.wrap_socket(conn, server_hostname=self.host, session=self.sock.session)
        except Exception:
            conn.close()
            raise
        return conn, size

def tls_context():
    context = ssl.create_default_context()
    context.minimum_version = ssl.TLSVersion.TLSv1_2
    return context

def connect_tls(factory=VerifiedFTPS):
    ftp = factory(context=tls_context(), timeout=30)
    try:
        ftp.connect(HOST, PORT)
        ftp.auth()  # Fail before any USER/PASS command if TLS or its certificate fails.
        cert = ftp.sock.getpeercert()
        report = {'host': HOST, 'port': PORT, 'mode': 'explicit-ftps',
                  'certificate_verified': True, 'tls_version': ftp.sock.version(),
                  'cipher': ftp.sock.cipher()[0], 'certificate_expires': cert.get('notAfter'),
                  'certificate_sha256': hashlib.sha256(ftp.sock.getpeercert(binary_form=True)).hexdigest(),
                  'certificate_dns_names': [v for k,v in cert.get('subjectAltName', ()) if k=='DNS']}
        return ftp, report
    except Exception:
        ftp.close()
        raise

def read_digest(ftp, name, limit):
    size = 0; digest = hashlib.sha256()
    def consume(chunk):
        nonlocal size
        size += len(chunk)
        if size > limit: raise ValueError('Remote download exceeds expected bounds')
        digest.update(chunk)
    ftp.retrbinary('RETR '+name, consume)
    return size, digest.hexdigest()

def read_small(ftp, name, limit=512):
    output = bytearray()
    def consume(chunk):
        output.extend(chunk)
        if len(output)>limit: raise ValueError('Unexpected root marker size')
    ftp.retrbinary('RETR '+name, consume)
    return bytes(output)

def verify_probe_root(ftp):
    if ftp.pwd() != '/': raise ValueError('Expected a directory-jailed FTP root')
    ftp.cwd('..')
    if ftp.pwd() != '/': raise ValueError('FTP root escape')
    # These paths must not be reachable. Never list or read an existing app.
    for name in ['/public_html', '/eletter', '/home/mapp5848']:
        try: ftp.cwd(name)
        except ftplib.error_perm: continue
        raise ValueError('FTP jail not verified')
    if read_small(ftp, '.mpa-trs-ftps-probe-root') != SENTINEL:
        raise ValueError('Dedicated private probe root marker missing')
    entries = dict(ftp.mlsd())
    if set(entries) - {'.', '..', '.ftpquota', '.mpa-trs-ftps-probe-root', 'probes'}:
        raise ValueError('Unexpected FTP root inventory')
    if 'probes' in entries and entries['probes'].get('type') != 'dir':
        raise ValueError('Unexpected probe directory type')
    return entries

def private_probe(archive, revision, expected_digest, source_run, run_id, attempt, factory=VerifiedFTPS):
    if not SHA.fullmatch(revision) or not DIGEST.fullmatch(expected_digest) or not all(re.fullmatch(r'[0-9]{1,20}', x) for x in (source_run, run_id, attempt)):
        raise ValueError('Invalid probe identity')
    user = os.environ.get('MPA_TRS_FTPS_PROBE_USER', '')
    password = os.environ.get('MPA_TRS_FTPS_PROBE_PASSWORD', '')
    if user != PROBE_USER or not password: raise ValueError('Dedicated approved FTP credentials required')
    from application_release import verify
    manifest = verify(archive, revision)
    if manifest['build']['run_id'] != source_run:
        raise ValueError('Source run metadata mismatch')
    archive = Path(archive)
    if hashlib.sha256(archive.read_bytes()).hexdigest()!=expected_digest:
        raise ValueError('Approved artifact digest mismatch')
    ftp, report = connect_tls(factory)
    try:
        ftp.login(user, password)
        ftp.prot_p()
        ftp.set_pasv(True)
        root = verify_probe_root(ftp)
        if 'probes' not in root: ftp.mkd('probes')
        ftp.cwd('probes')
        leaf = revision+'-'+run_id+'-'+attempt
        ftp.mkd(leaf)  # Refuse an existing destination; never overwrite or synchronize.
        ftp.cwd(leaf)
        with archive.open('rb') as stream: ftp.storbinary('STOR release.zip', stream)
        size, actual = read_digest(ftp, 'release.zip', archive.stat().st_size)
        if size != archive.stat().st_size or actual!=expected_digest:
            raise ValueError('FTPS roundtrip integrity mismatch')
        report.update({'source_commit':revision, 'source_run':source_run,
                       'archive_sha256':actual, 'archive_bytes':size,
                       'remote_relative_directory':'probes/'+leaf,
                       'protected_data_roundtrip_verified':True, 'activation':False})
        receipt = (json.dumps(report,sort_keys=True,indent=2)+'\n').encode()
        ftp.storbinary('STOR receipt.json', io.BytesIO(receipt))
        if read_small(ftp,'receipt.json',8192)!=receipt: raise ValueError('Receipt integrity mismatch')
        return report
    finally:
        ftp.close()

def main():
    p=argparse.ArgumentParser(description=__doc__)
    p.add_argument('action',choices=['tls','private-probe']); p.add_argument('--report',required=True)
    for name in ['archive','revision','digest','source-run','run-id','attempt']: p.add_argument('--'+name)
    args=p.parse_args()
    try:
        if args.action=='tls':
            ftp, report=connect_tls(); ftp.close(); report['authenticated']=False
        else:
            report=private_probe(args.archive,args.revision,args.digest,args.source_run,args.run_id,args.attempt)
        result={'success':True,**report}
    except Exception as error:
        # Never serialize arbitrary server errors or credential-related details.
        result={'success':False,'host':HOST,'port':PORT,'error_type':type(error).__name__}
        if isinstance(error,ssl.SSLCertVerificationError): result['certificate_verify_code']=error.verify_code
    Path(args.report).parent.mkdir(parents=True,exist_ok=True)
    Path(args.report).write_text(json.dumps(result,sort_keys=True,indent=2)+'\n')
    print(json.dumps(result,sort_keys=True))
    raise SystemExit(0 if result['success'] else 1)

if __name__=='__main__': main()
