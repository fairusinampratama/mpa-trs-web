# Active Stage 3 publishing — native GitHub Pages

Owner explicitly authorized the existing repository Private→Public and native GitHub Pages on 14 October 2026. The former Option B recommendation/template is historical and superseded. No second repository, personal access token or cross-repository publishing was activated. Historical assessment/checkpoint03/template remain retained; `prototype/tools/publish_preview.py` now refuses to execute.

Repository: `fairusinampratama/mpa-trs-web` (public, default branch main). Source branch: `stage3/interactive-prototype`; PR13 stays draft/unmerged. Build root: `docs/stage3/prototype/`. Active workflow: `.github/workflows/stage3-pages.yml`. GitHub Pages setting: **GitHub Actions**. No custom domain; default HTTPS enforced. `github-pages` environment allows exactly the branch `stage3/interactive-prototype` (not main/tags) and contains no secrets.

Expected HTTPS address until first deployment is verified: `https://fairusinampratama.github.io/mpa-trs-web/`. Supported entries: homepage, `#/ui-lab`, `#/program/te`, `#/expedition/te11`, and `responsive-review.html`. Internal original `/ui-lab` is not a supported clean static route. Hash deep links/reloads need no catch-all rewrite. The responsive HTML is a separate explicit Vite input and uses relative iframe links.

## Workflow and isolation

Pushes to the prototype branch trigger only for prototype files or the Pages workflow. No PR/fork trigger, pull_request_target, workflow_run, manual main dispatch or production credentials. Repository/branch job conditions prevent a copied fork workflow publishing this repository. Concurrency serializes publishing without cancelling an in-progress deployment.

1. Build has only contents:read. Node24 + npm ci from lock, eight public-output tests, TypeScript/Vite build with `/mpa-trs-web/` and exact event SHA, then public-output validation.
2. Official pinned upload-pages-artifact receives ONLY prototype/dist. publicDir copying and source maps are disabled. Allowlist: index.html, responsive-review.html, version.json, .nojekyll and generated JS/CSS. The validator rejects unexpected files, symlinks, private-content patterns, obsolete preview paths, incomplete entries and wrong source identity. No original image/report, real member data, Laravel runtime or infrastructure doc in this artifact. Source repository documentation/history are publicly visible by the separate owner decision.
3. Deploy depends on successful build. Only this job has pages:write and id-token:write; it has no checkout/build dependency scripts. Official configure-pages reads native settings, then deploy-pages uses GitHub token/OIDC to publish the accepted artifact to the branch-restricted environment. Actual page_url output is recorded.
4. Read-only verification job consumes deploy output, checks expected native URL, waits for exact version.json source SHA and checks both HTML entries/assets over HTTPS. Build, upload, deployment or HTTP failure fails the workflow; a pushed workflow is not release proof. Real browser verification remains separate.

Existing seven Stage1 workflow files and production code/scripts are preserved unchanged. Existing fork approval requires first-time contributor approval; default token is contents/packages read-only; Actions cannot create/approve PRs. Production-secret jobs remain manual and main-only. Public visibility does not make outside contributors trusted writers. No secret value was inspected through settings or moved.

## Update, rollback and resume

Edit shared React/components/tokens and source-safe fixtures on the Stage3 branch; build/test and inspect affected routes; commit and push. Pages runs automatically. Owner opens HTTPS directly in Chrome. Banner shows short source revision; version.json contains full SHA; workflow run/head SHA and Pages deployment identify release. A docs-only evidence commit does not redeploy; identify deployed SHA separately from branch head.

Reverse a broken preview by a normal source revert on this branch, then push. The new commit builds/deploys normally. Do not force-push, reset history or invoke production rollback. To re-run unchanged frontend through push, add/update a harmless `prototype/preview-rebuild.json` marker. No default-main workflow merge is needed; workflow_dispatch is intentionally absent because discovery requires default-branch presence. Do not repeatedly retry a partly completed deployment; inspect its run/Pages identity first.

In a new Work session, fetch branch head/PR13 and read AGENTS, approvals, design-system, fixture ledger, latest checkpoint and this runbook. Use retained source, not scratch/cloud-server persistence. Verify served version before further design review. No additional hosting account, credential renewal or preview setup is required after successful native activation.

Limitations: public review site has no access control; noindex is advisory. Forms/editorial publishing are browser-local simulation. Theme/navigation reset on reload and remain unapproved alternatives. CSS review frame is document reflow, not physical-device/touch testing. Media needs rights clearance. Stage1 artifact expiry/mobile follow-ups are separate. No Stage4 or production deployment authorization.
