# Tursina design system — working draft

Status: technical-loop foundation, not an approved visual direction. Token hex values are design proposals, not official logo specifications.

## Identity basis

R2 §8 / S01 ART Pasal 1–6 documents light green (peace), blue mountain, gold lettering/brotherhood and black-white directions. Institutional traditions combine field education, scientific work, environmental concern, religious life and generational fellowship. Begin with deep forest, warm paper, restrained blue and gold; compare directions after authentic fixtures/assets are prepared.

No stock photography or invented official logo is used in this first laboratory. Wordmark is plain text. Media slots are labelled awaiting rights review.

## Architecture and agent conventions

- Theme lives in `docs/stage3/prototype/src/theme.css`, using Tailwind 4 `@theme` tokens. Equivalent controls use shared components.
- Reuse components that match the purpose. Change shared styles centrally and inspect every affected route.
- Use semantic surface/ink/brand/state tokens. Introduce no new color, spacing or type variant without documenting its purpose.
- Buttons: solid primary, outlined secondary, quiet text. Minimum control height 44px; visible keyboard focus, disabled and busy states.
- Cards: one activity-card pattern, optional metadata and optional media. No empty forced sections. Lifecycle and publication states remain separate.
- Typography: system sans for controls; available serif stack for editorial headings. No remote font dependency yet. Reading measure 65 characters; scale defined centrally.
- Spacing: Tailwind base 4px; preferred steps 1/2/3/4/6/8/12/16/24. Containers use centralized page width and gutters.
- Layout: one column at small widths, two at medium, wider only where useful. Breakpoints remain Tailwind defaults (640/768/1024/1280/1536px). Browser tests cover narrow 390px and desktop 1440px, plus 320px overflow check.
- Shape: compact 4px controls; 8px cards; no decorative heavy shadow. Borders use one semantic line token.
- Media: landscape 4:3 for activity cards, wide 16:9 editorial block. Rights/caption/crop review required; never infer dates from filenames.
- Semantic HTML, labelled fields, non-color status labels, native tab order, reduced motion and live feedback. No accessibility compliance claim from this small prototype.

## Decision ledger

13 October: approved delivery scope recorded separately. First UI-lab foundation uses synthetic activity/state fixtures; formal visual selection is pending P3 review. No complete website/navigation selection is implied.

## P3 working comparison

`SitePrototype` provides two named directions on the same content/routes. Catatan Lapangan preserves paper/forest/serif. Ruang Tursina overrides semantic colors and editorial font centrally on `.site-shell[data-direction=signal]`, with deliberately stronger title weights and a leaf strip on the expedition cover. No isolated page color patches. Both use shared Button/StatusLabel/ActivityCard and common PageTitle/PublicationList/NavItems patterns.

Typographic covers use 16:9 on rich catalogue cards and a deliberately taller featured home cover. They are labelled as typographic, not photographs. Actual eventual photograph crops retain their separate source/rights review and 4:3/16:9 rules. Sparse basic records omit covers entirely; no forced empty media section.

Card/publication title anchors use block hit areas so multiline text remains reliably clickable. Public skip link added. Review controls are development chrome, not proposed production navigation. Directions remain **pending owner selection**; approval of the technical loop or encouragement did not approve a final visual direction.
