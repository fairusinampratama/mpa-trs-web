# PackageE verified release

**Final application:1761fc492dffaad56c215d64c405083f6bbe0cb8**. Native Pages [38864731009](https://github.com/fairusinampratama/mpa-trs-web/actions/runs/38864731009) build/deploy/verify **success**. CI [38864737034](https://github.com/fairusinampratama/mpa-trs-web/actions/runs/38864737034) **success on first attempt**, including foundation and both PHP jobs. Existing workflows are unchanged.

Preview:https://fairusinampratama.github.io/mpa-trs-web/#/ . The first PackageE application39af7f5ec3464ceb017cb15e92eddb09b74b2a78 was superseded by the rapid-reopen fix1761fc4. Its initial foundation CI cleanup error (`Directory not empty: .git` in TemporaryDirectory teardown) passed an unchanged failed-job-only rerun. It was not hidden or fixed by weakening tests. The final source passes CI independently.

## Independent release identity and boundaries

A local exact-source build passes TypeScript/Vite and strict25-file artifact verification. All24intended HTTP content files byte-match the final build, including17existing WebPs and both existing font files; see evidence/package-e-served.json. `.nojekyll` remains a build-control marker, not served content. Canonical manifest remains **6assets /11contextual uses /17derivatives**. No image bytes, framing, captions, credit, source records or media publication rules were altered. No dependency or workflow change.

## Actual hosted browser

Cloud Chrome observes footer1761fc4. On the top-level1363×936 desktop, GH/RC dialogs load full frames with existing480/640 derivatives, alt text, original captions and exact HUMED credit. Escape/close restores the original control and page position. The rapid-reopen sequence stays open after the state-ownership correction.

The existing responsive-review harness tests both images at1366/1024/768/390/320 frame widths: **10settled cases**, all source1761fc4, loaded photographs, exact original scrollTop, stable body content width and invoking focus restoration. Public-safe measurements are in evidence/package-e-hosted.json. The classic scrollbar means frame390 has375content pixels and frame320 has305; local native viewport tests independently cover exact390/320content widths. On modal open, rootclientWidth may include the hidden scrollbar's reserved gutter, while actual body/layout width remains unchanged. This was verified rather than misreported as a layout shift. Early desktop readbacks sampled normal on-demand loading; those are retained separately, followed by settled complete=true observations. No failed download was inferred from an initial loading state.

Local browser proof covers both controls at five exact widths, full-frame aspect, appropriate existing responsive derivatives, no enlarged image while closed, initial close focus, Tab/Shift+Tab containment, Escape, close button, rapid reopen, original scroll, blocked background wheel scroll, failed-image credit/close behavior, forced colors, reduced motion and text-spacing reflow. The data-only integration fixture withdraws GH's homepage use: GH viewer disappears and separately approvedRC remains. Activity details, TE andUIlab receive no viewer. All accepted homepage/TE/PD/activity/publication/history/member/photo/refinement regressions and27Python gates pass;59mocked foundation tests pass.

No physical-device/touch, actual screen-reader, native200% browser zoom or exhaustive WCAG conformance claim. These remain evaluation limitations, not additional publication approval requirements.

## Review / preservation

Before/after screenshots compare accepted A–D sourcebd5caca against the final PackageE source; live screenshots and a zoomable browser-evidence gallery are privately accessible to the owner and remain outside Git/Pages. The exact shared credit is **Foto: Dokumentasi HUMED MAPALA Tursina**.

Draft PR13 description includes approved PackageE; draft/unmerged status preserved. Main, production Laravel, Stage1workflows, Rumahweb, SLiMS/E-Letter, DNS, secrets and databases are untouched. Normal source revert and existing Pages redeployment can remove PackageE while retaining decision/evidence documents; no force-push or production action is needed.

PackageE is ready for owner implementation/final Stage3 acceptance. No Stage4, production deployment or merge proceeds automatically. No viewing-treatment decision remains pending.
