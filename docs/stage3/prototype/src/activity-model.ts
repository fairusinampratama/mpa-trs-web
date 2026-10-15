// Compatibility validation/projection for pre-5C consumers. Canonical authoring lives in domain/.
import type {ActivityInput,ActivityReferences,ActivityRecord,DivisionDefinition,DivisionId} from './domain/activity-values.ts';
export type * from './domain/activity-values.ts';
export function prepareActivityRecords(inputs: readonly ActivityInput[], refs: ActivityReferences): ActivityRecord[] {
  const ids = new Set<string>();
  for (const r of inputs) {
    if (!/^[a-z][a-z0-9-]*$/.test(r.id) || ids.has(r.id)) throw new Error(`Invalid/duplicate activity ID: ${r.id}`);
    ids.add(r.id);
    if (!r.title.trim() || !r.summary.trim() || !r.sourceUses.length) throw new Error(`Missing identity/source: ${r.id}`);
    if (r.programId && !refs.programmes.some(p => p.id === r.programId)) throw new Error(`Unknown programme: ${r.id}`);
    if (r.divisionIds?.some(id => !refs.divisions.some(d => d.id === id))) throw new Error(`Unknown division: ${r.id}`);
    const sourceIds = [...r.sourceUses.map(s => s.sourceId), ...(r.chapters ?? []).flatMap(s => s.sourceIds), ...(r.learning?.sourceIds ?? []), ...(r.uncertainties ?? []).flatMap(u => u.sourceIds), ...(r.materials ?? []).map(m => m.sourceId)];
    if (sourceIds.some(id => !refs.sources.some(s => s.id === id))) throw new Error(`Unknown source: ${r.id}`);
    if (r.mediaIds?.some(id => !refs.media.some(m => m.id === id && m.activityId === r.id))) throw new Error(`Incorrect media relationship: ${r.id}`);
    if (r.relatedPublicationIds?.some(id => !refs.publicationIds.includes(id))) throw new Error(`Unknown publication: ${r.id}`);
    if (r.when?.precision === 'day-range') {
      if (!r.when.start || !r.when.end || !/^\d{4}-\d{2}-\d{2}$/.test(r.when.start) || !/^\d{4}-\d{2}-\d{2}$/.test(r.when.end) || !Number.isFinite(Date.parse(r.when.start)) || !Number.isFinite(Date.parse(r.when.end)) || r.when.start > r.when.end) throw new Error(`Invalid date range: ${r.id}`);
    }
  }
  for (const r of inputs) if (r.relatedActivityIds?.some(id => !ids.has(id))) throw new Error(`Unknown related activity: ${r.id}`);
  return inputs.map(r => ({ ...r,
    // Compatibility projections for existing homepage/lab/historical experiments.
    // Canonical programme/division/cohort/date data is authored only above.
    program: refs.programmes.find(p => p.id === r.programId)?.name,
    division: r.divisionIds?.[0], cohort: r.cohortIds?.[0], date: r.when?.label,
    evidenceLabel: r.sourceUses.map(s => refs.sources.find(source => source.id === s.sourceId)!.label).join(' + '),
    href: `#/activity/${r.id}`,
  }));
}
export type ActivityFilters = { division: string; cohort: string };
export function cohortOptions(records: readonly ActivityRecord[]): string[] {
  return [...new Set(records.flatMap(r => r.cohortIds ?? []))].sort();
}
export function readPDFilters(params: URLSearchParams, records: readonly ActivityRecord[], divisions: readonly DivisionDefinition[]): ActivityFilters {
  const division = params.get('division') ?? 'all', cohort = params.get('cohort') ?? 'all';
  return { division: divisions.some(d => d.id === division) ? division : 'all', cohort: cohortOptions(records).includes(cohort) || (cohort === 'none' && records.some(r => !r.cohortIds?.length)) ? cohort : 'all' };
}
export function filterPDRecords(records: readonly ActivityRecord[], filters: ActivityFilters): ActivityRecord[] {
  return records.filter(r => r.programId === 'pd' && (filters.division === 'all' || r.divisionIds?.includes(filters.division as DivisionId)) && (filters.cohort === 'all' || (filters.cohort === 'none' ? !r.cohortIds?.length : r.cohortIds?.includes(filters.cohort))));
}
export function pdQuery(filters: ActivityFilters): string {
  const p = new URLSearchParams();
  if (filters.division !== 'all') p.set('division', filters.division);
  if (filters.cohort !== 'all') p.set('cohort', filters.cohort);
  return p.size ? `?${p}` : '';
}
