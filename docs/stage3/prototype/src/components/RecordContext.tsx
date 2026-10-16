import {useContentReadModel} from '../ContentReadModel';
import {visibleRelations,workDiscovery} from '../domain/read';
import {EvidenceDisclosure,TextLink,SectionHeading} from './Foundation';
import {RecordDate} from './RecordDate';
export {RecordDate,DateEvidence} from './RecordDate';
export function RelatedRecords({id}:{id:string}){
 const{registry}=useContentReadModel();const links=visibleRelations(registry,id);if(!links.length)return null;
 const groups=[{title:'Karya terkait',items:links.filter(l=>registry.works.some(w=>w.id===l.record.id))},{title:'Kegiatan terkait',items:links.filter(l=>registry.activities.some(a=>a.id===l.record.id))},{title:'Dalam Jejak Tursina',items:links.filter(l=>registry.history.some(h=>h.id===l.record.id))}].filter(g=>g.items.length);
 return <section className="ds-container ds-section te-related" id={`${id}-works`} tabIndex={-1} data-related-records={id}><SectionHeading label="Jelajahi lebih jauh" title="Lanjutkan penelusuran."/><div className="ds-related-groups">{groups.map(group=><div key={group.title}><h3 className="ds-content-title">{group.title}</h3>{group.items.length>1&&group.items.every(l=>l.label===group.items[0].label)&&<p className="ds-caption">{group.items[0].label}</p>}<ul className="ds-related-list">{group.items.map(({edge,record,href,label})=><li key={edge.id}><h4><a className="ds-link" href={href}>{record.title}<span aria-hidden="true"> →</span></a></h4><p className="ds-metadata"><RecordDate id={record.id}/></p>{'availability'in record&&<p className="ds-caption">{workDiscovery(record).cue}</p>}{!(group.items.length>1&&group.items.every(l=>l.label===label))&&<p className="ds-caption">{label}</p>}</li>)}</ul></div>)}</div><EvidenceDisclosure summary="Konteks hubungan"><p>Hubungan mengikuti sumber masing-masing catatan. Pemberangkatan bersama tidak menyamakan kegiatan; standar belajar bukan bukti pencapaian peserta.</p></EvidenceDisclosure></section>;
}
