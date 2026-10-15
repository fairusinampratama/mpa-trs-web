from pathlib import Path
import tempfile
import unittest
from verify_preview import verify
SHA = 'a' * 40
class PreviewBoundaryTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.root = Path(self.tmp.name)
        (self.root/'assets').mkdir()
        for name, text in {'index.html':'<html></html>', 'responsive-review.html':'./#/ui-lab', '.nojekyll':'', 'version.json':'{"stage":3,"prototype":true,"sourceCommit":"'+SHA+'"}', 'assets/app-hash.js':'console.log("synthetic")'}.items(): (self.root/name).write_text(text)
    def tearDown(self): self.tmp.cleanup()
    def test_accepts_static_payload(self): self.assertEqual(len(verify(self.root,SHA)),5)
    def test_rejects_private_document(self):
        (self.root/'recovery.md').write_text('private')
        with self.assertRaises(ValueError): verify(self.root,SHA)
    def test_rejects_symlink(self):
        (self.root/'assets/leak.js').symlink_to(self.root/'version.json')
        with self.assertRaises(ValueError): verify(self.root,SHA)
    def test_rejects_private_identifier(self):
        (self.root/'assets/app-hash.js').write_text('path="/home/account"')
        with self.assertRaises(ValueError): verify(self.root,SHA)
    def test_rejects_wrong_version(self):
        with self.assertRaises(ValueError): verify(self.root,'b'*40)
    def test_rejects_missing_review_entry(self):
        (self.root/'responsive-review.html').unlink()
        with self.assertRaises(ValueError): verify(self.root,SHA)
    def test_rejects_root_asset_path(self):
        (self.root/'index.html').write_text('<script src="/assets/app.js"></script>')
        with self.assertRaises(ValueError): verify(self.root,SHA)

    def test_rejects_obsolete_preview_base(self):
        (self.root/'index.html').write_text('<script src="/mpa-trs-preview/assets/app.js"></script>')
        with self.assertRaises(ValueError): verify(self.root,SHA)

    def test_accepts_exact_approved_font(self):
        data = (Path(__file__).parent.parent/'src/fonts/source-sans-3-latin.woff2').read_bytes()
        (self.root/'assets/source-sans-3-latin-test.woff2').write_bytes(data)
        self.assertEqual(len(verify(self.root,SHA)),6)
    def test_rejects_substituted_font_binary(self):
        (self.root/'assets/source-sans-3-latin-test.woff2').write_bytes(b'wOF2private')
        with self.assertRaises(ValueError): verify(self.root,SHA)
    def test_rejects_held_media(self):
        (self.root/'assets/photo-test.jpg').write_bytes(b'private image')
        with self.assertRaises(ValueError): verify(self.root,SHA)
    def test_rejects_sourcemap(self):
        (self.root/'assets/app-hash.js.map').write_text('{}')
        with self.assertRaises(ValueError): verify(self.root,SHA)

    def test_rejects_test_only_canonical_fixtures(self):
        (self.root/'assets/app-hash.js').write_text('const id="data-proof-te"')
        with self.assertRaises(ValueError): verify(self.root,SHA)
