# Candidate data-contract findings — not a final schema

## Audit and implemented separation

SitePrototype previously mixed static About/Jejak blocks, flat publication fixtures, a hardcoded article page and member search presentation. Scoped content now lives in typed institutional-data.ts. Source names move into source-registry.ts, reused by activity and institutional records; no second source store. Existing content.ts publicWorks/syntheticMembers exports are compatibility projections from the same authored inputs, preserving homepage/TE/lab/historical consumers. The accepted activity model stays intact except extending source-kind vocabulary.

One PublicationDetail renders optional sections, metadata, contributor/date information, resource topics, availability, uncertainty and activity/programme references. No ID-specific JSX dispatch. Article/resource/source context share identity semantics but have purposeful anatomy. History uses a date-ordered entry pattern with sources and contextual links; institutional information uses ordered typed blocks. Members expose only the approved two fields.

| Candidate responsibility | Findings / current cardinality | Open consolidation question |
| --- | --- | --- |
| Work | Stable ID/title/kind/summary/evidence; optional byline/date/content/topics. Independent existence is valid. | Minimum fields for actual publication and conventional news; original versus website title. |
| Activity↔Work | IDs support0..many in either direction. Several existing works reference TE11; a contract test supports one work referencing TE11 and GH29. | Role, direction, source, reciprocal indexing and whether a single authored relation collection should replace dual relation fields. No one-to-one constraint. |
| Programme context | Existing programme IDs reused; optional work references, no compulsory event or programme. | Source-backed contextual versus output relationships. |
| Date assertion | Label and precision independent of normalized day/month/year/range. Unknown omitted. Date validation rejects impossible dates/reversed ranges. | Partial/approximate dates, conflicting assertions and reconciliation/versioning across TE/activity/work/history. |
| Source / use | One source supports many records; each record can use multiple sources and public-safe locators. Existing IDs reused. | Claim-level references, private locator/custody access, public projection and revision identity. |
| Body / resource | Optional editorial sections; no body required for metadata-only/restricted pages. Format/page count/topics only when known. No public attachment URL in current records. | Approved rich-body blocks, source excerpt versus original manuscript, asset-gated download and accessibility of documents. Avoid a speculative universal page builder. |
| Publication dimensions | Source verification, original-artifact state, editorial readiness, prototype website projection and document availability are distinct fields. Synthetic identification is independent of restricted/metadata-only availability. | Final draft/review/publish/correct/withdraw and published snapshot rules; media clearance/revocation handled independently. |
| Announcement | Only demonstrated synthetic notice; optional audience/effective period/expiry are typed. Unknowns are not given fake dates or active flags. | Actual expiry/stale handling, effective versus publication date and related activity; no scheduler promised. |
| History entry | Own ID/kind/date/summary/source/uncertainties; optional period label/programme/activity/work links. Ordered selected evidence, not a complete annual table. | Institutional milestone versus thematic story, genuine periods versus cohorts, source-supported change narratives; historical order with uncertain dates. |
| Institutional block | Typed ordered name/affiliation/purpose/motto/reference notes rather than current-governance assertions. | Institutional approval/version/validity and canonical emblem master, not automatic import from constitutions. |
| Minimal member projection | Stable internal fixture ID; unique synthetic NIA and name; public table has exactly two columns, no detail expansion. | Actual authorized subset, lawful basis/correction/withdrawal/custody; do not turn into operational membership registry. |
| Discovery | Shared registry feeds type/keyword catalogue and knowledge subset; synthetic examples separated. Member search stays in memory. | Cross-site indexed search/pagination and canonical return filter context if real volumes/tasks justify them. |

## Later Step5C-1 handoff (not started)

Consolidate the accepted TE records (still use legacy ActivityFixture/story data), structured PD/independent activities, this work/history model and institutional blocks. Resolve duplicate relationship authoring, common date/assertion/source/media vocabulary and minimum-publication fields through realistic fixtures and source examples. Preserve canonical IDs/routes and the approved UX. Test optional/multiple contexts rather than inventing universal required parents. Define permission-aware public projections and export/handover before final persistence design.

Do not treat frontend types as final SQL, Eloquent, API or Filament requirements. No schema, migrations, backend, ingestion pipeline, persistent editorial workflow, real member data or Step5C execution is part of5B-3.
