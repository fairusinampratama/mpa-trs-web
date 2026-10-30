# Homepage UX specification — public-safe projection

Status: proposed wireframes, 14 October 2026. No final theme or implementation.

## Visitor journeys and priority

| Visitor | First question | Useful path | Homepage priority |
| --- | --- | --- | --- |
| Unfamiliar student/prospective member | What is Tursina, and what would I learn? | Identity → Tentang → education/divisions → PD/BATAFIA | Literal introduction and two useful actions; no invented recruitment form/date |
| Current member | Where are editions, activities and documented works? | Programme gateways → TE editions/PD filters → canonical activity → related works | Early programme discovery and dated records |
| Alumnus | Where is continuity and previous activity? | Persistent Jejak/Buku links → history → programme editions | Standalone Jejak preview, limited founding fact; synthetic catalogue only |
| General visitor | What stories and outdoor knowledge can I find? | Historical TE feature → related article; independent learning work | Distinct activity and publication entry points |

One homepage serves all four journeys without personalization. Institutional orientation, programmes, activity stories, independent works and history have distinct roles. Deep chronology, all editions, standards, source detail and catalogue rows belong on existing destinations.

## Proposed first-screen copy

**Mahasiswa Pencinta Alam Tursina**

**UIN Maulana Malik Ibrahim Malang**

Organisasi mahasiswa yang belajar melalui pendidikan alam bebas, ekspedisi, kegiatan lingkungan, dan kehidupan organisasi.

Jelajahi program, kegiatan, cerita, publikasi, pengetahuan, dan jejak lintas generasi.

Primary: **Kenali Tursina** → `#/about`. Secondary: **Jelajahi kegiatan** → `#/activities`. Header identifies MAPALA Tursina; the acronym does not replace the expansion. Exact copy remains owner-review material, not an approved official statement/motto.

## Section responsibilities and sequence

| Section | Visitor question / main content | Visual role | Interaction | Why here |
| --- | --- | --- | --- | --- |
| Identity opening | Who/where/what? Literal institution and purpose | A: collective campus context; B: map practice and short case | About + activities; B contextual GH detail | Identity before media, deep stories or controls |
| Programmes | What can I explore? TE, Pemantapan Divisi, other activities | Three purposeful entries; not repetitive image cards | `#/program/te`, `#/program/pd`, `#/activities` | Stable entry to breadth before chronology |
| Historical TE feature | What does a rich expedition record contain? TE11 dated 2024, short journey introduction | One group/banner image | `#/expedition/te11`, TE catalogue | A places third; B after learning/activity selection; never the whole homepage |
| Education/five divisions | How do members learn? Five documented fields | A: GH portrait (desktop), RC portrait (mobile); B: opening GH already supplies example | PD catalogue/filter; existing about/division context | A follows TE; B precedes TE to connect opening practice to broader learning |
| Activity selection | What else happens? RC XXIX, BATAFIA XXX, Kawi XXIX | Concise dated rows; no mandatory media | Existing activity IDs | Wider education/organizational life, not a chronological latest feed |
| Works/knowledge | What can I read or learn independently? Related article + standalone teaching work | Typography, work type and metadata; no fabricated cover art | Publications, knowledge and canonical work detail | Independent destination, not expedition appendix |
| Jejak/Buku link | How does experience continue? Founding 20 Dec 1995, continuity | Collective departure formation, limited historical introduction | `#/jejak`, `#/members` | History after tangible work; top navigation still offers direct access |
| Footer | How can I revisit institutional destinations? | Readable name/affiliation and route groups | Existing links | Closure without private contact, development controls or invented social channels |

A order: identity → programmes → TE11 → education → other activity → works → Jejak → footer.

B order: identity + GH case → programmes → education → other activity → TE11 → works → Jejak → footer.

Current information is conditional. With no verified current notice, no empty “latest” panel appears. A future approved current notice may occupy a modest slot after programme gateways or replace an editorial selection; it cannot displace the institutional explanation. TE11/PD/Kawi/BATAFIA are historical examples, not an inferred latest/current list.

## Private media references

| Code | Proposed role | Desktop / mobile | Caption and clearance |
| --- | --- | --- | --- |
| I-01 | Small identity reference in both headers | Unmodified reference at 36px; readable identity text carries meaning | Recovered rendering, canonical master unresolved; HOLD |
| 13 | A institutional opening / Kawi collective | 4:3 full frame, 564×423 desktop; mobile width minus 32px | Kawi collective at campus, 2025; credit unknown, rights/privacy/final approval pending |
| 07 | B opening GH case / A education | B portrait 180×320 desktop; 112×199 at 320 or 136×242 at 390; A desktop 196×348 | Preserve map/hands/teammate; practice caption, no competence claim; HOLD |
| 01 | Both TE11 feature | Native landscape ≈16:9, desktop 620×349; full mobile frame | Historical TE11 group/banner, 2024; preserve all people/banner; HOLD |
| 10 | A mobile education variation | Full portrait 112×149, no belay-team removal | RC XXIX practice; rights/credit/privacy pending; HOLD |
| 14 | Both Jejak preview | Full 4:3, desktop 360×270, full-width mobile | Departure formation; do not infer named status from scarves; HOLD |

All imagery is private design evidence, not publication. Exact originals, source URLs/hashes and permission register remain in the private review. No stock/generated substitute, public photo copy, intimate asset 15, university-emblem extraction or logo tracing is used. Actual credits must be supplied when established; the wireframe does not invent a creator.

## Navigation, interactions and mobile

Use the existing grouped menu consistently for this comparison: Tentang; Kegiatan (TE/PD/other); Karya & Pengetahuan (publications/learning); Jejak; Buku Induk. Direct-programme menu remains a separately testable hypothesis. Programme entries do not invent a shared parent for independent activities. Education catalogue keeps secondary division/angkatan filters. Related publication returns to the same canonical TE11. UI lab/editorial demonstration stay development references, outside the public opening.

Mobile header has a Menu control and visible institution. Proposed disclosure behavior: keyboard access, Escape/close, focus return and close on destination navigation; full long labels wrap. Buttons are 46px tall. No hover-only navigation, horizontal scroller, carousel or new search engine. These are requirements for later implementation, not tested behavior in this PDF.

Identity, purpose and actions precede photos at 390/320. A uses a full collective image below introduction. B pairs the native portrait photo with compact case text; it does not take a wide crop that discards the map. Desktop A uses text/media columns; B uses a full-width identity band above a practice-story row. Programmes become rows; activity metadata stacks; publication entries stack; history retains a full-frame photo. Source/HOLD/version/UI-lab notes belong to the review layer, not public chrome.

## Preliminary component responsibilities

| Layer | Proposed role | Shared versus specific |
| --- | --- | --- |
| Shell | InstitutionalHeader/Footer; separate DevelopmentReviewShell | Shared identity/nav behavior; development shell excluded from public UI |
| Sections | IdentityOpening, ProgrammeDiscovery, EducationOverview, ActivitySelection, PublicationSelection, HistoryPreview | Stable content responsibilities; homepage A collective/B practice-case placement stays deliberate page composition |
| Content patterns | ProgrammeEntry, ActivityPreview, PublicationPreview, DocumentaryMedia | Shared canonical link/state/sparse-field rules; media derivatives/alt/caption/credit/crop governed centrally |
| Primitives | Link/button, headings, metadata/status/date, disclosure, media caption | Equivalent purpose shares behavior; focus/reduced motion/long labels defined in later visual/implementation steps |

TinggalJalan informs shell/section/UI separation and intentional responsive media. Do not copy its sales, pricing, ratings or booking funnel. Existing matching components can be adapted later; no new components or tokens are written now. Avoid a generic layout engine or separate abstraction for every homepage row.
