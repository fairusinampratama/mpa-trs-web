import { useEffect, useState, type FormEvent, type KeyboardEvent } from "react";
import { Button } from "./components/Button";
import { ActivityCard } from "./components/ActivityCard";
import { StatusLabel, type ActivityState } from "./components/StatusLabel";
import {
  ProgrammeEntry,
  ActivityPreview,
  PublicationPreview,
  DocumentaryMedia,
  SectionHeading,
  TextLink,
} from "./components/Foundation";
import { pdRecords, publicWorks } from "./content";
import { activities } from "./fixtures";
const sections = [
  {
    id: "foundation",
    label: "Fondasi",
  },
  {
    id: "components",
    label: "Komponen",
  },
  {
    id: "states",
    label: "Status & formulir",
  },
];
const colors = [
  {
    name: "Primary",
    token: "primary",
    swatch: "bg-primary",
  },
  {
    name: "Ink",
    token: "ink",
    swatch: "bg-ink",
  },
  {
    name: "Gold / graphic only",
    token: "gold",
    swatch: "bg-gold",
  },
  {
    name: "Blue",
    token: "blue",
    swatch: "bg-blue",
  },
  {
    name: "Page",
    token: "page",
    swatch: "bg-page",
  },
];
function SyntheticExpeditionSpecimen() {
  const journey = [
    ["Hari 01", "Persiapan dan keberangkatan", "Tim contoh meninjau perlengkapan, pembagian peran, dan rencana perjalanan."],
    ["Hari 02", "Perjalanan menuju wilayah kegiatan", "Perpindahan moda dan perubahan kondisi medan dicatat sebagai latihan dokumentasi."],
    ["Hari 03", "Praktik lapangan", "Pengamatan lingkungan dan percakapan sosial budaya disimulasikan tanpa merujuk lokasi nyata."],
    ["Hari 04", "Evaluasi dan kepulangan", "Catatan, foto contoh, dan hasil latihan dihimpun untuk evaluasi editorial."],
  ];
  return (
    <article className="bg-page py-10 text-ink" data-ui="synthetic-expedition-specimen">
      <header className="mx-auto w-[calc(100%_-_32px)] max-w-institution md:w-[calc(100%_-_48px)]">
        <p className="font-sans text-[12px]/[18px] font-semibold tracking-[.04em] text-blue uppercase">
          Contoh sintetis · bukan ekspedisi nyata
        </p>
        <h1 className="mt-3 max-w-[16ch] font-editorial text-[42px]/[44px] font-semibold lg:text-[64px]/[66px]">
          Ekspedisi contoh untuk pengujian tata letak
        </h1>
        <p className="mt-6 max-w-[66ch] text-[18px]/[27px] lg:text-[21px]/[31px]">
          Fixture ini menguji halaman ekspedisi kaya tanpa menempelkan tempat,
          tanggal, perjalanan, atau hasil rekaan pada TE1–TE13.
        </p>
        <dl className="mt-7 grid grid-cols-2 border-y border-border sm:grid-cols-3 sm:divide-x sm:divide-border">
          {[["Tanggal", "Simulasi 4 hari"], ["Tempat", "Lokasi sintetis"], ["Status", "Contoh UI"]].map(([label,value], index) => (
            <div className={`${index === 2 ? "col-span-2 border-t border-border sm:col-span-1 sm:border-t-0" : ""} py-3 sm:px-5 sm:first:pl-0 sm:last:pr-0`} key={label}>
              <dt className="font-sans text-[12px]/[18px] font-semibold tracking-[.04em] text-muted uppercase">{label}</dt>
              <dd className="mt-1 font-editorial text-[20px]/[27px] font-semibold">{value}</dd>
            </div>
          ))}
        </dl>
      </header>
      <div className="mx-auto mt-10 w-[calc(100%_-_32px)] max-w-institution md:w-[calc(100%_-_48px)]">
        <div className="grid min-h-72 place-items-center border-2 border-dashed border-border bg-surface-muted p-8 text-center">
          <div>
            <p className="font-sans text-[12px]/[18px] font-semibold tracking-[.04em] text-blue uppercase">Media sintetis</p>
            <p className="mt-3 max-w-[42ch] font-editorial text-[24px]/[31px] font-semibold">Area dokumenter untuk menguji proporsi, caption, dan alur baca.</p>
          </div>
        </div>
      </div>
      <section className="mx-auto w-[calc(100%_-_32px)] max-w-institution py-12 md:w-[calc(100%_-_48px)] lg:py-18">
        <SectionHeading label="Rangkaian perjalanan" title="Empat tahap dokumentasi contoh." description="Semua isi pada bagian ini sengaja sintetis dan hanya menguji struktur halaman." />
        <ol className="list-none border-t border-border p-0">
          {journey.map(([date,title,body], index) => (
            <li className="grid grid-cols-[32px_minmax(0,1fr)] gap-4 border-b border-border py-6" key={title}>
              <span className="font-sans text-[12px]/[18px] font-semibold text-blue">{String(index + 1).padStart(2,"0")}</span>
              <div>
                <p className="text-[14px]/[20px] text-muted">{date}</p>
                <h2 className="mt-1 font-editorial text-[24px]/[30px] font-semibold">{title}</h2>
                <p className="mt-3 max-w-[66ch] text-[17px]/[25px]">{body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
      <section className="bg-surface-muted py-12 lg:py-18">
        <div className="mx-auto w-[calc(100%_-_32px)] max-w-institution md:w-[calc(100%_-_48px)]">
          <SectionHeading label="Hasil contoh" title="Dokumentasi, evaluasi, dan karya turunan." description="Struktur ini hanya muncul pada catatan nyata ketika arsip mendukungnya." />
          <div className="grid gap-6 md:grid-cols-3">
            {[["Dokumentasi","Contoh susunan foto dan caption."],["Evaluasi","Contoh ringkasan pelajaran lapangan."],["Karya terkait","Contoh hubungan ke catatan pengetahuan."]].map(([title,body]) => (
              <article className="border-t-2 border-primary pt-4" key={title}>
                <h3 className="font-editorial text-[24px]/[30px] font-semibold">{title}</h3>
                <p className="mt-3 text-[16px]/[24px] text-muted">{body}</p>
              </article>
            ))}
          </div>
          <div className="mt-8"><TextLink href="#/ui-lab" variant="quiet">Kembali ke laboratorium</TextLink></div>
        </div>
      </section>
    </article>
  );
}
export function Lab() {
  const [route, setRoute] = useState(location.hash.slice(1) || "/ui-lab");
  const [active, setActive] = useState("foundation");
  const [filter, setFilter] = useState("all");
  const [menu, setMenu] = useState(false);
  const [feedback, setFeedback] = useState("");
  useEffect(() => {
    const update = () => {
      setRoute(location.hash.slice(1) || "/ui-lab");
      setMenu(false);
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, []);
  const record = route.startsWith("/ui-lab/record/")
    ? activities.find((a) => a.id === route.split("/").pop())
    : undefined;
  const syntheticExpedition = route === "/ui-lab/expedition/synthetic";
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFeedback(
      "Contoh informasi diterima di sesi ini. Belum dikirim atau disimpan ke institusi.",
    );
  }
  function tabKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const target =
      event.key === "ArrowRight"
        ? (index + 1) % sections.length
        : event.key === "ArrowLeft"
          ? (index + sections.length - 1) % sections.length
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? sections.length - 1
              : undefined;
    if (target === undefined) return;
    event.preventDefault();
    setActive(sections[target].id);
    document.getElementById(`tab-${sections[target].id}`)?.focus();
  }
  return (
    <div>
      <a
        href="#main-content"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("main-content")?.focus();
        }}
        className="sr-only focus:not-sr-only focus:absolute focus:z-20 focus:bg-surface focus:p-4"
      >
        Langsung ke isi
      </a>
      <div className="bg-forest text-surface">
        <div
          className="mx-auto w-full max-w-page px-5 sm:px-8 flex flex-wrap items-center justify-between gap-2 py-2 text-xs"
          data-ui="page-container"
        >
          <span>STAGE 3 · LINGKUNGAN REVIEW</span>
          <span className="text-leaf">
            Konten sintetis · bukan situs produksi
          </span>
        </div>
      </div>
      <header className="border-b border-line bg-paper">
        <div
          className="mx-auto w-full max-w-page px-5 sm:px-8 flex items-center justify-between gap-4 py-6"
          data-ui="page-container"
        >
          <a
            href="#/ui-lab"
            className="flex min-w-0 items-center gap-3 sm:gap-4"
            aria-label="MAPALA Tursina — UI laboratory"
          >
            <span>
              <span className="block text-sm font-bold tracking-wider sm:text-base sm:tracking-widest">
                MAPALA TURSINA
              </span>
              <span className="mt-1 block text-xs text-muted">
                UIN Maulana Malik Ibrahim Malang
              </span>
            </span>
          </a>
          <nav
            aria-label="Navigasi laboratorium"
            className="hidden items-center gap-6 md:flex"
          >
            <a
              className="inline-flex min-h-11 items-center border-b-2 border-transparent text-sm text-muted hover:text-forest [&[aria-current=page]]:border-forest [&[aria-current=page]]:font-semibold [&[aria-current=page]]:text-forest"
              aria-current={route === "/ui-lab" ? "page" : undefined}
              href="#/ui-lab"
              data-ui="lab-link"
            >
              Laboratorium UI
            </a>
            <a
              className="inline-flex min-h-11 items-center border-b-2 border-transparent text-sm text-muted hover:text-forest [&[aria-current=page]]:border-forest [&[aria-current=page]]:font-semibold [&[aria-current=page]]:text-forest"
              href="#/ui-lab/record/field-notes"
              data-ui="lab-link"
            >
              Contoh catatan
            </a>
            <a
              className="inline-flex min-h-11 items-center border-b-2 border-transparent text-sm text-muted hover:text-forest [&[aria-current=page]]:border-forest [&[aria-current=page]]:font-semibold [&[aria-current=page]]:text-forest"
              aria-current={syntheticExpedition ? "page" : undefined}
              href="#/ui-lab/expedition/synthetic"
              data-ui="lab-link"
            >
              Contoh ekspedisi
            </a>
            <span className="rounded-control border border-line px-3 py-2 text-xs text-muted">
              Draft desain · 0.1
            </span>
          </nav>
          <div className="md:hidden">
            <Button
              variant="secondary"
              onClick={() => setMenu(!menu)}
              aria-expanded={menu}
              aria-controls="mobile-nav"
            >
              Menu
            </Button>
          </div>
        </div>
        {menu && (
          <nav
            id="mobile-nav"
            aria-label="Navigasi mobile"
            className="mx-auto w-full max-w-page px-5 sm:px-8 flex flex-col gap-2 pb-5 md:hidden"
            data-ui="page-container"
          >
            <a
              className="inline-flex min-h-11 items-center border-b-2 border-transparent text-sm text-muted hover:text-forest [&[aria-current=page]]:border-forest [&[aria-current=page]]:font-semibold [&[aria-current=page]]:text-forest"
              href="#/ui-lab"
              data-ui="lab-link"
            >
              Laboratorium UI
            </a>
            <a
              className="inline-flex min-h-11 items-center border-b-2 border-transparent text-sm text-muted hover:text-forest [&[aria-current=page]]:border-forest [&[aria-current=page]]:font-semibold [&[aria-current=page]]:text-forest"
              href="#/ui-lab/record/field-notes"
              data-ui="lab-link"
            >
              Contoh catatan
            </a>
            <a
              className="inline-flex min-h-11 items-center border-b-2 border-transparent text-sm text-muted hover:text-forest"
              href="#/ui-lab/expedition/synthetic"
              data-ui="lab-link"
            >
              Contoh ekspedisi
            </a>
          </nav>
        )}
      </header>
      <main id="main-content" tabIndex={-1}>
        {syntheticExpedition && <SyntheticExpeditionSpecimen />}
        {!record && route === "/ui-lab" && (
          <section
            className="bg-page text-ink font-sans text-[17px] leading-[25px] py-10 [&>[data-ui~=container]]:grid [&>[data-ui~=container]]:gap-8"
            data-ui="site lab-specimens"
          >
            <div
              className="w-[calc(100%_-_32px)] max-w-institution mx-auto md:w-[calc(100%_-_48px)]"
              data-ui="container"
            >
              <div>
                <p
                  className="font-semibold text-[12px] leading-[18px] font-sans uppercase tracking-[.02em] text-blue"
                  data-ui="label"
                >
                  Step 5A / fondasi bersama
                </p>
                <h2
                  className="font-semibold text-[30px] leading-[35px] font-editorial lg:text-[40px] lg:leading-[46px] lg:font-semibold"
                  data-ui="section-title"
                >
                  Pola beranda yang dapat dipakai kembali.
                </h2>
                <a
                  className="flex items-center justify-start gap-4 min-h-11 font-semibold text-[17px] leading-[24px] font-sans text-primary no-underline w-fit max-w-full [&>span:last-child]:shrink-0 [&:hover>span:first-child]:underline [&:hover>span:first-child]:underline-offset-4"
                  href="#/"
                  data-ui="link"
                >
                  Buka beranda
                </a>
              </div>
              <div className="grid gap-6 lg:grid-cols-3" data-ui="lab-patterns">
                <ProgrammeEntry
                  index="01"
                  title="Tursina Explore"
                  description="Identitas program dan edisi terpisah."
                  href="#/program/te"
                  action="Lihat edisi"
                />
                <ActivityPreview
                  activity={pdRecords.find((a) => a.id === "gh29")!}
                />
                <PublicationPreview
                  title={publicWorks[0].title}
                  type="Artikel"
                  date={publicWorks[0].date}
                  related="TE11"
                  summary="Metadata karya; isi asli tetap terlindungi."
                  href="#/publication/sacred-gatekeeper"
                  action="Buka artikel"
                />
              </div>
              <DocumentaryMedia
                role="gh"
                fallbackTitle="Peta dan kompas"
                fallback="Contoh komponen tanpa media publik yang telah diizinkan."
              />
            </div>
          </section>
        )}

        {record ? (
          <div
            className="mx-auto w-full max-w-page px-5 sm:px-8 py-12"
            data-ui="page-container"
          >
            <a
              href="#/ui-lab"
              className="inline-flex min-h-11 items-center border-b-2 border-transparent text-sm text-muted hover:text-forest [&[aria-current=page]]:border-forest [&[aria-current=page]]:font-semibold [&[aria-current=page]]:text-forest"
              data-ui="lab-link"
            >
              ← Kembali ke laboratorium
            </a>
            <div className="mt-8 max-w-3xl">
              <p
                className="text-xs font-semibold uppercase tracking-widest text-muted"
                data-ui="eyebrow"
              >
                Uji komponen · contoh sintetis
              </p>
              <h1
                className="font-editorial font-normal mt-4 text-display"
                data-ui="editorial-heading"
              >
                {record.title}
              </h1>
              <div className="mt-6">
                <StatusLabel state={record.state} />
              </div>
              <p
                className="max-w-prose text-muted mt-6 text-lg"
                data-ui="reading-copy"
              >
                {record.summary}
              </p>
              {record.depth === "rich" && (
                <section className="mt-10 border-t border-line pt-8">
                  <h2
                    className="font-editorial text-heading"
                    data-ui="section-title"
                  >
                    Pengetahuan yang diteruskan
                  </h2>
                  <p
                    className="max-w-prose leading-relaxed text-muted mt-4"
                    data-ui="reading-copy"
                  >
                    Bagian ini menguji ritme membaca dan hubungan kegiatan
                    dengan pengetahuan. Narasi lapangan yang sebenarnya akan
                    disusun dari sumber terverifikasi pada P1.
                  </p>
                </section>
              )}
              <div
                className="rounded-card border border-line bg-surface p-6 mt-10"
                data-ui="panel"
              >
                <h2 className="text-sm font-semibold">
                  Dokumentasi belum dipilih
                </h2>
                <p className="mt-2 text-sm text-muted">
                  Foto dan sumber asli tidak ditampilkan. Pemilihan aset
                  mengikuti pemeriksaan fakta, kredit, dan izin.
                </p>
              </div>
            </div>
          </div>
        ) : route !== "/ui-lab" && !syntheticExpedition ? (
          <div
            className="mx-auto w-full max-w-page px-5 sm:px-8 py-16"
            data-ui="page-container"
          >
            <h1 className="font-editorial text-heading" data-ui="section-title">
              Contoh tidak tersedia
            </h1>
            <a
              href="#/ui-lab"
              className="inline-flex min-h-11 items-center border-b-2 border-transparent text-sm text-muted hover:text-forest [&[aria-current=page]]:border-forest [&[aria-current=page]]:font-semibold [&[aria-current=page]]:text-forest"
              data-ui="lab-link"
            >
              Kembali ke laboratorium
            </a>
          </div>
        ) : route === "/ui-lab" ? (
          <>
            <section
              className="mx-auto w-full max-w-page px-5 sm:px-8 grid gap-8 py-12 md:grid-cols-[1.7fr_1fr] md:py-16"
              data-ui="page-container"
            >
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-widest text-muted"
                  data-ui="eyebrow"
                >
                  Laboratorium antarmuka / fondasi
                </p>
                <h1
                  className="font-editorial font-normal mt-5 text-display"
                  data-ui="editorial-heading"
                >
                  Jejak yang dijaga.
                  <br />
                  <span className="text-muted">Pengetahuan yang hidup.</span>
                </h1>
                <p
                  className="leading-relaxed text-muted mt-6 max-w-xl"
                  data-ui="reading-copy"
                >
                  Ruang untuk menguji bahasa visual, komponen, dan pengalaman
                  membaca Tursina. Satu fondasi yang dipakai bersama, dari
                  catatan singkat hingga cerita ekspedisi.
                </p>
              </div>
              <aside className="self-end border-l-2 border-gold pl-6">
                <p
                  className="text-xs font-semibold uppercase tracking-widest text-forest"
                  data-ui="eyebrow"
                >
                  Fondasi disetujui / Step 4
                </p>
                <p className="mt-3 font-editorial text-2xl">
                  Lihat. Coba. Perbaiki.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  Fondasi visual Step 4 diterapkan pada beranda. Contoh berikut
                  memakai komponen sumber yang sama; halaman pendukung menunggu
                  Step 5B.
                </p>
                <a
                  href="#/ui-lab/record/field-notes"
                  className="inline-flex min-h-11 items-center border-b-2 border-transparent text-sm text-muted hover:text-forest [&[aria-current=page]]:border-forest [&[aria-current=page]]:font-semibold [&[aria-current=page]]:text-forest mt-4 font-semibold"
                  data-ui="lab-link"
                >
                  Coba catatan kegiatan{" "}
                  <span aria-hidden="true" className="ml-3">
                    ↗
                  </span>
                </a>
              </aside>
            </section>
            <div className="border-y border-line">
              <div
                className="mx-auto w-full max-w-page px-5 sm:px-8 flex flex-wrap gap-6"
                role="tablist"
                aria-label="Bagian UI laboratory"
                data-ui="page-container"
              >
                {sections.map((s, index) => (
                  <button
                    key={s.id}
                    id={`tab-${s.id}`}
                    role="tab"
                    tabIndex={active === s.id ? 0 : -1}
                    aria-selected={active === s.id}
                    aria-controls={`panel-${s.id}`}
                    onKeyDown={(event) => tabKey(event, index)}
                    onClick={() => setActive(s.id)}
                    className="inline-flex min-h-11 items-center border-b-2 border-transparent text-sm text-muted hover:text-forest [&[aria-current=page]]:border-forest [&[aria-current=page]]:font-semibold [&[aria-current=page]]:text-forest"
                    aria-current={active === s.id ? "page" : undefined}
                    data-ui="lab-link"
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
            {active === "foundation" && (
              <section
                id="panel-foundation"
                role="tabpanel"
                aria-labelledby="tab-foundation"
                className="mx-auto w-full max-w-page px-5 sm:px-8 py-12"
                data-ui="page-container"
              >
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <p
                      className="text-xs font-semibold uppercase tracking-widest text-muted"
                      data-ui="eyebrow"
                    >
                      01 / Tema
                    </p>
                    <h2
                      className="font-editorial text-heading mt-3"
                      data-ui="section-title"
                    >
                      Warna dengan peran.
                    </h2>
                  </div>
                  <p className="max-w-sm text-sm text-muted">
                    Interpretasi awal makna identitas. Nilai warna ini bukan
                    spesifikasi resmi logo.
                  </p>
                </div>
                <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-5">
                  {colors.map((c) => (
                    <div
                      key={c.token}
                      className="overflow-hidden rounded-card border border-line bg-surface"
                    >
                      <div
                        className={` h-24 ${c.swatch}  `}
                        aria-label={`Warna ${c.name}`}
                      />
                      <div className="p-4">
                        <p className="text-sm font-semibold">{c.name}</p>
                        <p className="mt-1 text-xs text-muted">{c.token}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-12 grid gap-8 border-t border-line pt-10 md:grid-cols-2">
                  <div>
                    <p
                      className="text-xs font-semibold uppercase tracking-widest text-muted"
                      data-ui="eyebrow"
                    >
                      02 / Tipografi editorial
                    </p>
                    <h3 className="mt-4 font-editorial text-4xl">
                      Dari pengalaman,
                      <br />
                      menjadi pengetahuan.
                    </h3>
                    <p
                      className="max-w-prose leading-relaxed text-muted mt-4"
                      data-ui="reading-copy"
                    >
                      Judul serif memberi ruang bagi cerita. Teks sans menjaga
                      informasi, navigasi, dan catatan tetap jelas dibaca.
                    </p>
                  </div>
                  <div
                    className="rounded-card border border-line bg-surface p-6"
                    data-ui="panel"
                  >
                    <p
                      className="text-xs font-semibold uppercase tracking-widest text-muted"
                      data-ui="eyebrow"
                    >
                      03 / Elemen bersama
                    </p>
                    <h3 className="mt-4 text-lg font-semibold">
                      Aksi yang jelas, pola yang konsisten.
                    </h3>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <Button
                        onClick={() => {
                          setActive("components");
                          setFeedback("Komponen kegiatan dibuka.");
                        }}
                      >
                        Lihat komponen <span aria-hidden="true">→</span>
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => {
                          setActive("states");
                          setFeedback("Status dan formulir dibuka.");
                        }}
                      >
                        Coba formulir
                      </Button>
                    </div>
                  </div>
                </div>
              </section>
            )}
            {active === "components" && (
              <section
                id="panel-components"
                role="tabpanel"
                aria-labelledby="tab-components"
                className="mx-auto w-full max-w-page px-5 sm:px-8 py-12"
                data-ui="page-container"
              >
                <p
                  className="text-xs font-semibold uppercase tracking-widest text-muted"
                  data-ui="eyebrow"
                >
                  04 / Catatan kegiatan
                </p>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-4">
                  <h2
                    className="font-editorial text-heading"
                    data-ui="section-title"
                  >
                    Satu pola, kedalaman berbeda.
                  </h2>
                  <label className="text-sm text-muted">
                    Status contoh
                    <select
                      aria-label="Filter status contoh"
                      className="w-full rounded-control border bg-surface px-3 py-2 text-base min-h-12 border-control-border rounded-control mt-2"
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                      data-ui="field"
                    >
                      <option value="all">Semua contoh</option>
                      <option value="historical">Historis</option>
                      <option value="planned">Direncanakan</option>
                      <option value="ongoing">Berlangsung</option>
                    </select>
                  </label>
                </div>
                <div className="mt-8 grid gap-6 md:grid-cols-2">
                  {activities
                    .filter((a) => filter === "all" || a.state === filter)
                    .map((a) => (
                      <ActivityCard key={a.id} activity={a} />
                    ))}
                </div>
                {activities.filter(
                  (a) => filter === "all" || a.state === filter,
                ).length === 0 && (
                  <div
                    className="rounded-card border border-line bg-surface p-6 mt-8"
                    role="status"
                    data-ui="panel"
                  >
                    <h3 className="font-editorial text-2xl">
                      Belum ada contoh yang sesuai.
                    </h3>
                    <p className="mt-3 text-muted">
                      Hasil kosong tidak berarti kegiatan institusi tidak pernah
                      ada.
                    </p>
                    <div className="mt-4">
                      <Button
                        variant="secondary"
                        onClick={() => setFilter("all")}
                      >
                        Reset filter
                      </Button>
                    </div>
                  </div>
                )}
              </section>
            )}
            {active === "states" && (
              <section
                id="panel-states"
                role="tabpanel"
                aria-labelledby="tab-states"
                className="mx-auto w-full max-w-page px-5 sm:px-8 grid gap-8 py-12 md:grid-cols-2"
                data-ui="page-container"
              >
                <div>
                  <p
                    className="text-xs font-semibold uppercase tracking-widest text-muted"
                    data-ui="eyebrow"
                  >
                    05 / Status & interaksi
                  </p>
                  <h2
                    className="font-editorial text-heading mt-3"
                    data-ui="section-title"
                  >
                    Jelas saat belum lengkap.
                  </h2>
                  <div className="mt-6 flex flex-wrap gap-3">
                    {(
                      [
                        "planned",
                        "ongoing",
                        "historical",
                        "unknown",
                      ] as ActivityState[]
                    ).map((s) => (
                      <StatusLabel key={s} state={s} />
                    ))}
                  </div>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Button disabled>Belum tersedia</Button>
                    <Button busy>Memproses</Button>
                    <Button
                      variant="quiet"
                      onClick={() =>
                        setFeedback(
                          "Contoh asli tetap terlindungi. Aksi ini hanya simulasi.",
                        )
                      }
                    >
                      Lihat batas akses
                    </Button>
                  </div>
                  <div
                    className="rounded-card border border-line bg-surface p-6 mt-8"
                    data-ui="panel"
                  >
                    <h3 className="text-sm font-semibold">
                      Sumber asli terlindungi
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      Cerita publik dapat dibaca tanpa membuka laporan internal.
                      Status publikasi website berbeda dari penerimaan laporan
                      organisasi.
                    </p>
                  </div>
                </div>
                <form
                  onSubmit={submit}
                  className="rounded-card border border-line bg-surface p-6"
                  data-ui="panel"
                >
                  <p
                    className="text-xs font-semibold uppercase tracking-widest text-muted"
                    data-ui="eyebrow"
                  >
                    06 / Uji informasi singkat
                  </p>
                  <h3 className="mt-3 font-editorial text-2xl">
                    Catatan untuk editor
                  </h3>
                  <p className="mt-3 text-sm text-muted">
                    Simulasi lokal; belum menetapkan kanal submission atau
                    portal organizer.
                  </p>
                  <label
                    className="mt-6 block text-sm font-semibold"
                    htmlFor="submission-title"
                  >
                    Judul kegiatan
                  </label>
                  <input
                    id="submission-title"
                    className="w-full rounded-control border bg-surface px-3 py-2 text-base min-h-12 border-control-border rounded-control mt-2"
                    placeholder="Contoh kegiatan"
                    required
                    maxLength={120}
                    data-ui="field"
                  />
                  <label
                    className="mt-5 block text-sm font-semibold"
                    htmlFor="submission-summary"
                  >
                    Apa yang perlu diketahui?
                  </label>
                  <textarea
                    id="submission-summary"
                    className="w-full rounded-control border bg-surface px-3 py-2 text-base min-h-12 border-control-border rounded-control mt-2"
                    rows={3}
                    placeholder="Tujuan dan informasi yang sudah diketahui"
                    required
                    maxLength={800}
                    data-ui="field"
                  />
                  <div className="mt-5">
                    <Button type="submit">Coba kirim informasi</Button>
                  </div>
                </form>
              </section>
            )}
            <div
              aria-live="polite"
              className="mx-auto w-full max-w-page px-5 sm:px-8 pb-6 text-sm text-success"
              data-ui="page-container"
            >
              {feedback}
            </div>
          </>
        ) : null}
      </main>
      <footer className="border-t border-line">
        <div
          className="mx-auto w-full max-w-page px-5 sm:px-8 flex flex-wrap items-center justify-between gap-4 py-8 text-xs text-muted"
          data-ui="page-container"
        >
          <span>MAPALA TURSINA · Stage 3 / UI laboratory</span>
          <a
            href="#/review"
            className="inline-flex min-h-11 items-center border-b-2 border-transparent text-sm text-muted hover:text-forest [&[aria-current=page]]:border-forest [&[aria-current=page]]:font-semibold [&[aria-current=page]]:text-forest"
            data-ui="lab-link"
          >
            Bandingkan website ↗
          </a>
          <a
            href="./responsive-review.html"
            className="inline-flex min-h-11 items-center border-b-2 border-transparent text-sm text-muted hover:text-forest [&[aria-current=page]]:border-forest [&[aria-current=page]]:font-semibold [&[aria-current=page]]:text-forest"
            data-ui="lab-link"
          >
            Periksa viewport mobile ↗
          </a>
          <span>Step 4 disetujui · implementasi Step 5A dalam review</span>
        </div>
      </footer>
    </div>
  );
}
