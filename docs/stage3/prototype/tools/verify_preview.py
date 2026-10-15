"""Fail closed on unexpected public-preview output. No files copied from parent docs."""
import hashlib
import json
from pathlib import Path
import re
import sys
import subprocess
import struct
from functools import lru_cache

REQUIRED = {'index.html', 'responsive-review.html', 'version.json', '.nojekyll'}
ASSET = re.compile(r'assets/[A-Za-z0-9_-]+\.(?:js|css)')
FONT = re.compile(r'assets/source-(?:sans-3|serif-4)-latin-[A-Za-z0-9_-]+\.woff2')
# Only the two exact approved official font builds, never arbitrary binary/media.
APPROVED_FONT_SHA256 = {
    '19143dca075972bc84e3fd9eab7416dd40cc565dccb2435a044bdfabe060c7d5',
    '382475f38242c52d42a3e5ff8dc69b5d73f10d0d21e4550b5fe232984688779a',
}
PRIVATE = re.compile(r'/home/|mapp5848|tokala\.iixcp|drive\.google\.com|docs/infrastructure|BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY|github_pat_|ghp_[A-Za-z0-9]{30}|AIza[0-9A-Za-z_-]{30}|\b(?:AKIA|ASIA)[A-Z0-9]{16}')

@lru_cache(maxsize=1)
def approved_media():
    root = Path(__file__).resolve().parent.parent
    result = subprocess.run(['node', str(root/'tools/media_manifest.mjs')], cwd=root, capture_output=True, text=True, check=True, timeout=30)
    return json.loads(result.stdout)

def webp_dimensions(data):
    if data[:4] != b'RIFF' or data[8:12] != b'WEBP' or int.from_bytes(data[4:8], 'little') + 8 != len(data):
        raise ValueError('Invalid WebP container')
    offset, dimensions, image_chunks = 12, None, 0
    while offset < len(data):
        if offset + 8 > len(data): raise ValueError('Truncated WebP chunk')
        kind, size = data[offset:offset+4], int.from_bytes(data[offset+4:offset+8], 'little')
        chunk = data[offset+8:offset+8+size]
        if len(chunk) != size: raise ValueError('Truncated WebP image')
        if kind == b'VP8 ':
            if len(chunk) < 10 or chunk[3:6] != b'\x9d\x01\x2a': raise ValueError('Invalid WebP frame')
            dimensions = tuple(v & 0x3fff for v in struct.unpack('<HH', chunk[6:10])); image_chunks += 1
        elif kind == b'VP8L':
            if len(chunk) < 5 or chunk[0] != 0x2f: raise ValueError('Invalid lossless WebP frame')
            bits = int.from_bytes(chunk[1:5], 'little'); dimensions = ((bits & 0x3fff)+1, ((bits >> 14) & 0x3fff)+1); image_chunks += 1
        elif kind == b'VP8X':
            if len(chunk) != 10 or chunk[0] & 0x3e: raise ValueError('Metadata/animation in WebP')
        else:
            raise ValueError('Unapproved WebP chunk/metadata')
        offset += 8 + size + (size % 2)
    if offset != len(data) or not dimensions or image_chunks != 1: raise ValueError('Invalid WebP payload')
    return dimensions

def verify(directory, commit, media_manifest=None):
    root = Path(directory)
    media = approved_media() if media_manifest is None else media_manifest
    if not re.fullmatch(r'[a-f0-9]{40}', commit):
        raise ValueError('Exact source SHA required')
    files = {}
    for path in root.rglob('*'):
        if path.is_symlink():
            raise ValueError('Symlink in public payload')
        if path.is_dir():
            continue
        relative = path.relative_to(root).as_posix()
        if relative not in REQUIRED and not ASSET.fullmatch(relative) and not FONT.fullmatch(relative) and relative not in media:
            raise ValueError('Unexpected public file: ' + relative)
        data = path.read_bytes()
        if len(data) > 2_000_000:
            raise ValueError('Oversize public file')
        if relative in media:
            expected = media[relative]
            if not re.fullmatch(r'media/[a-z0-9-]+\.webp', relative) or len(data) != expected['bytes'] or hashlib.sha256(data).hexdigest() != expected['sha256']:
                raise ValueError('Unapproved media identity: ' + relative)
            if webp_dimensions(data) != (expected['width'], expected['height']): raise ValueError('Wrong media dimensions')
            files[relative] = data
            continue
        if FONT.fullmatch(relative):
            if data[:4] != b'wOF2' or hashlib.sha256(data).hexdigest() not in APPROVED_FONT_SHA256:
                raise ValueError('Unapproved web font: ' + relative)
            files[relative] = data
            continue
        text = data.decode('utf-8')
        if '/mpa-trs-preview/' in text:
            raise ValueError('Obsolete preview base in ' + relative)
        if re.search(r'integration-(?:independent|multi|undated|approx)|data-proof-(?:te|pd|work|history|member)|contract-activity|restricted-work-proof|pd-no-cohort-proof|PRIVATE QA CREDIT', text):
            raise ValueError('Test-only record in public payload')
        if PRIVATE.search(text):
            raise ValueError('Private-content pattern in ' + relative)
        files[relative] = data
    if not REQUIRED <= files.keys() or not any(p.endswith('.js') for p in files):
        raise ValueError('Incomplete preview')
    if not media.keys() <= files.keys(): raise ValueError('Missing approved media derivative')
    if sum(v['bytes'] for v in media.values()) > 2_500_000: raise ValueError('Media collection budget exceeded')
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
