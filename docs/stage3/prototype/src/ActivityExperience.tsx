import {useContentReadModel} from './ContentReadModel';
import {documentedDateGroups} from './domain/read';
import {RelatedRecords,DateEvidence} from './components/RecordContext';
import { useContext, useEffect } from 'react';
import { useActivityRecords } from './ActivityContent';
import { cohortOptions, filterPDRecords, pdQuery, readPDFilters, type ActivityFilters, type ActivityRecord } from './activity-model';
import { ActivityMetadata, ActivityPreview, Breadcrumbs, MediaContext, CanonicalMediaContext, DocumentaryMedia, EvidenceDisclosure, ProgrammeEntry, SectionHeading, TextLink } from './components/Foundation';
import { resolvePublicMedia } from './domain/validate.ts';
import { Button } from './components/Button';

const kindLabels = {
  expedition: "Ekspedisi", "environmental-service": "Kegiatan lingkungan",
  'division-education': 'Pendidikan divisi', 'basic-education': 'Pendidikan dasar',
  'institutional-continuity': 'Tradisi organisasi', workshop: 'Lokakarya',
};
function catalogueHref(record: ActivityRecord, filters: ActivityFilters) {
  return record.programId === 'pd' ? `#/program/pd${pdQuery(filters)}` : '#/activities';
}
function setPDFilters(filters: ActivityFilters, focusResults = false) {
  location.hash = `/program/pd${pdQuery(filters)}`;
  if (focusResults) {
    const heading = document.getElementById('pd-results');
    heading?.scrollIntoView({ block: 'start' });
    heading?.focus({ preventScroll: true });
  }
}
export function PDCatalogue({ params }: { params: URLSearchParams }) {
  const {registry,view:{divisions:divisionDefinitions,programmes:programmeDefinitions}}=useContentReadModel();
  const records = useActivityRecords().filter(r => r.programId === 'pd');
  const filters = readPDFilters(params, records, divisionDefinitions);
  const matched = filterPDRecords(records, filters);
  const ordered = documentedDateGroups(registry, matched);const shown=[...ordered.dated,...ordered.undated];
  const cohorts = cohortOptions(records);
  const updateFilters = (patch: Partial<ActivityFilters>, focus = false) => {
    const current = readPDFilters(new URLSearchParams(location.hash.split('?')[1] ?? ''), records, divisionDefinitions);
    setPDFilters({ ...current, ...patch }, focus);
  };
  const label = divisionDefinitions.find(d => d.id === filters.division)?.name;
  const programme = programmeDefinitions.find(p => p.id === 'pd')!;
  // Invalid/outdated deep-link facets normalize to supported values. URL, controls
  // and result projection have one source of truth; no remembered hidden filter.
  useEffect(() => {
    const canonical = `#/program/pd${pdQuery(filters)}`;
    const incoming = `#/program/pd${params.size ? '?' + params.toString() : ''}`;
    if (location.hash === incoming && incoming !== canonical) location.replace(canonical);
  }, [filters.division, filters.cohort, params.toString()]);
  return <div className="activity-experience">
    <header className="ds-container activity-page-head">
      <Breadcrumbs items={[{ label: 'Beranda', href: '#/' }, { label: programme.name }]} />
      <p className="ds-label">Program / pendidikan anggota</p>
      <h1 className="ds-display">{programme.name}</h1>
      <p className="ds-intro activity-deck">{programme.description} Latihan, persiapan, spesialisasi lapangan, dan presentasi laporan menjadi bagian dari proses belajar.</p>
      <p className="ds-body activity-support">Lima bidang memiliki ruang belajar yang berbeda. Catatan kegiatan dapat ditelusuri menurut bidang dan angkatan yang memang tercatat, tanpa menjadikan angkatan sebagai syarat setiap kegiatan.</p><button type="button" className="button button-secondary activity-jump" onClick={() => { const results = document.getElementById("pd-results"); results?.scrollIntoView({block:"start"}); results?.focus({preventScroll:true}); }}>Langsung ke kegiatan & filter<span aria-hidden="true">↓</span></button>
    </header>
    <section className="ds-container ds-section" aria-labelledby="pd-fields">
      <p className="ds-label">Lima bidang pendidikan</p><h2 className="ds-section-title" id="pd-fields">Pilih ruang belajarnya.</h2>
      <p className="ds-metadata activity-support">Gambaran bidang merujuk dokumen 2025; bukan pernyataan bahwa seluruh standar atau hasil teknis telah terpenuhi.</p>
      <div className="activity-divisions">{divisionDefinitions.map((division, i) => <article className="activity-division" key={division.id}>
        <span className="ds-label" aria-hidden="true">0{i + 1} / {division.id}</span>
        <h3 className="ds-content-title">{division.name}</h3>{division.alias && <p className="ds-metadata">{division.alias}</p>}
        <p>{division.description}</p><button type="button" className="ds-link" aria-pressed={filters.division === division.id} onClick={() => updateFilters({ division: division.id }, true)}>Lihat {division.name}<span aria-hidden="true">↓</span></button>
      </article>)}</div>
    </section>
    <section className="ds-container ds-section" aria-labelledby="pd-results">
      <h2 className="ds-section-title" id="pd-results" tabIndex={-1}>Catatan Pemantapan Divisi</h2>
      <div className="activity-filters">
        <label>Divisi<select className="field" aria-label="Filter divisi" value={filters.division} onChange={e => updateFilters({ division: e.target.value })}><option value="all">Semua divisi</option>{divisionDefinitions.map(d => <option value={d.id} key={d.id}>{d.name}</option>)}</select></label>
        <label>Angkatan<select className="field" aria-label="Filter angkatan" value={filters.cohort} onChange={e => updateFilters({ cohort: e.target.value })}><option value="all">Semua angkatan</option>{cohorts.map(c => <option value={c} key={c}>{c}</option>)}{records.some(r => !r.cohortIds?.length) && <option value="none">Tanpa angkatan tercatat</option>}</select></label>
        <Button variant="secondary" onClick={() => setPDFilters({ division: 'all', cohort: 'all' })} disabled={filters.division === 'all' && filters.cohort === 'all'}>Reset filter</Button>
      </div>
      <p role="status" aria-live="polite" className="activity-result-status">{shown.length} catatan{label ? ` / ${label}` : ' / semua divisi'}{filters.cohort !== 'all' ? ` / ${filters.cohort === 'none' ? 'tanpa angkatan tercatat' : filters.cohort}` : ''}</p>
      <p className="ds-caption">Terbaru menurut tanggal yang terdokumentasi. Tanggal perkiraan tetap ditandai; catatan tanpa tanggal dipisahkan.</p>{shown.length ? <div data-activity-results>{ordered.dated.map(record => <ActivityPreview key={record.id} activity={{ ...record, href: `${record.href}${pdQuery(filters)}` }} />)}{!!ordered.undated.length&&<h3 className="ds-content-title">Waktu belum diketahui</h3>}{ordered.undated.map(record=><ActivityPreview key={record.id} activity={{...record,href:`${record.href}${pdQuery(filters)}`}}/>)}</div> : <div className="activity-empty"><h3 className="ds-content-title">Belum ada catatan yang sesuai.</h3><p>Ini batas isi katalog yang tersedia, bukan bukti kegiatan tidak pernah berlangsung. Ubah pilihan atau gunakan Reset filter.</p></div>}
    </section>
    <section className="ds-container ds-section"><EvidenceDisclosure summary="Tentang program dan isi katalog"><p>Tujuan dan rangkaian pendidikan bersumber dari LPJ Pengurus 2023–2024 dan 2025. Lima bidang dan ruang belajarnya diringkas dari standar pendidikan dalam dokumen 2025.</p><p>Daftar ini memuat kegiatan historis yang terdokumentasi. Pelaksanaan, kelengkapan laporan, dan izin publikasi media ditinjau secara terpisah. Angkatan merupakan hubungan kontekstual; bukan induk wajib semua kegiatan.</p></EvidenceDisclosure></section>
  </div>;
}
export function ActivitiesCatalogue({params=new URLSearchParams()}:{params?:URLSearchParams}) {
  const query=params.get('q')??'';const search=(text:string)=>{location.hash='/activities'+(text?'?'+new URLSearchParams({q:text}):'');};
  const {registry,view:{divisions:divisionDefinitions,programmes:programmeDefinitions}}=useContentReadModel();
  const records = useActivityRecords().filter(r => !r.programId);
  const matches = records.filter(r => r.editorial.verification !== 'synthetic'&&`${r.title} ${r.summary} ${r.location??''}`.toLocaleLowerCase('id').includes(query.trim().toLocaleLowerCase('id')));
  const ordered = documentedDateGroups(registry,matches);const historical=[...ordered.dated,...ordered.undated];
  const demonstrations = records.filter(r => r.editorial.verification === 'synthetic');
  return <div className="activity-experience">
    <header className="ds-container activity-page-head"><Breadcrumbs items={[{ label: 'Beranda', href: '#/' }, { label: 'Kegiatan' }]} /><p className="ds-label">Kegiatan Tursina</p><h1 className="ds-display">Kerja bersama, dalam banyak bentuk.</h1><p className="ds-intro activity-deck">Pendidikan dasar, napak tilas, dan kehidupan organisasi mempunyai catatan tersendiri. Jelajahi kegiatan yang terdokumentasi, termasuk yang tidak berada di bawah program Tursina Explore atau Pemantapan Divisi.</p></header>
    <section className="ds-container ds-section"><SectionHeading label="Arsip kegiatan" title="Pendidikan dan kesinambungan organisasi" description="Identitas, tanggal, dan kedalaman cerita mengikuti sumber yang tersedia. Bukan daftar kegiatan terkini." /><label>Cari kegiatan<input className="field" type="search" value={query} onChange={e=>search(e.target.value)}/></label><Button variant="secondary" onClick={()=>search('')}>Reset pencarian</Button><p role="status">{historical.length} catatan</p><p className="ds-caption">Terbaru menurut tanggal yang terdokumentasi; catatan tanpa tanggal berada dalam kelompok tersendiri.</p><div data-activity-results>{historical.map(record => <div key={record.id}>{ordered.undated[0]?.id===record.id&&<h3 className="ds-content-title">Waktu belum diketahui</h3>}<ActivityPreview activity={{...record,href:record.href+(query?'?'+new URLSearchParams({q:query}):'')}} /></div>)}</div>{!historical.length&&<p>Tidak ada catatan yang sesuai. Ubah atau reset pencarian.</p>}</section>
    <section className="ds-container ds-section"><SectionHeading label="Jelajahi program" title="Perjalanan dan pendidikan lanjutan" /><div className="activity-programmes">{programmeDefinitions.map((p, i) => <ProgrammeEntry key={p.id} index={`0${i + 1}`} title={p.name} description={p.description} href={p.href} action={`Buka ${p.name}`} />)}</div></section>
    {demonstrations.length > 0 && <section className="ds-container ds-section activity-demo"><SectionHeading label="Contoh prototipe / sintetis" title="Contoh kegiatan mandiri" description="Bagian ini menguji bentuk catatan. Bukan kegiatan, rencana, atau jadwal penerimaan anggota yang berlaku." />{demonstrations.map(record => <ActivityPreview key={record.id} activity={record} />)}</section>}
  </div>;
}
function Classification({ record }: { record: ActivityRecord }) {
  const {view:{divisions:divisionDefinitions,programmes:programmeDefinitions}}=useContentReadModel();
  const programme = programmeDefinitions.find(p => p.id === record.programId);
  const fields = divisionDefinitions.filter(d => record.divisionIds?.includes(d.id));
  if (!programme && !fields.length && !record.cohortIds?.length) return null;
  return <dl className="activity-classification">
    {programme && <div><dt>Program</dt><dd><a href={programme.href}>{programme.name}</a></dd></div>}
    {fields.length > 0 && <div><dt>Bidang</dt><dd>{fields.map(d => d.name).join(' · ')}</dd></div>}
    {!!record.cohortIds?.length && <div><dt>Angkatan</dt><dd>{record.cohortIds.join(' · ')}</dd></div>}
  </dl>;
}
export function ActivityDetail({ id, params }: { id: string; params: URLSearchParams }) {
  const {view:{activityMedia, sources:activitySources, divisions:divisionDefinitions, programmes:programmeDefinitions}}=useContentReadModel();
  const records = useActivityRecords();
  const reviewMedia = useContext(MediaContext);
  const mediaRegistry = useContext(CanonicalMediaContext);
  const record = records.find(r => r.id === id);
  if (!record) return <div className="ds-container activity-page-head"><h1 className="ds-display">Catatan belum tersedia.</h1><TextLink href="#/activities">Kembali ke kegiatan</TextLink></div>;
  const filters = readPDFilters(params, records.filter(r => r.programId === 'pd'), divisionDefinitions);
  const back = record.programId==='pd'?catalogueHref(record,filters):'#/activities'+(params.get('q')?'?'+new URLSearchParams({q:params.get('q')!}):'');
  const programme = programmeDefinitions.find(p => p.id === record.programId);
  const media = activityMedia.filter(m => record.mediaIds?.includes(m.id));
  const cleared = resolvePublicMedia(mediaRegistry, record.id, 'activity-documentary');
  const displayedMedia = media.filter(m => record.depth === 'rich' || reviewMedia[m.role] || cleared.some(a=>a.id===m.id));
  const related = records.filter(r => r.id !== record.id && ((record.programId === 'pd' && r.programId === 'pd' && r.divisionIds?.some(d => record.divisionIds?.includes(d)))));
  const synthetic = record.editorial.verification === 'synthetic';
  return <article className="activity-experience" data-activity-id={record.id}>
    <header className="ds-container activity-page-head">
      <Breadcrumbs items={[{ label: 'Beranda', href: '#/' }, { label: programme?.name ?? 'Kegiatan', href: back }, { label: record.title }]} />
      <p className="ds-label">{synthetic ? 'Contoh sintetis / bukan kegiatan aktual' : kindLabels[record.kind]}</p>
      <h1 className="ds-display activity-title">{record.title}</h1>
      <p className="ds-intro activity-deck">{record.summary}</p>
      <ActivityMetadata activity={record} inline />{record.location && <p className="ds-metadata activity-place">{record.location}</p>}{!!record.uncertainties?.length&&<ul className="activity-precision">{record.uncertainties.map(n=><li key={n.title}><strong>{n.title}.</strong> {n.explanation}</li>)}</ul>}
      <Classification record={record} />
      <TextLink href={back}>{programme ? 'Kembali ke katalog PD' : 'Kembali ke katalog kegiatan'}</TextLink>
    </header>
    {(!!record.chapters?.length || displayedMedia.length > 0) && <div className={`ds-container ds-section activity-documentary${displayedMedia.length ? ' activity-with-media' : ''}`}>
      <div>{record.chapters?.map(chapter => <section className="activity-chapter" key={chapter.id}><h2 className="ds-section-title">{chapter.title}</h2><div className="ds-reading">{chapter.paragraphs.map(p => <p key={p}>{p}</p>)}</div></section>)}</div>
      {displayedMedia.length > 0 && <aside className="activity-media">{displayedMedia.map(m => <DocumentaryMedia key={m.id} role={m.role} recordId={record.id} placement="activity-documentary" omitWhenUnavailable={record.depth === 'basic'} fallbackTitle={m.title} fallback={m.context} />)}</aside>}
    </div>}
    {record.learning && <section className="activity-learning ds-section"><div className="ds-container"><SectionHeading label="Ruang belajar / dokumen historis" title={record.learning.title} description={record.learning.context} /><ul>{record.learning.items.map(item => <li key={item}>{item}</li>)}</ul></div></section>}
    <RelatedRecords id={record.id}/>
    {related.length > 0 && <section className="ds-container ds-section"><SectionHeading label="Bidang yang sama" title="Telusuri catatan lainnya." description="Setiap kegiatan tetap memiliki identitas dan dasar catatannya sendiri." />{related.map(r => <ActivityPreview key={r.id} activity={r} />)}</section>}
    <section className="ds-container ds-section activity-sources"><EvidenceDisclosure>
      <DateEvidence id={record.id}/>
      {record.sourceUses.map(use => <p key={`${use.sourceId}-${use.locator}`}><strong>{activitySources.find(s => s.id === use.sourceId)?.label}</strong> — {use.locator}.</p>)}
      {record.materials?.length ? <div className="activity-materials"><p className="ds-label">Rujukan materi / bukan unduhan publik</p><ul>{record.materials.map(m => <li key={m.title}>{m.title}</li>)}</ul></div> : null}
      {!synthetic && <p>Ringkasan publik tidak mereproduksi laporan asli, data peserta atau lampiran privat. Standar pembelajaran tidak otomatis menjadi bukti pencapaian teknis atau pengesahan laporan.</p>}
      {record.editorial.report === 'submission-delays-reported' && <p>LPJ mencatat keterlambatan pengumpulan laporan PD XXIX secara umum. Halaman ini tidak menetapkan pengesahan laporan masing-masing divisi.</p>}
      {media.length > 0 && <p>Dokumentasi telah ditinjau untuk desain privat. Hak pencipta, kredit, privasi dan izin penggunaan gambar tetap diperiksa per aset; gambar HOLD tidak masuk tampilan publik.</p>}
    </EvidenceDisclosure><TextLink href={back}>{programme ? 'Semua catatan Pemantapan Divisi' : 'Semua kegiatan Tursina'}</TextLink></section>
  </article>;
}
