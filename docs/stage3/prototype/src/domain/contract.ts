// Framework-independent institutional contract. SQL and administrative workflows remain undecided.
import type {
  ActivityInput,
  ProgrammeDefinition,
  DivisionDefinition,
  SourceUse,
  SourceDefinition,
} from "./activity-values.ts";
import type {
  PublicationInput,
  HistoryEntry,
  InstitutionalInformation,
  SyntheticMember,
} from "./work-values.ts";
export type EvidenceUse = SourceUse & { claim?: string };
export type DateValue =
  | { precision: "unknown" }
  | {
      precision: "day" | "day-range" | "month" | "year";
      start: string;
      end?: string;
      approximate?: true;
    };
export type DateAssertion = {
  id: string;
  role:
    | "execution"
    | "planned"
    | "publication"
    | "milestone"
    | "release-reported";
  value: DateValue;
  sourceUses: EvidenceUse[];
};
export type DatedClaim = {
  presentation: { label: string; assertionId?: string };
  assertions: DateAssertion[];
  reconciliation: "single-source" | "corroborated" | "unresolved" | "unknown";
};
export type PlaceClaim = {
  presentation?: string;
  assertions: { id: string; label: string; sourceUses: EvidenceUse[] }[];
  reconciliation: "single-source" | "unresolved" | "incomplete" | "unknown";
};
export type NarrativeSection = {
  title: string;
  paragraphs: string[];
  sourceUses: EvidenceUse[];
};
export type ExpeditionNarrative = {
  displayTitle: string;
  deck: string;
  precisionNote?: string;
  context: NarrativeSection;
  journeyTitle: string;
  journey: {
    dates: DatedClaim;
    title: string;
    body: string;
    sourceUses: EvidenceUse[];
  }[];
  notes: NarrativeSection[];
  sourceNotes: string[];
  evidence: string[];
};
export type PublicationBoundary = {
  institutionalAuthority: "owner-designated";
  scope: "prototype-metadata-and-editorial-summary";
  approval: "prototype-scope-authorized";
  website: "preview" | "withheld" | "withdrawn";
  originalReproduction: "not-authorized";
};
export type Activity = Omit<
  ActivityInput,
  | "when"
  | "location"
  | "kind"
  | "relatedActivityIds"
  | "relatedPublicationIds"
  | "mediaIds"
  | "learning"
> & {
  publication: PublicationBoundary;
  learning?: NonNullable<ActivityInput["learning"]> & {
    basis: "documented-standard-not-achievement";
  };
  kind: ActivityInput["kind"] | "expedition" | "environmental-service";
  dates: DatedClaim;
  places: PlaceClaim;
  editionId?: string;
  narrative?: ExpeditionNarrative;
  periodAssertions?: {
    periodId: string;
    state: "not-executed-in-period" | "execution-reported" | "preparation-only";
    sourceUses: EvidenceUse[];
  }[];
  dateIssues?: {
    scope: string;
    explanation: string;
    sourceUses: EvidenceUse[];
  }[];
};
export type Work = Omit<
  PublicationInput,
  "when" | "relatedActivityIds" | "announcement"
> & {
  dates: DatedClaim;
  publication: PublicationBoundary;
  announcement?: {
    audience?: string;
    effective?: DatedClaim;
    expires?: DatedClaim;
  };
};
export type History = Omit<
  HistoryEntry,
  "when" | "relatedActivityIds" | "relatedPublicationIds"
> & { dates: DatedClaim; publication: PublicationBoundary };
export type Source = SourceDefinition & {
  custody: "restricted-original" | "synthetic";
  originalAccess: "examined" | "prior-review";
  acceptance: "not-established" | "not-applicable";
};
export type Relationship = {
  id: string;
  kind:
    | "work-activity"
    | "history-activity"
    | "history-work"
    | "activity-activity";
  fromId: string;
  toId: string;
  role:
    | "discusses"
    | "documents"
    | "produced-from"
    | "context"
    | "shared-departure";
  sourceUses: EvidenceUse[];
};
export type MediaAsset = {
  sourceUses: EvidenceUse[];
  id: string;
  title: string;
  context: string;
  rights: "unverified" | "permission-verified";
  privacy: "unreviewed" | "cleared";
  credit: "unverified" | "verified";
  publicPath?: string;
};
export type MediaUse = {
  id: string;
  assetId: string;
  recordId: string;
  role: "gh" | "rc" | "kawi" | "batafia" | "expedition";
  institutionalUse: "pending" | "approved";
  clearance: "hold" | "cleared" | "withdrawn";
  purpose: "public-website";
};
export type InstitutionalRegistry = {
  version: string;
  programmes: ProgrammeDefinition[];
  divisions: DivisionDefinition[];
  cohorts: { id: string; label: string }[];
  periods: { id: string; label: string; sourceUses: EvidenceUse[] }[];
  editions: { id: string; programmeId: string; label: string }[];
  activities: Activity[];
  works: Work[];
  history: History[];
  information: InstitutionalInformation;
  sources: Source[];
  media: MediaAsset[];
  mediaUses: MediaUse[];
  relations: Relationship[];
  demoMembers: SyntheticMember[];
};
