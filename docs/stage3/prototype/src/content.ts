// Compatibility views only. Author institutional records once in domain/records.ts.
import {preview} from './domain/index.ts';
import type {ActivityReferences} from './activity-model.ts';
export const expeditionRecords=preview.expeditionRecords;
export const publicWorks=preview.publicWorks;
export const syntheticMembers=preview.demoMembers;
export const programmeDefinitions=preview.programmes;
export const divisionDefinitions=preview.divisions;
export const activitySources=preview.sources;
export const activityMedia=preview.activityMedia;
export const activityInputs=preview.activityInputs;
export const activityRecords=preview.activityRecords;
export const activityReferences:ActivityReferences={programmes:programmeDefinitions,divisions:divisionDefinitions,sources:activitySources,media:activityMedia,publicationIds:publicWorks.map(w=>w.id)};
export const pdRecords=activityRecords.filter(r=>r.programId==='pd');
export const archivalActivities=activityRecords.filter(r=>!r.programId&&r.editorial.verification!=='synthetic');
export const standalone=activityRecords.find(r=>r.id==='workshop-demo')!;
