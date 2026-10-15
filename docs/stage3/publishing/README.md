# Active Stage 3 publishing — native GitHub Pages

Owner explicitly authorized the existing repository Private→Public and native GitHub Pages on 14 October 2026. The former Option B recommendation/template is historical and superseded. No second repository, personal access token or cross-repository publishing was activated. Historical assessment/checkpoint03/template remain retained; `prototype/tools/publish_preview.py` now refuses to execute.

Repository: `fairusinampratama/mpa-trs-web` (public, default branch main). Source branch: `stage3/interactive-prototype`; PR13 stays draft/unmerged. Build root: `docs/stage3/prototype/`. Active workflow: `.github/workflows/stage3-pages.yml`. GitHub Pages setting: **GitHub Actions**. No custom domain; default HTTPS enforced. `github-pages` environment allows exactly the branch `stage3/interactive-prototype` (not main/tags) and contains no secrets.

Verified HTTPS address: `https://fairusinampratama.github.io/mpa-trs-web/`. Supported entries: homepage, `#/ui-lab`, `#/program/te`, `#/expedition/te11`, and `responsive-review.html`. Internal original `/ui-lab` is not a supported clean static route. Hash deep links/reloads need no catch-all rewrite. The responsive HTML is a separate explicit Vite input and uses relative iframe links.

## Workflow and isolation

Pushes to the prototype branch trigger only for prototype files or the Pages workflow. No PR/fork trigger, pull_request_target, workflow_run, manual main dispatch or production credentials. Repository/branch job conditions prevent a copied fork workflow publishing this repository. Concurrency serializes publishing without cancelling an in-progress deployment.

1. Build has only contents:read. Node24 + npm ci from lock, 12 public-output tests, TypeScript/Vite build with `/mpa-trs-web/` and exact event SHA, then public-output validation.
2. Official pinned upload-pages-artifact receives ONLY prototype/dist. publicDir copying and source maps are disabled. Allowlist: index.html, responsive-review.html, version.json, .nojekyll and generated JS/CSS and only two hash-approved official WOFF2 font builds. The validator rejects unexpected files, symlinks, private-content patterns, obsolete preview paths, incomplete entries and wrong source identity. No original image/report, real member data, Laravel runtime or infrastructure doc in this artifact. Source repository documentation/history are publicly visible by the separate owner decision.
3. Deploy depends on successful build. Only this job has pages:write and id-token:write; it has no checkout/build dependency scripts. Official configure-pages reads native settings, then deploy-pages uses GitHub token/OIDC to publish the accepted artifact to the branch-restricted environment. Actual page_url output is recorded.
4. Read-only verification job consumes deploy output, checks expected native URL, waits for exact version.json source SHA and checks both HTML entries/assets over HTTPS. Build, upload, deployment or HTTP failure fails the workflow; a pushed workflow is not release proof. Real browser verification remains separate.

Existing seven Stage 1 workflow files and production code/scripts are preserved unchanged. Existing fork approval requires first-time contributor approval; default token is contents/packages read-only; Actions cannot create/approve PRs. Production-secret jobs remain manual and main-only. Public visibility does not make outside contributors trusted writers. No secret value was inspected through settings or moved.

## Update, rollback and resume

Edit shared React/components/tokens and source-safe fixtures on the Stage 3 branch; build/test and inspect affected routes; commit and push. Pages runs automatically. Owner opens HTTPS directly in Chrome. Footer shows short source revision; version.json contains full SHA; workflow run/head SHA and Pages deployment identify release. A docs-only evidence commit does not redeploy; identify deployed SHA separately from branch head.

Reverse a broken preview by a normal source revert on this branch, then push. The new commit builds/deploys normally. Do not force-push, reset history or invoke production rollback. To re-run unchanged frontend through push, add/update a harmless `prototype/preview-rebuild.json` marker. No default-main workflow merge is needed; workflow_dispatch is intentionally absent because discovery requires default-branch presence. Do not repeatedly retry a partly completed deployment; inspect its run/Pages identity first.

In a new Work session, fetch branch head/PR13 and read AGENTS, approvals, design-system, fixture ledger, latest checkpoint and this runbook. Use retained source, not scratch/cloud-server persistence. Verify served version before further design review. No additional hosting account, credential renewal or preview setup is required after successful native activation.

Limitations: public review site has no access control; noindex is advisory. Forms/editorial publishing are browser-local simulation. Historical themes remain review-only. Step4 is approved and Step5A implementation awaits owner review; navigation comparison stays separate. CSS review frame is document reflow, not physical-device/touch testing. Media needs rights clearance. Stage 1 artifact expiry/mobile follow-ups are separate. No Stage 4 or production deployment authorization.

First native deployment succeeded: source 43af3ccb31a0f0fb4022b6544d9217b88700bfbc, Actions38503071511, deploy job 115654348980, Pages deployment ID 43af3ccb31a0f0fb4022b6544d9217b88700bfbc. Build/deploy/HTTPS verification all passed. Browser journeys and 320/390/768 document viewports checked against public HTTPS. A second push adds only “desain belum final” to the common development banner to prove updates; see checkpoint-04.md for final source/run.

## Earlier verified native release

Live: https://fairusinampratama.github.io/mpa-trs-web/ ; deployed source e312befbdc1723ca03ad7e9df774c811544039c7; native Actions38504204585 succeeded. First38503071511 and follow-up38503740121 also succeeded. Final correction prevents stale responsive iframe entries with a per-open query nonce; version at all review widths/UIlab matched final source. Exact evidence and source/run/artifact mapping: checkpoint-04.md and pages-final-artifact.json. When viewing an already-open main tab after a new deployment, reload it and confirm footer/source; metadata also available at version.json. No remaining preview activation/setup work. Public artifacts contain only static frontend; production remains unchanged.


## Current Step5A preview —14 October2026

Source **ec722f3a3b85ad977b5714a788b7c08f0dbe8c68**, successful [Pages38581615033](https://github.com/fairusinampratama/mpa-trs-web/actions/runs/38581615033) and [CI38581625431](https://github.com/fairusinampratama/mpa-trs-web/actions/runs/38581625431). Root/`#/` opens the new homepage; `#/review` separates developer/navigation controls; `#/legacy` retains historical designs. Footer/version.json identifies source. Supporting bodies await Step5B. Responsive harness offers320/390/768/1024/1366.

Artifact policy adds only2 SHA-256-approved WOFF2 builds; unknown binaries/photos/source maps stay rejected. All7 served files were byte-compared;12 boundary tests passed. Photography/emblem remain HOLD and absent publicly; private browser rendering is delivered as a private packet. No workflow/environment/production alteration. [Step5A evidence](../recovery/step-05a/deployment-and-verification.md) records methods and limitations. Docs-only evidence commits do not redeploy; branch head may differ from served source.


## Latest verified supporting journey — 15 October 2026

Step5B-1 source `72e90d75d234dc634fd43a513666b2c1f3b20bc6` serves the TE catalogue, rich TE11/sparse TE12 and connected article metadata experience. [Pages run38671019984](https://github.com/fairusinampratama/mpa-trs-web/actions/runs/38671019984) and source CI38671024594 succeeded. The active publishing method and workflow are unchanged. See ../recovery/step-05b1/deployment.md for exact HTTPS-byte, browser and responsive evidence. All photographic assets and article manuscript remain withheld; a private owner packet shows intended photo rendering. A documentation-only evidence head can follow the served SHA. Step5B-1 awaits owner acceptance; no later migration is authorized.

## Latest verified increment — Step5B-2,15 October2026

Step5B-1 is now owner-accepted. Step5B-2 source `162364b80d771fc5df5026ceb0727f62bc4a36f5` serves data-driven PD discovery/six records and independent BATAFIA/Kawi experiences. [Pages38675527214](https://github.com/fairusinampratama/mpa-trs-web/actions/runs/38675527214) and source CI38675532458 succeeded. [Current deployment evidence](../recovery/step-05b2/deployment.md) includes live browser checks and exact-byte integrity. Active native Pages method/workflow is unchanged; no HOLD media published. Documentation-only evidence heads do not redeploy. Step5B-2 awaits owner acceptance; later steps remain separately gated.
