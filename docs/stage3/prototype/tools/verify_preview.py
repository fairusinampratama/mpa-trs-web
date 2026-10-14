"""Fail closed on unexpected public-preview output. No files copied from parent docs."""
import json
from pathlib import Path
import re
import sys

REQUIRED = {'index.html', 'responsive-review.html', 'version.json', '.nojekyll'}
ASSET = re.compile(r'assets/[A-Za-z0-9_-]+\.(?:js|css)')
PRIVATE = re.compile(r'/home/|mapp5848|tokala\.iixcp|drive\.google\.com|docs/infrastructure|BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY|github_pat_|ghp_[A-Za-z0-9]{30}|AIza[0-9A-Za-z_-]{30}|\b(?:AKIA|ASIA)[A-Z0-9]{16}')

def verify(directory, commit):
    root = Path(directory)
    if not re.fullmatch(r'[a-f0-9]{40}', commit):
        raise ValueError('Exact source SHA required')
    files = {}
    for path in root.rglob('*'):
        if path.is_symlink():
            raise ValueError('Symlink in public payload')
        if path.is_dir():
            continue
        relative = path.relative_to(root).as_posix()
        if relative not in REQUIRED and not ASSET.fullmatch(relative):
            raise ValueError('Unexpected public file: ' + relative)
        data = path.read_bytes()
        if len(data) > 2_000_000:
            raise ValueError('Oversize public file')
        text = data.decode('utf-8')
        if PRIVATE.search(text):
            raise ValueError('Private-content pattern in ' + relative)
        files[relative] = data
    if not REQUIRED <= files.keys() or not any(p.endswith('.js') for p in files):
        raise ValueError('Incomplete preview')
    version = json.loads(files['version.json'])
    if version != {'stage': 3, 'prototype': True, 'sourceCommit': commit}:
        raise ValueError('Preview source identity mismatch')
    for entry in ('index.html', 'responsive-review.html'):
        text = files[entry].decode()
        if re.search(r'(?:href|src)=[\"\']/assets/', text):
            raise ValueError('Unscoped project-site asset path')
    if b'#' not in files['responsive-review.html'] or b'/ui-lab' not in files['responsive-review.html']:
        raise ValueError('Missing review hash routes')
    return files

if __name__ == '__main__':
    payload = verify(sys.argv[1], sys.argv[2])
    print('Verified static-only preview:', len(payload), 'files; source', sys.argv[2])
