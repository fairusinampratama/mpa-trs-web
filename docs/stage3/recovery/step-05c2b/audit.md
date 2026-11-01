# Consumer integration audit

Baseline branch e4b1e5415c71dc6c087dd5294f78a8b11056f7b4; accepted deployed application b2fb34ff300fb41692dd2fe927b7688281ce24b5. Clean local tree and remote head agree.

| Gap | Concrete evidence | Correction |
| --- | --- | --- |
| Split consumer injection | App injects activity/institution/media separately; ExpeditionExperience imports global expeditionRecords and canonicalRegistry | One canonical registry input derives all public views and media context; legacy test adapters remain bounded |
| Lost dates/history | projectPreview uses selectedDate, which deliberately drops approximate dates; history flatMap drops unknown dates | Preserve presentation labels and all history entries; canonical date display and undated grouping |
| Relationship semantics lost | activity related IDs are outgoing-only; same-field suggestions mixed with sourced relations; PublicationDetail shows all IDs but no roles | Derive visible edges in both directions, keep role labels and same-field suggestions separate |
| Static expedition features | TE catalogue and homepage module constants survive withdrawal; sparse expedition omits related works | Curated IDs resolve at render time; absent/withdrawn records omit features; shared related discovery on sparse records |
| Search context | WorksCatalogue local state resets on detail/return; PD already uses hash facets | Small URL query helpers preserve work search/type/knowledge return context; retain PD behavior |
| Media role mismatch | useDocumentaryAsset resolves first record/placement without checking requested role | Explicit compatible role guard; no inferred permission from links |

Legitimate choices retained: curated homepage sequence/features, rich TE11 narrative, compact sparse records, metadata-only works, synthetic announcements/members separated from institutional records, compatibility display types for established component anatomy. No new registry/schema/router/theme.
