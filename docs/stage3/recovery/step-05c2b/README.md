# Step5C-2B — whole-site canonical integration

Owner accepted Step5C-1 and Step5C-2A and authorized this checkpoint only on15 October2026. Engineering continuation/verification occurred16 October2026 Jakarta time. This is an integration milestone, not final visual acceptance or backend authorization.

## Changes

- `App.registry` is the single canonical input for principal public experiences. A memoized `projectPreview` supplies existing activity/institutional consumers; the same registry supplies date, relationship and media views. The test input is in-memory only: no public query/API/storage can replace institutional data.
- TE catalogue, rich/sparse expedition pages, homepage selected records and publication/education selections resolve from that input. Features remain deliberate editorial selections; withdrawn selected records are omitted without inventing replacements.
- Role-aware `visibleRelations` derives reciprocal activity/work/history discovery from one sourced edge. Shared departures are visibly separate activity records; field suggestions remain a different section. Publication context lists all available activities, with each relationship's meaning.
- `RecordDate` preserves the canonical presentation, planned role and unresolved warning. Approximate dates have no falsely precise machine date. All history survives projection; `historyGroups` orders known dates and separates unknown dates without January1 inventions. Planned/actual assertions and scoped date issues remain discoverable.
- Publication/knowledge queries and type facets live in the existing hash query. Detail return retains context; browser back/forward and reload are tested. Independent activities have bounded keyword search/reset and contextual catalogue return. PD combined facets retain their existing route behavior.
- Media additionally checks the requested semantic role after exact record/placement resolution. Role aliases are limited to the established identity→Kawi opening. Six photographs/eleven uses/seventeen exact derivatives and HUMED credit are unchanged. No asset bytes, design tokens, CSS, workflows or production files changed.

## Evidence and limitations

See audit.md for baseline gaps, verification.md for actual gates, and deployment.md for hosted source/run/readback evidence after release. Tests add canonical data only through an isolated entry outside the public build. No bespoke record page, new data store or final SQL design is introduced.

Existing display types/providers and content.ts/institutional-data.ts remain derived compatibility adapters for established component anatomy, UI laboratory, historical demonstrations and earlier fixture tests. They contain no independently authored institutional records. Principal public defaults and new integration fixtures derive from the same canonical input.

Stop after owner acceptance of this checkpoint. Step6 aesthetic/usability evaluation and Stage4 persistence/admin engineering remain separately authorized.

## Verified deployed release

See [deployment evidence](deployment.md) for the exact source, successful Pages/CI runs, byte-identity readback and real hosted-browser results. Application source: `874c16cfc4980ad7546ecea6ef65114c4d741a76`. Awaiting owner acceptance.
