import type { ActivityFixture } from './components/ActivityCard';

// Curated public projections only. Private source URLs/rosters/financial/medical
// details are absent. Precise internal provenance belongs in fixture-ledger.md.
export const expeditionRecords: ActivityFixture[] = [
  {id:'te11',title:'Bukit Raya: perjalanan, perjumpaan, dan pembelajaran',program:'Tursina Explore',edition:'11',summary:'Sebuah ekspedisi ke Bukit Raya yang menghubungkan perjalanan lintas moda, pengalaman lapangan, dan perhatian pada lingkungan serta budaya.',state:'historical',location:'Bukit Raya · Kalimantan',date:'November–Desember 2024',depth:'rich',evidenceLabel:'Diringkas dari laporan',href:'#/expedition/te11'},
  {id:'te12',title:'Trunyan',program:'Tursina Explore',edition:'12',summary:'Identitas edisi ditemukan pada koleksi dokumentasi. Kronologi dan cerita lengkapnya belum direkonsiliasi untuk contoh ini.',state:'unknown',location:'Trunyan',depth:'basic',evidenceLabel:'Catatan terbatas',href:'#/expedition/te12'},
];
export const pdRecords: ActivityFixture[] = [
  {id:'gh26',title:'Pemantapan Divisi Gunung Hutan XXVI',program:'Pemantapan Divisi',division:'GH',cohort:'XXVI',summary:'Pelaksanaan di Gunung Slamet dilaporkan dalam LPJ 2023–2024. Laporan divisi lengkap belum tersedia pada kajian ini.',state:'historical',location:'Gunung Slamet',date:'Agustus 2023',depth:'basic',evidenceLabel:'Ringkasan LPJ',href:'#/activity/gh26'},
  {id:'rc26',title:'Pemantapan Divisi Panjat Tebing XXVI',program:'Pemantapan Divisi',division:'RC',cohort:'XXVI',summary:'Catatan sintetis untuk menguji penemuan kegiatan berbeda divisi. Tidak menyatakan tanggal, lokasi, atau hasil kegiatan sebenarnya.',state:'unknown',depth:'basic',evidenceLabel:'Contoh sintetis',href:'#/activity/rc26'},
  {id:'gh27-demo',title:'Pemantapan Divisi Gunung Hutan XXVII',program:'Pemantapan Divisi',division:'GH',cohort:'XXVII',summary:'Catatan sintetis pembanding angkatan. Tidak mewarisi laporan atau hasil dari kegiatan GH XXVI.',state:'unknown',depth:'basic',evidenceLabel:'Contoh sintetis',href:'#/activity/gh27-demo'},
];
export const standalone: ActivityFixture = {id:'workshop-demo',title:'Lokakarya dokumentasi kegiatan',summary:'Contoh sintetis kegiatan mandiri: belajar memilih, memberi konteks, dan menyiapkan dokumentasi untuk editor.',state:'planned',depth:'basic',evidenceLabel:'Contoh sintetis',href:'#/activity/workshop-demo'};
export const publicWorks = [
  {id:'sacred-gatekeeper',type:'Artikel',title:'The Sacred Gatekeeper',summary:'Tulisan terkait pengalaman TE11. Metadata karya ditampilkan; isi budaya dan izin publikasinya masih memerlukan review.',date:'21 September 2025',source:'Metadata artikel terverifikasi',related:'te11'},
  {id:'design-school',type:'Materi belajar',title:'TRS — Sekolah Desain Grafis',summary:'Materi pengantar tentang konteks, identitas visual, serta proses sebelum, selama, dan sesudah produksi desain.',date:'Tanggal kegiatan belum ditetapkan',source:'Materi teridentifikasi',related:undefined},
  {id:'announcement-demo',type:'Pengumuman',title:'Informasi penerimaan anggota',summary:'Contoh sintetis pengumuman independen. Jadwal dan kanal pendaftaran aktual belum dikonfirmasi.',date:'Contoh saja',source:'Contoh sintetis',related:undefined},
];
export const syntheticMembers = [{nia:'DEMO.001.TRS',name:'Anggota Contoh Satu'},{nia:'DEMO.002.TRS',name:'Anggota Contoh Dua'},{nia:'DEMO.003.TRS',name:'Anggota Contoh Tiga'}];
