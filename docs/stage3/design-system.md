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

## Archive-led media and composition

- The photograph is evidence, not decoration. Every media slot needs an activity relationship, proposed caption, source reference, credit and permission state before publication.
- `hold` and `cleared` are editorial states. A visually strong image on hold remains a labelled composition placeholder in the public prototype; Drive readability never implies public permission.
- Jurnal Ekspedisi uses long documentary rhythm: generous image field, chronology, quoted field fact, serif reading voice and handwritten-notebook cues expressed with rules and type—not simulated paper clutter.
- Atlas Tursina uses dense institutional reference rhythm: indexed modules, sans typography, compact facts, source status and strong grid alignment. It must not become a SaaS dashboard.
- Prefer an authored sequence—departure, journey, field practice, encounter, outcome—over grids of interchangeable cards. Gallery density follows the evidence available.
- Default crops remain 16:9 for narrative anchors and 4:3 for activity evidence; portrait action may retain 3:4 when the climbing/body scale is the subject. Record the intended crop in the permission ledger.
- Never add generic mountain stock, decorative gradients, invented route maps, inferred species names or anonymous inspirational slogans to fill an evidence gap.

## Decision ledger

13 October: approved delivery scope recorded separately. First UI-lab foundation used synthetic activity/state fixtures. On 14 October the owner approved the information architecture and asked for an archive-driven visual revision. The revised Beranda, TE11 and PD examples may use verified public-safe content and private photo compositions, but formal visual selection and all photo publication decisions remain pending.

## P3 working comparison

`SitePrototype` provides two named directions on the same content/routes. Review direction A is now **Jurnal Ekspedisi**, a documentary field narrative built around chronology, captioned media positions and reflective reading rhythm. Direction B is **Atlas Tursina**, an indexed institutional archive built around compact facts, documentary status and cross-record relationships. The underlying selector values remain stable for saved review URLs. No isolated page color patches; shared controls/navigation remain common.

Typographic covers use 16:9 on rich catalogue cards and a deliberately taller featured home cover. They are labelled as typographic, not photographs. Actual eventual photograph crops retain their separate source/rights review and 4:3/16:9 rules. Sparse basic records omit covers entirely; no forced empty media section.

Card/publication title anchors use block hit areas so multiline text remains reliably clickable. Public skip link added. Review controls are development chrome, not proposed production navigation. Directions remain **pending owner selection**. Rights-held media positions deliberately display their state, so approval of a composition does not authorize the associated photograph.
