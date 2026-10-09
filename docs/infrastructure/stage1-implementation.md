# Stage 1 implementation

Status: in progress, not deployed. Latest user direction on 9 October 2026 supersedes the Phase 3 framework-neutral and permanent-preview requirements. Keep historical evidence intact. No permanent preview domain will be created.

## Application

Laravel 12, Blade, Tailwind 4 and Vite in `application/`. Official Laravel 12 skeleton provenance: e90c74ca717e9082d7463a2db50814fe565a3e44. Composer platform PHP 8.2.0 pins resolution compatibility; actual target-runtime tests run separately on PHP 8.2. Lock files identify dependency versions. No Livewire, auth UI, organizational models, migrations, DB, workers or paid services are needed for the landing page.

Routes: `/` server-rendered MAPALA TURSINA under-development page; `/health` exposes only status and release SHA. Debug disabled. File sessions/cache, synchronous queue, log mailer, no outbound integrations. SQLite :memory: is an unused framework default; no database file or live DB object is created. Before future CRUD, create a separate approved MySQL database/user and design migrations in the later project stages.

Development: PHP 8.2+ with required Laravel extensions, Composer 2, Node 22. From application: copy .env.example to a private .env, composer install, php artisan key:generate, npm ci, npm run build, php artisan test, php artisan serve. Do not commit .env. Work's initial PHP was absent; signed Ubuntu PHP 8.3 CLI modules were extracted into an isolated workspace runtime. Local tests passed: 4 Laravel tests / 12 assertions, 20 Python deployment tests, compiled Tailwind build, actual PHP HTTP landing/CSS/health and 404 checks. Actual GitHub PHP 8.2 and PHP 8.3 jobs both passed; see verified run evidence below.

## CI and release contract

Existing static probe pipeline and tests retained. CI adds locked Composer/npm installation, PHP 8.2/8.3 application tests, asset compilation, then production-only dependency installation/platform checks and schema-2 application ZIP. PR artifact identifies the exact PR head SHA, not the synthetic merge SHA. Retention 14 days; original probes retain 30 days. No hosting credential or deployment job.

Schema 2 contains private `application/` runtime files (production vendor, configuration, routes, Blade views, portable package discovery cache), exact REVISION, manifest and SHA256SUMS. Public assets are namespaced `mpa-trs-assets/<sha>/` for simultaneous old/new availability. External ZIP digest identifies archive bytes. Runtime storage, environment, tests, node_modules, source JS/CSS and dev dependencies excluded. Bounded verifier rejects traversal, symlinks, duplicates, unsafe names, oversize, checksum/SHA mismatch, missing CSS and dev dependencies. Deterministic stored ZIP ordering/timestamps; run metadata and resolved locked/build tool inputs explicitly affect bytes. This is reproducibility of content under identical inputs, not a cross-platform byte promise.

## Proposed production placement (not yet approved or tested)

- `/home/mapp5848/mpa-trs/production/releases/<40-char-sha>/application`: immutable private runtime.
- `/home/mapp5848/mpa-trs/production/shared/.env`: persistent private configuration/key.
- `/home/mapp5848/mpa-trs/production/shared/storage`: sessions/cache/compiled Blade/logs and future uploads, outside web root.
- `/home/mapp5848/mpa-trs/production/shared/active-release`: exactly one SHA, no request input or arbitrary path.
- `/home/mapp5848/public_html/index.php`: reviewed narrow main-domain entrypoint, reads only the allowlisted SHA marker and starts Laravel from private runtime.
- `/home/mapp5848/public_html/mpa-trs-assets/<sha>/assets`: only compiled public CSS; retain old versions for rollback.
- Main `.htaccess`: merge scoped rules only after reading and privately backing up existing contents; preserve provider PHP rules. Main-host conditions and explicit SLiMS/E-Letter/storage/.well-known/cgi-bin exclusions. Never replace public_html or its nested application trees.

The selector executes Laravel only; it is not an HTTP command/deployment endpoint. Marker activation occurs through supervised private File Manager editing. No symlink, shell, atomicity or zero-downtime claims. Non-atomic marker writes may produce transient 503; use a supervised maintenance window. No host Artisan is necessary for this no-DB foundation; portable package-discovery files are built in CI. Per-release bootstrap/cache and shared/storage need owner write permission; never 0777. Live PHP extensions, open_basedir, disk/process/memory limits, main routing and writable paths still need account verification.

## Recovery and approval checkpoints

Before any hosting write, re-confirm private encrypted off-host backup and separately preserved key remain accessible using recovery.md. Freshly copy only existing main index.php, .htaccess and any other explicitly overwritten file into a new private rollback directory; record inventory/digests. Do not back up or restore the whole public_html as a deployment operation.

Rehearse extraction, verification and selector reversal in isolated non-public directories first. Production checkpoint requires exact artifact SHA/digest, verified PHP extensions, explicit files to change, saved original routing/entrypoint and restoration steps. User approval required for production-ready merge, routing/content changes, activation and any live DB objects. Repository PR work and tests authorized; no merge yet.

Rollback to a known application release: restore the previous SHA marker after confirming its private runtime and versioned assets remain intact; verify HTML/health/CSS and existing applications. Initial rollback: restore the backed-up main entrypoint and routing files only. Retain new private releases and assets for investigation; no deletion or DB restore. Actual hosting rollback and main deployment remain unproven.

Stage 1 is incomplete until main HTTPS serves the tested application, private-file denial and production settings are verified, update/recovery succeeds, existing SLiMS catalog/search/detail and E-Letter login pass, and actual evidence is documented. Stage 2 organizational requirements/design, Stage 3 visual prototype, Stage 4 CRUD and Stage 5 admin handoff/maintenance remain out of scope.

Packaged runtime rehearsal in Work passed using production-only vendor: actual PHP HTTP landing page, exact health revision, namespaced CSS, private URL 404 denial, invalid selector 503, and recovery to the retained release. This is not a host deployment/update/rollback proof. The same rehearsal runs in CI. Manual package-application.yml repeats locked build/tests/production packaging; its first Actions execution is pending.

## Verified GitHub evidence — 9 October 2026

PR: https://github.com/fairusinampratama/mpa-trs-web/pull/4, branch stage1/application-foundation, not merged. Based on latest main 53c10728e7042b88b5ada047ad2d71e78eb46540. Historical Phase 3 evidence unchanged.

Candidate commit fcef4f76f77e30d383bd59c33af84292392d550f: CI run 37884284506 passed all three jobs: deployment foundation, Laravel PHP 8.2, Laravel PHP 8.3. PHP 8.2 log confirms four Laravel tests / twelve assertions, successful production dependency/platform checks and packaged HTTP/recovery rehearsal. Twenty Python deployment tests pass. No failed Stage 1 run observed at this point.

Artifact 11596305100, application-fcef4f76f77e30d383bd59c33af84292392d550f, 26,558,764 bytes, expires 23 October 2026. Trusted Actions wrapper SHA-256 f14d957c0c959dd2b8460b5da49923c6449637d5d09d1102e2aa96d2105fd2da. Downloaded to Work and verified. Inner ZIP SHA-256 f0da119bbbffc8330fa117409dcca99c9fda9d3964b0022a1ec184fc75294081 matched its external checksum; strict manifest/inventory validation passed. The exact downloaded PHP 8.2-built artifact passed Work's actual HTTP/CSS/revision/private-denial/invalid-marker/recovery rehearsal under PHP 8.3. This artifact has not been uploaded to Rumahweb. Later commits require their own successful artifact; do not relabel this one.

A documentation/workflow follow-up adds source/deployment tests to the manual application packaging workflow. Its subsequent CI must be verified before approval; manual dispatch remains unexecuted until that workflow is available on main. No merge authorized.

## Current operational blocker

The previous cPanel browser session expired. Canonical hosting page redirects to Rumahweb sign-in. Secure reauthentication was interrupted; a fresh post-interruption navigation still shows login. No new hosting writes occurred. Do not retry automatically after cancellation. Live PHP extension/open_basedir/resource checks, exact current main entry/routing inspection, refreshed scoped backup and host rehearsal remain blocked by authentication. Cloud browser also rejects local file URLs; no browser screenshot or mobile verification of the candidate is claimed.

## Production change review — pending exact host inspection

Only these new private paths are proposed: production/releases/<approved-artifact-SHA>/application, production/shared/.env, production/shared/storage, production/shared/active-release, and a timestamped production/rollback-originals directory, all beneath /home/mapp5848/mpa-trs. Re-check the encrypted backup and separate key before any host write.

Public change candidates are index.php, a narrowly merged .htaccess fragment, and mpa-trs-assets/<approved-SHA>/assets/*.css beneath public_html. Never publish build manifests, source/config/vendor/storage/archive/checksum files. scripts/deployment/main-entry.php is the proposed entrypoint; main-routing.fragment is a template, not an approved replacement. Existing welcome filename/DirectoryIndex precedence and provider rules are still unknown. If welcome index.html takes precedence, determine the smallest scoped adjustment after inspection; do not guess, delete it, or change nested application routing.

Initial recovery restores only the exact privately backed-up main files/precedence changes; release recovery restores the previous validated SHA marker and retained CSS namespace. Maintenance may be needed during non-atomic File Manager edits. No atomicity or zero-downtime claim. A missing/invalid marker fails closed with 503; restoration succeeded in Work/CI. Live application update and rollback remain untested and require the separate production approval scope.

Before requesting deployment approval, present the current host inventory, exact merged routing diff, exact entry/welcome changes, successful release SHA/digest, retained original-file checksums and reversal steps. Authentication blocks making this proposal final. Stage 1 remains incomplete, with no production file modification or merge.
