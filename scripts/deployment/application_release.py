"""Package bounded Laravel releases; never activate or deploy hosting."""
import argparse
import hashlib
import json
from pathlib import Path
import re
import stat
import zipfile

SHA = re.compile(r'[a-f0-9]{40}')
MAX_FILE = 16 * 1024 * 1024
MAX_TOTAL = 128 * 1024 * 1024
MAX_ENTRIES = 12000
ROOTS = {'app', 'bootstrap', 'config', 'routes', 'vendor'}

def digest(data):
    return hashlib.sha256(data).hexdigest()

def safe(name):
    if not isinstance(name, str) or not re.fullmatch(r'[A-Za-z0-9_./@+~-]+', name):
        raise ValueError('Invalid release path')
    parts = name.split('/')
    if name.startswith('/') or any(p in ('', '.', '..') for p in parts):
        raise ValueError('Unsafe release path')
    if any(p.startswith('.env') or p in {'node_modules', '.git', 'uploads', 'backups', 'storage'} for p in parts):
        raise ValueError('Forbidden release path')
    if name.lower().endswith(('.sql', '.pem', '.key', '.log', '.zip', '.tar', '.gz')):
        raise ValueError('Forbidden release file')
    return name

def allowed(name, revision):
    safe(name)
    if not name.startswith('application/'):
        return False
    rel = name.removeprefix('application/')
    if rel in {'composer.json', 'composer.lock', 'REVISION'}:
        return True
    if rel.startswith('resources/views/'):
        return True
    if rel.startswith('public/mpa-trs-assets/' + revision + '/'):
        return True
    if rel.startswith('bootstrap/cache/'):
        return rel in {'bootstrap/cache/packages.php', 'bootstrap/cache/services.php'}
    return rel.split('/')[0] in ROOTS

def verify(path, revision):
    if not SHA.fullmatch(revision) or Path(path).stat().st_size > MAX_TOTAL:
        raise ValueError('Invalid release identity or size')
    with zipfile.ZipFile(path) as z:
        infos = z.infolist()
        names = [safe(i.filename) for i in infos]
        if len(names) != len(set(names)) or len(names) > MAX_ENTRIES or sum(i.file_size for i in infos) > MAX_TOTAL:
            raise ValueError('Invalid inventory or expansion')
        for i in infos:
            if not stat.S_ISREG(i.external_attr >> 16) or i.is_dir() or i.flag_bits & 1 or i.file_size > MAX_FILE:
                raise ValueError('Unsafe entry')
            if i.filename not in {'REVISION', 'manifest.json', 'SHA256SUMS'} and not allowed(i.filename, revision):
                raise ValueError('Unexpected application file')
        data = {i.filename: z.read(i) for i in infos}
    required = {'REVISION', 'manifest.json', 'SHA256SUMS', 'application/REVISION', 'application/vendor/autoload.php', 'application/bootstrap/app.php', 'application/composer.lock', 'application/public/mpa-trs-assets/' + revision + '/manifest.json'}
    if not required <= data.keys() or data['REVISION'] != (revision + '\n').encode() or data['application/REVISION'] != data['REVISION']:
        raise ValueError('Missing runtime or revision')
    manifest = json.loads(data['manifest.json'])
    payload = {n: {'size': len(b), 'sha256': digest(b)} for n, b in sorted(data.items()) if n not in {'manifest.json', 'SHA256SUMS'}}
    if manifest.get('schema') != 2 or manifest.get('project') != 'mpa-trs-web' or manifest.get('source_commit') != revision or manifest.get('files') != payload:
        raise ValueError('Invalid metadata or file integrity')
    build = manifest.get('build', {})
    if set(build) != {'run_id', 'php_target', 'format'} or build.get('php_target') != '8.2' or build.get('format') != 'stored-zip-v2' or not isinstance(build.get('run_id'), str) or not re.fullmatch(r'[A-Za-z0-9_-]{1,80}', build['run_id']):
        raise ValueError('Invalid build metadata')
    expected = ''.join(digest(b) + '  ' + n + '\n' for n, b in sorted(data.items()) if n != 'SHA256SUMS').encode()
    if data['SHA256SUMS'] != expected:
        raise ValueError('Checksum mismatch')
    lock = json.loads(data['application/composer.lock'])
    installed = json.loads(data['application/vendor/composer/installed.json'])
    if installed.get('dev') is not False:
        raise ValueError('Development dependencies in release')
    if {p['name'] for p in installed['packages']} != {p['name'] for p in lock['packages']}:
        raise ValueError('Production dependency set mismatch')
    assets = json.loads(data['application/public/mpa-trs-assets/' + revision + '/manifest.json'])
    css = assets.get('resources/css/app.css', {}).get('file', '')
    if not css.startswith('assets/') or not css.endswith('.css') or 'application/public/mpa-trs-assets/' + revision + '/' + css not in data:
        raise ValueError('Missing compiled CSS')
    return manifest

def package(root, revision, output, run='local'):
    if not SHA.fullmatch(revision) or not re.fullmatch(r'[A-Za-z0-9_-]{1,80}', run):
        raise ValueError('Invalid build identity')
    app = Path(root) / 'application'
    payload = {'REVISION': (revision + '\n').encode(), 'application/REVISION': (revision + '\n').encode()}
    for p in app.rglob('*'):
        rel = p.relative_to(app).as_posix()
        if rel.split('/')[0] in {'node_modules', 'storage', 'tests', '.git', '.phpunit.cache'}:
            continue
        if p.is_symlink():
            raise ValueError('Symlink in application build')
        if not p.is_file():
            continue
        if rel.startswith('public/build/'):
            name = 'application/public/mpa-trs-assets/' + revision + '/' + rel.removeprefix('public/build/')
        else:
            name = 'application/' + rel
            if not (rel.split('/')[0] in ROOTS or rel.startswith('resources/views/') or rel in {'composer.json', 'composer.lock'}):
                continue
            if rel.startswith('bootstrap/cache/') and rel not in {'bootstrap/cache/packages.php', 'bootstrap/cache/services.php'}:
                continue
        if not allowed(name, revision):
            raise ValueError('Unsafe production file: ' + name)
        payload[name] = p.read_bytes()
    manifest = {'schema': 2, 'project': 'mpa-trs-web', 'source_commit': revision, 'build': {'run_id': run, 'php_target': '8.2', 'format': 'stored-zip-v2'}, 'files': {n: {'size': len(b), 'sha256': digest(b)} for n, b in sorted(payload.items())}}
    payload['manifest.json'] = (json.dumps(manifest, sort_keys=True, indent=2) + '\n').encode()
    payload['SHA256SUMS'] = ''.join(digest(b) + '  ' + n + '\n' for n, b in sorted(payload.items())).encode()
    out = Path(output); out.parent.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(out, 'x', compression=zipfile.ZIP_STORED) as z:
        for n, b in sorted(payload.items()):
            i = zipfile.ZipInfo(n, (1980, 1, 1, 0, 0, 0)); i.create_system = 3; i.external_attr = (stat.S_IFREG | 0o644) << 16
            z.writestr(i, b)
    verify(out, revision)
    Path(str(out) + '.sha256').write_text(digest(out.read_bytes()) + '  ' + out.name + '\n')

if __name__ == '__main__':
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument('action', choices=['package', 'verify']); p.add_argument('--root', default='.'); p.add_argument('--revision', required=True); p.add_argument('--archive', required=True); p.add_argument('--run', default='local')
    a = p.parse_args()
    if a.action == 'package': package(a.root, a.revision, a.archive, a.run)
    else: verify(a.archive, a.revision)
    print(json.dumps({'revision':a.revision,'archive_sha256':digest(Path(a.archive).read_bytes()),'archive_bytes':Path(a.archive).stat().st_size,'verified':True},sort_keys=True))

