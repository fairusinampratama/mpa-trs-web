import pathlib
import subprocess
import unittest
class InstitutionalContractTests(unittest.TestCase):
    def test_typed_institutional_records(self):
        root=pathlib.Path(__file__).resolve().parent.parent
        r=subprocess.run(['node','--test','tools/test_institutional_model.mjs'],cwd=root,capture_output=True,text=True,timeout=30)
        self.assertEqual(r.returncode,0,r.stdout+r.stderr)
