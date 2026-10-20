# MPA-TRS Stage 3 prototype

Isolated frontend: React 19.3.0, TypeScript 7.0.2, Vite 8.3.4 and Tailwind CSS 4.3.3. Locked dependencies; no Laravel backend or hosting dependency. Source branch: `stage3/interactive-prototype` in the existing public repository. Native GitHub Pages deployment from this branch is authorized; merge to `main` and production deployment are not.

## Tailwind-only migration — 20 October 2026

The prototype now uses Tailwind utilities throughout. The sole stylesheet contains only the Tailwind import, theme tokens and local fonts. Custom CSS and inline styling are prohibited and checked during every build. See [migration notes](TAILWIND.md). The owner authorized committing and pushing this migration to the Stage 3 prototype branch on 20 October 2026; this does not authorize a merge or production change.

## Resume

Read root AGENTS.md and `docs/stage3/approval-record.md`, `design-system.md`, `checkpoint-01.md`. From this directory: `npm ci`, `npm run build`, `npm run dev`. Do not use the production application's package manifest.

## Local WSL development

The prototype has no local `.env` file and does not need the Laravel application's PHP, Composer, database or environment configuration. Node 22.12 or newer runs Vite; the committed model-test harness follows CI and requires Node 24 because it imports TypeScript modules directly.

Initial setup from Ubuntu/WSL:

```sh
cd ~/projects/mpa-trs-web/docs/stage3/prototype
npm ci
```

Start a complete local preview in the foreground. The build step is required because the approved media files are emitted into `dist/` by the Vite build plugin:

```sh
cd ~/projects/mpa-trs-web/docs/stage3/prototype
npm run build
npm run preview
```

Open `http://localhost:4173/` in the Windows browser. Useful entries include `#/program/te`, `#/program/pd`, `#/activities`, `#/publications`, `#/knowledge`, `#/jejak`, `#/about`, `#/ui-lab` and `/responsive-review.html`. Stop the server with `Ctrl-C` in its terminal. Vite binds to `0.0.0.0` so WSL2 localhost forwarding can expose it to Windows; do not publish the port externally.

`npm run dev` provides hot reload for code-only work, but the current repository configuration disables `publicDir` and emits approved `/media/` assets only during a production build. Use the built preview above for faithful visual and image review until development media middleware is added in a separately reviewed tooling change.

Before handing off changes, run the locked boundary/model checks with the same Node major as CI, then build:

```sh
cd ~/projects/mpa-trs-web/docs/stage3/prototype
npx --yes -p node@24 -c 'python3 -m unittest discover -s tools -p "test_*.py" -v'
npm run build
```

For a Pages-equivalent artifact and its strict public-payload verification:

```sh
cd ~/projects/mpa-trs-web/docs/stage3/prototype
PREVIEW_BASE=/mpa-trs-web/ VITE_SOURCE_COMMIT="$(git rev-parse HEAD)" npm run build
npx --yes -p node@24 -c 'python3 tools/verify_preview.py dist "$(git rev-parse HEAD)"'
```

`dist/` and `node_modules/` are ignored local outputs. Use `npm ci`, not `npm install`, so `package-lock.json` stays authoritative. A first `npx` invocation may download the isolated Node 24 runtime into npm's cache; it does not change the project manifest or lockfile.

In this managed Work environment, the available supervisor owns the preview: `sites-preview start <absolute-prototype-directory>` then open `http://terminal.local:4173/ui-lab` in the cloud browser. Do not start a competing server. Use `sites-preview status` to inspect ownership and `sites-preview stop` when review ends. This address is internal, transient and not external hosting. Keep the preview running while the owner is actively inspecting it; after interruption, recreate it from versioned source.

## Inspect

- `/` or `#/review`: connected archive-driven review bundle. Use top selectors for Jurnal Ekspedisi/Atlas Tursina and navigation A/B. Beranda, canonical TE11 and PD XXIX use verified public-safe records and rights-held media compositions; supporting routes and local organizer/editor/publisher walkthrough remain connected. Direction is pending owner selection.

- `/ui-lab`: theme, typography, shared controls, activity cards, lifecycle labels, filter/empty/reset, linked synthetic rich/basic records and local submission simulation.
- `/responsive-review.html`: development-only iframe viewport harness, 320/390/768px. Verify inner document `innerWidth`, client/scroll widths and actual breakpoint behavior. This is CSS reflow testing, not touch-device emulation or a Stage 1 mobile check.
- All record navigation is currently hash-based and local. Final public navigation is not selected. Vite HTML fallback serves the lab at `/ui-lab`.

Theme: `src/theme.css`; components: `src/components/`; source-backed public records: `src/content.ts`; archive layouts: `src/ArchiveDesigns.tsx`; state demonstrations: `src/fixtures.ts`. No rights-unresolved photograph is bundled and no official logo is recreated. Media plates are composition previews, not claims of publication clearance.

## Verification and review limitations

Build/type check passed. Cloud browser rendering/interactions are recorded in checkpoint-01. The cloud browser exposes no viewport sizing; a separate document viewport was used instead. Automated CLI Playwright was not run: no installed Chromium binary was found in this execution container. Supported Playwright locators in the cloud browser were used for interactions and DOM measurements.

Owner review is through this conversation's Cloud Browser when surfaced. `terminal.local` is not a public link. No external reviewer access has been provisioned. No compliance/security/performance guarantee from this foundation prototype.

Historical public-preview preparation (14 October, superseded by native Pages): see `../public-release-audit.md` and `../publishing/README.md`. Hash UI-lab URL works in static output; responsive-review.html is now an explicit second Vite input. PREVIEW_BASE controls project-site base; VITE_SOURCE_COMMIT supplies visible/version.json release identity. publicDir copying and sourcemaps are disabled. Inert publishing workflow awaits specific authorization; no live HTTPS preview exists yet.

Active publishing: `.github/workflows/stage3-pages.yml`, exact source branch Stage3, GitHub Actions Pages, base `/mpa-trs-web/`. Read `../publishing/README.md`. Owner authorized public source and safe frontend publication; cross-repo publisher refuses execution. No PAT or second repository.
