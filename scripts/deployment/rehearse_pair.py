"""Build the exact Git parent and exercise real packaged Laravel A -> B -> A in CI.
No hosting connection; parent dependencies/assets are built from its own locks.
"""
import argparse
import io
from pathlib import Path
import shutil
import subprocess
import tarfile
import tempfile
import application_release
from rehearse_application import rehearse

def run(archive, revision):
    current=subprocess.check_output(['git','rev-parse','HEAD']).decode().strip()
    if current != revision: raise ValueError('Checkout and release identity differ')
    parent=subprocess.check_output(['git','rev-parse','HEAD^']).decode().strip()
    with tempfile.TemporaryDirectory(prefix='mpatrs-parent-') as tmp:
        root=Path(tmp)
        data=subprocess.check_output(['git','archive',parent,'application'])
        with tarfile.open(fileobj=io.BytesIO(data)) as source:
            source.extractall(root,filter='data')  # Tracked source only, no credentials.
        app=root/'application'
        shutil.copyfile(app/'.env.example',app/'.env')
        subprocess.run(['composer','install','--no-dev','--no-interaction','--prefer-dist','--optimize-autoloader'],cwd=app,check=True)
        subprocess.run(['composer','check-platform-reqs','--no-dev'],cwd=app,check=True)
        subprocess.run(['npm','ci'],cwd=app,check=True)
        subprocess.run(['npm','run','build'],cwd=app,check=True)
        other=root/'parent.zip'
        application_release.package(root,parent,other,run='parent-'+__import__('os').environ.get('GITHUB_RUN_ID','local'))
        rehearse(archive,revision,other,parent)

if __name__=='__main__':
    p=argparse.ArgumentParser(description=__doc__)
    p.add_argument('--archive',required=True);p.add_argument('--revision',required=True)
    a=p.parse_args();run(a.archive,a.revision)
