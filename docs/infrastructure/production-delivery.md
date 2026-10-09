# Production delivery implementation — awaiting private proof and approval

9 October 2026. No production deployment or credentials exist. This branch prepares the next step without changing hosting. Stage 1 remains incomplete.

## Last completed operations

PR #6 merged with explicit approval as 0a42a88e244686e109ef1617e12baeff4b428532. PR #7 merged as 51ed3fdfdc1001073dbd7ea085049acbe461ddbd. Main CI 37896360248 passed. Intermediate main CI 37896327018 was superseded/cancelled by the subsequent merge; this is not a failed transfer.

The separately approved private file/selector rehearsal is run 37896573464, attempt 1, job 113709176400:
https://github.com/fairusinampratama/mpa-trs-web/actions/runs/37896573464

It fetched and verified the exact A/B artifacts recorded in release-activation.md and passed all 41 tests. The run was deliberately cancelled after measured performance established a blocker: 250 verified files required 786.969 seconds (log timestamp 2026-10-09T07:14:02.8659450Z). Cancellation completed at 07:20:20Z. At this sampled rate, 5,555 files project to about 4.86 hours per release, 9.71 hours for two, exceeding the 120-minute job limit. This is an extrapolation, not a completed transfer measurement. No rename, complete-release permission, completion or rollback success is claimed. New private target: /home/mapp5848/mpa-trs/ftps-probe/probes/release-rehearsal-37896573464-1/. Never dispatch it again merely because Work interrupts. Inspect the independent run first. No earlier successful ZIP probe was repeated.

Before dispatch, the encrypted full-backup parts and post-repair SLiMS configuration remained accessible in the existing private Drive folder (shared=false, owner-only folder). Separate recovery-key file remained available with 0600 permissions; no key or configuration value was read or logged. Previous checksum/decryption proof remains authoritative in recovery.md. Neither backup nor existing applications were changed.

## Prepared code

production_delivery.py provides separately approved deploy/rollback commands using the verified explicit FTPS transport. Only two exact proposed usernames are accepted, never probe or primary credentials. Both roles must pass TLS, parent/app path denial, fixed private root sentinel and bounded inventory checks. No recursive mirror, delete, shell, extraction, chmod, .env upload or migration.

Deploy: validate exact artifact identity and source run; require the expected prior selector; verify prior completion for non-initial releases; upload only compiled CSS into a new public SHA directory and read back each byte; upload all validated private files into a new release directory and read them back; publish production readiness containing verified-asset flag and manifest/archive digests; recheck expected prior selector and replace with a verified candidate by FTP rename. No delete-first fallback. Return identity/readback report; actual web health is a separate check.

The fixed main entrypoint now requires a matching bounded completion record with assets_verified=true. Generic/private upload completion cannot become a served production release. The Work packaged-runtime harness tests missing completion, unverified assets and invalid selector fail closed, then recovery.

Rollback: require a retained matching production completion record; verify retained manifest digest, all manifest-listed runtime file digests and CSS through the two scoped accounts; replace selector only after these checks, then check live revision/CSS/private denial. Full readback cost is deliberately measured before claiming this is an acceptable emergency recovery time. If serial FTPS is too slow, this draft must be adapted before production approval; do not silently accept hours-long rollback or add insecure commands.

verify_live.py uses verified HTTPS only, checks exact /health identity, landing text, exact CSS namespace/content digest (rejects stale or extra old CSS), and 403/404 for private URLs. It performs no login or writes. It explicitly does not claim browser rendering or existing-site regression completion.

production-release.yml is workflow_dispatch only, main-only, with expected previous SHA and typed approval. It requires committed successful private rename/TLS evidence before accessing deployment credentials; that evidence file does not yet exist, so the production job currently fails closed. It fetches successful exact artifacts and uses the four proposed role secrets only after checks. Repository writers can alter workflows because branch protection is unavailable: acknowledgement and concurrency are operational controls, not enforced human review. No automatic push deployment, automatic rollback or paid service.

54 local Python tests passed, including failures of public/private readback, wrong roots/credentials, incomplete selection, wrong prior revision, unsafe public PHP paths, wrong live revision, stale CSS and private exposure. Actual GitHub CI results are recorded below when available. No hosting execution of these production commands is authorized or performed.

## Exact proposed one-time bootstrap, not approved

Private /home/mapp5848/mpa-trs/production/:
- releases/ (new tested immutable application SHA directories);
- shared/.env (APP_ENV=production, APP_DEBUG=false, persistent generated APP_KEY, APP_URL=https://mapalatursina.my.id, file session/cache, sync queue, log mail; no DB-dependent feature);
- shared/storage/framework/{cache/data,sessions,views} and shared/storage/logs;
- shared/active-release initially exactly NONE plus newline, later approved SHA;
- .mpa-trs-production-root exactly mpa-trs-production-runtime:v1 plus newline;
- rollback-originals/<timestamp>/ containing exact copied original index.php, main/parent routing inventory and any explicitly modified original file, with recorded digests outside public roots.

Public /home/mapp5848/public_html/:
- index.php: replace only provider welcome entry after scoped private backup;
- .htaccess: create minimal hostname-scoped routing fragment only after confirming current main/parent/provider rules; no broad replacement, no shared PHP configuration;
- mpa-trs-assets/.mpa-trs-production-root exactly mpa-trs-production-assets:v1 plus newline, protected from public access by a scoped assets .htaccess;
- mpa-trs-assets/<SHA>/assets/*.css only; no public manifest/archive/vendor/source/environment/storage.

Private PHP configuration/file compatibility must be verified after bootstrap. cPanel selector showed all three domains on alt-php82, required Laravel modules enabled, display_errors off, memory 256M, execution limit 30s, empty open_basedir field. No shared setting changes are proposed. Use owner-only shared secrets and non-world-writable directories; verify web-owner write access. Do not install a generic web diagnostic/command executor.

Existing slims.mapalatursina.my.id, eletter.mapalatursina.my.id, public_html/storage, .well-known, cgi-bin and existing databases remain unchanged. Main-host exclusions in the routing fragment preserve nested paths; browser regressions remain required at every approved activation transition. No domain, DNS, certificate or permanent-preview change is proposed.

## Proposed credentials (separate approval and secure user entry required)

mpatrs_runtime@mapalatursina.my.id jail /home/mapp5848/mpa-trs/production; secrets MPA_TRS_FTPS_RUNTIME_USER/PASSWORD. This scope includes MPA-TRS environment/storage, so workflow writers could access MPA-TRS secrets even though tooling never reads environment values. Account is not an OS/PHP sandbox.

mpatrs_assets@mapalatursina.my.id jail /home/mapp5848/public_html/mpa-trs-assets; secrets MPA_TRS_FTPS_ASSETS_USER/PASSWORD. No access to the rest of public_html. No common-ancestor account or symlink shortcut; two accounts preserve separation of the disjoint directories. Neither exists yet. Probe credentials must never be repurposed.

## Approval and recovery

Wait for actual private results, adapt only to demonstrated limits, and obtain approval to merge the production tooling after successful CI. Present exact final source SHA/digest and main routing/entrypoint diff plus newly captured scoped backup hashes before requesting production changes. This document is not permission.

For initial activation, stage/verify the release while provider welcome still serves, then install only approved routing/entrypoint in the supervised bootstrap session. Main HTTPS check occurs after this switch; the workflow live check before public bootstrap may fail as expected, so first launch must separate staging/activation from browser approval of public entry installation. Routine later releases use the manual workflow, with no cPanel session if the actual FTPS model is proven usable. The implemented stage action leaves the NONE selector unchanged and skips live activation/HTTP checks. It is for initial upload only; a supervised separately approved bootstrap selects the staged SHA and installs the entrypoint/routing after verifying readiness. Deploy handles subsequent fresh revisions. The stage action rejects any non-NONE expected prior selector.

Initial recovery restores only exact original main entrypoint/routing and prior precedence; if a new .htaccess was originally absent, remove only that newly approved file under explicit recovery approval. Keep release/assets evidence. Subsequent recovery selects retained verified previous runtime with matching assets, followed by live/browser checks. No database restore. Maintenance/transient 503 may occur during unsupported/non-atomic replacement; no zero-downtime or atomicity claim.

Live completion requires approved application A → distinct B → A, correct health/HTML/CSS and browser desktop/mobile/console checks, private denial, SLiMS catalog/search/Bromo detail id=48, E-Letter login and main-domain nested paths. HTTP smoke checks alone are insufficient. No Stage 2 feature work yet.

## Demonstrated blocker and next scoped experiment

The serial uploader opens a protected data connection for STOR and another for checksum RETR for every file. The successful ZIP proof remains valid, but it does not solve server-side extraction. FTP cannot extract ZIPs or run Composer/Artisan. Extending the timeout to accept roughly ten hours is unsuitable for this foundation, and a full serial readback during emergency rollback is also unsuitable. Production tooling in this draft is therefore blocked, not approved for use.

A next private experiment requires separate authorization: upload a deterministic 64-file sample from the same verified artifact using at most four independently jailed, verified TLS sessions; read back every sample file; measure elapsed time, refusals and modes; separately exercise a harmless fixed text selector A → B → A. Use only a new unique ftps-probe/probes/concurrency-selector-<run>-<attempt>/ namespace and existing probe credentials, retain all files, no server commands or production changes. This proposal is not yet implemented or executed and does not establish full release activation. A full adapted rehearsal would still be required if this sample succeeds. Otherwise the safe fallback is supervised cPanel archive extraction and scoped manual activation/recovery, accepting that routine cPanel interaction remains necessary.

Partial files from cancelled run 37896573464 remain private and must never be selected or promoted. No receipt JSON/artifact was generated: the cancelled job's artifact-upload step succeeded as a step but reported no files found. Durable sanitized measurement evidence is private-release-rehearsal-evidence.json. The production proof gate rejects its success=false value. Probe account/secrets are retained pending a decision on the next scoped test; cleanup requires separate approval.

## Verified GitHub validation

Draft PR #8: https://github.com/fairusinampratama/mpa-trs-web/pull/8 (unmerged). Implementation commit dc5d54bbf02634b8ff8aaff8b9b9be31d4013257 passed CI run 37898746292: deployment validation (54 tests), Laravel PHP 8.2 and 8.3 jobs all succeeded. PHP 8.2 built a production-only archive and passed the packaged runtime HTTP harness including fail-closed and recovery checks. Application tests: 4 passed, 12 assertions. Artifact 11601083848, name application-dc5d54bbf02634b8ff8aaff8b9b9be31d4013257, wrapper digest e23e5d10102d362129fec8d2a3b517367eeff76eda3aa1c4dec19e112c648fad, expires 23 October 2026. This is not an approved production artifact; wrapper digest is not the inner application ZIP digest. No production action was run.
