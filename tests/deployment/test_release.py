import importlib.util
import json
from pathlib import Path
import shutil
import stat
import subprocess
import tempfile
import unittest
import zipfile

ROOT = Path(__file__).resolve().parents[2]
spec = importlib.util.spec_from_file_location('release', ROOT / 'scripts/deployment/release.py')
r = importlib.util.module_from_spec(spec)
spec.loader.exec_module(r)


class ReleaseTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.base = Path(self.temp.name)
        self.repo = self.base / 'repo'
        shutil.copytree(ROOT, self.repo, ignore=shutil.ignore_patterns('.git', '__pycache__', 'dist', 'vendor', 'node_modules', '.phpunit.cache', '.env', 'build'))
        self.git('init', '-b', 'main')
        self.git('config', 'user.name', 'Deployment tests')
        self.git('config', 'user.email', 'tests@example.invalid')
        self.git('add', '.')
        self.git('commit', '-m', 'Fixture')
        self.sha = self.git('rev-parse', 'HEAD').decode().strip()
        self.archive = self.base / 'release.zip'
        r.package(self.repo, self.sha, 'A', self.archive)

    def tearDown(self):
        self.temp.cleanup()

    def git(self, *args):
        return subprocess.check_output(['git', '-C', str(self.repo), *args], stderr=subprocess.DEVNULL)

    def rewrite(self, mutate):
        with zipfile.ZipFile(self.archive) as z:
            entries = [(i, z.read(i.filename)) for i in z.infolist()]
        entries = mutate(entries)
        altered = self.base / 'altered.zip'
        with zipfile.ZipFile(altered, 'w') as z:
            for i, data in entries:
                z.writestr(i, data)
        return altered

    def reject(self, altered):
        with self.assertRaises((ValueError, zipfile.BadZipFile)):
            r.verify(altered, self.sha, 'A')

    def test_roundtrip_and_extracted_integrity(self):
        target = self.base / 'extracted'
        with zipfile.ZipFile(self.archive) as z:
            z.extractall(target)  # Verified synthetic archive only.
        r.verify_directory(target, self.archive, self.sha, 'A')
        (target / 'public/index.html').write_text('corrupt')
        with self.assertRaises(ValueError):
            r.verify_directory(target, self.archive, self.sha, 'A')

    def test_reproducible_with_same_build_inputs(self):
        other = self.base / 'same.zip'
        r.package(self.repo, self.sha, 'A', other)
        self.assertEqual(self.archive.read_bytes(), other.read_bytes())

    def test_metadata_variation_is_explicit(self):
        other = self.base / 'run.zip'
        r.package(self.repo, self.sha, 'A', other, run_id='42')
        manifest = r.verify(other, self.sha, 'A')
        self.assertEqual(manifest['build']['run_id'], '42')
        self.assertNotEqual(self.archive.read_bytes(), other.read_bytes())

    def test_variant_has_matching_versioned_asset(self):
        other = self.base / 'b.zip'
        r.package(self.repo, self.sha, 'B', other)
        r.verify(other, self.sha, 'B')
        with self.assertRaises(ValueError):
            r.verify(other, self.sha, 'A')

    def test_path_traversal_absolute_windows_and_controls(self):
        for name in ('../escape', '/escape', 'public/../escape', 'public//x', 'C:/escape', 'public\\escape', 'public/x\n'):
            with self.subTest(name=name), self.assertRaises(ValueError):
                r.safe_path(name)
        def mutate(entries):
            entries[0][0].filename = '../escape'
            return entries
        self.reject(self.rewrite(mutate))

    def test_duplicate_entries(self):
        self.reject(self.rewrite(lambda entries: entries + [entries[0]]))

    def test_symlink_entry(self):
        def mutate(entries):
            entries[0][0].external_attr = (stat.S_IFLNK | 0o777) << 16
            return entries
        self.reject(self.rewrite(mutate))

    def test_tampered_payload(self):
        self.reject(self.rewrite(lambda entries: [(i, b'changed' if i.filename == 'public/index.html' else data) for i, data in entries]))

    def test_wrong_revision(self):
        with self.assertRaises(ValueError):
            r.verify(self.archive, '0' * 40, 'A')
        with self.assertRaises(ValueError):
            r.source(self.repo, 'main')

    def test_oversized_entry(self):
        self.reject(self.rewrite(lambda entries: [(i, b'x' * (r.MAX_FILE + 1) if i.filename == 'public/index.html' else data) for i, data in entries]))

    def test_forbidden_source_and_symlink(self):
        for name, symlink in [('deployment-probe/.env', False), ('deployment-probe/leak', True)]:
            path = self.repo / name
            if symlink:
                path.symlink_to('/etc/passwd')
            else:
                path.write_text('not-a-real-secret')
            self.git('add', '-f', name)
            self.git('commit', '-m', 'Forbidden fixture')
            sha = self.git('rev-parse', 'HEAD').decode().strip()
            with self.assertRaises(ValueError):
                r.source(self.repo, sha)
            self.git('reset', '--hard', self.sha)

    def test_missing_required_file(self):
        self.git('rm', 'AGENTS.md')
        self.git('commit', '-m', 'Incomplete fixture')
        with self.assertRaises(ValueError):
            r.source(self.repo, self.git('rev-parse', 'HEAD').decode().strip())


if __name__ == '__main__':
    unittest.main()

