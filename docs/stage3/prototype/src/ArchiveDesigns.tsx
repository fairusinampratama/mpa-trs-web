import { useState, type ReactNode } from 'react';
import { ActivityCard } from './components/ActivityCard';
import { StatusLabel } from './components/StatusLabel';
import { expeditionRecords, pdRecords, publicWorks } from './content';

export type ArchiveDirection = 'fieldnotes' | 'signal';

const te11Log = [
  ['20-21 NOV', 'Malang - Surabaya', 'Persiapan terakhir, upacara pemberangkatan, lalu perjalanan menuju Pelabuhan Tanjung Perak.'],
  ['21-23 NOV', 'Laut Jawa', 'KM Bukit Raya membawa tim menuju Pontianak. Waktu di kapal juga dipakai untuk menyiapkan keluaran ekspedisi.'],
  ['25-26 NOV', 'Pontianak - Rantau Malam', 'Travel, speedboat, dan klotok menghubungkan Nanga Pinoh, Serawai, Jelundung, dan Rantau Malam.'],
  ['27-30 NOV', 'Jalur Bukit Raya', 'Empat hari empat malam di jalur. Laporan mencatat Puncak Kakam dicapai pada 29 November sekitar pukul 13.50.'],
  ['1-2 DES', 'Rantau Malam', 'Waktu tambahan dipakai untuk pemulihan, perjumpaan, dan pengumpulan data sebelum perjalanan pulang.'],
  ['6 DES', 'Kembali ke Malang', 'Rute pulang berubah melalui Semarang karena jadwal kapal; penyesuaian dicatat sebagai pelajaran logistik.'],
];

function MediaPlate({number,title,caption,kind='landscape'}:{number:string;title:string;caption:string;kind?:'landscape'|'portrait'|'detail'}) {
  return <figure className={`media-plate media-plate-${kind}`}>
    <div className="media-plate-stage"><span aria-hidden="true">{number}</span><p>Pratinjau komposisi foto<br/>menunggu izin publikasi</p></div>
    <figcaption><b>{title}</b><span>{caption}</span></figcaption>
  </figure>;
}

function SourceFlag({children}:{children:ReactNode}) {return <span className="source-flag">{children}</span>;}

function DocumentaryHome(){
  return <>
    <section className="page-container archive-doc-hero">
      <MediaPlate number="01" title="Puncak Kakam, 29 November 2024" caption="Kandidat foto: tim TE11 di titik puncak. Kredit dan persetujuan subjek belum dikonfirmasi."/>
      <div className="archive-doc-intro"><p className="eyebrow">MAPALA Tursina / arsip perjalanan</p><h1>Catatan dari<br/>jalur yang nyata.</h1><p>Sejak 1995, Tursina belajar melalui perjalanan, kerja lapangan, dan pengetahuan yang dikembalikan kepada organisasi.</p><div className="archive-actions"><a className="button button-primary" href="#/expedition/te11">Baca jurnal TE11</a><a className="site-nav-link" href="#/program/pd">Buka pendidikan lapangan →</a></div><dl className="archive-fact-strip"><div><dt>20 Nov-6 Des</dt><dd>rentang TE11</dd></div><div><dt>4 hari 4 malam</dt><dd>catatan di jalur</dd></div><div><dt>5 divisi</dt><dd>ruang keterampilan</dd></div></dl></div>
    </section>
    <section className="page-container archive-ledger"><div className="archive-section-lead"><p className="eyebrow">Nomor lapangan / 011</p><h2>Bukit Raya tidak dimulai di puncak.</h2><p>Arsip TE11 bergerak dari sekretariat, pelabuhan, kapal, perjalanan sungai, Rantau Malam, hutan hujan, hingga pulang melalui rute yang berubah.</p></div><ol className="archive-ledger-list">{te11Log.slice(0,4).map(([date,place,text],i)=><li key={date}><span>{String(i+1).padStart(2,'0')}</span><div><p className="eyebrow">{date} / {place}</p><p>{text}</p></div></li>)}</ol></section>
    <section className="page-container archive-feature-pair"><MediaPlate number="02" title="Navigasi darat, PD Gunung Hutan XXIX" caption="Kandidat foto: peta dan kompas di medan Gunung Lawu." kind="portrait"/><div><p className="eyebrow">Pendidikan / Agustus 2025</p><h2>Belajar membaca medan, bukan sekadar melintasinya.</h2><p>Pemantapan Divisi XXIX menghubungkan latihan, proposal, simulasi, spesialisasi lapangan, dan presentasi laporan. Lima divisi memiliki tempat dan rentang pelaksanaan yang berbeda.</p><a className="site-nav-link" href="#/program/pd">Telusuri PD XXIX →</a></div></section>
  </>;
}

function AtlasHome(){
  const indexed=[expeditionRecords[0],...pdRecords.filter(r=>r.cohort==='XXIX').slice(0,3)];
  return <>
    <section className="page-container atlas-hero"><div className="atlas-kicker"><span>ARSIP / 1995-</span><span>UIN MAULANA MALIK IBRAHIM MALANG</span></div><div className="atlas-title"><p className="eyebrow">Panduan lapangan institusi</p><h1>Tursina adalah<br/>ruang belajar<br/>yang bergerak.</h1></div><div className="atlas-opening"><p>Ilmiah, sosial, olahraga, rekreasi, dan kekeluargaan bertemu dalam pendidikan anggota, ekspedisi, tradisi, dan karya.</p><a className="button button-primary" href="#/about">Baca identitas Tursina</a></div><MediaPlate number="TE 11" title="Ekspedisi sebagai arsip pengetahuan" caption="Komposisi foto hutan hujan atau perjalanan sungai; izin belum dikonfirmasi."/></section>
    <section className="page-container atlas-index"><header><p className="eyebrow">Indeks kerja / pilihan terverifikasi</p><h2>Program, tempat, bukti.</h2></header><div className="atlas-index-table">{indexed.map((a,i)=><a key={a.id} href={a.href}><span>{String(i+1).padStart(2,'0')}</span><strong>{a.title}</strong><small>{a.date}<br/>{a.location}</small><em>{a.evidenceLabel}</em></a>)}</div></section>
    <section className="page-container atlas-principles"><div><span>01</span><h3>Perjalanan</h3><p>Dibaca sebagai rangkaian, bukan satu foto puncak.</p></div><div><span>02</span><h3>Pendidikan</h3><p>Keahlian tumbuh melalui forum, latihan, simulasi, dan lapangan.</p></div><div><span>03</span><h3>Pengetahuan</h3><p>Laporan dan karya menyimpan pengalaman untuk generasi berikutnya.</p></div><div><span>04</span><h3>Kekeluargaan</h3><p>Angkatan dan tradisi memberi konteks tanpa menjadi hierarki navigasi utama.</p></div></section>
  </>;
}

export function ArchiveHome({direction}:{direction:ArchiveDirection}) {return direction==='fieldnotes'?<DocumentaryHome/>:<AtlasHome/>;}

function TE11Documentary(){return <>
  <section className="page-container doc-story-head"><a className="site-nav-link" href="#/program/te">← Semua edisi</a><p className="eyebrow">Tursina Explore / Edisi 11 / 2024</p><h1>Bukit Raya:<br/>sebuah perjalanan<br/>yang berubah di jalan.</h1><p className="doc-deck">Dari Tanjung Perak ke Pontianak, lalu Nanga Pinoh, Serawai, Rantau Malam, dan Puncak Kakam. Sebuah catatan tentang medan, logistik, perjumpaan, dan kemampuan beradaptasi.</p><SourceFlag>Draft LPJ TE11, bagian 1-4</SourceFlag></section>
  <section className="page-container doc-photo-sequence"><MediaPlate number="01" title="Hutan hujan Bukit Raya" caption="Kandidat pembuka: bentang hutan dari jalur. Lokasi spesifik perlu konfirmasi caption."/><div className="doc-photo-pair"><MediaPlate number="02" title="Puncak Kakam" caption="Laporan: 29 November 2024, sekitar pukul 13.50."/><MediaPlate number="03" title="Nepenthes di jalur" caption="Identifikasi spesies belum dilakukan; caption publik harus tetap deskriptif." kind="detail"/></div></section>
  <section className="page-container doc-log"><header><p className="eyebrow">Log perjalanan / dilaporkan</p><h2>Enam simpul, satu ekspedisi.</h2></header><ol>{te11Log.map(([date,place,text])=><li key={date}><time>{date}</time><h3>{place}</h3><p>{text}</p></li>)}</ol></section>
  <section className="page-container doc-outcomes"><div><p className="eyebrow">Yang terlaksana</p><h2>Puncak dicapai. Rute disesuaikan. Waktu desa bertambah.</h2><p>Laporan menyebut pendakian selesai lebih cepat dari perkiraan awal sehingga tersedia lebih banyak waktu untuk pengumpulan data dan interaksi di Rantau Malam.</p></div><aside><h3>Batas klaim</h3><ul><li>Target film dokumenter turun menjadi video aftermovie.</li><li>Klaim carbon offsetting belum diverifikasi independen.</li><li>Penamaan provinsi berbeda di bagian laporan; halaman memakai wilayah Kalimantan.</li><li>Foto, kredit, dan persetujuan subjek belum disahkan untuk publikasi.</li></ul></aside></section>
  <section className="page-container doc-related"><p className="eyebrow">Karya terkait</p>{publicWorks.filter(w=>w.related==='te11').map(w=><a key={w.id} href={`#/publication/${w.id}`}><span>{w.type}</span><strong>{w.title}</strong><small>{w.date} · {w.source}</small></a>)}</section>
  </>}

function TE11Atlas(){return <>
  <section className="page-container dossier-head"><div><a className="site-nav-link" href="#/program/te">← Indeks Tursina Explore</a><p className="eyebrow">Dossier ekspedisi / TE.011</p><h1>Bukit Raya</h1><p>Arsip perjalanan dan keluaran, 2024</p></div><dl><div><dt>Status</dt><dd>Selesai / historis</dd></div><div><dt>Rentang</dt><dd>20 Nov-6 Des 2024</dd></div><div><dt>Titik puncak</dt><dd>Puncak Kakam, 2.278 mdpl</dd></div><div><dt>Catatan jalur</dt><dd>4 hari 4 malam</dd></div><div><dt>Sumber</dt><dd>Draft LPJ TE11</dd></div></dl></section>
  <section className="page-container dossier-grid"><MediaPlate number="PLATE 01" title="Dokumentasi puncak" caption="Kandidat foto tim; persetujuan subjek dan kredit belum dikonfirmasi."/><article><p className="eyebrow">Abstrak</p><h2>Ekspedisi sebagai kerja lintas ruang.</h2><p>TE11 menggabungkan perjalanan lintas moda, pendakian, kerja dokumentasi, perhatian lingkungan, dan interaksi sosial budaya. Halaman membedakan tujuan awal, pelaksanaan yang dilaporkan, dan keluaran yang benar-benar ditemukan.</p></article><article className="dossier-route"><p className="eyebrow">Rute terlapor</p><ol>{te11Log.map(([date,place])=><li key={date}><span>{date}</span><b>{place}</b></li>)}</ol></article><MediaPlate number="PLATE 02" title="Detail ekologi" caption="Kandidat foto Nepenthes; identifikasi ilmiah belum tersedia." kind="detail"/></section>
  <section className="page-container dossier-status"><div><span>Rencana awal</span><strong>Dokumenter + kajian lingkungan dan budaya</strong></div><div><span>Perubahan</span><strong>Tim dan target keluaran disederhanakan</strong></div><div><span>Ditemukan</span><strong>Draft LPJ, artikel, arsip foto, rencana penyuntingan</strong></div><div><span>Belum dipastikan</span><strong>Film final, verifikasi klaim karbon, izin media</strong></div></section>
  </>}

export function ArchiveTE11({direction}:{direction:ArchiveDirection}) {return direction==='fieldnotes'?<TE11Documentary/>:<TE11Atlas/>;}

export function ArchivePDBrowse({direction}:{direction:ArchiveDirection}){
  const [division,setDivision]=useState('all');
  const [cohort,setCohort]=useState('all');
  const records=pdRecords.filter(a=>(division==='all'||a.division===division)&&(cohort==='all'||a.cohort===cohort));
  return <><section className="page-container pd-archive-head"><p className="eyebrow">Pendidikan / pengalaman lapangan</p><h1>Pemantapan Divisi</h1><p>Setiap divisi memiliki medan, standar keterampilan, dan bentuk dokumentasi sendiri. Satu katalog, lima jalur belajar.</p></section><section className="page-container pd-filter"><label>Divisi<select aria-label="Filter divisi" value={division} onChange={e=>setDivision(e.target.value)}><option value="all">Semua divisi</option><option value="GH">Gunung Hutan</option><option value="RC">Panjat Tebing</option><option value="ORAD">Olahraga Arus Deras</option><option value="LH">Lingkungan Hidup</option><option value="CAVING">Susur Gua</option></select></label><label>Angkatan<select aria-label="Filter angkatan" value={cohort} onChange={e=>setCohort(e.target.value)}><option value="all">Semua angkatan</option><option value="XXVI">XXVI</option><option value="XXIX">XXIX</option></select></label></section>{direction==='fieldnotes'?<section className="page-container pd-documentary"><div className="pd-feature"><MediaPlate number="RC" title="Tebing Siung / Agustus 2025" caption="Kandidat foto: dua pemanjat dan tim belay. Izin subjek belum dikonfirmasi." kind="portrait"/><div><p className="eyebrow">Catatan unggulan / Panjat Tebing XXIX</p><h2>Skala tebing terlihat dari kerja tim.</h2><p>Arsip memperlihatkan pemanjatan, pengamatan jalur, pengelolaan tali, dan komunikasi dari bawah. Ini bukan galeri olahraga; ia dibaca sebagai proses belajar kolektif.</p><a className="button button-primary" href="#/activity/rc29">Buka catatan RC XXIX</a></div></div><div className="pd-card-grid">{records.map(a=><ActivityCard key={a.id} activity={a}/>)}</div></section>:<section className="page-container pd-atlas-list">{records.map((a,i)=><a key={a.id} href={a.href}><span>{String(i+1).padStart(2,'0')}</span><div><p className="eyebrow">{a.division} / {a.cohort}</p><h2>{a.title}</h2><p>{a.summary}</p></div><dl><dt>Tempat</dt><dd>{a.location??'Belum tercatat'}</dd><dt>Waktu</dt><dd>{a.date??'Belum tercatat'}</dd><dt>Bukti</dt><dd>{a.evidenceLabel}</dd></dl></a>)}</section>}{records.length===0&&<p role="status" className="page-container pb-12">Belum ada catatan sesuai filter. Ini batas isi prototipe, bukan bukti kegiatan tidak pernah ada.</p>}</>;
}

const pdLearning:Record<string,string[]>={
  gh29:['Navigasi darat manual dan digital','Manajemen perjalanan dan gizi','Pengamatan medan serta konteks masyarakat'],
  rc29:['Pemanjatan artificial dan sport','Instalasi anchor serta pemetaan jalur','Rescue group dan kerja belay'],
  orad29:['Catatan detail belum dikurasi','Lokasi dan rentang telah terverifikasi'],
  lh29:['Pengamatan lingkungan','Karya lapangan belum dikurasi'],
  caving29:['Eksplorasi horizontal dan vertikal','Pemetaan serta rigging tercantum dalam standar'],
};

export function ArchivePDDetail({id,direction}:{id:string;direction:ArchiveDirection}){
  const record=pdRecords.find(r=>r.id===id); if(!record)return null;
  const visual=id==='rc29';
  return <><section className={`page-container pd-detail-head ${direction==='signal'?'is-atlas':''}`}><a className="site-nav-link" href="#/program/pd">← Katalog Pemantapan Divisi</a><p className="eyebrow">{record.division} / Angkatan {record.cohort}</p><h1>{record.title.replace('Pemantapan Divisi ','')}</h1><p>{record.summary}</p><div><StatusLabel state={record.state}/><span>{record.date}</span><span>{record.location}</span></div></section>{record.depth==='rich'?<><section className="page-container pd-detail-grid"><MediaPlate number={record.division??'PD'} title={visual?'Kerja tim di Tebing Siung':'Navigasi di medan Gunung Lawu'} caption={visual?'Kandidat foto arsip: pemanjat dan belayer. Kredit dan izin belum dikonfirmasi.':'Kandidat foto arsip: peta, kompas, dan observasi medan. Kredit dan izin belum dikonfirmasi.'} kind="portrait"/><article><p className="eyebrow">Fokus pembelajaran</p><h2>Spesialisasi dibaca melalui praktik.</h2><ul>{(pdLearning[id]||[]).map(x=><li key={x}>{x}</li>)}</ul><p className="source-note">Sumber publik: LPJ Pengurus 2025. Foto HUMED hanya ditinjau secara privat.</p></article></section><section className="page-container pd-evidence-band"><div><span>Pra</span><p>Pematerian, latihan, proposal, dan simulasi.</p></div><div><span>Lapangan</span><p>Spesialisasi pada medan divisi yang ditetapkan.</p></div><div><span>Pasca</span><p>Presentasi laporan; status laporan bervariasi dan tidak disamakan dengan selesai lapangan.</p></div></section></>:<section className="page-container pb-12"><div className="editorial-note"><h2 className="font-semibold">Catatan dasar tetap berguna.</h2><p className="reading-copy mt-3 text-sm">Lokasi dan rentang telah dicatat, tetapi narasi teknis dan hasil karya belum ditambahkan sebelum sumber divisi selesai dikurasi.</p></div></section>}</>;
}
