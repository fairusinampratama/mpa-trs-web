import type { SourceDefinition, SourceUse } from "./activity-values.ts";
export type RecordDate = {
  label: string;
  precision: "day" | "day-range" | "month" | "year";
  start: string;
  end?: string;
};
export type Projection = {
  verification: "source-checked" | "prior-review" | "synthetic";
  readiness: "review-draft";
  website: "prototype";
};
export type WorkKind =
  | "article"
  | "resource"
  | "context"
  | "announcement"
  | "periodical";
export const workKinds: Record<WorkKind, string> = {
  article: "Artikel",
  resource: "Materi belajar",
  context: "Catatan sumber",
  announcement: "Pengumuman",
  periodical: "Majalah",
};
export type PublicationInput = {
  id: string;
  title: string;
  kind: WorkKind;
  typeLabel?: string;
  summary: string;
  intro?: string;
  language?: string;
  contributors?: { name: string; role: "Penulis" | "Kontributor" }[];
  when?: RecordDate;
  relatedActivityIds?: string[];
  relatedProgrammeIds?: string[];
  sourceUses: SourceUse[];
  evidence: string[];
  editorial: Projection;
  originalState:
    | "published-as-exported"
    | "identified-resource"
    | "source-context"
    | "synthetic-example";
  availability: {
    state: "metadata-only" | "restricted" | "summary-only" | "demonstration";
    title: string;
    explanation: string;
  };
  sections?: {
    id: string;
    label?: string;
    title: string;
    paragraphs: string[];
  }[];
  resource?: {
    format: string;
    pages?: number;
    bytes?: number;
    topics?: string[];
  };
  announcement?: {
    audience?: string;
    effective?: RecordDate;
    expiresOn?: string;
  };
  uncertainties?: string[];
};
export type PublicationRecord = PublicationInput & {
  type: string;
  date?: string;
  author?: string;
  source: string;
  related?: string;
  href: string;
};
export type HistoryEntry = {
  id: string;
  title: string;
  when?: RecordDate;
  kind: "founding" | "education" | "knowledge" | "continuity";
  summary: string;
  sourceUses: SourceUse[];
  relatedActivityIds?: string[];
  relatedPublicationIds?: string[];
  relatedProgrammeIds?: string[];
  uncertainties: string[];
  editorial: Projection;
  periodLabel?: string;
};
export type InformationBlock = {
  id: string;
  title: string;
  paragraphs: string[];
  sourceUses: SourceUse[];
};
export type InstitutionalInformation = {
  name: string;
  shortName: string;
  affiliation: string;
  intro: string;
  motto: string;
  blocks: InformationBlock[];
  identityNotes: string[];
};
export type SyntheticMember = {
  id: string;
  nia: string;
  name: string;
  synthetic: true;
};
export type References = {
  sources: readonly SourceDefinition[];
  activityIds: readonly string[];
  programmeIds: readonly string[];
};
