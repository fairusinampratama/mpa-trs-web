import ftplib
import hashlib
import io
import json
from pathlib import Path
import stat
import sys
import unittest
from unittest.mock import patch
import zipfile
sys.path.insert(0,str(Path(__file__).resolve().parents[2]/'scripts/deployment'))
import supervised_zip as s
from test_release_transport import MemoryFTP

class SupervisedZipTests(unittest.TestCase):
    def setUp(self):
        self.sha='a'*40
        self.expected={'REVISION':(self.sha+'\n').encode(),'application/bootstrap/app.php':b'php','manifest.json':b'{}'}
    def snapshot(self,entries):
        output=io.BytesIO()
        with zipfile.ZipFile(output,'w') as z:
            for name,data,mode in entries:
                entry=zipfile.ZipInfo(name);entry.create_system=3;entry.external_attr=mode<<16
                z.writestr(entry,data)
        return output.getvalue()
    def good(self,prefix=''):
        return [(prefix+n,b,stat.S_IFREG|0o644) for n,b in self.expected.items()]
    def test_full_extraction_comparison_with_cpanel_directory_prefix(self):
        entries=[(self.sha+'/',b'',stat.S_IFDIR|0o755),(self.sha+'/application/',b'',stat.S_IFDIR|0o755),(self.sha+'/application/bootstrap/',b'',stat.S_IFDIR|0o755)]+self.good(self.sha+'/')
        self.assertEqual(s.verify_snapshot(self.snapshot(entries),self.expected,self.sha)['files'],3)
    def test_flat_snapshot_supported(self):
        self.assertEqual(s.verify_snapshot(self.snapshot(self.good()),self.expected,self.sha)['files'],3)
    def test_missing_changed_and_unexpected_entries_rejected(self):
        for entries in (self.good()[:-1],self.good()+[('extra.php',b'php',stat.S_IFREG|0o644)],[(n,b'changed',m) for n,b,m in self.good()]):
            with self.assertRaises(ValueError):s.verify_snapshot(self.snapshot(entries),self.expected,self.sha)
    def test_traversal_symlink_duplicate_and_mixed_roots_rejected(self):
        for entries in (self.good()+[('../escape',b'',stat.S_IFREG|0o644)],self.good()+[('link',b'/etc/passwd',stat.S_IFLNK|0o777)],self.good()+self.good()[:1],self.good(self.sha+'/')+self.good()[:1]):
            with self.assertRaises(ValueError):s.verify_snapshot(self.snapshot(entries),self.expected,self.sha)
    def test_private_or_php_public_assets_rejected(self):
        for name in ('bad.php','manifest.json','.env'):
            with self.assertRaises(ValueError):s.css_files({'application/public/mpa-trs-assets/'+self.sha+'/'+name:b'x'},self.sha)
    def test_public_css_bytes_must_match(self):
        expected={'application/public/mpa-trs-assets/'+self.sha+'/assets/a.css':b'css'}
        s.verify_css(expected,self.sha,getter=lambda p,n:b'css')
        with self.assertRaises(ValueError):s.verify_css(expected,self.sha,getter=lambda p,n:b'wrong')
    def ready_ftp(self):
        ftp=MemoryFTP();ftp.files={'shared/active-release':('b'*40+'\n').encode(),
            'releases/'+self.sha+'/COMPLETE.json':json.dumps({'revision':self.sha,'archive_sha256':'c'*64,'manifest_sha256':hashlib.sha256(self.expected['manifest.json']).hexdigest(),'extraction_verified':True,'assets_verified':True}).encode()}
        return ftp
    def test_selector_guard_and_failed_rename_preserve_current(self):
        for previous,reject in [('d'*40,False),('b'*40,True)]:
            ftp=self.ready_ftp();ftp.reject_rename=reject
            with patch.object(s,'verify_critical'),patch.object(s,'verify_css'),self.assertRaises((ValueError,ftplib.error_perm)):
                s.activate(ftp,self.expected,self.sha,'c'*64,previous,'123')
            self.assertEqual(ftp.files['shared/active-release'],('b'*40+'\n').encode())
    def test_unverified_extraction_cannot_activate(self):
        ftp=self.ready_ftp();record=json.loads(ftp.files['releases/'+self.sha+'/COMPLETE.json']);record['extraction_verified']=False
        ftp.files['releases/'+self.sha+'/COMPLETE.json']=json.dumps(record).encode()
        with self.assertRaises(ValueError):s.activate(ftp,self.expected,self.sha,'c'*64,'b'*40,'123')
        self.assertFalse(ftp.renames)
    def test_activation_uses_retained_record_without_full_snapshot_download(self):
        ftp=self.ready_ftp()
        with patch.object(s,'verify_critical'),patch.object(s,'verify_css'):
            result=s.activate(ftp,self.expected,self.sha,'c'*64,'b'*40,'123')
        self.assertTrue(result['selector_verified']);self.assertFalse(result['retained_full_tree_reread'])
    def test_wrong_completion_digest_rejected(self):
        ftp=self.ready_ftp()
        with self.assertRaises(ValueError):s.activate(ftp,self.expected,self.sha,'d'*64,'b'*40,'123')
    def test_probe_credentials_not_accepted(self):
        with patch.dict('os.environ',{'MPA_TRS_FTPS_RUNTIME_USER':'mpatrs_probe@mapalatursina.my.id','MPA_TRS_FTPS_RUNTIME_PASSWORD':'dummy'},clear=True),self.assertRaises(ValueError):s.connect()
    def test_failed_extraction_comparison_never_publishes_completion(self):
        ftp=MemoryFTP();ftp.files['verification/'+self.sha+'.zip']=self.snapshot(self.good()[:-1])
        with self.assertRaises(ValueError):s.ready(ftp,self.expected,self.sha,'c'*64,'123')
        self.assertFalse(any(n.endswith('COMPLETE.json') for n in ftp.files))
    def test_completion_is_written_only_after_full_and_public_checks(self):
        ftp=MemoryFTP();ftp.files['verification/'+self.sha+'.zip']=self.snapshot(self.good())
        ftp.mlsd=lambda path:[]
        with patch.object(s,'verify_critical'),patch.object(s,'verify_css'):
            result=s.ready(ftp,self.expected,self.sha,'c'*64,'123')
        self.assertTrue(result['extraction_verified']);self.assertTrue(result['assets_verified'])
        self.assertEqual(list(ftp.files)[-1],'releases/'+self.sha+'/COMPLETE.json')
    def test_public_css_failure_never_publishes_completion(self):
        ftp=MemoryFTP();ftp.files['verification/'+self.sha+'.zip']=self.snapshot(self.good())
        with patch.object(s,'verify_critical'),patch.object(s,'verify_css',side_effect=ValueError),self.assertRaises(ValueError):
            s.ready(ftp,self.expected,self.sha,'c'*64,'123')
        self.assertFalse(any(n.endswith('COMPLETE.json') for n in ftp.files))

if __name__=='__main__':unittest.main()
