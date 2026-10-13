# MPA-TRS Stage 3 prototype

Isolated frontend: React 19.3.0, TypeScript 7.0.2, Vite 8.3.4 and Tailwind CSS 4.3.3. Locked dependencies; no Laravel backend or hosting dependency. Source branch: `stage3/interactive-prototype` in the existing private repository. No merge/deployment is authorized.

## Resume

Read root AGENTS.md and `docs/stage3/approval-record.md`, `design-system.md`, `checkpoint-01.md`. From this directory: `npm ci`, `npm run build`, `npm run dev`. Do not use the production application's package manifest.

In this managed Work environment, the available supervisor owns the preview: `sites-preview start <absolute-prototype-directory>` then open `http://terminal.local:4173/ui-lab` in the cloud browser. Do not start a competing server. Use `sites-preview status` to inspect ownership and `sites-preview stop` when review ends. This address is internal, transient and not external hosting. Keep the preview running while the owner is actively inspecting it; after interruption, recreate it from versioned source.

## Inspect

- `/` or `#/review`: connected first substantive review bundle. Use top selectors for Catatan Lapangan/Ruang Tursina and navigation A/B. Canonical TE11/article links, basic TE12, representative PD/works/history/member routes and local organizer/editor/publisher walkthrough. Direction is pending owner selection.

- `/ui-lab`: theme, typography, shared controls, activity cards, lifecycle labels, filter/empty/reset, linked synthetic rich/basic records and local submission simulation.
- `/responsive-review.html`: development-only iframe viewport harness, 320/390/768px. Verify inner document `innerWidth`, client/scroll widths and actual breakpoint behavior. This is CSS reflow testing, not touch-device emulation or a Stage 1 mobile check.
- All record navigation is currently hash-based and local. Final public navigation is not selected. Vite HTML fallback serves the lab at `/ui-lab`.

Theme: `src/theme.css`; components: `src/components/`; synthetic fixtures: `src/fixtures.ts`. No photo selected and no official logo recreated. Proposed headings are test copy, not a verified institutional motto.

## Verification and review limitations

Build/type check passed. Cloud browser rendering/interactions are recorded in checkpoint-01. The cloud browser exposes no viewport sizing; a separate document viewport was used instead. Automated CLI Playwright was not run: no installed Chromium binary was found in this execution container. Supported Playwright locators in the cloud browser were used for interactions and DOM measurements.

Owner review is through this conversation's Cloud Browser when surfaced. `terminal.local` is not a public link. No external reviewer access has been provisioned. No compliance/security/performance guarantee from this foundation prototype.
