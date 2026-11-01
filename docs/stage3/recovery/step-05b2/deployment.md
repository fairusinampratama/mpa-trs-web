# Step 5B-2 — deployed implementation and review evidence

15 October 2026. Delivered for owner review, not accepted automatically. Scope: PD and independent activities only.

## Verified identity

- Public homepage: https://fairusinampratama.github.io/mpa-trs-web/
- PD: https://fairusinampratama.github.io/mpa-trs-web/#/program/pd
- Activities: https://fairusinampratama.github.io/mpa-trs-web/#/activities
- Served source: `162364b80d771fc5df5026ceb0727f62bc4a36f5`.
- Source tree: `9f1bb4abf5ba478c5fbe9d92ac6f0a61fc7daa27`.
- [Pages run38675527214](https://github.com/fairusinampratama/mpa-trs-web/actions/runs/38675527214): build, deploy and HTTPS verification succeeded. Job IDs116228129786 /116228205882 /116228261514.
- [Source CI38675532458](https://github.com/fairusinampratama/mpa-trs-web/actions/runs/38675532458): succeeded.
- [Draft PR13](https://github.com/fairusinampratama/mpa-trs-web/pull/13) remains unmerged. Main baseline `ed13b2197d7908e93776cf66dce7eeb8b4b2df1f` is unchanged.

Evidence-only documentation commits follow this source. They do not match the Pages workflow path trigger, so branch head and served source intentionally differ. No workflow, dependency, static allowlist or hosting changes.

## Implemented journeys

Programme explanation → five fields → division/cohort facets → six PD records. GH XXIX and RC XXIX carry richer documentary/source material; GH XXVI, ORAD, LH and Caving remain sparse. All use one record-driven renderer. Filter state lives in the hash query and survives detail, refresh and return. Empty combinations, reset and a keyboard-accessible results jump are supported.

General activities → independent BATAFIA/Kawi → catalogue return. Their records have no fabricated programme parent. The pre-existing workshop remains explicitly synthetic. Source-backed dates and uncertainty are retained; GH XXVI's previously month-only date is refined from the original LPJ to19–26 August2023. GH XXIX regency and BATAFIA forum-date ambiguity remain visible. Historical learning targets are not represented as verified mastery or current safety instruction.

## Evidence and limitations

- npm ci, TypeScript/Vite build passed.13 prototype Python checks pass, including a wrapper for6 Node data-contract tests.59 unchanged deployment-foundation checks pass; these mocked transport checks are not a production deployment exercise.
- Actual local Chromium:55 page/viewport combinations at1366/1024/768/390/320; five field facets, cohort intersections, empty/reset, keyboard focus, direct refresh and filtered return passed. Existing18-route/homepage interaction and20-layout expedition suites passed.
- Three test-only input records exercise a new PD cohort, a PD without a cohort and a fully sparse independent record. The same App, catalogues, filters and generic detail route render them without record-specific JSX. They are absent from the compiled public bundle. See [data-only proof](evidence/data-only-proof.json) and [sparse fixture screenshot](evidence/data-only-independent.jpg).
- Fresh accepted-parent and implementation homepage/TE11 first-screen screenshots are pixel-identical at all five widths. See [baseline comparison](evidence/baseline-comparison.json).
- Live cloud browser:35 responsive-frame layouts across7 scoped pages;21 routes opened and refreshed. All five live division filters, combined empty/reset, GH filtered return, BATAFIA/Kawi journey and mobile menu/Escape/keyboard actions worked. No site console/runtime errors observed. [Interactions](evidence/live-interactions.json), [routes](evidence/live-routes.json), [viewports](evidence/live-viewports.json).
- Harness frames requested1366/1024/768/390/320; their client widths exclude a15px scrollbar. Local headless browser checks use the exact requested CSS viewport widths. Neither method is physical-device/touch testing; no participant study, full screen-reader test or accessibility certification is claimed.
- All7 HTTP-served files match the exact local source build byte-for-byte with TLS validation;8 allowlisted artifact files include .nojekyll. No source maps, HOLD originals, private review packets, real member records or private institutional reports are in dist. [Integrity](evidence/live-integrity.json).
- Private same-App rendering used reviewed assets07/10/13/16 on4 activity pages at5 widths:20 layouts passed. Failed leading media retains compact documentary context; failed sparse optional media is omitted. The two failure simulations intentionally abort image requests. A10-page private owner packet with embedded review-source/screenshot ZIP is retained separately. No private image-bearing packet or source locator is committed here.

Public photographic assets remain withheld. The private packet shows intended photographic rendering, not the public website's current assets. Creator ownership/licence/credit, relevant participant/privacy basis and final exact asset/use approval remain required. Institutional decision-making authority is settled.

## Inspectable public-safe screenshots

- [PD desktop](evidence/pd-desktop.jpg)
- [GH XXIX desktop](evidence/gh29-desktop.jpg)
- [RC XXIX mobile](evidence/rc29-mobile.jpg)
- [Sparse LH narrow mobile](evidence/lh29-narrow.jpg)
- [Independent catalogue mobile](evidence/activities-mobile.jpg)

Local scoped results: [local-browser.json](evidence/local-browser.json). Component/data responsibilities and source locators at publication-safe granularity are recorded in [source-and-data-findings.md](source-and-data-findings.md).

## Review / next checkpoint

Evaluate programme/field discovery, filtering and return context; rich/sparse usefulness; independent identity; shared visual coherence; and the data-only addition proof. Candidate data-contract findings distinguish programme, field, cohort, activity, source, work, media and editorial/clearance states; no final database schema is imposed.

No Step5B-3,5C,6 or Stage4 work. Production application, workflows/scripts, Rumahweb, SLiMS, E-Letter, DNS/databases/secrets and main remain untouched. Normal source revert on this branch followed by the existing Pages build/deploy/HTTPS checks reverses a broken preview; no force-push or production involvement. Stop for owner Step5B-2 acceptance.
