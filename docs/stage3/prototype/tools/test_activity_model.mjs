import test from 'node:test';
import assert from 'node:assert/strict';
import {activityInputs,activityReferences,activityRecords,pdRecords,archivalActivities} from '../src/content.ts';
import {prepareActivityRecords,filterPDRecords,cohortOptions,readPDFilters,pdQuery} from '../src/activity-model.ts';
import {addedActivityInputs} from './activity-test-fixtures.ts';

test('expanded PD sample retains original identities and five fields',()=>{
 assert.equal(pdRecords.length,18);for(const id of ['gh26','gh29','rc29','orad29','lh29','caving29'])assert(pdRecords.some(r=>r.id===id));
 for(const d of activityReferences.divisions)assert(filterPDRecords(activityRecords,{division:d.id,cohort:'all'}).length>0);
 assert.deepEqual(cohortOptions(pdRecords),['XXIX','XXVI','XXVII','XXVIII']);
});
test('added records drive catalogue cohorts, selection and generic canonical URLs',()=>{
 const rows=prepareActivityRecords([...activityInputs,...addedActivityInputs],activityReferences);
 const pd=rows.filter(r=>r.programId==='pd');assert(cohortOptions(pd).includes('DEMO'));
 assert.deepEqual(filterPDRecords(rows,{division:'GH',cohort:'DEMO'}).map(r=>r.id),['pd-proof']);
 assert.deepEqual(filterPDRecords(rows,{division:'ORAD',cohort:'none'}).map(r=>r.id),['pd-no-cohort-proof']);
 const independent=rows.find(r=>r.id==='independent-proof');assert.equal(independent.href,'#/activity/independent-proof');assert.equal(independent.program,undefined);assert.equal(independent.date,undefined);assert.equal(independent.cohort,undefined);assert.equal(independent.mediaIds,undefined);
});
test('independent records have no fabricated programme and source states stay independent',()=>{
 for(const r of archivalActivities){assert.equal(r.programId,undefined);assert.equal(r.program,undefined);assert.equal(r.state,'historical');assert.equal(r.editorial.readiness,'review-draft');}
 assert(activityReferences.media.every(m=>m.clearance==='cleared'&&m.creatorVerified));
 assert.equal(activityRecords.find(r=>r.id==='gh26').when.precision,'day-range');
});
test('supported/invalid deep-link filters normalize and round trip',()=>{
 const f=readPDFilters(new URLSearchParams('division=RC&cohort=XXIX'),pdRecords,activityReferences.divisions);assert.deepEqual(f,{division:'RC',cohort:'XXIX'});assert.equal(pdQuery(f),'?division=RC&cohort=XXIX');
 assert.deepEqual(readPDFilters(new URLSearchParams('division=unknown&cohort=unknown'),pdRecords,activityReferences.divisions),{division:'all',cohort:'all'});
 assert.equal(filterPDRecords(activityRecords,{division:'RC',cohort:'XXVI'}).length,1);
});
test('invalid identity and dangling relationships are rejected',()=>{
 const make=()=>structuredClone(addedActivityInputs[0]);
 for(const mutate of [r=>r.id='../escape',r=>r.programId='made-up',r=>r.divisionIds=['OTHER'],r=>r.sourceUses[0].sourceId='missing',r=>r.mediaIds=['pd-rc-team'],r=>r.relatedActivityIds=['missing'],r=>r.relatedPublicationIds=['missing']]){const r=make();mutate(r);assert.throws(()=>prepareActivityRecords([r],activityReferences));}
 assert.throws(()=>prepareActivityRecords([make(),make()],activityReferences));
});

test("an identifiable PD may retain unknown field/cohort without inventing them",()=>{const r=structuredClone(addedActivityInputs[0]);delete r.divisionIds;delete r.cohortIds;const [row]=prepareActivityRecords([r],activityReferences);assert.equal(row.division,undefined);assert.equal(row.cohort,undefined);assert.equal(filterPDRecords([row],{division:"all",cohort:"all"}).length,1);});
