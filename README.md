# MPA-TRS Web

Private, framework-neutral deployment foundation for Mapala Tursina. GitHub is the source of truth; Actions builds tested static probe artifacts; Rumahweb hosts persistent files. No application framework or database has been initialized.

## Local validation

Python 3.12+ and Git are sufficient; no third-party packages are required.

```sh
python3 -m unittest discover -s tests/deployment -v
python3 scripts/deployment/release.py check --revision "$(git rev-parse HEAD)"
python3 scripts/deployment/release.py package --revision "$(git rev-parse HEAD)" --variant A --archive /tmp/probe-A.zip
```

Use feature branches and pull requests; require the `Validate deployment foundation` check where repository protection permits. The manual `Package release` workflow packages its exact selected Git SHA. It has no hosting credentials and cannot deploy production. Review actual run results before downloading an artifact.

Read [hosting baseline](docs/infrastructure/hosting-baseline.md), [deployment](docs/infrastructure/deployment.md), [recovery](docs/infrastructure/recovery.md), and [implementation evidence](docs/infrastructure/phase3-implementation.md). Preview deployment remains gated by encrypted backup preservation, verified transport and separate domain/root approval.
