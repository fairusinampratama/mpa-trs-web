# Recovery and backup

Full account archive: /home/mapp5848/backup-10.8.2026_08-27-08_mapp5848.tar.gz.

138252676 bytes; 15588 entries. Plaintext SHA-256:

`6484b3610aa4ebea633c80883df24f184cb25ddde373c74fa33e3b46b7e4ff72`

Rehashed locally on 8 October 2026; matched. Verification covered application files/config/uploads and completed dumps: 61 SLiMS tables and 14 E-Letter tables. This is not a restore rehearsal. Original server backup must remain intact.

The backup predates SLiMS repair. Securely preserve current config/database.php and config/env.php separately; never commit them. Restoring original config may restore the old broken DB credential. The older slims-access-backup-20261007 copies also predate repair.

Before hosting changes require: encrypted durable off-host backup in a verified private destination; separately preserved recovery key; re-downloaded ciphertext digest comparison and decryption/plaintext checksum verification; secure current SLiMS config copy. Scratch-only storage or a verification report does not satisfy this gate.

Current user-selected destination: private Google Drive folder `MPA-TRS encrypted recovery backups`. See phase3-implementation.md for actual transfer/encryption evidence. Do not place the recovery key in that folder or account archives in GitHub/public roots.

Full cPanel-account restore may require Rumahweb support. File/database restore is separate and requires approval; do not rehearse over production. Probe rollback retains A/B archives and extracted releases and reverses only preview activation. No existing database restore or migration is part of this phase. Production approval remains explicit human approval outside unattended Actions.
