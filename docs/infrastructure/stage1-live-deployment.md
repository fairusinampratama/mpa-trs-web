# Stage 1 — first live deployment evidence

Recorded 10 October 2026. This record supersedes earlier “not deployed” checkpoints; historical evidence remains preserved. The core production milestone is proved: Laravel 12.69.3 runs at https://mapalatursina.my.id/, a real A → B → A update/recovery succeeded, and existing applications remain accessible. Final handover still requires review/merge of this evidence PR and a mobile rendering check, which the available cloud browser controls could not perform. Do not describe every requested verification as complete.

## Exact releases and Actions evidence

| Step | A | B |
|---|---|---|
| Source SHA | `623bb0a024c3a72454a1f9edaa935c0b1c0e095c` | `7bc714cc0ac0de59e4b0e6f7cf900dcb334c1d86` |
| Successful source CI | 38030588835 | 38030771303 |
| Inner ZIP SHA-256 | `dd322dc8a3e445f528a0232a8320843028eeda8cd851b2ad49e85863d91fc9d5` | `77de62a139fd7bb29fc2a98d696eb34adacfd5ff4c807d6844559e2ac5aa2f38` |
| ZIP bytes | 26,558,197 | 26,558,197 |
| FTPS ZIP upload/readback | 38043932989, success | 38044055031, success |
| Full extraction verification | 38045073075, success | 38045147317, success |
| Compared extracted files / bytes | 5,555 / 25,335,627 | 5,555 / 25,335,627 |
| File Manager snapshot SHA-256 | `1c75c3135d38327cdae3f569340fb78149778d3c8c593db6d35626f9d5065b61` | `a174fa9888e4ca5969cc69a2e9f6676147b66e37be9e8fa77af5937943f08d43` |

Tooling main commit `dccfb96e270955bae6b247f306085425f36d98d3` includes separately approved PR #11. PR #11 CI 38043681780 passed 59 deployment tests, Laravel PHP 8.2/8.3 tests and real packaged HTTP/CSS/recovery. PRs #8/#9 remain unmerged and are not the production critical path.

| Live transition | Run | Result |
|---|---|---|
| NONE → A | [38045291742](https://github.com/fairusinampratama/mpa-trs-web/actions/runs/38045291742) | Selector readback, HTTPS health SHA, landing HTML, exact CSS and private denial passed |
| A → B | [38045464798](https://github.com/fairusinampratama/mpa-trs-web/actions/runs/38045464798) | Same checks passed; browser CSS URL switched to B |
| B → A | [38045615888](https://github.com/fairusinampratama/mpa-trs-web/actions/runs/38045615888) | Same checks passed; browser CSS URL restored to A |

A is active; B remains retained. B is a harmless documentation-only distinct commit: both applications have the same landing content and CSS bytes, with different exact revisions and SHA-namespaced CSS URLs. This proves the delivery/selector lifecycle, not migration or changed business-feature compatibility.

## Actual hosting architecture

Private root `/home/mapp5848/mpa-trs/production` contains fixed sentinel, incoming/<SHA>/application.zip + archive.sha256, releases/<SHA>/application and release metadata/COMPLETE.json, verification/<SHA>.zip, shared/.env, shared/storage and shared/active-release. No symlink or host command is used. The dedicated runtime account is jailed to this root; verified parent/main-domain/E-Letter denial happens before uploads. CA/hostname validation and encrypted PROT P remained enabled, TLS 1.3.

Both full Laravel ZIPs were extracted and recompressed through File Manager without observed archive errors. Actions downloaded the recompressed snapshots and compared every expected file byte before writing COMPLETE.json. Critical files, owner permissions, environment mode 0600 and exact public CSS passed. Successful live Laravel requests demonstrate the required runtime paths and compiled Blade storage work on the current hosting PHP baseline; no shared PHP configuration or extension settings were changed.

Public changes are only `public_html/index.php`, new `public_html/.htaccess`, and `public_html/mpa-trs-assets/.htaccess` plus the two versioned CSS files. The fixed entrypoint validates a lowercase 40-hex selector, matching completion flags and real private path. The main routing fragment excludes existing application/storage/cgi-bin/.well-known paths and bypasses existing files/directories. No recursive replacement/synchronization occurred.

Installed index.php: 1,390 bytes, SHA-256 `be4e6ecaf37e4e30ec16616dd09c6613e40d99ef2478688ce7a877937dee2620`.
Installed .htaccess: 542 bytes, SHA-256 `343ca093de298aa8e3f89bfb58c761522a385ff4db09dc1c31e174ed33f1b74c`.
Both were downloaded and byte-compared to the reviewed repository templates after extraction and before activation. The automatic reviewer briefly rejected activation while extraction was visibly in progress; no activation was dispatched then. Successful extraction plus these byte checks resolved the risk before the approved activation proceeded.

## Persistent configuration and backups

shared/.env is owner-only 0600 with stable private APP_KEY, production/debug-off settings, HTTPS APP_URL and file-backed storage. No database-dependent feature, migration or database object was created. Config/storage persist across code releases; rollback does not modify them.

Original main index.php is retained at `rollback-originals/20261010-launch/index.php`: 10,929 bytes, SHA-256 `93a2fb8bbf8ce6dea77c06407907ed9ad32c759f3a7eae124b4c6f3476ab048f`. Original and backup downloads were byte-identical. Original main .htaccess, index.html and home .htaccess were absent. `original-main-recovery.json` is preserved beside the original index and records original absence, installed digests and scoped restoration instructions.

The pre-existing encrypted full account backup and separate post-repair SLiMS configuration were preserved; owner-only off-host metadata was reconfirmed before writes. Additionally, the newly generated production environment was encrypted using the existing separate RSA recovery key, AES-256-GCM CMS, and stored in the already-authorized private recovery Drive folder. Stored ciphertext was downloaded, its digest verified, and authenticated decryption matched the environment bytes. File `mpa-trs-production-env-20261010.cms`, Drive ID `1SHUOjUL9Dkj-r6rxmAZVaI3vyZvLLwdu`, 1,069 bytes, SHA-256 `e094b4723f363ac851392101b6f1a4c95874a55fbc34ec28d5cbddb6461e0030`. Shared=false and owner-only permission confirmed. The recovery key remains separate; neither key nor plaintext environment entered GitHub.

## Repeatable update and recovery

1. Approved feature branch → PR → actual CI → explicit merge approval. Build exact merged/approved source and retain source run, inner digest and artifact identity. Repository writers are trusted because branch protection does not enforce review.
2. Approve the exact production release. Run supervised-release upload with action=upload, trusted source run/SHA/digest and previous=current SHA. One ZIP is uploaded privately and downloaded over encrypted FTPS for size/digest verification. Existing destinations are refused.
3. In one supervised cPanel session, extract to fresh releases/<SHA>, inspect critical files/permissions, compress only that release into verification/<SHA>.zip, and copy only compiled CSS to the new public SHA assets path. Never include shared configuration/storage in the snapshot or public files.
4. Run verify-extracted with the same pinned inputs. Every extracted byte, critical file, permissions and HTTPS CSS must pass; COMPLETE.json is written last. Failure leaves the current selector unchanged. Do not blindly retry partial namespaces.
5. Run approved activate with previous=current SHA. Guarded candidate STOR/readback → FTP rename-over-marker → selector readback → live smoke. No cPanel entrypoint change is needed for routine releases.
6. To restore a retained verified release, run approved rollback using its own original trusted run/SHA/digest and previous=current SHA. Both A/B runtime trees/assets remain. The demonstrated B → A restoration used no new extraction or cPanel login.
7. Verify browser rendering/revision asset URL, health/CSS/private denial and existing application regressions after each operation. Code rollback is not database restoration.

If first-launch routing must be undone: verify the original index digest; copy only that index back to public_html/index.php; move only the newly introduced main .htaccess to a distinct private failed-routing backup because no original existed; verify welcome and existing sites. Leave Laravel releases/assets intact. This scoped welcome restoration is documented but was not performed during the successful A/B/A cycle.

## Verification and remaining limits

Desktop browser rendered the minimal MAPALA TURSINA landing at 1363 × 936 with no horizontal overflow; versioned CSS URLs were A, B, A as expected. No application-origin console error was observed. A Chrome extension metadata error was excluded from application results. Browser JSON /health navigation was blocked by ERR_BLOCKED_BY_CLIENT; HTTPS health identity was independently verified by successful Actions smoke checks.

SLiMS catalog populated, “Bromo” search returned one result, and book 48 detail rendered. E-Letter login rendered. Their main-domain nested detail/login paths rendered as the existing applications, not Laravel routing. These pages were checked during the live sequence and after restoration. No admin write/authenticated E-Letter action was tested. Existing app code, databases, DNS and PHP settings were untouched.

Mobile rendering remains unverified: the supported browser APIs expose no viewport sizing and standard DevTools shortcuts did not change the viewport. Desktop evidence is not mobile evidence. Complete a separate real mobile/responsive browser check before claiming every requested verification passed.

Routine NEW releases still need one supervised cPanel extraction/recompression/CSS session. Retained-release activation/rollback needs only approved GitHub Actions FTPS, as demonstrated. FTPS cannot extract archives or run Composer/Artisan. No automatic production deployment, delete-first rename fallback, atomicity or zero-downtime claim. Initial selector NONE during routing installation may return transient 503; exact outage duration was not measured.

GitHub source artifacts expire on 24 October 2026 (14-day retention). The current guarded Actions workflow needs its trusted source artifact to remain downloadable; retaining host ZIPs alone does not extend GitHub artifact retention. Before expiration, preserve the exact verified ZIP and digest in a durable authorized private destination if long-term Actions rollback is needed, or obtain approval for a small artifact-source extension. Do not silently regenerate a different digest, mark it as the old release, or claim post-expiry Actions rollback has been tested. The host originals, immutable A/B and selector remain available for supervised recovery.

Additional infrastructure cost: zero per month/year; existing hosting and normal Actions quota only, with no paid overage authorized. Temporary probe credentials/resources remain pending separate retirement approval. No Stage 2 work started.
