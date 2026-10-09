# Hosting baseline

Source: mpa-trs-phase2-foundation.md (8 October 2026), authoritative over the older rumahweb-hosting-baseline.md. Sanitized historical evidence; current interface state must be checked before use.

| Item | Established value |
|---|---|
| Hosting | Rumahweb Unlimited S / cPanel Build |
| Account / home | mapp5848 / /home/mapp5848 |
| Server | tokala.iixcp.rumahweb.net |
| Main | mapalatursina.my.id / /home/mapp5848/public_html; provider welcome page |
| SLiMS | 9.7.2 / public_html/slims.mapalatursina.my.id |
| E-Letter | Laravel 12 private /home/mapp5848/eletter; public public_html/eletter.mapalatursina.my.id |
| Effective web PHP | CloudLinux 8.2; do not change shared settings |
| Work SSH / API | Work network-blocked / apitokens disabled |
| Support | KSF-613183; Phase 2 saw Closed, original inquiry only |

SLiMS dedicated DB user repair succeeded for catalog, search and book details. SELECT, INSERT, UPDATE, DELETE, LOCK TABLES granted only to its existing database; DROP withheld. Admin writes remain untested. E-Letter login loaded; authenticated workflows/DB auth are not proven by that alone.

File listing/view/copy/create-directory and configuration saves were verified in prior work. Upload, extract, compress, move and rename controls were visible but not exercised for deployment. Git UI listed zero repos with shell-access warning. FTPS/SFTP, symlinks, CLI, cron execution, outside-public_html roots and new HTTPS/auth configuration are unverified. File Manager limits cannot be inferred from PHP's 10M upload limit.

Preserve both existing application trees, configuration/signing material, uploads/documents/QR codes, both databases and shared public_html/storage. Older baseline failure/backup-pending statements are superseded by the completed repair and verified backup in recovery.md.

