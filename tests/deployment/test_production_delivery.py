import ftplib
import json
import os
import posixpath
import unittest
from unittest.mock import patch

import test_ftps
import production_delivery as p


class RoleFTP:
    def __init__(self, role, context):
        self.context=context; self.sock=test_ftps.FakeSocket(); self.role=role
        self.location='/'; self.secure=False; self.protected=False; self.closed=False
        self.files={'/.mpa-trs-production-root':p.ROLES[role][1]}
        self.dirs={'/'}; self.renames=[]; self.corrupt=None; self.bad_root=False
        if role=='runtime':
            self.dirs.update({'/shared','/releases'})
            self.files['/shared/active-release']=b'NONE\n'
        else:
            self.files['/.htaccess']=(p.Path(p.__file__).parent/'assets.htaccess').read_bytes()
    def path(self, name):
        return posixpath.normpath(posixpath.join(self.location,name))
    def connect(self,host,port): pass
    def auth(self): self.secure=True
    def login(self,user,password):
        assert self.secure and user==p.ROLES[self.role][0]
    def prot_p(self): self.protected=True
    def set_pasv(self,value): assert value
    def pwd(self): return self.location
    def cwd(self,name):
        target=self.path(name)
        if target not in self.dirs: raise ftplib.error_perm('unavailable')
        self.location=target
    def mlsd(self,name='.'):
        assert self.protected
        prefix=self.path(name).rstrip('/')+'/'
        children={}
        for path in self.dirs:
            if path.startswith(prefix) and '/' not in path[len(prefix):] and path!=prefix:
                children[path[len(prefix):]]={'type':'dir','unix.mode':'0755'}
        for path in self.files:
            if path.startswith(prefix) and '/' not in path[len(prefix):]:
                children[path[len(prefix):]]={'type':'file'}
        return children.items()
    def mkd(self,name):
        path=self.path(name)
        if path in self.dirs: raise ftplib.error_perm('exists')
        self.dirs.add(path)
    def storbinary(self,command,stream):
        assert self.protected
        path=self.path(command[5:]); self.files[path]=stream.read()
        if path==self.corrupt: self.files[path]=b'corrupt'
    def retrbinary(self,command,callback):
        assert self.protected
        callback(self.files[self.path(command[5:])])
    def rename(self,source,target):
        self.renames.append((source,target))
        self.files[self.path(target)]=self.files.pop(self.path(source))
    def close(self): self.closed=True


class ProductionDeliveryTests(unittest.TestCase):
    def setUp(self):
        self.fixture=test_ftps.FTPSTests(); self.fixture.setUp()
        self.sessions={}; self.corrupt_role=None; self.bad_identity=False
        self.env={}
        for role,(user,identity) in p.ROLES.items():
            self.env['MPA_TRS_FTPS_'+role.upper()+'_USER']=user
            self.env['MPA_TRS_FTPS_'+role.upper()+'_PASSWORD']='synthetic-test-value'
    def tearDown(self): self.fixture.tearDown()
    def factory(self,context,**kwargs):
        role='runtime' if 'runtime' not in self.sessions else 'assets'
        ftp=RoleFTP(role,context)
        if self.corrupt_role==role:
            ftp.corrupt='/'+self.fixture.sha+'/assets/app.css' if role=='assets' else '/releases/'+self.fixture.sha+'/application/bootstrap/app.php'
        if self.bad_identity: ftp.files['/.mpa-trs-production-root']=b'wrong'
        self.sessions[role]=ftp
        return ftp
    def deliver(self, stage_only=False):
        with patch.dict(os.environ,self.env):
            return p.deliver(self.fixture.archive,self.fixture.sha,self.fixture.digest,'123','NONE','789',self.factory,stage_only=stage_only)
    def test_complete_delivery_requires_both_roots_and_readbacks(self):
        result=self.deliver(); runtime=self.sessions['runtime']
        self.assertTrue(result['selector_readback_verified'])
        self.assertFalse(result['live_health_verified'])
        self.assertEqual(runtime.files['/shared/active-release'],(self.fixture.sha+'\n').encode())
        ready=json.loads(runtime.files['/releases/'+self.fixture.sha+'/COMPLETE.json'])
        self.assertTrue(ready['assets_verified'])
        self.assertEqual(set(self.sessions['assets'].files), {'/.mpa-trs-production-root','/.htaccess','/'+self.fixture.sha+'/assets/app.css'})
    def test_initial_staging_leaves_selector_and_public_routing_unchanged(self):
        result=self.deliver(stage_only=True)
        self.assertTrue(result['stage_only'])
        self.assertFalse(result['selector_readback_verified'])
        runtime=self.sessions['runtime']
        self.assertEqual(runtime.files['/shared/active-release'],b'NONE\n')
        self.assertFalse(runtime.renames)
        self.assertTrue(json.loads(runtime.files['/releases/'+self.fixture.sha+'/COMPLETE.json'])['assets_verified'])
    def test_staging_noninitial_revision_rejected_before_connection(self):
        with self.assertRaises(ValueError):
            p.deliver(None,self.fixture.sha,self.fixture.digest,'123','a'*40,'789',self.factory,stage_only=True)
        self.assertFalse(self.sessions)
    def test_public_corruption_cannot_activate_or_upload_runtime(self):
        self.corrupt_role='assets'
        with self.assertRaises(ValueError): self.deliver()
        self.assertEqual(self.sessions['runtime'].files['/shared/active-release'],b'NONE\n')
        self.assertFalse(self.sessions['runtime'].renames)
    def test_runtime_corruption_cannot_activate(self):
        self.corrupt_role='runtime'
        with self.assertRaises(ValueError): self.deliver()
        runtime=self.sessions['runtime']
        self.assertNotIn('/releases/'+self.fixture.sha+'/COMPLETE.json',runtime.files)
        self.assertFalse(runtime.renames)
    def test_root_identity_mismatch_stops_before_writes(self):
        self.bad_identity=True
        with self.assertRaises(ValueError): self.deliver()
        self.assertEqual(set(self.sessions['runtime'].files),{'/.mpa-trs-production-root','/shared/active-release'})
    def test_probe_and_primary_credentials_rejected_before_connection(self):
        for user in ('mpatrs_probe@mapalatursina.my.id','mapp5848'):
            with patch.dict(os.environ,{'MPA_TRS_FTPS_RUNTIME_USER':user,'MPA_TRS_FTPS_RUNTIME_PASSWORD':'synthetic-test-value'}),self.assertRaises(ValueError):
                p.login_role('runtime',self.factory)
        self.assertFalse(self.sessions)
    def test_public_php_manifest_or_traversal_refused(self):
        prefix='application/public/mpa-trs-assets/'+self.fixture.sha+'/'
        for name in ('assets/exec.php','../escape.css','config.json'):
            with self.subTest(name=name),self.assertRaises(ValueError):
                p.public_payload({prefix+'assets/app.css':b'css',prefix+name:b'bad'},self.fixture.sha)
    def test_activation_rejects_unready_and_changed_previous(self):
        ftp=RoleFTP('runtime',p.tls.tls_context()); ftp.protected=True
        sha='a'*40; path='/releases/'+sha+'/COMPLETE.json'
        ftp.files[path]=json.dumps({'revision':sha,'assets_verified':False,'archive_sha256':'b'*64}).encode()
        with self.assertRaises(ValueError): p.activate(ftp,sha,'NONE','1')
        ftp.files[path]=json.dumps({'revision':sha,'assets_verified':True,'archive_sha256':'b'*64}).encode()
        with self.assertRaises(ValueError): p.activate(ftp,sha,'c'*40,'1')
        self.assertFalse(ftp.renames)


if __name__=='__main__': unittest.main()
