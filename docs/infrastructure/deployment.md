# Supervised deployment

## Artifact contract

`Package release` runs manually on a selected ref and records the exact event SHA. It reruns source validation and security tests before creating `release-<40-char-sha>-<A|B>.zip` and an external `.sha256`. Actions retention is 30 days. The artifact wrapper digest and inner release ZIP digest identify different objects.

The ZIP has exactly seven regular files: REVISION, manifest.json, SHA256SUMS, public/index.html, public/robots.txt, public/.htaccess and public/assets/probe-<sha>-<variant>.css. The manifest records source commit, variant, release ID, run ID/attempt, Python version and per-file length/SHA-256. SHA256SUMS covers payload and manifest, excluding itself. External checksum covers the ZIP.

ZIP entries use sorted names, fixed 1980 timestamps, mode 0644 and ZIP_STORED. Builds with identical commit, variant, run ID/attempt and Python version are byte-for-byte reproducible. Run metadata intentionally changes between Actions runs; payload content remains deterministic per commit/variant. No wall-clock timestamps enter the package.

The validator rejects duplicate names, traversal/absolute/Windows/control paths, unexpected entries, symlinks, encrypted entries, oversized expansion, wrong revision and content/manifest/checksum mismatches. It never extracts an unvalidated archive. Validation detects consistency, not trusted provenance: obtain digests from the same successful reviewed GitHub run, never only from an untrusted downloaded ZIP.

## Approved private layout

Not created until backup gate passes:

- /home/mapp5848/mpa-trs/incoming: private archives/checksums
- /home/mapp5848/mpa-trs/preview/releases/<sha>-<variant>-<run>: unique extraction target
- /home/mapp5848/mpa-trs/preview/shared: private activation/deployment records
- /home/mapp5848/mpa-trs/backups: private project backup records

Preferred preview root: /home/mapp5848/mpa-trs-preview-public, outside public_html. Approval and server acceptance required. Fallback: approved public_html/mpa-trs-preview-public, containing public files only. That fallback must also deny unauthenticated main-domain-path access. No production namespace or app is needed for this probe.

## Transport verification runbook

1. Confirm encrypted off-host backup and secure post-repair config preservation. Obtain a successful manual packaging run; record source SHA, variant, run/artifact IDs and artifact wrapper digest.
2. Download that exact Actions artifact. Open only the bounded expected wrapper and verify the inner ZIP external checksum. Run `release.py verify --revision <sha> --variant A --archive <zip>`.
3. Use cPanel File Manager HTTPS upload to private incoming. Do not overwrite a prior file. Download uploaded archive back and compare its SHA-256 with the trusted local ZIP.
4. Create a new unique private release directory. Extract validated ZIP into it, not into any existing root. Confirm extraction report contains only expected entries and no path escape.
5. Download extracted files (or a File Manager archive of that private directory) for byte comparison against the trusted release; use `verify-directory` after validating any returned archive before extraction. Visual filenames alone do not prove all content digests.
6. Record exact SHA, digest, target, verification, previous release and approval. Never mark transport complete until these real operations pass.

## Preview and activation gates

Present exact domain/root/DNS changes for approval before creating preview.mapalatursina.my.id. Configure HTTPS and cPanel Directory Privacy via secure credential handling before serving probe content. Verify unauthenticated HTML and asset requests are denied; noindex is additional protection. Private metadata, configuration and archives must not be served.

Evaluate root switching only for the separate approved preview domain; never change main/SLiMS/E-Letter roots. Otherwise evaluate a narrowly allowlisted version selector with immutable versioned assets, without arbitrary commands or path input. If neither is supported, use supervised public-directory promotion with a maintenance window. No mechanism is selected or claimed atomic until tested.

Prove A -> B -> A, retaining both releases. At each transition verify visible revision, HTML, matching versioned CSS, desktop/mobile view, HTTPS, auth denial, no private exposure, console errors, main welcome page, SLiMS catalog/search/details and E-Letter login. No database, migrations or production deployment.

## Workflow controls

Feature branch -> PR -> CI -> reviewed merge. Main CI and manual packaging repeat tests. Actions permissions are contents:read; no deployment secrets, production job or privileged PR events. Pinned action revisions. Repository protection/enforcement must be verified separately; documented conventions alone do not enforce approvals.
