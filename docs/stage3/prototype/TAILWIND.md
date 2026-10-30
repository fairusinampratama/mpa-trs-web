# Tailwind-only migration

Completed and authorized for commit and push to `stage3/interactive-prototype` on 20 October 2026. Not merged into `main` or deployed to production.

## Styling contract

Use native Tailwind utilities in JSX/HTML and static shared component recipes. Arbitrary values and responsive/state/child variants are allowed. Keep complete class strings visible to the compiler. Semantic `data-ui` slots identify component parts and test targets, never standalone CSS rules.

The sole stylesheet, `src/theme.css`, permits only the Tailwind import, centralized `@theme` tokens and existing local font declarations. No custom selectors, CSS modules, `@apply`, inline styles, injected styles or JavaScript style mutation. `npm run check:styles` enforces this boundary before every build. Production application styling is outside this migration.

## Changes

Removed five legacy stylesheets; converted shared components, all prototype views and review tools to utilities. Preserved routes, data, approved media, palette and fonts. The navigation breakpoint is 960px because both approved desktop label sets fit at that width; below it, the phone menu is full-width and the tablet menu is a compact overlay. Navbar uses an animated menu/close icon without hover underlines. Homepage programme discovery uses three equal full-card links, stays stacked through tablet widths, and avoids forced card heights or an unsupported featured item. The expedition feature uses an editorial image-and-copy layout with a primary action and shared quiet-link variant instead of a nested card. Homepage Pemantapan Divisi exposes all five filtered fields and standardizes its two selected documentary examples in equal 4:5 display frames with verified activity context and canonical activity links. Homepage Arsip Kegiatan uses a newest-first, cross-cohort selection in responsive two-zone rows with explicit record and catalogue destinations. Shared button recipes preserve interaction states. Review frame sizing uses data-state variants. Fixed narrow-screen text-link wrapping and previously missing dynamic color samples. Updated browser test selectors to semantic slots.

The institutional footer now uses the approved Tursina asset, labelled navigation groups, a router-safe return-to-top button and a separate prototype-status band. UIN affiliation remains an official-site text link; no unconfirmed university logo asset or custom styling was introduced.

The `Tentang` page now renders its canonical institutional record as visible formation/affiliation/education facts, three principles, four learning stages, five complete linked division entries and a continuity section. The redundant top-level breadcrumb, public evidence disclosure, repetitive source captions and generic destination cards were removed from the public reading flow. Division records retain their complete catalogue descriptions and add short About-page summaries; the canonical source locators and limitations remain intact.

## Validation

- Build, TypeScript, styling policy and native Tailwind candidate validation passed.
- 33 prototype model/boundary/policy tests and 59 deployment regression tests passed.
- In-app browser: 53 linked routes at 320, 390, 768, 1024 and 1366px (265 layouts), with no horizontal document overflow or app-authored inline styles.
- Navigation keyboard/menu/submenu/Escape/focus/route-close checks passed at five widths. The homepage documentary pair uses equal 4:5 display frames, preserves captions and credits, stacks on narrow screens, and links to the two canonical activity records without adding dialog controls.
- Catalogue filter/reset/back-state, publication empty/reset, restricted-work navigation, synthetic member search, lab disabled/busy states, alternate navigation, legacy visual switch and five responsive frame sizes passed.
- The homepage work selection uses a Tailwind-only editorial publication variant with source-backed metadata, visible availability boundaries, one canonical action per record and a quiet catalogue link; no custom selector or authored stylesheet rule was added.
- The institutional footer was inspected at 320, 390, 768, 1024 and 1366px. It retained one/two labelled navigation landmarks, changed from one to three layout columns without overflow, rendered the approved logo, separated the status-band background, exposed the official UIN text link and returned scroll position to zero through its button. Browser console errors were empty.
- The rewritten `Tentang` page was inspected at 320, 390, 768, 1024 and 1366px. It rendered three facts, three principles, four learning stages and five field routes; changed from compact two-column mobile indexes to three/four/five-column desktop layouts; omitted the redundant breadcrumb and public evidence disclosure while retaining their canonical records; retained the canonical Jejak and PD routes; and produced no horizontal overflow or browser console errors.
- Compared computed layouts across 19 representative routes at two widths against the pre-migration build; reviewed representative screenshots. Browser-script syntax and whitespace checks passed.

These are desktop viewport checks, not physical-device testing. Reduced-motion and forced-color variants remain but were not freshly emulated. Repository browser scripts were updated and syntax-checked; interaction validation used the in-app browser instead of rerunning the CLI suites. The checks above cover the source before push; Pages and CI results must be assessed separately after the push.

Vite reports a chunk-size advisory: JavaScript is approximately 509 kB before gzip, 126 kB gzipped. Build succeeds; code splitting is outside this migration. No runtime dependency or lockfile changes were required.

The `Tentang` interaction refinement removes the redundant top-level breadcrumb and public evidence disclosure while retaining their canonical source material outside the rendered page. Its opening reuses the shared primary and quiet-link recipes, and each of the five division entries is a complete Tailwind-only link surface with hover, active and focus-visible states. Static institutional content remains still.

The Tursina Explore redesign registers TE1–TE13 as edition identities and separates that sequence from the three source-checked public records. Its Tailwind-only catalogue derives ordering, counts, availability and links from canonical data; removes the repeated TE11 catalogue feature, top-level breadcrumb and source accordion; and uses complete row interactions only for documented editions. TE11 remains rich, TE10/TE12 remain concise, identity-only routes render a bounded unavailable state, and a full synthetic expedition specimen is isolated under `#/ui-lab/expedition/synthetic`.
