import pathlib,subprocess,unittest
class IntegratedContractTests(unittest.TestCase):
 def test_integrated_read_models(self):
  r=subprocess.run(['node','--test','tools/test_integration_model.mjs'],cwd=pathlib.Path(__file__).resolve().parent.parent,capture_output=True,text=True,timeout=30)
  self.assertEqual(r.returncode,0,r.stdout+r.stderr)
