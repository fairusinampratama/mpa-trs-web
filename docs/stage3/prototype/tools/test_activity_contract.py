"""Run record-contract checks in the existing Pages boundary-test discovery."""
import pathlib
import subprocess
import unittest

class ActivityContractTests(unittest.TestCase):
    def test_typed_record_contract(self):
        root = pathlib.Path(__file__).resolve().parent.parent
        result = subprocess.run(['node', '--test', 'tools/test_activity_model.mjs'], cwd=root, capture_output=True, text=True, timeout=30)
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
