import { useContentReadModel } from "./ContentReadModel";
import { documentedDateGroups } from "./domain/read";
import { RelatedRecords, DateEvidence } from "./components/RecordContext";
import { useContext, useEffect } from "react";
import { useActivityRecords } from "./ActivityContent";
import {
  cohortOptions,
  filterPDRecords,
  pdQuery,
  readPDFilters,
  type ActivityFilters,
  type ActivityRecord,
} from "./activity-model";
import {
  ActivityMetadata,
  ActivityPreview,
  Breadcrumbs,
  MediaContext,
  CanonicalMediaContext,
  DocumentaryMedia,
  EvidenceDisclosure,
  ProgrammeEntry,
  SectionHeading,
  TextLink,
} from "./components/Foundation";
import { resolvePublicMedia } from "./domain/validate.ts";
import { Button } from "./components/Button";
const kindLabels = {
  expedition: "Ekspedisi",
  "environmental-service": "Kegiatan lingkungan",
  "division-education": "Pendidikan divisi",
  "basic-education": "Pendidikan dasar",
  "institutional-continuity": "Tradisi organisasi",
  workshop: "Lokakarya",
};
function catalogueHref(record: ActivityRecord, filters: ActivityFilters) {
  return record.programId === "pd"
    ? `#/program/pd${pdQuery(filters)}`
    : "#/activities";
}
function setPDFilters(filters: ActivityFilters, focusResults = false) {
  location.hash = `/program/pd${pdQuery(filters)}`;
  if (focusResults) {
    const heading = document.getElementById("pd-results");
    heading?.scrollIntoView({
      block: "start",
    });
    heading?.focus({
      preventScroll: true,
    });
  }
}
export function PDCatalogue({ params }: { params: URLSearchParams }) {
  const {
    registry,
    view: { divisions: divisionDefinitions, programmes: programmeDefinitions },
  } = useContentReadModel();
  const records = useActivityRecords().filter((r) => r.programId === "pd");
  const filters = readPDFilters(params, records, divisionDefinitions);
  const matched = filterPDRecords(records, filters);
  const ordered = documentedDateGroups(registry, matched);
  const shown = [...ordered.dated, ...ordered.undated];
  const cohorts = cohortOptions(records);
  const updateFilters = (patch: Partial<ActivityFilters>, focus = false) => {
    const current = readPDFilters(
      new URLSearchParams(location.hash.split("?")[1] ?? ""),
      records,
      divisionDefinitions,
    );
    setPDFilters(
      {
        ...current,
        ...patch,
      },
      focus,
    );
  };
  const label = divisionDefinitions.find(
    (d) => d.id === filters.division,
  )?.name;
  const programme = programmeDefinitions.find((p) => p.id === "pd")!;
  // Invalid/outdated deep-link facets normalize to supported values. URL, controls
  // and result projection have one source of truth; no remembered hidden filter.
  useEffect(() => {
    const canonical = `#/program/pd${pdQuery(filters)}`;
    const incoming = `#/program/pd${params.size ? "?" + params.toString() : ""}`;
    if (location.hash === incoming && incoming !== canonical)
      location.replace(canonical);
  }, [filters.division, filters.cohort, params.toString()]);
  return (
    <div className="wrap-break-word" data-ui="activity-experience">
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
              label: programme.name,
            },
          ]}
        />
        <p
          className="font-semibold text-[12px] leading-[18px] font-sans uppercase tracking-[.02em] text-blue"
          data-ui="label"
        >
          Program / pendidikan anggota
        </p>
        <h1
          className="font-semibold text-[36px] leading-[38.9px] font-editorial max-[360px]:text-[32px] max-[360px]:leading-[34.6px] lg:text-[56px] lg:leading-[60.5px] lg:[&>span]:block"
          data-ui="display"
        >
          {programme.name}
        </h1>
        <p
          className="text-[17px] leading-[25px] lg:text-[20px] lg:leading-[29px] max-w-[66ch] mt-6"
          data-ui="intro activity-deck"
        >
          {programme.description} Latihan, persiapan, spesialisasi lapangan, dan
          presentasi laporan menjadi bagian dari proses belajar.
        </p>
        <p
          className="text-[17px] leading-[25px] lg:text-[19px] lg:leading-[28px] max-w-[70ch] mt-4"
          data-ui="body activity-support"
        >
          Lima bidang memiliki ruang belajar yang berbeda. Catatan kegiatan
          dapat ditelusuri menurut bidang dan angkatan yang memang tercatat,
          tanpa menjadikan angkatan sebagai syarat setiap kegiatan.
        </p>
        <button
          type="button"
          className="inline-flex items-center rounded-control px-5 py-2.5 transition-colors min-h-11.5 rounded-control text-[17px] leading-[24px] font-semibold pt-2.5 pr-4 pb-2.5 pl-4 gap-2 justify-start disabled:opacity-100 disabled:text-disabled-ink disabled:bg-disabled-bg disabled:border-disabled-bg disabled:cursor-not-allowed hover:border-forest border-control-border text-primary [&:hover:not(:disabled)]:bg-surface-muted [&:active:not(:disabled)]:border-primary mt-6 max-w-[38em] w-full text-left bg-transparent border-0 hover:underline hover:underline-offset-4 [&[data-ui~=button]]:w-fit [&[data-ui~=button]]:flex [&[data-ui~=button]]:gap-4 [&[data-ui~=button]]:bg-page [&[data-ui~=button]]:border [&[data-ui~=button]]:border-control-border [&[data-ui~=button]]:no-underline"
          onClick={() => {
            const results = document.getElementById("pd-results");
            results?.scrollIntoView({
              block: "start",
            });
            results?.focus({
              preventScroll: true,
            });
          }}
          data-ui="button button-secondary activity-jump"
        >
          Langsung ke kegiatan & filter<span aria-hidden="true">↓</span>
        </button>
      </header>
      <section
        className="w-[calc(100%_-_32px)] max-w-institution mx-auto md:w-[calc(100%_-_48px)] pb-14 lg:pb-22"
        aria-labelledby="pd-fields"
        data-ui="container section"
      >
        <p
          className="font-semibold text-[12px] leading-[18px] font-sans uppercase tracking-[.02em] text-blue"
          data-ui="label"
        >
          Lima bidang pendidikan
        </p>
        <h2
          className="font-semibold text-[30px] leading-[35px] font-editorial lg:text-[40px] lg:leading-[46px] lg:font-semibold"
          id="pd-fields"
          data-ui="section-title"
        >
          Pilih ruang belajarnya.
        </h2>
        <p
          className="text-[16px] leading-[23px] text-muted max-w-[70ch] mt-4"
          data-ui="metadata activity-support"
        >
          Gambaran bidang merujuk dokumen 2025; bukan pernyataan bahwa seluruh
          standar atau hasil teknis telah terpenuhi.
        </p>
        <div
          className="grid gap-6 mt-8 md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-y-10 lg:gap-x-8"
          data-ui="activity-divisions"
        >
          {divisionDefinitions.map((division, i) => (
            <article
              className="border-t-2 border-t-primary pt-4 flex flex-col [&>[data-ui~=content-title]]:mt-4 [&>p]:mt-3 [&>[data-ui~=link]]:mt-auto [&>[data-ui~=link]]:pt-4 [&>[data-ui~=link]]:pb-0 [&>[data-ui~=link]]:border-0 [&>[data-ui~=link]]:bg-transparent [&>[data-ui~=link]]:text-left [&>[data-ui~=link]]:min-h-15 [&>[data-ui~=link]:hover]:underline [&>[data-ui~=link]:hover]:underline-offset-4 [&_[aria-pressed=true]]:underline [&_[aria-pressed=true]]:underline-offset-4"
              key={division.id}
              data-ui="activity-division"
            >
              <span
                className="font-semibold text-[12px] leading-[18px] font-sans uppercase tracking-[.02em] text-blue"
                aria-hidden="true"
                data-ui="label"
              >
                0{i + 1} / {division.id}
              </span>
              <h3
                className="font-semibold text-[26px] leading-[32px] font-editorial [&_a:hover]:underline [&_a:hover]:underline-offset-4 [&_a]:block [&_a]:min-h-11 [&_a]:text-inherit lg:text-[30px] lg:leading-[36px] lg:font-semibold"
                data-ui="content-title"
              >
                {division.name}
              </h3>
              {division.alias && (
                <p
                  className="text-[16px] leading-[23px] text-muted"
                  data-ui="metadata"
                >
                  {division.alias}
                </p>
              )}
              <p>{division.description}</p>
              <button
                type="button"
                className="flex items-center justify-start gap-4 min-h-11 font-semibold text-[17px] leading-[24px] font-sans text-primary no-underline w-fit max-w-full [&>span:last-child]:shrink-0 [&:hover>span:first-child]:underline [&:hover>span:first-child]:underline-offset-4"
                aria-pressed={filters.division === division.id}
                onClick={() =>
                  updateFilters(
                    {
                      division: division.id,
                    },
                    true,
                  )
                }
                data-ui="link"
              >
                Lihat {division.name}
                <span aria-hidden="true">↓</span>
              </button>
            </article>
          ))}
        </div>
      </section>
      <section
        className="w-[calc(100%_-_32px)] max-w-institution mx-auto md:w-[calc(100%_-_48px)] pb-14 lg:pb-22"
        aria-labelledby="pd-results"
        data-ui="container section"
      >
        <h2
          className="scroll-mt-6 font-semibold text-[30px] leading-[35px] font-editorial lg:text-[40px] lg:leading-[46px] lg:font-semibold"
          id="pd-results"
          tabIndex={-1}
          data-ui="section-title"
        >
          Catatan Pemantapan Divisi
        </h2>
        <div
          className="flex items-end flex-wrap gap-6 mt-6 [&_label]:block [&_label]:font-semibold [&_label]:min-w-0 [&_label]:w-full [&_[data-ui~=field]]:mt-2 [&_[data-ui~=field]]:w-full [&_[data-ui~=field]]:font-normal [&>[data-ui~=button]]:mb-0.25 md:[&_label]:w-60"
          data-ui="activity-filters"
        >
          <label>
            Divisi
            <select
              className="w-full rounded-control border bg-surface px-3 py-2 text-base min-h-12 border-control-border rounded-control"
              aria-label="Filter divisi"
              value={filters.division}
              onChange={(e) =>
                updateFilters({
                  division: e.target.value,
                })
              }
              data-ui="field"
            >
              <option value="all">Semua divisi</option>
              {divisionDefinitions.map((d) => (
                <option value={d.id} key={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Angkatan
            <select
              className="w-full rounded-control border bg-surface px-3 py-2 text-base min-h-12 border-control-border rounded-control"
              aria-label="Filter angkatan"
              value={filters.cohort}
              onChange={(e) =>
                updateFilters({
                  cohort: e.target.value,
                })
              }
              data-ui="field"
            >
              <option value="all">Semua angkatan</option>
              {cohorts.map((c) => (
                <option value={c} key={c}>
                  {c}
                </option>
              ))}
              {records.some((r) => !r.cohortIds?.length) && (
                <option value="none">Tanpa angkatan tercatat</option>
              )}
            </select>
          </label>
          <Button
            variant="secondary"
            onClick={() =>
              setPDFilters({
                division: "all",
                cohort: "all",
              })
            }
            disabled={filters.division === "all" && filters.cohort === "all"}
          >
            Reset filter
          </Button>
        </div>
        <p
          role="status"
          aria-live="polite"
          className="font-normal text-[16px] leading-[23px] font-sans text-muted my-6"
          data-ui="activity-result-status"
        >
          {shown.length} catatan{label ? ` / ${label}` : " / semua divisi"}
          {filters.cohort !== "all"
            ? ` / ${filters.cohort === "none" ? "tanpa angkatan tercatat" : filters.cohort}`
            : ""}
        </p>
        <p className="text-[14px] leading-[20px] text-muted" data-ui="caption">
          Terbaru menurut tanggal yang terdokumentasi. Tanggal perkiraan tetap
          ditandai; catatan tanpa tanggal dipisahkan.
        </p>
        {shown.length ? (
          <div data-activity-results>
            {ordered.dated.map((record) => (
              <ActivityPreview
                key={record.id}
                activity={{
                  ...record,
                  href: `${record.href}${pdQuery(filters)}`,
                }}
              />
            ))}
            {!!ordered.undated.length && (
              <h3
                className="font-semibold text-[26px] leading-[32px] font-editorial [&_a:hover]:underline [&_a:hover]:underline-offset-4 [&_a]:block [&_a]:min-h-11 [&_a]:text-inherit lg:text-[30px] lg:leading-[36px] lg:font-semibold"
                data-ui="content-title"
              >
                Waktu belum diketahui
              </h3>
            )}
            {ordered.undated.map((record) => (
              <ActivityPreview
                key={record.id}
                activity={{
                  ...record,
                  href: `${record.href}${pdQuery(filters)}`,
                }}
              />
            ))}
          </div>
        ) : (
          <div
            className="border-t border-t-border py-6 [&>p]:max-w-[60ch] [&>p]:mt-4"
            data-ui="activity-empty"
          >
            <h3
              className="font-semibold text-[26px] leading-[32px] font-editorial [&_a:hover]:underline [&_a:hover]:underline-offset-4 [&_a]:block [&_a]:min-h-11 [&_a]:text-inherit lg:text-[30px] lg:leading-[36px] lg:font-semibold"
              data-ui="content-title"
            >
              Belum ada catatan yang sesuai.
            </h3>
            <p>
              Ini batas isi katalog yang tersedia, bukan bukti kegiatan tidak
              pernah berlangsung. Ubah pilihan atau gunakan Reset filter.
            </p>
          </div>
        )}
      </section>
      <section
        className="w-[calc(100%_-_32px)] max-w-institution mx-auto md:w-[calc(100%_-_48px)] pb-14 lg:pb-22"
        data-ui="container section"
      >
        <EvidenceDisclosure summary="Tentang program dan isi katalog">
          <p>
            Tujuan dan rangkaian pendidikan bersumber dari LPJ Pengurus
            2023–2024 dan 2025. Lima bidang dan ruang belajarnya diringkas dari
            standar pendidikan dalam dokumen 2025.
          </p>
          <p>
            Daftar ini memuat kegiatan historis yang terdokumentasi.
            Pelaksanaan, kelengkapan laporan, dan izin publikasi media ditinjau
            secara terpisah. Angkatan merupakan hubungan kontekstual; bukan
            induk wajib semua kegiatan.
          </p>
        </EvidenceDisclosure>
      </section>
    </div>
  );
}
export function ActivitiesCatalogue({
  params = new URLSearchParams(),
}: {
  params?: URLSearchParams;
}) {
  const query = params.get("q") ?? "";
  const search = (text: string) => {
    location.hash =
      "/activities" +
      (text
        ? "?" +
          new URLSearchParams({
            q: text,
          })
        : "");
  };
  const {
    registry,
    view: { divisions: divisionDefinitions, programmes: programmeDefinitions },
  } = useContentReadModel();
  const records = useActivityRecords().filter((r) => !r.programId);
  const matches = records.filter(
    (r) =>
      r.editorial.verification !== "synthetic" &&
      `${r.title} ${r.summary} ${r.location ?? ""}`
        .toLocaleLowerCase("id")
        .includes(query.trim().toLocaleLowerCase("id")),
  );
  const ordered = documentedDateGroups(registry, matches);
  const historical = [...ordered.dated, ...ordered.undated];
  const demonstrations = records.filter(
    (r) => r.editorial.verification === "synthetic",
  );
  return (
    <div className="wrap-break-word" data-ui="activity-experience">
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
              label: "Kegiatan",
            },
          ]}
        />
        <p
          className="font-semibold text-[12px] leading-[18px] font-sans uppercase tracking-[.02em] text-blue"
          data-ui="label"
        >
          Kegiatan Tursina
        </p>
        <h1
          className="font-semibold text-[36px] leading-[38.9px] font-editorial max-[360px]:text-[32px] max-[360px]:leading-[34.6px] lg:text-[56px] lg:leading-[60.5px] lg:[&>span]:block"
          data-ui="display"
        >
          Kerja bersama, dalam banyak bentuk.
        </h1>
        <p
          className="text-[17px] leading-[25px] lg:text-[20px] lg:leading-[29px] max-w-[66ch] mt-6"
          data-ui="intro activity-deck"
        >
          Pendidikan dasar, napak tilas, dan kehidupan organisasi mempunyai
          catatan tersendiri. Jelajahi kegiatan yang terdokumentasi, termasuk
          yang tidak berada di bawah program Tursina Explore atau Pemantapan
          Divisi.
        </p>
      </header>
      <section
        className="w-[calc(100%_-_32px)] max-w-institution mx-auto md:w-[calc(100%_-_48px)] pb-14 lg:pb-22"
        data-ui="container section"
      >
        <SectionHeading
          label="Arsip kegiatan"
          title="Pendidikan dan kesinambungan organisasi"
          description="Identitas, tanggal, dan kedalaman cerita mengikuti sumber yang tersedia. Bukan daftar kegiatan terkini."
        />
        <label>
          Cari kegiatan
          <input
            className="w-full rounded-control border bg-surface px-3 py-2 text-base min-h-12 border-control-border rounded-control"
            type="search"
            value={query}
            onChange={(e) => search(e.target.value)}
            data-ui="field"
          />
        </label>
        <Button variant="secondary" onClick={() => search("")}>
          Reset pencarian
        </Button>
        <p role="status">{historical.length} catatan</p>
        <p className="text-[14px] leading-[20px] text-muted" data-ui="caption">
          Terbaru menurut tanggal yang terdokumentasi; catatan tanpa tanggal
          berada dalam kelompok tersendiri.
        </p>
        <div data-activity-results>
          {historical.map((record) => (
            <div key={record.id}>
              {ordered.undated[0]?.id === record.id && (
                <h3
                  className="font-semibold text-[26px] leading-[32px] font-editorial [&_a:hover]:underline [&_a:hover]:underline-offset-4 [&_a]:block [&_a]:min-h-11 [&_a]:text-inherit lg:text-[30px] lg:leading-[36px] lg:font-semibold"
                  data-ui="content-title"
                >
                  Waktu belum diketahui
                </h3>
              )}
              <ActivityPreview
                activity={{
                  ...record,
                  href:
                    record.href +
                    (query
                      ? "?" +
                        new URLSearchParams({
                          q: query,
                        })
                      : ""),
                }}
              />
            </div>
          ))}
        </div>
        {!historical.length && (
          <p>Tidak ada catatan yang sesuai. Ubah atau reset pencarian.</p>
        )}
      </section>
      <section
        className="w-[calc(100%_-_32px)] max-w-institution mx-auto md:w-[calc(100%_-_48px)] pb-14 lg:pb-22"
        data-ui="container section"
      >
        <SectionHeading
          label="Jelajahi program"
          title="Perjalanan dan pendidikan lanjutan"
        />
        <div
          className="grid gap-8 md:grid-cols-2"
          data-ui="activity-programmes"
        >
          {programmeDefinitions.map((p, i) => (
            <ProgrammeEntry
              key={p.id}
              index={`0${i + 1}`}
              title={p.name}
              description={p.description}
              href={p.href}
              action={`Buka ${p.name}`}
            />
          ))}
        </div>
      </section>
      {demonstrations.length > 0 && (
        <section
          className="w-[calc(100%_-_32px)] max-w-institution mx-auto md:w-[calc(100%_-_48px)] pb-14 lg:pb-22 border-t border-t-border pt-8"
          data-ui="container section activity-demo"
        >
          <SectionHeading
            label="Contoh prototipe / sintetis"
            title="Contoh kegiatan mandiri"
            description="Bagian ini menguji bentuk catatan. Bukan kegiatan, rencana, atau jadwal penerimaan anggota yang berlaku."
          />
          {demonstrations.map((record) => (
            <ActivityPreview key={record.id} activity={record} />
          ))}
        </section>
      )}
    </div>
  );
}
function Classification({ record }: { record: ActivityRecord }) {
  const {
    view: { divisions: divisionDefinitions, programmes: programmeDefinitions },
  } = useContentReadModel();
  const programme = programmeDefinitions.find((p) => p.id === record.programId);
  const fields = divisionDefinitions.filter((d) =>
    record.divisionIds?.includes(d.id),
  );
  if (!programme && !fields.length && !record.cohortIds?.length) return null;
  return (
    <dl
      className="flex flex-wrap gap-y-4 gap-x-8 mt-6 [&_dt]:font-normal [&_dt]:text-[14px] [&_dt]:leading-[20px] [&_dt]:font-sans [&_dt]:text-muted [&_dd]:mt-1 [&_a]:flex [&_a]:items-center [&_a]:min-h-11 [&_a]:underline [&_a]:underline-offset-4 [&_a]:text-primary"
      data-ui="activity-classification"
    >
      {programme && (
        <div>
          <dt>Program</dt>
          <dd>
            <a href={programme.href}>{programme.name}</a>
          </dd>
        </div>
      )}
      {fields.length > 0 && (
        <div>
          <dt>Bidang</dt>
          <dd>{fields.map((d) => d.name).join(" · ")}</dd>
        </div>
      )}
      {!!record.cohortIds?.length && (
        <div>
          <dt>Angkatan</dt>
          <dd>{record.cohortIds.join(" · ")}</dd>
        </div>
      )}
    </dl>
  );
}
export function ActivityDetail({
  id,
  params,
}: {
  id: string;
  params: URLSearchParams;
}) {
  const {
    view: {
      activityMedia,
      sources: activitySources,
      divisions: divisionDefinitions,
      programmes: programmeDefinitions,
    },
  } = useContentReadModel();
  const records = useActivityRecords();
  const reviewMedia = useContext(MediaContext);
  const mediaRegistry = useContext(CanonicalMediaContext);
  const record = records.find((r) => r.id === id);
  if (!record)
    return (
      <div
        className="w-[calc(100%_-_32px)] max-w-institution mx-auto md:w-[calc(100%_-_48px)] pt-4 pb-10 [&>[data-ui~=display]]:mt-3 [&>[data-ui~=metadata-inline]]:mt-6 [&>[data-ui~=link]]:mt-6 [&>[data-ui~=link]]:max-w-[38em] lg:pt-6 lg:pb-14"
        data-ui="container activity-page-head"
      >
        <h1
          className="font-semibold text-[36px] leading-[38.9px] font-editorial max-[360px]:text-[32px] max-[360px]:leading-[34.6px] lg:text-[56px] lg:leading-[60.5px] lg:[&>span]:block"
          data-ui="display"
        >
          Catatan belum tersedia.
        </h1>
        <TextLink href="#/activities">Kembali ke kegiatan</TextLink>
      </div>
    );
  const filters = readPDFilters(
    params,
    records.filter((r) => r.programId === "pd"),
    divisionDefinitions,
  );
  const back =
    record.programId === "pd"
      ? catalogueHref(record, filters)
      : "#/activities" +
        (params.get("q")
          ? "?" +
            new URLSearchParams({
              q: params.get("q")!,
            })
          : "");
  const programme = programmeDefinitions.find((p) => p.id === record.programId);
  const media = activityMedia.filter((m) => record.mediaIds?.includes(m.id));
  const cleared = resolvePublicMedia(
    mediaRegistry,
    record.id,
    "activity-documentary",
  );
  const displayedMedia = media.filter(
    (m) =>
      record.depth === "rich" ||
      reviewMedia[m.role] ||
      cleared.some((a) => a.id === m.id),
  );
  const related = records.filter(
    (r) =>
      r.id !== record.id &&
      record.programId === "pd" &&
      r.programId === "pd" &&
      r.divisionIds?.some((d) => record.divisionIds?.includes(d)),
  );
  const synthetic = record.editorial.verification === "synthetic";
  return (
    <article
      className="wrap-break-word"
      data-activity-id={record.id}
      data-ui="activity-experience"
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
              label: programme?.name ?? "Kegiatan",
              href: back,
            },
            {
              label: record.title,
            },
          ]}
        />
        <p
          className="font-semibold text-[12px] leading-[18px] font-sans uppercase tracking-[.02em] text-blue"
          data-ui="label"
        >
          {synthetic
            ? "Contoh sintetis / bukan kegiatan aktual"
            : kindLabels[record.kind]}
        </p>
        <h1
          className="font-semibold text-[36px] leading-[38.9px] font-editorial max-[360px]:text-[32px] max-[360px]:leading-[34.6px] lg:text-[56px] lg:leading-[60.5px] lg:[&>span]:block max-w-[26ch]"
          data-ui="display activity-title"
        >
          {record.title}
        </h1>
        <p
          className="text-[17px] leading-[25px] lg:text-[20px] lg:leading-[29px] max-w-[66ch] mt-6"
          data-ui="intro activity-deck"
        >
          {record.summary}
        </p>
        <ActivityMetadata activity={record} inline />
        {record.location && (
          <p
            className="text-[16px] leading-[23px] text-muted mt-2"
            data-ui="metadata activity-place"
          >
            {record.location}
          </p>
        )}
        {!!record.uncertainties?.length && (
          <ul
            className="max-w-[70ch] mt-3 pl-6 text-[15px] leading-[23px] text-muted list-disc"
            data-ui="activity-precision"
          >
            {record.uncertainties.map((n) => (
              <li key={n.title}>
                <strong>{n.title}.</strong> {n.explanation}
              </li>
            ))}
          </ul>
        )}
        <Classification record={record} />
        <TextLink href={back}>
          {programme ? "Kembali ke katalog PD" : "Kembali ke katalog kegiatan"}
        </TextLink>
      </header>
      {(!!record.chapters?.length || displayedMedia.length > 0) && (
        <div
          className={` w-[calc(100%_-_32px)] max-w-institution mx-auto md:w-[calc(100%_-_48px)] pb-14 lg:pb-22 grid gap-8 [&:has([data-ui~=activity-media]:empty)]:block md:[&[data-ui~=activity-with-media]]:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] md:[&[data-ui~=activity-with-media]]:gap-10 lg:[&[data-ui~=activity-with-media]]:gap-18 ${displayedMedia.length ? "" : ""}  `}
          data-ui={`container section activity-documentary${displayedMedia.length ? " activity-with-media" : ""}`}
        >
          <div>
            {record.chapters?.map((chapter) => (
              <section
                className="[&+[data-ui~=activity-chapter]]:mt-10 lg:[&+[data-ui~=activity-chapter]]:mt-14"
                key={chapter.id}
                data-ui="activity-chapter"
              >
                <h2
                  className="font-semibold text-[30px] leading-[35px] font-editorial lg:text-[40px] lg:leading-[46px] lg:font-semibold"
                  data-ui="section-title"
                >
                  {chapter.title}
                </h2>
                <div
                  className="max-w-[66ch] font-normal text-[18px] leading-[28px] font-editorial mt-6 [&_p+p]:mt-6 lg:text-[20px] lg:leading-[31px]"
                  data-ui="reading"
                >
                  {chapter.paragraphs.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
          {displayedMedia.length > 0 && (
            <aside
              className="min-w-0 [&>[data-ui~=media]:not([data-media-role=kawi],[data-media-role=batafia])]:max-w-75 [&>[data-ui~=media]]:mx-auto [&>[data-media-role=kawi]]:max-w-full [&>[data-media-role=batafia]]:max-w-full [&_[data-ui~=media-fallback]]:p-4 [&_[data-ui~=media-fallback]_[data-ui~=content-title]]:font-semibold [&_[data-ui~=media-fallback]_[data-ui~=content-title]]:text-[23px] [&_[data-ui~=media-fallback]_[data-ui~=content-title]]:leading-[29px] [&_[data-ui~=media-fallback]_[data-ui~=content-title]]:font-sans"
              data-ui="activity-media"
            >
              {displayedMedia.map((m) => (
                <DocumentaryMedia
                  key={m.id}
                  role={m.role}
                  recordId={record.id}
                  placement="activity-documentary"
                  omitWhenUnavailable={record.depth === "basic"}
                  fallbackTitle={m.title}
                  fallback={m.context}
                />
              ))}
            </aside>
          )}
        </div>
      )}
      {record.learning && (
        <section
          className="bg-surface-muted pt-8 mb-14 [&_[data-ui~=section-heading]]:max-w-[66ch] [&_ul]:list-disc [&_ul]:max-w-[66ch] [&_ul]:pl-6 [&_ul]:grid [&_ul]:gap-4 lg:pt-14 lg:mb-22 pb-14 lg:pb-22"
          data-ui="activity-learning section"
        >
          <div
            className="w-[calc(100%_-_32px)] max-w-institution mx-auto md:w-[calc(100%_-_48px)]"
            data-ui="container"
          >
            <SectionHeading
              label="Ruang belajar / dokumen historis"
              title={record.learning.title}
              description={record.learning.context}
            />
            <ul>
              {record.learning.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>
      )}
      <RelatedRecords id={record.id} />
      {related.length > 0 && (
        <section
          className="w-[calc(100%_-_32px)] max-w-institution mx-auto md:w-[calc(100%_-_48px)] pb-14 lg:pb-22"
          data-ui="container section"
        >
          <SectionHeading
            label="Bidang yang sama"
            title="Telusuri catatan lainnya."
            description="Setiap kegiatan tetap memiliki identitas dan dasar catatannya sendiri."
          />
          {related.map((r) => (
            <ActivityPreview key={r.id} activity={r} />
          ))}
        </section>
      )}
      <section
        className="w-[calc(100%_-_32px)] max-w-institution mx-auto md:w-[calc(100%_-_48px)] pb-14 lg:pb-22 [&>[data-ui~=link]]:max-w-[38em] [&>[data-ui~=link]]:mt-6"
        data-ui="container section activity-sources"
      >
        <EvidenceDisclosure>
          <DateEvidence id={record.id} />
          {record.sourceUses.map((use) => (
            <p key={`${use.sourceId}-${use.locator}`}>
              <strong>
                {activitySources.find((s) => s.id === use.sourceId)?.label}
              </strong>{" "}
              — {use.locator}.
            </p>
          ))}
          {record.materials?.length ? (
            <div
              className="mt-6 [&_ul]:pl-6 [&_ul]:list-disc"
              data-ui="activity-materials"
            >
              <p
                className="font-semibold text-[12px] leading-[18px] font-sans uppercase tracking-[.02em] text-blue"
                data-ui="label"
              >
                Rujukan materi / bukan unduhan publik
              </p>
              <ul>
                {record.materials.map((m) => (
                  <li key={m.title}>{m.title}</li>
                ))}
              </ul>
            </div>
          ) : null}
          {!synthetic && (
            <p>
              Ringkasan publik tidak mereproduksi laporan asli, data peserta
              atau lampiran privat. Standar pembelajaran tidak otomatis menjadi
              bukti pencapaian teknis atau pengesahan laporan.
            </p>
          )}
          {record.editorial.report === "submission-delays-reported" && (
            <p>
              LPJ mencatat keterlambatan pengumpulan laporan PD XXIX secara
              umum. Halaman ini tidak menetapkan pengesahan laporan
              masing-masing divisi.
            </p>
          )}
          {media.length > 0 && (
            <p>
              Dokumentasi telah ditinjau untuk desain privat. Hak pencipta,
              kredit, privasi dan izin penggunaan gambar tetap diperiksa per
              aset; gambar HOLD tidak masuk tampilan publik.
            </p>
          )}
        </EvidenceDisclosure>
        <TextLink href={back}>
          {programme
            ? "Semua catatan Pemantapan Divisi"
            : "Semua kegiatan Tursina"}
        </TextLink>
      </section>
    </article>
  );
}
