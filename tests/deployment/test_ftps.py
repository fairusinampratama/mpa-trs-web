import ftplib
import hashlib
import importlib.util
import json
import os
from pathlib import Path
import ssl
import sys
import tempfile
import unittest
from unittest.mock import patch
import urllib.request
import zipfile

SCRIPTS=Path(__file__).resolve().parents[2]/'scripts/deployment'
sys.path.insert(0,str(SCRIPTS))
import ftps_transport as f
import fetch_application_artifact as fetch
import application_release as release

class FakeSocket:
    def getpeercert(self,binary_form=False): return b'certificate' if binary_form else {'subjectAltName':[('DNS',f.HOST)],'notAfter':'test'}
    def version(self): return 'TLSv1.3'
    def cipher(self): return ('TLS_AES_256_GCM_SHA384','TLSv1.3',256)

class FakeFTP:
    def __init__(self,**kwargs):
        self.context=kwargs['context']; self.sock=FakeSocket(); self.secure=False; self.protected=False; self.location='/'; self.commands=[]; self.closed=False
        self.files={'.mpa-trs-ftps-probe-root':f.SENTINEL}; self.dirs=set()
    def connect(self,host,port): self.commands.append(('connect',host,port))
    def auth(self): self.secure=True; self.commands.append(('tls',))
    def close(self): self.closed=True
    def login(self,user,password):
        if not self.secure: raise AssertionError('Plain credentials')
        self.commands.append(('login',))
    def prot_p(self): self.protected=True; self.commands.append(('protect',))
    def set_pasv(self,mode): assert mode
    def pwd(self): return self.location
    def cwd(self,name):
        if name=='..': return
        if name.startswith('/'): raise ftplib.error_perm('550 unavailable')
        self.location=self.location.rstrip('/')+'/'+name
    def mlsd(self):
        if not self.protected: raise AssertionError('Unencrypted inventory')
        return [('.mpa-trs-ftps-probe-root',{'type':'file'})]
    def mkd(self,name):
        dest=self.location+'/'+name
        if dest in self.dirs: raise ftplib.error_perm('550 exists')
        self.dirs.add(dest);self.commands.append(('mkdir',name))
    def storbinary(self,command,stream):
        if not self.protected: raise AssertionError('Unencrypted upload')
        self.commands.append(('store',command)); self.files[command[5:]]=stream.read()
    def retrbinary(self,command,callback):
        if not self.protected: raise AssertionError('Unencrypted download')
        callback(self.files[command[5:]])

class FTPSTests(unittest.TestCase):
    def setUp(self):
        self.temp=tempfile.TemporaryDirectory();self.root=Path(self.temp.name);self.sha='a'*40
        fixture={'composer.json':'{}','composer.lock':json.dumps({'packages':[{'name':'laravel/framework'}]}),'vendor/composer/installed.json':json.dumps({'dev':False,'packages':[{'name':'laravel/framework'}]}),'vendor/autoload.php':'<?php','bootstrap/app.php':'<?php','public/build/manifest.json':json.dumps({'resources/css/app.css':{'file':'assets/app.css'}}),'public/build/assets/app.css':'body{}'}
        for name,data in fixture.items():
            p=self.root/'application'/name;p.parent.mkdir(parents=True,exist_ok=True);p.write_text(data)
        self.archive=self.root/'app.zip';release.package(self.root,self.sha,self.archive,run='123')
        self.digest=hashlib.sha256(self.archive.read_bytes()).hexdigest()
        self.ftp=None
    def tearDown(self): self.temp.cleanup()
    def factory(self,**kwargs): self.ftp=FakeFTP(**kwargs);return self.ftp
    def run_probe(self,**kwargs):
        with patch.dict(os.environ,{'MPA_TRS_FTPS_PROBE_USER':f.PROBE_USER,'MPA_TRS_FTPS_PROBE_PASSWORD':'synthetic-test-value'}):
            return f.private_probe(self.archive,self.sha,kwargs.get('digest',self.digest),'123','456','1',kwargs.get('factory',self.factory))
    def test_tls_requires_valid_certificate_and_tls12(self):
        context=f.tls_context();self.assertTrue(context.check_hostname);self.assertEqual(context.verify_mode,ssl.CERT_REQUIRED);self.assertGreaterEqual(context.minimum_version,ssl.TLSVersion.TLSv1_2)
    def test_tls_failure_never_authenticates(self):
        def bad_factory(**kwargs):
            self.ftp=FakeFTP(**kwargs)
            def fail(): raise ssl.SSLCertVerificationError('test')
            self.ftp.auth=fail;return self.ftp
        with self.assertRaises(ssl.SSLCertVerificationError): self.run_probe(factory=bad_factory)
        self.assertFalse(any(c[0]=='login' for c in self.ftp.commands));self.assertTrue(self.ftp.closed)
    def test_encrypted_private_roundtrip_never_activates(self):
        report=self.run_probe();self.assertTrue(report['protected_data_roundtrip_verified']);self.assertFalse(report['activation']);self.assertEqual(report['archive_sha256'],self.digest)
        stores=[c[1] for c in self.ftp.commands if c[0]=='store'];self.assertEqual(stores,['STOR release.zip','STOR receipt.json'])
        self.assertTrue(self.ftp.closed);self.assertNotIn('synthetic-test-value',json.dumps(report))
    def test_wrong_digest_fails_before_connection(self):
        with self.assertRaises(ValueError): self.run_probe(digest='0'*64)
        self.assertIsNone(self.ftp)
    def test_primary_account_rejected(self):
        with patch.dict(os.environ,{'MPA_TRS_FTPS_PROBE_USER':'mapp5848','MPA_TRS_FTPS_PROBE_PASSWORD':'synthetic-test-value'}),self.assertRaises(ValueError):
            f.private_probe(self.archive,self.sha,self.digest,'123','456','1',self.factory)
        self.assertIsNone(self.ftp)
    def test_root_marker_and_escape_guard(self):
        ftp=FakeFTP(context=f.tls_context());ftp.protected=True
        ftp.files['.mpa-trs-ftps-probe-root']=b'wrong'
        with self.assertRaises(ValueError): f.verify_probe_root(ftp)
        ftp.pwd=lambda:'/home/mapp5848'
        with self.assertRaises(ValueError): f.verify_probe_root(ftp)
    def test_existing_app_access_rejected_before_writes(self):
        def bad_factory(**kwargs):
            self.ftp=FakeFTP(**kwargs)
            self.ftp.cwd=lambda path:None
            return self.ftp
        with self.assertRaises(ValueError): self.run_probe(factory=bad_factory)
        self.assertFalse(any(c[0]=='store' for c in self.ftp.commands))
    def test_remote_corruption_and_bounds_rejected(self):
        for over in (False,True):
            def corrupt_factory(**kwargs):
                self.ftp=FakeFTP(**kwargs);original=self.ftp.retrbinary
                def retr(command,callback):
                    if command=='RETR release.zip': callback(b'x'*(self.archive.stat().st_size+1) if over else b'corrupt')
                    else: original(command,callback)
                self.ftp.retrbinary=retr;return self.ftp
            with self.subTest(over=over),self.assertRaises(ValueError): self.run_probe(factory=corrupt_factory)
            self.assertFalse(any(c==('store','STOR receipt.json') for c in self.ftp.commands))
    def test_runtime_identity_and_remote_inventory_rejected(self):
        for run in ('../escape','0\nSITE EXEC anything'):
            with self.assertRaises(ValueError): f.private_probe(self.archive,self.sha,self.digest,'123',run,'1',self.factory)
        ftp=FakeFTP(context=f.tls_context());ftp.protected=True;ftp.mlsd=lambda:[('eletter',{'type':'dir'})]
        with self.assertRaises(ValueError): f.verify_probe_root(ftp)
    def test_successful_same_repository_source_required(self):
        run={'status':'completed','conclusion':'success','head_sha':self.sha,'head_repository':{'full_name':fetch.REPO},'path':'.github/workflows/ci.yml'}
        fetch.validate_run(run,self.sha)
        for field,value in [('conclusion','failure'),('head_sha','b'*40),('head_repository',{'full_name':'other/repo'}),('path','unknown.yml')]:
            with self.subTest(field=field),self.assertRaises(ValueError):fetch.validate_run({**run,field:value},self.sha)
    def test_expired_duplicate_wrong_artifact_rejected(self):
        item={'id':1,'name':'application-'+self.sha,'expired':False,'digest':'sha256:'+'a'*64,'size_in_bytes':100}
        self.assertEqual(fetch.select_artifact([item],self.sha),item)
        for items in ([item,item],[{**item,'expired':True}],[{**item,'digest':'invalid'}],[]):
            with self.assertRaises(ValueError):fetch.select_artifact(items,self.sha)
    def test_wrapper_digest_and_approved_inner_identity(self):
        stream=__import__('io').BytesIO();name='application-'+self.sha+'.zip'
        with zipfile.ZipFile(stream,'w') as z:
            z.writestr(name,self.archive.read_bytes());z.writestr(name+'.sha256',self.digest+'  '+name+'\n')
        data=stream.getvalue();artifact={'digest':'sha256:'+hashlib.sha256(data).hexdigest()}
        path=fetch.unpack(data,artifact,self.sha,self.digest,'123',self.root/'received');self.assertEqual(path.read_bytes(),self.archive.read_bytes())
        with self.assertRaises(ValueError):fetch.unpack(data,{'digest':'sha256:'+'0'*64},self.sha,self.digest,'123',self.root/'bad')
        with self.assertRaises(ValueError):fetch.unpack(data,artifact,self.sha,'0'*64,'123',self.root/'bad')
    def test_cross_origin_redirect_strips_token_and_refuses_http(self):
        req=urllib.request.Request('https://api.github.com/example',headers={'Authorization':'Bearer synthetic-test-value'})
        redirected=fetch.SafeRedirect().redirect_request(req,None,302,'',{},'https://example.blob.core.windows.net/artifact')
        self.assertIsNone(redirected.get_header('Authorization'))
        with self.assertRaises(ValueError): fetch.SafeRedirect().redirect_request(req,None,302,'',{},'http://example.com/artifact')

if __name__=='__main__': unittest.main()
