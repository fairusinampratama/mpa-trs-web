import test from "node:test";
import assert from "node:assert/strict";
import { canonicalRegistry as base } from "../src/domain/index.ts";
import {
  validateRegistry,
  validateDatedClaim,
  validateDateValue,
  qualityReport,
  relatedWorks,
  relatedActivities,
  resolvePublicMedia,
  historicalOrder,
  selectedDate,
} from "../src/domain/validate.ts";
import { projectPreview } from "../src/domain/project.ts";
const copy = () => structuredClone(base),
  uses = [
    {
      sourceId: "synthetic-fixture",
      locator: "isolated contract test, not institutional history",
    },
  ];
const unknown = () => ({
  presentation: { label: "Tanggal belum diketahui" },
  assertions: [],
  reconciliation: "unknown",
});
function activity(id = "contract-activity") {
  return {
    id,
    title: "Kontrak sintetis — bukan kegiatan nyata",
    summary: "Isolated test fixture.",
    kind: "workshop",
    state: "unknown",
    depth: "basic",
    dates: unknown(),
    places: { assertions: [], reconciliation: "unknown" },
    sourceUses: uses,
    publication: {
      institutionalAuthority: "owner-designated",
      scope: "prototype-metadata-and-editorial-summary",
      approval: "prototype-scope-authorized",
      website: "preview",
      originalReproduction: "not-authorized",
    },
    editorial: {
      verification: "synthetic",
      readiness: "review-draft",
      website: "prototype",
    },
  };
}
function work(id = "contract-work") {
  return {
    id,
    title: "Karya uji kontrak",
    summary: "Isolated synthetic work.",
    kind: "resource",
    dates: unknown(),
    sourceUses: uses,
    evidence: ["Synthetic test"],
    publication: {
      institutionalAuthority: "owner-designated",
      scope: "prototype-metadata-and-editorial-summary",
      approval: "prototype-scope-authorized",
      website: "preview",
      originalReproduction: "not-authorized",
    },
    editorial: {
      verification: "synthetic",
      readiness: "review-draft",
      website: "prototype",
    },
    originalState: "synthetic-example",
    availability: {
      state: "metadata-only",
      title: "Metadata only",
      explanation: "No original approved.",
    },
  };
}
const edge = (id, kind, fromId, toId, role = "discusses") => ({
  id,
  kind,
  fromId,
  toId,
  role,
  sourceUses: uses,
});
test("01 new TE edition uses data and existing generic detail projection", () => {
  const r = copy(),
    a = activity("te-contract");
  a.kind = "expedition";
  a.programId = "te";
  a.editionId = "contract-edition";
  r.activities.push(a);
  r.editions.push({ id: "contract-edition", programmeId: "te", label: "DEMO" });
  const p = projectPreview(r);
  const e = p.expeditionRecords.find((e) => e.id === a.id);
  assert.equal(e.href, "#/expedition/te-contract");
  assert.equal(e.edition, "DEMO");
  assert.equal(e.depth, "basic");
  assert.equal(r.activities.find((a) => a.id === e.id).narrative, undefined);
});
test("02 new PD classifies and projects without compulsory cohort", () => {
  const r = copy(),
    a = activity();
  a.programId = "pd";
  a.divisionIds = ["GH", "RC"];
  r.activities.push(a);
  const p = projectPreview(r),
    row = p.activityRecords.find((x) => x.id === a.id);
  assert.equal(row.programId, "pd");
  assert.deepEqual(row.divisionIds, ["GH", "RC"]);
  assert.equal(row.cohort, undefined);
  assert.equal(row.href, "#/activity/contract-activity");
});
test("03 independent activity has no invented parent, date or media", () => {
  const r = copy();
  r.activities.push(activity());
  const a = projectPreview(r).activityRecords.find(
    (x) => x.id === "contract-activity",
  );
  for (const k of [
    "programId",
    "cohortIds",
    "when",
    "location",
    "chapters",
    "learning",
  ])
    assert.equal(a[k], undefined);
  assert.deepEqual(a.mediaIds, []);
});
test("04 several independent works may document one activity", () => {
  assert.equal(relatedWorks(base, "te11").length, 4);
  const p = projectPreview(base);
  assert.equal(
    p.publicWorks.filter((w) => w.relatedActivityIds.includes("te11")).length,
    4,
  );
});
test("05 one work relates to several activities, reverse indexes derived", () => {
  const r = copy();
  r.works.push(work());
  r.relations.push(
    edge("edge-one", "work-activity", "contract-work", "te11", "documents"),
    edge("edge-two", "work-activity", "contract-work", "gh29", "discusses"),
  );
  validateRegistry(r);
  assert.equal(r.works.filter((w) => w.id === "contract-work").length, 1);
  assert.deepEqual(
    relatedActivities(r, "contract-work").map((a) => a.id),
    ["gh29", "te11"],
  );
  const p = projectPreview(r);
  assert(
    p.activityRecords
      .find((a) => a.id === "gh29")
      .relatedPublicationIds.includes("contract-work"),
  );
  assert.deepEqual(
    p.publicWorks.find((w) => w.id === "contract-work").relatedActivityIds,
    ["te11", "gh29"],
  );
});
test("06 independent publication has no fabricated activity", () => {
  const r = copy();
  r.works.push(work());
  const w = projectPreview(r).publicWorks.find((w) => w.id === "contract-work");
  assert.equal(w.related, undefined);
  assert.deepEqual(w.relatedActivityIds, []);
});
test("07 restricted metadata contains no original manuscript or fake download", () => {
  const p = projectPreview(base),
    w = p.publicWorks.find((w) => w.id === "sacred-gatekeeper");
  assert.equal(w.availability.state, "restricted");
  assert(!("manuscript" in w));
  assert(!("attachments" in w));
  const r = copy();
  r.works.push({
    ...work(),
    availability: {
      state: "restricted",
      title: "Held",
      explanation: "No manuscript.",
    },
  });
  assert.equal(projectPreview(r).publicWorks.at(-1).sections, undefined);
  r.works.at(-1).manuscript = "private";
  assert.throws(() => projectPreview(r), /Private field/);
});
test("08 sparse has no fake narrative/gallery/publication sections", () => {
  const p = projectPreview(base),
    a = p.activityRecords.find((a) => a.id === "orad26"),
    te = p.expeditionRecords.find((a) => a.id === "te10");
  assert.equal(a.chapters, undefined);
  assert.equal(a.learning, undefined);
  assert.deepEqual(a.mediaIds, []);
  assert.deepEqual(a.relatedPublicationIds, []);
  assert.equal(te.depth, "basic");
  assert.equal(
    base.activities.find((a) => a.id === "te10").narrative,
    undefined,
  );
});
test("09 sourced history additions sort by date, unknown dates last", () => {
  const r = copy(),
    h = {
      ...structuredClone(r.history[0]),
      id: "history-contract",
      dates: {
        presentation: { label: "2001", assertionId: "primary" },
        assertions: [
          {
            id: "primary",
            role: "milestone",
            value: { precision: "year", start: "2001" },
            sourceUses: uses,
          },
        ],
        reconciliation: "single-source",
      },
    };
  r.history.push(h);
  assert.equal(historicalOrder(validateRegistry(r))[1].id, "history-contract");
  r.history.push({ ...h, id: "undated-history", dates: unknown() });
  assert.equal(historicalOrder(r).at(-1).id, "undated-history");
  assert(
    !projectPreview(r).historyInputs.some((h) => h.id === "undated-history"),
  );
  assert(qualityReport(r).some((d) => d.recordId === "undated-history"));
});
test("10 unknown, month, year, approximate, conflicting and impossible dates", () => {
  for (const v of [
    { precision: "unknown" },
    { precision: "year", start: "2022" },
    { precision: "month", start: "2022-12" },
    { precision: "day", start: "2022-12-20", approximate: true },
  ])
    validateDateValue(v);
  assert.equal(
    selectedDate({
      ...unknown(),
      presentation: { label: "Sekitar 2022", assertionId: "a" },
      assertions: [
        {
          id: "a",
          role: "execution",
          value: { precision: "year", start: "2022", approximate: true },
          sourceUses: uses,
        },
      ],
    }),
    undefined,
  );
  for (const v of [
    { precision: "day", start: "2025-02-30" },
    { precision: "month", start: "2025-13" },
    { precision: "year", start: "22" },
    { precision: "day-range", start: "2025-03-02", end: "2025-03-01" },
    { precision: "unknown", start: "2025" },
  ])
    assert.throws(() => validateDateValue(v));
  const d = structuredClone(base.activities.find((a) => a.id === "te11").dates);
  assert.equal(d.assertions[1].value.end, "2024-12-07");
  validateDatedClaim(d, () => {});
  d.reconciliation = "corroborated";
  assert.throws(() => validateDatedClaim(d, () => {}), /Conflicting/);
});
test("11 duplicate and invalid canonical identities, including cross-domain, fail", () => {
  for (const mutate of [
    (r) => r.activities.push({ ...activity(), id: "../bad" }),
    (r) => r.works.push({ ...work(), id: "te11" }),
    (r) => r.sources.push(structuredClone(r.sources[0])),
    (r) =>
      r.editions.push({ id: "new-edition", programmeId: "te", label: "11" }),
  ]) {
    const r = copy();
    mutate(r);
    assert.throws(() => validateRegistry(r));
  }
});
test("12 broken source/classification/relation/media/selected-date references fail", () => {
  for (const mutate of [
    (r) => (r.activities[0].programId = "missing"),
    (r) => (r.activities[0].divisionIds = ["OTHER"]),
    (r) => (r.activities[0].cohortIds = ["MISSING"]),
    (r) => (r.activities[0].sourceUses[0].sourceId = "missing"),
    (r) => (r.relations[0].toId = "missing"),
    (r) => (r.mediaUses[0].assetId = "missing"),
    (r) => (r.activities[0].dates.presentation.assertionId = "missing"),
    (r) => r.relations.push({ ...r.relations[0], id: "duplicate-edge" }),
  ]) {
    const r = copy();
    mutate(r);
    assert.throws(() => validateRegistry(r));
  }
});
test("13 synthetic members isolated, real/private records rejected", () => {
  const p = projectPreview(base);
  assert.equal(p.members, undefined);
  assert.equal(p.demoMembers.length, 3);
  assert(p.demoMembers.every((m) => m.synthetic && m.nia.startsWith("DEMO.")));
  for (const patch of [
    { synthetic: false },
    { nia: "123.TRS" },
    { email: "private" },
    { nia: "DEMO.001.TRS" },
  ]) {
    const r = copy();
    r.demoMembers.push({
      id: "member-contract",
      nia: "DEMO.004.TRS",
      name: "Test only",
      synthetic: true,
      ...patch,
    });
    assert.throws(() => projectPreview(r));
  }
});
test("14 HOLD media cannot be cleared by relations, metadata or incomplete approval", () => {
  assert.deepEqual(projectPreview(base).safeMedia, []);
  const r = copy(),
    u = r.mediaUses[0],
    a = r.media.find((a) => a.id === u.assetId);
  a.publicPath = "/media/test-approved.webp";
  u.institutionalUse = "approved";
  assert.deepEqual(resolvePublicMedia(r, u.recordId), []);
  u.clearance = "cleared";
  assert.throws(() => validateRegistry(r), /Incomplete media clearance/);
  a.rights = "permission-verified";
  a.privacy = "cleared";
  a.credit = "verified";
  validateRegistry(r);
  assert.equal(resolvePublicMedia(r, u.recordId).length, 1);
  u.clearance = "withdrawn";
  assert.deepEqual(resolvePublicMedia(r, u.recordId), []);
});
test("15 no competing relationship/date/media ownership remains", () => {
  for (const a of base.activities)
    for (const field of [
      "when",
      "location",
      "relatedActivityIds",
      "relatedPublicationIds",
      "mediaIds",
    ])
      assert(!Object.hasOwn(a, field));
  for (const w of base.works)
    for (const field of ["when", "relatedActivityIds"])
      assert(!Object.hasOwn(w, field));
  const r = copy();
  r.activities[0].relatedActivityIds = ["te11"];
  assert.throws(() => validateRegistry(r), /Competing/);
});
test("16 same expedition survives cross-period non-execution and later completion", () => {
  const a = base.activities.find((a) => a.id === "te11");
  assert.equal(a.state, "historical");
  assert.deepEqual(
    a.periodAssertions.map((p) => p.state),
    ["not-executed-in-period", "execution-reported"],
  );
  assert.equal(base.activities.filter((a) => a.id === "te11").length, 1);
});
test("17 ambiguous places and incomplete regency are not auto-corrected", () => {
  const p = projectPreview(base);
  for (const id of ["orad27", "lh27"]) {
    const a = base.activities.find((a) => a.id === id);
    assert.equal(a.places.reconciliation, "unresolved");
    assert.equal(
      p.activityRecords.find((a) => a.id === id).location,
      undefined,
    );
    assert(a.places.assertions[0].label);
  }
  assert.equal(
    base.activities.find((a) => a.id === "gh29").places.reconciliation,
    "incomplete",
  );
});
test("18 private locator injection fails before compatibility export", () => {
  for (const mutate of [
    (r) => (r.sources[0].privateLocator = "private"),
    (r) => (r.sources[0].label = "https://drive.google.com/private"),
    (r) => (r.activities[0].phone = "private"),
  ]) {
    const r = copy();
    mutate(r);
    assert.throws(() => projectPreview(r), /Private/);
  }
});
test("19 rich TE11 story retained in data, not expedition-specific JSX", () => {
  const a = base.activities.find((a) => a.id === "te11");
  assert.equal(a.narrative.journey.length, 6);
  assert.equal(a.narrative.notes.length, 2);
  assert.equal(a.narrative.context.paragraphs.length, 2);
  assert.equal(a.narrative.journey[3].title, "Menjalani jalur Bukit Raya");
});

test("20 withdrawal removes record and related indexes without deleting identity or source", () => {
  const r = copy();
  r.works.find((w) => w.id === "sacred-gatekeeper").publication.website =
    "withdrawn";
  const p = projectPreview(r);
  assert(!p.publicWorks.some((w) => w.id === "sacred-gatekeeper"));
  assert(r.works.some((w) => w.id === "sacred-gatekeeper"));
  assert(
    !p.activityRecords.some((a) =>
      a.relatedPublicationIds.includes("sacred-gatekeeper"),
    ),
  );
});

test("21 magazine identity is distinct from educational resource and no PDF is invented", () => {
  const w = projectPreview(base).publicWorks.find(
    (w) => w.id === "summit-attack-vol4",
  );
  assert.equal(w.kind, "periodical");
  assert.equal(w.type, "Majalah");
  assert.equal(w.resource, undefined);
  assert.deepEqual(w.relatedActivityIds, []);
  assert.equal(w.availability.state, "metadata-only");
});

test("22 a synthetic-only source cannot be relabeled verified institutional history", () => {
  const r = copy(),
    a = activity();
  a.editorial.verification = "source-checked";
  r.activities.push(a);
  assert.throws(() => validateRegistry(r), /Synthetic-only/);
});

test("23 documented standards cannot be reclassified as technical achievement", () => {
  const r = copy();
  r.activities.find((a) => a.id === "gh29").learning.basis = "achievement";
  assert.throws(() => validateRegistry(r), /Learning standard/);
});

test("24 announcement expiry does not fabricate precision in legacy adapters", () => {
  const r = copy();
  const expiry = {
    presentation: { label: "2025 (synthetic)", assertionId: "a" },
    assertions: [
      {
        id: "a",
        role: "publication",
        value: { precision: "year", start: "2025" },
        sourceUses: uses,
      },
    ],
    reconciliation: "single-source",
  };
  r.works.push({
    ...work("expiry-test-work"),
    kind: "announcement",
    announcement: { audience: "isolated test", expires: expiry },
  });
  assert.equal(
    projectPreview(r).publicWorks.at(-1).announcement.expiresOn,
    undefined,
  );
  expiry.assertions[0].value = { precision: "month", start: "2025-12" };
  assert.equal(
    projectPreview(r).publicWorks.at(-1).announcement.expiresOn,
    undefined,
  );
  expiry.assertions[0].value = { precision: "day", start: "2025-12-31" };
  assert.equal(
    projectPreview(r).publicWorks.at(-1).announcement.expiresOn,
    "2025-12-31",
  );
  expiry.assertions[0].value.approximate = true;
  assert.equal(
    projectPreview(r).publicWorks.at(-1).announcement.expiresOn,
    undefined,
  );
});

test("25 changed plans remain distinct from conflicting actual execution assertions", () => {
  for (const id of ["te11", "batafia28", "batafia29"]) {
    const a = base.activities.find((a) => a.id === id);
    assert(a.dates.assertions.some((d) => d.role === "planned"));
    assert.equal(
      a.dates.assertions.find((d) => d.id === a.dates.presentation.assertionId)
        .role,
      "execution",
    );
    assert.equal(a.state, "historical");
  }
  assert.equal(
    base.activities.find((a) => a.id === "batafia28").dates.reconciliation,
    "single-source",
  );
  assert.equal(
    base.activities.find((a) => a.id === "te11").dates.reconciliation,
    "unresolved",
  );
});
