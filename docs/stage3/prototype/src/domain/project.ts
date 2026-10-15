import type {
  InstitutionalRegistry,
  Activity,
  DatedClaim,
} from "./contract.ts";
import type {
  ActivityInput,
  ActivityRecord,
  ActivityFixture,
  ActivityMedia,
} from "./activity-values.ts";
import type {
  PublicationInput,
  PublicationRecord,
  HistoryEntry,
} from "./work-values.ts";
import { workKinds } from "./work-values.ts";
import {
  validateRegistry,
  selectedDate,
  resolvePublicMedia,
  historicalOrder,
} from "./validate.ts";
// Legacy expiry accepts an exact day only; partial/approximate values stay canonical.
function exactExpiryDate(claim?: DatedClaim) {
  const value = claim && selectedDate(claim);
  return value?.precision === "day" ? value.start : undefined;
}
// Allowlisted editorial preview projection. Originals/manuscripts and private custody are not inputs.
function activityFields(a: Activity): ActivityInput {
  return {
    id: a.id,
    title: a.title,
    summary: a.summary,
    state: a.state,
    kind: a.kind,
    depth: a.depth,
    programId: a.programId,
    divisionIds: a.divisionIds,
    cohortIds: a.cohortIds,
    sourceUses: a.sourceUses,
    editorial: a.editorial,
    when: selectedDate(a.dates),
    location: a.places.presentation,
    chapters: a.chapters,
    learning: a.learning,
    materials: a.materials,
    uncertainties: a.uncertainties,
    mediaIds: undefined,
  };
}
export function projectPreview(input: InstitutionalRegistry) {
  validateRegistry(input);
  const r = {
    ...input,
    activities: input.activities.filter(
      (a) => a.publication.website === "preview",
    ),
    works: input.works.filter((w) => w.publication.website === "preview"),
    history: input.history.filter((h) => h.publication.website === "preview"),
  };
  const activityIds = new Set(r.activities.map((a) => a.id)),
    workIds = new Set(r.works.map((w) => w.id)),
    historyIds = new Set(r.history.map((h) => h.id));
  r.relations = input.relations.filter(
    (e) =>
      ({
        "work-activity": workIds.has(e.fromId) && activityIds.has(e.toId),
        "history-activity": historyIds.has(e.fromId) && activityIds.has(e.toId),
        "history-work": historyIds.has(e.fromId) && workIds.has(e.toId),
        "activity-activity":
          activityIds.has(e.fromId) && activityIds.has(e.toId),
      })[e.kind],
  );
  const sources = r.sources.map((s) => ({
    id: s.id,
    label: s.label,
    kind: s.kind,
  }));
  const activityInputs: ActivityInput[] = r.activities
    .filter((a) => a.kind !== "expedition")
    .map((a) => ({
      ...activityFields(a),
      mediaIds: r.mediaUses
        .filter((u) => u.recordId === a.id)
        .map((u) => u.assetId),
      relatedActivityIds: r.relations
        .filter((e) => e.kind === "activity-activity" && e.fromId === a.id)
        .map((e) => e.toId),
      relatedPublicationIds: r.relations
        .filter((e) => e.kind === "work-activity" && e.toId === a.id)
        .map((e) => e.fromId),
    }));
  const activityRecords: ActivityRecord[] = activityInputs.map((a) => ({
    ...a,
    program: r.programmes.find((p) => p.id === a.programId)?.name,
    division: a.divisionIds?.[0],
    cohort: a.cohortIds?.[0],
    date: a.when?.label,
    evidenceLabel: a.sourceUses
      .map((u) => sources.find((s) => s.id === u.sourceId)!.label)
      .join(" + "),
    href: `#/activity/${a.id}`,
  }));
  const expeditionRecords: ActivityFixture[] = r.activities
    .filter((a) => a.kind === "expedition")
    .map((a) => ({
      id: a.id,
      title: a.title,
      summary: a.summary,
      state: a.state,
      depth: a.depth,
      date: a.dates.presentation.assertionId
        ? a.dates.presentation.label
        : undefined,
      location: a.places.presentation,
      program: r.programmes.find((p) => p.id === a.programId)?.name,
      edition: r.editions.find((e) => e.id === a.editionId)?.label,
      evidenceLabel: a.sourceUses
        .map((u) => sources.find((s) => s.id === u.sourceId)!.label)
        .join(" + "),
      href: `#/expedition/${a.id}`,
    }));
  const publicationInputs: PublicationInput[] = r.works.map((w) => ({
    id: w.id,
    title: w.title,
    kind: w.kind,
    typeLabel: w.typeLabel,
    summary: w.summary,
    intro: w.intro,
    language: w.language,
    contributors: w.contributors,
    when: selectedDate(w.dates),
    relatedActivityIds: r.relations
      .filter((e) => e.kind === "work-activity" && e.fromId === w.id)
      .map((e) => e.toId),
    relatedProgrammeIds: w.relatedProgrammeIds,
    sourceUses: w.sourceUses,
    evidence: w.evidence,
    editorial: w.editorial,
    originalState: w.originalState,
    availability: w.availability,
    sections: w.sections,
    resource: w.resource,
    announcement: w.announcement
      ? {
          audience: w.announcement.audience,
          effective: w.announcement.effective
            ? selectedDate(w.announcement.effective)
            : undefined,
          expiresOn: exactExpiryDate(w.announcement.expires),
        }
      : undefined,
    uncertainties: w.uncertainties,
  }));
  const publicWorks: PublicationRecord[] = publicationInputs.map((w) => ({
    ...w,
    type: w.typeLabel ?? workKinds[w.kind],
    date: w.when?.label,
    author:
      w.contributors
        ?.filter((c) => c.role === "Penulis")
        .map((c) => c.name)
        .join(", ") || undefined,
    source: w.sourceUses
      .map((u) => sources.find((s) => s.id === u.sourceId)!.label)
      .join(" + "),
    related: w.relatedActivityIds?.[0],
    href: `#/publication/${w.id}`,
  }));
  // Undated history remains canonical and diagnosed, never given a fake date to satisfy old ordering.
  const historyInputs: HistoryEntry[] = historicalOrder(r).flatMap((h) => {
    const when = selectedDate(h.dates);
    return when
      ? [
          {
            id: h.id,
            title: h.title,
            when,
            kind: h.kind,
            summary: h.summary,
            sourceUses: h.sourceUses,
            relatedActivityIds: r.relations
              .filter((e) => e.kind === "history-activity" && e.fromId === h.id)
              .map((e) => e.toId),
            relatedPublicationIds: r.relations
              .filter((e) => e.kind === "history-work" && e.fromId === h.id)
              .map((e) => e.toId),
            relatedProgrammeIds: h.relatedProgrammeIds,
            uncertainties: h.uncertainties,
            editorial: h.editorial,
            periodLabel: h.periodLabel,
          },
        ]
      : [];
  });
  const activityMedia: ActivityMedia[] = r.mediaUses
    .filter((u) => !["expedition", "expedition-ecology"].includes(u.role) && (!u.placement || u.placement === "activity-documentary"))
    .map((u) => {
      const a = r.media.find((a) => a.id === u.assetId)!;
      return {
        id: a.id,
        activityId: u.recordId,
        role: u.role as ActivityMedia["role"],
        title: a.title,
        context: a.context,
        clearance: resolvePublicMedia(r, u.recordId, u.placement).some((m) => m.id === a.id)
          ? "cleared"
          : "hold",
        creatorVerified: a.rights === "permission-verified",
      };
    });
  const safeMedia = r.activities.flatMap((a) => resolvePublicMedia(r, a.id));
  return {
    activityInputs,
    activityRecords,
    expeditionRecords,
    publicationInputs,
    publicWorks,
    historyInputs,
    sources,
    activityMedia,
    safeMedia,
    programmes: r.programmes.map((p) => ({ ...p })),
    divisions: r.divisions.map((d) => ({ ...d })),
    information: r.information,
    // Deliberately separate demo projection; no real institutional-member view exists.
    demoMembers: r.demoMembers.map((m) => ({
      id: m.id,
      nia: m.nia,
      name: m.name,
      synthetic: true as const,
    })),
  };
}
