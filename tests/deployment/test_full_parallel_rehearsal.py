import os
from pathlib import Path
import sys
import unittest
from unittest.mock import patch
sys.path.insert(0,str(Path(__file__).resolve().parents[2]/'scripts/deployment'))
import ftps_full_parallel_rehearsal as full
import test_release_transport as fixtures


class FullParallelTests(unittest.TestCase):
    def sessions(self):
        sessions=[fixtures.MemoryFTP() for _ in range(4)]
        for ftp in sessions[1:]: ftp.files=sessions[0].files;ftp.directories=sessions[0].directories
        return sessions
    def test_completion_is_last_after_full_parallel_readback(self):
        sessions=self.sessions();payload={'manifest.json':b'{}','application/bootstrap/app.php':b'<?php'}
        result=full.upload(sessions,'a'*40,payload)
        self.assertEqual(result['files'],2)
        self.assertEqual(list(sessions[0].files)[-1],'COMPLETE.json')
        self.assertNotIn('assets_verified',sessions[0].files['COMPLETE.json'].decode())
    def test_corruption_has_no_completion_or_activation(self):
        sessions=self.sessions();sessions[0].corrupt=True
        with self.assertRaises(ValueError): full.upload(sessions,'a'*40,{'manifest.json':b'{}'})
        self.assertNotIn('COMPLETE.json',sessions[0].files)
        self.assertTrue(all(not ftp.renames for ftp in sessions))
    def test_bad_path_and_wrong_connection_count_rejected_before_directory_creation(self):
        for sessions,payload in ((self.sessions()[:3],{'manifest.json':b'{}'}),(self.sessions(),{'../escape':b'bad'})):
            with self.assertRaises(ValueError): full.upload(sessions,'a'*40,payload)
            self.assertFalse(sessions[0].directories)
    def test_small_sample_approval_cannot_execute_full_test(self):
        with patch.dict(os.environ,{'MPA_TRS_PRIVATE_APPROVAL':'PRIVATE_PARALLEL_SAMPLE','GITHUB_REF':full.sample.BRANCH}),patch.object(full.tls,'connect_tls') as connect:
            with self.assertRaises(ValueError): full.run(None,None,'123','1')
            connect.assert_not_called()


if __name__=='__main__': unittest.main()
