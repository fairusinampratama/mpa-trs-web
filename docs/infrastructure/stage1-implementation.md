# Stage 1 implementation

Status: in progress, not deployed. Latest user direction on 9 October 2026 supersedes the Phase 3 framework-neutral and permanent-preview requirements. Keep historical evidence intact. No permanent preview domain will be created.

## Application

Laravel 12, Blade, Tailwind 4 and Vite in `application/`. Official Laravel 12 skeleton provenance: e90c74ca717e9082d7463a2db50814fe565a3e44. Composer platform PHP 8.2.0 pins resolution compatibility; actual target-runtime tests run separately on PHP 8.2. Lock files identify dependency versions. No Livewire, auth UI, organizational models, migrations, DB, workers or paid services are needed for the landing page.

Routes: `/` server-rendered MAPALA TURSINA under-development page; `/health` exposes only status and release SHA. Debug disabled. File sessions/cache, synchronous queue, log mailer, no outbound integrations. SQLite :memory: is an unused framework default; no database file or live DB object is created. Before future CRUD, create a separate approved MySQL database/user and design migrations in the later project stages.

Development: PHP 8.2+ with required Laravel extensions, Composer 2, Node 22. From application: copy .env.example to a private .env, composer install, php artisan key:generate, npm ci, npm run build, php artisan test, php artisan serve. Do not commit .env. Work's initial PHP was absent; signed Ubuntu PHP 8.3 CLI modules were extracted into an isolated workspace runtime. Local tests passed: 4 Laravel tests / 12 assertions, 20 Python deployment tests, compiled Tailwind build, actual PHP HTTP landing/CSS/health and 404 checks. GitHub PHP 8.2 checks are authoritative for target compatibility and remain to be recorded after actual execution.

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
