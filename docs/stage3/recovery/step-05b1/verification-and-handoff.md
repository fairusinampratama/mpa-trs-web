# Verification, fidelity and handoff

## Local production-build evidence

- Locked dependencies installed with npm ci, Node24.19.0. TypeScript/Vite build passes.
- Existing12 public-artifact boundary tests pass, including HOLD media/private document/source-map/incorrect base/SHA and substituted-font rejection. Exact static allowlist validation passes:8 files, only2 approved fonts as non-code assets.
- Existing homepage runner:1366,1024,768,390,320 CSS viewports;18 existing routes and menu/Escape/focus/PD filtering/synthetic search/editorial simulation/UI-lab checks pass, with no observed runtime/console/request errors.
- New tools/browser_expedition.cjs:20 layout combinations (4 pages×5 widths), five complete homepage→catalogue→TE11→article→TE11 journeys, sparse TE12, direct reloads, native disclosure Enter/Space, chapter focus and visible focus, four responsive-harness destinations pass. No horizontal overflow, public photos or developer controls in those layouts.
- Private local same-App render: catalogue/TE11 at all5 widths,3 actual reviewed photo derivatives, native full-frame rendering and image-load failure handling checked. Leading failure retains textual context; optional failures omit plates. Photos and image-bearing results are not public evidence.
- Preserved59 deployment-foundation unit tests pass. No production workflow, application or release-script change was needed. These local mocked transport tests do not constitute a production hosting exercise.

## Fidelity and decisions

Step4 supplies the visual language and component responsibilities; it did not specify a final expedition-detail board. This is an extension of accepted Step5A, not a claim of pixel identity to a nonexistent approved TE11 design. Approved SourceSerif4/SourceSans3, warm paper, institutional green/blue,46/44px controls, containers,56/88 section rhythm and restrained separators are reused. The6-stage chronology is intentionally a dated ledger rather than an interchangeable card grid.

Desktop: programme feature shares the homepage's650:508 composition; long-form TE11 has a220px chapter rail plus reading column, serif20/31 text capped66ch. Tablet: rail becomes an in-flow two-column index. Mobile: edition identity/actions precede optional catalogue media; chapters become one column, serif18/28 reading and shared heading scale wrap without clipping. Article return appears near the introduction, with a contextual sidebar reflowing below the reading area. No sticky mobile overlay or fixed story heights.

Visual inspection corrected missing spacing after private photo plates, moved mobile catalogue metadata/action before fallback media, added an immediately available article return and made the related-works chapter focusable. Full photographic framing preserves the team/banner/flag and dense forest context; no text overlay or invented species label.

Expert visual/layout review and simulated CSS viewport checks only: no physical-device/touch, participant usability, full screen-reader or accessibility-compliance certification. Article's intentionally limited body and public lack of archival photos are substantial content constraints, not a technical inability to load images.

## Reproduce

From docs/stage3/prototype, set PREVIEW_BASE=/mpa-trs-web/ and VITE_SOURCE_COMMIT to the exact committed SHA; run npm ci, npm run build, python -m unittest discover -s tools -p 'test_*.py' -v, then python tools/verify_preview.py dist SHA. Browser runners require Playwright and a compatible Chromium via PLAYWRIGHT_MODULE and CHROMIUM_PATH; EVIDENCE_DIR places their outputs outside source. Both runners serve the built dist in-process on loopback. Existing Pages Actions performs its unchanged install/build/boundary/upload/deploy/live-version checks on relevant branch pushes.

## Remaining review / Step5B-2 handoff

Await owner acceptance of Step5B-1. No later page migration is authorized here. Photographs01/03/04 need specific rights/credit review and final intended-use approval;01 also needs recognizable-person/privacy basis. Article body, image and cultural-context review remains separate. Reconcile TE11 province/end-date against authoritative corrections before changing canonical facts. TE12 stays sparse until better evidence. Future PD migration should reuse the existing components without copying TE11's story length into sparse records. Keep the full publications catalogue and unrelated pages usable pending their own bounded migration.
