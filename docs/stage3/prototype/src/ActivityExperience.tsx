import { useContentReadModel } from "./ContentReadModel";
import { activityDisplayTitle, documentedDateGroups } from "./domain/read";
import { RelatedRecords, DateEvidence, RecordDate } from "./components/RecordContext";
import { useContext, useEffect } from "react";
import { useActivityRecords } from "./ActivityContent";
import {
  cohortOptions,
  filterPDRecords,
  pdCohortGroups,
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
  type MediaRole,
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
const pdMediaRoles: Record<string, MediaRole> = {
  GH: "gh",
  RC: "rc",
  ORAD: "orad",
  LH: "lh",
  CAVING: "caving",
};

function PDFeatureCard({
  record,
  divisionName,
  filters,
  large,
}: {
  record: ActivityRecord;
  divisionName: string;
  filters: ActivityFilters;
  large: boolean;
}) {
  const role = pdMediaRoles[record.divisionIds?.[0] ?? ""];
  return (
    <article className={`min-w-0 bg-page ${large ? "lg:col-span-3" : "lg:col-span-2"}`} data-ui="pd-feature-card">
      <a
        className="group grid h-full grid-cols-[112px_minmax(0,1fr)] items-start gap-4 p-3 text-inherit no-underline transition-colors duration-150 hover:bg-surface-muted active:bg-leaf focus-visible:outline-3 focus-visible:outline-offset-[-3px] focus-visible:outline-focus [&_[data-ui~=caption]]:hidden md:flex md:flex-col md:gap-0 md:p-4 md:[&_[data-ui~=caption]]:block"
        href={`${record.href}${pdQuery(filters)}`}
        aria-label={record.title}
      >
        {role && (
          <DocumentaryMedia
            role={role}
            recordId={record.id}
            placement="pd-catalogue-feature"
            eager={large}
            fallbackTitle={activityDisplayTitle(record)}
            fallback="Visual kegiatan belum tersedia."
            frame="portrait"
            compact
          />
        )}
        <div className="flex min-w-0 flex-1 flex-col pb-1 md:px-2 md:pt-5 md:pb-2">
          <div className="flex items-baseline justify-between gap-4 border-b border-primary/20 pb-3">
            <p className="font-sans text-[11px]/[17px] font-semibold tracking-[.04em] text-blue uppercase">{divisionName}</p>
            <p className="font-sans text-[12px]/[18px] font-semibold text-muted">Angkatan {record.cohort}</p>
          </div>
          <h3 className={`mt-3 font-editorial text-[22px]/[27px] font-semibold md:mt-5 ${large ? "md:text-[32px]/[37px] lg:text-[38px]/[43px]" : "md:text-[27px]/[33px]"}`}>
            {record.location ?? activityDisplayTitle(record)}
          </h3>
          <p className="mt-3 font-sans text-[13px]/[20px] text-muted"><RecordDate id={record.id} fallback={record.date} /></p>
          <p className="mt-4 hidden text-[16px]/[24px] md:block">{record.summary}</p>
          <span className="mt-auto flex min-h-11 items-center gap-2 pt-3 font-sans text-[13px]/[19px] font-semibold text-muted transition-colors group-hover:text-primary md:pt-6 md:text-[14px]/[20px]">
            Baca catatan <span className="transition-transform duration-150 group-hover:translate-x-1" aria-hidden="true">→</span>
          </span>
        </div>
      </a>
    </article>
  );
}

function PDArchiveCard({
  record,
  divisionName,
  filters,
}: {
  record: ActivityRecord;
  divisionName: string;
  filters: ActivityFilters;
}) {
  return (
    <article className="min-w-0 bg-page" data-ui="pd-archive-card">
      <a
        className="group flex h-full flex-col p-5 text-inherit no-underline transition-colors duration-150 hover:bg-surface-muted active:bg-leaf focus-visible:outline-3 focus-visible:outline-offset-[-3px] focus-visible:outline-focus sm:min-h-64 lg:p-6"
        href={`${record.href}${pdQuery(filters)}`}
        aria-label={record.title}
      >
        <p className="font-sans text-[11px]/[17px] font-semibold tracking-[.04em] text-blue uppercase">{divisionName}</p>
        <h3 className="mt-4 font-editorial text-[26px]/[32px] font-semibold">{record.location ?? activityDisplayTitle(record)}</h3>
        <p className="mt-3 font-sans text-[13px]/[20px] text-muted"><RecordDate id={record.id} fallback={record.date} /></p>
        <p className="mt-4 hidden text-[16px]/[24px] sm:block">{record.summary}</p>
        <span className="mt-auto flex min-h-11 items-center gap-2 pt-3 font-sans text-[14px]/[20px] font-semibold text-muted transition-colors group-hover:text-primary sm:pt-6">
          Baca catatan <span className="transition-transform duration-150 group-hover:translate-x-1" aria-hidden="true">→</span>
        </span>
      </a>
    </article>
  );
}

export function PDCatalogue({ params }: { params: URLSearchParams }) {
  const {
    registry,
    view: { divisions: divisionDefinitions, programmes: programmeDefinitions },
  } = useContentReadModel();
  const records = useActivityRecords().filter((record) => record.programId === "pd");
  const filters = readPDFilters(params, records, divisionDefinitions);
  const matched = filterPDRecords(records, filters);
  const allGroups = pdCohortGroups(records, divisionDefinitions);
  const matchedGroups = pdCohortGroups(matched, divisionDefinitions);
  const isDefault = filters.division === "all" && filters.cohort === "all";
  const feature = isDefault ? allGroups[0] : undefined;
  const archiveGroups = isDefault ? allGroups.slice(1) : matchedGroups;
  const programme = programmeDefinitions.find((candidate) => candidate.id === "pd")!;
  const selectedDivision = divisionDefinitions.find((division) => division.id === filters.division);
  const divisionName = (record: ActivityRecord) =>
    divisionDefinitions.find((division) => record.divisionIds?.includes(division.id))?.name ?? "Pemantapan Divisi";

  useEffect(() => {
    const canonical = `#/program/pd${pdQuery(filters)}`;
    const incoming = `#/program/pd${params.size ? "?" + params.toString() : ""}`;
    if (location.hash === incoming && incoming !== canonical) location.replace(canonical);
  }, [filters.division, filters.cohort, params.toString()]);

  return (
    <div className="wrap-break-word" data-ui="activity-experience pd-catalogue">
      <header className="mx-auto w-[calc(100%_-_32px)] max-w-institution pt-8 pb-12 md:w-[calc(100%_-_48px)] lg:pt-14 lg:pb-18" data-ui="container activity-page-head">
        <p className="font-sans text-[12px]/[18px] font-semibold tracking-[.04em] text-blue uppercase" data-ui="label">Program pendidikan anggota</p>
        <h1 className="mt-4 max-w-[15ch] font-editorial text-[44px]/[46px] font-semibold tracking-[-.02em] max-[360px]:text-[39px]/[42px] lg:text-[68px]/[70px]" data-ui="display">{programme.name}</h1>
        <p className="mt-6 max-w-[58ch] text-[19px]/[29px] lg:text-[22px]/[33px]" data-ui="intro activity-deck">
          Pemantapan Divisi adalah pendidikan lanjutan anggota dalam lima bidang. Setiap angkatan mengembangkan pengetahuan melalui persiapan, praktik lapangan, dan catatan bersama.
        </p>
      </header>

      {feature && (
        <section className="bg-surface-muted py-12 lg:py-18" aria-labelledby="pd-feature-title" data-ui="section pd-feature">
          <div className="mx-auto w-[calc(100%_-_32px)] max-w-institution md:w-[calc(100%_-_48px)]" data-ui="container">
            <div className="mb-7 border-b border-primary/25 pb-5 lg:mb-8">
              <p className="font-sans text-[12px]/[18px] font-semibold tracking-[.04em] text-blue uppercase">Angkatan {feature.cohort}</p>
              <h2 className="mt-3 max-w-[19ch] font-editorial text-[34px]/[39px] font-semibold lg:text-[46px]/[51px]" id="pd-feature-title">Lima bidang, lima pengalaman lapangan.</h2>
            </div>
            <div className="grid gap-px bg-primary/20 md:grid-cols-2 lg:grid-cols-6" data-ui="pd-feature-grid">
              {feature.records.map((record, index) => (
                <PDFeatureCard key={record.id} record={record} divisionName={divisionName(record)} filters={filters} large={index < 2} />
              ))}
            </div>
            <p className="mt-6 max-w-[72ch] font-sans text-[13px]/[20px] text-muted">Visual berlabel “Visual prototipe” merupakan gambar sintetis sementara untuk menilai susunan katalog dan bukan dokumentasi kegiatan.</p>
          </div>
        </section>
      )}

      <section className="mx-auto w-[calc(100%_-_32px)] max-w-institution py-14 md:w-[calc(100%_-_48px)] lg:py-22" aria-labelledby="pd-fields" data-ui="container section pd-divisions">
        <p className="font-sans text-[12px]/[18px] font-semibold tracking-[.04em] text-blue uppercase">Lima bidang pendidikan</p>
        <h2 className="mt-3 max-w-[20ch] font-editorial text-[34px]/[39px] font-semibold lg:text-[46px]/[51px]" id="pd-fields">Ruang belajar yang berbeda.</h2>
        <div className="mt-8 grid gap-px bg-primary/20 md:grid-cols-2 lg:grid-cols-5" data-ui="activity-divisions">
          {divisionDefinitions.map((division, index) => {
            const selected = filters.division === division.id;
            return (
              <a
                className={`group flex flex-col p-5 text-inherit no-underline transition-colors duration-150 focus-visible:outline-3 focus-visible:outline-offset-[-3px] focus-visible:outline-focus lg:min-h-72 lg:p-6 ${selected ? "bg-leaf" : "bg-page hover:bg-surface-muted active:bg-leaf"}`}
                href={`#/program/pd${pdQuery({ ...filters, division: division.id })}`}
                aria-current={selected ? "page" : undefined}
                key={division.id}
                data-ui="activity-division"
              >
                <span className="font-sans text-[11px]/[17px] font-semibold tracking-[.04em] text-blue uppercase">{String(index + 1).padStart(2, "0")} · {division.id}</span>
                <h3 className="mt-5 font-editorial text-[26px]/[32px] font-semibold">{division.name}</h3>
                {division.alias && <p className="mt-1 font-sans text-[13px]/[19px] text-muted">{division.alias}</p>}
                <p className="mt-4 text-[16px]/[24px]">{division.description}</p>
                <span className="mt-auto flex min-h-11 items-center gap-2 pt-6 font-sans text-[14px]/[20px] font-semibold text-muted transition-colors group-hover:text-primary">Jelajahi <span className="transition-transform duration-150 group-hover:translate-x-1" aria-hidden="true">→</span></span>
              </a>
            );
          })}
        </div>
        {filters.division !== "all" && (
          <div className="mt-6"><TextLink href={`#/program/pd${pdQuery({ ...filters, division: "all" })}`} variant="quiet">Tampilkan semua divisi</TextLink></div>
        )}
      </section>

      <section className="bg-surface-muted py-14 lg:py-22" aria-labelledby="pd-results" data-ui="section pd-archive">
        <div className="mx-auto w-[calc(100%_-_32px)] max-w-institution md:w-[calc(100%_-_48px)]" data-ui="container">
          <div className="flex flex-wrap items-end justify-between gap-6 border-b border-primary/25 pb-5">
            <div>
              <p className="font-sans text-[12px]/[18px] font-semibold tracking-[.04em] text-blue uppercase">{isDefault ? "Arsip lintas angkatan" : selectedDivision ? `Divisi ${selectedDivision.name}` : `Angkatan ${filters.cohort}`}</p>
              <h2 className="mt-3 max-w-[20ch] font-editorial text-[34px]/[39px] font-semibold lg:text-[46px]/[51px]" id="pd-results" tabIndex={-1}>{isDefault ? "Angkatan sebelumnya." : selectedDivision ? `${selectedDivision.name} lintas angkatan.` : `Catatan Angkatan ${filters.cohort}.`}</h2>
            </div>
            {!isDefault && <TextLink href="#/program/pd" variant="quiet">Tampilkan semua catatan</TextLink>}
          </div>
          <p className="sr-only" role="status" aria-live="polite">{matched.length} catatan Pemantapan Divisi ditampilkan.</p>
          {archiveGroups.length ? archiveGroups.map((group) => (
            <section className="pt-10 lg:pt-14" key={group.cohort} data-ui="pd-cohort-group" data-cohort={group.cohort}>
              <div className="mb-5 flex items-baseline justify-between gap-4">
                <h3 className="font-editorial text-[27px]/[33px] font-semibold lg:text-[32px]/[38px]">Angkatan {group.cohort}</h3>
                {filters.cohort === "all" && <a className="font-sans text-[13px]/[19px] font-semibold text-muted no-underline hover:text-primary focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-focus" href={`#/program/pd${pdQuery({ ...filters, cohort: group.cohort })}`}>Lihat angkatan →</a>}
              </div>
              <div className="grid gap-px bg-primary/20 md:grid-cols-2 lg:grid-cols-3" data-ui="pd-cohort-grid">
                {group.records.map((record) => <PDArchiveCard key={record.id} record={record} divisionName={divisionName(record)} filters={filters} />)}
              </div>
            </section>
          )) : (
            <div className="py-10">
              <h3 className="font-editorial text-[27px]/[33px] font-semibold">Belum ada catatan yang sesuai.</h3>
              <p className="mt-4 max-w-[60ch] text-[17px]/[26px]">Batas isi katalog ini tidak menetapkan bahwa kegiatan tidak pernah berlangsung.</p>
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto w-[calc(100%_-_32px)] max-w-institution py-12 md:w-[calc(100%_-_48px)] lg:py-18" data-ui="container section pd-source-note">
        <EvidenceDisclosure summary="Catatan sumber">
          <p>Tujuan dan rangkaian pendidikan bersumber dari LPJ Pengurus 2023–2024 dan 2025. Lima bidang dan ruang belajarnya diringkas dari standar pendidikan dalam dokumen 2025.</p>
          <p>Daftar ini memuat kegiatan historis yang terdokumentasi. Hubungan angkatan bersifat kontekstual, dan kombinasi yang tidak muncul bukan bukti bahwa kegiatan tidak pernah berlangsung.</p>
          <p>Standar teknis merupakan rujukan pendidikan dan tidak dipakai sebagai klaim pencapaian peserta.</p>
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
