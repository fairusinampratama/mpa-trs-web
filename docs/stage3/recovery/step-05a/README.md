# Recovery Step 5A — implemented homepage foundation

14 October 2026. Owner approved Step 4 as the baseline and authorized Step 5A only. Result awaits browser review; Step 5B/5C/6 and Stage 4 backend remain unauthorized. Approved A sequence with documentary education is preserved.

## Source and public preview

React19/TypeScript/Vite/Tailwind4 remain under `docs/stage3/prototype/`. The public root and `#/` now render the new homepage. `#/review` separates development controls from the same homepage; `#/legacy` retains historical experiments. Supporting page bodies remain the prior working content/routes within the institutional shell and await Step 5B. Native Pages/workflow and production remain unchanged. PR13 stays draft/unmerged.

- `App`: hash routing and optional media context, public entry provides no media.
- `InstitutionalShell`: header, shared grouped/direct navigation, accessible in-flow mobile disclosure, footer and separate review shell.
- `Homepage`: seven deliberate sections; no page-builder engine.
- `Foundation`: programme entry, dated activity preview/metadata, publication entry, contextual documentary media/caption, section title and action link.
- Existing Button: approved shared states via foundation CSS; UI laboratory demonstrates new patterns from the same sources.
- `theme.css` imports legacy authored layouts plus approved `foundation.css`; historical direction overrides stay inside supporting body wrappers. The new public shell/home are unaffected by old theme selectors.

Typography uses the exact verified self-hosted Source Sans3 v3.052 and Source Serif4 v4.004 Latin WOFF2 builds (79,808 bytes total), with adjacent OFL notices. Semantic colors/type/spacing and focus/motion rules derive from Step4. No remote fonts, generated stock imagery or official-hex claim.

## Media boundary and private comparison

Latest Step2 permission register still places photographs01/07/10/13/14 and recovered emblem on HOLD. Public build contains no photograph or emblem. Contextual text-first media fallbacks occupy useful, intrinsic space; they do not pretend to be photographs or reserve enormous empty boxes. Canonical photo ratios/captions/alt/load priority remain implemented in DocumentaryMedia.

A separate private local entry outside the repository uses the same App/components with the five actual reviewed derivatives and unchanged emblem. Its browser screenshots support a private side-by-side review with the Step4 PDF. The local server is transient and is not an owner-facing hosted private preview. Owner delivery is the privately inspectable comparison packet; no new hosting or public media publication is authorized. Private source/artifacts/locators remain outside GitHub.

## Verification and repeatable commands

Node24.19.0; `npm ci`, TypeScript/Vite build and12 boundary tests. Static validator adds only exact SHA-256 approved fonts, rejects substituted fonts/JPEGs/source maps/symlinks/private patterns. Neither the Pages workflow nor production allowlists were weakened.

```bash
cd docs/stage3/prototype
npm ci
PREVIEW_BASE=/mpa-trs-web/ VITE_SOURCE_COMMIT=<exact-source-sha> npm run build
python3 -m unittest discover -s tools -p 'test_*.py' -v
python3 tools/verify_preview.py dist <exact-source-sha>
```

Optional browser runner `tools/browser_homepage.cjs` uses an externally installed Playwright package via PLAYWRIGHT_MODULE and optional CHROMIUM_PATH. Browser tooling is not added to the app lock or public bundle. EVIDENCE_DIR must stay outside this public repository when containing private screenshots. With no SITE_URL it serves built dist within the same process; with SITE_URL it tests actual HTTPS. Normal Playwright install: install `playwright` into a temporary tool directory, install its Chromium, set PLAYWRIGHT_MODULE to that module directory, then run the script. This session used the installed runtime Playwright-core and a registry-delivered Chromium153 binary after the standard browser download failed.

Browser coverage:1366/1024/768/390/320,18 canonical routes, menu keyboard/Escape/focus return/close on navigation, publication→TE11/reload, PD filter, synthetic member query, local organizer→editor→publisher→preview, UI-lab disabled/busy, skip link, reduced motion and responsive frame. These are CSS viewport tests with a real browser engine, not physical-device/touch or participant usability testing. No full accessibility certification; screen-reader and actual browser200% zoom remain follow-ups.

[Visual fidelity and decisions](fidelity-and-handoff.md) records deliberate differences and remaining Step5B work. Deployment identity and verified evidence are appended after actual Pages execution, not inferred from a build.

Local browser record: [results](evidence/local-browser-results.json), [desktop](evidence/public-homepage-1366.png), [390px](evidence/public-homepage-390.png). Screenshots contain only public-safe fallbacks. Private image-bearing comparison is delivered separately. All59 existing foundation Python tests also passed.
