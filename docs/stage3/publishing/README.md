# Stage 3 public preview — prepared, NOT authorized or deployed

Recommended Option B: retain `fairusinampratama/mpa-trs-web` private; create public, artifact-only `fairusinampratama/mpa-trs-preview`, initialized with a harmless README/main. No open-source license or custom domain. Configure Pages to **Deploy from a branch → main → /(root)**. Do not serve the existing source repo's `/docs`: it includes infrastructure and provenance documents.

Expected project-site address (not verified/live yet): `https://fairusinampratama.github.io/mpa-trs-preview/`. UI lab is `#/ui-lab`; TE11 is `#/expedition/te11`; responsive review is `responsive-review.html`. All source page links use hashes. Clean `/ui-lab` URLs are not supported on static Pages; no broad 404 fallback needed. Both HTML entries are explicitly built. Review iframe and desktop link stay under the project base. Original internal `/ui-lab` compatibility remains local only.

## Prepared implementation

Source branch `stage3/interactive-prototype`; build root `docs/stage3/prototype/`. Inert workflow `stage3-preview.yml.example` is reviewed here; ONLY AFTER APPROVAL install it as `.github/workflows/stage3-preview.yml`. Existing Stage 1 workflow files remain byte-identical.

Build job: read-only contents token, credential-free locked npm ci, Node24, TypeScript/Vite/Tailwind build, seven boundary tests, static allowlist validation. Vite base `/mpa-trs-preview/`; publicDir disabled; no sourcemaps; only index/responsive HTML, generated JS/CSS, version.json and .nojekyll. Only this dist directory crosses repositories. Future media requires an explicit rights review and allowlist change, not arbitrary public/ copying.

Publish job depends on successful build and downloads only its own run's named artifact. No npm/dependency scripts execute with publishing credential. It validates output again, creates a complete compiled snapshot in the dedicated public repository using Git blobs/tree/commit and a non-force ref update, and retains prior artifact commits. It cannot target the source repository. The credential has **Contents read/write on mpa-trs-preview only**, metadata read as required, no workflows/administration/source/production scope. Repository secret name in the PRIVATE source repo: `STAGE3_PREVIEW_PUBLISH_TOKEN`. User creates/provisions it securely, never in chat/source/logs. Prefer a short expiry and record renewal date. Existing production credentials are never copied or passed to these jobs.

Preview activation also requires source variable `STAGE3_PAGES_ENABLED=true`. This is a disable switch, not a security-enforced human approval gate: trusted source writers can change workflow code. Push trigger is limited to the Stage 3 branch and prototype/workflow paths. No fork PR publishing, no production events, no workflow_run. No workflow_dispatch dependence: manual dispatch requires a default-branch workflow, and a main merge is not authorized. Initial approved installation push runs the job; later prototype changes publish automatically.

A successful publish API operation proves an artifact commit only. The subsequent HTTP step waits for exact source version and HTML/asset delivery; timeout/failed build fails the workflow. Independently inspect the PUBLIC repo's Pages build result and browser journeys before recording release completion. No live release has occurred yet.

## Approval requested

Create the named public artifact repository; enable its branch Pages; securely provision the narrowly scoped preview credential; activate this workflow and variable on the existing Stage 3 branch; publish the current reviewed text/metadata and synthetic fixtures plus both directions/navigation choices/UI-lab/editorial simulation; permit subsequent approved Stage 3 UI iterations to auto-update. Public JS exposes all embedded fixture content, even routes a visitor has not opened. No raw institutional document, rights-unresolved media, real members, infrastructure docs or source maps included. No additional licensing grant.

No change to existing repository visibility, main, PR merges, production safeguards, Rumahweb, DNS, paid services or Stage 4. This request follows the owner's attached §8 instruction requiring approval before a new public repository or external publication.

## Continuing workflow after activation

1. Resume by fetching current Stage 3 branch/PR13; read AGENTS, checkpoints, design system, fixture ledger and this runbook. Do not treat local scratch or cloud server as durable hosting.
2. Make central token/component changes, run build/boundary checks and inspect affected routes in browser. Commit/push to Stage 3 branch.
3. GitHub builds and pushes only checked dist bytes to the public artifact repo. Public Pages deploys main/root. Inspect source workflow and target Pages result; don't equate one green push with delivery.
4. Owner opens actual HTTPS URL in Chrome. Banner shows short source SHA; `version.json` shows exact full source SHA. Target Git commit message and private Actions run also record source SHA. Record public Pages deployment commit separately.
5. Roll back preview by reverting the broken frontend commit on the source branch, then push; build produces a NEW source SHA and artifact commit. No reset/force-push or production rollback. For republishing unchanged content, a small `preview-rebuild.json` marker under prototype can trigger push; no manual upload routine.
6. If artifact push succeeded but HTTPS check fails, inspect target Pages run and source version before retrying. Old site may still be serving. Do not call the failed release successful, switch providers or repeatedly dispatch blindly.
7. Turn source variable off to pause updates. Unpublishing or deleting publicly exposed history requires separate approval; public copies/forks may persist.

Limitations: public preview has no authentication; noindex is advisory, not access control. Forms are local simulation with no server persistence. Theme/navigation selections reset on reload; no final direction approved. Responsive harness checks document reflow, not device touch emulation. Private Free Actions minutes/credential expiry/Pages build propagation apply. Production artifact expiry/mobile follow-ups remain separate.
