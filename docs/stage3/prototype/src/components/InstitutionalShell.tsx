import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Button } from './Button';
import { useDocumentaryAsset } from './Foundation';
export type NavChoice = 'grouped' | 'direct';
type Destination = {label: string; href?: string; children?: Destination[]};
const grouped: Destination[] = [
  {label:'Tentang',href:'#/about'},
  {label:'Kegiatan',children:[{label:'Tursina Explore',href:'#/program/te'},{label:'Pemantapan Divisi',href:'#/program/pd'},{label:'Kegiatan lainnya',href:'#/activities'}]},
  {label:'Karya & Pengetahuan',children:[{label:'Artikel & pengumuman',href:'#/publications'},{label:'Materi belajar',href:'#/knowledge'}]},
  {label:'Jejak Tursina',href:'#/jejak'},{label:'Buku Induk',href:'#/members'},
];
const direct: Destination[] = [{label:'Tursina Explore',href:'#/program/te'},{label:'Pendidikan',children:[{label:'Pemantapan Divisi',href:'#/program/pd'},{label:'Kenali lima divisi',href:'#/about'}]},{label:'Kegiatan',href:'#/activities'},{label:'Publikasi',children:[{label:'Artikel & pengumuman',href:'#/publications'},{label:'Materi belajar',href:'#/knowledge'}]},{label:'Jejak Tursina',href:'#/jejak'},{label:'Buku Induk',href:'#/members'}];
function Navigation({ items, route, onNavigate, mobile }: { items: Destination[]; route: string; onNavigate: () => void; mobile?: boolean }) {
  const [open, setOpen] = useState<string>(); const refs = useRef<Record<string, HTMLButtonElement | null>>({});
  useEffect(() => setOpen(undefined), [route]);
  return <nav aria-label={mobile ? 'Navigasi mobile' : 'Navigasi publik'} className={`ds-navigation${mobile ? ' ds-mobile-navigation' : ''}`} onKeyDown={e=>{if(e.key==='Escape' && open){e.preventDefault();e.stopPropagation();refs.current[open]?.focus();setOpen(undefined);}}}>{items.map((item, i)=>item.children ? <div className="ds-nav-group" key={item.label}>
    <button type="button" ref={node=>{refs.current[item.label]=node;}} aria-expanded={open===item.label} aria-controls={`${mobile ? 'mobile' : 'desktop'}-group-${i}`} onClick={()=>setOpen(open===item.label?undefined:item.label)} className="ds-nav-trigger">{item.label}<span aria-hidden="true">⌄</span></button>
    <div id={`${mobile ? 'mobile' : 'desktop'}-group-${i}`} hidden={open!==item.label} className="ds-nav-children">{item.children.map(child=><a key={child.label} href={child.href} aria-current={child.href===`#${route}`?'page':undefined} onClick={()=>{setOpen(undefined);onNavigate();}}>{child.label}</a>)}</div>
  </div> : <a href={item.href} key={item.label} aria-current={item.href===`#${route}`?'page':undefined} onClick={onNavigate}>{item.label}</a>)}</nav>;
}
export function InstitutionalHeader({ route, navigation='grouped' }: { route: string; navigation?: NavChoice }) {
  const [menu,setMenu]=useState(false);const trigger=useRef<HTMLButtonElement>(null);const emblem=useDocumentaryAsset('emblem');
  useEffect(()=>setMenu(false),[route]);
  useEffect(()=>{const query=matchMedia('(min-width:1200px)');const close=()=>setMenu(false);query.addEventListener('change',close);return()=>query.removeEventListener('change',close);},[]);
  const close=()=>setMenu(false);const items=navigation==='direct'?direct:grouped;
  return <header className="ds-header" onKeyDown={e=>{if(e.key==='Escape'&&menu){e.preventDefault();setMenu(false);trigger.current?.focus();}}}>
    <div className="ds-container ds-header-row"><a className="ds-wordmark" href="#/" aria-label="MAPALA Tursina — Beranda">{emblem && <img src={emblem.src} width={40} height={40} alt=""/>}<span><strong>MAPALA Tursina</strong><span>Mahasiswa Pencinta Alam</span></span></a><div className="ds-desktop-nav"><Navigation items={items} route={route} onNavigate={close}/></div><button type="button" className="ds-menu-toggle button button-secondary" aria-expanded={menu} aria-controls="institutional-mobile-nav" ref={trigger} onClick={()=>setMenu(!menu)}>Menu</button></div>
    <div className="ds-container ds-mobile-panel" id="institutional-mobile-nav" hidden={!menu}><Navigation items={items} route={route} onNavigate={close} mobile/><Button variant="quiet" onClick={()=>{close();trigger.current?.focus();}}>Tutup menu</Button></div>
  </header>;
}
export function InstitutionalFooter() {
  return <footer className="ds-footer"><div className="ds-container ds-footer-grid"><div><p className="ds-footer-name">MAPALA Tursina</p><p>Mahasiswa Pencinta Alam Tursina<br/>UIN Maulana Malik Ibrahim Malang</p><p className="ds-motto">Dari alam aku ada, aku ada untuk alam</p></div><nav aria-label="Navigasi footer"><a href="#/about">Tentang</a><a href="#/program/te">Kegiatan</a><a href="#/publications">Karya & Pengetahuan</a></nav><nav aria-label="Institusi dan sejarah"><a href="#/jejak">Jejak Tursina</a><a href="#/members">Buku Induk</a></nav></div><div className="ds-container ds-preview-note"><p>Prototipe Stage 3 · bukan website resmi · versi <span data-source-version>{import.meta.env.VITE_SOURCE_COMMIT?.slice(0,7)||'lokal'}</span></p><a href="#/review">Lingkungan review pengembangan</a></div></footer>;
}
export function DevelopmentReviewShell({ children }: { children: ReactNode }) {
  return <aside className="ds-review-shell" aria-label="Lingkungan review pengembangan"><div className="ds-container"><p className="ds-label">Review pengembangan / terpisah dari pengalaman publik</p><div>{children}<a href="#/ui-lab">UI laboratory</a><a href="./responsive-review.html">Pemeriksaan viewport</a><a href="#/submission">Simulasi editorial</a><a href="#/legacy">Eksperimen visual terdahulu</a><a href="#/">Beranda tanpa kontrol</a></div></div></aside>;
}
