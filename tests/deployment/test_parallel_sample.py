import ftplib
import os
from pathlib import Path
import sys
from threading import Event
import unittest
from unittest.mock import patch

sys.path.insert(0,str(Path(__file__).resolve().parents[2]/'scripts/deployment'))
import ftps_parallel_sample as sample
import test_release_transport as fixtures


class ParallelSampleTests(unittest.TestCase):
    def test_sample_exactly_64_deterministic_safe_entries(self):
        payload={'application/vendor/pkg/%03d.php'%i:b'<?php' for i in range(100)}
        payload['application/.env']=b'not selected'
        result=sample.select_sample(payload)
        self.assertEqual(result,sample.select_sample(payload))
        self.assertEqual(len(result),64)
        self.assertEqual(len({source for _,source,_ in result}),64)
        self.assertTrue(all(remote.startswith('files/sample-') for remote,_,_ in result))
    def test_undersized_unsafe_and_oversized_sample_rejected(self):
        with self.assertRaises(ValueError): sample.select_sample({})
        payload={'application/vendor/pkg/%03d.php'%i:b'x'*(140*1024) for i in range(64)}
        with self.assertRaises(ValueError): sample.select_sample(payload)
        payload={'application/vendor/../%03d.php'%i:b'x' for i in range(64)}
        with self.assertRaises(ValueError): sample.select_sample(payload)
    def test_fixed_selector_cycle_and_rename_failure_preserve_previous(self):
        ftp=fixtures.MemoryFTP(); self.assertEqual(sample.selector_cycle(ftp),['A','B','A'])
        self.assertEqual(ftp.files['sample-selector'],b'A\n')
        self.assertEqual(len(ftp.renames),2)
        ftp=fixtures.MemoryFTP();ftp.reject_rename=True
        with self.assertRaises(ftplib.error_perm): sample.selector_cycle(ftp)
        self.assertEqual(ftp.files['sample-selector'],b'A\n')
    def test_corruption_stops_siblings_and_no_selector_write(self):
        ftp=fixtures.MemoryFTP();ftp.corrupt=True;stop=Event()
        with self.assertRaises(ValueError): sample.copy_bucket(ftp,[('files/sample-000.php','source',b'x')],stop)
        self.assertTrue(stop.is_set());self.assertNotIn('sample-selector',ftp.files)
    def test_branch_approval_identity_fail_before_network(self):
        with patch.dict(os.environ,{},clear=True),patch.object(sample.tls,'connect_tls') as connect:
            for run in ('123','../escape'):
                with self.assertRaises(ValueError): sample.run(None,run,'1')
            connect.assert_not_called()
    def test_fourth_root_failure_closes_all_before_writes(self):
        sessions=[]
        def connect(factory):
            ftp=fixtures.MemoryFTP();ftp.close=lambda: setattr(ftp,'closed',True)
            ftp.login=lambda *a:None;ftp.prot_p=lambda:None;ftp.set_pasv=lambda *a:None
            sessions.append(ftp);return ftp,{}
        def jail(ftp):
            if len(sessions)==4: raise ValueError('jail rejected')
        env={'GITHUB_REF':sample.BRANCH,'MPA_TRS_PRIVATE_APPROVAL':sample.APPROVAL,
             'MPA_TRS_FTPS_PROBE_USER':sample.tls.PROBE_USER,'MPA_TRS_FTPS_PROBE_PASSWORD':'synthetic'}
        payload={'application/vendor/p/%03d.php'%i:b'x' for i in range(64)}
        with patch.dict(os.environ,env),patch.object(sample.transfer,'payload',return_value=payload),patch.object(sample.tls,'connect_tls',side_effect=connect),patch.object(sample.tls,'verify_probe_root',side_effect=jail):
            with self.assertRaises(ValueError): sample.run(None,'123','1')
        self.assertEqual(len(sessions),4)
        self.assertTrue(all(ftp.closed and not ftp.directories and 'sample-selector' not in ftp.files for ftp in sessions))


if __name__ == '__main__': unittest.main()
