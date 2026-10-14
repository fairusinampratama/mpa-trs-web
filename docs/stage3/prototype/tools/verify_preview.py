"""Fail closed on unexpected public-preview output. No files copied from parent docs."""
import hashlib
import json
from pathlib import Path
import re
import sys

REQUIRED = {'index.html', 'responsive-review.html', 'version.json', '.nojekyll'}
ASSET = re.compile(r'assets/[A-Za-z0-9_-]+\.(?:js|css)')
FONT = re.compile(r'assets/source-(?:sans-3|serif-4)-latin-[A-Za-z0-9_-]+\.woff2')
# Only the two exact approved official font builds, never arbitrary binary/media.
APPROVED_FONT_SHA256 = {
    '19143dca075972bc84e3fd9eab7416dd40cc565dccb2435a044bdfabe060c7d5',
    '382475f38242c52d42a3e5ff8dc69b5d73f10d0d21e4550b5fe232984688779a',
}
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
        if relative not in REQUIRED and not ASSET.fullmatch(relative) and not FONT.fullmatch(relative):
            raise ValueError('Unexpected public file: ' + relative)
        data = path.read_bytes()
        if len(data) > 2_000_000:
            raise ValueError('Oversize public file')
        if FONT.fullmatch(relative):
            if data[:4] != b'wOF2' or hashlib.sha256(data).hexdigest() not in APPROVED_FONT_SHA256:
                raise ValueError('Unapproved web font: ' + relative)
            files[relative] = data
            continue
        text = data.decode('utf-8')
        if '/mpa-trs-preview/' in text:
            raise ValueError('Obsolete preview base in ' + relative)
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
