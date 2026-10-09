# FTPS transport investigation and safe preparation

9 October 2026. Status: repository preparation; authenticated account scope, data transfer and production activation are NOT verified. Current cPanel transport remains the working fallback. Stage 1 remains application foundation and first live deployment; no permanent preview domain.

## Confirmed evidence and limits

- Latest main remains 53c10728e7042b88b5ada047ad2d71e78eb46540. Stage 1 PR #4 is open/unmerged at e197e2b401b80b60a8de2bcbf91063b364cddab6. This transport feature branches from that exact head and targets its branch; it does not merge application changes into main.
- Rumahweb's official account guide documents separate FTP accounts and a chosen access directory: https://www.rumahweb.com/journal/cara-membuat-akun-ftp-di-cpanel/ . This is provider documentation, not proof that FTP Accounts is currently enabled on mapp5848.
- cPanel documents a top-level directory jail, including home-relative paths outside public_html, and forbids symlink uploads outside that directory: https://docs.cpanel.net/cpanel/files/ftp-accounts/ . The primary FTP account can access all account files and must not be used by the workflow.
- cPanel recommends the server hostname for the FTP TLS certificate. Candidate endpoint is tokala.iixcp.rumahweb.net:21 with explicit AUTH TLS. Do not use mapalatursina.my.id or an IP address unless its certificate independently validates; no verification bypass.
- Work's single credential-free connection attempt failed DNS resolution before connection. This does not prove the server lacks FTPS. No FTP authentication or write was attempted.
- No authenticated browser session was present in this turn's inventory. No extra Rumahweb login/OTP attempt was started. Account-specific FTP configuration remains to inspect during one approved setup session.
- Python explicitly requires protected data with prot_p(); context defaults are not sufficient: https://docs.python.org/3/library/ftplib.html . Implementation uses create_default_context(), hostname/CA validation and minimum TLS 1.2, with TLS session reuse on the data socket. No plain fallback, CCC, PROT C or debug credential logging.
- GitHub's standard runner IP ranges are numerous and change; no static egress claim: https://docs.github.com/en/actions/reference/runners/github-hosted-runners . A successful credential-free control handshake will not prove account authentication, firewall allowance for passive data ports, or data-channel TLS/session compatibility.

## Implemented safe repository capability

- ftps-discovery.yml: PR/manual tests and credential-free runner AUTH TLS/certificate discovery; no USER/PASS, anonymous login, data transfer or server writes. Persist public TLS evidence for 14 days. A failed discovery is a failed diagnostic job, not silently called successful transport.
- ftps-private-probe.yml: manual workflow only, main branch only, typed PRIVATE_PROBE_ONLY acknowledgement. Read-only Actions token and separate probe credentials in repository secrets. This acknowledgement records operator intent; it is NOT enforced human review. No environment reviewer or branch-protection claim. Secrets must not be provisioned until the user approves exact credential scope and writes.
- fetch_application_artifact.py: validates a completed successful same-repository CI/application-package run and exact head SHA, unique unexpired artifact, trusted GitHub wrapper digest, approved INNER ZIP digest, schema-2 inventory/manifest/production dependencies/CSS and source-run metadata. Rejects fork source and unknown workflow. Never rebuilds deployment payload. GitHub authorization stripped on cross-origin HTTPS redirects.
- ftps_transport.py: pinned server/port and dedicated probe username, explicit verified TLS before credentials, PROT P passive data. Requires jailed PWD '/', parent boundary, failed CWD to existing-app/account paths and a private root sentinel. Never reads existing applications. Requires a minimal root inventory and fresh unique probe directory. Uploads release.zip, retrieves it over protected FTPS and checks every archive byte/digest; publishes a verified receipt only afterwards. No extraction or activation.
- 33 local deployment tests pass (20 existing + 13 transport/provenance/security tests). Actual Actions results must be recorded below after running.

## Exact first setup proposal — NOT APPROVED OR PERFORMED

One cPanel setup session, preserving existing applications and all PHP/database/authentication settings:

1. Inspect FTP Accounts and Configure FTP Client read-only, confirming dedicated-directory field accepts private home-relative mpa-trs/ftps-probe. Inspect server requirements and passive range if shown; do not change WHM/global FTP configuration.
2. Reconfirm existing encrypted off-host backup and separately retained recovery key before writes, using recovery.md.
3. Create only /home/mapp5848/mpa-trs/ftps-probe and .mpa-trs-ftps-probe-root containing exactly `mpa-trs-ftps-probe:v1` plus newline, outside all served roots. No existing application files overwritten. Keep the directory private to the hosting account, not world writable.
4. Create FTP account mpatrs_probe@mapalatursina.my.id with top-level directory /home/mapp5848/mpa-trs/ftps-probe; no account-home or public_html access. Proposed quota 256 MiB if supported (otherwise verify available space). Creating any credential requires explicit user approval and secure user entry, never chat/logs/source. Do not reuse the cPanel credential.
5. Securely provision repository secrets MPA_TRS_FTPS_PROBE_USER and MPA_TRS_FTPS_PROBE_PASSWORD for this dedicated account only. No secrets have been created. User secure credential entry is required; this is initial setup, not every deployment.
6. After approval, manually run the probe with a successful source run, exact SHA and approved inner digest. It may create only probes/<sha>-<run>-<attempt> beneath the jailed directory, plus release.zip and receipt.json. No deletion, overwrite, production change or activation. Confirm negative-access checks and protected data roundtrip succeed. Receipt excludes credentials and private content. Probe results remain private on-host and expire from Actions after 14 days.

A candidate already verified in Stage 1 is run 37884284506, SHA fcef4f76f77e30d383bd59c33af84292392d550f, inner SHA-256 f0da119bbbffc8330fa117409dcca99c9fda9d3964b0022a1ec184fc75294081. It expires 23 October 2026; after expiry produce a newly tested artifact and approve its identity. Transport tooling requires merging approved PRs before its main-only authenticated workflow can execute. Do not merge merely to test.

## Future routine releases and recovery — proposed, not implemented

FTPS removes routine cPanel uploads only after verified setup and separately approved activation wiring. The archive probe alone does not achieve a Laravel deployment.

Use two narrowly restricted FTP accounts for production after separate approval:

- Private runtime account jailed to /home/mapp5848/mpa-trs/production (immutable releases, selector and shared runtime; this account also has access to MPA-TRS shared secrets/storage, so tightly restrict who can run secret-bearing workflows).
- Public-assets account jailed to /home/mapp5848/public_html/mpa-trs-assets (versioned CSS only). Never jail an account to all public_html; it includes SLiMS/E-Letter. No symlink shortcut across jails.

One initial approved cPanel bootstrap installs the fixed main-domain entrypoint/routing and private production config/storage, verifies PHP extensions/permissions and original-file backups. That entrypoint's sole fixed SHA selector comes from Stage 1; it accepts no HTTP-supplied path or command. Current production entrypoint/routing remain unchanged.

Routine manual Actions promotion can then download a successful exact artifact, validate it, extract it locally on the runner, and upload manifest-allowlisted regular files individually into a new private release. Upload only manifest-listed CSS to its SHA namespace using the assets account. Verify remote integrity and retain both old runtime and assets before activation; measure the cost of 5,000+ small-file transfers. No recursive mirror, deletion, .env replacement, cache clear, host build or migrations. Publish release completion evidence only after all checks.

Activation would upload a SHA-only candidate marker and rename it over the existing active-release file, if the actual FTP daemon supports this operation safely. FTP rename/overwrite semantics, failure behavior, concurrent requests and web PHP behavior must be tested after approval in the private probe before implementation. No atomicity or zero-downtime assertion. If replacement cannot be proven, supervised direct marker edits may require maintenance and transient 503; retain the cPanel fallback.

Rollback would restore the retained previous validated SHA using the same tested marker procedure, then verify HTML revision/health/CSS and existing SLiMS catalog/search/detail plus E-Letter login and main-domain nested paths. Keep both releases/assets. Code rollback does not restore databases. Initial rollout recovery restores only backed-up main entry/routing/welcome precedence. Neither actual activation nor rollback is implemented by this PR.

FTP directory restriction prevents direct FTP access to sibling application files; it is not OS isolation. Executable PHP on this shared account can run as the same Unix user. The release remains trusted reviewed code; do not claim FTPS jailing alone sandboxes Laravel from SLiMS/E-Letter.

## What FTPS cannot do

Standard FTPS transfers files and supports directory/file operations subject to permissions. It does not extract ZIP/TAR, execute Composer/npm/Artisan/shell commands, run migrations, create a MySQL database, change DNS/document roots/PHP extensions, provision TLS certificates or create FTP accounts. Do not rely on SITE EXEC/custom extraction or an HTTP shell. chmod is server-specific, not a confirmed capability; establish owner-writable runtime directories during bootstrap or verify supported permissions in the probe. FTP rename is not proof of atomic release deployment. PHP web serving and DB operations are separate hosting capabilities.

## Remaining blockers

Actual runner TLS evidence; account-specific FTP availability and directory jail; approved secure credential creation/provisioning; passive TLS data path and roundtrip; remote directory/permission/rename behavior; one-time approved production bootstrap; measured full-runtime upload; tested production activation/rollback. All current cPanel and Stage 1 paths remain intact until these pass.
