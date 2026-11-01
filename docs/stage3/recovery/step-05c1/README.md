# Step 5C-1 — institutional data contract and bounded population

15 October 2026. Owner accepted Step5B-3 and authorized this milestone only. Implementation is a frontend contract and source-backed preview dataset, not a database or final editorial workflow. Steps5C-2/6/Stage4 and PR13 merge remain unauthorized.

## Review the actual records

- [Populated ledger](evidence/record-ledger.md): every activity, work and history entry, with source use and verification.
- [Machine-readable dataset and quality report](evidence/dataset-report.json): date assertions, location uncertainty, contextual relations, restricted originals and media-use states.
- [Before/after audit](audit.md), [contract](contract.md), [population assessment](population.md), [database handoff and ER diagram](database-handoff.md), [verification and integration boundary](verification.md), [deployment evidence](deployment.md).

## Scope and results

Canonical authoring now lives in `prototype/src/domain/records.ts`; types, validation, relationship queries and allowlisted compatibility projections are independent of React. Former content/institutional/source files export derived views. TE11's six-part journey and documentary sections moved out of JSX into the same registry. Its generic rich renderer and the basic-edition renderer preserve accepted presentation; the TE catalogue iterates remaining editions rather than naming TE12 as its only other edition.

| Domain | Before | Now | Newly sourced |
| --- | ---: | ---: | ---: |
| Activities | 11, including one synthetic | 33, including the same synthetic | 22 |
| TE editions / activities | 2 | 3 | TE10 |
| PD activities (subset of activities) | 6 | 18 | 12 |
| Work identities | 6, including one synthetic and one prior-review resource | 7, same limitations | Summit Attack Vol.4, metadata from LPJ |
| Selected history entries | 5 | 8 | 3 sourced interpretations, not three additional activities |
| Member examples | 3 synthetic | 3 synthetic | 0 real members |

The 26 new content records are 22 activities, one work identity and three history entries. They are not 26 new independently verified events. New work metadata is source-checked against a management report; the original magazine has not been inspected. Activity sample covers 2022–2025, TE10–12, PD XXVI–XXIX and all five fields. Existing founding evidence reaches 1995; there is no invented continuous history. Six genuine work records include the design deck retained as **prior-review**, not newly verified.

## Boundaries retained

No theme/token changes, new routes, backend, persistence, real membership, original documents, HOLD photographs or unconfirmed emblem. Only public-safe summaries and metadata enter the existing preview pipeline. Operational source locators remain in their existing private custody. Documentation approval and future database choices remain separate from item/asset publication permission.

Step5C-1 ends at owner review; it does not authorize comprehensive consumer migration or final schema implementation.
