# Component system — proposed specifications, no React files

14 October 2026 · component approval pending. Tokens refer to [foundations](foundations.md). Responsibilities reflect semantic reuse, not a component per rectangle. “Keyboard” clauses are implementation requirements, not claims that static boards implement behavior.

## A. Application shell

### InstitutionalHeader / Navigation

- **Purpose/data:** unchanged institution identity/affiliation and approved route groups; optional cleared emblem with exact asset identity. Anatomy: small emblem/reference, readable name, desktop route list; actual homepage explains the name/purpose fully.
- **Variants/reuse:** shared across public pages; grouped and direct-programme menu models remain prior hypotheses. The Step 4 board uses the grouped model to preserve Step 3 comparison baseline; visual approval does not silently settle navigation A/B.
- **Responsive:** desktop at >=1024 only if labels fit; collapse earlier when text/zoom requires. At smaller widths, 68px header with 40px reference and 44px Menu target; affiliation remains explicit in opening, not hidden in the menu.
- **States/keyboard:** default/hover/current/focus/expanded; current link has non-color indication and `aria-current`. Group trigger is a button with `aria-expanded`/`aria-controls`; links remain links. Escape closes disclosure and returns focus; close on route navigation. No hover-only opening or click target on a noninteractive container.
- **Missing content/tokens:** if emblem uncleared/missing, readable institutional name remains; no invented crest or broken-image box. `surface`, `ink`, `muted`, `primary`, `control-border`, focus tokens; UI 16–18/24, 44px+ target, 2px control radius.

### MobileNavigation

- **Purpose/data/anatomy:** same route tree, in-flow disclosed panel with root labels, nested route links and Close control. Full labels wrap; child links are visibly indented. It is not a modal and must not claim `aria-modal` or trap focus.
- **Variant/state/reuse:** closed/open states of the shared Navigation, not a duplicated independent taxonomy. Default/focus/current/disclosed nested group. Keep focus order native and avoid nesting anchors inside buttons.
- **Responsive/missing/tokens:** full available measure, >=44px rows, no horizontal scroll; unknown optional destination omitted. `surface`, `control-border`, `primary`, shared typography and spacing. Menu labels must be checked at 320 and 200% zoom later.

### InstitutionalFooter

- **Purpose/data/anatomy:** readable identity and university text, documented motto, route groups. No invented current contact/social/recruitment channel. Shared after every public page.
- **Variants/response/state:** desktop columns; mobile stacked identity/routes; link hover/underline/focus. No separate decorative footer theme. Missing optional link omitted; no fake icon placeholder. `primary`/`inverse`, body 17/25, caption14/20, inverse focus. Emblem not required.

### DevelopmentReviewShell

- **Purpose/data:** existing direction/navigation controls, version/source state, UI-lab/responsive review and simulation controls. Development-only wrapper around public page, never part of identity/header/hero.
- **Anatomy/state/access:** separate labelled controls with keyboard/focus/current state; no production navigation promotion. Unknown version not fabricated. Shared primitive styles can apply later, but its content/taxonomy remains separate. Not redesigned or implemented in this step.

## B. Homepage/content sections

The seven sections below compose the approved page. They use reusable patterns; none warrants a generic configuration/layout engine. All section headings follow `Section` type and 56/88 mobile/desktop rhythm, with normal wrapping and a single principal action. Optional records/fields disappear honestly, not as empty panels. These are deliberate section responsibilities, not seven different card systems.

| Section | Data/anatomy and hierarchy | Justified composition / responsive behavior | Sparse content, states, reuse and tokens |
| --- | --- | --- | --- |
| IdentityOpening | Literal name, affiliation, purpose, content breadth, two route actions, cleared collective image/caption | A side-by-side desktop; copy/actions before image on mobile. One static image; no carousel. | Name/purpose never optional. Without cleared media preserve intro; do not publish HOLD or substitute stock. Shared hero semantics for institutional landing only; button/link/focus behavior reused. Display/body type, `page`/`ink`/`blue`, small gold rule. |
| ProgrammeDiscovery | Three bounded programme/activity entries with purpose and catalogue link | Indexed open columns desktop, full-width rows mobile; no identical image tiles | Browse identities, not fabricated editions or mandatory parents. Missing optional summary omitted. Shared ProgrammeEntry; labels/link hover/focus. `primary` rule, Section/Content type, 24px gap. |
| FeaturedExpedition | One canonical historical edition, known date/location, concise experience intro, documentary image, detail/catalogue actions | Native landscape/photo beside editorial text desktop, full frame then text mobile | Missing geography/date omitted or precision retained; no inferred latest/achievement/carbon claim. Specific homepage editorial composition; ActivityMetadata and DocumentaryMedia shared with detail. `page`/`ink`/`blue`. |
| EducationOverview | Practical learning summary, GH/RC example media/captions, five divisions and PD catalogue link | Concrete education band; desktop explanation + matched-height native portraits; mobile photos then full readable fields | All five fields represented as text even where no image exists. Never omit a field solely because photography is absent. Native media/links shared; no invented technical outcome. `primary`/`inverse`; inverse focus; 400/242/200 image heights describe boards, not forced universal rule. |
| ActivitySelection | Three curated activity identities with readable dates/place/lifecycle and links | Concise ledger rows desktop; metadata/title/description stack on mobile | Covers not mandatory; independent activity has no fabricated programme. Rich/basic records valid. Shared ActivityPreview compact variant; focus/hover whole-title/row rule. Metadata/body type, `blue` historic label, `border`. |
| PublicationSelection | Independent teaching work and activity-related article; type/title, known optional date/author, summary, own link/relation | Distinct editorial entries, two columns desktop/stacked mobile | Unknown author/date/cover omitted; not replaced by invented credit or “unknown date” filler. PublicationPreview shared with catalogues; no new Activity for a post. `blue` rules, editorial title, `muted` metadata. |
| InstitutionalHistoryPreview | Sourced founding date, continuity summary, formation media, Jejak route and synthetic catalogue link | Full frame beside copy desktop; image then concise text mobile | Limited history is not a complete timeline. No participant identity inferred from scarf. Specific homepage preview using shared media/title/link/metadata; `page`, `primary`, `blue`. |

The approved order is fixed in Step 4; future validated selections replace records rather than adding sections. Current notices only after separate verification. Routine uncertainty belongs in source disclosure; material uncertainty remains visible where necessary.

## C. Reusable content patterns

### ProgrammeEntry

- **Purpose/data/anatomy:** programme ID/name, short purpose, catalogue href; optional editorial ordinal. Rule → short index → programme title → description → route action. Not a dated activity or a sale/product card.
- **Variants/reuse/responsive:** open entry on homepage/overview; compact list in discovery. One-column rows mobile, three columns only when titles/minimum measure fit. No mandatory image/date/count.
- **States/access/missing/tokens:** title/action links have consistent focus/underline, block hit area for wrapped text. Decorative ordinal hidden from accessibility when redundant. Omit optional summary; never fabricate an edition count. Content title Serif30/36 desktop,26/32 mobile, body 18/26 or17/25, `primary` rule, 16/24 internal spacing.

### ActivityPreview + ActivityMetadata

- **Purpose/data/anatomy:** canonical ID/href, human-readable title, lifecycle, date precision, optional location/programme/division/cohort, concise summary; optional cleared cover. State/date → title → place/summary → canonical link. Metadata shows only relevant context; cohort is not global hierarchy.
- **Variants/reuse:** compact row (home/related lists), bounded card (catalogue with appropriate media). Do not create a different rounded card for each programme. Rich/basic depth changes optional content, not identity.
- **Responsive/states/access:** rows stack, known date formats wrap; title/row area is usable at >=44px, no nested overlapping links. Hover underline/border, visible focus, current state where relevant. Lifecycle text accompanies any color; historical is not unpublished or failed.
- **Sparse/missing/tokens:** no image means text-first preview, no empty photographic panel. Unknown date/location/summary omitted; genuine uncertainty belongs in source detail. `ink`/`muted`/`blue`/`surface`/`border`; Sans600 title23–26, metadata16/23, radius2 only on optional panel.

### PublicationPreview

- **Purpose/data/anatomy:** work ID/href/type/title, known optional author/date/format, summary and role-aware activity relation. Type → Serif title → optional authorship/date → summary → own canonical destination.
- **Variants/reuse/responsive:** article and learning resource share pattern; a resource may have a cleared thumbnail/download label only when approved. Homepage/catalogue/related-works reuse; two columns become stacked. No obligatory expedition parent.
- **States/access/missing/tokens:** links keyboard/focus/hover; downloadable resource declares format/size when known. No disabled pseudo-download if original is restricted—state reason and available public content. Omit unknown authors/dates/images; no invented paper cover. `blue` rule, Display600 title30/36 desktop,26/32 mobile, `muted` metadata, body17–19.

### DocumentaryMedia + MediaCaption

- **Purpose/data:** exact cleared asset identity/derivatives, intrinsic width/height, ratio/focal policy, alt, caption, known required credit/rights scope, loading role. Publication requires the clearance record; access alone is insufficient. Rendering data does not expose original/private-source URL.
- **Anatomy/variants/reuse:** image → adjacent caption/credit; native landscape/portrait, optional gallery link where supported. Native ratios are distinct, not “cover everything.” Used in public sections, activity/story/detail, works and history after clearance. Caption is behavior within this pattern, not a standalone abstraction with unrelated styles.
- **Responsive/states/access:** picture/srcset/sizes correspond to actual slot; intrinsic dimensions prevent shifting. Below-fold lazy, opening potentially high-priority. Alt describes context without invented people/species; decorative redundancy may use empty alt. Crop reviewed at mobile/desktop. Gallery controls/expanded views only if separately specified and keyboard operable.
- **Missing/held/error:** HOLD assets stay out of public output. Omit optional image or show a brief contextual unavailable message if its absence matters; no giant development placeholder. Failed cleared image retains useful caption/alt and avoids broken icon dominating content. Captions14/20, `muted` on `page`, `inverse` on green; no photo-text contrast dependency.

### EvidenceDisclosure

- **Purpose/data/anatomy:** public-safe source basis, factual precision/conflict, review/update wording and approved correction path. Summary/trigger → disclosed body. Public narrative separate from private original; no raw Drive/LPJ links or personal record data.
- **Variants/reuse/state:** closed/open native disclosure, in activity/publication/history detail and editorial simulation. Material uncertainty may require visible note outside it. Keyboard Enter/Space and native semantics; focus visible. Single trigger/associated content; not duplicated custom “accordion” implementations.
- **Responsive/missing/tokens:** reading-width body; known text wraps. No source detail fabricated to fill an empty panel. `surface`/`control-border`, title UI19/26, body17/25; no warning color for every ordinary provenance note.

## D. UI primitives and shared behaviors

### Action (Button / Link)

- **Data/purpose:** label, destination for navigation or event action, disabled/busy/current state. Navigation uses an anchor; mutations use buttons. Primary green, secondary outlined, quiet editorial link are justified variants, not extra button families.
- **Anatomy/state:** visible label, optional labelled icon, stable 46px height; default/hover/active/focus/disabled/busy specimens. Busy retains width/purpose, suppresses repeated action, sets `aria-busy`, announces progress/result. Native disabled behavior with explanation when needed; no focusable fake-disabled link.
- **Responsive/access/missing:** stacked actions at 320/390, content-sized row desktop; long labels wrap without truncation. Focus3px+gap2; >=44px target, keyboard activation. Empty label is invalid. `primary`/hover/active/`surface`, `control-border`, disabled tokens, 2px radius; Sans600 17/24. Shared everywhere; icon alone needs an accessible label.

### Heading / Text / StateLabel

- **Purpose/data/anatomy:** semantic heading level independent of display role; literal title, readable body, metadata or state. Single page h1; section h2; preview h3 where hierarchy supports it. Do not choose h-level for font size.
- **Variants/state/reuse:** named scale from foundations; activity lifecycle versus editorial/result status distinct, with readable words and optional icons. Not interactive unless an actual link. Text selection/zoom must work; no image of text in implementation.
- **Responsive/missing/tokens:** normal Indonesian wrapping, bounded reading measure, no fabricated missing metadata. Shared text/label roles; no component for each isolated sentence. `ink`/`muted`/inverse and semantic state pairs. Gold never normal text.

### Field / Filter / Disclosure control

- **Purpose/data:** visible label, value/options, optional required/help/error, accessible ID and description relationship. Native input/select/disclosure when adequate; no custom select engine to imitate a rectangle.
- **Anatomy/states:** label → 48px control → adjacent help/error. Default/hover/focus/filled/error/disabled/busy; error is words and association, not just a red border. Filter inputs affect existing canonical catalogue; reset and result/empty feedback are explicit.
- **Responsive/access/missing/tokens:** full-width stack mobile, paired desktop when labels fit; tab order follows reading order. Label remains visible; keyboard native interaction. Unknown optional filter group omitted, not fake options. `surface`/`control-border`/focus/error, 2px radius, body18 UI/17labels. Submission remains local simulation in Stage 3; no real authentication/backend persistence.

### Feedback (Empty / Loading / Error / Restricted)

- **Purpose/data/anatomy:** explicit condition, short explanation and meaningful available action. Empty: reset filters; loading: status text; error: retry; restricted: public alternative/reason. One feedback pattern with named states, not four independent applications.
- **States/access/responsive:** announce updates appropriately (`status` for nonurgent results; relevant errors announced without constant alert noise); stable space when useful, no shimmer/animation requirement; text and action wrap at 320. Buttons follow Action semantics. Color supplements words.
- **Missing/tokens/reuse:** do not invent result counts, source access or a backend operation. Missing optional media handled by DocumentaryMedia; whole-list failure uses Feedback. `surface`/`border` and semantic pairs, body17–19; shared in catalogues, forms, restricted records and the existing editorial simulation after separate implementation authorization.

## Page-specific and agent conventions

Keep homepage section order/selection, the collective identity placement, historical TE feature and paired field-education composition deliberate. Long expedition narratives may later have authored editorial layouts using shared media/title/metadata; they are not rebuilt in Step 4. No new route, compulsory organizer portal or universal period/angkatan hierarchy.

Future sessions must reuse purpose-matching components; tokens precede arbitrary values; equivalent controls/cards share centrally maintained behavior. New colors/type/spacing/variant require a reason and review record. Shared changes need cross-page inspection. UI laboratory must later use the same source, not a separate imitation. Approval does not permit accumulating unnecessary abstractions or modifying the current prototype now.
