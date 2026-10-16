import pathlib
import subprocess
import unittest

class MediaContractTests(unittest.TestCase):
    def test_media_contract_and_publication_gates(self):
        root = pathlib.Path(__file__).resolve().parent.parent
        result = subprocess.run(['node', '--test', 'tools/test_media_model.mjs'], cwd=root, capture_output=True, text=True, timeout=30)
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
