import { visibleRelations, historyGroups, workDiscovery } from "./domain/read";
import { useEffect } from "react";
import { useContentReadModel } from "./ContentReadModel";
import { RecordDate, DateEvidence } from "./components/RecordContext";
import { useState } from "react";
import { useInstitutionalRecords } from "./InstitutionalContent";
import { useActivityRecords } from "./ActivityContent";
import {
  searchMembers,
  selectWorks,
  workKinds,
  type PublicationRecord,
  type WorkKind,
  type HistoryEntry,
} from "./institutional-model";
import {
  Breadcrumbs,
  EvidenceDisclosure,
  ProgrammeEntry,
  SectionHeading,
  TextLink,
} from "./components/Foundation";
function useActivities() {
  return [
    ...useContentReadModel().view.expeditionRecords,
    ...useActivityRecords(),
  ];
}
function SourceList({
  uses,
}: {
  uses: {
    sourceId: string;
    locator: string;
  }[];
}) {
  const {
    view: { sources: sourceDefinitions },
  } = useContentReadModel();
  return (
    <ul
      className="list-disc pl-6 my-4 [&_li]:mt-3"
      data-ui="institution-source-list"
    >
      {uses.map((u) => (
        <li key={u.sourceId + u.locator}>
          {sourceDefinitions.find((s) => s.id === u.sourceId)?.label} —{" "}
          {u.locator}
        </li>
      ))}
    </ul>
  );
}
export function WorkAvailability({ work }: { work: PublicationRecord }) {
  return (
    <section
      className="my-8 py-6 border-t-2 border-t-blue [&>p]:mt-4 [&>p]:text-muted [&>p]:max-w-[66ch] [&_[data-ui~=label]]:mb-3"
      data-availability={work.availability.state}
      data-ui="te-restricted-reading work-availability"
    >
      <p
        className="font-semibold text-[12px] leading-[18px] font-sans uppercase tracking-[.02em] text-blue"
        data-ui="label"
      >
        {work.editorial.verification === "synthetic"
          ? "Contoh sintetis"
          : work.kind === "context"
            ? "Konteks sumber"
            : "Ketersediaan karya"}
      </p>
      <h2
        className="font-semibold text-[26px] leading-[32px] font-editorial [&_a:hover]:underline [&_a:hover]:underline-offset-4 [&_a]:block [&_a]:min-h-11 [&_a]:text-inherit lg:text-[30px] lg:leading-[36px] lg:font-semibold"
        data-ui="content-title"
      >
        {work.availability.title}
      </h2>
      <p>{work.availability.explanation}</p>
    </section>
  );
}
function WorkLedger({
  works,
  context = "",
}: {
  works: readonly PublicationRecord[];
  context?: string;
}) {
  return (
    <div
      className="border-t border-t-border"
      data-work-results
      data-ui="work-ledger"
    >
      {works.map((w) => (
        <article
          className="grid gap-4 py-6 border-b border-b-border [&>[data-ui~=link]]:self-start [&_[data-ui~=caption]]:mt-3 [&_[data-ui~=metadata]]:mt-3 [&_[data-ui~=body]]:mt-3 [&_h2_a:hover]:underline [&_h2_a:hover]:underline-offset-4 md:grid-cols-[minmax(0,180fr)_minmax(0,680fr)_minmax(0,220fr)] md:gap-8 lg:py-8"
          key={w.id}
          data-ui="work-entry"
        >
          <div>
            <p
              className="font-semibold text-[12px] leading-[18px] font-sans uppercase tracking-[.02em] text-blue"
              data-ui="label"
            >
              {w.type}
            </p>
            <p
              className="text-[14px] leading-[20px] text-muted"
              data-ui="caption"
            >
              {workDiscovery(w).cue}
            </p>
          </div>
          <div>
            <h2
              className="font-semibold text-[26px] leading-[32px] font-editorial [&_a:hover]:underline [&_a:hover]:underline-offset-4 [&_a]:block [&_a]:min-h-11 [&_a]:text-inherit lg:text-[30px] lg:leading-[36px] lg:font-semibold"
              data-ui="content-title"
            >
              <a href={w.href + context} lang={w.language}>
                {w.title}
              </a>
            </h2>
            <p
              className="text-[16px] leading-[23px] text-muted"
              data-ui="metadata"
            >
              <RecordDate id={w.id} fallback={w.date} />
            </p>
            {w.author && (
              <p
                className="text-[16px] leading-[23px] text-muted"
                data-ui="metadata"
              >
                {w.author}
              </p>
            )}
            <p
              className="text-[17px] leading-[25px] lg:text-[19px] lg:leading-[28px]"
              data-ui="body"
            >
              {w.summary}
            </p>
          </div>
          <TextLink href={w.href + context}>{workDiscovery(w).action}</TextLink>
        </article>
      ))}
    </div>
  );
}
export function WorksCatalogue({
  knowledge = false,
  params = new URLSearchParams(),
}: {
  knowledge?: boolean;
  params?: URLSearchParams;
}) {
  const { works } = useInstitutionalRecords();
  const query = params.get("q") ?? "",
    kind = Object.keys(workKinds).includes(params.get("type") ?? "")
      ? params.get("type")!
      : "all";
  const update = (q: string, k: string) => {
    const p = new URLSearchParams();
    if (q.trim()) p.set("q", q);
    if (k !== "all" && Object.keys(workKinds).includes(k)) p.set("type", k);
    location.hash =
      (knowledge ? "/knowledge" : "/publications") + (p.size ? "?" + p : "");
  };
  const setQuery = (q: string) => update(q, kind),
    setKind = (k: string) => update(query, k);
  const context =
    "?" +
    new URLSearchParams({
      from: knowledge ? "knowledge" : "publications",
      ...(query
        ? {
            q: query,
          }
        : {}),
      ...(kind !== "all"
        ? {
            type: kind,
          }
        : {}),
    });
  const matches = selectWorks(works, kind, query, knowledge);
  const kinds = (Object.keys(workKinds) as WorkKind[]).filter((k) =>
    works.some(
      (w) =>
        w.kind === k &&
        w.editorial.verification !== "synthetic" &&
        (!knowledge || k === "resource" || k === "context"),
    ),
  );
  const demos = works.filter(
    (w) =>
      w.editorial.verification === "synthetic" &&
      (!knowledge || w.kind === "resource" || w.kind === "context"),
  );
  return (
    <div
      className="wrap-break-word [&_[data-ui~=activity-page-head]>[data-ui~=link]]:mt-6 [&_[data-ui~=activity-page-head]>[data-ui~=link]]:max-w-[38em]"
      data-ui="institution-experience"
    >
      <header
        className="w-[calc(100%_-_32px)] max-w-institution mx-auto md:w-[calc(100%_-_48px)] pt-4 pb-10 [&>[data-ui~=display]]:mt-3 [&>[data-ui~=metadata-inline]]:mt-6 [&>[data-ui~=link]]:mt-6 [&>[data-ui~=link]]:max-w-[38em] lg:pt-6 lg:pb-14"
        data-ui="container activity-page-head"
      >
        <Breadcrumbs
          items={[
            {
              label: "Beranda",
              href: "#/",
            },
            {
              label: knowledge ? "Materi belajar" : "Karya & Pengetahuan",
            },
          ]}
        />
        <p
          className="font-semibold text-[12px] leading-[18px] font-sans uppercase tracking-[.02em] text-blue"
          data-ui="label"
        >
          Karya & pengetahuan
        </p>
        <h1
          className="font-semibold text-[36px] leading-[38.9px] font-editorial max-[360px]:text-[32px] max-[360px]:leading-[34.6px] lg:text-[56px] lg:leading-[60.5px] lg:[&>span]:block"
          data-ui="display"
        >
          {knowledge ? "Belajar dari karya." : "Pengalaman menjadi bacaan."}
        </h1>
        <p
          className="text-[17px] leading-[25px] lg:text-[20px] lg:leading-[29px] max-w-[66ch] mt-6"
          data-ui="intro activity-deck"
        >
          {knowledge
            ? "Materi belajar dan catatan sumber untuk memahami proses, keterampilan dan pengalaman Tursina. Ketersediaan isi dijelaskan pada setiap karya."
            : "Artikel, bahan belajar, dan dokumentasi menyimpan pengalaman Tursina. Telusuri karya mandiri dan karya yang terhubung dengan kegiatan."}
        </p>
        <p
          className="text-[17px] leading-[25px] lg:text-[19px] lg:leading-[28px] max-w-[70ch] mt-4"
          data-ui="body activity-support"
        >
          Ketersediaan dijelaskan pada setiap karya: informasi karya, ringkasan
          sumber, atau contoh prototipe. Tanggal karya tetap dibedakan dari
          tanggal kegiatan.
        </p>
        <TextLink href={knowledge ? "#/publications" : "#/knowledge"}>
          {knowledge ? "Lihat semua jenis karya" : "Jelajahi materi belajar"}
        </TextLink>
      </header>
      <section
        className="w-[calc(100%_-_32px)] max-w-institution mx-auto md:w-[calc(100%_-_48px)] pb-14 lg:pb-22"
        data-ui="container section"
      >
        <SectionHeading
          label="Temukan karya"
          title="Bacaan dan bahan belajar."
        />
        <div
          className="flex items-end flex-wrap gap-6 mt-6 [&_label]:block [&_label]:font-semibold [&_label]:min-w-0 [&_label]:w-full [&_[data-ui~=field]]:mt-2 [&_[data-ui~=field]]:w-full [&_[data-ui~=field]]:font-normal [&>[data-ui~=button]]:mb-0.25 md:[&_label]:w-60"
          data-ui="activity-filters"
        >
          <label>
            Cari karya
            <input
              type="search"
              className="w-full rounded-control border bg-surface px-3 py-2 text-base min-h-12 border-control-border rounded-control"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Judul, topik atau penulis"
              data-ui="field"
            />
          </label>
          <label>
            Jenis karya
            <select
              className="w-full rounded-control border bg-surface px-3 py-2 text-base min-h-12 border-control-border rounded-control"
              aria-label="Jenis karya"
              value={kind}
              onChange={(e) => setKind(e.target.value)}
              data-ui="field"
            >
              <option value="all">Semua jenis</option>
              {kinds.map((k) => (
                <option value={k} key={k}>
                  {workKinds[k]}
                </option>
              ))}
            </select>
          </label>
          <button
            type="button"
            className="inline-flex items-center rounded-control border px-5 py-2.5 transition-colors min-h-11.5 rounded-control text-[17px] leading-[24px] font-semibold pt-2.5 pr-4 pb-2.5 pl-4 gap-2 justify-start disabled:opacity-100 disabled:text-disabled-ink disabled:bg-disabled-bg disabled:border-disabled-bg disabled:cursor-not-allowed hover:border-forest bg-page border-control-border text-primary [&:hover:not(:disabled)]:bg-surface-muted [&:active:not(:disabled)]:border-primary"
            onClick={() => {
              update("", "all");
            }}
            data-ui="button button-secondary"
          >
            Reset pencarian
          </button>
        </div>
        <p
          role="status"
          className="font-normal text-[16px] leading-[23px] font-sans text-muted my-6"
          data-ui="activity-result-status"
        >
          {matches.length} karya{query ? ` untuk “${query}”` : ""}
        </p>
        {matches.length ? (
          <WorkLedger works={matches} context={context} />
        ) : (
          <div
            className="border-t border-t-border py-6 [&>p]:max-w-[60ch] [&>p]:mt-4"
            data-ui="activity-empty"
          >
            <h2
              className="font-semibold text-[26px] leading-[32px] font-editorial [&_a:hover]:underline [&_a:hover]:underline-offset-4 [&_a]:block [&_a]:min-h-11 [&_a]:text-inherit lg:text-[30px] lg:leading-[36px] lg:font-semibold"
              data-ui="content-title"
            >
              Belum ada karya yang sesuai.
            </h2>
            <p>
              Ubah kata pencarian atau jenis karya. Hasil kosong bukan bukti
              karya tidak pernah ada.
            </p>
          </div>
        )}
      </section>
      {!!demos.length && (
        <section
          className="w-[calc(100%_-_32px)] max-w-institution mx-auto md:w-[calc(100%_-_48px)] pb-14 lg:pb-22 border-t border-t-border pt-8"
          data-ui="container section activity-demo"
        >
          <SectionHeading
            label="Contoh sintetis / terpisah dari arsip"
            title={
              demos.every((w) => w.kind === "announcement")
                ? "Mengenali pola pengumuman."
                : "Contoh konten prototipe."
            }
            description="Bukan informasi institusi yang berlaku. Tidak ada jadwal, kontak atau kanal penerimaan anggota nyata."
          />
          <WorkLedger works={demos} />
        </section>
      )}
      <section
        className="w-[calc(100%_-_32px)] max-w-institution mx-auto md:w-[calc(100%_-_48px)] pb-14 lg:pb-22"
        data-ui="container section"
      >
        <EvidenceDisclosure summary="Cakupan dan ketersediaan katalog">
          <p>
            Pilihan kecil karya dan referensi bersumber, bukan arsip lengkap
            atau daftar publikasi terbaru. Materi teridentifikasi, catatan
            rencana dan referensi dokumentasi dibedakan dari artikel.
          </p>
          <p>
            Belum ada naskah asli atau berkas unduh yang diizinkan pada kumpulan
            ini.
          </p>
        </EvidenceDisclosure>
      </section>
    </div>
  );
}
export function PublicationDetail({
  id,
  params = new URLSearchParams(),
}: {
  id: string;
  params?: URLSearchParams;
}) {
  const returnParams = new URLSearchParams();
  for (const key of ["q", "type"]) {
    const v = params.get(key);
    if (v) returnParams.set(key, v);
  }
  const back = `#/${params.get("from") === "knowledge" ? "knowledge" : "publications"}${returnParams.size ? "?" + returnParams : ""}`;
  const {
    registry,
    view: { programmes: programmeDefinitions },
  } = useContentReadModel();
  const { works } = useInstitutionalRecords(),
    activities = useActivities();
  const w = works.find((w) => w.id === id);
  if (!w)
    return (
      <div
        className="w-[calc(100%_-_32px)] max-w-institution mx-auto md:w-[calc(100%_-_48px)] pb-14 lg:pb-22"
        data-ui="container section"
      >
        <h1
          className="font-semibold text-[36px] leading-[38.9px] font-editorial max-[360px]:text-[32px] max-[360px]:leading-[34.6px] lg:text-[56px] lg:leading-[60.5px] lg:[&>span]:block"
          data-ui="display"
        >
          Karya belum tersedia.
        </h1>
        <TextLink href={back}>Kembali ke publikasi</TextLink>
      </div>
    );
  const related = activities.filter((a) =>
      w.relatedActivityIds?.includes(a.id),
    ),
    programmes = programmeDefinitions.filter((p) =>
      w.relatedProgrammeIds?.includes(p.id),
    );
  return (
    <article
      className="wrap-break-word [&_[data-ui~=activity-page-head]>[data-ui~=link]]:mt-6 [&_[data-ui~=activity-page-head]>[data-ui~=link]]:max-w-[38em]"
      data-ui="te-publication-detail te-experience institution-experience"
    >
      <header
        className="w-[calc(100%_-_32px)] max-w-institution mx-auto md:w-[calc(100%_-_48px)] pt-4 pb-10 [&>[data-ui~=display]]:mt-3 [&>[data-ui~=display]]:max-w-[16ch] [&>[data-ui~=link]]:max-w-[32em] [&>[data-ui~=link]]:mt-4 [&>[data-ui~=intro]]:max-w-[66ch] [&>[data-ui~=intro]]:mt-6 lg:pt-6 lg:pb-14"
        data-ui="container te-publication-head"
      >
        <Breadcrumbs
          items={[
            {
              label: "Beranda",
              href: "#/",
            },
            {
              label: "Publikasi",
              href: "#/publications",
            },
            {
              label: w.title,
            },
          ]}
        />
        <p
          className="font-semibold text-[12px] leading-[18px] font-sans uppercase tracking-[.02em] text-blue"
          data-ui="label"
        >
          {w.type}
          {related.length
            ? ` / karya terkait ${related.map((a) => (a.edition ? `TE${a.edition}` : a.title)).join(", ")}`
            : " / Mandiri"}
          {w.editorial.verification === "synthetic" ? " / Contoh sintetis" : ""}
        </p>
        <h1
          className="font-semibold text-[36px] leading-[38.9px] font-editorial max-[360px]:text-[32px] max-[360px]:leading-[34.6px] lg:text-[56px] lg:leading-[60.5px] lg:[&>span]:block"
          lang={w.language}
          data-ui="display"
        >
          {w.title}
        </h1>
        {(w.contributors?.length || w.date) && (
          <div
            className="flex flex-wrap gap-y-2 gap-x-6 mt-6 text-muted font-normal text-[16px] leading-[23px] font-sans"
            data-ui="te-publication-byline"
          >
            {w.contributors?.map((c) => (
              <p key={c.name}>
                {c.name}
                {c.role !== "Penulis" ? ` / ${c.role}` : ""}
              </p>
            ))}
            <RecordDate id={w.id} fallback={w.date} />
          </div>
        )}
        <p
          className="text-[17px] leading-[25px] lg:text-[20px] lg:leading-[29px]"
          data-ui="intro"
        >
          {w.intro ?? w.summary}
        </p>
        {related.map((a) => (
          <TextLink key={a.id} href={a.href!}>
            Terkait {a.edition ? `${a.program} #${a.edition}` : a.title}
          </TextLink>
        ))}
      </header>
      <div
        className="w-[calc(100%_-_32px)] max-w-institution mx-auto md:w-[calc(100%_-_48px)] grid gap-10 pb-14 lg:grid-cols-[minmax(0,2.2fr)_minmax(0,1fr)] lg:gap-18 lg:pb-22"
        data-ui="container te-publication-layout"
      >
        <div className="min-w-0" data-ui="te-publication-reading">
          {w.resource && (
            <section
              className="border-t-2 border-t-primary pt-6 mb-10 [&_h2]:mt-6 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mt-3"
              data-ui="work-resource"
            >
              <p
                className="font-semibold text-[12px] leading-[18px] font-sans uppercase tracking-[.02em] text-blue"
                data-ui="label"
              >
                Identitas bahan belajar
              </p>
              <dl
                className="flex flex-wrap gap-y-4 gap-x-8 mt-6 [&_dt]:font-normal [&_dt]:text-[14px] [&_dt]:leading-[20px] [&_dt]:font-sans [&_dt]:text-muted [&_dd]:mt-1 [&_a]:flex [&_a]:items-center [&_a]:min-h-11 [&_a]:underline [&_a]:underline-offset-4 [&_a]:text-primary"
                data-ui="activity-classification"
              >
                <div>
                  <dt>Format sumber</dt>
                  <dd>{w.resource.format}</dd>
                </div>
                {w.resource.pages && (
                  <div>
                    <dt>Panjang sumber</dt>
                    <dd>{w.resource.pages} halaman</dd>
                  </div>
                )}
                {w.resource.bytes && (
                  <div>
                    <dt>Ukuran berkas</dt>
                    <dd>{w.resource.bytes.toLocaleString("id-ID")} byte</dd>
                  </div>
                )}
              </dl>
              {!!w.resource.topics?.length && (
                <>
                  <h2
                    className="font-semibold text-[26px] leading-[32px] font-editorial [&_a:hover]:underline [&_a:hover]:underline-offset-4 [&_a]:block [&_a]:min-h-11 [&_a]:text-inherit lg:text-[30px] lg:leading-[36px] lg:font-semibold"
                    data-ui="content-title"
                  >
                    Topik yang teridentifikasi
                  </h2>
                  <ul>
                    {w.resource.topics.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </>
              )}
            </section>
          )}
          {w.sections?.map((s) => (
            <section
              className="[&+[data-ui~=te-story-section]]:mt-10 [&>[data-ui~=label]]:mb-3 [&_[data-ui~=section-heading]]:mb-6 lg:[&+[data-ui~=te-story-section]]:mt-14"
              key={s.id}
              data-ui="te-story-section"
            >
              {s.label && (
                <p
                  className="font-semibold text-[12px] leading-[18px] font-sans uppercase tracking-[.02em] text-blue"
                  data-ui="label"
                >
                  {s.label}
                </p>
              )}
              <h2
                className="font-semibold text-[30px] leading-[35px] font-editorial lg:text-[40px] lg:leading-[46px] lg:font-semibold"
                data-ui="section-title"
              >
                {s.title}
              </h2>
              <div
                className="max-w-[66ch] font-normal text-[18px] leading-[28px] font-editorial mt-6 [&_p+p]:mt-6 lg:text-[20px] lg:leading-[31px]"
                data-ui="reading"
              >
                {s.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </section>
          ))}
          <WorkAvailability work={w} />
          {w.announcement && (
            <section className="my-8 [&_p]:mt-4" data-ui="work-announcement">
              <h2
                className="font-semibold text-[26px] leading-[32px] font-editorial [&_a:hover]:underline [&_a:hover]:underline-offset-4 [&_a]:block [&_a]:min-h-11 [&_a]:text-inherit lg:text-[30px] lg:leading-[36px] lg:font-semibold"
                data-ui="content-title"
              >
                Konteks informasi
              </h2>
              {w.announcement.audience && <p>{w.announcement.audience}</p>}
              {w.announcement.effective && (
                <p>Periode: {w.announcement.effective.label}</p>
              )}
              {w.announcement.expiresOn && (
                <p>Berakhir: {w.announcement.expiresOn}</p>
              )}
              <p>
                Tidak ada jadwal atau status aktif yang disimpulkan dari contoh
                ini.
              </p>
            </section>
          )}
          {!!w.uncertainties?.length && (
            <section
              className="[&_ul]:list-disc [&_ul]:pl-6 [&_li]:mt-3 my-8"
              data-ui="institution-uncertainties"
            >
              <h2
                className="font-semibold text-[26px] leading-[32px] font-editorial [&_a:hover]:underline [&_a:hover]:underline-offset-4 [&_a]:block [&_a]:min-h-11 [&_a]:text-inherit lg:text-[30px] lg:leading-[36px] lg:font-semibold"
                data-ui="content-title"
              >
                Yang belum dipastikan
              </h2>
              <ul>
                {w.uncertainties.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </section>
          )}
          <EvidenceDisclosure summary="Metadata dan batas publikasi">
            {w.evidence.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <SourceList uses={w.sourceUses} />
            <DateEvidence id={w.id} />
            <p
              className="text-[14px] leading-[20px] text-muted"
              data-ui="caption"
            >
              {w.editorial.verification === "synthetic"
                ? "Contoh sintetis"
                : w.editorial.verification === "prior-review"
                  ? "Metadata dari pemeriksaan terdahulu"
                  : "Metadata sumber diperiksa"}{" "}
              · draf review prototipe. Keberadaan karya, ketersediaan isi dan
              izin publikasi tidak disamakan.
            </p>
          </EvidenceDisclosure>
        </div>
        <aside
          className="border-t-2 border-t-primary pt-4 self-start [&>[data-ui~=content-title]]:mt-4 [&>p]:mt-4 [&>[data-ui~=link]]:mt-4 lg:sticky lg:top-6"
          data-ui="te-publication-context"
        >
          <p
            className="font-semibold text-[12px] leading-[18px] font-sans uppercase tracking-[.02em] text-blue"
            data-ui="label"
          >
            {related.length ? "Konteks perjalanan" : "Temukan kembali"}
          </p>
          {related.map((a) => (
            <div
              className="[&+[data-ui~=work-related-activity]]:border-t [&+[data-ui~=work-related-activity]]:border-t-border [&+[data-ui~=work-related-activity]]:pt-6 [&+[data-ui~=work-related-activity]]:mt-6 [&>p]:mt-4 [&>[data-ui~=link]]:mt-4"
              key={a.id}
              data-ui="work-related-activity"
            >
              <p
                className="font-semibold text-[12px] leading-[18px] font-sans uppercase tracking-[.02em] text-blue"
                data-ui="label"
              >
                {visibleRelations(registry, w.id).find(
                  (x) => x.record.id === a.id,
                )?.label ?? "Konteks terkait"}
              </p>
              <h2
                className="font-semibold text-[26px] leading-[32px] font-editorial [&_a:hover]:underline [&_a:hover]:underline-offset-4 [&_a]:block [&_a]:min-h-11 [&_a]:text-inherit lg:text-[30px] lg:leading-[36px] lg:font-semibold"
                data-ui="content-title"
              >
                {a.edition ? `${a.program} #${a.edition}` : a.title}
              </h2>
              {a.location && (
                <p
                  className="text-[16px] leading-[23px] text-muted"
                  data-ui="metadata"
                >
                  {a.location}
                </p>
              )}
              <p>
                <RecordDate id={a.id} fallback={a.date} />
              </p>
              <TextLink href={a.href!}>
                {a.edition ? "Baca catatan ekspedisi" : "Baca catatan kegiatan"}
              </TextLink>
            </div>
          ))}
          {programmes.map((p) => (
            <TextLink key={p.id} href={p.href}>
              {p.name}
            </TextLink>
          ))}
          {!related.length && (
            <p>
              Karya mandiri: tidak ada kegiatan induk yang ditambahkan tanpa
              dasar sumber.
            </p>
          )}
          <TextLink href={back}>Kembali ke publikasi</TextLink>
          {w.kind === "resource" && (
            <TextLink href="#/knowledge">Kembali ke materi belajar</TextLink>
          )}
        </aside>
      </div>
    </article>
  );
}
function HistoricalRecord({ entry: e }: { entry: HistoryEntry }) {
  const { works } = useInstitutionalRecords(),
    activities = useActivities();
  return (
    <li
      className="grid gap-6 border-t border-t-border py-8 [&_[data-ui~=body]]:mt-6 [&_[data-ui~=caption]]:mt-6 [&_[data-ui~=evidence]]:mt-6 md:grid-cols-[minmax(0,240fr)_minmax(0,840fr)] md:gap-10 lg:py-10 lg:gap-18"
      id={e.id}
      tabIndex={-1}
      data-history-id={e.id}
      data-ui="history-entry"
    >
      <div
        className="font-normal text-[16px] leading-[23px] font-sans text-muted [&_[data-ui~=label]]:mt-3"
        data-ui="history-date"
      >
        <RecordDate id={e.id} fallback={e.when?.label} />
        <p
          className="font-semibold text-[12px] leading-[18px] font-sans uppercase tracking-[.02em] text-blue"
          data-ui="label"
        >
          {e.kind === "founding"
            ? "Pembentukan"
            : e.kind === "education"
              ? "Pendidikan"
              : e.kind === "knowledge"
                ? "Pengetahuan"
                : "Kesinambungan"}
        </p>
      </div>
      <div>
        <h2
          className="font-semibold text-[26px] leading-[32px] font-editorial [&_a:hover]:underline [&_a:hover]:underline-offset-4 [&_a]:block [&_a]:min-h-11 [&_a]:text-inherit lg:text-[30px] lg:leading-[36px] lg:font-semibold"
          data-ui="content-title"
        >
          {e.title}
        </h2>
        <p
          className="text-[17px] leading-[25px] lg:text-[19px] lg:leading-[28px]"
          data-ui="body"
        >
          {e.summary}
        </p>
        {e.periodLabel && (
          <p
            className="text-[14px] leading-[20px] text-muted"
            data-ui="caption"
          >
            {e.periodLabel}
          </p>
        )}
        <div className="mt-6 grid gap-2" data-ui="history-links">
          {activities
            .filter((a) => e.relatedActivityIds?.includes(a.id))
            .map((a) => (
              <TextLink key={a.id} href={a.href!}>
                {a.edition ? `${a.program} #${a.edition}` : a.title}
              </TextLink>
            ))}
          {works
            .filter((w) => e.relatedPublicationIds?.includes(w.id))
            .map((w) => (
              <TextLink key={w.id} href={w.href}>
                {w.title}
              </TextLink>
            ))}
        </div>
        <EvidenceDisclosure summary={`Sumber catatan: ${e.title}`}>
          <SourceList uses={e.sourceUses} />
          <DateEvidence id={e.id} />
          {e.uncertainties.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <p
            className="text-[14px] leading-[20px] text-muted"
            data-ui="caption"
          >
            {e.editorial.verification === "synthetic"
              ? "Contoh sintetis"
              : "Ringkasan sumber / draf prototipe"}
            . Bukan riwayat pribadi atau pengesahan keputusan keanggotaan.
          </p>
        </EvidenceDisclosure>
      </div>
    </li>
  );
}
export function InstitutionalHistory({
  params = new URLSearchParams(),
}: {
  params?: URLSearchParams;
}) {
  useEffect(() => {
    const id = params.get("entry");
    if (!id) return;
    const frame = requestAnimationFrame(() => {
      const el = document.getElementById(id);
      el?.scrollIntoView({
        block: "start",
      });
      el?.focus({
        preventScroll: true,
      });
    });
    return () => cancelAnimationFrame(frame);
  }, [params.get("entry")]);
  const { history } = useInstitutionalRecords();
  const { registry } = useContentReadModel();
  const { dated, undated } = historyGroups(registry, history);
  return (
    <div
      className="wrap-break-word [&_[data-ui~=activity-page-head]>[data-ui~=link]]:mt-6 [&_[data-ui~=activity-page-head]>[data-ui~=link]]:max-w-[38em]"
      data-ui="institution-experience"
    >
      <header
        className="w-[calc(100%_-_32px)] max-w-institution mx-auto md:w-[calc(100%_-_48px)] pt-4 pb-10 [&>[data-ui~=display]]:mt-3 [&>[data-ui~=metadata-inline]]:mt-6 [&>[data-ui~=link]]:mt-6 [&>[data-ui~=link]]:max-w-[38em] lg:pt-6 lg:pb-14"
        data-ui="container activity-page-head"
      >
        <Breadcrumbs
          items={[
            {
              label: "Beranda",
              href: "#/",
            },
            {
              label: "Tentang",
              href: "#/about",
            },
            {
              label: "Jejak Tursina",
            },
          ]}
        />
        <p
          className="font-semibold text-[12px] leading-[18px] font-sans uppercase tracking-[.02em] text-blue"
          data-ui="label"
        >
          Jejak Tursina
        </p>
        <h1
          className="font-semibold text-[36px] leading-[38.9px] font-editorial max-[360px]:text-[32px] max-[360px]:leading-[34.6px] lg:text-[56px] lg:leading-[60.5px] lg:[&>span]:block"
          data-ui="display"
        >
          Pengalaman yang diteruskan.
        </h1>
        <p
          className="text-[17px] leading-[25px] lg:text-[20px] lg:leading-[29px] max-w-[66ch] mt-6"
          data-ui="intro activity-deck"
        >
          {registry.history.some(
            (h) => h.kind === "founding" && h.publication.website === "preview",
          ) && (
            <>
              Dibentuk pada{" "}
              <RecordDate
                id={registry.history.find((h) => h.kind === "founding")!.id}
              />
              .{" "}
            </>
          )}
          Pendidikan, perjalanan dan catatan bersama memberi beberapa titik
          untuk menelusuri kesinambungan MAPALA Tursina.
        </p>
        <p
          className="text-[17px] leading-[25px] lg:text-[19px] lg:leading-[28px] max-w-[70ch] mt-4"
          data-ui="body activity-support"
        >
          Pilihan jejak ini belum membentuk sejarah lengkap. Tahun yang tidak
          tampil adalah celah dokumentasi dalam prototipe, bukan tahun tanpa
          kehidupan organisasi.
        </p>
        <div
          className="grid gap-6 mt-8 max-w-full [&_p]:max-w-[60ch] lg:grid-cols-3"
          data-ui="history-orientation"
        >
          <p>
            <strong>Pembentukan dan kesinambungan.</strong> Tanggal pembentukan
            menjadi titik awal; catatan berikutnya yang tersedia berasal dari
            2022. Rentang di antaranya belum terwakili dalam sumber pilihan ini.
          </p>
          <p>
            <strong>Pendidikan dan pengalaman lapangan.</strong> Catatan PD dan
            ekspedisi memperlihatkan ruang pewarisan pengetahuan melalui
            kegiatan bersama.
          </p>
          <p>
            <strong>Karya yang disimpan.</strong> Publikasi menghubungkan
            pengalaman dengan pengetahuan yang dapat ditelusuri kembali.
            Ketersediaan isi berbeda pada setiap karya.
          </p>
        </div>
      </header>
      <section
        className="w-[calc(100%_-_32px)] max-w-institution mx-auto md:w-[calc(100%_-_48px)] pb-14 lg:pb-22"
        data-ui="container section"
      >
        <h2
          className="font-semibold text-[30px] leading-[35px] font-editorial lg:text-[40px] lg:leading-[46px] lg:font-semibold"
          data-ui="section-title"
        >
          Titik-titik dalam perjalanan institusi
        </h2>
        <ol
          className="list-none p-0"
          aria-label="Pilihan jejak berdasarkan waktu sumber"
          data-ui="history-ledger"
        >
          {dated.map((e) => (
            <HistoricalRecord key={e.id} entry={e} />
          ))}
        </ol>
        {!!undated.length && (
          <>
            <h2
              className="font-semibold text-[30px] leading-[35px] font-editorial lg:text-[40px] lg:leading-[46px] lg:font-semibold"
              data-ui="section-title"
            >
              Waktu belum dipastikan
            </h2>
            <p>Catatan ini tidak ditempatkan sebagai urutan tahunan.</p>
            <ol className="list-none p-0" data-ui="history-ledger">
              {undated.map((e) => (
                <HistoricalRecord key={e.id} entry={e} />
              ))}
            </ol>
          </>
        )}
      </section>
      <section
        className="w-[calc(100%_-_32px)] max-w-institution mx-auto md:w-[calc(100%_-_48px)] pb-14 lg:pb-22 border-t-2 border-t-primary [&_[data-ui~=evidence]]:mt-10"
        data-ui="container section institution-history-context"
      >
        <SectionHeading
          label="Melampaui urutan kegiatan"
          title="Berbagai cara meneruskan pengalaman."
          description="Sejarah institusi, urutan kegiatan, periode kepengurusan, angkatan dan catatan anggota berhubungan, tetapi bukan hal yang sama."
        />
        <div
          className="grid gap-8 md:grid-cols-2"
          data-ui="activity-programmes"
        >
          <ProgrammeEntry
            index="01"
            title="Pendidikan dan pengalaman lapangan"
            description="Kenali program dan tiap kegiatan; angkatan bukan induk semua kegiatan."
            href="#/program/pd"
            action="Jelajahi pendidikan"
          />
          <ProgrammeEntry
            index="02"
            title="Pengetahuan yang disimpan"
            description="Karya memiliki identitas dan batas ketersediaannya sendiri."
            href="#/publications"
            action="Buka karya dan pengetahuan"
          />
        </div>
        <EvidenceDisclosure summary="Batas rekonstruksi sejarah">
          <p>
            Tanggal pembentukan bersumber dari AD yang tersedia, bukan dokumen
            pendirian sezaman. Tidak dibuat rangkaian tahunan buatan atau daftar
            pengurus yang belum diverifikasi.
          </p>
          <p>
            Kegiatan yang ditautkan mempunyai catatan sendiri. Roster, rincian
            upacara privat dan status anggota per orang tidak ditampilkan.
          </p>
        </EvidenceDisclosure>
      </section>
    </div>
  );
}
export function InstitutionalAbout() {
  const {
    view: { divisions: divisionDefinitions, sources: sourceDefinitions },
  } = useContentReadModel();
  const { information: i } = useInstitutionalRecords();
  return (
    <div
      className="wrap-break-word [&_[data-ui~=activity-page-head]>[data-ui~=link]]:mt-6 [&_[data-ui~=activity-page-head]>[data-ui~=link]]:max-w-[38em]"
      data-ui="institution-experience"
    >
      <header
        className="w-[calc(100%_-_32px)] max-w-institution mx-auto md:w-[calc(100%_-_48px)] pt-4 pb-10 [&>[data-ui~=display]]:mt-3 [&>[data-ui~=metadata-inline]]:mt-6 [&>[data-ui~=link]]:mt-6 [&>[data-ui~=link]]:max-w-[38em] lg:pt-6 lg:pb-14"
        data-ui="container activity-page-head"
      >
        <Breadcrumbs
          items={[
            {
              label: "Beranda",
              href: "#/",
            },
            {
              label: "Tentang MAPALA Tursina",
            },
          ]}
        />
        <p
          className="font-semibold text-[12px] leading-[18px] font-sans uppercase tracking-[.02em] text-blue"
          data-ui="label"
        >
          Tentang {i.shortName}
        </p>
        <h1
          className="font-semibold text-[36px] leading-[38.9px] font-editorial max-[360px]:text-[32px] max-[360px]:leading-[34.6px] lg:text-[56px] lg:leading-[60.5px] lg:[&>span]:block"
          data-ui="display"
        >
          {i.name}
        </h1>
        <p
          className="mt-4 font-semibold text-[19px] leading-[28px] font-sans text-blue"
          data-ui="institution-affiliation"
        >
          {i.affiliation}
        </p>
        <p
          className="text-[17px] leading-[25px] lg:text-[20px] lg:leading-[29px] max-w-[66ch] mt-6"
          data-ui="intro activity-deck"
        >
          {i.intro}
        </p>
        <div
          className="flex flex-wrap gap-y-4 gap-x-10 mt-6"
          data-ui="institution-opening-actions"
        >
          <TextLink href="#/program/pd">
            Kenali pendidikan dan kegiatan
          </TextLink>
          <TextLink href="#/jejak">Telusuri Jejak Tursina</TextLink>
        </div>
      </header>
      <section
        className="w-[calc(100%_-_32px)] max-w-institution mx-auto md:w-[calc(100%_-_48px)] pb-14 lg:pb-22 grid gap-10 [&>section>[data-ui~=caption]]:mt-6 [&>section>[data-ui~=caption]]:max-w-[70ch] lg:gap-14 lg:[&>section]:grid lg:[&>section]:grid-cols-[minmax(0,360fr)_minmax(0,720fr)] lg:[&>section]:gap-y-0 lg:[&>section]:gap-x-18 lg:[&_[data-ui~=reading]]:mt-0 lg:[&>section>[data-ui~=caption]]:col-[2]"
        data-ui="container section institution-about-blocks"
      >
        {i.blocks.map((b) => (
          <section key={b.id}>
            <h2
              className="font-semibold text-[30px] leading-[35px] font-editorial lg:text-[40px] lg:leading-[46px] lg:font-semibold"
              data-ui="section-title"
            >
              {b.title}
            </h2>
            <div
              className="max-w-[66ch] font-normal text-[18px] leading-[28px] font-editorial mt-6 [&_p+p]:mt-6 lg:text-[20px] lg:leading-[31px]"
              data-ui="reading"
            >
              {b.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <p
              className="text-[14px] leading-[20px] text-muted"
              data-ui="caption"
            >
              {b.sourceUses
                .map(
                  (u) =>
                    `${sourceDefinitions.find((s) => s.id === u.sourceId)?.label} / ${u.locator}`,
                )
                .join("; ")}
            </p>
          </section>
        ))}
      </section>
      <section className="bg-surface-muted" data-ui="institution-field-band">
        <div
          className="w-[calc(100%_-_32px)] max-w-institution mx-auto md:w-[calc(100%_-_48px)] pb-14 lg:pb-22"
          data-ui="container section"
        >
          <SectionHeading
            label="Pendidikan lapangan"
            title="Lima bidang, berbagai ruang belajar."
            description="Contoh kegiatan menunjukkan ruang belajar, bukan klaim pencapaian setiap peserta."
          />
          <div
            className="grid gap-8 [&>div]:border-t-2 [&>div]:border-t-primary [&>div]:pt-4 [&_p]:mt-4 [&_[data-ui~=link]]:mt-4 md:grid-cols-2 lg:grid-cols-3"
            data-ui="institution-fields"
          >
            {divisionDefinitions.map((d) => (
              <div key={d.id}>
                <h3
                  className="font-semibold text-[26px] leading-[32px] font-editorial [&_a:hover]:underline [&_a:hover]:underline-offset-4 [&_a]:block [&_a]:min-h-11 [&_a]:text-inherit lg:text-[30px] lg:leading-[36px] lg:font-semibold"
                  data-ui="content-title"
                >
                  {d.name}
                </h3>
                <p>{d.description}</p>
                <TextLink href={`#/program/pd?division=${d.id}`}>
                  Lihat catatan {d.name}
                </TextLink>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section
        className="w-[calc(100%_-_32px)] max-w-institution mx-auto md:w-[calc(100%_-_48px)] pb-14 lg:pb-22 [&_[data-ui~=evidence]]:mt-10"
        data-ui="container section institution-purpose"
      >
        <p
          className="font-semibold text-[12px] leading-[18px] font-sans uppercase tracking-[.02em] text-blue"
          data-ui="label"
        >
          Motto dalam ART Pasal 3
        </p>
        <p
          className="font-semibold text-[30px] leading-[35px] font-editorial lg:text-[40px] lg:leading-[46px] lg:font-semibold max-w-[26ch] mt-4 mb-10"
          data-ui="section-title institution-motto"
        >
          {i.motto}
        </p>
        <div
          className="grid gap-8 md:grid-cols-2"
          data-ui="activity-programmes"
        >
          <ProgrammeEntry
            index="01"
            title="Program, edisi dan kegiatan"
            description="Pendidikan divisi, perjalanan Tursina Explore dan kegiatan mandiri."
            href="#/activities"
            action="Jelajahi kegiatan"
          />
          <ProgrammeEntry
            index="02"
            title="Karya yang berdiri sendiri"
            description="Artikel, materi belajar dan catatan sumber."
            href="#/publications"
            action="Buka karya dan pengetahuan"
          />
        </div>
        <EvidenceDisclosure summary="Identitas dan batas informasi">
          {i.identityNotes.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <p>
            Jadwal penerimaan, kepengurusan, kontak dan kanal pendaftaran
            terkini belum dikonfirmasi; tidak disimpulkan dari dokumen historis.
          </p>
        </EvidenceDisclosure>
      </section>
    </div>
  );
}
export function SyntheticMembers() {
  const { members } = useInstitutionalRecords();
  const [query, setQuery] = useState("");
  const matches = searchMembers(members, query);
  return (
    <div
      className="wrap-break-word [&_[data-ui~=activity-page-head]>[data-ui~=link]]:mt-6 [&_[data-ui~=activity-page-head]>[data-ui~=link]]:max-w-[38em]"
      data-ui="institution-experience"
    >
      <header
        className="w-[calc(100%_-_32px)] max-w-institution mx-auto md:w-[calc(100%_-_48px)] pt-4 pb-10 [&>[data-ui~=display]]:mt-3 [&>[data-ui~=metadata-inline]]:mt-6 [&>[data-ui~=link]]:mt-6 [&>[data-ui~=link]]:max-w-[38em] lg:pt-6 lg:pb-14"
        data-ui="container activity-page-head"
      >
        <Breadcrumbs
          items={[
            {
              label: "Beranda",
              href: "#/",
            },
            {
              label: "Buku Induk",
            },
          ]}
        />
        <p
          className="font-semibold text-[12px] leading-[18px] font-sans uppercase tracking-[.02em] text-blue"
          data-ui="label"
        >
          Buku Induk / contoh sintetis
        </p>
        <h1
          className="font-semibold text-[36px] leading-[38.9px] font-editorial max-[360px]:text-[32px] max-[360px]:leading-[34.6px] lg:text-[56px] lg:leading-[60.5px] lg:[&>span]:block"
          data-ui="display"
        >
          Nama dalam kebersamaan.
        </h1>
        <p
          className="text-[17px] leading-[25px] lg:text-[20px] lg:leading-[29px] max-w-[66ch] mt-6"
          data-ui="intro activity-deck"
        >
          Contoh katalog NIA dan nama. Semua baris sintetis; tidak ada data
          anggota asli, profil atau informasi kontak.
        </p>
      </header>
      <section
        className="w-[calc(100%_-_32px)] max-w-institution mx-auto md:w-[calc(100%_-_48px)] pb-14 lg:pb-22 [&>[data-ui~=button]]:mt-4 [&>[data-ui~=evidence]]:mt-10"
        data-ui="container section institution-members"
      >
        <label
          className="block font-semibold max-w-[34em] [&_[data-ui~=field]]:mt-2 [&_[data-ui~=field]]:w-full"
          data-ui="institution-member-search"
        >
          Cari NIA atau nama
          <input
            type="search"
            className="w-full rounded-control border bg-surface px-3 py-2 text-base min-h-12 border-control-border rounded-control"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Misalnya DEMO.001"
            data-ui="field"
          />
        </label>
        <button
          className="inline-flex items-center rounded-control border px-5 py-2.5 transition-colors min-h-11.5 rounded-control text-[17px] leading-[24px] font-semibold pt-2.5 pr-4 pb-2.5 pl-4 gap-2 justify-start disabled:opacity-100 disabled:text-disabled-ink disabled:bg-disabled-bg disabled:border-disabled-bg disabled:cursor-not-allowed hover:border-forest bg-page border-control-border text-primary [&:hover:not(:disabled)]:bg-surface-muted [&:active:not(:disabled)]:border-primary"
          type="button"
          onClick={() => setQuery("")}
          data-ui="button button-secondary"
        >
          Reset pencarian
        </button>
        <p
          role="status"
          className="font-normal text-[16px] leading-[23px] font-sans text-muted my-6"
          data-ui="activity-result-status"
        >
          {matches.length} contoh ditemukan
        </p>
        <table
          className="w-full border-collapse table-fixed [&_caption]:text-left [&_caption]:pb-4 [&_caption]:font-normal [&_caption]:text-[14px] [&_caption]:leading-[20px] [&_caption]:font-sans [&_caption]:text-muted [&_th]:pt-4 [&_th]:pr-3 [&_th]:pb-4 [&_th]:pl-3 [&_th]:border-b [&_th]:border-b-border [&_th]:text-left [&_th]:wrap-anywhere [&_td]:pt-4 [&_td]:pr-3 [&_td]:pb-4 [&_td]:pl-3 [&_td]:border-b [&_td]:border-b-border [&_td]:text-left [&_td]:wrap-anywhere [&_th:first-child]:w-[47%] [&_th:first-child]:pl-0 [&_td:first-child]:w-[47%] [&_td:first-child]:pl-0 md:[&_th:first-child]:w-[35%] md:[&_td:first-child]:w-[35%]"
          data-ui="institution-member-table"
        >
          <caption>Daftar contoh sintetis — hanya NIA dan nama</caption>
          <thead>
            <tr>
              <th scope="col">NIA sintetis</th>
              <th scope="col">Nama sintetis</th>
            </tr>
          </thead>
          <tbody>
            {matches.map((m) => (
              <tr key={m.id}>
                <td>{m.nia}</td>
                <td>{m.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {!matches.length && (
          <div
            className="border-t border-t-border py-6 [&>p]:max-w-[60ch] [&>p]:mt-4"
            data-ui="activity-empty"
          >
            <h2
              className="font-semibold text-[26px] leading-[32px] font-editorial [&_a:hover]:underline [&_a:hover]:underline-offset-4 [&_a]:block [&_a]:min-h-11 [&_a]:text-inherit lg:text-[30px] lg:leading-[36px] lg:font-semibold"
              data-ui="content-title"
            >
              Tidak ada contoh yang sesuai.
            </h2>
            <p>Coba sebagian NIA atau nama, atau reset pencarian.</p>
          </div>
        )}
        <EvidenceDisclosure summary="Privasi dan batas katalog">
          <p>
            Tidak ada impor Buku Induk asli, data kontak, foto, status anggota,
            profil atau akun. Pencarian hanya memfilter contoh dalam memori dan
            tidak menyimpan masukan.
          </p>
          <p>
            Data nyata memerlukan otorisasi terpisah, dasar yang sesuai,
            verifikasi ketepatan, pemberitahuan dan mekanisme koreksi atau
            keberatan. Persetujuan desain tidak membuka data anggota.
          </p>
        </EvidenceDisclosure>
      </section>
    </div>
  );
}
