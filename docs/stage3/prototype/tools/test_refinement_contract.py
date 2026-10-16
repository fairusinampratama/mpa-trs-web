import pathlib,subprocess,unittest
class RefinementTests(unittest.TestCase):
 def test_refinement_read_models(self):
  result=subprocess.run(['node','--test','tools/test_refinement_model.mjs'],cwd=pathlib.Path(__file__).resolve().parent.parent,capture_output=True,text=True,timeout=30)
  self.assertEqual(result.returncode,0,result.stdout+result.stderr)
