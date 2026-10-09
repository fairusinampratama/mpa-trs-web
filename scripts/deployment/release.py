#!/usr/bin/env python3
"""Build and validate bounded, allowlisted static probe archives. Never deploy."""
import argparse
import hashlib
import json
import os
from pathlib import Path
import re
import stat
import subprocess
import sys
import zipfile

SHA = re.compile(r'[0-9a-f]{40}')
MAX_FILE = 1024 * 1024
MAX_TOTAL = 4 * MAX_FILE
REQUIRED = {'README.md', 'AGENTS.md', '.gitignore', '.github/workflows/ci.yml',
            '.github/workflows/package-release.yml', 'scripts/deployment/release.py',
            'tests/deployment/test_release.py', 'deployment-probe/index.html',
            'deployment-probe/probe.css', 'deployment-probe/robots.txt',
            'deployment-probe/.htaccess', 'docs/infrastructure/hosting-baseline.md',
            'docs/infrastructure/deployment.md', 'docs/infrastructure/recovery.md'}
ROOTS = {'docs', 'scripts', 'tests', 'deployment-probe', '.github', 'application'}
BANNED_PARTS = {'node_modules', 'vendor', 'uploads', 'backups', '__pycache__', '.git', 'storage'}
BANNED_SUFFIXES = ('.sql', '.sql.gz', '.zip', '.tar', '.gz', '.pem', '.key', '.p12', '.log', '.pyc')
SECRET = re.compile(rb'-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----|gh[pousr]_[A-Za-z0-9]{30,}|AKIA[0-9A-Z]{16}')


def digest(data):
    return hashlib.sha256(data).hexdigest()


def safe_path(name):
    if not isinstance(name, str) or not name or not re.fullmatch(r'[A-Za-z0-9_.\-/]+', name):
        raise ValueError('Invalid archive/source path')
    parts = name.split('/')
    if name.startswith('/') or any(p in ('', '.', '..') for p in parts):
        raise ValueError('Unsafe archive/source path')
    return name


def git(root, *args):
    return subprocess.check_output(['git', '-C', str(root), *args])


def source(root, revision):
    if not SHA.fullmatch(revision):
        raise ValueError('An exact 40-character lowercase Git SHA is required')
    if git(root, 'rev-parse', revision + '^{commit}').decode().strip() != revision:
        raise ValueError('Commit mismatch')
    files = {}
    for record in git(root, 'ls-tree', '-rz', '--full-tree', revision).split(b'\0'):
        if not record:
            continue
        header, raw_name = record.split(b'\t', 1)
        mode, kind, blob = header.decode().split()
        name = safe_path(raw_name.decode())
        if mode != '100644' or kind != 'blob':
            raise ValueError('Only regular non-executable source files are permitted: ' + name)
        parts = name.split('/')
        if name not in {'README.md', 'AGENTS.md', '.gitignore'} and parts[0] not in ROOTS:
            raise ValueError('Unapproved tracked path: ' + name)
        if (any(p in BANNED_PARTS - {'storage'} or (p.startswith('.env') and name != 'application/.env.example') for p in parts) or ('storage' in parts and not name.endswith('/.gitignore')) or name.lower().endswith(BANNED_SUFFIXES)):
            raise ValueError('Forbidden tracked file: ' + name)
        data = git(root, 'cat-file', 'blob', blob)
        if len(data) > MAX_FILE or SECRET.search(data):
            raise ValueError('Oversized file or credential signature: ' + name)
        files[name] = data
    if not REQUIRED <= files.keys():
        raise ValueError('Missing repository structure: ' + ', '.join(sorted(REQUIRED - files.keys())))
    return files


def canonical(value):
    return (json.dumps(value, sort_keys=True, indent=2, ensure_ascii=True) + '\n').encode()


def package(root, revision, variant, output, run_id='local', run_attempt='1'):
    if variant not in ('A', 'B') or not re.fullmatch(r'[A-Za-z0-9_-]{1,80}', run_id) or not re.fullmatch(r'[0-9]{1,6}', run_attempt):
        raise ValueError('Invalid build inputs')
    tracked = source(root, revision)
    identity = revision + '-' + variant
    asset = 'assets/probe-' + identity + '.css'
    css = tracked['deployment-probe/probe.css'].replace(b'{{COLOR}}', b'#155e75' if variant == 'A' else b'#713f12')
    html = tracked['deployment-probe/index.html']
    for token, value in {'{{REVISION}}': revision, '{{RELEASE}}': variant, '{{ASSET}}': asset}.items():
        html = html.replace(token.encode(), value.encode())
    if b'{{' in html or b'{{' in css:
        raise ValueError('Unresolved probe template')
    payload = {'public/index.html': html, 'public/' + asset: css,
               'public/robots.txt': tracked['deployment-probe/robots.txt'],
               'public/.htaccess': tracked['deployment-probe/.htaccess'],
               'REVISION': (revision + '\n').encode()}
    manifest = {'schema': 1, 'project': 'mpa-trs-web', 'source_commit': revision,
                'release': variant, 'release_id': identity,
                'build': {'run_id': run_id, 'run_attempt': run_attempt,
                          'python': sys.version.split()[0], 'packager': 'stdlib-zip-stored-v1'},
                'files': {name: {'sha256': digest(data), 'size': len(data)} for name, data in sorted(payload.items())}}
    payload['manifest.json'] = canonical(manifest)
    payload['SHA256SUMS'] = ''.join(digest(data) + '  ' + name + '\n' for name, data in sorted(payload.items())).encode()
    output = Path(output)
    output.parent.mkdir(parents=True, exist_ok=True)
    # Refuse overwrite, fixed ZIP timestamps/order/modes, no compression-version variation.
    with zipfile.ZipFile(output, 'x', compression=zipfile.ZIP_STORED) as archive:
        for name, data in sorted(payload.items()):
            entry = zipfile.ZipInfo(name, (1980, 1, 1, 0, 0, 0))
            entry.create_system = 3
            entry.external_attr = (stat.S_IFREG | 0o644) << 16
            archive.writestr(entry, data)
    verify(output, revision, variant)
    checksum = digest(output.read_bytes())
    Path(str(output) + '.sha256').write_text(checksum + '  ' + output.name + '\n')
    return checksum


def verify(path, expected_sha, expected_variant):
    if not SHA.fullmatch(expected_sha) or expected_variant not in ('A', 'B'):
        raise ValueError('Invalid expected identity')
    if Path(path).stat().st_size > MAX_TOTAL:
        raise ValueError('Archive exceeds limit')
    with zipfile.ZipFile(path) as archive:
        entries = archive.infolist()
        names = [safe_path(i.filename) for i in entries]
        if len(names) != len(set(names)) or len(names) != 7:
            raise ValueError('Duplicate or unexpected entry count')
        expected = {'REVISION', 'manifest.json', 'SHA256SUMS', 'public/index.html',
                    'public/robots.txt', 'public/.htaccess',
                    'public/assets/probe-' + expected_sha + '-' + expected_variant + '.css'}
        if set(names) != expected or sum(i.file_size for i in entries) > MAX_TOTAL:
            raise ValueError('Unexpected files or archive expansion')
        for entry in entries:
            mode = entry.external_attr >> 16
            if not stat.S_ISREG(mode) or entry.is_dir() or entry.flag_bits & 1 or entry.file_size > MAX_FILE:
                raise ValueError('Unsafe archive entry')
        data = {name: archive.read(name) for name in names}
    manifest = json.loads(data['manifest.json'])
    if (manifest.get('schema'), manifest.get('project'), manifest.get('source_commit'), manifest.get('release'), manifest.get('release_id')) != (1, 'mpa-trs-web', expected_sha, expected_variant, expected_sha + '-' + expected_variant):
        raise ValueError('Manifest identity mismatch')
    if data['REVISION'] != (expected_sha + '\n').encode():
        raise ValueError('REVISION mismatch')
    payload_names = expected - {'manifest.json', 'SHA256SUMS'}
    if manifest.get('files') != {name: {'size': len(data[name]), 'sha256': digest(data[name])} for name in sorted(payload_names)}:
        raise ValueError('Manifest integrity mismatch')
    build = manifest.get('build', {})
    if set(build) != {'run_id', 'run_attempt', 'python', 'packager'} or build['packager'] != 'stdlib-zip-stored-v1':
        raise ValueError('Build metadata mismatch')
    sums = ''.join(digest(data[name]) + '  ' + name + '\n' for name in sorted(expected - {'SHA256SUMS'})).encode()
    if data['SHA256SUMS'] != sums:
        raise ValueError('SHA256SUMS mismatch')
    html = data['public/index.html']
    if expected_sha.encode() not in html or ('assets/probe-' + expected_sha + '-' + expected_variant + '.css').encode() not in html:
        raise ValueError('HTML identity/asset mismatch')
    return manifest


def verify_directory(path, archive_path, revision, variant):
    manifest = verify(archive_path, revision, variant)
    base = Path(path)
    expected = set(manifest['files']) | {'manifest.json', 'SHA256SUMS'}
    actual = set()
    for item in base.rglob('*'):
        if item.is_symlink():
            raise ValueError('Extracted symlink')
        if item.is_file():
            actual.add(item.relative_to(base).as_posix())
    if actual != expected:
        raise ValueError('Extracted file set mismatch')
    with zipfile.ZipFile(archive_path) as archive:
        for name in expected:
            if (base / name).read_bytes() != archive.read(name):
                raise ValueError('Extracted content mismatch: ' + name)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('action', choices=['check', 'package', 'verify', 'verify-directory'])
    parser.add_argument('--root', default='.')
    parser.add_argument('--revision', required=True)
    parser.add_argument('--variant', choices=['A', 'B'], default='A')
    parser.add_argument('--archive')
    parser.add_argument('--directory')
    args = parser.parse_args()
    if args.action == 'check':
        source(args.root, args.revision)
    elif args.action == 'package':
        print(package(args.root, args.revision, args.variant, args.archive,
                      os.environ.get('GITHUB_RUN_ID', 'local'), os.environ.get('GITHUB_RUN_ATTEMPT', '1')))
    elif args.action == 'verify':
        verify(args.archive, args.revision, args.variant)
    else:
        verify_directory(args.directory, args.archive, args.revision, args.variant)
    print('Verified: ' + args.action + ' ' + args.revision + ' ' + args.variant)


if __name__ == '__main__':
    main()

