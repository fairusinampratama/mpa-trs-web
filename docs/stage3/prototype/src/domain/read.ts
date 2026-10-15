import type {InstitutionalRegistry,DatedClaim,Relationship} from './contract.ts';
export function dateView(claim:DatedClaim){
 const selected=claim.assertions.find(a=>a.id===claim.presentation.assertionId);
 const value=selected?.value;
 const known=value&&value.precision!=='unknown'?value:undefined;
 const label=known?.approximate&&!/sekitar|kira|±/i.test(claim.presentation.label)?`Sekitar ${claim.presentation.label}`:claim.presentation.label;
 return {label, machine:known&&!known.approximate?known.start:undefined, role:selected?.role, uncertain:claim.reconciliation==='unresolved', undated:!known, start:known?.start};
}
export function recordHref(r:InstitutionalRegistry,id:string){
 const a=r.activities.find(a=>a.id===id&&a.publication.website==='preview');
 if(a)return `#/${a.kind==='expedition'?'expedition':'activity'}/${id}`;
 if(r.works.some(w=>w.id===id&&w.publication.website==='preview'))return `#/publication/${id}`;
 if(r.history.some(h=>h.id===id&&h.publication.website==='preview'))return `#/jejak?entry=${id}`;
}
export function visibleRelations(r:InstitutionalRegistry,id:string){
 return r.relations.filter(e=>e.fromId===id||e.toId===id).flatMap(edge=>{
  const targetId=edge.fromId===id?edge.toId:edge.fromId;
  const href=recordHref(r,targetId);if(!recordHref(r,id)||!href)return [];
  const record=[...r.activities,...r.works,...r.history].find(x=>x.id===targetId)!;
  return [{edge,record,href,label:relationshipLabel(edge,edge.fromId===id)}];
 });
}
export function relationshipLabel(edge:Relationship,forward:boolean){
 if(edge.role==='shared-departure')return 'Pemberangkatan bersama · catatan kegiatan terpisah';
 if(edge.kind.startsWith('history-'))return forward?'Tercatat dalam jejak ini':'Jejak institusi terkait';
 if(edge.kind==='activity-activity')return 'Konteks kegiatan terkait';
 const labels={documents:forward?'Mendokumentasikan kegiatan':'Karya yang mendokumentasikan kegiatan',discusses:forward?'Membahas kegiatan':'Karya yang membahas kegiatan','produced-from':forward?'Berasal dari kegiatan':'Karya dari kegiatan',context:'Konteks yang berkaitan'};
 return labels[edge.role];
}

export function historyGroups<T extends {id:string;when?:{start:string}}>(r:InstitutionalRegistry,rows:readonly T[]){
 const start=(row:T)=>{const h=r.history.find(h=>h.id===row.id);return h?dateView(h.dates).start:row.when?.start;};
 return {dated:rows.filter(row=>start(row)).sort((a,b)=>start(a)!.localeCompare(start(b)!)||a.id.localeCompare(b.id)),undated:rows.filter(row=>!start(row))};
}
