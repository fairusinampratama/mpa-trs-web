# Checkpoint 01 — executable laboratory and review loop

13 October 2026. Stage 3 is in progress; this is a technical foundation, not approved final styling or Stage 3 acceptance.

## Implemented

Standalone React/TypeScript/Vite/Tailwind 4; centralized Tursina draft tokens; shared Button, StatusLabel and ActivityCard; UI-lab foundation/components/states sections; local activity filtering/empty/reset; linked rich/basic synthetic examples; local required-field submission simulation. A separate development-only responsive document harness supports 320/390/768px inspection.

No institutional assets/data, backend, persistence, authentication, external messages or hosting changes. Official wordmark is plain text; decorative test initial is not an official logo. Proposed editorial headings are test copy.

## Actual verification

| Check | Observed result |
|---|---|
| Runtime/dependencies | Node v24.19.0, npm 11.9.0; React/DOM/types 19.3.0, TS 7.0.2, Vite 8.3.4, Tailwind/plugin 4.3.3 installed |
| Type/build | `npm run build` succeeded; 19 transformed modules; production CSS and JS emitted |
| Running preview | Supervisor started Vite; cloud browser opened `/ui-lab` and rendered React |
| Desktop | Actual cloud viewport 1363×936, no horizontal overflow; theme/typography and linked states inspected |
| Styling modification | Shared forest token changed from #193c30 to #234838; browser readback and screenshot showed top bar rgb(35,72,56) without a new server |
| Navigation | Components → rich record → laboratory returned correctly |
| Filter | Ongoing produced honest empty state; reset restored both synthetic cards |
| Form | Filled two synthetic fields, submitted, observed local-only confirmation; busy/disabled buttons present |
| Keyboard | ArrowRight selected/focused Components; Home returned to Foundation; visible focus ring observed |
| Mobile reflow | Separate framed document reported innerWidth 390, clientWidth/scrollWidth 375; mobile menu rendered/expanded; components inspected |
| Narrow reflow | innerWidth 320, clientWidth/scrollWidth 305 for components and form; no horizontal overflow |
| Narrow header | 320px viewport, brand right 190.44px, menu left 206.44px; no overlap |
| Console | Inspected warnings/errors showed browser-extension metadata errors, not application-origin errors; no broad error-free guarantee |

Mobile evidence is an actual separate CSS viewport, not a narrower surrounding panel alone. It does not emulate touch/OS/browser chrome, verify physical devices or complete Stage 1 mobile evidence. Standard CLI Playwright/browser-device suite not run because execution container lacks Chromium; supported cloud Playwright locators were used.

## Review access and durability

Internal preview works. Owner method: this conversation's Cloud Browser surfaced for manual inspection. A returned handoff is an access mechanism; owner confirmation that they can use it remains to be recorded. No public or external-review URL exists. A live process is not persistent hosting; resume from the approved branch and README.

Source and decisions are preserved on `stage3/interactive-prototype`, with a draft PR. Verify the returned commit and file readback before reporting durable source success. No merge is requested.

## Next within approved scope

Confirm owner can inspect/interact. Then P1 compact authentic fixture/rights packet; P2 two meaningful navigation candidates tested with comparable content; P3 working visual directions for owner selection. Continue connected Beranda/TE/expedition/intake bundle only within the selected direction. This first loop has not selected institutional styling, final navigation or made usability claims from real participants.

## CI integration correction

Initial CI run 38378718616 failed the unchanged source-root guard with `Unapproved tracked path: prototype/.gitignore`; Laravel PHP 8.2 and 8.3 jobs passed. Source moved into the existing allowed `docs/stage3/prototype/` namespace. Deployment guards/workflows are unchanged. A subsequent actual CI result must be recorded; the failed run is preserved as failure evidence.
