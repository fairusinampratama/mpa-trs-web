"""HTTP release checks; browser interactions must be verified separately."""
import json
import re
import sys
import time
import urllib.error
import urllib.request
URL = 'https://fairusinampratama.github.io/mpa-trs-preview/'
def get(path, sha):
    request = urllib.request.Request(URL + path + '?source=' + sha, headers={'Cache-Control':'no-cache'})
    with urllib.request.urlopen(request, timeout=20) as response:
        return response.read().decode('utf-8')
def main(sha):
    if not re.fullmatch('[a-f0-9]{40}', sha): raise ValueError('Exact source SHA required')
    for attempt in range(30):
        try:
            if json.loads(get('version.json', sha)).get('sourceCommit') == sha: break
        except (urllib.error.URLError, ValueError): pass
        if attempt == 29: raise ValueError('Pages did not serve expected commit within five minutes')
        time.sleep(10)
    for path in ('index.html', 'responsive-review.html'):
        html = get(path, sha)
        if 'noindex' not in html: raise ValueError('Missing prototype indexing convention')
        for asset in re.findall(r'(?:src|href)=["\'](/mpa-trs-preview/assets/[^"\']+)', html):
            get(asset.removeprefix('/mpa-trs-preview/'), sha)
    print('Verified HTTPS entries/assets/version:', URL, sha)
    print('Browser journeys still require real browser inspection.')
if __name__ == '__main__': main(sys.argv[1])
