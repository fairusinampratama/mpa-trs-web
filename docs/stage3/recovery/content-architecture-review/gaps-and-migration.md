# Part B — Current gaps; bounded migration proposal

Inspected current source at8647627: `domain/contract.ts`, `activity-values.ts`, `records.ts`, `read.ts`, `project.ts`, the expedition/activity/institutional experiences and Step5C1/5C2B handoffs. Passing tests validate present rules, not semantic completeness.

| Current evidence | Sufficient today | Incomplete for admin/public authoring | Proposed change, not applied |
| --- | --- | --- | --- |
| `programmes` contains only pd/te; `editions` onlyte10–12 | Stable programme and edition references | BATAFIA27–30 are `basic-education` activities without series identity | Add BATAFIA programme, map existing IDs to occurrences; preserve detail URLs |
| PD activities have `programId`, `divisionIds`, `cohortIds` | Division/cohort discovery, separate GH/RC identities | No explicit cycle owner for shared purpose/preparation; cohort is being used as grouping proxy | Sourced PDcycle occurrence + child execution relation, no universal cohort parent |
| `ExpeditionNarrative.journey` has dates/body/evidence | TE11 richness is already data-driven | Specialized expedition-only grammar; journey has no local stable IDs; sessions and phase places/status absent | Common bounded phase/session value with local IDs; expedition remains its own public composition |
| Generic activity `chapters` and `learning` | Sparse optional sections, source-aware body | Learning basis fixed to standard-not-achievement; cannot separately author actual applications/results | Keep standards; add separately evidenced application/observation/result tools |
| Edition is label/programme only | Avoids duplicate execution facts | Cannot own genuine PD cycle context, but adding fields in both edition/activity risks two truth sources | One occurrence editing surface; decide physical edition storage later |
| `depth: basic/rich` and programme-specific renderer choice | Useful compatibility display adapter | Arbitrary manual depth can contradict available sections | New read model derives section presence; explicit editorial feature choice only where meaningful |
| Date/place assertions and role-aware relationships | Preserve disputes, partial dates and independent works | Parent/phase date scope and correction dependencies not represented | Reuse assertions, attach to precise scope; no synthetic all-event date conflict |
| PublicationBoundary is prototype-only; original reproduction unauthorized | Correct current release boundary | Not real approved public CMS revision state machine or author permissions | Later revision/publication capability design; never widen old prototype approval automatically |
| Six media assets, eleven exact usages,17WebPs | Fail-closed contextual permissions and withdrawal | A proposed new cycle page or phase is not an approved placement | Retain all existing IDs and permissions; separate future use approval |

## Migration sequence after owner acceptance only

1. Inventory/export current IDs, hashes, aliases and approved public projections. Capture present routes and relationship/media tests. No destructive import.
2. Introduce proposed concepts behind adapters. Preserve `te10/11/12`, `batafia27/28/29/30`, all PD/division IDs, work IDs and eleven uses. Map TE edition references to one occurrence without merging distinct records. Assign new PDcycle IDs only where evidence supports them.
3. Review PD26–29 memberships individually. Do not synthesize LH26 or executed Caving28. A “not documented” cycle slot is display context, not a historical activity. Resolve parent versus shared-departure relations independently.
4. Map TE11 journey into stable phased content without deleting narrative/evidence. Map BATAFIA forum/field assertions by scope. Keep report conflicts and institutional source versions.
5. Build new admin/public read models in a separately authorized checkpoint. Existing consumers continue through read-only compatibility projections until parity tests pass. No dual authored arrays.
6. Review private-to-public projections and exact media scopes before any new public composition. Preview an approved revision, perform explicit publication, retain rollback snapshot and alias paths.

Required regression examples: unchanged TE11↔all works; independent work; PD26 spanningyears; RC26/RC27 distinct despite shared departure; sparseTE12; uncertainBATAFIAforum; standards vsGH26 application; parentwithdrawal and childnavigation; one-use vsglobal-mediawithdrawal; old URLs/bookmarks; no real members or private originals. Adapters may remain for display types, but not for independently maintained facts.

## Candidate database implications, not tables to implement

Programme has many occurrences; occurrence may have zero/one structural parent and zero/many child executions. Occurrence has ordered embedded phases/sessions and many evidence assertions; division/cohort/period associations remain optional many-to-many where evidenced. Work↔activity and source↔claim are many-to-many with roles. Asset→uses is one-to-many; each use has one context and one asset. Revision/published-snapshot separation supports corrections without public draft leakage.

Likely integrity constraints: stable unique IDs, no duplicate directed parent edge/cycle, sibling local-phase IDs unique, valid source versions/references, explicit relation role, date precision validation, asset/use approval tuple, optimistic revision conflict detection. Do not impose `(programme,cohort,division)` uniqueness or a fixed number of children. No SQL schema, ORM, migrations or CMS code is supplied.
