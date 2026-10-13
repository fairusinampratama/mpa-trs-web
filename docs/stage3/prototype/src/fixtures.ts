import type { ActivityFixture } from './components/ActivityCard';

// All records in the technical-loop laboratory are synthetic. No institutional
// date, expedition edition, result, current status or personal data is asserted.
export const activities: ActivityFixture[] = [
  { id: 'field-notes', title: 'Belajar membaca bentang alam', program: 'Contoh program pendidikan', summary: 'Contoh catatan kaya: tujuan belajar, proses lapangan, dokumentasi, dan pengetahuan yang dapat diwariskan.', state: 'historical', location: 'Lokasi contoh', date: 'Tanggal tidak ditetapkan', depth: 'rich' },
  { id: 'workshop', title: 'Berbagi keterampilan dokumentasi', summary: 'Contoh kegiatan satu kali. Catatan singkat tetap berguna tanpa harus memiliki program induk atau galeri.', state: 'planned', depth: 'basic' },
];
