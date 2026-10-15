import type {
  InstitutionalRegistry,
  DatedClaim,
  DateValue,
  MediaAsset,
  MediaUse,
  Relationship,
} from "./contract.ts";
import type { EvidenceUse } from "./contract.ts";
export type Diagnostic = {
  level: "gap" | "conflict" | "restriction";
  recordId: string;
  field: string;
  message: string;
};
function demand(value: unknown, message: string): asserts value {
  if (!value) throw Error(message);
}
function unique(rows: readonly { id: string }[], label: string) {
  const ids = new Set<string>();
  for (const r of rows) {
    demand(
      /^[a-zA-Z][a-zA-Z0-9-]*$/.test(r.id) && !ids.has(r.id),
      "Invalid/duplicate " + label + " ID: " + r.id,
    );
    ids.add(r.id);
  }
  return ids;
}
function realDay(s: string) {
  return (
    /^\d{4}-\d{2}-\d{2}$/.test(s) &&
    Number.isFinite(Date.parse(s)) &&
    new Date(s).toISOString().slice(0, 10) === s
  );
}
export function validateDateValue(v: DateValue) {
  if (v.precision === "unknown") {
    demand(
      Object.keys(v).length === 1,
      "Unknown date must not invent precision",
    );
    return;
  }
  demand(
    ["day", "day-range", "month", "year"].includes(v.precision),
    "Invalid date precision",
  );
  const full =
    v.precision === "year"
      ? v.start + "-01-01"
      : v.precision === "month"
        ? v.start + "-01"
        : v.start;
  demand(realDay(full), "Invalid calendar date");
  demand(v.precision !== "day-range" || v.end, "Missing range end");
  demand(
    !v.end ||
      (v.precision === "day-range" && realDay(v.end) && v.start <= v.end),
    "Invalid/reversed range",
  );
}
export function validateDatedClaim(
  d: DatedClaim,
  sourceCheck: (u: EvidenceUse[]) => void,
) {
  demand(d.presentation.label.trim(), "Missing date label");
  const ids = unique(d.assertions, "date assertion");
  for (const a of d.assertions) {
    demand(
      [
        "execution",
        "planned",
        "publication",
        "milestone",
        "release-reported",
      ].includes(a.role),
      "Invalid date role",
    );
    validateDateValue(a.value);
    sourceCheck(a.sourceUses);
  }
  demand(
    !d.presentation.assertionId || ids.has(d.presentation.assertionId),
    "Broken selected date assertion",
  );
  demand(
    d.assertions.length > 0 || d.reconciliation === "unknown",
    "Missing date assertions",
  );
  if (d.assertions.filter((a) => a.role === "execution").length > 1) {
    const values = new Set(
      d.assertions
        .filter((a) => a.role === "execution")
        .map((a) => JSON.stringify(a.value)),
    );
    demand(
      values.size <= 1 || d.reconciliation === "unresolved",
      "Conflicting execution assertions require review",
    );
  }
}
export function mediaPublishable(asset: MediaAsset, use: MediaUse) {
  return (
    asset.rights === "permission-verified" &&
    asset.privacy === "cleared" &&
    asset.credit === "verified" &&
    use.institutionalUse === "approved" &&
    use.clearance === "cleared" &&
    !!asset.publicPath
  );
}
export function resolvePublicMedia(r: InstitutionalRegistry, recordId: string) {
  return r.mediaUses
    .filter((u) => u.recordId === recordId)
    .flatMap((u) => {
      const a = r.media.find((a) => a.id === u.assetId);
      return a && mediaPublishable(a, u)
        ? [{ id: a.id, role: u.role, path: a.publicPath!, title: a.title }]
        : [];
    });
}
export function relatedWorks(r: InstitutionalRegistry, activityId: string) {
  const ids = new Set(
    r.relations
      .filter((e) => e.kind === "work-activity" && e.toId === activityId)
      .map((e) => e.fromId),
  );
  return r.works.filter((w) => ids.has(w.id));
}
export function relatedActivities(r: InstitutionalRegistry, workId: string) {
  const ids = new Set(
    r.relations
      .filter((e) => e.kind === "work-activity" && e.fromId === workId)
      .map((e) => e.toId),
  );
  return r.activities.filter((a) => ids.has(a.id));
}
// Custody originals, body manuscripts and personal records have no slot in this public-safe registry.
export function assertPublicSafe(value: unknown) {
  if (typeof value === "string")
    demand(
      !/drive\.google\.com|docs\.google\.com|libfile_|BEGIN (?:RSA |OPENSSH )?PRIVATE KEY|gh[pousr]_[A-Za-z0-9]{15}/i.test(
        value,
      ),
      "Private locator/credential in public registry",
    );
  else if (value && typeof value === "object")
    for (const [key, v] of Object.entries(value)) {
      demand(
        !/^(privateLocator|privateNotes|originalText|manuscript|phone|address|email|medical|financial|password|token|rawOriginal)$/i.test(
          key,
        ),
        "Private field in public registry: " + key,
      );
      assertPublicSafe(v);
    }
}
export function validateRegistry(r: InstitutionalRegistry) {
  assertPublicSafe(r);
  unique(
    [
      ...r.activities,
      ...r.works,
      ...r.history,
      ...r.sources,
      ...r.programmes,
      ...r.divisions,
      ...r.cohorts,
      ...r.periods,
      ...r.editions,
      ...r.media,
      ...r.mediaUses,
      ...r.relations,
      ...r.demoMembers,
    ],
    "canonical",
  );
  const sets = Object.fromEntries(
    [
      "activities",
      "works",
      "history",
      "sources",
      "programmes",
      "divisions",
      "cohorts",
      "periods",
      "editions",
      "media",
    ].map((k) => [
      k,
      new Set(
        (r[k as keyof InstitutionalRegistry] as { id: string }[]).map(
          (x) => x.id,
        ),
      ),
    ]),
  );
  function reference(kind: string, id: string) {
    demand(sets[kind]?.has(id), "Broken " + kind + " reference: " + id);
  }
  function sources(uses: EvidenceUse[]) {
    demand(uses.length, "Missing evidence");
    for (const u of uses) {
      reference("sources", u.sourceId);
      demand(u.locator.trim(), "Missing source use locator");
    }
  }
  for (const edition of r.editions) {
    reference("programmes", edition.programmeId);
    demand(edition.label.trim(), "Missing edition label");
  }
  const editionKeys = r.editions.map((e) => e.programmeId + ":" + e.label);
  demand(
    new Set(editionKeys).size === editionKeys.length,
    "Duplicate programme edition",
  );
  for (const p of r.periods) sources(p.sourceUses);
  for (const record of [...r.activities, ...r.works, ...r.history]) {
    demand(
      !("when" in record) &&
        !("relatedActivityIds" in record) &&
        !("relatedPublicationIds" in record),
      "Competing legacy date/relationship authoring",
    );
    demand(
      record.publication?.institutionalAuthority === "owner-designated" &&
        record.publication?.scope ===
          "prototype-metadata-and-editorial-summary" &&
        record.publication?.approval === "prototype-scope-authorized" &&
        record.publication?.originalReproduction === "not-authorized",
      "Missing/separate publication authorization scope",
    );
    demand(
      record.title.trim() && record.summary.trim(),
      "Missing record identity",
    );
    sources(record.sourceUses);
    validateDatedClaim(record.dates, sources);
    demand(
      ["source-checked", "prior-review", "synthetic"].includes(
        record.editorial.verification,
      ),
      "Invalid verification",
    );
    demand(
      record.editorial.verification === "synthetic" ||
        record.sourceUses.some(
          (u) =>
            r.sources.find((s) => s.id === u.sourceId)?.kind !== "synthetic",
        ),
      "Synthetic-only source cannot verify institutional content",
    );
    demand(
      ["preview", "withheld", "withdrawn"].includes(record.publication.website),
      "Invalid website publication state",
    );
    demand(
      record.editorial.website === "prototype" &&
        record.editorial.readiness === "review-draft",
      "Unexpected publication lifecycle",
    );
  }
  for (const a of r.activities) {
    if (a.programId) reference("programmes", a.programId);
    if (a.editionId) {
      reference("editions", a.editionId);
      demand(
        r.editions.find((e) => e.id === a.editionId)?.programmeId ===
          a.programId,
        "Edition/programme mismatch",
      );
    }
    for (const id of a.divisionIds ?? []) reference("divisions", id);
    for (const id of a.cohortIds ?? []) reference("cohorts", id);
    unique(a.places.assertions, "place assertion");
    for (const place of a.places.assertions) sources(place.sourceUses);
    for (const x of a.periodAssertions ?? []) {
      reference("periods", x.periodId);
      sources(x.sourceUses);
    }
    for (const x of a.dateIssues ?? []) sources(x.sourceUses);
    for (const x of a.chapters ?? [])
      for (const s of x.sourceIds) reference("sources", s);
    for (const s of a.learning?.sourceIds ?? []) reference("sources", s);
    for (const m of a.materials ?? []) reference("sources", m.sourceId);
    for (const u of a.uncertainties ?? [])
      for (const s of u.sourceIds) reference("sources", s);
    if (a.learning)
      demand(
        a.learning.basis === "documented-standard-not-achievement",
        "Learning standard must not become an achievement",
      );
    if (a.narrative) {
      demand(
        a.depth === "rich" && a.kind === "expedition",
        "Unexpected documentary narrative",
      );
      sources(a.narrative.context.sourceUses);
      for (const x of [...a.narrative.journey, ...a.narrative.notes])
        sources(x.sourceUses);
      for (const leg of a.narrative.journey)
        validateDatedClaim(leg.dates, sources);
    }
  }
  for (const w of r.works) {
    demand(
      w.availability.explanation.trim() && w.evidence.length,
      "Missing work availability/evidence",
    );
    for (const p of w.relatedProgrammeIds ?? []) reference("programmes", p);
    demand(
      w.editorial.verification !== "synthetic" ||
        w.originalState === "synthetic-example",
      "Synthetic work must remain a demonstration",
    );
    if (w.kind === "announcement")
      demand(w.announcement, "Missing announcement context");
    if (w.announcement?.effective)
      validateDatedClaim(w.announcement.effective, sources);
    if (w.announcement?.expires)
      validateDatedClaim(w.announcement.expires, sources);
  }
  for (const h of r.history)
    for (const p of h.relatedProgrammeIds ?? []) reference("programmes", p);
  for (const block of r.information.blocks) sources(block.sourceUses);
  const edgeKeys = new Set<string>();
  for (const e of r.relations) {
    const kinds: Record<Relationship["kind"], [string, string]> = {
      "work-activity": ["works", "activities"],
      "history-activity": ["history", "activities"],
      "history-work": ["history", "works"],
      "activity-activity": ["activities", "activities"],
    };
    const ends = kinds[e.kind];
    demand(ends, "Invalid relation kind");
    reference(ends[0], e.fromId);
    reference(ends[1], e.toId);
    demand(e.fromId !== e.toId, "Self relation");
    demand(
      [
        "discusses",
        "documents",
        "produced-from",
        "context",
        "shared-departure",
      ].includes(e.role),
      "Invalid relation role",
    );
    demand(
      e.role !== "shared-departure" || e.kind === "activity-activity",
      "Invalid departure relation",
    );
    sources(e.sourceUses);
    const key = [e.kind, e.fromId, e.toId, e.role].join(":");
    demand(!edgeKeys.has(key), "Duplicate relationship");
    edgeKeys.add(key);
  }
  for (const m of r.media) {
    sources(m.sourceUses);
    if (m.publicPath)
      demand(
        /^\/media\/[a-z0-9-]+\.(webp|avif|jpg)$/.test(m.publicPath),
        "Unsafe media path",
      );
  }
  for (const use of r.mediaUses) {
    reference("media", use.assetId);
    demand(
      sets.activities.has(use.recordId) ||
        sets.works.has(use.recordId) ||
        sets.history.has(use.recordId),
      "Broken media context",
    );
    const a = r.media.find((a) => a.id === use.assetId)!;
    if (use.clearance === "cleared")
      demand(mediaPublishable(a, use), "Incomplete media clearance");
  }
  const nias = new Set<string>();
  for (const m of r.demoMembers) {
    demand(
      m.synthetic === true &&
        /^DEMO\.[A-Z0-9-]+\.TRS$/.test(m.nia) &&
        !nias.has(m.nia) &&
        Object.keys(m).every((k) =>
          ["id", "nia", "name", "synthetic"].includes(k),
        ),
      "Synthetic member boundary",
    );
    nias.add(m.nia);
  }
  return r;
}
export function qualityReport(r: InstitutionalRegistry): Diagnostic[] {
  const out: Diagnostic[] = [];
  for (const x of [...r.activities, ...r.works, ...r.history]) {
    if (x.dates.reconciliation === "unknown")
      out.push({
        level: "gap",
        recordId: x.id,
        field: "dates",
        message: "No verified date; no precision inferred.",
      });
    if (x.dates.reconciliation === "unresolved")
      out.push({
        level: "conflict",
        recordId: x.id,
        field: "dates",
        message: "Assertions preserved; public date is provisional.",
      });
    if ("places" in x && x.places.reconciliation !== "single-source")
      out.push({
        level: x.places.reconciliation === "unresolved" ? "conflict" : "gap",
        recordId: x.id,
        field: "place",
        message: "Location is incomplete, unknown or disputed.",
      });
    if (
      "availability" in x &&
      ["restricted", "metadata-only"].includes(x.availability.state)
    )
      out.push({
        level: "restriction",
        recordId: x.id,
        field: "original",
        message: x.availability.explanation,
      });
  }
  for (const x of [...r.activities, ...r.works, ...r.history])
    for (const u of x.uncertainties ?? [])
      out.push({
        level: "gap",
        recordId: x.id,
        field: "uncertainty",
        message: typeof u === "string" ? u : u.title + ": " + u.explanation,
      });
  for (const a of r.activities)
    for (const issue of a.dateIssues ?? [])
      out.push({
        level: "conflict",
        recordId: a.id,
        field: issue.scope,
        message: issue.explanation,
      });
  for (const use of r.mediaUses)
    if (!resolvePublicMedia(r, use.recordId).some((m) => m.id === use.assetId))
      out.push({
        level: "restriction",
        recordId: use.recordId,
        field: "media",
        message: use.assetId + ": rights/privacy/credit/use not cleared.",
      });
  return out;
}
// Only known non-approximate selected values can become legacy precision fields.
export function selectedDate(d: DatedClaim) {
  const v = d.assertions.find(
    (a) => a.id === d.presentation.assertionId,
  )?.value;
  return v && v.precision !== "unknown" && !v.approximate
    ? { ...v, label: d.presentation.label }
    : undefined;
}
export function historicalOrder(r: InstitutionalRegistry) {
  return [...r.history].sort((a, b) => {
    const start = (x: typeof a) => {
      const v = x.dates.assertions.find(
        (d) => d.id === x.dates.presentation.assertionId,
      )?.value;
      return v && v.precision !== "unknown" ? v.start : "9999";
    };
    return start(a).localeCompare(start(b)) || a.id.localeCompare(b.id);
  });
}
