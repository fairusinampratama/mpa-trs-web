# Stage 1 — supervised ZIP delivery

10 October 2026. Authoritative replacement for the proposed full-file production transport. Prepared, not deployed. PRs #8/#9 are reviewed but are not merged or production-ready. No further large-scale FTPS experiment is authorized or needed for this path. Historical evidence remains in phase3-implementation.md, ftps-private-probe-evidence.json, private-parallel-sample-evidence.json, private-release-rehearsal-evidence.json and private-full-parallel-evidence.json. Stage 1 remains incomplete until live Laravel plus real A → B → A and existing-site regression checks pass.

## Implemented delivery

Actions builds locked Composer production dependencies and Tailwind CSS, verifies the SHA-identified ZIP, and runs a real PHP 8.2 HTTP harness. The harness builds a second real release from the exact Git parent and exercises A → B → A, revision health, HTML, exact versioned CSS, private-file denial and incomplete-marker failure/recovery. PHP 8.3 application tests remain enabled. This is local runner evidence, not live hosting evidence. The Work scratch runtime lacks PHP/Composer; actual Laravel execution occurs on the GitHub runner rather than pretending a synthetic Python fixture runs Laravel.

The main-only manually triggered supervised-release.yml exposes four distinct actions: upload, verify-extracted, activate and rollback. Each requires exact successful source run, SHA, trusted inner ZIP digest, expected prior selector and APPROVED_SUPERVISED_ZIP_OPERATION following explicit operator approval. Concurrency prevents overlapping deployment jobs; it is not enforced human approval. Branch protection is not enforced, so repository writers can modify workflows and access secrets. No automatic push deployment or automatic rollback.

Only one new private FTP account is proposed: mpatrs_runtime@mapalatursina.my.id, jailed to /home/mapp5848/mpa-trs/production. Only MPA_TRS_FTPS_RUNTIME_USER/PASSWORD secrets are needed. TLS certificate/hostname verification and PROT P stay enabled; parent/existing-app denial and a fixed root sentinel are checked before writes. Never reuse probe or primary credentials. This root includes private MPA-TRS environment/storage; workflow writers remain trusted. No public-assets FTP account is needed because File Manager publishes the single versioned CSS directory during extraction.

## Exact layout and changes requiring approval

Private /home/mapp5848/mpa-trs/production/:
- .mpa-trs-production-root: mpa-trs-production-runtime:v1 plus newline.
- incoming/<SHA>/application.zip and archive.sha256: unique verified ZIP upload/readback; existing destinations are refused.
- releases/<SHA>/: extracted archive, application/ runtime, REVISION, manifest.json and SHA256SUMS; COMPLETE.json is written only after verification.
- verification/<SHA>.zip: File Manager recompression of that extracted SHA directory, never shared/.env or storage.
- shared/.env: 0600, generated stable APP_KEY, production/debug-off, APP_URL=https://mapalatursina.my.id, file cache/session, sync queue, single log, log mail. No database-dependent feature, migration or database change. Key remains private and is preserved across releases.
- shared/storage/framework/{cache/data,sessions,views} and shared/storage/logs: owner-writable, not world/group-writable; verify PHP owner access after launch.
- shared/active-release initially exactly NONE plus newline; candidate-<Actions-run> files used for guarded replacement.
- rollback-originals/<timestamp>/: byte-identical original main index.php, any original routing file, original absence/precedence record and SHA-256 checksums, outside the public tree.

Public /home/mapp5848/public_html/:
- Replace only index.php with scripts/deployment/main-entry.php after scoped backup.
- Create or narrowly merge .htaccess using main-routing.fragment only after inspecting the existing file and parent/provider configuration. Preserve existing PHP handler/security directives. Main-host conditions and exclusions preserve slims.mapalatursina.my.id, eletter.mapalatursina.my.id, storage, cgi-bin and .well-known paths; existing files/directories bypass Laravel rewriting.
- Create mpa-trs-assets/.htaccess from assets.htaccess, with indexes off and only CSS filenames permitted.
- Copy releases/<SHA>/application/public/mpa-trs-assets/<SHA>/assets/ to public_html/mpa-trs-assets/<SHA>/assets/. No public manifest, checksum, archive, environment, source, vendor or runtime storage.

Never replace, mirror or recursively delete public_html. No DNS, domain roots, PHP settings, database, existing-site files, permanent preview or paid service changes.

## One supervised session per new release

1. Before any hosting write, confirm existing encrypted off-host backup, authenticated checksum/recovery evidence, separately retained key and post-repair SLiMS configuration. Preserve the original full account backup.
2. Recheck actual File Manager Extract and Compress controls, archive support, leading-slash home-relative target paths and account free space. Historical static extraction proves the basic UI existed; full Laravel extraction and recompression remain unproven until the approved operation. Do not publish if either fails.
3. Initial session only: create private namespace, owner-only environment/persistent storage, sentinel, NONE selector and private dedicated FTP account via secure credential handling. Create only two repository secrets. Capture scoped original main configuration and its digests before touching public routing. New password entry/submission may require secure human handoff.
4. Dispatch upload with the selected successful release SHA/run/inner digest and current expected selector. It uploads ONE application ZIP and a checksum, validates protected readback, and leaves the welcome page/current application active.
5. File Manager: create a fresh releases/<SHA>/ directory. Select incoming/<SHA>/application.zip and Extract to that exact private directory (home-relative /mpa-trs/production/releases/<SHA>). Confirm the absolute target and successful extraction report. Do not select public_html or overwrite any release.
6. Inspect application/vendor/autoload.php, application/bootstrap/app.php, application/bootstrap/cache, application/REVISION, manifest.json and SHA256SUMS, file count/size and permissions. Inspect scope before copying CSS. Make only required missing empty cache/storage directories inside the dedicated namespace; do not use 0777.
7. Select the newly extracted SHA directory in File Manager and Compress to verification/<SHA>.zip. This archive must include ONLY the extracted release, never persistent configuration/storage or original backups. Keep it private. This server-supported File Manager operation is not an HTTP command/extraction endpoint.
8. Copy only assets/ to the exact new public SHA assets directory; install the scoped assets protection on initial setup. Dispatch verify-extracted. It downloads the one recompressed ZIP, validates every extracted file against the trusted original, rejects extras/missing files/traversal/symlinks/duplicates/mixed roots, reads back critical files, checks actual filesystem modes and checks exact CSS bytes over verified HTTPS. Only then writes COMPLETE.json with matching archive/manifest/snapshot digests, extraction_verified=true and assets_verified=true. No selector change.
9. Initial activation only: after readiness and scoped backups, install the reviewed fixed index.php/routing while selector remains NONE (brief 503 possible). Dispatch activate with previous=NONE. Later activation uses previous=<current SHA>. The selector candidate is readback-verified and renamed over the old marker with no delete fallback. Rename semantics were proved only on the private probe; no atomicity or zero-downtime claim.
10. Verify actual main HTTPS, landing, /health SHA, CSS bytes, private-path denial, desktop/mobile rendering and console errors. Check SLiMS catalog/search/book detail, E-Letter login, and existing nested main-domain paths. Actions smoke results do not replace browser/regression evidence.

## Update and rollback

New releases repeat upload → supervised extraction/recompression/CSS copy → verify-extracted → approve/activate. One cPanel session per NEW release is accepted; rollback to a retained verified release requires no extraction or cPanel login when FTPS activation works. At least current and previous known-good private runtime/public CSS and evidence remain retained. Never activate partial directories. If extraction verification fails, keep current release selected and retain the failed private namespace; no blind resume, deletion or automatic retry.

Rollback fetches the trusted previous artifact, checks matching completion/manifest/archive identities, critical retained files, owner permissions and exact retained public CSS, then guarded selector replacement and live checks. It relies on the previous full extraction verification and immutable retained release directories; it does not re-read every retained vendor file, detect all later filesystem tampering, or restore databases. If critical files/CSS fail, stop and use scoped original welcome restoration or freshly verified extraction. Environment and persistent storage are shared and must not be edited with a code rollback.

Initial routing recovery restores only the private backed-up original index.php and original .htaccess bytes/precedence. If .htaccess was originally absent, removal of only the newly created file must be included in the approved recovery scope. Do not remove application/assets namespaces or touch other sites. A selector failure can yield transient 503; FTPS replacement and live recovery remain to be tested on production after approval. No guaranteed downtime duration.

The approved launch must stage real distinct A/B artifacts and record A → B → A live /health, HTML and matching CSS after every transition, retaining both and checking other sites. Exact run IDs/digests are pinned in the production approval checkpoint after actual CI/package success. No production release has yet been selected or activated in this document.

## Known state and limitations

Verified historical: archive FTPS roundtrip 37893378939; 64-file/selector sample 38025136218. Failed historical: serial 37896573464 (cancelled due performance), full parallel 38026277613 (TimeoutError; exact operation unknown). These are not repeated and their failure evidence is not converted into success.

Prepared: supervised ZIP workflow, extracted-snapshot verification, fixed completion-gated entrypoint, critical-file/CSS checks, guarded selector and real runner A/B/A. Pending actual CI results, fresh read-only hosting inspection, approval, first full Laravel extraction/recompression, production account confinement, PHP/storage compatibility, main-domain launch and live update/recovery. PRs #8/#9 are not merged as deployment solutions.

Additional paid infrastructure cost: zero; normal GitHub Actions quota applies and no paid overage is authorized. FTPS cannot extract archives or execute Composer/Artisan. This pipeline intentionally retains one supervised File Manager extraction/copy session per release rather than claiming fully unattended shared-hosting deployment.

## Verified repository preparation

PR #10, feature branch stage1/supervised-zip-deployment. Implementation 623bb0a024c3a72454a1f9edaa935c0b1c0e095c passed CI 38030588835 and FTPS preparation checks 38030588825. All 55 deployment tests and 4 Laravel tests/12 assertions passed. Actual PHP 8.2 packaged-runtime harness built exact parent 21347df82a8a455834588371cedf9d1b5c9a51d9 and verified real Laravel A → B → A health/HTML/CSS, private denial and fail-closed recovery. Laravel version 12.69.3. The prior CI 38030490548 failed due a duplicate preload/stylesheet URL assertion; unique-URL comparison fixed the harness without permitting mixed assets.

Prepared release A: source run 38030588835, SHA 623bb0a024c3a72454a1f9edaa935c0b1c0e095c, inner ZIP SHA-256 dd322dc8a3e445f528a0232a8320843028eeda8cd851b2ad49e85863d91fc9d5, 26,558,197 bytes. Artifact 11661379400, wrapper SHA-256 4b6be8b2ad4617f2a0fdb0057618189f27627024f7583ed5d3aaf6fd5bedfe73, expires 24 October 2026. Full durable evidence: supervised-zip-ci-evidence.json. A subsequent documentation-only commit can provide distinct tested release B; its actual SHA/run/digests must be recorded in the PR/approval checkpoint after CI, without assuming success.

Prepared release B: source run 38030771303, SHA 7bc714cc0ac0de59e4b0e6f7cf900dcb334c1d86, inner ZIP SHA-256 77de62a139fd7bb29fc2a98d696eb34adacfd5ff4c807d6844559e2ac5aa2f38, 26,558,197 bytes. Artifact 11661848252, wrapper SHA-256 d06c7a1f01b86676ffbb92cda23869260dc87756725281a9ad190d12e6c23734, expires 24 October 2026. B is a harmless documentation-only distinct source revision. Its successful PHP 8.2 runtime harness built its exact parent A and verified B → A → B; 55 deployment tests, 4 Laravel tests/12 assertions and PHP 8.3 checks passed. FTPS preparation checks 38030771259 succeeded. Selected A/B artifact identities stay fixed even if subsequent evidence-only commits change the PR head.

## Fresh read-only hosting inspection — 10 October 2026

Rumahweb portal authentication and its normal cPanel SSO succeeded. cPanel identified mapp5848, /home/mapp5848, active SSL, disk usage 443.71 MB with no numeric disk limit displayed, and 17,931/250,000 inodes. These figures are current usage/limits, not a guarantee of physical server free space.

File Manager had hidden files visible. The account-home listing had no .htaccess; public_html contained .well-known, cgi-bin, eletter.mapalatursina.my.id, slims.mapalatursina.my.id, storage, .ftpquota and the existing 10.67 KB index.php (0644). No main .htaccess or index.html was listed. No existing application file was opened or changed. Provider virtual-host configuration remains inaccessible; inherited server behavior must be checked during the approved live verification. The new main .htaccess will contain only the reviewed main-routing.fragment; no shared PHP directives are changed.

The private mpa-trs namespace contained ftps-probe, incoming and historical preview directories, with no production directory. A retained historical static ZIP was selected and its Extract dialog inspected: target paths are home-relative, shown as /mpa-trs/incoming; the UI explicitly supports creating a new target directory. The Compress dialog supports Zip Archive and a home-relative output path. Both dialogs were cancelled without extraction/compression. This confirms current controls and private target selection, not full Laravel extraction success. The approved operation must verify the actual full ZIP extraction and recompression before changing index.php/routing.

The original 131.85 MB account backup remains listed at home with mode 0600. Off-host encrypted parts, manifest and post-repair SLiMS configuration metadata were refreshed: expected recorded sizes, shared=false and owner-only permissions. Historical authenticated decrypt/checksum evidence and separate recovery key remain authoritative; this read-only inspection did not repeat decryption or expose secrets.

At that read-only inspection checkpoint, no hosting writes, new account/secrets, production workflow dispatch or merge had occurred. PR #10 was the only proposed merge; #8/#9 remain unmerged. Production account confinement, full Laravel host extraction/recompression, PHP/storage compatibility, selector replacement and live A → B → A were unproven. Stop before routing if private staging/integrity/permissions fail; stop on any broader configuration discrepancy rather than silently expanding scope.

## Approved launch checkpoint and archive transport correction — 10 October 2026

The user approved the consolidated launch and PR #10 merge. Main is 64132b6dba80c5b1522b9262f00524ccde181ed9. The dedicated runtime FTP account and two repository secrets were created using user credential entry; secret values were not inspected. The five approved private root directories exist with 0755 permissions. File Manager extracted private-bootstrap.zip into /home/mapp5848/mpa-trs/production: fixed root sentinel, shared/active-release containing NONE plus newline, and persistent storage subdirectories. This bootstrap is not a Laravel release and does not prove full application extraction.

The first supervised release A upload, run 38043127556 / job 114187193734, failed with sanitized ValueError after all 55 deployment tests and trusted artifact verification passed. Its evidence artifact is 11666064525, wrapper SHA-256 7d66df2e23364467f1f9496ddb7dd27f7bd158a154c2b9da050d4b1c0289b0cc. It created incoming/623bb0a024c3a72454a1f9edaa935c0b1c0e095c but transferred no archive. File Manager confirmed the directory is empty and the selector is still NONE. Reaching that mkdir implies the runtime account passed the existing verified TLS/authentication, root confinement, sentinel, inventory and prior-selector guards; it does not prove an archive data roundtrip.

Root cause: upload() called ftps_release_rehearsal.put_verified() for application.zip. That helper applies application_release.safe(), which intentionally forbids ZIP payload entries. The transport envelope was therefore rejected locally before STOR. This is not the historical full-file socket timeout, and no TLS, credentials or hosting configuration workaround is needed.

The focused correction uploads only the fixed incoming/<validated lowercase 40-hex SHA>/application.zip envelope, then performs bounded protected readback and compares its exact size and SHA-256 before writing archive.sha256. It leaves payload ZIP/secret/traversal exclusions unchanged, refuses existing namespaces, and adds four regression tests for successful envelope transport, corruption, existing destinations and invalid revision paths. No activation behavior, credentials, public routing or A/B artifact identity changes.

No upload was retried automatically. Before the approved launch resumes after separately approved fix merge, inspect the failed directory again. If it remains empty, preserve it by a supervised File Manager rename to incoming/623bb0a024c3a72454a1f9edaa935c0b1c0e095c-failed-38043127556. Do not delete it, overwrite partial files, or relax the fresh-destination guard. Then manually dispatch the corrected upload for the same approved A artifact and continue the existing runbook. If the directory is no longer empty, stop and reconcile its contents first.

Production index.php/.htaccess, public assets, environment, existing applications, databases and PHP settings remain unchanged. No Laravel release has been uploaded, extracted, completed or activated on hosting. Full extraction/recompression, public CSS verification, runtime compatibility and live A → B → A remain pending; Stage 1 is incomplete.

