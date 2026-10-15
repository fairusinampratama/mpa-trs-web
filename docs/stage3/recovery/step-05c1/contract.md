# Canonical contract — validated frontend responsibility

`prototype/src/domain/contract.ts` defines the framework-independent contract; `records.ts` is the sole authored registry. `validate.ts` checks it and provides relationship/date/media queries. `project.ts` explicitly selects compatibility fields and computes reverse indexes. `index.ts` validates once and exports the registry and preview. `activity-values.ts` / `work-values.ts` contain shared value and older projection vocabulary; legacy model files retain consumer validation/filter helpers, not a second data store.

## Responsibilities and minimum content

| Responsibility | Required | Optional / constraints |
| --- | --- | --- |
| Activity | Stable ID, title, summary, classification, execution state, depth, sources, date/place claims, editorial and prototype-publication scope | Programme, edition, multiple fields/cohorts, period assertions, chapters, standard-based learning, material references and rich expedition narrative. No compulsory parent, field, cohort or location. |
| Programme / edition | Distinct stable IDs; edition has programme ID and edition label | One programme→many editions; edition→activities may be plural. Current TE examples each have one; no one-to-one constraint imposed. PD cohort is not an invented edition entity. |
| Division / cohort / period | Stable contextual identity and label; period has source uses | Activities may reference several fields/cohorts; period assertions are scoped observations, not universal ownership. No inferred Roman-numeral chronological sorting. |
| Work | Independent stable ID/title/type/summary, evidence, dates, editorial scope, original-artifact state and availability | Author/date/body/resource topics/announcement dates absent when unknown. `sections` are approved editorial summaries, never a slot for restricted manuscripts. Periodical type justified by Summit Attack, not treated as a teaching deck. |
| History entry | Own stable ID/title/kind/summary/source/date assertions | Links to many activities/works/programmes. Selected narrative evidence, not automatically every activity or continuous annual chronology. |
| Source / use | Stable source identity, public label/kind, custody/access/acceptance; use has source ID and safe section/page locator | Optional claim key. Private original location, roster and document body are not fields in this public-safe registry. One source↔many records and many sources↔one record. |
| Media asset / usage | Asset identity, reviewed context, source uses, separate creator-rights/privacy/credit states; usage references asset+record+role+intended website use | Same asset may have multiple usages with independent institutional/use clearance. No source URL, original or derivative in current dataset. Cleared metadata is eligibility, not proof a file was deployed. |
| Synthetic member | Test ID, `DEMO.*.TRS`, synthetic=true, name | No real-member import or generic personal-record type; extra contact/medical/status fields rejected. Demo projection separate from institutional content. |

## Dates, location assertions and uncertainty

Date values support exact day, exact range, month, year, approximate precision and unknown. Each assertion records its role (execution/planned/publication/milestone/reported release) and evidence. Public presentation has a label and optional selected assertion ID. Multiple conflicting execution assertions require `unresolved`; selecting the report's primary span does not reconcile it. Invalid calendar dates, reverse ranges and broken selections fail validation. Journey dates use this same contract.

Places retain separate sourced assertions and a deliberately chosen broad/omitted public presentation. TE11 displays Kalimantan while retaining conflicting province wording. ORAD27/LH27 do not display a guessed corrected place. GH29 does not grow an inferred regency. BATAFIA30's ambiguous forum statement is retained as a scoped date issue rather than converted to an exact date.

Legacy adapters emit precise dates only for known selected non-approximate values. Undated history stays canonical and appears in diagnostics; the existing chronological consumer omits it until Step5C-2 defines its public placement. Approximate activity dates likewise require the later consumer migration for full nuanced display. No current real record is lost through these limitations.

## Relationships: one authored direction, derived reverse views

`relations` alone owns work↔activity, history↔activity/work and activity↔activity edges. Every edge has stable ID, role and source use. Derived compatibility arrays are never edited independently.

- TE11 has four separately identified related works. Their own publication dates do not change expedition execution dates.
- Kawi29→GH29/RC29 is educational context, not participant matching.
- RC26→RC27 and Caving26→Caving27 mean **shared departure**, not identical activity or inherited results.
- `documents`, `discusses`, `produced-from` and `context` express different roles. Multi-activity works are contract-tested with isolated synthetic variations; the corpus does not invent a real multi-activity work to satisfy a cardinality.

## Independent dimensions and publication boundary

Source access/verification, report ratification, activity execution, editorial readiness, institutional authority/scope, actual preview projection, original availability and media clearance remain separate. Owner-designated authority and this milestone's authorization permit public-safe prototype metadata/editorial summaries; they do not approve private originals or photographs. All original reproduction is `not-authorized` in this contract revision. Withheld/withdrawn content drops out of preview views and reverse indexes without deleting its canonical identity/evidence.

A media usage resolves only when creator rights, privacy, credit, institutional use and final clearance all pass and an approved public derivative path exists. Current five references fail that conjunction and emit **zero images**. Static artifact validation independently rejects all unapproved binary/document payloads. It is not weakened by domain relationships.

## Validation and API limits

Global ID uniqueness, per-programme edition-label uniqueness, duplicate edge tuples, all cross-references, source uses, date selections and media contexts are checked. Private locator/credential patterns and forbidden personal/original fields fail before export. This is controlled, typed source authoring, not a secure arbitrary-JSON upload API or exhaustive sensitive-text classifier. Future backend validation, authorization, restricted custody and published snapshots still require Stage4 design and testing.
