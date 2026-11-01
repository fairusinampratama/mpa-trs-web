import { useState, type ReactNode } from "react";
import { ActivityCard } from "./components/ActivityCard";
import { StatusLabel } from "./components/StatusLabel";
import { expeditionRecords, pdRecords, publicWorks } from "./content";
export type ArchiveDirection = "fieldnotes" | "signal";
const te11Log = [
  [
    "20-21 NOV",
    "Malang - Surabaya",
    "Persiapan terakhir, upacara pemberangkatan, lalu perjalanan menuju Pelabuhan Tanjung Perak.",
  ],
  [
    "21-23 NOV",
    "Laut Jawa",
    "KM Bukit Raya membawa tim menuju Pontianak. Waktu di kapal juga dipakai untuk menyiapkan keluaran ekspedisi.",
  ],
  [
    "25-26 NOV",
    "Pontianak - Rantau Malam",
    "Travel, speedboat, dan klotok menghubungkan Nanga Pinoh, Serawai, Jelundung, dan Rantau Malam.",
  ],
  [
    "27-30 NOV",
    "Jalur Bukit Raya",
    "Empat hari empat malam di jalur. Laporan mencatat Puncak Kakam dicapai pada 29 November sekitar pukul 13.50.",
  ],
  [
    "1-2 DES",
    "Rantau Malam",
    "Waktu tambahan dipakai untuk pemulihan, perjumpaan, dan pengumpulan data sebelum perjalanan pulang.",
  ],
  [
    "6 DES",
    "Kembali ke Malang",
    "Rute pulang berubah melalui Semarang karena jadwal kapal; penyesuaian dicatat sebagai pelajaran logistik.",
  ],
];
function MediaPlate({
  number,
  title,
  caption,
  kind = "landscape",
}: {
  number: string;
  title: string;
  caption: string;
  kind?: "landscape" | "portrait" | "detail";
}) {
  return (
    <figure
      className={` m-0 [&_figcaption]:grid [&_figcaption]:gap-2 [&_figcaption]:border-x [&_figcaption]:border-b [&_figcaption]:border-line [&_figcaption]:bg-surface [&_figcaption]:p-4 [&_figcaption]:text-sm [&_figcaption_span]:text-xs [&_figcaption_span]:leading-relaxed [&_figcaption_span]:text-muted ${kind === "portrait" ? "[&_[data-ui~=media-plate-stage]]:min-h-[32rem]" : kind === "detail" ? "[&_[data-ui~=media-plate-stage]]:min-h-64 [&_[data-ui~=media-plate-stage]]:bg-ink" : ""}  `}
      data-ui={`media-plate ${kind === "portrait" ? "media-plate-portrait" : kind === "detail" ? "media-plate-detail" : ""}`}
    >
      <div
        className="relative flex min-h-80 flex-col justify-between overflow-hidden border border-forest bg-forest p-6 text-surface [&>span]:font-editorial [&>span]:text-7xl [&>span]:text-leaf/50 [&>p]:max-w-xs [&>p]:text-xs [&>p]:font-semibold [&>p]:uppercase [&>p]:leading-relaxed [&>p]:tracking-widest [&>p]:text-leaf"
        data-ui="media-plate-stage"
      >
        <span aria-hidden="true">{number}</span>
        <p>
          Pratinjau komposisi foto
          <br />
          menunggu izin publikasi
        </p>
      </div>
      <figcaption>
        <b>{title}</b>
        <span>{caption}</span>
      </figcaption>
    </figure>
  );
}
function SourceFlag({ children }: { children: ReactNode }) {
  return (
    <span
      className="mt-6 inline-flex border border-line bg-surface px-3 py-2 text-xs font-semibold text-muted"
      data-ui="source-flag"
    >
      {children}
    </span>
  );
}
function DocumentaryHome() {
  return (
    <>
      <section
        className="mx-auto w-full max-w-page px-5 sm:px-8 grid gap-8 py-10 md:grid-cols-[1.1fr_0.9fr] md:py-16"
        data-ui="page-container archive-doc-hero"
      >
        <MediaPlate
          number="01"
          title="Puncak Kakam, 29 November 2024"
          caption="Kandidat foto: tim TE11 di titik puncak. Kredit dan persetujuan subjek belum dikonfirmasi."
        />
        <div
          className="self-center md:pl-6 [&_h1]:mt-5 [&_h1]:font-editorial [&_h1]:text-[clamp(3rem,7vw,6.6rem)] [&_h1]:leading-[0.9] [&_h1]:tracking-[-0.04em] [&>p:not([data-ui~=eyebrow])]:mt-7 [&>p:not([data-ui~=eyebrow])]:max-w-lg [&>p:not([data-ui~=eyebrow])]:text-lg [&>p:not([data-ui~=eyebrow])]:leading-relaxed [&>p:not([data-ui~=eyebrow])]:text-muted"
          data-ui="archive-doc-intro"
        >
          <p
            className="text-xs font-semibold uppercase tracking-widest"
            data-ui="eyebrow"
          >
            MAPALA Tursina / arsip perjalanan
          </p>
          <h1>
            Catatan dari
            <br />
            jalur yang nyata.
          </h1>
          <p>
            Sejak 1995, Tursina belajar melalui perjalanan, kerja lapangan, dan
            pengetahuan yang dikembalikan kepada organisasi.
          </p>
          <div
            className="mt-8 flex flex-wrap items-center gap-4"
            data-ui="archive-actions"
          >
            <a
              className="inline-flex items-center rounded-control border px-5 py-2.5 transition-colors min-h-11.5 rounded-control text-[17px] leading-[24px] font-semibold pt-2.5 pr-4 pb-2.5 pl-4 gap-2 justify-start disabled:opacity-100 disabled:text-disabled-ink disabled:bg-disabled-bg disabled:border-disabled-bg disabled:cursor-not-allowed hover:bg-ink bg-primary border-primary text-surface [&:hover:not(:disabled)]:bg-primary-hover [&:hover:not(:disabled)]:border-primary-hover [&:active:not(:disabled)]:bg-primary-active [&:active:not(:disabled)]:border-primary-active"
              href="#/expedition/te11"
              data-ui="button button-primary"
            >
              Baca jurnal TE11
            </a>
            <a
              className="inline-flex min-h-11 items-center gap-3 text-sm font-medium text-forest hover:underline"
              href="#/program/pd"
              data-ui="site-nav-link"
            >
              Buka pendidikan lapangan →
            </a>
          </div>
          <dl
            className="mt-10 grid grid-cols-3 border-y border-line py-5 [&_div]:border-r [&_div]:border-line [&_div]:px-3 [&_div]:first:pl-0 [&_div]:last:border-0 [&_dt]:text-sm [&_dt]:font-bold [&_dd]:mt-1 [&_dd]:text-xs [&_dd]:text-muted max-[640px]:grid-cols-1 max-[640px]:gap-3 max-[640px]:[&_div]:border-b max-[640px]:[&_div]:border-r-0 max-[640px]:[&_div]:pb-3 max-[640px]:[&_div]:last:border-b-0 max-[640px]:[&_div]:last:pb-0"
            data-ui="archive-fact-strip"
          >
            <div>
              <dt>20 Nov-6 Des</dt>
              <dd>rentang TE11</dd>
            </div>
            <div>
              <dt>4 hari 4 malam</dt>
              <dd>catatan di jalur</dd>
            </div>
            <div>
              <dt>5 divisi</dt>
              <dd>ruang keterampilan</dd>
            </div>
          </dl>
        </div>
      </section>
      <section
        className="mx-auto w-full max-w-page px-5 sm:px-8 grid gap-10 border-t border-line py-14 lg:grid-cols-[0.75fr_1.25fr]"
        data-ui="page-container archive-ledger"
      >
        <div
          className="[&_h2]:mt-4 [&_h2]:max-w-md [&_h2]:font-editorial [&_h2]:text-heading [&>p:last-child]:mt-5 [&>p:last-child]:max-w-md [&>p:last-child]:text-sm [&>p:last-child]:leading-relaxed [&>p:last-child]:text-muted"
          data-ui="archive-section-lead"
        >
          <p
            className="text-xs font-semibold uppercase tracking-widest"
            data-ui="eyebrow"
          >
            Nomor lapangan / 011
          </p>
          <h2>Bukit Raya tidak dimulai di puncak.</h2>
          <p>
            Arsip TE11 bergerak dari sekretariat, pelabuhan, kapal, perjalanan
            sungai, Rantau Malam, hutan hujan, hingga pulang melalui rute yang
            berubah.
          </p>
        </div>
        <ol
          className="border-t border-line [&_li]:grid [&_li]:grid-cols-[2.5rem_1fr] [&_li]:gap-4 [&_li]:border-b [&_li]:border-line [&_li]:py-5 [&_li>span]:font-editorial [&_li>span]:text-2xl [&_li>span]:text-muted [&_li_div>p:last-child]:mt-2 [&_li_div>p:last-child]:max-w-2xl [&_li_div>p:last-child]:text-sm [&_li_div>p:last-child]:leading-relaxed [&_li_div>p:last-child]:text-muted"
          data-ui="archive-ledger-list"
        >
          {te11Log.slice(0, 4).map(([date, place, text], i) => (
            <li key={date}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-widest"
                  data-ui="eyebrow"
                >
                  {date} / {place}
                </p>
                <p>{text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
      <section
        className="mx-auto w-full max-w-page px-5 sm:px-8 grid items-center gap-10 border-t border-line py-14 md:grid-cols-[0.75fr_1.25fr] [&_h2]:mt-4 [&_h2]:max-w-xl [&_h2]:font-editorial [&_h2]:text-heading [&>div>p:not([data-ui~=eyebrow])]:mt-5 [&>div>p:not([data-ui~=eyebrow])]:max-w-xl [&>div>p:not([data-ui~=eyebrow])]:leading-relaxed [&>div>p:not([data-ui~=eyebrow])]:text-muted"
        data-ui="page-container archive-feature-pair"
      >
        <MediaPlate
          number="02"
          title="Navigasi darat, PD Gunung Hutan XXIX"
          caption="Kandidat foto: peta dan kompas di medan Gunung Lawu."
          kind="portrait"
        />
        <div>
          <p
            className="text-xs font-semibold uppercase tracking-widest"
            data-ui="eyebrow"
          >
            Pendidikan / Agustus 2025
          </p>
          <h2>Belajar membaca medan, bukan sekadar melintasinya.</h2>
          <p>
            Pemantapan Divisi XXIX menghubungkan latihan, proposal, simulasi,
            spesialisasi lapangan, dan presentasi laporan. Lima divisi memiliki
            tempat dan rentang pelaksanaan yang berbeda.
          </p>
          <a
            className="inline-flex min-h-11 items-center gap-3 text-sm font-medium text-forest hover:underline"
            href="#/program/pd"
            data-ui="site-nav-link"
          >
            Telusuri PD XXIX →
          </a>
        </div>
      </section>
    </>
  );
}
function AtlasHome() {
  const indexed = [
    expeditionRecords[0],
    ...pdRecords.filter((r) => r.cohort === "XXIX").slice(0, 3),
  ];
  return (
    <>
      <section
        className="mx-auto w-full max-w-page px-5 sm:px-8 grid gap-8 border-b-2 border-ink py-10 md:grid-cols-2 lg:grid-cols-[1.1fr_0.9fr_1fr] [&>[data-ui~=media-plate]]:lg:col-start-3"
        data-ui="page-container atlas-hero"
      >
        <div
          className="col-span-full flex flex-wrap justify-between gap-3 border-y border-ink py-3 text-xs font-bold tracking-widest"
          data-ui="atlas-kicker"
        >
          <span>ARSIP / 1995-</span>
          <span>UIN MAULANA MALIK IBRAHIM MALANG</span>
        </div>
        <div
          className="lg:col-span-2 [&_h1]:mt-5 [&_h1]:text-[clamp(2.7rem,5.3vw,5rem)] [&_h1]:font-black [&_h1]:uppercase [&_h1]:leading-[0.95] [&_h1]:tracking-[-0.055em] max-[640px]:[&_h1]:leading-[0.9]"
          data-ui="atlas-title"
        >
          <p
            className="text-xs font-semibold uppercase tracking-widest"
            data-ui="eyebrow"
          >
            Panduan lapangan institusi
          </p>
          <h1>
            Tursina adalah
            <br />
            ruang belajar
            <br />
            yang bergerak.
          </h1>
        </div>
        <div
          className="flex flex-col items-start justify-end border-l-4 border-gold pl-6 [&_p]:max-w-sm [&_p]:text-lg [&_p]:font-semibold [&_p]:leading-snug [&_[data-ui~=button]]:mt-7"
          data-ui="atlas-opening"
        >
          <p>
            Ilmiah, sosial, olahraga, rekreasi, dan kekeluargaan bertemu dalam
            pendidikan anggota, ekspedisi, tradisi, dan karya.
          </p>
          <a
            className="inline-flex items-center rounded-control border px-5 py-2.5 transition-colors min-h-11.5 rounded-control text-[17px] leading-[24px] font-semibold pt-2.5 pr-4 pb-2.5 pl-4 gap-2 justify-start disabled:opacity-100 disabled:text-disabled-ink disabled:bg-disabled-bg disabled:border-disabled-bg disabled:cursor-not-allowed hover:bg-ink bg-primary border-primary text-surface [&:hover:not(:disabled)]:bg-primary-hover [&:hover:not(:disabled)]:border-primary-hover [&:active:not(:disabled)]:bg-primary-active [&:active:not(:disabled)]:border-primary-active"
            href="#/about"
            data-ui="button button-primary"
          >
            Baca identitas Tursina
          </a>
        </div>
        <MediaPlate
          number="TE 11"
          title="Ekspedisi sebagai arsip pengetahuan"
          caption="Komposisi foto hutan hujan atau perjalanan sungai; izin belum dikonfirmasi."
        />
      </section>
      <section
        className="mx-auto w-full max-w-page px-5 sm:px-8 grid gap-10 py-14 lg:grid-cols-[0.7fr_1.3fr] [&_header_h2]:mt-4 [&_header_h2]:text-4xl [&_header_h2]:font-black [&_header_h2]:uppercase [&_header_h2]:tracking-tight"
        data-ui="page-container atlas-index"
      >
        <header>
          <p
            className="text-xs font-semibold uppercase tracking-widest"
            data-ui="eyebrow"
          >
            Indeks kerja / pilihan terverifikasi
          </p>
          <h2>Program, tempat, bukti.</h2>
        </header>
        <div
          className="border-t-2 border-ink [&_a]:grid [&_a]:min-h-24 [&_a]:grid-cols-[2.5rem_1fr] [&_a]:gap-3 [&_a]:border-b [&_a]:border-ink [&_a]:py-4 [&_a]:text-ink [&_a]:hover:bg-leaf/20 [&_a]:sm:grid-cols-[2.5rem_1.2fr_0.9fr_0.8fr] [&_a>span]:text-xl [&_a>span]:font-black [&_strong]:text-base [&_small]:text-xs [&_small]:not-italic [&_small]:leading-relaxed [&_small]:text-muted [&_em]:text-xs [&_em]:not-italic [&_em]:leading-relaxed [&_em]:text-muted"
          data-ui="atlas-index-table"
        >
          {indexed.map((a, i) => (
            <a key={a.id} href={a.href}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <strong>{a.title}</strong>
              <small>
                {a.date}
                <br />
                {a.location}
              </small>
              <em>{a.evidenceLabel}</em>
            </a>
          ))}
        </div>
      </section>
      <section
        className="mx-auto w-full max-w-page px-5 sm:px-8 grid border-y-2 border-ink sm:grid-cols-2 lg:grid-cols-4 [&>div]:border-b [&>div]:border-ink [&>div]:p-6 [&>div]:sm:border-r [&>div]:lg:border-b-0 [&_span]:text-xs [&_span]:font-black [&_h3]:mt-6 [&_h3]:text-xl [&_h3]:font-black [&_h3]:uppercase [&_p]:mt-3 [&_p]:text-sm [&_p]:leading-relaxed [&_p]:text-muted"
        data-ui="page-container atlas-principles"
      >
        <div>
          <span>01</span>
          <h3>Perjalanan</h3>
          <p>Dibaca sebagai rangkaian, bukan satu foto puncak.</p>
        </div>
        <div>
          <span>02</span>
          <h3>Pendidikan</h3>
          <p>Keahlian tumbuh melalui forum, latihan, simulasi, dan lapangan.</p>
        </div>
        <div>
          <span>03</span>
          <h3>Pengetahuan</h3>
          <p>
            Laporan dan karya menyimpan pengalaman untuk generasi berikutnya.
          </p>
        </div>
        <div>
          <span>04</span>
          <h3>Kekeluargaan</h3>
          <p>
            Angkatan dan tradisi memberi konteks tanpa menjadi hierarki navigasi
            utama.
          </p>
        </div>
      </section>
    </>
  );
}
export function ArchiveHome({ direction }: { direction: ArchiveDirection }) {
  return direction === "fieldnotes" ? <DocumentaryHome /> : <AtlasHome />;
}
function TE11Documentary() {
  return (
    <>
      <section
        className="mx-auto w-full max-w-page px-5 sm:px-8 py-12 md:py-20 [&>[data-ui~=eyebrow]]:mt-10 [&_h1]:mt-5 [&_h1]:max-w-5xl [&_h1]:font-editorial [&_h1]:text-[clamp(3rem,7vw,6.8rem)] [&_h1]:leading-[0.9] [&_h1]:tracking-[-0.04em]"
        data-ui="page-container doc-story-head"
      >
        <a
          className="inline-flex min-h-11 items-center gap-3 text-sm font-medium text-forest hover:underline"
          href="#/program/te"
          data-ui="site-nav-link"
        >
          ← Semua edisi
        </a>
        <p
          className="text-xs font-semibold uppercase tracking-widest"
          data-ui="eyebrow"
        >
          Tursina Explore / Edisi 11 / 2024
        </p>
        <h1>
          Bukit Raya:
          <br />
          sebuah perjalanan
          <br />
          yang berubah di jalan.
        </h1>
        <p
          className="mt-8 max-w-3xl text-xl leading-relaxed text-muted"
          data-ui="doc-deck"
        >
          Dari Tanjung Perak ke Pontianak, lalu Nanga Pinoh, Serawai, Rantau
          Malam, dan Puncak Kakam. Sebuah catatan tentang medan, logistik,
          perjumpaan, dan kemampuan beradaptasi.
        </p>
        <SourceFlag>Draft LPJ TE11, bagian 1-4</SourceFlag>
      </section>
      <section
        className="mx-auto w-full max-w-page px-5 sm:px-8 space-y-8 pb-16 [&>[data-ui~=media-plate]_[data-ui~=media-plate-stage]]:min-h-[28rem] [&>[data-ui~=media-plate]_[data-ui~=media-plate-stage]]:md:min-h-[38rem]"
        data-ui="page-container doc-photo-sequence"
      >
        <MediaPlate
          number="01"
          title="Hutan hujan Bukit Raya"
          caption="Kandidat pembuka: bentang hutan dari jalur. Lokasi spesifik perlu konfirmasi caption."
        />
        <div
          className="grid gap-8 md:grid-cols-[1.3fr_0.7fr]"
          data-ui="doc-photo-pair"
        >
          <MediaPlate
            number="02"
            title="Puncak Kakam"
            caption="Laporan: 29 November 2024, sekitar pukul 13.50."
          />
          <MediaPlate
            number="03"
            title="Nepenthes di jalur"
            caption="Identifikasi spesies belum dilakukan; caption publik harus tetap deskriptif."
            kind="detail"
          />
        </div>
      </section>
      <section
        className="mx-auto w-full max-w-page px-5 sm:px-8 grid gap-10 border-y border-line py-14 lg:grid-cols-[0.55fr_1.45fr] [&_header_h2]:mt-4 [&_header_h2]:font-editorial [&_header_h2]:text-heading [&_ol]:border-t [&_ol]:border-line [&_li]:grid [&_li]:gap-2 [&_li]:border-b [&_li]:border-line [&_li]:py-5 [&_li]:sm:grid-cols-[7rem_1fr_1.4fr] [&_time]:text-xs [&_time]:font-semibold [&_h3]:font-editorial [&_h3]:text-xl [&_li_p]:text-sm [&_li_p]:leading-relaxed [&_li_p]:text-muted max-[640px]:[&_li]:gap-1"
        data-ui="page-container doc-log"
      >
        <header>
          <p
            className="text-xs font-semibold uppercase tracking-widest"
            data-ui="eyebrow"
          >
            Log perjalanan / dilaporkan
          </p>
          <h2>Enam simpul, satu ekspedisi.</h2>
        </header>
        <ol>
          {te11Log.map(([date, place, text]) => (
            <li key={date}>
              <time>{date}</time>
              <h3>{place}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </section>
      <section
        className="mx-auto w-full max-w-page px-5 sm:px-8 grid gap-10 py-16 lg:grid-cols-[1.2fr_0.8fr] [&_h2]:mt-4 [&_h2]:max-w-2xl [&_h2]:font-editorial [&_h2]:text-heading [&>div>p:last-child]:mt-5 [&>div>p:last-child]:max-w-2xl [&>div>p:last-child]:leading-relaxed [&>div>p:last-child]:text-muted [&_aside]:border-l-2 [&_aside]:border-gold [&_aside]:bg-surface [&_aside]:p-6 [&_aside_h3]:font-semibold [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:space-y-3 [&_ul]:pl-5 [&_ul]:text-sm [&_ul]:leading-relaxed [&_ul]:text-muted"
        data-ui="page-container doc-outcomes"
      >
        <div>
          <p
            className="text-xs font-semibold uppercase tracking-widest"
            data-ui="eyebrow"
          >
            Yang terlaksana
          </p>
          <h2>Puncak dicapai. Rute disesuaikan. Waktu desa bertambah.</h2>
          <p>
            Laporan menyebut pendakian selesai lebih cepat dari perkiraan awal
            sehingga tersedia lebih banyak waktu untuk pengumpulan data dan
            interaksi di Rantau Malam.
          </p>
        </div>
        <aside>
          <h3>Batas klaim</h3>
          <ul>
            <li>Target film dokumenter turun menjadi video aftermovie.</li>
            <li>Klaim carbon offsetting belum diverifikasi independen.</li>
            <li>
              Penamaan provinsi berbeda di bagian laporan; halaman memakai
              wilayah Kalimantan.
            </li>
            <li>
              Foto, kredit, dan persetujuan subjek belum disahkan untuk
              publikasi.
            </li>
          </ul>
        </aside>
      </section>
      <section
        className="mx-auto w-full max-w-page px-5 sm:px-8 border-t border-line pb-16 pt-10 [&>a]:grid [&>a]:gap-2 [&>a]:border-b [&>a]:border-line [&>a]:py-5 [&>a]:text-ink [&>a]:md:grid-cols-[8rem_1fr_18rem] [&>a_span]:text-xs [&>a_span]:text-muted [&>a_small]:text-xs [&>a_small]:text-muted"
        data-ui="page-container doc-related"
      >
        <p
          className="text-xs font-semibold uppercase tracking-widest"
          data-ui="eyebrow"
        >
          Karya terkait
        </p>
        {publicWorks
          .filter((w) => w.related === "te11")
          .map((w) => (
            <a key={w.id} href={`#/publication/${w.id}`}>
              <span>{w.type}</span>
              <strong>{w.title}</strong>
              <small>
                {w.date} · {w.source}
              </small>
            </a>
          ))}
      </section>
    </>
  );
}
function TE11Atlas() {
  return (
    <>
      <section
        className="mx-auto w-full max-w-page px-5 sm:px-8 grid gap-10 border-b-2 border-ink py-12 lg:grid-cols-[1fr_1fr] [&_[data-ui~=eyebrow]]:mt-10 [&_h1]:mt-4 [&_h1]:text-[clamp(4rem,10vw,9rem)] [&_h1]:font-black [&_h1]:uppercase [&_h1]:leading-none [&_h1]:tracking-[-0.08em] [&_dl]:grid [&_dl]:self-end [&_dl]:border-t-2 [&_dl]:border-ink [&_dl]:sm:grid-cols-2 [&_dl_div]:border-b [&_dl_div]:border-r [&_dl_div]:border-ink [&_dl_div]:p-4 [&_dt]:text-xs [&_dt]:font-bold [&_dt]:uppercase [&_dt]:tracking-widest [&_dd]:mt-2 [&_dd]:text-sm"
        data-ui="page-container dossier-head"
      >
        <div>
          <a
            className="inline-flex min-h-11 items-center gap-3 text-sm font-medium text-forest hover:underline"
            href="#/program/te"
            data-ui="site-nav-link"
          >
            ← Indeks Tursina Explore
          </a>
          <p
            className="text-xs font-semibold uppercase tracking-widest"
            data-ui="eyebrow"
          >
            Dossier ekspedisi / TE.011
          </p>
          <h1>Bukit Raya</h1>
          <p>Arsip perjalanan dan keluaran, 2024</p>
        </div>
        <dl>
          <div>
            <dt>Status</dt>
            <dd>Selesai / historis</dd>
          </div>
          <div>
            <dt>Rentang</dt>
            <dd>20 Nov-6 Des 2024</dd>
          </div>
          <div>
            <dt>Titik puncak</dt>
            <dd>Puncak Kakam, 2.278 mdpl</dd>
          </div>
          <div>
            <dt>Catatan jalur</dt>
            <dd>4 hari 4 malam</dd>
          </div>
          <div>
            <dt>Sumber</dt>
            <dd>Draft LPJ TE11</dd>
          </div>
        </dl>
      </section>
      <section
        className="mx-auto w-full max-w-page px-5 sm:px-8 grid gap-8 py-12 md:grid-cols-2 [&_article]:border-t-4 [&_article]:border-ink [&_article]:pt-5 [&_article_h2]:mt-4 [&_article_h2]:text-3xl [&_article_h2]:font-black [&_article_h2]:uppercase [&_article_h2]:leading-tight [&_article>p:last-child]:mt-5 [&_article>p:last-child]:max-w-xl [&_article>p:last-child]:leading-relaxed [&_article>p:last-child]:text-muted"
        data-ui="page-container dossier-grid"
      >
        <MediaPlate
          number="PLATE 01"
          title="Dokumentasi puncak"
          caption="Kandidat foto tim; persetujuan subjek dan kredit belum dikonfirmasi."
        />
        <article>
          <p
            className="text-xs font-semibold uppercase tracking-widest"
            data-ui="eyebrow"
          >
            Abstrak
          </p>
          <h2>Ekspedisi sebagai kerja lintas ruang.</h2>
          <p>
            TE11 menggabungkan perjalanan lintas moda, pendakian, kerja
            dokumentasi, perhatian lingkungan, dan interaksi sosial budaya.
            Halaman membedakan tujuan awal, pelaksanaan yang dilaporkan, dan
            keluaran yang benar-benar ditemukan.
          </p>
        </article>
        <article
          className="[&_ol]:mt-6 [&_li]:flex [&_li]:justify-between [&_li]:gap-4 [&_li]:border-b [&_li]:border-line [&_li]:py-3 [&_li]:text-sm [&_li_span]:text-muted"
          data-ui="dossier-route"
        >
          <p
            className="text-xs font-semibold uppercase tracking-widest"
            data-ui="eyebrow"
          >
            Rute terlapor
          </p>
          <ol>
            {te11Log.map(([date, place]) => (
              <li key={date}>
                <span>{date}</span>
                <b>{place}</b>
              </li>
            ))}
          </ol>
        </article>
        <MediaPlate
          number="PLATE 02"
          title="Detail ekologi"
          caption="Kandidat foto Nepenthes; identifikasi ilmiah belum tersedia."
          kind="detail"
        />
      </section>
      <section
        className="mx-auto w-full max-w-page px-5 sm:px-8 grid border-y-2 border-ink sm:grid-cols-2 lg:grid-cols-4 [&>div]:border-b [&>div]:border-r [&>div]:border-ink [&>div]:p-5 [&>div]:lg:border-b-0 [&_span]:text-xs [&_span]:font-bold [&_span]:uppercase [&_span]:tracking-widest [&_strong]:mt-4 [&_strong]:block [&_strong]:text-sm [&_strong]:leading-relaxed"
        data-ui="page-container dossier-status"
      >
        <div>
          <span>Rencana awal</span>
          <strong>Dokumenter + kajian lingkungan dan budaya</strong>
        </div>
        <div>
          <span>Perubahan</span>
          <strong>Tim dan target keluaran disederhanakan</strong>
        </div>
        <div>
          <span>Ditemukan</span>
          <strong>Draft LPJ, artikel, arsip foto, rencana penyuntingan</strong>
        </div>
        <div>
          <span>Belum dipastikan</span>
          <strong>Film final, verifikasi klaim karbon, izin media</strong>
        </div>
      </section>
    </>
  );
}
function DossierRelated() {
  return (
    <section
      className="mx-auto w-full max-w-page px-5 sm:px-8 border-t border-line pb-16 pt-10 [&>a]:grid [&>a]:gap-2 [&>a]:border-b [&>a]:border-line [&>a]:py-5 [&>a]:text-ink [&>a]:md:grid-cols-[8rem_1fr_18rem] [&>a_span]:text-xs [&>a_span]:text-muted [&>a_small]:text-xs [&>a_small]:text-muted"
      data-ui="page-container doc-related"
    >
      <p
        className="text-xs font-semibold uppercase tracking-widest"
        data-ui="eyebrow"
      >
        Hubungan karya / batas sumber
      </p>
      <p
        className="mt-6 text-xs leading-relaxed text-muted"
        data-ui="source-note"
      >
        Laporan berbeda dalam penamaan provinsi. Wilayah publik tetap Kalimantan
        sampai direkonsiliasi; angka karbon dan film final belum diverifikasi.
      </p>
      {publicWorks
        .filter((w) => w.related === "te11")
        .map((w) => (
          <a key={w.id} href={`#/publication/${w.id}`}>
            <span>{w.type}</span>
            <strong>{w.title}</strong>
            <small>
              {w.date} · {w.source}
            </small>
          </a>
        ))}
    </section>
  );
}
export function ArchiveTE11({ direction }: { direction: ArchiveDirection }) {
  return direction === "fieldnotes" ? (
    <TE11Documentary />
  ) : (
    <>
      <TE11Atlas />
      <DossierRelated />
    </>
  );
}
export function ArchivePDBrowse({
  direction,
}: {
  direction: ArchiveDirection;
}) {
  const [division, setDivision] = useState("all");
  const [cohort, setCohort] = useState("all");
  const records = pdRecords.filter(
    (a) =>
      (division === "all" || a.division === division) &&
      (cohort === "all" || a.cohort === cohort),
  );
  return (
    <>
      <section
        className="mx-auto w-full max-w-page px-5 sm:px-8 grid gap-6 border-b-2 border-ink py-12 md:grid-cols-[1fr_1fr] [&_h1]:text-[clamp(3rem,7vw,6rem)] [&_h1]:font-editorial [&_h1]:leading-none [&>p:last-child]:max-w-xl [&>p:last-child]:self-end [&>p:last-child]:text-lg [&>p:last-child]:leading-relaxed [&>p:last-child]:text-muted"
        data-ui="page-container pd-archive-head"
      >
        <p
          className="text-xs font-semibold uppercase tracking-widest"
          data-ui="eyebrow"
        >
          Pendidikan / pengalaman lapangan
        </p>
        <h1>Pemantapan Divisi</h1>
        <p>
          Setiap divisi memiliki medan, standar keterampilan, dan bentuk
          dokumentasi sendiri. Satu katalog, lima jalur belajar.
        </p>
      </section>
      <section
        className="mx-auto w-full max-w-page px-5 sm:px-8 flex flex-wrap gap-4 py-6 [&_label]:text-xs [&_label]:font-bold [&_label]:uppercase [&_label]:tracking-widest [&_select]:ml-3 [&_select]:min-h-11 [&_select]:border [&_select]:border-line [&_select]:bg-surface [&_select]:px-3 [&_select]:text-base [&_select]:normal-case [&_select]:tracking-normal max-[640px]:[&_label]:w-full max-[640px]:[&_select]:ml-0 max-[640px]:[&_select]:mt-2 max-[640px]:[&_select]:w-full"
        data-ui="page-container pd-filter"
      >
        <label>
          Divisi
          <select
            aria-label="Filter divisi"
            value={division}
            onChange={(e) => setDivision(e.target.value)}
          >
            <option value="all">Semua divisi</option>
            <option value="GH">Gunung Hutan</option>
            <option value="RC">Panjat Tebing</option>
            <option value="ORAD">Olahraga Arus Deras</option>
            <option value="LH">Lingkungan Hidup</option>
            <option value="CAVING">Susur Gua</option>
          </select>
        </label>
        <label>
          Angkatan
          <select
            aria-label="Filter angkatan"
            value={cohort}
            onChange={(e) => setCohort(e.target.value)}
          >
            <option value="all">Semua angkatan</option>
            <option value="XXVI">XXVI</option>
            <option value="XXIX">XXIX</option>
          </select>
        </label>
      </section>
      {direction === "fieldnotes" ? (
        <section
          className="mx-auto w-full max-w-page px-5 sm:px-8 pb-16"
          data-ui="page-container pd-documentary"
        >
          <div
            className="grid items-center gap-10 py-8 md:grid-cols-[0.8fr_1.2fr] [&_h2]:mt-4 [&_h2]:max-w-xl [&_h2]:font-editorial [&_h2]:text-heading [&>div>p:not([data-ui~=eyebrow])]:mt-5 [&>div>p:not([data-ui~=eyebrow])]:max-w-xl [&>div>p:not([data-ui~=eyebrow])]:leading-relaxed [&>div>p:not([data-ui~=eyebrow])]:text-muted [&_[data-ui~=button]]:mt-7"
            data-ui="pd-feature"
          >
            <MediaPlate
              number="RC"
              title="Tebing Siung / Agustus 2025"
              caption="Kandidat foto: dua pemanjat dan tim belay. Izin subjek belum dikonfirmasi."
              kind="portrait"
            />
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-widest"
                data-ui="eyebrow"
              >
                Catatan unggulan / Panjat Tebing XXIX
              </p>
              <h2>Skala tebing terlihat dari kerja tim.</h2>
              <p>
                Arsip memperlihatkan pemanjatan, pengamatan jalur, pengelolaan
                tali, dan komunikasi dari bawah. Ini bukan galeri olahraga; ia
                dibaca sebagai proses belajar kolektif.
              </p>
              <a
                className="inline-flex items-center rounded-control border px-5 py-2.5 transition-colors min-h-11.5 rounded-control text-[17px] leading-[24px] font-semibold pt-2.5 pr-4 pb-2.5 pl-4 gap-2 justify-start disabled:opacity-100 disabled:text-disabled-ink disabled:bg-disabled-bg disabled:border-disabled-bg disabled:cursor-not-allowed hover:bg-ink bg-primary border-primary text-surface [&:hover:not(:disabled)]:bg-primary-hover [&:hover:not(:disabled)]:border-primary-hover [&:active:not(:disabled)]:bg-primary-active [&:active:not(:disabled)]:border-primary-active"
                href="#/activity/rc29"
                data-ui="button button-primary"
              >
                Buka catatan RC XXIX
              </a>
            </div>
          </div>
          <div
            className="mt-8 grid gap-6 md:grid-cols-2"
            data-ui="pd-card-grid"
          >
            {records.map((a) => (
              <ActivityCard key={a.id} activity={a} />
            ))}
          </div>
        </section>
      ) : (
        <section
          className="mx-auto w-full max-w-page px-5 sm:px-8 border-t-2 border-ink pb-16 [&>a]:grid [&>a]:gap-5 [&>a]:border-b [&>a]:border-ink [&>a]:py-6 [&>a]:text-ink [&>a]:hover:bg-leaf/20 [&>a]:md:grid-cols-[3rem_1.2fr_0.8fr] [&>a>span]:text-2xl [&>a>span]:font-black [&_h2]:mt-2 [&_h2]:text-2xl [&_h2]:font-black [&_h2]:uppercase [&_div>p:last-child]:mt-3 [&_div>p:last-child]:max-w-2xl [&_div>p:last-child]:text-sm [&_div>p:last-child]:leading-relaxed [&_div>p:last-child]:text-muted [&_dl]:grid [&_dl]:grid-cols-[5rem_1fr] [&_dl]:gap-x-3 [&_dl]:gap-y-2 [&_dl]:text-xs [&_dt]:font-bold [&_dt]:uppercase [&_dd]:text-muted"
          data-ui="page-container pd-atlas-list"
        >
          {records.map((a, i) => (
            <a key={a.id} href={a.href}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-widest"
                  data-ui="eyebrow"
                >
                  {a.division} / {a.cohort}
                </p>
                <h2>{a.title}</h2>
                <p>{a.summary}</p>
              </div>
              <dl>
                <dt>Tempat</dt>
                <dd>{a.location ?? "Belum tercatat"}</dd>
                <dt>Waktu</dt>
                <dd>{a.date ?? "Belum tercatat"}</dd>
                <dt>Bukti</dt>
                <dd>{a.evidenceLabel}</dd>
              </dl>
            </a>
          ))}
        </section>
      )}
      {records.length === 0 && (
        <p
          role="status"
          className="mx-auto w-full max-w-page px-5 sm:px-8 pb-12"
          data-ui="page-container"
        >
          Belum ada catatan sesuai filter. Ini batas isi prototipe, bukan bukti
          kegiatan tidak pernah ada.
        </p>
      )}
    </>
  );
}
const pdLearning: Record<string, string[]> = {
  gh29: [
    "Navigasi darat manual dan digital",
    "Manajemen perjalanan dan gizi",
    "Pengamatan medan serta konteks masyarakat",
  ],
  rc29: [
    "Pemanjatan artificial dan sport",
    "Instalasi anchor serta pemetaan jalur",
    "Rescue group dan kerja belay",
  ],
  orad29: [
    "Catatan detail belum dikurasi",
    "Lokasi dan rentang telah terverifikasi",
  ],
  lh29: ["Pengamatan lingkungan", "Karya lapangan belum dikurasi"],
  caving29: [
    "Eksplorasi horizontal dan vertikal",
    "Pemetaan serta rigging tercantum dalam standar",
  ],
};
export function ArchivePDDetail({
  id,
  direction,
}: {
  id: string;
  direction: ArchiveDirection;
}) {
  const record = pdRecords.find((r) => r.id === id);
  if (!record) return null;
  const visual = id === "rc29";
  return (
    <>
      <section
        className={` mx-auto w-full max-w-page px-5 sm:px-8 py-12 md:py-16 [&>[data-ui~=eyebrow]]:mt-10 [&_h1]:mt-4 [&_h1]:max-w-5xl [&_h1]:font-editorial [&_h1]:text-[clamp(3rem,7vw,6rem)] [&_h1]:leading-[0.95] [&>p]:mt-6 [&>p]:max-w-3xl [&>p]:text-lg [&>p]:leading-relaxed [&>p]:text-muted [&>div]:mt-8 [&>div]:flex [&>div]:flex-wrap [&>div]:items-center [&>div]:gap-5 [&>div]:text-sm [&>div]:text-muted [&[data-ui~=is-atlas]]:border-b-2 [&[data-ui~=is-atlas]]:border-ink [&[data-ui~=is-atlas]_h1]:font-sans [&[data-ui~=is-atlas]_h1]:font-black [&[data-ui~=is-atlas]_h1]:uppercase [&[data-ui~=is-atlas]_h1]:tracking-[-0.06em] ${direction === "signal" ? "" : ""}  `}
        data-ui={`page-container pd-detail-head ${direction === "signal" ? "is-atlas" : ""}`}
      >
        <a
          className="inline-flex min-h-11 items-center gap-3 text-sm font-medium text-forest hover:underline"
          href="#/program/pd"
          data-ui="site-nav-link"
        >
          ← Katalog Pemantapan Divisi
        </a>
        <p
          className="text-xs font-semibold uppercase tracking-widest"
          data-ui="eyebrow"
        >
          {record.division} / Angkatan {record.cohort}
        </p>
        <h1>{record.title.replace("Pemantapan Divisi ", "")}</h1>
        <p>{record.summary}</p>
        <div>
          <StatusLabel state={record.state} />
          <span>{record.date}</span>
          <span>{record.location}</span>
        </div>
      </section>
      {record.depth === "rich" ? (
        <>
          <section
            className="mx-auto w-full max-w-page px-5 sm:px-8 grid gap-10 pb-14 md:grid-cols-[0.8fr_1.2fr] [&_article]:self-center [&_h2]:mt-4 [&_h2]:font-editorial [&_h2]:text-heading [&_ul]:mt-6 [&_ul]:list-decimal [&_ul]:space-y-4 [&_ul]:border-y [&_ul]:border-line [&_ul]:py-5 [&_ul]:pl-8 [&_ul]:text-sm"
            data-ui="page-container pd-detail-grid"
          >
            <MediaPlate
              number={record.division ?? "PD"}
              title={
                visual
                  ? "Kerja tim di Tebing Siung"
                  : "Navigasi di medan Gunung Lawu"
              }
              caption={
                visual
                  ? "Kandidat foto arsip: pemanjat dan belayer. Kredit dan izin belum dikonfirmasi."
                  : "Kandidat foto arsip: peta, kompas, dan observasi medan. Kredit dan izin belum dikonfirmasi."
              }
              kind="portrait"
            />
            <article>
              <p
                className="text-xs font-semibold uppercase tracking-widest"
                data-ui="eyebrow"
              >
                Fokus pembelajaran
              </p>
              <h2>Spesialisasi dibaca melalui praktik.</h2>
              <ul>
                {(pdLearning[id] || []).map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
              <p
                className="mt-6 text-xs leading-relaxed text-muted"
                data-ui="source-note"
              >
                Sumber publik: LPJ Pengurus 2025. Foto HUMED hanya ditinjau
                secara privat.
              </p>
            </article>
          </section>
          <section
            className="mx-auto w-full max-w-page px-5 sm:px-8 grid border-y border-line sm:grid-cols-3 [&>div]:border-b [&>div]:border-line [&>div]:p-6 [&>div]:sm:border-b-0 [&>div]:sm:border-r [&_span]:text-xs [&_span]:font-bold [&_span]:uppercase [&_span]:tracking-widest [&_p]:mt-3 [&_p]:text-sm [&_p]:leading-relaxed [&_p]:text-muted"
            data-ui="page-container pd-evidence-band"
          >
            <div>
              <span>Pra</span>
              <p>Pematerian, latihan, proposal, dan simulasi.</p>
            </div>
            <div>
              <span>Lapangan</span>
              <p>Spesialisasi pada medan divisi yang ditetapkan.</p>
            </div>
            <div>
              <span>Pasca</span>
              <p>
                Presentasi laporan; status laporan bervariasi dan tidak
                disamakan dengan selesai lapangan.
              </p>
            </div>
          </section>
        </>
      ) : (
        <section
          className="mx-auto w-full max-w-page px-5 sm:px-8 pb-12"
          data-ui="page-container"
        >
          <div
            className="border-l-2 border-gold bg-surface p-6"
            data-ui="editorial-note"
          >
            <h2 className="font-semibold">Catatan dasar tetap berguna.</h2>
            <p
              className="max-w-prose text-muted mt-3 text-sm"
              data-ui="reading-copy"
            >
              Lokasi dan rentang telah dicatat, tetapi narasi teknis dan hasil
              karya belum ditambahkan sebelum sumber divisi selesai dikurasi.
            </p>
          </div>
        </section>
      )}
    </>
  );
}
