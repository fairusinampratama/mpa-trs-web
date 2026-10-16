import {withDomainProof} from './domain-test-fixtures.ts';
import type {InstitutionalRegistry} from '../src/domain/contract.ts';
export function integrationFixture(base:InstitutionalRegistry,withdraw=false){
 const r=withDomainProof(base),a=r.activities.find(a=>a.id==='data-proof-pd')!;
 r.cohorts.push({id:'DEMO',label:'DEMO'});a.cohortIds=['DEMO'];
 r.activities.push({...structuredClone(a),id:'integration-independent',title:'INTEGRATION Independent',programId:undefined,divisionIds:undefined,cohortIds:undefined,kind:'workshop'});
 const w=r.works.find(w=>w.id==='data-proof-work')!;
 r.works.push({...structuredClone(w),id:'integration-multi',title:'INTEGRATION Multi Activity'});
 r.works.push({...structuredClone(w),id:'integration-readable-example',title:'INTEGRATION Readable Example',kind:'article',originalState:'synthetic-example',editorial:{...w.editorial,verification:'synthetic'},availability:{state:'demonstration',title:'Contoh artikel sintetis',explanation:'Isi uji sintetis dapat dibaca; bukan karya institusi.'},sections:[{id:'sample',title:'Contoh isi',paragraphs:['INTEGRATION synthetic readable body; no historical claim.']}]});
 const sources=w.sourceUses;
 for(const [id,kind,fromId,toId,role] of [
 ['integration-edge-a','work-activity','integration-multi','data-proof-pd','documents'],
 ['integration-edge-b','work-activity','integration-multi','data-proof-te','discusses'],
 ['integration-edge-c','history-activity','data-proof-history','data-proof-pd','context'],
 ['integration-edge-d','history-work','data-proof-history','integration-multi','context'],
 ]as const)r.relations.push({id,kind,fromId,toId,role,sourceUses:sources});
 const h=r.history.find(h=>h.id==='data-proof-history')!;
 r.history.push({...structuredClone(h),id:'integration-undated',title:'INTEGRATION Undated',dates:{presentation:{label:'Waktu belum diketahui'},assertions:[],reconciliation:'unknown'}});
 r.history.push({...structuredClone(h),id:'integration-approx',title:'INTEGRATION Approximate',dates:{presentation:{label:'2002',assertionId:'approx'},assertions:[{id:'approx',role:'milestone',value:{precision:'year',start:'2002',approximate:true},sourceUses:sources}],reconciliation:'single-source'}});
 if(withdraw){r.works.find(w=>w.id==='integration-multi')!.publication.website='withdrawn';r.works.find(w=>w.id==='sacred-gatekeeper')!.publication.website='withdrawn';r.mediaUses.find(u=>u.placement==='home-opening')!.clearance='withdrawn';r.mediaUses.find(u=>u.placement==='home-education-gh')!.clearance='withdrawn';}
 return r;
}
