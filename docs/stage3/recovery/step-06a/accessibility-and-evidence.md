# Responsive, interaction and accessibility evidence

Bounded expert audit informed by [WCAG2.2](https://www.w3.org/TR/WCAG22/), [W3C reflow guidance](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html) and [target-size guidance](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html). These inform checks, not a conformance claim. Large controls are useful; small inline text is not automatically a target-size failure, and a small font is not by itself a WCAG failure.

## Observed in the actual deployed browser

| Check | Actual evidence / result | Boundary |
|---|---|---|
| Reflow |45 settled page/width observations: home, TE, TE11, PD, RC, works, About, Jejak, members at1366/1024/768/390/320; scrollWidth equals clientWidth | Existing iframe has15px vertical scrollbar; e.g.390 frame leaves375px content. No1440 native resizing.1363x936 top-level desktop is comparable. Does not certify every zoom/text-spacing case. |
| Institutional mobile opening |390 actions end atabout463/517px;320 at496/550px; name/purpose/affiliation precede image | Frame height844; physical phone/browser chrome differs. No timed participant comprehension test. |
| Keyboard skip | OnTE11, Enter on Langsung ke isi website retains expedition route, focuses MAIN#public-content and scrolls to content | Actual browser focus readback; not screen-reader output. |
| Focus | Keyboard Tab from Kegiatan reaches Karya & Pengetahuan with3px blue outline and2px offset | Visible screenshot/DOM evidence; not every state/forced-color combination tested. |
| Menus | Desktop Kegiatan and mobile Menu open; Escape closes, native semantics reflect expanded false | No hover-only dependency. Touch device/emulation not available. |
| PD controls | Visible labels + Filter divisi/Filter angkatan accessible names;48px-high native selects. GH+XXIX result, Caving+XXVIII empty, Enter reset restores18 | Existing shortcut avoids forced traversal through field descriptions. Status role was inspected; actual announcement by AT not tested. |
| Member controls | DEMO.001 returns1, nonexistent query returns0, reset works; synthetic disclosure remains | Only synthetic NIA/name. No real personal data. |
| Reading and headings | Literal h1s, section/subsection headings and independent article/work title retained; SourceSans3/SourceSerif4 loaded | No full semantic audit of every legacy review/lab demonstration; no AT certification. |
| Contrast | Computed actual ink rgb(32,53,44), paper rgb(246,244,238), captions rgb(83,99,88). Matches approved calculated pairs ink/page11.88:1 and muted/page5.80:1; white/green9.98:1 | Specimen sRGB contrast, not a scan of every pixel/photograph. Homepage copy is separate from images; gold is decorative. |
| Photographs | Actual loaded approved images; context/alt/captions/exact HUMED credit; native framing preserves map/ground team | Earlier in-scroll blank images resolved after loading; not counted as failures. No photo editing/crop/permission change. |
| Disclosures | Native source summaries are present and keep original availability/uncertainty separate | Source inspected; a targeted Enter open/close check accompanies final evidence. Not every possible disclosure/state was exhaustively audited. |
| Footers | Generic Kegiatan href#/program/te; actual activation opens Tursina Explore | Confirmed UX-06 label/destination issue, not a blocked route. |

## Untested / not established

- Native200% zoom: attempted browser shortcut did not change viewport or DPR; no successful zoom test claimed.
- Text enlargement/spacing override, forced colors/high contrast, screen-reader output and physical/touch behavior: no supported test control/session used. Keep as explicit Step6B verification requirements, not assumed passes or confirmed failures.
- Reduced motion: existing source contains a reduce media rule disabling nonessential transitions/smooth scrolling. Source inspection only in this audit, not successful preference emulation.
- No measured CoreWebVitals, real-user speed, conversion, task-time/preference or formal five-second study.
- No automated accessibility certification. No confirmed P0/major a11y journey failure found in checked scope; this does not certify absence of other defects.

## Capture integrity

Private packet includes actual1363x936 desktop viewport captures, complete desktop homepage andTE11 captures, mobile first screens and a complete390 homepage reconstructed from overlapping viewport captures. Native fullPage/clip calls timed out for some other pages; those have actual viewport evidence and whole-document text/geometry observations, not invented full images. Screenshot bridge outputs1348x926px for1363x936CSS viewport; mobile extraction normalizes that scale using recorded frame bounds. Original screenshots/offsets are retained so the reconstruction is auditable. Scrollbar seams are screenshot artifacts, not duplicate website content.

Initial fast-loop route samples contained stale h1s; they are excluded from settled-responsive.json. Likewise an early nonoverlapping mobile sequence was excluded in favor of the complete overlapping sequence. Only final selected evidence is delivered; these capture issues are not product defects.
