export type ActivityState = "planned" | "ongoing" | "historical" | "unknown";

// Candidate frontend contract, not a final database schema.
export type DivisionId = "GH" | "RC" | "ORAD" | "LH" | "CAVING";
export type ActivityFixture = {
  id: string;
  title: string;
  summary: string;
  state: ActivityState;
  location?: string;
  date?: string;
  depth: "basic" | "rich";
  evidenceLabel?: string;
  href?: string;
  program?: string;
  edition?: string;
  division?: string;
  cohort?: string;
};
export type SourceUse = { sourceId: string; locator: string };
export type ActivityInput = {
  id: string;
  title: string;
  summary: string;
  state: ActivityState;
  kind:
    | "division-education"
    | "basic-education"
    | "institutional-continuity"
    | "workshop"
    | "expedition"
    | "environmental-service";
  depth: "basic" | "rich";
  location?: string;
  programId?: string;
  divisionIds?: DivisionId[];
  cohortIds?: string[];
  when?: {
    label: string;
    precision: "day" | "day-range" | "month" | "year";
    start?: string;
    end?: string;
  };
  sourceUses: SourceUse[];
  editorial: {
    verification: "source-checked" | "synthetic";
    readiness: "review-draft";
    website: "prototype";
    report?:
      | "not-verified"
      | "submission-delays-reported"
      | "without-report-as-described";
  };
  chapters?: {
    id: string;
    title: string;
    paragraphs: string[];
    sourceIds: string[];
  }[];
  learning?: {
    title: string;
    context: string;
    items: string[];
    sourceIds: string[];
  };
  materials?: {
    title: string;
    availability: "reference-only";
    sourceId: string;
  }[];
  mediaIds?: string[];
  uncertainties?: { title: string; explanation: string; sourceIds: string[] }[];
  relatedActivityIds?: string[];
  relatedPublicationIds?: string[];
};
export type ActivityRecord = ActivityInput & ActivityFixture;
export type DivisionDefinition = {
  id: DivisionId;
  name: string;
  alias?: string;
  description: string;
  aboutSummary?: string;
};
export type ProgrammeDefinition = {
  id: string;
  name: string;
  href: string;
  description: string;
};
export type SourceDefinition = {
  id: string;
  label: string;
  kind:
    | "report"
    | "reviewed-photographs"
    | "synthetic"
    | "charter"
    | "article"
    | "teaching"
    | "documentary-reference";
};
export type ActivityMedia = {
  id: string;
  activityId: string;
  role: "gh" | "rc" | "kawi" | "batafia";
  title: string;
  context: string;
  clearance: "hold" | "cleared";
  creatorVerified: boolean;
};
export type ActivityReferences = {
  programmes: ProgrammeDefinition[];
  divisions: DivisionDefinition[];
  sources: SourceDefinition[];
  media: ActivityMedia[];
  publicationIds: string[];
};
