from pathlib import Path
import tempfile
import unittest
import hashlib
import struct
from verify_preview import verify as canonical_verify, webp_dimensions, approved_media
# Unit payloads are deliberately synthetic and have an explicit fixture allowlist.
# The real canonical allowlist is exercised separately below and by the build CLI.
def verify(directory, commit, media_manifest=None):
    return canonical_verify(directory, commit, {} if media_manifest is None else media_manifest)
SHA = 'a' * 40
class PreviewBoundaryTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.root = Path(self.tmp.name)
        (self.root/'assets').mkdir()
        for name, text in {'index.html':'<html></html>', 'responsive-review.html':'./#/ui-lab', '.nojekyll':'', 'version.json':'{"stage":3,"prototype":true,"sourceCommit":"'+SHA+'"}', 'assets/app-hash.js':'console.log("synthetic")'}.items(): (self.root/name).write_text(text)
    def tearDown(self): self.tmp.cleanup()
    def test_accepts_static_payload(self): self.assertEqual(len(verify(self.root,SHA)),5)
    def test_all_canonical_approved_derivatives_match_source_bytes(self):
        import shutil
        manifest = approved_media()
        self.assertEqual(len(manifest),17)
        for relative in manifest:
            target=self.root/relative;target.parent.mkdir(parents=True,exist_ok=True)
            shutil.copyfile(Path(__file__).parent.parent/'src'/relative,target)
        self.assertEqual(len(canonical_verify(self.root,SHA)),22)
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

    def media_fixture(self, metadata=False):
        # Bounded synthetic container exercises parser/allowlist, not photo decoding.
        frame = b'\x00\x00\x00\x9d\x01\x2a' + struct.pack('<HH', 20, 10)
        chunks = b'VP8 ' + struct.pack('<I',len(frame)) + frame
        if metadata: chunks += b'EXIF' + struct.pack('<I',4) + b'leak'
        data = b'RIFF' + struct.pack('<I',len(chunks)+4) + b'WEBP' + chunks
        path='media/synthetic-test.webp'
        (self.root/'media').mkdir(exist_ok=True);(self.root/path).write_bytes(data)
        return {path:{'bytes':len(data),'sha256':hashlib.sha256(data).hexdigest(),'width':20,'height':10}}

    def test_exact_scoped_media_identity_accepted(self):
        manifest=self.media_fixture();self.assertEqual(len(verify(self.root,SHA,manifest)),6)

    def test_pending_or_unlisted_derivative_rejected(self):
        self.media_fixture()
        with self.assertRaises(ValueError): verify(self.root,SHA,{})

    def test_substituted_derivative_rejected(self):
        manifest=self.media_fixture();(self.root/'media/synthetic-test.webp').write_bytes(b'RIFFwrong')
        with self.assertRaisesRegex(ValueError,'identity'): verify(self.root,SHA,manifest)

    def test_approved_hash_does_not_allow_embedded_metadata(self):
        manifest=self.media_fixture(metadata=True)
        with self.assertRaisesRegex(ValueError,'chunk/metadata'): verify(self.root,SHA,manifest)

    def test_derivative_dimensions_verified(self):
        manifest=self.media_fixture();manifest['media/synthetic-test.webp']['width']=30
        with self.assertRaisesRegex(ValueError,'dimensions'): verify(self.root,SHA,manifest)

    def test_approved_but_missing_derivative_rejected(self):
        manifest=self.media_fixture();(self.root/'media/synthetic-test.webp').unlink()
        with self.assertRaisesRegex(ValueError,'Missing approved media'): verify(self.root,SHA,manifest)

    def test_private_qa_marker_rejected(self):
        (self.root/'assets/app-hash.js').write_text('PRIVATE QA CREDIT')
        with self.assertRaises(ValueError): verify(self.root,SHA,{})
