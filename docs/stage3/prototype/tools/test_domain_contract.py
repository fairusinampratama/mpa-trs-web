import pathlib
import subprocess
import unittest
class CanonicalDomainTests(unittest.TestCase):
    def test_canonical_contract_and_projections(self):
        root=pathlib.Path(__file__).resolve().parent.parent
        result=subprocess.run(['node','--test','tools/test_domain_model.mjs'],cwd=root,capture_output=True,text=True,timeout=30)
        self.assertEqual(result.returncode,0,result.stdout+result.stderr)
