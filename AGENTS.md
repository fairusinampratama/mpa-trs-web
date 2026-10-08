# MPA-TRS operating rules

Read docs/infrastructure/phase3-implementation.md first, then deployment.md, recovery.md and hosting-baseline.md. These files replace dependence on chat history. Distinguish observed results from proposals; update evidence after each completed operation.

- This repository is framework-neutral. Do not initialize Laravel or assume an application exists.
- Work in a feature branch and PR. Run meaningful deployment tests. Verify actual Actions results before describing CI as successful. Do not claim branch protection unless account settings were verified.
- GitHub is source of truth. Build/test in Actions. Use exact Git SHA, variant, archive digest and manifest; deploy the same tested bytes.
- Never commit credentials, keys, .env files, SQL, account archives, uploads or runtime storage. Name/signature checks are defense in depth, not a universal secret detector. Review changes for sensitive content.
- Preserve main /home/mapp5848/public_html, SLiMS public_html/slims.mapalatursina.my.id, E-Letter private eletter and public_html/eletter.mapalatursina.my.id, both existing databases and all PHP settings. Never mirror/delete the whole public_html tree.
- Before any hosting write, verify encrypted durable off-host backup, separately retained recovery key, transfer integrity, and secure post-repair SLiMS configuration preservation. A transient scratch copy is insufficient.
- Authorized private probe namespace: /home/mapp5848/mpa-trs. No writes in existing application trees.
- Domain/DNS/document-root changes require exact action-time user approval. Production routing, real application deployment, existing app/DB changes, irreversible operations and paid add-ons require approval; do not purchase upgrades.
- cPanel HTTPS browser is operational interface. Work SSH is network-blocked and API tokens disabled. Do not retry SSH without new support evidence. No HTTP shell, generic deployment endpoint, cron executor or other bypass.
- Preview must have HTTPS, authentication and noindex. robots.txt is not access control. Keep metadata/archives/configuration outside served public roots. Verify main-domain alternate paths if using a nested preview root.
- Do not assume symlinks, atomic renames, host CLI execution or zero downtime. Select activation only after proving it on preview. Keep both releases; prove A -> B -> A and verify existing routes after each transition.
- Credentials must use secure user entry. Never reveal or read sign-in values through UI automation. Preserve backup keys separately from encrypted archives.
- Code rollback is not DB restoration. No migrations or preview database in the static probe phase.

Current verified source release: f980c20ecc521e5cd824e456691e0c1cefe209b2. CI and manual A/B packaging succeeded. Private uploads and A/B extraction integrity succeeded. Domain/DNS approval is still pending; no preview activation or rollback has been proved. Use leading-slash File Manager home-relative paths and verify the full upload heading. See phase3-implementation.md before resuming. Recovery ciphertext is in private Drive; recovery key is separately preserved and must never be committed or placed with the backup.
