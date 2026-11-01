# Step5B-2 — Pemantapan Divisi and independent activities

15 October2026. Owner accepts Step5B-1 and authorizes this bounded implementation only. Result awaits owner implementation review; no Step5B-3/5C/6 or Stage4 authorization.

## Implemented journey

Homepage → Pemantapan Divisi → field/filter → activity → filtered catalogue return. Homepage → other activities → BATAFIA or Kawi → catalogue return.

The PD programme is introduced before its five fields and six documented activities. Native division/cohort filters derive results from the registry, announce counts, expose reset/empty states and preserve their context in hash-query URLs. Detail links carry that presentation context without changing canonical record IDs. Browser reload/back links retain it; invalid facets normalize to supported values. An early chapter-jump action avoids forcing familiar visitors through all field descriptions. Rapid changes merge against the latest URL rather than stale render state.

One ActivityDetail renders all six PDs, BATAFIA, Kawi and the pre-existing synthetic workshop. Optional chapters, learning scope, material references, uncertainties, media and relationships come from records; no activity-ID-specific JSX branches. GH/RC XXIX have documented learning/context chapters; GH XXVI/ORAD/LH/Caving remain sparse. BATAFIA/Kawi carry only source-supported context. General activities distinguishes independent historical records, programme gateways and explicitly synthetic examples, without fabricating programme parents.

## Source and content

Original LPJ Pengurus2025 was reopened: physical pp78–80 (printed72–74) document learning standards; pp91–93 (85–87) document PD XXIX; pp94–96 (88–90) BATAFIA; pp96–97 (90–91) Kawi. LPJ Pengurus2023–2024 physical pp52–53 documents GH XXVI. Only new factual paraphrases enter public source. No names/rosters, finances, original report downloads, medical data or private ceremony detail were imported.

GH XXVI's date precision is refined from August2023 to the source's19–26 August2023. Other canonical IDs/dates/locations are retained. GH XXIX's incomplete regency, BATAFIA forum dates and Kawi's “without reporting” source wording remain explicit. Educational standards are historical documented scope, not proof of technical attainment, certification, scientific results, present curriculum or report acceptance.

## Structured content and compatibility

- `activity-model.ts`: candidate frontend input/record types, compatibility view, safe-ID/reference validation and filtering helpers. Domain types are independent of React. No database/API/final schema.
- `content.ts`: sole authored dataset for the scoped records and small programme/division/source/media registries. `pdRecords`, `archivalActivities` and `standalone` are derived views, preserving existing homepage/lab/historical imports without a competing store.
- `ActivityContent.tsx`: in-memory context. Public entry uses the approved registry; isolated test entries can append records without changing page components. No URL/API/end-user source injection or persistent institutional operations.
- `ActivityExperience.tsx`: PD catalogue, activities catalogue and generic detail; existing shell, dated previews/metadata, documentary media, breadcrumbs, source disclosures and links are reused. Public programme copy and control labels remain deliberate interface text; activity narrative lives in the dataset.
- `activity.css`: scoped supporting-page composition using existing tokens. The existing editorial reading rule now also names `.ds-reading`; TE appearance stays unchanged. No new palette/font system.

The historical ArchiveDesigns PD functions remain non-active experiment evidence. New public routes no longer call them. The accepted homepage and TE implementation were not redesigned.

## Proof and review

`tools/activity-test-fixtures.ts` appends three clearly synthetic records only in isolated tests: PD with newDEMO cohort, PD without cohort, independent workshop without programme/division/cohort/date/media. `browser_activity_fixture.cjs` renders the existing App with those appended records and checks catalogue discovery, derived cohort/none options, generic detail URLs/reload and sparse output at1366/390/320. It writes its temporary entry outside public source. These additions are absent from the public bundle/catalogues; only the pre-existing labelled workshop demonstration remains public.

The existing Pages Python test discovery now invokes six Node record-contract tests through a small wrapper. No publishing workflow or security validator was relaxed. See source-and-data-findings.md and verification-and-handoff.md. Actual deployed SHA/run and live evidence are recorded after publication, not inferred from the build.

## Media boundary

Reviewed assets07(GH),10(RC),13(Kawi) and16(BATAFIA) remain HOLD. Public output has no photos/emblem: GH/RC use compact factual media context; optional Kawi/BATAFIA media omit cleanly. Private same-App review uses the actual derivatives, native uncropped frames and explicit unknown-credit captions. Exact source locators, permission notes and image-bearing artifacts stay outside GitHub. Creator/licence/credit, recognizable-person/privacy basis and final asset/use approval remain unresolved; general owner institutional authority is settled.

Stop after Step5B-2 owner review. Full publications/knowledge migration and the later cross-site data-contract/content-population checkpoint require separate authorization. Production, workflows, hosting, secrets, main and PR13 merge remain untouched.

## Delivered preview

Source `162364b80d771fc5df5026ceb0727f62bc4a36f5` is live. Pages38675527214 and source CI38675532458 succeeded. [Deployment, browser evidence and review links](deployment.md) distinguish served source from any later documentation-only head. Awaiting owner Step5B-2 acceptance; no later step is underway.
