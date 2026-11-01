# Step 5A deployment and verification — 14 October 2026

Public homepage: https://fairusinampratama.github.io/mpa-trs-web/ . Verified source **ec722f3a3b85ad977b5714a788b7c08f0dbe8c68**. [Pages38581615033](https://github.com/fairusinampratama/mpa-trs-web/actions/runs/38581615033) succeeded: build115912686254, deploy115912916902, verify115913202690. [CI38581625431](https://github.com/fairusinampratama/mpa-trs-web/actions/runs/38581625431) succeeded: deployment foundation and Laravel PHP8.2/8.3. Initial implementation1f4f571 also deployed successfully via38580654370. These are preview releases, not production Laravel deployments.

## Actual evidence

- TypeScript/Vite builds,12 boundary tests,59 existing foundation Python tests and exact-commit source-root validation passed. Workflow/application/deployment-script blobs are unchanged.
- [Local built-browser checks](evidence/local-browser-results-final.json): actual Chromium153 at1366/1024/768/390/320; no overflow, fonts loaded, no public photos/development controls;18 routes. Menu keyboard/Escape/focus, default/hover/active/focus, PD filter, publication return/reload, synthetic search, local editorial sequence, lab disabled/busy, skip link, reduced motion and responsive harness passed.
- [Live cloud frames](evidence/cloud-live-viewports.json): selected320/390/768/1024/1366 widths; desktop scrollbar leaves305/375/753/1009/1351px content. Scroll width equals client width throughout; sourceec722f3 in all frames. Real CSS reflow, not physical touch or a five-second participant test.
- [Live18 routes](evidence/cloud-live-routes.json) render from current source. Live interactions additionally checked: mobile nested menu/Escape/focus return; GH+XXIX filter; publication→TE11/refresh; DEMO.001 query returns one synthetic record; organizer→editor→publisher→preview remains local; UI-lab disabled/busy works.
- [HTTPS byte comparison](evidence/live-integrity.json): all7 served HTML/JS/CSS/font/version files return200 and match local exact-source build. No photo/original/report/source map/credential payload. `.nojekyll` is artifact configuration, not an HTTP entry; its404 is not an application-route failure.
- [Actual deployed screenshot](evidence/deployed-homepage.jpg) is public-safe. Private actual-photo implementation/Step4 comparison remains outside GitHub, in a13-page owner review packet with private entry/derivatives attached. All5 photography roles and recovered emblem remain HOLD.

Headless HTTPS encountered the environment proxy certificate trust error; no TLS bypass was used. Live UI tests used the cloud browser, byte checks a TLS-verifying HTTP client. Sampled cloud logs contained browser-extension metadata errors, no observed website-origin error; local console/runtime/asset-failure checks were clean. Screen-reader, physical-device/touch and actual browser200% zoom remain unverified. No full accessibility certification.

An already-open SPA retained1f4f571 until reload; refreshed root/deep-link source becameec722f3. Reload and check footer/version.json before version-specific feedback; hash navigation alone does not update loaded JavaScript.

## Isolation and review boundary

No production application/workflow/script, Rumahweb, SLiMS/E-Letter, DNS/database or secret change. PR13 stays draft/unmerged. Normal branch/path source updates publish automatically; reverse a broken preview with a normal source revert/push, never force-push or invoke production rollback. Docs-only evidence commits do not deploy: branch head can differ from this served source.

Owner reviews Step5A fidelity/refinements now. Step5B supporting-page migration,5C integration,6 user evaluation and Stage4 backend require separate instructions. Photographer/licence/credit, subject/privacy basis, exact permitted use/crop and canonical emblem remain separate clearance decisions; institutional authority is settled.
