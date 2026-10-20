# Content audit and candidate data-contract findings

These findings are inputs to a later dedicated Stage3 data-contract checkpoint. They are not SQL, Eloquent, API, Filament or final cardinality decisions.

## Audit disposition

| Existing issue | Bounded response |
| --- | --- |
| Metadata in content.ts but PD narratives/conditions inside ArchiveDesigns JSX | Scoped narratives now typed chapter/learning/uncertainty records; one generic ActivityDetail. Historical functions retained as non-active evidence. |
| Unused PDBrowse had fixed fields/cohorts; active layouts also mixed content and visual directions | Removed dead route-local PD implementation; programme/five fields use shared foundation. Cohort options come from actual records, fields from institutional registry. |
| ActivityFixture was declared in an activity card, lifecycle in a UI label | Domain types now live in activity-model.ts; UI re-exports preserve existing imports. |
| Activity metadata labels duplicated programme/cohort strings | Authored programme/division/cohort relationships use IDs; a single compatibility projection produces existing labels/date/href for homepage/lab/historical consumers. |
| Independent pages were generic placeholder explanations | Their actual sourced context, dates/conflicts, optional chapters/media and canonical return render from records; no compulsory programme. |
| TE11 story still has activity-specific JSX; homepage has deliberate editorial selections; publications have flat metadata | Identified, deliberately not migrated here. Later consolidation must cover them without redesigning accepted journeys or treating this scoped contract as universal. |

## Emerging entities and relationships

| Candidate | Current evidence / likely relationship | Open consolidation question |
| --- | --- | --- |
| Activity | Stable ID independent of title, route, date and cohort. Required identity/summary/lifecycle/source basis in this frontend. Rich/basic is an editorial hint, not report/publication status. | Final minimum publication fields and supported lifecycle vocabulary. |
| Programme | Optional activity association; PD recurring identity separate from each implementation. Independent records omit it. Current prototype authors0..1 programme reference, not a universal parent constraint. | Multi-context/multi-programme associations and editor roles, if source evidence warrants. No `(programme,division,cohort)` uniqueness imposed. |
| Division | Five canonical IDs/names/aliases; activity supports0..many IDs. Catalogue discovery has five fields even when a subset has records. Unknown fields can remain absent rather than fabricated. | Classification terminology/aliases and multi-field editorial semantics. |
| Cohort | Optional0..many contextual IDs. Filter options derive from referenced IDs; a missing-cohort option appears only when relevant. | A future cohort entity/label/date authority; do not infer chronological order solely from Roman labels. |
| Content chapter / learning scope | Optional ordered data with source references. Learning targets are distinguished verbally from verified outcomes. Sparse records need no chapters or gallery. | Shared block vocabulary across TE, independent stories, publications/history; avoid speculative page-builder engine. |
| Date assertion | Optional label, precision and known ISO range; canonical dates and separate source conflicts coexist. No fake date default. GH26 precision increased only after reading original pp52–53. | Partial/approximate dates, multiple assertions, reconciliation/version history across all content. |
| Source / source use | Stable public-safe source ID plus per-use locator; one source supports many records and each record may use several sources. Private original locator/custody stays outside public projection. | Fine-grained claim-to-source support and revision model; public/private source exports. |
| Media | Own ID, activity relationship, presentation role and clearance state. Reviewed source access/creator status are not public-use authority. No binary/source URL in public record. | Many-to-many reuse, use/crop-specific licence/consent/credit/withdrawal and responsive derivatives before publication. |
| Publication | Optional ID references, independent canonical works. No new PD publication invented to fill an empty section. | Role-aware many-to-many Activity↔Work relationships consolidated with TE and independent works later. |
| Editorial / report states | Historical execution, source-checked text, review-draft readiness, prototype visibility and report handling are separate. All scoped media remain HOLD. | Actual draft/review/publish/correct/withdraw lifecycle and published snapshots; future backend approval separate. |
| Discovery | Native field/cohort facets, intersection/result counts, empty/reset and URL state. Same-ID related activities by documented field or explicit sourced context. | Cross-site keyword search, pagination and broader filters when actual content volume supports them. |

## Source assertions / uncertainty map

- Programme purpose and stages: LPJ2023–2024 physical52–53; LPJ2025 physical91–93. Stages are a documented educational process, not invented per-activity day logs.
- GH XXVI: physical52 states19–26 August2023 / Gunung Slamet. Current record now carries exact range; no new technical story.
- GH XXIX: LPJ2025 physical92 date1–8 August2025 / Gunung Lawu. Regency line is incomplete. Photo review supports visible map/compass practice; not full curriculum attainment.
- RC XXIX: physical92 date8–15 August2025 / Tebing Siung, Gunung Kidul. Physical78–79 supports learning scope. No route grade, rescue success, safety certification or completed technical map claimed.
- ORAD/LH/Caving: physical92–93 dates and places retained. Their detailed results are not populated from standard targets.
- BATAFIA XXX: physical95 field24–26 October2025, Pegunungan Kawi; forum month ambiguity retained. Route18→16km is source-attributed. No current recruitment announcement.
- Kawi XXIX: physical96–97 date21–23 November2025 and institutional transition purpose. “Without reporting” does not justify an invented full LPJ or individual membership decisions. Related PD links are contextual, not matched participant identities.

Exact private source/media locators and rights notes are excluded here. Readable source content was examined, not inferred from filenames.
