"""Publish verified bytes to one dedicated artifact repository; never production."""
import base64
import json
import os
import re
import urllib.request
from verify_preview import verify

TARGET = 'fairusinampratama/mpa-trs-preview'
BRANCH = 'main'

def publish():
    if os.environ.get('PREVIEW_TARGET') != TARGET:
        raise ValueError('Exact preview repository required')
    commit = os.environ['SOURCE_COMMIT']
    files = verify('dist', commit)
    token = os.environ['PREVIEW_PUBLISH_TOKEN']
    if not token:
        raise ValueError('Preview-only credential missing')
    def api(path, data=None, method=None):
        request = urllib.request.Request('https://api.github.com/repos/' + TARGET + path,
            data=None if data is None else json.dumps(data).encode(),
            headers={'Authorization': 'Bearer ' + token, 'Accept': 'application/vnd.github+json',
                     'Content-Type': 'application/json', 'X-GitHub-Api-Version': '2022-11-28'},
            method=method or ('GET' if data is None else 'POST'))
        with urllib.request.urlopen(request, timeout=30) as response:
            return json.load(response)
    repo = api('')
    if repo.get('private') or repo.get('default_branch') != BRANCH:
        raise ValueError('Dedicated public repository with main required')
    parent = api('/git/ref/heads/' + BRANCH)['object']['sha']
    tree = []
    for path, data in sorted(files.items()):
        blob = api('/git/blobs', {'encoding':'base64', 'content':base64.b64encode(data).decode()})
        tree.append({'path':path, 'mode':'100644', 'type':'blob', 'sha':blob['sha']})
    # Deliberate complete snapshot of this artifact-only repo. Prior commits remain.
    tree_sha = api('/git/trees', {'tree':tree})['sha']
    result = api('/git/commits', {'message':'Stage 3 preview from ' + commit,
                               'tree':tree_sha, 'parents':[parent]})
    if api('/git/ref/heads/' + BRANCH)['object']['sha'] != parent:
        raise ValueError('Preview branch changed; inspect before retry')
    api('/git/refs/heads/' + BRANCH, {'sha':result['sha'], 'force':False}, 'PATCH')
    print('Published artifact commit', result['sha'], 'from source', commit)
    # This proves a Git push only. GitHub Pages build + HTTPS verification follow separately.

if __name__ == '__main__':
    publish()
