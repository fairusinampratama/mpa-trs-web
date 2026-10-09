import importlib.util
import json
from pathlib import Path
import stat
import tempfile
import unittest
import zipfile

spec = importlib.util.spec_from_file_location('app_release', Path(__file__).resolve().parents[2] / 'scripts/deployment/application_release.py')
r = importlib.util.module_from_spec(spec); spec.loader.exec_module(r)

class ApplicationReleaseTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory(); self.root = Path(self.tmp.name); self.sha = 'a' * 40
        files = {'composer.json': '{}', 'composer.lock': json.dumps({'packages': [{'name': 'laravel/framework'}]}), 'vendor/composer/installed.json': json.dumps({'dev': False, 'packages': [{'name': 'laravel/framework'}]}), 'vendor/autoload.php': '<?php', 'bootstrap/app.php': '<?php', 'public/build/manifest.json': json.dumps({'resources/css/app.css': {'file': 'assets/app-123.css'}}), 'public/build/assets/app-123.css': 'body{}', 'resources/views/welcome.blade.php': 'hello', '.env': 'PRIVATE=value', 'tests/private.txt': 'not production', 'storage/logs/private.log': 'private'}
        for name, content in files.items():
            p = self.root / 'application' / name; p.parent.mkdir(parents=True, exist_ok=True); p.write_text(content)
        self.archive = self.root / 'release.zip'; r.package(self.root, self.sha, self.archive)
    def tearDown(self): self.tmp.cleanup()
    def mutate(self, change):
        with zipfile.ZipFile(self.archive) as z: entries = [(i, z.read(i)) for i in z.infolist()]
        dest = self.root / 'bad.zip'
        with zipfile.ZipFile(dest, 'w') as z:
            for i, b in change(entries): z.writestr(i, b)
        return dest
    def test_secret_runtime_and_test_exclusion(self):
        m = r.verify(self.archive, self.sha)
        self.assertFalse(any('storage' in n or '.env' in n or '/tests/' in n for n in m['files']))
    def test_wrong_commit_and_tampered_payload(self):
        with self.assertRaises(ValueError): r.verify(self.archive, 'b' * 40)
        bad = self.mutate(lambda es: [(i, b'changed' if i.filename.endswith('.css') else b) for i, b in es])
        with self.assertRaises(ValueError): r.verify(bad, self.sha)
    def test_archive_traversal_symlinks_and_duplicates(self):
        for kind in ['traversal', 'symlink', 'duplicate']:
            def change(es):
                if kind == 'duplicate': return es + [es[0]]
                if kind == 'traversal': es[0][0].filename = '../escape'
                else: es[0][0].external_attr = (stat.S_IFLNK | 0o777) << 16
                return es
            with self.subTest(kind=kind), self.assertRaises(ValueError): r.verify(self.mutate(change), self.sha)
    def test_missing_css_and_dev_dependencies_rejected(self):
        (self.root/'application/public/build/assets/app-123.css').unlink()
        with self.assertRaises(ValueError): r.package(self.root, self.sha, self.root/'missing.zip')
    def test_development_vendor_rejected(self):
        (self.root/'application/vendor/composer/installed.json').write_text(json.dumps({'dev': True, 'packages': [{'name':'laravel/framework'}]}))
        with self.assertRaises(ValueError): r.package(self.root, self.sha, self.root/'dev.zip')
    def test_invalid_build_metadata_rejected(self):
        def change(es):
            result=[]
            for i,b in es:
                if i.filename=='manifest.json':
                    m=json.loads(b); m['build']['php_target']='8.4'; b=json.dumps(m).encode()
                result.append((i,b))
            return result
        with self.assertRaises(ValueError): r.verify(self.mutate(change), self.sha)
    def test_byte_reproducibility_for_equal_inputs(self):
        second = self.root/'second.zip'; r.package(self.root, self.sha, second)
        self.assertEqual(second.read_bytes(), self.archive.read_bytes())
    def test_vendor_symlink_rejected(self):
        (self.root/'application/vendor/leak').symlink_to('/etc/passwd')
        with self.assertRaises(ValueError): r.package(self.root, self.sha, self.root/'link.zip')

if __name__ == '__main__': unittest.main()
