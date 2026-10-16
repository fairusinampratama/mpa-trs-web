# Stage 3 checkpoint 05 — archive-driven content and identity

Date: 14 October 2026  
Status: safe text/layout increment deployed and browser-reviewed; no final direction or photograph approved

## Implemented

- Preserved the approved routes, record relationships, navigation A/B and editorial simulation.
- Replaced the representative PD comparison with documented PD XXIX Gunung Hutan, Rock Climbing, ORAD, Lingkungan Hidup and Caving records.
- Expanded TE11 with a report-backed journey sequence, field milestone, output limitation and explicit province conflict.
- Added bounded real records for TE12, Kawi XXIX and BATAFIA XXX without inventing missing outcomes.
- Built two distinct treatments over the same information architecture:
  - **Jurnal Ekspedisi** — long-form documentary chronology, large captioned media positions and serif reading rhythm.
  - **Atlas Tursina** — indexed institutional dossier, compact fact density, source state and sans grid rhythm.
- Applied both treatments to Beranda, TE11 and the PD catalogue/detail family. Rights-held photographs are represented by labelled composition plates, never embedded originals.

## Source and photography work

Priority collections were enumerated and sampled from authenticated originals: TE11 (24 of 160 photographs), PD XXIX Gunung Hutan (18 of 27), PD XXIX Rock Climbing (20 of 108), Kawi XXIX departure/welcoming (24 samples) and BATAFIA XXX field activity (20 of 100). Every candidate was visually inspected; filenames alone were not used to identify content.

Private contact sheets and the exact source/credit/permission ledger are delivered outside the public repository. The recommended minimal clearance set contains five compositions: TE11 Puncak Kakam group, TE11 pitcher-plant field evidence, PD Gunung Hutan map/compass practice, PD Rock Climbing action/belay scale and BATAFIA rain/mist field movement. All remain `HOLD` until the owner resolves publication authority and known credit.

## Public boundary

No archive original, private contact sheet, exact private media locator, real Buku Induk record, participant roster or personal/medical/financial detail is in GitHub or the Pages bundle. Public copy is paraphrased and deliberately retains source conflicts. Access to Drive is not treated as permission to publish.

## Verification record

- `npm run build`: passed locally with TypeScript and Vite production build.
- Eight static prototype boundary tests: passed locally.
- Initial archive increment: `12d827e3f1627d0f23af4cff23648564a109493d`, Pages run `38525666836`, successful. Browser readback showed version `12d827e`.
- Both directions reviewed on Beranda, TE11 and PD XXIX RC detail at desktop 1363px. Navigation B menu, PD filter and canonical detail journey worked.
- CSS document viewport harness measured 320/390/768px frames (305/375/753px content width after scrollbar), with equal client/scroll width for both directions on Beranda, TE11, PD browse and RC detail. This is not physical-device/touch testing.
- Console errors observed were browser-extension metadata messages, not application-origin errors.
- General CI initially failed in a temporary-directory teardown (`Directory not empty: objects`); the same job passed on targeted attempt 2. No production validator/test/workflow was modified.
- Browser screenshots are retained as checkpoint evidence. A bounded follow-up reduces the Atlas heading scale and restores TE11 related-publication links in the dossier treatment.
- Follow-up source `91dd575f5cd1185e8fe3324fe9fd8903d3df6597`: Pages run `38527163563` and CI run `38527167680` succeeded. Browser showed `91dd575`; related-publication → canonical TE11 return, refresh, UI-lab component tab and organizer/editor/publisher simulation were verified on that release. Keyboard Tab reached the navigation selector with a visible solid focus outline.
- `tools/verify_live_preview.py 91dd575f5cd1185e8fe3324fe9fd8903d3df6597` independently verified HTTPS entries, JavaScript/CSS assets and exact version metadata. Browser JSON navigation was blocked by the browser client; the independent HTTP readback succeeded.
- Screenshot evidence: `evidence/archive-home-journal.jpg`, `archive-home-atlas-final.jpg`, `archive-te11-journal.jpg`, `archive-te11-atlas.jpg`, `archive-pd-journal.jpg`, `archive-pd-atlas.jpg`, `archive-responsive-320.jpg`. Initial screenshots show `12d827e`; the refined Atlas screenshot shows `91dd575`.

## Owner decisions requested

1. Choose which of the five shortlisted photograph compositions may proceed to credit/consent clearance; approval of a layout is not approval of an image.
2. Supply known photographer/creator credits or designate an institutional authority able to confirm them.
3. Compare Jurnal Ekspedisi and Atlas Tursina on Beranda, TE11 and PD; a final direction is not selected by this checkpoint.

Production Laravel/Rumahweb, SLiMS, E-Letter, DNS, databases and Stage 1 workflows are unchanged. PR #13 remains unmerged.
