import hashlib
import json
import unittest
import verify_live as v


class LiveVerificationTests(unittest.TestCase):
    def fixture(self):
        sha='a'*40; css=b'body{}'; asset='/mpa-trs-assets/'+sha+'/assets/app.css'
        ready={'revision':sha,'public':{'assets/app.css':hashlib.sha256(css).hexdigest()}}
        responses={'/health':(200,json.dumps({'status':'ok','revision':sha}).encode()),
                   '/':(200,('MAPALA TURSINA <link href="'+asset+'">').encode()),asset:(200,css)}
        return sha,ready,responses
    def test_revision_and_css_identity_and_denial(self):
        sha,ready,responses=self.fixture()
        result=v.verify(sha,ready,lambda path:responses.get(path,(404,b'')))
        self.assertTrue(result['private_url_denial_verified'])
        self.assertFalse(result['browser_rendering_verified'])
    def test_wrong_revision_refused(self):
        sha,ready,responses=self.fixture()
        responses['/health']=(200,b'{"status":"ok","revision":"wrong"}')
        with self.assertRaises(ValueError): v.verify(sha,ready,lambda path:responses.get(path,(404,b'')))
    def test_stale_css_and_public_private_path_refused(self):
        sha,ready,responses=self.fixture()
        for name,value in [('/.env',(200,b'private')),('/mpa-trs-assets/'+sha+'/assets/app.css',(200,b'stale'))]:
            with self.subTest(name=name),self.assertRaises(ValueError):
                v.verify(sha,ready,lambda path: value if path==name else responses.get(path,(404,b'')))
    def test_extra_old_asset_refused(self):
        sha,ready,responses=self.fixture()
        responses['/']=(200,responses['/'][1]+b'<link href="/mpa-trs-assets/'+b'b'*40+b'/assets/old.css">')
        with self.assertRaises(ValueError): v.verify(sha,ready,lambda path:responses.get(path,(404,b'')))


if __name__=='__main__': unittest.main()
