"""Exercise the packaged Laravel runtime and marker recovery in temporary private Work/CI paths."""
import argparse
import json
from pathlib import Path
import secrets
import shutil
import socket
import subprocess
import tempfile
import time
import urllib.error
import urllib.request
import zipfile
from application_release import verify


def rehearse(archive, revision, archive_b=None, revision_b=None):
    verify(archive, revision)
    with tempfile.TemporaryDirectory(prefix='mpa-trs-runtime-') as tmp:
        root = Path(tmp); private = root/'private'; shared = private/'shared'; public = root/'public'
        release = private/'releases'/revision
        shared.mkdir(parents=True); public.mkdir()
        with zipfile.ZipFile(archive) as z:
            z.extractall(release)  # Only after bounded path/type/integrity validation above.
        completion = release/'COMPLETE.json'
        completion.write_text(json.dumps({'revision': revision, 'extraction_verified': True, 'assets_verified': True})+'\n')
        shutil.copytree(release/'application/public/mpa-trs-assets', public/'mpa-trs-assets')
        if archive_b:
            verify(archive_b, revision_b)
            other=private/'releases'/revision_b
            with zipfile.ZipFile(archive_b) as z: z.extractall(other)
            (other/'COMPLETE.json').write_text(json.dumps({'revision':revision_b,'extraction_verified':True,'assets_verified':True})+'\n')
            shutil.copytree(other/'application/public/mpa-trs-assets'/revision_b, public/'mpa-trs-assets'/revision_b)
        for manifest in (public/'mpa-trs-assets').glob('*/manifest.json'): manifest.unlink()
        for path in ['framework/cache/data', 'framework/sessions', 'framework/views', 'logs']:
            (shared/'storage'/path).mkdir(parents=True)
        import base64
        key = base64.b64encode(secrets.token_bytes(32)).decode()
        (shared/'.env').write_text('APP_ENV=production\nAPP_DEBUG=false\nAPP_KEY=base64:'+key+'\nAPP_URL=http://127.0.0.1\nSESSION_DRIVER=file\nCACHE_STORE=file\nQUEUE_CONNECTION=sync\nLOG_CHANNEL=single\nDB_CONNECTION=sqlite\nDB_DATABASE=:memory:\n')
        marker = shared/'active-release'; marker.write_text(revision+'\n')
        entry = (Path(__file__).parent/'main-entry.php').read_text().replace('/home/mapp5848/mpa-trs/production', str(private))
        (public/'index.php').write_text(entry)
        # PHP built-in server's router is a local test harness, never a hosting artifact.
        router = root/'router.php'
        router.write_text("<?php $path=parse_url($_SERVER['REQUEST_URI'],PHP_URL_PATH); if (str_starts_with($path,'/mpa-trs-assets/') && is_file(__DIR__.'/public'.$path)) return false; require __DIR__.'/public/index.php';")
        with socket.socket() as sock:
            sock.bind(('127.0.0.1', 0)); port = sock.getsockname()[1]
        server = subprocess.Popen(['php', '-S', f'127.0.0.1:{port}', '-t', str(public), str(router)], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        def request(path):
            try:
                with urllib.request.urlopen(f'http://127.0.0.1:{port}'+path, timeout=5) as response:
                    return response.status, response.read()
            except urllib.error.HTTPError as error: return error.code, error.read()
        try:
            for attempt in range(50):
                try: status, html = request('/'); break
                except urllib.error.URLError: time.sleep(.1)
            assert status == 200 and b'MAPALA TURSINA' in html, 'Packaged landing page failed'
            assert request('/health') == (200, json.dumps({'status':'ok','revision':revision}, separators=(',', ':')).encode()), 'Release health identity failed'
            import re
            css = re.search(rb'href="(http://[^" ]+)?(/mpa-trs-assets/[^" ]+\.css)"', html)
            assert css and request(css.group(2).decode())[0] == 200, 'Versioned CSS failed'
            for path in ['/.env', '/composer.json', '/manifest.json', '/vendor/autoload.php']:
                assert request(path)[0] == 404, 'Private path exposed'
            completion.unlink()
            assert request('/')[0] == 503, 'Incomplete release did not fail closed'
            completion.write_text(json.dumps({'revision': revision, 'extraction_verified': True, 'assets_verified': True})+'\n')
            for flag in ('extraction_verified','assets_verified'):
                invalid={'revision':revision,'extraction_verified':True,'assets_verified':True};invalid[flag]=False
                completion.write_text(json.dumps(invalid)+'\n')
                assert request('/')[0]==503, 'Unverified release did not fail closed'
            completion.write_text(json.dumps({'revision':revision,'extraction_verified':True,'assets_verified':True})+'\n')
            marker.write_text('../escape\n')
            assert request('/')[0] == 503, 'Invalid marker did not fail closed'
            marker.write_text(revision+'\n')
            assert request('/health')[0] == 200, 'Marker recovery failed'
            if archive_b:
                for selected in (revision, revision_b, revision):
                    marker.write_text(selected+'\n')
                    code, page=request('/')
                    assert code==200 and b'MAPALA TURSINA' in page
                    assert request('/health')==(200,json.dumps({'status':'ok','revision':selected},separators=(',',':')).encode())
                    links=re.findall(rb'href="(?:http://[^" ]+)?(/mpa-trs-assets/[^" ]+\.css)"',page)
                    assert len(links)==1 and ('/mpa-trs-assets/'+selected+'/').encode() in links[0], 'Mixed release CSS'
                    with zipfile.ZipFile(archive if selected==revision else archive_b) as z:
                        assert request(links[0].decode())==(200,z.read('application/public'+links[0].decode())), 'CSS byte mismatch'
                print('Real packaged Laravel release A -> B -> A health/HTML/CSS passed.')
            assert request(css.group(2).decode())[0] == 200, 'Assets lost during recovery'
        finally:
            server.terminate(); server.wait(timeout=5)
    print('Packaged Laravel HTTP, CSS, private denial and marker recovery passed (Work/CI only).')

if __name__ == '__main__':
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--archive', required=True); parser.add_argument('--revision', required=True)
    parser.add_argument('--archive-b'); parser.add_argument('--revision-b')
    args=parser.parse_args(); rehearse(args.archive, args.revision, args.archive_b, args.revision_b)

