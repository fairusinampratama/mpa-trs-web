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
  ActionLink,
  ActivityMetadata,
  ActivityPreview,
  Breadcrumbs,
  DocumentaryMedia,
  EvidenceDisclosure,
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
  const { view } = useContentReadModel();
  const { expeditionRecords, publicWorks } = view;
  const te11 = expeditionRecords.find((r) => r.id === "te11");
  const article = publicWorks.find((w) => w.id === "sacred-gatekeeper");
  return (
    <div className="wrap-break-word" data-ui="te-experience">
      <header
        className="w-[calc(100%_-_32px)] max-w-institution mx-auto md:w-[calc(100%_-_48px)] pt-4 pb-10 [&>[data-ui~=display]]:mt-3 lg:pt-6 lg:pb-14"
        data-ui="container te-programme-head"
      >
        <EditionBreadcrumbs />
        <p
          className="font-semibold text-[12px] leading-[18px] font-sans uppercase tracking-[.02em] text-blue"
          data-ui="label"
        >
          Program / ekspedisi
        </p>
        <h1
          className="font-semibold text-[36px] leading-[38.9px] font-editorial max-[360px]:text-[32px] max-[360px]:leading-[34.6px] lg:text-[56px] lg:leading-[60.5px] lg:[&>span]:block"
          data-ui="display"
        >
          Tursina Explore
        </h1>
        <div
          className="grid gap-4 mt-6 md:grid-cols-[1.1fr_1fr] md:gap-10 lg:grid-cols-[650fr_508fr] lg:gap-12"
          data-ui="te-programme-intro"
        >
          <p
            className="text-[17px] leading-[25px] lg:text-[20px] lg:leading-[29px]"
            data-ui="intro"
          >
            Ekspedisi MAPALA Tursina yang mempertemukan olahraga alam bebas,
            lingkungan hidup, dan pengalaman sosial budaya.
          </p>
          <p
            className="text-[17px] leading-[25px] lg:text-[19px] lg:leading-[28px]"
            data-ui="body"
          >
            Setiap edisi memiliki tempat, perjalanan, dokumentasi, dan karya
            sendiri. Jelajahi catatan yang tersedia, dari cerita yang utuh
            hingga rekaman yang masih singkat.
          </p>
        </div>
        <p
          className="border-t border-t-border mt-8 pt-4 font-normal text-[16px] leading-[23px] font-sans text-muted"
          data-ui="te-archive-note"
        >
          Edisi berikut merupakan arsip historis. Informasi edisi terkini belum
          dikonfirmasi.
        </p>
      </header>
      {te11 && (
        <section
          className="w-[calc(100%_-_32px)] max-w-institution mx-auto md:w-[calc(100%_-_48px)] pb-14 lg:pb-22"
          data-ui="container section"
        >
          <p
            className="font-semibold text-[12px] leading-[18px] font-sans uppercase tracking-[.02em] text-blue mb-4"
            data-ui="label te-edition-label"
          >
            Catatan pilihan / edisi 11
          </p>
          <div
            className="grid gap-6 [&>div]:order-1 [&>[data-ui~=media]]:order-2 [&>[data-ui~=media-fallback]]:order-2 [&>div>p]:mt-4 [&_[data-ui~=metadata-inline]]:mt-4 [&>div>[data-ui~=button]]:mt-6 [&>div>[data-ui~=link]]:mt-3 [&>div>[data-ui~=link]]:text-blue [&_[data-ui~=section-title]_a]:block [&_[data-ui~=section-title]_a]:min-h-11 [&_[data-ui~=section-title]_a:hover]:underline [&_[data-ui~=section-title]_a:hover]:underline-offset-4 md:[&>div]:order-0 md:[&>[data-ui~=media]]:order-0 md:[&>[data-ui~=media-fallback]]:order-0 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-8 lg:grid-cols-[minmax(0,650fr)_minmax(0,508fr)] lg:gap-12"
            data-ui="te-edition-feature"
          >
            <DocumentaryMedia
              role="expedition"
              recordId="te11"
              placement="te-catalogue-feature"
              fallbackTitle="Dokumentasi TE11"
              fallback="Arsip ekspedisi mencatat perjalanan lintas moda menuju Bukit Raya pada 2024."
            />
            <div>
              <h2
                className="font-semibold text-[30px] leading-[35px] font-editorial lg:text-[40px] lg:leading-[46px] lg:font-semibold"
                data-ui="section-title"
              >
                <a href="#/expedition/te11">Bukit Raya</a>
              </h2>
              <ActivityMetadata activity={te11} inline />
              <p
                className="text-[16px] leading-[23px] text-muted"
                data-ui="metadata"
              >
                {te11.location}
              </p>
              <p
                className="text-[17px] leading-[25px] lg:text-[19px] lg:leading-[28px]"
                data-ui="body"
              >
                Perjalanan lintas sungai, hutan hujan, dan catatan lapangan.
                Kenali rangkaian ekspedisi serta karya yang terhubung dengannya.
              </p>
              <ActionLink href="#/expedition/te11">
                Baca ekspedisi TE11
              </ActionLink>
              {article && (
                <TextLink href={article.href}>
                  Catatan karya terkait: {article.title}
                </TextLink>
              )}
            </div>
          </div>
        </section>
      )}
      <section
        className="w-[calc(100%_-_32px)] max-w-institution mx-auto md:w-[calc(100%_-_48px)] pb-14 lg:pb-22"
        data-ui="container section"
      >
        <SectionHeading
          label="Edisi terdokumentasi lainnya"
          title="Edisi lain dalam arsip."
          description="Kedalaman halaman mengikuti bukti yang tersedia, tanpa mengisi bagian yang belum diketahui."
        />
        {expeditionRecords
          .filter((r) => r.id !== te11?.id)
          .map((r) => (
            <ActivityPreview
              key={r.id}
              activity={r}
              title={`Tursina Explore #${r.edition} — ${r.title}`}
            />
          ))}
      </section>
      <section
        className="w-[calc(100%_-_32px)] max-w-institution mx-auto md:w-[calc(100%_-_48px)] pb-14 lg:pb-22"
        data-ui="container section"
      >
        <EvidenceDisclosure summary="Tentang sumber katalog ini">
          <p>
            Pengertian program dan TE11 diringkas dari Draft LPJ Tursina Explore
            #11. Identitas, tanggal, lokasi, dan tujuan sosial budaya TE12
            bersumber dari LPJ Pengurus 2025.
          </p>
          <p>
            Siberut / TE10 bersumber dari LPJ Pengurus 2022–2023. Ini bukan
            daftar lengkap semua edisi atau penetapan ekspedisi terbaru. Status
            kegiatan, kelengkapan laporan, dan publikasi karya diperlakukan
            terpisah.
          </p>
        </EvidenceDisclosure>
      </section>
    </div>
  );
}
export function ExpeditionDetail({ id }: { id: string }) {
  const { registry, view } = useContentReadModel();
  const record = view.expeditionRecords.find((a) => a.id === id);
  if (!record)
    return (
      <div
        className="w-[calc(100%_-_32px)] max-w-institution mx-auto md:w-[calc(100%_-_48px)] pt-4 pb-10 [&>[data-ui~=display]]:mt-3 [&_[data-ui~=metadata-inline]]:mt-6 [&>p[data-ui~=metadata]]:mt-2 lg:pt-6 lg:pb-14"
        data-ui="container te-record-head"
      >
        <h1
          className="font-semibold text-[36px] leading-[38.9px] font-editorial max-[360px]:text-[32px] max-[360px]:leading-[34.6px] lg:text-[56px] lg:leading-[60.5px] lg:[&>span]:block"
          data-ui="display"
        >
          Catatan belum tersedia.
        </h1>
        <TextLink href="#/program/te">Kembali ke Tursina Explore</TextLink>
      </div>
    );
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
          className="border-t-2 border-t-primary pt-4 self-start [&_nav]:mt-3 [&_nav]:grid [&_button]:text-left [&_button]:w-full [&_button]:border-0 [&_button]:border-b [&_button]:border-b-border [&_button]:bg-transparent [&_button]:py-2 [&_button:hover]:underline [&_button:hover]:underline-offset-4 md:[&_nav]:grid-cols-[1fr_1fr] md:[&_nav]:gap-x-6 lg:sticky lg:top-6 lg:[&_nav]:grid lg:[&_nav]:grid-cols-[1fr] lg:[&_button]:text-[16px] lg:[&_button]:leading-[23px]"
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
                className="flex items-center justify-start gap-4 min-h-11 font-semibold text-[17px] leading-[24px] font-sans text-primary no-underline w-fit max-w-full [&>span:last-child]:shrink-0 [&:hover>span:first-child]:underline [&:hover>span:first-child]:underline-offset-4"
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
                <span aria-hidden="true">↓</span>
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
          <EvidenceDisclosure>
            {narrative.evidence.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <DateEvidence id={record.id} />
          </EvidenceDisclosure>
        </div>
        <TextLink href="#/program/te">
          Kembali ke semua edisi Tursina Explore
        </TextLink>
      </section>
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
        className="w-[calc(100%_-_32px)] mx-auto md:w-[calc(100%_-_48px)] max-w-225 pb-14 [&>[data-ui~=evidence]]:mt-8 [&>[data-ui~=link]]:mt-8 lg:pb-22"
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
        <EvidenceDisclosure>
          <DateEvidence id={record.id} />
          <p>
            Dasar catatan: {record.evidenceLabel}. Keterbatasan isi di sini
            bukan bukti tidak ada kegiatan atau karya.
          </p>
        </EvidenceDisclosure>
        <TextLink href="#/program/te">
          Kembali ke semua edisi Tursina Explore
        </TextLink>
      </div>
      <RelatedRecords id={record.id} />
    </article>
  );
}
