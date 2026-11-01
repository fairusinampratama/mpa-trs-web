import { useContentReadModel } from "./ContentReadModel";
import {
  RelatedRecords,
  DateEvidence,
  RecordDate,
} from "./components/RecordContext";
import { type ReactNode } from "react";
import type { ActivityFixture } from "./components/ActivityCard";
import { canonicalRegistry } from "./domain/index.ts";
import { visibleRelations, workDiscovery } from "./domain/read.ts";
import {
  ActivityMetadata,
  DocumentaryMedia,
  EvidenceDisclosure,
  TextLink,
} from "./components/Foundation";
// Historical export retained for compatibility; story content is authored only in domain/.
export const te11Journey = canonicalRegistry.activities.find(
  (a) => a.id === "te11",
)!.narrative!.journey;
function StorySection({
  label,
  title,
  children,
}: {
  label?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      className="[&+[data-ui~=te-story-section]]:mt-10 [&>[data-ui~=label]]:mb-3 [&_[data-ui~=section-heading]]:mb-6 lg:[&+[data-ui~=te-story-section]]:mt-14"
      data-ui="te-story-section"
    >
      {label && (
        <p
          className="font-semibold text-[12px] leading-[18px] font-sans uppercase tracking-[.02em] text-blue"
          data-ui="label"
        >
          {label}
        </p>
      )}
      <h2
        className="font-semibold text-[30px] leading-[35px] font-editorial lg:text-[40px] lg:leading-[46px] lg:font-semibold"
        data-ui="section-title"
      >
        {title}
      </h2>
      <div
        className="max-w-[66ch] font-normal text-[18px] leading-[28px] font-editorial mt-6 [&_p+p]:mt-6 lg:text-[20px] lg:leading-[31px]"
        data-ui="te-reading"
      >
        {children}
      </div>
    </section>
  );
}
function TECatalogueCard({
  record,
  edition,
  feature = false,
}: {
  record: ActivityFixture;
  edition: { label: string; title: string; year?: string };
  feature?: boolean;
}) {
  const href = `#/expedition/te${edition.label}`;
  return (
    <li className={`min-w-0 bg-page ${feature ? "lg:col-span-3" : ""}`} data-ui={`te-showcase-card${feature ? " feature" : ""}`}>
      <a
        className={`group flex h-full flex-col text-inherit no-underline transition-colors duration-150 hover:bg-surface-muted focus-visible:outline-3 focus-visible:outline-offset-[-3px] focus-visible:outline-focus ${feature ? "p-3 sm:p-4 lg:grid lg:grid-cols-12 lg:gap-10 lg:p-6" : "p-3 sm:p-4"}`}
        href={href}
        aria-label={`Buka Tursina Explore ${edition.label}: ${edition.title}`}
      >
        <div className={feature ? "lg:col-span-7" : ""}>
          <DocumentaryMedia
            role="expedition"
            recordId={record.id}
            placement="te-catalogue-feature"
            eager={feature}
            fallbackTitle={`Tursina Explore #${edition.label}`}
            fallback="Visual sementara belum tersedia."
            frame="landscape"
            compact
          />
        </div>
        <div className={`flex flex-1 flex-col px-1 pb-2 ${feature ? "pt-6 sm:px-3 lg:col-span-5 lg:justify-center lg:pt-0" : "pt-5"}`}>
          <div className="flex items-baseline justify-between gap-4 border-b border-border pb-3">
            <p className="font-sans text-[12px]/[18px] font-semibold tracking-[.04em] text-blue uppercase" data-ui="te-edition-identity">
              Tursina Explore #{edition.label}
            </p>
            <span className="font-editorial text-[17px]/[22px] font-semibold text-primary" data-ui="te-edition-year" aria-label={edition.year ?? "Tahun belum tercatat"}>
              {edition.year ?? "—"}
            </span>
          </div>
          <h2 className={`mt-5 font-editorial font-semibold ${feature ? "text-[38px]/[42px] lg:text-[50px]/[54px]" : "text-[28px]/[34px]"}`} data-ui="te-edition-title">
            {edition.title}
          </h2>
          <p className={`mt-5 ${feature ? "text-[18px]/[27px]" : "text-[16px]/[24px]"}`}>
            {record.summary}
          </p>
          <span className="mt-auto flex min-h-11 items-center gap-2 pt-6 font-sans text-[15px]/[22px] font-semibold text-muted transition-colors duration-150 group-hover:text-blue">
            Lihat perjalanan
            <span className="transition-transform duration-150 group-hover:translate-x-1" aria-hidden="true">→</span>
          </span>
        </div>
      </a>
    </li>
  );
}
export function TECatalogue() {
  const { registry, view } = useContentReadModel();
  const { expeditionRecords } = view;
  const editions = registry.editions
    .filter((edition) => edition.programmeId === "te")
    .sort((a, b) => {
      const left = Number(a.label);
      const right = Number(b.label);
      if (Number.isFinite(left) && Number.isFinite(right)) return right - left;
      if (Number.isFinite(left)) return -1;
      if (Number.isFinite(right)) return 1;
      return a.label.localeCompare(b.label);
    });
  const recordByEdition = new Map(
    expeditionRecords.map((record) => [record.edition, record]),
  );
  return (
    <div className="wrap-break-word" data-ui="te-experience te-catalogue">
      <header
        className="mx-auto w-[calc(100%_-_32px)] max-w-institution pt-4 pb-12 md:w-[calc(100%_-_48px)] lg:pt-6 lg:pb-16"
        data-ui="container te-programme-head"
      >
        <p
          className="font-sans text-[12px]/[18px] font-semibold tracking-[.02em] text-blue uppercase"
          data-ui="label"
        >
          Program ekspedisi
        </p>
        <h1
          className="mt-3 font-editorial text-[42px]/[44px] font-semibold tracking-[-0.02em] max-[360px]:text-[38px]/[40px] lg:text-[64px]/[66px]"
          data-ui="display"
        >
          Tursina Explore
        </h1>
        <p
          className="mt-6 max-w-[68ch] text-[18px]/[27px] lg:text-[21px]/[31px]"
          data-ui="intro"
        >
          Ekspedisi MAPALA Tursina yang mempertemukan perjalanan alam bebas,
          lingkungan hidup, dan pengalaman sosial budaya dalam edisi yang
          terus bertambah.
        </p>
      </header>
      <section
        className="bg-surface-muted py-12 lg:py-18"
        data-ui="section te-edition-archive"
      >
        <div
          className="mx-auto w-[calc(100%_-_32px)] max-w-institution md:w-[calc(100%_-_48px)]"
          data-ui="container"
        >
          <div className="mb-6 border-b border-primary/25 pb-5 lg:mb-7">
            <div>
              <p className="font-sans text-[12px]/[18px] font-semibold tracking-[.04em] text-blue uppercase">Tiga belas perjalanan</p>
              <h2 className="mt-3 font-editorial text-[32px]/[37px] font-semibold lg:text-[44px]/[49px]">Setiap edisi memiliki ceritanya sendiri.</h2>
            </div>
          </div>
          <ol className="grid list-none gap-px border-b border-primary/20 bg-primary/20 p-0 md:grid-cols-2 lg:grid-cols-3" data-ui="te-showcase-grid">
            {editions.map((edition, index) => {
              const record = recordByEdition.get(edition.label);
              return record ? <TECatalogueCard key={edition.id} record={record} edition={edition} feature={index === 0} /> : null;
            })}
          </ol>
          <p className="mt-6 max-w-[72ch] text-[14px]/[21px] text-muted">
            Visual berlabel “Visual prototipe” merupakan gambar sementara untuk menilai susunan halaman dan akan diganti ketika dokumentasi edisi telah dipilih dan disetujui.
          </p>
        </div>
      </section>
    </div>
  );
}

function ExpeditionRelatedWorks({ id }: { id: string }) {
  const { registry } = useContentReadModel();
  const works = visibleRelations(registry, id)
    .filter(({ record }) => registry.works.some((work) => work.id === record.id))
    .slice(0, 3);
  if (!works.length) return null;
  return (
    <section className="border-t border-primary/25 pt-10 lg:pt-14" id={`${id}-works`} tabIndex={-1} data-related-records={id} data-ui="section te-related">
      <p className="font-sans text-[12px]/[18px] font-semibold tracking-[.04em] text-blue uppercase">Arsip yang terhubung</p>
      <h2 className="mt-3 max-w-[18ch] font-editorial text-[32px]/[37px] font-semibold lg:text-[42px]/[47px]">Karya terkait</h2>
      <ul className="mt-7 grid list-none gap-px bg-primary/20 p-0 md:grid-cols-3">
        {works.map(({ edge, record, href }) => (
          <li className="bg-page" key={edge.id}>
            <a className="group flex h-full min-h-40 flex-col p-5 text-inherit no-underline transition-colors duration-150 hover:bg-surface-muted focus-visible:outline-3 focus-visible:outline-offset-[-3px] focus-visible:outline-focus lg:p-6" href={href}>
              <h3 className="font-editorial text-[22px]/[28px] font-semibold">{record.title}</h3>
              <p className="mt-3 font-sans text-[13px]/[19px] text-muted"><RecordDate id={record.id} /></p>
              {"availability" in record && <p className="mt-auto pt-5 font-sans text-[13px]/[19px] text-muted">{workDiscovery(record).cue}</p>}
              <span className="mt-4 font-sans text-[14px]/[20px] font-semibold text-primary">Buka catatan <span className="inline-block transition-transform duration-150 group-hover:translate-x-1" aria-hidden="true">→</span></span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function ExpeditionDetail({ id }: { id: string }) {
  const { registry, view } = useContentReadModel();
  const record = view.expeditionRecords.find((activity) => activity.id === id);
  if (!record) {
    const edition = registry.editions.find((candidate) => candidate.programmeId === "te" && `te${candidate.label}` === id.toLowerCase());
    return <UnavailableExpedition edition={edition} />;
  }
  const narrative = registry.activities.find((activity) => activity.id === id && activity.publication.website === "preview")?.narrative;
  if (!narrative) return <SparseExpedition record={record} />;
  const editions = registry.editions.filter((item) => item.programmeId === "te").sort((a, b) => Number(a.label) - Number(b.label));
  const editionIndex = editions.findIndex((item) => item.label === record.edition);
  const edition = editions[editionIndex];
  const previous = editionIndex > 0 ? editions[editionIndex - 1] : undefined;
  const next = editionIndex >= 0 && editionIndex < editions.length - 1 ? editions[editionIndex + 1] : undefined;
  const fieldNote = narrative.notes[0];
  const closingNote = narrative.notes[1];
  return (
    <article className="wrap-break-word" data-ui="te-experience te-article">
      <header className="mx-auto w-[calc(100%_-_32px)] max-w-institution pt-8 pb-9 md:w-[calc(100%_-_48px)] lg:pt-14 lg:pb-12" data-ui="container te-record-head">
        <p className="font-sans text-[12px]/[18px] font-semibold tracking-[.04em] text-blue uppercase" data-ui="label">Tursina Explore #{record.edition}{edition?.year ? ` · ${edition.year}` : ""}</p>
        <h1 className="mt-4 max-w-[13ch] font-editorial text-[48px]/[49px] font-semibold tracking-[-0.025em] max-[360px]:text-[42px]/[44px] lg:text-[76px]/[77px]" data-ui="display">{narrative.displayTitle}</h1>
        <p className="mt-6 max-w-[43em] text-[19px]/[29px] lg:text-[23px]/[34px]" data-ui="te-record-deck intro">{narrative.deck}</p>
        <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 border-t border-primary/25 pt-4 font-sans text-[14px]/[21px] text-muted" data-ui="te-article-meta">
          <p><RecordDate id={record.id} fallback={record.date} /></p>
          {record.location && <p>{record.location}</p>}
        </div>
      </header>

      <div className="mx-auto w-[calc(100%_-_32px)] max-w-280 md:w-[calc(100%_-_48px)]" data-ui="container te-opening-media">
        <DocumentaryMedia role="expedition" recordId={record.id} placement="expedition-lead" eager fallbackTitle="Dokumentasi ekspedisi" fallback="Foto tim dan perjalanan telah ditinjau secara privat. Ringkasan perjalanan tetap dapat dibaca sambil menunggu izin gambar." frame="landscape" />
        {narrative.precisionNote && <p className="mt-3 max-w-[76ch] font-sans text-[12px]/[18px] text-muted" data-ui="te-precision-note">{narrative.precisionNote}</p>}
      </div>

      <div className="mx-auto w-[calc(100%_-_32px)] max-w-225 py-14 md:w-[calc(100%_-_48px)] lg:py-22" data-ui="container te-story-content">
        <StorySection label="Tentang ekspedisi" title={narrative.context.title}>
          {narrative.context.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </StorySection>

        {!!narrative.facts?.length && (
          <dl className="mt-10 grid border-y border-primary/25 md:grid-cols-3" data-ui="te-expedition-facts">
            {narrative.facts.map((fact) => (
              <div className="border-b border-border py-5 last:border-b-0 md:border-r md:border-b-0 md:px-6 md:first:pl-0 md:last:border-r-0 md:last:pr-0" key={fact.label}>
                <dt className="font-sans text-[11px]/[17px] font-semibold tracking-[.04em] text-blue uppercase">{fact.label}</dt>
                <dd className="mt-2 font-editorial text-[21px]/[27px] font-semibold">{fact.value}</dd>
              </div>
            ))}
          </dl>
        )}

        <section className="mt-14 scroll-mt-6 lg:mt-22" id={`${record.id}-journey`} tabIndex={-1} data-ui="te-story-section">
          <p className="font-sans text-[12px]/[18px] font-semibold tracking-[.04em] text-blue uppercase">Perjalanan</p>
          <h2 className="mt-3 max-w-[18ch] font-editorial text-[34px]/[39px] font-semibold lg:text-[46px]/[51px]">{narrative.journeyTitle}</h2>
          <ol className="mt-9 ml-3 list-none border-l border-primary/30 p-0" data-ui="te-journey">
            {narrative.journey.map((leg, index) => (
              <li className="relative pb-10 pl-8 last:pb-0 lg:pb-14 lg:pl-11" key={leg.title}>
                <span className="absolute top-0 -left-[17px] flex size-8 items-center justify-center rounded-full border border-primary/40 bg-page font-sans text-[11px]/[16px] font-semibold text-blue" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <p className="font-sans text-[13px]/[20px] text-muted"><RecordDate claim={leg.dates} /></p>
                <h3 className="mt-2 font-editorial text-[27px]/[32px] font-semibold lg:text-[34px]/[39px]">{leg.title}</h3>
                <p className="mt-4 max-w-[62ch] text-[17px]/[27px] lg:text-[19px]/[30px]" data-ui="body">{leg.body}</p>
              </li>
            ))}
          </ol>
        </section>

        {fieldNote && <div className="mt-14 border-t border-primary/25 pt-10 lg:mt-22 lg:pt-14" id={`${record.id}-notes`} tabIndex={-1}>
          <StorySection label="Catatan lapangan" title={fieldNote.title}>{fieldNote.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</StorySection>
        </div>}

        <div className="mt-10 lg:mt-14"><DocumentaryMedia role="expedition-ecology" recordId={record.id} placement="expedition-ecology" omitWhenUnavailable fallbackTitle="Detail vegetasi" fallback="Dokumentasi vegetasi tersedia dalam arsip privat." frame="landscape" /></div>

        {closingNote && <div className="mt-12 lg:mt-18">
          <StorySection label={`Yang tersisa dari TE${record.edition}`} title={closingNote.title}>{closingNote.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</StorySection>
        </div>}

        <ExpeditionRelatedWorks id={record.id} />

        <section className="mt-12 scroll-mt-6 lg:mt-18" id={`${record.id}-sources`} tabIndex={-1} data-ui="te-source-section">
          <EvidenceDisclosure summary="Catatan sumber">
            {narrative.sourceNotes.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {narrative.evidence.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            <DateEvidence id={record.id} />
          </EvidenceDisclosure>
        </section>
      </div>

      <nav className="mx-auto w-[calc(100%_-_32px)] max-w-institution pb-14 md:w-[calc(100%_-_48px)] lg:pb-22" aria-label="Navigasi edisi Tursina Explore" data-ui="te-edition-navigation">
        <div className="grid gap-px border-y border-primary/25 bg-primary/20 sm:grid-cols-3">
          {previous ? <a className="group min-h-24 bg-page p-5 text-inherit no-underline transition-colors hover:bg-surface-muted focus-visible:outline-3 focus-visible:outline-offset-[-3px] focus-visible:outline-focus" href={`#/expedition/te${previous.label}`}><span className="font-sans text-[11px]/[17px] font-semibold tracking-[.04em] text-muted uppercase">← Edisi sebelumnya</span><strong className="mt-2 block font-editorial text-[19px]/[25px]">TE{previous.label} · {previous.title}</strong></a> : <span className="hidden bg-page sm:block" />}
          <a className="flex min-h-24 items-center justify-center bg-page p-5 font-sans text-[14px]/[20px] font-semibold text-primary no-underline transition-colors hover:bg-surface-muted focus-visible:outline-3 focus-visible:outline-offset-[-3px] focus-visible:outline-focus" href="#/program/te">Semua edisi</a>
          {next ? <a className="group min-h-24 bg-page p-5 text-right text-inherit no-underline transition-colors hover:bg-surface-muted focus-visible:outline-3 focus-visible:outline-offset-[-3px] focus-visible:outline-focus" href={`#/expedition/te${next.label}`}><span className="font-sans text-[11px]/[17px] font-semibold tracking-[.04em] text-muted uppercase">Edisi berikutnya →</span><strong className="mt-2 block font-editorial text-[19px]/[25px]">TE{next.label} · {next.title}</strong></a> : <span className="hidden bg-page sm:block" />}
        </div>
      </nav>
    </article>
  );
}
function UnavailableExpedition({
  edition,
}: {
  edition?: { label: string; title: string; year?: string };
}) {
  const title = edition?.title ?? "Catatan belum tersedia";
  return (
    <article className="wrap-break-word" data-ui="te-experience te-unavailable">
      <header
        className="mx-auto w-[calc(100%_-_32px)] max-w-institution pt-4 pb-12 md:w-[calc(100%_-_48px)] lg:pt-6 lg:pb-16"
        data-ui="container te-record-head"
      >
        <p
          className="font-sans text-[12px]/[18px] font-semibold tracking-[.02em] text-blue uppercase"
          data-ui="label"
        >
          {edition ? `Tursina Explore / edisi ${edition.label}` : "Tursina Explore"}
        </p>
        <h1
          className="mt-3 max-w-[18ch] font-editorial text-[42px]/[44px] font-semibold tracking-[-0.02em] max-[360px]:text-[38px]/[40px] lg:text-[64px]/[66px]"
          data-ui="display"
        >
          {title}
        </h1>
        <p
          className="mt-6 max-w-[60ch] text-[18px]/[27px] lg:text-[21px]/[31px]"
          data-ui="intro"
        >
          Identitas edisi ini tercatat dalam rangkaian Tursina Explore. Tempat,
          tanggal, perjalanan, dan hasilnya belum tersedia sebagai catatan
          publik yang dapat ditampilkan.
        </p>
        <p className="mt-6 border-y border-border py-4 font-sans text-[15px]/[22px] font-semibold text-muted">
          Catatan belum tersedia
        </p>
        <div className="mt-6">
          <TextLink href="#/program/te" variant="quiet">
            Kembali ke arsip Tursina Explore
          </TextLink>
        </div>
      </header>
    </article>
  );
}
function SparseExpedition({ record }: { record: ActivityFixture }) {
  return (
    <article className="wrap-break-word" data-ui="te-experience">
      <header
        className="w-[calc(100%_-_32px)] max-w-institution mx-auto md:w-[calc(100%_-_48px)] pt-4 pb-10 [&>[data-ui~=display]]:mt-3 [&_[data-ui~=metadata-inline]]:mt-6 [&>p[data-ui~=metadata]]:mt-2 lg:pt-6 lg:pb-14"
        data-ui="container te-record-head"
      >
        <p
          className="font-semibold text-[12px] leading-[18px] font-sans uppercase tracking-[.02em] text-blue"
          data-ui="label"
        >
          Tursina Explore / edisi {record.edition}
        </p>
        <h1
          className="font-semibold text-[36px] leading-[38.9px] font-editorial max-[360px]:text-[32px] max-[360px]:leading-[34.6px] lg:text-[56px] lg:leading-[60.5px] lg:[&>span]:block"
          data-ui="display"
        >
          {record.title}
        </h1>
        <p
          className="mt-6 max-w-[46em] text-[17px] leading-[25px] lg:text-[20px] lg:leading-[29px]"
          data-ui="te-record-deck intro"
        >
          {record.summary}
        </p>
        <ActivityMetadata activity={record} inline />
        <p className="text-[16px] leading-[23px] text-muted" data-ui="metadata">
          {record.location}
        </p>
      </header>
      <div
        className="mx-auto w-[calc(100%_-_32px)] max-w-225 pb-10 md:w-[calc(100%_-_48px)] [&_[data-ui~=media]]:mx-auto [&_[data-ui~=media]]:max-w-240 lg:pb-14"
        data-ui="container te-opening-media"
      >
        <DocumentaryMedia
          role="expedition"
          recordId={record.id}
          placement="expedition-lead"
          eager
          fallbackTitle={`Tursina Explore #${record.edition}`}
          fallback="Visual edisi belum tersedia."
          omitWhenUnavailable
          frame="landscape"
        />
      </div>
      <div
        className="w-[calc(100%_-_32px)] mx-auto md:w-[calc(100%_-_48px)] max-w-225 pb-14 [&>[data-ui~=link]]:mt-8 lg:pb-22"
        data-ui="container te-sparse-body"
      >
        <StorySection title="Catatan dasar dari arsip.">
          <p>
            Halaman ini mempertahankan identitas edisi, rentang pelaksanaan,
            lokasi, dan tujuan yang tercatat. Narasi perjalanan, dokumentasi
            terpilih, hasil, dan karya belum ditambahkan sebelum sumbernya
            memadai.
          </p>
        </StorySection>
        <div className="mt-8 border-t-2 border-primary pt-4" data-ui="te-source-boundary">
          <h2 className="font-editorial text-[24px]/[30px] font-semibold">
            Batas catatan
          </h2>
          <DateEvidence id={record.id} />
          <p className="mt-3 text-[16px]/[24px] text-muted">
            Dasar catatan: {record.evidenceLabel}. Keterbatasan isi di sini
            bukan bukti tidak ada kegiatan atau karya.
          </p>
        </div>
        <TextLink href="#/program/te" variant="quiet">
          Kembali ke semua edisi Tursina Explore
        </TextLink>
      </div>
      <RelatedRecords id={record.id} />
    </article>
  );
}
