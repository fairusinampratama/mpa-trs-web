import { useContentReadModel } from "./ContentReadModel";
import {
  RelatedRecords,
  DateEvidence,
  RecordDate,
} from "./components/RecordContext";
import { type ReactNode } from "react";
import type { ActivityFixture } from "./components/ActivityCard";
import { canonicalRegistry } from "./domain/index.ts";
import {
  ActivityMetadata,
  Breadcrumbs,
  DocumentaryMedia,
  SectionHeading,
  TextLink,
} from "./components/Foundation";
// Historical export retained for compatibility; story content is authored only in domain/.
export const te11Journey = canonicalRegistry.activities.find(
  (a) => a.id === "te11",
)!.narrative!.journey;
function EditionBreadcrumbs({ current }: { current?: string }) {
  return (
    <Breadcrumbs
      items={[
        {
          label: "Beranda",
          href: "#/",
        },
        current
          ? {
              label: "Tursina Explore",
              href: "#/program/te",
            }
          : {
              label: "Tursina Explore",
            },
        ...(current
          ? [
              {
                label: current,
              },
            ]
          : []),
      ]}
    />
  );
}
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
  const numberedEditions = editions.filter((edition) =>
    Number.isFinite(Number(edition.label)),
  );
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
        <dl
          className="mt-8 grid grid-cols-2 border-y border-border sm:grid-cols-3 sm:divide-x sm:divide-border"
          data-ui="te-archive-facts"
        >
          <div className="py-3 sm:px-5 sm:first:pl-0">
            <dt className="font-sans text-[12px]/[18px] font-semibold tracking-[.04em] text-muted uppercase">
              Rangkaian
            </dt>
            <dd className="mt-1 font-editorial text-[22px]/[28px] font-semibold">
              {editions.length} edisi
            </dd>
          </div>
          <div className="py-3 sm:px-5">
            <dt className="font-sans text-[12px]/[18px] font-semibold tracking-[.04em] text-muted uppercase">
              Catatan publik
            </dt>
            <dd className="mt-1 font-editorial text-[22px]/[28px] font-semibold">
              {expeditionRecords.length} tersedia
            </dd>
          </div>
          <div className="col-span-2 border-t border-border py-3 sm:col-span-1 sm:border-t-0 sm:px-5 sm:last:pr-0">
            <dt className="font-sans text-[12px]/[18px] font-semibold tracking-[.04em] text-muted uppercase">
              Urutan arsip
            </dt>
            <dd className="mt-1 font-editorial text-[22px]/[28px] font-semibold">
              TE{numberedEditions[0]?.label}–TE{numberedEditions.at(-1)?.label}
            </dd>
          </div>
        </dl>
      </header>
      <section
        className="bg-surface-muted py-12 lg:py-18"
        data-ui="section te-edition-archive"
      >
        <div
          className="mx-auto w-[calc(100%_-_32px)] max-w-institution md:w-[calc(100%_-_48px)]"
          data-ui="container"
        >
          <SectionHeading
            label="Arsip per edisi"
            title={`${editions.length} edisi, satu rangkaian perjalanan.`}
            description="Catatan dibuka sesuai dokumentasi yang tersedia. Edisi tanpa catatan publik tetap ditampilkan tanpa mengarang tempat, tanggal, atau hasil."
          />
          <ol className="list-none border-t border-border p-0" data-ui="te-edition-list">
            {editions.map((edition) => {
              const record = recordByEdition.get(edition.label);
              const availability = record
                ? record.depth === "rich"
                  ? "Catatan lengkap"
                  : "Catatan ringkas"
                : "Catatan belum tersedia";
              const content = (
                <>
                  <div className="flex items-baseline gap-2 lg:block">
                    <span className="font-sans text-[12px]/[18px] font-semibold tracking-[.04em] text-muted uppercase">
                      Edisi
                    </span>
                    <strong className="font-editorial text-[30px]/[34px] font-semibold text-primary lg:text-[36px]/[40px]">
                      {edition.label.padStart(2, "0")}
                    </strong>
                  </div>
                  <div className="min-w-0">
                    <h2 className="font-editorial text-[24px]/[30px] font-semibold lg:text-[28px]/[34px]">
                      {record ? record.title : `Tursina Explore #${edition.label}`}
                    </h2>
                    {record ? (
                      <p className="mt-2 text-[15px]/[22px] text-muted lg:text-[16px]/[23px]">
                        {[record.date, record.location].filter(Boolean).join(" · ")}
                      </p>
                    ) : (
                      <p className="mt-2 text-[15px]/[22px] text-muted">
                        Identitas edisi tercatat; rincian publik belum tersedia.
                      </p>
                    )}
                  </div>
                  <div className="flex min-h-11 items-center justify-between gap-3 lg:justify-end">
                    <span className={`font-sans text-[14px]/[20px] font-semibold ${record ? "text-primary" : "text-muted"}`}>
                      {availability}
                    </span>
                    {record && (
                      <span
                        className="transition-transform duration-150 group-hover:translate-x-1"
                        aria-hidden="true"
                      >
                        →
                      </span>
                    )}
                  </div>
                </>
              );
              return (
                <li className="border-b border-border" key={edition.id} data-ui="te-edition-row">
                  {record ? (
                    <a
                      className="group grid gap-3 bg-transparent px-3 py-5 text-inherit no-underline transition-[background-color,transform] duration-150 hover:bg-page active:translate-y-px focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-focus lg:grid-cols-[92px_minmax(0,1fr)_190px] lg:items-center lg:gap-8 lg:px-4 lg:py-6"
                      href={record.href}
                      data-ui="te-edition-link"
                    >
                      {content}
                    </a>
                  ) : (
                    <div
                      className="grid gap-3 px-3 py-5 lg:grid-cols-[92px_minmax(0,1fr)_190px] lg:items-center lg:gap-8 lg:px-4 lg:py-6"
                      data-ui="te-edition-unavailable"
                    >
                      {content}
                    </div>
                  )}
                </li>
              );
            })}
          </ol>
          <p className="mt-6 max-w-[68ch] text-[15px]/[23px] text-muted">
            Jumlah edisi mengikuti konfirmasi pemilik. Kedalaman setiap halaman
            mengikuti arsip yang telah diperiksa dan aman ditampilkan.
          </p>
        </div>
      </section>
    </div>
  );
}

export function ExpeditionDetail({ id }: { id: string }) {
  const { registry, view } = useContentReadModel();
  const record = view.expeditionRecords.find((a) => a.id === id);
  if (!record) {
    const edition = registry.editions.find(
      (candidate) =>
        candidate.programmeId === "te" &&
        `te${candidate.label}` === id.toLowerCase(),
    );
    return <UnavailableExpedition edition={edition?.label} />;
  }
  const narrative = registry.activities.find(
    (a) => a.id === id && a.publication.website === "preview",
  )?.narrative;
  if (!narrative) return <SparseExpedition record={record} />;
  return (
    <article className="wrap-break-word" data-ui="te-experience">
      <header
        className="w-[calc(100%_-_32px)] max-w-institution mx-auto md:w-[calc(100%_-_48px)] pt-4 pb-10 [&>[data-ui~=display]]:mt-3 [&_[data-ui~=metadata-inline]]:mt-6 [&>p[data-ui~=metadata]]:mt-2 lg:pt-6 lg:pb-14"
        data-ui="container te-record-head"
      >
        <EditionBreadcrumbs
          current={`TE${record.edition} / ${narrative.displayTitle}`}
        />
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
          {narrative.displayTitle}
        </h1>
        <p
          className="mt-6 max-w-[46em] text-[17px] leading-[25px] lg:text-[20px] lg:leading-[29px]"
          data-ui="te-record-deck intro"
        >
          {narrative.deck}
        </p>
        <ActivityMetadata activity={record} inline />
        <p className="text-[16px] leading-[23px] text-muted" data-ui="metadata">
          {record.location}
        </p>
        <p
          className="mt-4 max-w-[66ch] text-muted font-normal text-[14px] leading-[20px] font-sans"
          data-ui="te-precision-note"
        >
          {narrative.precisionNote}
        </p>
      </header>
      <div
        className="w-[calc(100%_-_32px)] max-w-institution mx-auto md:w-[calc(100%_-_48px)] pb-10 [&_[data-ui~=media]]:max-w-240 [&_[data-ui~=media]]:mx-auto [&_[data-ui~=media-fallback]]:py-4 [&_[data-ui~=media-fallback]>[data-ui~=content-title]]:font-semibold [&_[data-ui~=media-fallback]>[data-ui~=content-title]]:text-[23px] [&_[data-ui~=media-fallback]>[data-ui~=content-title]]:leading-[29px] [&_[data-ui~=media-fallback]>[data-ui~=content-title]]:font-sans [&_[data-ui~=media-fallback]>p]:max-w-[66ch]"
        data-ui="container te-opening-media"
      >
        <DocumentaryMedia
          role="expedition"
          recordId={record.id}
          placement="expedition-lead"
          eager
          fallbackTitle="Dokumentasi ekspedisi"
          fallback="Foto tim dan perjalanan telah ditinjau secara privat. Ringkasan perjalanan tetap dapat dibaca sambil menunggu izin gambar."
        />
      </div>
      <div
        className="w-[calc(100%_-_32px)] max-w-institution mx-auto md:w-[calc(100%_-_48px)] grid gap-10 pb-14 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-18 lg:pt-4 lg:pb-22"
        data-ui="container te-story-layout"
      >
        <aside
          className="border-t-2 border-t-primary pt-4 self-start [&_nav]:mt-3 [&_nav]:grid md:[&_nav]:grid-cols-[1fr_1fr] md:[&_nav]:gap-x-6 lg:sticky lg:top-6 lg:[&_nav]:grid lg:[&_nav]:grid-cols-[1fr]"
          data-ui="te-story-index"
        >
          <p
            className="font-semibold text-[12px] leading-[18px] font-sans uppercase tracking-[.02em] text-blue"
            data-ui="label"
          >
            Dalam catatan ini
          </p>
          <nav aria-label={`Bagian catatan TE${record.edition}`}>
            {[
              [`${record.id}-context`, "Konteks ekspedisi"],
              [`${record.id}-journey`, "Rangkaian perjalanan"],
              [`${record.id}-notes`, "Dokumentasi & pelajaran"],
              [`${record.id}-works`, "Karya terkait"],
              [`${record.id}-sources`, "Sumber & ketidakpastian"],
            ].map(([target, label]) => (
              <button
                className="group flex min-h-11 w-full items-center justify-between gap-4 border-0 border-b border-border bg-transparent px-2 py-2 text-left font-sans text-[16px]/[23px] font-semibold text-primary transition-colors duration-150 hover:bg-surface-muted active:bg-leaf focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-focus"
                type="button"
                key={target}
                onClick={() => {
                  const section = document.getElementById(target);
                  section?.scrollIntoView({
                    block: "start",
                  });
                  section?.focus({
                    preventScroll: true,
                  });
                }}
                data-ui="link"
              >
                {label}
                <span
                  className="shrink-0 transition-transform duration-150 group-hover:translate-y-0.5"
                  aria-hidden="true"
                >
                  ↓
                </span>
              </button>
            ))}
          </nav>
        </aside>
        <div
          className="min-w-0 [&>div+section]:mt-10 [&>section+div]:mt-10 [&>div+div]:mt-10 [&>[data-ui~=media]+div]:mt-10 [&>[data-ui~=media]]:mt-10 [&_[id]]:scroll-mt-6 lg:[&>div+section]:mt-14 lg:[&>section+div]:mt-14 lg:[&>div+div]:mt-14 lg:[&>[data-ui~=media]+div]:mt-14 lg:[&>[data-ui~=media]]:mt-14"
          data-ui="te-story-content"
        >
          <div id={`${record.id}-context`} tabIndex={-1}>
            <StorySection
              label="Konteks ekspedisi"
              title={narrative.context.title}
            >
              {narrative.context.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </StorySection>
          </div>
          <section
            className="[&+[data-ui~=te-story-section]]:mt-10 [&>[data-ui~=label]]:mb-3 [&_[data-ui~=section-heading]]:mb-6 lg:[&+[data-ui~=te-story-section]]:mt-14"
            id={`${record.id}-journey`}
            tabIndex={-1}
            data-ui="te-story-section"
          >
            <SectionHeading
              label="Rangkaian perjalanan / dilaporkan"
              title={narrative.journeyTitle}
            />
            <ol
              className="list-none p-0 mt-6 [&_li]:grid [&_li]:grid-cols-[24px_minmax(0,1fr)] [&_li]:gap-4 [&_li]:border-t [&_li]:border-t-border [&_li]:py-6 [&_h3]:mt-2 [&_[data-ui~=body]]:mt-3 lg:[&_li]:py-8"
              data-ui="te-journey"
            >
              {narrative.journey.map((leg, i) => (
                <li key={leg.title}>
                  <span
                    className="font-semibold text-[12px] leading-[18px] font-sans uppercase tracking-[.02em] text-blue pt-1"
                    aria-hidden="true"
                    data-ui="label te-leg-index"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p
                      className="text-[16px] leading-[23px] text-muted"
                      data-ui="metadata"
                    >
                      <RecordDate claim={leg.dates} />
                    </p>
                    <h3
                      className="font-semibold text-[26px] leading-[32px] font-editorial [&_a:hover]:underline [&_a:hover]:underline-offset-4 [&_a]:block [&_a]:min-h-11 [&_a]:text-inherit lg:text-[30px] lg:leading-[36px] lg:font-semibold"
                      data-ui="content-title"
                    >
                      {leg.title}
                    </h3>
                    <p
                      className="text-[17px] leading-[25px] lg:text-[19px] lg:leading-[28px]"
                      data-ui="body"
                    >
                      {leg.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
          <DocumentaryMedia
            role="expedition-trail"
            omitWhenUnavailable
            fallbackTitle="Jalur hutan"
            fallback="Dokumentasi jalur tersedia dalam arsip privat."
          />
          <div id={`${record.id}-notes`} tabIndex={-1}>
            {narrative.notes.map((note, i) => (
              <StorySection
                key={note.title}
                label={i === 0 ? "Dokumentasi & pelajaran" : undefined}
                title={note.title}
              >
                {note.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </StorySection>
            ))}
          </div>
          <DocumentaryMedia
            role="expedition-ecology"
            recordId={record.id}
            placement="expedition-ecology"
            omitWhenUnavailable
            fallbackTitle="Detail vegetasi"
            fallback="Dokumentasi vegetasi tersedia dalam arsip privat."
          />
        </div>
      </div>
      <RelatedRecords id={record.id} />
      <section
        className="w-[calc(100%_-_32px)] max-w-institution mx-auto md:w-[calc(100%_-_48px)] pb-14 lg:pb-22 [&>[data-ui~=link]]:mt-8 [&>[data-ui~=link]]:max-w-[40em] scroll-mt-6"
        id={`${record.id}-sources`}
        tabIndex={-1}
        data-ui="container section te-source-section"
      >
        <SectionHeading
          label="Dasar catatan"
          title="Yang diketahui, dan yang masih terbuka."
        />
        <div
          className="grid gap-8 [&_[data-ui~=body]]:mt-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-18"
          data-ui="te-source-grid"
        >
          <div>
            <h3
              className="font-semibold text-[26px] leading-[32px] font-editorial [&_a:hover]:underline [&_a:hover]:underline-offset-4 [&_a]:block [&_a]:min-h-11 [&_a]:text-inherit lg:text-[30px] lg:leading-[36px] lg:font-semibold"
              data-ui="content-title"
            >
              Ketepatan tanggal dan wilayah
            </h3>
            {narrative.sourceNotes.map((p) => (
              <p
                className="text-[17px] leading-[25px] lg:text-[19px] lg:leading-[28px]"
                key={p}
                data-ui="body"
              >
                {p}
              </p>
            ))}
          </div>
          <div className="border-t-2 border-primary pt-4" data-ui="te-source-boundary">
            <h3
              className="font-editorial text-[26px]/[32px] font-semibold lg:text-[30px]/[36px]"
              data-ui="content-title"
            >
              Batas catatan
            </h3>
            {narrative.evidence.map((p) => (
              <p
                className="mt-4 text-[17px]/[25px] lg:text-[19px]/[28px]"
                key={p}
              >
                {p}
              </p>
            ))}
            <DateEvidence id={record.id} />
          </div>
        </div>
        <TextLink href="#/program/te" variant="quiet">
          Kembali ke semua edisi Tursina Explore
        </TextLink>
      </section>
    </article>
  );
}
function UnavailableExpedition({ edition }: { edition?: string }) {
  const title = edition ? `Tursina Explore #${edition}` : "Catatan belum tersedia";
  return (
    <article className="wrap-break-word" data-ui="te-experience te-unavailable">
      <header
        className="mx-auto w-[calc(100%_-_32px)] max-w-institution pt-4 pb-12 md:w-[calc(100%_-_48px)] lg:pt-6 lg:pb-16"
        data-ui="container te-record-head"
      >
        <EditionBreadcrumbs current={edition ? `TE${edition}` : "Catatan"} />
        <p
          className="font-sans text-[12px]/[18px] font-semibold tracking-[.02em] text-blue uppercase"
          data-ui="label"
        >
          {edition ? `Tursina Explore / edisi ${edition}` : "Tursina Explore"}
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
        <EditionBreadcrumbs current={`TE${record.edition} / ${record.title}`} />
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
