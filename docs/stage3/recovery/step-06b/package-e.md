# Package E — approved homepage photograph enlargement

## Owner decision /16 October2026

Owner accepted the deployed Packages A–D as the implementation baseline and explicitly approved private Alternative A: optional native-dialog enlargement of the existing GH navigation and RC teamwork photographs **only from the homepage field-education section**. Reuse existing approved WebPs; preserve full framing, alt, caption and exact `Foto: Dokumentasi HUMED MAPALA Tursina` credit. No activity-detail viewer, additional image/context, derivative or crop is authorized. This closes the earlier UX04 viewing decision; implementation acceptance remains for owner review. No new copyright investigation or institutional representative required.

Application baseline:bd5caca0650cbbba9bdd87970e62f0743b0b9d6c; documentation head:c6d19b3f955bf62d3e11bd6c5f0772e2a5806c21. Existing six assets/eleven uses/seventeen derivatives, public artifact rules and approved visual system remain unchanged.

## Implementation

- `Homepage.tsx`: opt in only on GH andRC field-band instances. Paired photograph widths, ratios and source captions remain intact; labelled44px-minimum enlargement controls follow captions.
- `Foundation.tsx`: small native `<dialog>` viewer; no dependency added. Both images first pass canonical record/placement/role resolution. Dialog contents and responsive image mount only after activation; closing removes them. Native `showModal()` makes the background inert. Close initially focused; Tab/Shift+Tab stays on the sole interactive control (browser modifier shortcuts not intercepted); Escape and close control restore invoking focus without scrolling.
- `domain/media.ts`: narrowly defined viewing-treatment guard checks exact asset/use/record/placement/role tuples (`pd-gh-home-education` and `pd-rc-home-education`). This is a scoped UI authorization, not a second media registry or an additional contextual use. Withdrawn/HOLD source resolution still fails closed before this guard; private role-only media cannot inherit approval.
- `foundation.css`: existing tokens/typography, full-frame contain sizing, bounded viewport dialog, opaque reading surface, legible original caption/credit, restrained backdrop, forced-colors support. Background root scroll is locked; an existing classic scrollbar gutter is retained, while overlay-scrollbar browsers do not gain a new gutter. Original inline styles and scroll position restore on close/unmount.

No general public gallery or viewer API, body manuscript, original photograph, new asset derivative, modified crop, or activity-detail control is introduced. Caption/alt/credit are passed from the same resolved canonical media object, not reauthored in JSX. Responsive `srcset` reuses only that asset's approved derivatives, with viewer-specific display-size hints. No enlarged image request is caused merely by mounting the closed dialog.

## Actual checks

Node24 / locked npm ci, TypeScript/Vite production build and strict25-file artifact policy pass.27Python checks pass, including the extended media scope/withdrawal unit proof.59mocked deployment-foundation checks pass. Existing homepage (five widths,18routes), TE,160activity layouts,60institutional layouts,35photo layouts/30unapproved contexts, refinement accessibility checks and ten cross-domain data-only scenarios pass. The integration fixture additionally withdraws GH's homepage use and confirms its enlargement disappears while RC remains available.

`browser_enlargement.cjs` tests both images at1366/1024/768/390/320: native dialog naming, Enter activation, Tab/Shift+Tab containment, Escape and close-button activation, invoking focus, original scroll position, blocked background wheel scroll, unchanged viewport width, decoded approved responsive derivative, complete native aspect ratio, caption and exact credit. Forced-colors/reduced-motion emulation and text-spacing overflow checks pass at each width. GH/RC activity details, TE11 andUIlab have no enlargement control. Intentional enlarged-image request failure retains caption/credit, close and focus return.10before/after field-band screenshots plus10modal screenshots are retained outside Git.

Two implementation problems were corrected before release: native single-control Tab could leave document focus for browser chrome, so explicit unmodified Tab containment was added; reserving a new gutter in overlay-scrollbar browsers shifted background geometry, so gutter reservation is conditional. Closed-dialog content is unmounted to preserve the homepage's actual heading inventory and avoid unnecessary image loads.

These are actual Chromium153 CSS-viewport tests, not physical-device/touch or screen-reader verification. Native200% browser zoom and exhaustive accessibility conformance are not established. No smooth modal motion is added. See deployment evidence below after release; no success is inferred from a build alone.

## Release and owner gate

Native Pages release/source and actual hosted opening/closing will be recorded in package-e-deployment.md. Stop after owner PackageE/final Stage3 review. No Stage4, production deployment or PR13 merge is authorized.
