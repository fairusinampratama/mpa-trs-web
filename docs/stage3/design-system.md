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
- Quiet links support secondary navigation beside a primary action without an underline effect; they use a restrained color change and directional-arrow movement while preserving a 44px target and visible focus.
- Cards: one activity-card pattern, optional metadata and optional media. No empty forced sections. Lifecycle and publication states remain separate.
- Homepage works use a restrained editorial-entry variant rather than boxed cards: verified authorship/date or format/extent sits beside an explicit availability statement, and each entry has one labelled route to its canonical record. The section title describes documented works and learning material without implying that unavailable source files can be read on the site.
- Homepage programme discovery uses a compact full-card-link variant because all three destinations have equal weight and short summaries. It stays one column through tablet widths and changes to three equal columns at 1024px; no item receives an unsupported featured treatment.
- Homepage Pemantapan Divisi discovery links directly to the five filtered fields. Its two selected documentary examples use equal 4:5 display frames and columns from 768px, while the source assets remain unchanged and their full documentary frames remain available on the canonical activity pages. Each example carries verified activity context and a direct activity link; the homepage adds no enlargement dialog.
- Homepage Arsip Kegiatan avoids repeating the immediately preceding GH/RC examples. It presents Kawi XXIX, BATAFIA XXX and Gunung Hutan XXVI in descending date order through a two-zone archive row, omits a redundant shared historical-state label, and ends with a route to the complete activity catalogue.
- The institutional footer is a compact fallback for identity and secondary navigation. It reuses the exact approved Tursina logo, exposes visible `Jelajahi` and `Institusi` headings, retains 44px link and button targets, and separates development status from public identity. UIN affiliation remains readable linked text until an exact official master and co-brand usage are confirmed.
- The `Tentang` page uses an institution-specific editorial sequence: literal identity and verified facts; three sourced principles; a four-stage archive-derived learning process; a compact five-division index; one continuity route; and the motto. Source evidence and detailed document locators remain in canonical data rather than public page furniture. Mobile uses two-column fact, learning and field indexes where they remain readable; desktop expands to three/four/five columns according to content count.
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

## Tailwind-only implementation — 20 October 2026

The owner-authorized migration supersedes earlier CSS conventions. Use native Tailwind utilities and shared React components. Only the Tailwind import, theme tokens and local font declarations remain in CSS. The navigation changes to its desktop layout at 960px, where both approved label sets fit without crowding; the programme discovery grid remains stacked until 1024px so three equal entries never produce a two-plus-one tablet layout. The 1200px wide-layout threshold remains centralized as `wide`. See [migration notes](prototype/TAILWIND.md).

### Tentang interaction hierarchy

`Tentang` is a top-level institutional destination, so it opens directly with its page label and heading rather than a redundant `Beranda / Tentang` breadcrumb. Breadcrumbs remain available for genuinely nested records. Its opening uses one shared primary action and one quiet directional link. Each division entry is one complete link surface with restrained background/border hover feedback, a one-pixel pressed response, arrow movement and visible keyboard focus; static facts, principles and learning stages do not acquire hover behavior. Editorial source evidence remains in canonical data and project records rather than a public page disclosure.

### Tursina Explore edition archive

The TE catalogue is an edition ledger rather than a featured-story page. It opens directly as a top-level programme, shows the total edition identity count separately from public-record coverage, and orders numeric editions newest-first from canonical data. Documented editions use complete editorial row links with background, pressed, arrow and focus feedback. Identity-only editions are static and explicitly unavailable. Rich, concise and unavailable details share navigation and typography but render only supported sections. Synthetic rich-content coverage belongs to the UI laboratory under a permanent synthetic label; it never receives a real TE number.
