# Tailwind-only migration

Completed and authorized for commit and push to `stage3/interactive-prototype` on 20 October 2026. Not merged into `main` or deployed to production.

## Styling contract

Use native Tailwind utilities in JSX/HTML and static shared component recipes. Arbitrary values and responsive/state/child variants are allowed. Keep complete class strings visible to the compiler. Semantic `data-ui` slots identify component parts and test targets, never standalone CSS rules.

The sole stylesheet, `src/theme.css`, permits only the Tailwind import, centralized `@theme` tokens and existing local font declarations. No custom selectors, CSS modules, `@apply`, inline styles, injected styles or JavaScript style mutation. `npm run check:styles` enforces this boundary before every build. Production application styling is outside this migration.

## Changes

Removed five legacy stylesheets; converted shared components, all prototype views and review tools to utilities. Preserved routes, data, approved media, palette, fonts and layout thresholds. Navbar uses the hamburger/close icon without hover underlines. Shared button recipes preserve interaction states. Dialog scroll locking uses classes; review frame sizing uses data-state variants. Fixed narrow-screen text-link wrapping and previously missing dynamic color samples. Updated browser test selectors to semantic slots.

## Validation

- Build, TypeScript, styling policy and native Tailwind candidate validation passed.
- 30 prototype model/boundary/policy tests and 59 deployment regression tests passed.
- In-app browser: 53 linked routes at 320, 390, 768, 1024 and 1366px (265 layouts), with no horizontal document overflow or app-authored inline styles.
- Navigation keyboard/menu/submenu/Escape/focus/route-close checks passed at five widths. Both homepage photo dialogs passed at five widths, including focus containment/restoration, scroll restoration, stable body geometry, image fit and credits.
- Catalogue filter/reset/back-state, publication empty/reset, restricted-work navigation, synthetic member search, lab disabled/busy states, alternate navigation, legacy visual switch and five responsive frame sizes passed.
- Compared computed layouts across 19 representative routes at two widths against the pre-migration build; reviewed representative screenshots. Browser-script syntax and whitespace checks passed.

These are desktop viewport checks, not physical-device testing. Reduced-motion and forced-color variants remain but were not freshly emulated. Repository browser scripts were updated and syntax-checked; interaction validation used the in-app browser instead of rerunning the CLI suites. The checks above cover the source before push; Pages and CI results must be assessed separately after the push.

Vite reports a chunk-size advisory: JavaScript is approximately 509 kB before gzip, 126 kB gzipped. Build succeeds; code splitting is outside this migration. No runtime dependency or lockfile changes were required.
