# Recovery and backup

Full account archive: /home/mapp5848/backup-10.8.2026_08-27-08_mapp5848.tar.gz.

138252676 bytes; 15588 entries. Plaintext SHA-256:

`6484b3610aa4ebea633c80883df24f184cb25ddde373c74fa33e3b46b7e4ff72`

Rehashed locally on 8 October 2026; matched. Verification covered application files/config/uploads and completed dumps: 61 SLiMS tables and 14 E-Letter tables. This is not a restore rehearsal. Original server backup must remain intact.

The backup predates SLiMS repair. Securely preserve current config/database.php and config/env.php separately; never commit them. Restoring original config may restore the old broken DB credential. The older slims-access-backup-20261007 copies also predate repair.

Before hosting changes require: encrypted durable off-host backup in a verified private destination; separately preserved recovery key; re-downloaded ciphertext digest comparison and decryption/plaintext checksum verification; secure current SLiMS config copy. Scratch-only storage or a verification report does not satisfy this gate.

Current user-selected destination: private Google Drive folder `MPA-TRS encrypted recovery backups`. See phase3-implementation.md for actual transfer/encryption evidence. Do not place the recovery key in that folder or account archives in GitHub/public roots.

Full cPanel-account restore may require Rumahweb support. File/database restore is separate and requires approval; do not rehearse over production. Probe rollback retains A/B archives and extracted releases and reverses only preview activation. No existing database restore or migration is part of this phase. Production approval remains explicit human approval outside unattended Actions.

## Verified encrypted off-host preservation (8 October 2026)

Drive folder: https://drive.google.com/drive/folders/1_6u2gP6QIxIaVJ9SH5x2dwAmIherxwNv . Folder and each backup file read back with shared=false and owner-only permission. No public/link permissions added.

Encryption: OpenSSL 3 CMS AuthEnvelopedData, AES-256-GCM, RSA-4096 recipient. Recovery key is a separately saved private downloadable file, outside Drive and GitHub. User should preserve it in a password manager/offline recovery vault. Never add it to this repository or the backup Drive folder.

The 100 MiB connector upload limit required splitting encrypted bytes into 48 MiB parts. Re-download through the Drive connector and supported workspace materialization succeeded. Every part digest, reassembled ciphertext and authenticated decrypted plaintext matched. Original plaintext SHA-256 above remains the recovery identity. The old scratch copy unexpectedly truncated; a fresh read-only server download recovered the exact original archive. Server original remains untouched.

| File | Bytes | SHA-256 |
|---|---:|---|
| backup-20261008.cms.part01 | 50331648 | d1430a8ce5f76fc09bde57f2d9f25ae8db119ccb12e66d47027040a906ebd828 |
| backup-20261008.cms.part02 | 50331648 | 9094d2a5770ebd55c001d8416cbe6ce10ba658b7ca954dde2be8bfdf15372ce5 |
| backup-20261008.cms.part03 | 37590089 | 9b4e5c7116d0dd632dcd64f6e4fe7545d58140133c63156a9291d9330164ae53 |
| Reassembled ciphertext | 138253385 | 9947825a79307c6b0dfb756beb1b6f05305fdb2868e2c2459c1e2f6ff0f0de95 |
| slims-post-repair-config-20261008.tar.cms | 10939 | c932dd42d782d550328f3fa0aa2677e6d848380114ea2e8a032157bf1408fd9b |

Current SLiMS config/database.php (431 bytes) and config/env.php (618 bytes) were downloaded read-only, bundled and encrypted. Stored ciphertext was retrieved, decrypted and verified; plaintext tar digest 9d40eaeb2951362b879f03d1feb185afa7df8412b50c8b9ad3c82c2d436cb514. Values were not displayed or committed.

## Offline decryption

Download all three parts and the manifest from the private folder. Verify the part digests before concatenation, in numeric order. On a private local machine with OpenSSL 3:

```sh
cat backup-20261008.cms.part01 backup-20261008.cms.part02 backup-20261008.cms.part03 > full-backup.cms
sha256sum full-backup.cms
openssl cms -decrypt -binary -inform DER -in full-backup.cms -inkey /secure/path/mpa-trs-recovery-key.pem -out full-backup.tar.gz
sha256sum full-backup.tar.gz
gzip -t full-backup.tar.gz
```

Require both recorded digests before any restoration. Decrypt SLiMS config similarly using its .cms file. Keep decrypted bytes private; do not extract over production. Ciphertext is integrity-protected, but SHA-256 values and exact file identities should be retained independently too. Full-account restore still requires separately approved provider-assisted handling; encryption verification is not a restore rehearsal.
