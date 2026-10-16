import { useEffect, useState, type FormEvent } from 'react';
import { Button } from './components/Button';
import { TECatalogue, ExpeditionDetail } from './ExpeditionExperience';
import { PDCatalogue, ActivitiesCatalogue, ActivityDetail } from './ActivityExperience';
import {WorksCatalogue,PublicationDetail,InstitutionalAbout,InstitutionalHistory,SyntheticMembers} from './InstitutionalExperience';
import { Homepage } from './Homepage';
import { InstitutionalHeader, InstitutionalFooter, DevelopmentReviewShell } from './components/InstitutionalShell';
import { ArchiveHome } from './ArchiveDesigns';

type Direction = 'fieldnotes' | 'signal';
type NavChoice = 'grouped' | 'direct';
function PageTitle({eyebrow,title,description}:{eyebrow:string;title:string;description?:string}) {
  return <header className="page-container pb-8 pt-12 md:pt-16"><p className="eyebrow text-muted">{eyebrow}</p><h1 className="site-title mt-4 text-display">{title}</h1>{description&&<p className="reading-copy mt-6 text-lg">{description}</p>}</header>;
}

function Submission() {
  const [stage,setStage]=useState(0);const [title,setTitle]=useState('Catatan tambahan perjalanan TE11');const [summary,setSummary]=useState('Contoh sintetis informasi baru untuk editor.');const [canonical,setCanonical]=useState('');const [facts,setFacts]=useState(false);const [rights,setRights]=useState(false);const [message,setMessage]=useState('');
  function submit(e:FormEvent){e.preventDefault();setStage(1);setMessage('Informasi contoh berpindah ke editor. Tidak ada pesan yang dikirim.');}
  return <><PageTitle eyebrow="Simulasi / organizer → redaksi" title="Informasi kecil, catatan yang utuh." description="Organizer tidak perlu menjadi pengelola CMS. Editor menautkan informasi pada catatan yang tepat, lalu publisher memeriksa sebelum konten tampil."/><section className="page-container pb-12"><ol className="mb-8 flex flex-wrap gap-4 text-sm">{['Organizer','Editor','Publisher','Pratinjau publik'].map((s,i)=><li className={i===stage?'font-semibold text-forest':'text-muted'} aria-current={i===stage?'step':undefined} key={s}>{i+1}. {s}</li>)}</ol><div className="max-w-2xl panel">{stage===0?<form onSubmit={submit}><h2 className="font-editorial text-2xl">Berikan informasi singkat.</h2><label className="mt-5 block text-sm font-semibold">Judul<input required className="field mt-2" value={title} onChange={e=>setTitle(e.target.value)} maxLength={120}/></label><label className="mt-5 block text-sm font-semibold">Informasi untuk editor<textarea required className="field mt-2" value={summary} onChange={e=>setSummary(e.target.value)} rows={4} maxLength={800}/></label><p className="mt-4 text-sm text-muted">Gunakan teks contoh; jangan memasukkan data pribadi. Kanal submission institusi belum ditetapkan.</p><div className="mt-6"><Button type="submit">Teruskan ke editor (simulasi)</Button></div></form>:stage===1?<><h2 className="font-editorial text-2xl">Temukan catatan yang sudah ada.</h2><p className="mt-4 text-sm text-muted">{title}</p><label className="mt-6 block text-sm font-semibold">Catatan kegiatan<select aria-label="Catatan kegiatan" className="field mt-2" value={canonical} onChange={e=>setCanonical(e.target.value)}><option value="">Pilih catatan</option><option value="te11">Tursina Explore #11 — Bukit Raya</option></select></label><p className="mt-4 text-sm text-muted">Informasi menambah catatan TE11, tanpa membuat ekspedisi duplikat.</p><div className="mt-6"><Button disabled={!canonical} onClick={()=>setStage(2)}>Lanjut ke review publisher</Button></div></>:stage===2?<><h2 className="font-editorial text-2xl">Periksa sebelum tampil.</h2><label className="mt-6 flex items-start gap-3 text-sm"><input type="checkbox" className="mt-1" checked={facts} onChange={e=>setFacts(e.target.checked)}/>Fakta contoh dan hubungan catatan sudah ditinjau.</label><label className="mt-4 flex items-start gap-3 text-sm"><input type="checkbox" className="mt-1" checked={rights} onChange={e=>setRights(e.target.checked)}/>Materi contoh aman ditampilkan; tidak ada sumber asli atau foto tanpa izin.</label><p className="mt-4 text-sm text-muted">Checklist ini hanya simulasi. Tidak memberi izin pada data atau aset institusi yang sebenarnya.</p><div className="mt-6"><Button disabled={!facts||!rights} onClick={()=>{setStage(3);setMessage('Pratinjau contoh tersedia di sesi ini, bukan publikasi produksi.');}}>Tampilkan pratinjau contoh</Button></div></>:<><p className="eyebrow text-muted">Pratinjau sintetis / terkait TE11</p><h2 className="mt-4 font-editorial text-2xl">{title}</h2><p className="mt-4 text-muted">{summary}</p><a className="site-nav-link mt-5" href="#/expedition/te11">Buka catatan kanonis TE11 →</a><div className="mt-4"><Button variant="secondary" onClick={()=>{setStage(0);setCanonical('');setFacts(false);setRights(false);setMessage('Simulasi dimulai ulang.');}}>Mulai ulang</Button></div></>}</div><p role="status" className="mt-6 text-sm text-success">{message}</p></section></>;
}

function Missing(){return <><PageTitle eyebrow="Navigasi" title="Catatan belum tersedia."/><div className="page-container pb-12"><a className="button button-secondary" href="#/review">Kembali ke Beranda</a></div></>;}

export function SitePrototype({route: routeValue}:{route:string}) {
  const [route, query = ""] = routeValue.split("?");
  const params = new URLSearchParams(query);
  const [direction,setDirection]=useState<Direction>('fieldnotes');const [navigation,setNavigation]=useState<NavChoice>('grouped');
  useEffect(()=>{document.querySelectorAll('details.site-menu').forEach(d=>d.removeAttribute('open'));window.scrollTo(0,0);},[route]);
  const parts=route.split('/').filter(Boolean);
  let page;
  if(route==='/review'||route==='/')page=<Homepage/>;
  else if(route==='/legacy')page=<ArchiveHome direction={direction}/>;
  else if(route==='/program/te')page=<TECatalogue/>;
  else if(parts[0]==='expedition')page=<ExpeditionDetail id={parts[1]}/>;
  else if(route==='/program/pd')page=<PDCatalogue params={params}/>;
  else if(route==='/members')page=<SyntheticMembers/>;
  else if(route==='/jejak')page=<InstitutionalHistory params={params}/>;
  else if(route==='/about')page=<InstitutionalAbout/>;
  else if(route==='/submission')page=<Submission/>;
  else if(route==='/publications'||route==='/knowledge')page=<WorksCatalogue key={route} knowledge={route==='/knowledge'} params={params}/>;
  else if(parts[0]==='publication')page=<PublicationDetail key={parts[1]} id={parts[1]} params={params}/>;
  else if(route==='/activities')page=<ActivitiesCatalogue params={params}/>;
  else if(parts[0]==='activity')page=<ActivityDetail id={parts[1]} params={params}/>;
  else page=<Missing/>;

  const foundationPage=['/publications','/knowledge','/about','/jejak','/members'].includes(route)||parts[0]==='publication'||route==='/program/pd'||route==='/activities'||parts[0]==='activity'||route==='/'||route==='/review'||route==='/program/te'||parts[0]==='expedition'||route==='/publication/sacred-gatekeeper';
  const reviewing=route==='/review'||route==='/legacy';
  return <div className="ds-site">
    <a href="#public-content" className="ds-skip" onClick={event=>{event.preventDefault();document.getElementById('public-content')?.focus();}}>Langsung ke isi website</a>
    {reviewing&&<DevelopmentReviewShell><label>Navigasi <select aria-label="Alternatif navigasi" value={navigation} onChange={e=>setNavigation(e.target.value as NavChoice)}><option value="grouped">A · Kelompok konten</option><option value="direct">B · Program langsung</option></select></label>{route==='/legacy'&&<label>Arah historis <select aria-label="Arah visual" value={direction} onChange={e=>setDirection(e.target.value as Direction)}><option value="fieldnotes">A · Jurnal Ekspedisi</option><option value="signal">B · Atlas Tursina</option></select></label>}</DevelopmentReviewShell>}
    <InstitutionalHeader route={route} navigation={reviewing?navigation:'grouped'}/>
    <main id="public-content" tabIndex={-1}>{foundationPage?page:<div className="site-shell bg-paper text-ink" data-direction={direction}>{page}</div>}</main>
    <InstitutionalFooter/>
  </div>;
}
