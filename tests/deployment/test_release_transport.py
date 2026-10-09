import ftplib
import io
import sys
from pathlib import Path
import unittest

sys.path.insert(0, str(Path(__file__).resolve().parents[2]/'scripts/deployment'))
import ftps_release_rehearsal as r


class MemoryFTP:
    def __init__(self):
        self.files = {'active-release': ('a'*40+'\n').encode()}
        self.directories = set()
        self.renames = []
        self.reject_rename = False
        self.corrupt = False
    def storbinary(self, command, stream):
        self.files[command[5:]] = stream.read()
    def retrbinary(self, command, callback):
        callback(b'corrupt' if self.corrupt else self.files[command[5:]])
    def rename(self, source, target):
        if self.reject_rename:
            raise ftplib.error_perm('replacement unsupported')
        self.renames.append((source, target))
        self.files[target] = self.files.pop(source)
    def mkd(self, name):
        if name in self.directories:
            raise ftplib.error_perm('exists')
        self.directories.add(name)
    def cwd(self, name):
        pass
    def mlsd(self, path):
        return [('cache', {'type': 'dir', 'unix.mode': '0755'})]


class ReleaseTransportTests(unittest.TestCase):
    def test_replacement_and_reversal_retain_files(self):
        ftp = MemoryFTP()
        a, b = 'a'*40, 'b'*40
        r.replace_selector(ftp, b, a, {a,b}, 1)
        self.assertEqual(ftp.files['active-release'], (b+'\n').encode())
        r.replace_selector(ftp, a, b, {a,b}, 2)
        self.assertEqual(ftp.files['active-release'], (a+'\n').encode())
        self.assertEqual(len(ftp.renames), 2)
    def test_failed_replacement_preserves_previous_no_delete_fallback(self):
        ftp = MemoryFTP(); ftp.reject_rename = True
        with self.assertRaises(ftplib.error_perm):
            r.replace_selector(ftp, 'b'*40, 'a'*40, {'a'*40, 'b'*40}, 1)
        self.assertEqual(ftp.files['active-release'], ('a'*40+'\n').encode())
    def test_unexpected_previous_refuses_write(self):
        ftp = MemoryFTP()
        with self.assertRaises(ValueError):
            r.replace_selector(ftp, 'b'*40, 'c'*40, {'b'*40}, 1)
        self.assertEqual(set(ftp.files), {'active-release'})
    def test_partial_release_cannot_be_selected(self):
        ftp = MemoryFTP()
        with self.assertRaises(ValueError):
            r.replace_selector(ftp, 'b'*40, 'a'*40, {'a'*40}, 1)
        self.assertFalse(ftp.renames)
    def test_failed_upload_has_no_completion_or_activation(self):
        ftp = MemoryFTP(); ftp.corrupt = True
        with self.assertRaises(ValueError):
            r.upload_new_release(ftp, 'a'*40, {'manifest.json': b'{}', 'application/REVISION': b'a'})
        self.assertNotIn('COMPLETE.json', ftp.files)
        self.assertFalse(ftp.renames)
    def test_complete_record_last_and_permissions_observed(self):
        ftp = MemoryFTP()
        result = r.upload_new_release(ftp, 'b'*40, {'manifest.json': b'{}', 'application/REVISION': b'b'})
        self.assertEqual(list(ftp.files)[-1], 'COMPLETE.json')
        self.assertTrue(result['owner_write_permission_verified'])
        self.assertEqual(result['files'], 2)
    def test_existing_release_refuses_overwrite(self):
        ftp = MemoryFTP(); ftp.directories.add('a'*40)
        with self.assertRaises(ftplib.error_perm):
            r.upload_new_release(ftp, 'a'*40, {'manifest.json': b'{}'})
        self.assertEqual(set(ftp.files), {'active-release'})
    def test_unsafe_paths_rejected(self):
        ftp = MemoryFTP()
        for name in ('../escape', '/public_html/index.php', 'x\r\nSITE EXEC'):
            with self.subTest(name=name), self.assertRaises(ValueError):
                r.put_verified(ftp, name, b'test')
        self.assertEqual(set(ftp.files), {'active-release'})


if __name__ == '__main__':
    unittest.main()
