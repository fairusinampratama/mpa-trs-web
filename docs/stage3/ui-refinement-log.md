# Local UI refinement log

Started 18 October 2026 from `stage3/interactive-prototype` at `932887505db6ea5d1e4b9eecc485726d17dbf896`. This log records small owner-directed review slices after the verified Stage 3 Package E baseline. It does not authorize Stage 4, backend work, production changes, new media uses or PR #13 merge.

## Slice 01 — foundation and navigation shell

Status: implemented locally; awaiting owner visual review.

### Problems addressed

- A grouped navigation trigger did not expose that one of its child destinations was the current page.
- Grouped navigation needed a clear current-page state without decorative chevrons.
- The mobile menu panel and its current destination needed clearer structural separation.
- The text-only institutional identity in the header was visually weaker than the established editorial hierarchy.

### Bounded changes

- Parent navigation triggers now receive `aria-current="page"` when a child route is active.
- Grouped triggers retain native `aria-expanded` behavior without an added arrow or chevron.
- Active destinations use the existing primary/surface-muted tokens, with no new palette or layout language.
- The mobile panel gains an existing-token divider and larger top-level hit areas.
- The wordmark uses the owner-supplied Tursina logo with readable organization text; the desktop header is reduced from 88px to 80px.
- Desktop navigation starts at 1080px, avoiding an unnecessarily sparse menu-only header at the 1161px review viewport.
- Desktop dropdowns use a restrained surface shadow and primary top rule; links, labels, routes and navigation architecture are unchanged.

### Verification

- TypeScript and Vite production build: pass.
- Windows Chrome desktop render at 1366×900: pass.
- Grouped current-page state on `#/program/te`: pass.
- Approved media, captions, alt text, credits, content records and route destinations: unchanged.

### Review gate

Review the homepage header and at least one grouped child route on desktop and mobile. Accept, revise or revert this slice before beginning homepage hero refinement.

## Slice 02 — homepage composition

Status: implemented locally from owner browser comments; awaiting visual review.

### Evaluation

The issue was repeated across the homepage rather than isolated to one section: heading, equal grid, thin rule and automatic arrow patterns made the content feel rigid despite a sound information sequence. The redesign therefore changes composition and rhythm while retaining the approved sequence, records and media.

### Bounded changes

- The header menu now has a labelled two-line icon that becomes a close mark when expanded.
- The owner subsequently supplied the Tursina logo directly for header use; that exact PNG is used with no redraw or alteration.
- `TextLink` no longer appends an arrow automatically across the implementation. Direction symbols remain only where they communicate a specific interaction, including in-page movement and photograph enlargement.
- The hero uses a wider documentary image and narrower editorial text column. The brown left identity rule was removed after owner review.
- Programme discovery becomes a separate surface band with one clear focal programme and two supporting choices.
- TE11 becomes one integrated image-and-reading feature rather than a detached heading followed by another generic grid.
- The education band keeps the approved paired photographs but adds stagger, framed media treatment and compact field labels.
- Activities remain a factual ledger; publications become distinct reading cards; history retains its quieter closing role.

### Verification

- TypeScript and Vite production build: pass.
- All 27 committed Python boundary/model checks under the CI Node runtime: pass.
- Windows Chrome 1161×884 and 390×844 rendered screenshots captured for comparison.
- Homepage composition classes, labelled menu icon and removal of automatic arrows: pass in rendered DOM.
- Representative TE, activities, publications and about routes: render pass.
- Approved image response: `200 image/webp`; source media, crops, captions, alt text and credit unchanged.

### Review gate

Review the complete homepage flow, not only its first screen. Decide whether the new editorial rhythm is accepted, needs a targeted adjustment, or should be reverted before supporting-page restyling begins.

## Pages release repair — 20 October 2026

Owner requested repair and cloud-browser verification after the two local-refinement commits. The builds succeeded, but Pages runs 39142729880 and 39345117530 rejected the newly supplied header PNG as an unexpected public artifact; nothing was uploaded or deployed.

The artifact validator now accepts only the `assets/tursina-logo-<build hash>.png` naming pattern with the exact supplied PNG signature, 669449-byte length and SHA-256 `c6a56d43ea40d0372ad0128752a132d489383b0fa734c6722ab52acc060e6eca`. No general image allowance, photography permission, workflow or application design changes. Tests accept the exact logo and reject a byte-substituted logo and an unlisted PNG even containing the same bytes.

Validation before publication: locked dependency install, all 33 Python contract/policy/boundary tests, Tailwind-only policy, TypeScript/Vite build and the real 26-file compiled artifact passed. The existing local Chromium executable crashed at startup (SIGSEGV) for the homepage and enlargement browser suites; those suites did not run, and no passing result is claimed. Hosted cloud Chrome verification follows the successful Pages deployment. Vite retains its existing bundle-size advisory; the unchanged logo is approximately 669 kB.
