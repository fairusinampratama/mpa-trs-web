# Stage 1 release activation preparation

9 October 2026. Prepared and locally tested; hosting rehearsal not authorized or executed. Stage 1 remains incomplete. Preserve historical Phase 3 evidence and existing cPanel fallback.

## Verified baseline

Main is 11d1862dbfe827377f9119465da2966f392d2bc1 after separately approved PR #4/#5 merges. PR #6 at 936546a8069bea821100f055721ff4ed9d8e8215 records the one successful FTPS artifact probe; all five checks passed and it is mergeable, but remains unmerged. Run 37893378939 succeeded with TLS certificate/hostname checks, protected data, tested jail boundaries and exact artifact checksum. Do not repeat it.

Read-only cPanel inspection this turn found public_html/index.php (10.67 KB, 0644) contains the Rumahweb welcome PHP/HTML. The visible main directory inventory includes .well-known, cgi-bin, storage, slims.mapalatursina.my.id and eletter.mapalatursina.my.id. Hidden .ftpquota is visible; no .htaccess or index.html appeared. This is current directory evidence, not a guarantee about parent/global Apache rules. No main file was edited or copied. Effective PHP 8.2 is previously established; extension/open_basedir/host-write compatibility still need confirmation before activation.

## Implemented private rehearsal

ftps-release-rehearsal.yml is manual, main-only, requires PRIVATE_RELEASE_REHEARSAL, and shares the non-cancelling probe concurrency group. Its acknowledgement is an operator convention, not enforced human review. Branch protection remains unavailable; repository writers can modify secret-bearing workflows. No new production secrets or accounts are provisioned.

It fetches two distinct successful same-repository commit artifacts using the existing trusted wrapper/inner digest verifier. ftps_release_rehearsal.py validates both bounded archives and source-run identities before connection, then reads their regular files locally on the runner. Only the exact probe username is accepted. TLS/PROT P/root checks are reused unchanged.

After separate approval it may create only:

/home/mapp5848/mpa-trs/ftps-probe/probes/release-rehearsal-<Actions-run>-<attempt>/

- releases/<SHA-A>/ and releases/<SHA-B>/: all validated archive entries, including private copies of assets and metadata.
- COMPLETE.json inside each release, written last only after every file upload/readback digest passes.
- active-release: SHA A initially, then renamed candidate B over it, then candidate A over it.
- candidate-1/candidate-2, consumed by successful rename or retained on failure.
- receipt.json: non-secret measurements and observed results.

No earlier probe files are overwritten. Existing destination refusal means interruption leaves a retained partial private directory, never a selected release. No retries, recursive mirror/delete, chmod, extraction on host, server command, web execution, main routing or production activation. A rename rejection stops without a delete-first fallback. Readback checks selector identity; this does not prove atomic visibility under concurrent web requests. Owner-write mode is reported from MLSD when available; web PHP write permission is a separate unproven condition.

The previously verified artifact has 5,555 regular entries and 25,335,627 expanded bytes. Two releases need roughly 50 MiB plus metadata, beneath the existing 256 MiB probe quota; reconfirm available quota before dispatch. Individual-file upload/readback performance is unknown. Progress emits non-secret counts every 250 files. Workflow stops at 120 minutes and produces no completion claim on interruption/failure. Retain partial files; cleanup needs separate approval. Do not relaunch automatically.

Local tests cover readback corruption, incomplete selection rejection, previous-marker mismatch, successful reversal, unsupported replacement preserving A, existing-destination refusal and unsafe paths. They test tooling behavior, not the real FTP daemon. All 41 local Python tests passed. Work additionally ran the real existing packaged Laravel artifact with the updated entrypoint: landing/health/CSS/private denial, missing-completion 503, invalid-selector 503 and recovery passed. These are Work results; actual feature CI and host results must be recorded below.

## Production architecture after rehearsal, still proposed

The earlier fixed main entrypoint + private SHA selector remains the chosen candidate. Private runtime: /home/mapp5848/mpa-trs/production/releases/<SHA>/application. Shared private environment and storage under production/shared. Public entrypoint: public_html/index.php, replacing only the provider welcome after a scoped private byte-identical backup. Main routing: create or narrowly merge .htaccess after checking inherited/provider rules, preserving existing nested paths and hostname exclusions. Static assets: public_html/mpa-trs-assets/<SHA>/assets/*.css. No manifest, source, vendor, archive, checksum, environment or runtime storage enters public_html.

Two scoped production FTP accounts remain the minimum straightforward design for these disjoint private and public directories. A single common-ancestor FTP jail would expose existing applications; cross-jail symlinks are unacceptable. Serving CSS through PHP to avoid a second account adds routing/caching machinery unnecessarily. Proposed private account root production includes MPA-TRS shared secrets, so credential permissions and workflow writers remain security-sensitive; never expose configuration to Actions logs. Public-assets account root only mpa-trs-assets. Exact usernames/secrets require separate approval; the probe account never becomes production credentials.

Production tooling will reuse verified file upload logic with separate root identity markers and strict role allowlists after real rehearsal evidence. It must require complete private runtime AND matching public CSS before publishing the selector. No unattended push deployment. Manual release promotion and rollback record exact SHA/digest/prior SHA; retain at least active and previous runtime/assets. No database or migrations needed. FTPS cannot execute Composer/Artisan, extract archives, create credentials or change PHP/DNS.

One supervised cPanel bootstrap must establish owner-writable shared storage (sessions, views, cache/data, logs), persistent private .env/key, root sentinels, scoped original-file backup and fixed main entry/routing. Use 0700/0600 private shared configuration where compatible and ordinary non-world-writable runtime permissions; verify real PHP owner/open_basedir/extensions before launch. No 0777 or shared PHP setting changes. No generic HTTP diagnostics/command executor.

## Approval sequence

1. Review/approve merge of PR #6 and the private rehearsal PR after actual CI success. No merges performed automatically.
2. Separately approve the exact private rehearsal path and file uploads/selector rename/reversal above using existing probe secrets. Record exact successful A/B SHA, source runs and inner digests before dispatch. No new credentials, public files or production change.
3. Measure actual performance, permissions and replacement behavior, then finish production-role tooling and its checks based on evidence. If slow/unsupported, present the proven supervised File Manager fallback rather than inventing commands or atomicity.
4. Present one consolidated production checkpoint: exact tested release SHA/digest, exact entry/routing diff, private/public paths and account scopes, backup identities, activation/rollback commands and risks, then seek approval. Do not treat this document or private rehearsal approval as production permission.
5. After production approval, deploy A, verify HTTPS/HTML/health/revision/CSS/private URL denial and desktop/mobile/errors; update to distinct tested B and restore A; verify SLiMS catalog/search/detail, E-Letter login and existing nested paths at transitions. This live A/B/A remains required even if private marker reversal succeeds.
6. Update authoritative docs and retire temporary credentials only after separately approved cleanup.

Initial recovery restores only backed-up main entry/routing originals (or removes only a newly approved .htaccess if originally absent) with the approved welcome precedence. Application rollback selects retained verified A after checking A runtime/CSS, and verifies live responses. Code rollback is never database restoration. A failed non-atomic marker write can cause transient 503; no zero-downtime claim. The proposed main entrypoint now also requires a bounded COMPLETE.json matching the selected SHA; the Work/CI HTTP rehearsal checks missing completion fails closed. This does not replace full pre-activation remote file/asset integrity verification.

No hosting upgrade, new domain, paid service, database or permanent preview. Additional hosting cost: zero; Actions consumption is subject to the existing account's allowance and no paid overage is authorized.
