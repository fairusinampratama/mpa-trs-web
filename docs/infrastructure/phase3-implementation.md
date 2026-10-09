# Phase 3 implementation evidence

Status: **partially complete**, 8 October 2026. Private transport is verified; preview-domain approval is pending. No production deployment, preview activation or A -> B -> A has occurred.

## Source of truth and CI

Private repository: https://github.com/fairusinampratama/mpa-trs-web ; default branch main. Framework-neutral static probe only; no Laravel/application/database initialized. PR #1 (infra/phase3-foundation) merged after successful actual CI. Release source is exact merge commit `f980c20ecc521e5cd824e456691e0c1cefe209b2`.

| Workflow | Run | Actual result |
|---|---|---|
| PR CI | 37817969524 | success, source a66c89f8d24132d4cd454bd82cf65bcb507e1bc6 |
| Main CI | 37818406414 | success, source f980c20ecc521e5cd824e456691e0c1cefe209b2 |
| Manual package A | 37818854929 | success; artifact 11568895498 |
| Manual package B | 37819213341 | success; artifact 11568875700 |

No failed CI runs observed. Twelve adversarial packaging/integrity tests also pass locally. PR/main CI validates committed structure and forbidden content, compiles scripts, tests traversal/duplicate/symlink/oversize/tamper defenses, and packages/verifies A/B. Manual workflow repeats tests, records exact event SHA and uploads ZIP/checksum with 30-day retention. No deployment secrets or production job.

Rulesets API returned 403: upgrade to GitHub Pro or make repository public. Repository stays private; no upgrade purchased. Branches API confirmed main protected=false; required approval enforcement is not active. Feature branch/PR/checks currently constitute an operational convention. Original pinned v4 action runs succeeded but emitted Node 20 deprecation warnings. Evidence branch updates pins to official v6 commits. PR #2 CI run 37822357555 succeeded on 1c6bf4fee8d0e2d5c5cbf0346eff6be936793a24. PR #2 final CI 37822568448 and merged-main CI 37822650472 also succeeded. Updated manual packaging run 37822760936 succeeded on exact main SHA 7b765181538a4f65e7d5ced2d77bd0fc56ddfb65, including artifact upload with the v6 pin. The transported A/B artifacts remain identified by the earlier f980c20 source; no replacement hosting upload was performed.

## Release identity

Exactly seven regular entries: REVISION, manifest.json, SHA256SUMS, public/index.html, public/robots.txt, public/.htaccess, public/assets/probe-<40-char-sha>-<variant>.css. Metadata includes source SHA, variant, run/attempt, Python version and file length/digests. Sorted stored ZIP entries, fixed timestamps and mode. Identical build inputs produce identical bytes; workflow run metadata changes archive bytes between runs explicitly. Payload is deterministic by source/variant. See deployment.md for the full contract and validator bounds.

| Object | SHA-256 |
|---|---|
| A Actions wrapper | 1836c61d070681c8b4eeed1dd96f57c140a2da93de2a327ca611ad6e2c6c997d |
| B Actions wrapper | af9b497c5d3d7f09fdbabbe92fd37427de2a5ff61ebc48fcb68234a240b53332 |
| A release ZIP | 948b170d84f23c6d65e0cb8766cb7af6d5a8fc73db5bfdd5359941f7a0589ce6 |
| B release ZIP | 7f09217bdd13afc471bcea838311b457ad3ae80e7f1e3ea98be62fbe11889910 |

Both wrappers and inner external checksums matched trusted GitHub identity. Strict archive verification passed locally before upload.

## Backup gate completed

Original 138252676-byte account backup was downloaded read-only from cPanel and matched recorded plaintext SHA-256. Encrypted using OpenSSL 3 CMS authenticated AES-256-GCM with RSA-4096 recipient. User selected private Google Drive; folder and files verified owner-only, shared=false. The connector's 100 MiB limit required three 48 MiB ciphertext chunks plus a manifest. Downloaded all stored parts, verified digests, reassembled, authenticated-decrypted and matched original plaintext checksum. Key preserved separately outside Drive and GitHub; user should additionally retain it in a password manager/offline recovery vault. Current repaired SLiMS database.php and env.php were copied read-only, encrypted separately, retrieved/decrypted and matched their recorded checksum. No credential values entered GitHub or logs. Original server archive untouched. This is integrity verification, not a restoration rehearsal. Full details and offline recovery commands: recovery.md.

## Actual hosting changes and transport

Only private namespace /home/mapp5848/mpa-trs was written:

- incoming/release-f980c20ecc521e5cd824e456691e0c1cefe209b2-A.zip
- incoming/release-f980c20ecc521e5cd824e456691e0c1cefe209b2-B.zip
- incoming/roundtrip-A-37818854929.zip and roundtrip-B-37819213341.zip
- preview/shared (verified existing directory; no activation record yet)
- preview/releases/f980c20-A-37818854929/{REVISION,manifest.json,SHA256SUMS,public/}
- preview/releases/f980c20-B-37819213341/{REVISION,manifest.json,SHA256SUMS,public/}

Both upload controls reported 100% complete, overwrite unchecked. Both uploaded ZIPs were downloaded back and matched the inner digests above. File Manager extracted each into a new unique private directory and reported exactly seven expected names. File Manager ZIP compression of each extracted directory was downloaded back. Bounded inventory checks rejected any extra paths/duplicates/symlinks and compared every regular-file byte, including .htaccess, against the trusted release: **A and B both passed**. No archive path escaped the selected destination. Directory creation, ZIP upload/extraction/compression/download are now proven. Shell/symlink/atomic rename/release activation are untested.

Actual UI pitfall: location box needs `/mpa-trs/incoming`, with leading slash. Omitting it produced malformed `/home/mapp5848mpa-trs/incoming` and AJAX errors. Corrected before uploading; require the upload heading to display the full intended home path. Read resulting modal/report and close it before navigating; do not trust attempted actions alone.

## Preview approval boundary

Domain creation form restricts new roots to `/home/mapp5848/public_html/`. Outside-main-tree roots are not exposed through this form; no traversal workaround used. Proposed, not submitted:

- domain preview.mapalatursina.my.id
- share-main-document-root unchecked
- dedicated root /home/mapp5848/public_html/mpa-trs-preview-public
- only preview-related DNS records, with A address 103.247.10.209 if needed
- free provider HTTPS and Directory Privacy, then noindex/no-store probe files

Requires exact user approval before creation/DNS/root changes. Do not serve archives, REVISION/manifest/checksums, private configs or keys. Verify authentication denies unauthenticated HTML and CSS on both preview domain and main-domain nested path before considering protected preview complete. New authentication credential creation needs secure user entry. No preview DB. Main/SLiMS/E-Letter routing untouched.

Activation mechanism remains unselected. Inspect separate preview root management after approval; otherwise prove an allowlisted selector or supervised directory promotion. Keep both private releases. No atomic or zero-downtime claim. Rollback remains an untested runbook until actual A -> B -> A and browser checks pass.

## Existing route regression checks after private writes

Cloud browser verified main domain still shows Rumahweb welcome page; SLiMS catalog loads populated book links, search request for gunung returned valid zero-result page and Bromo returned one matching book, and Bromo Tengger Semeru National Park detail (id=48) loads; E-Letter redirects to its normal login with username/password form. No admin writes, login attempts or existing DB changes. These are route smoke checks, not complete application health guarantees. Repeat after every preview activation transition.

## Remaining work

Obtain domain/root/DNS approval, configure free HTTPS and auth, prove denial on all access paths, choose and test activation, execute A -> B -> A, verify desktop/mobile rendering, CSS/revision, console and private exposure, repeat existing route checks, update evidence. No production deployment authorized. Before real application design, choose stack separately.

Compared with TinggalJalan: same commit-identified tested artifact, isolated preview, backup gate and explicit promotion/rollback principles. Rumahweb uses verified supervised File Manager transport. No Hostinger SSH, PHP 8.4 assumption, host Composer/Artisan/migration, symlink replacement or unattended production deployment.

