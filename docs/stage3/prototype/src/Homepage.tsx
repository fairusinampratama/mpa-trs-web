import { activityDisplayTitle } from "./domain/read";
import { useContentReadModel } from "./ContentReadModel";
import {
  ActionLink,
  ActivityPreview,
  DocumentaryMedia,
  ProgrammeEntry,
  PublicationPreview,
  SectionHeading,
  TextLink,
} from "./components/Foundation";
export function IdentityOpening() {
  const { view } = useContentReadModel();
  return (
    <section
      className="w-[calc(100%_-_32px)] max-w-institution mx-auto md:w-[calc(100%_-_48px)] pt-6 pb-14 [&_[data-ui~=display]]:mt-3.5 [&_[data-ui~=display]]:mb-4.5 [&>[data-ui~=media]]:mt-6 [&>[data-ui~=media-fallback]]:mt-6 lg:grid lg:pb-22 lg:[&>[data-ui~=media]]:mt-0 lg:[&>[data-ui~=media-fallback]]:mt-0 wide:gap-22 grid gap-10 md:grid-cols-[1.4fr_1fr] relative lg:grid-cols-[minmax(0,440fr)_minmax(0,646fr)] lg:gap-22 lg:items-center lg:pt-16 lg:[&_[data-ui~=affiliation]::before]:hidden lg:[&_[data-ui~=display]]:text-[54px] lg:[&_[data-ui~=display]]:leading-[58px]"
      aria-labelledby="identity-title"
      data-ui="container identity home-hero"
    >
      <div className="lg:pl-0" data-ui="identity-copy home-hero-copy">
        <p
          className="text-[14px] leading-[20px] font-semibold text-blue relative [&:before]:content-[''] [&:before]:block [&:before]:w-12 [&:before]:h-0.5 [&:before]:bg-gold [&:before]:absolute [&:before]:-top-3 [&:before]:m-0 lg:text-[17px] lg:leading-[24px]"
          data-ui="affiliation"
        >
          MAPALA Tursina · {view.information.affiliation}
        </p>
        <h1
          className="font-semibold text-[36px] leading-[38.9px] font-editorial max-[360px]:text-[32px] max-[360px]:leading-[34.6px] lg:text-[56px] lg:leading-[60.5px] lg:[&>span]:block"
          id="identity-title"
          data-ui="display"
        >
          <span>Belajar di alam.</span> <span>Bertumbuh bersama.</span>
        </h1>
        <p
          className="text-[17px] leading-[25px] lg:text-[20px] lg:leading-[29px]"
          data-ui="intro"
        >
          MAPALA Tursina adalah unit kegiatan mahasiswa yang menjadikan
          pendidikan lapangan, ekspedisi, kegiatan ilmiah, dan pengabdian
          sebagai ruang belajar bersama.
        </p>
        <div
          className="mt-6 flex flex-col gap-2 md:flex-row lg:[&_[data-ui~=button]:first-child]:min-w-51.25 lg:[&_[data-ui~=button]:last-child]:min-w-45.5 lg:gap-4"
          data-ui="hero-actions"
        >
          <ActionLink href="#/activities">Jelajahi kegiatan</ActionLink>
          <ActionLink href="#/about" secondary>
            Kenali Tursina
          </ActionLink>
        </div>
      </div>
      <DocumentaryMedia
        role="identity"
        recordId="kawi29"
        placement="home-opening"
        eager
        fallbackTitle="Pendidikan dan perjalanan lintas generasi."
        fallback="Pendidikan anggota, ekspedisi, dan tradisi lintas generasi membentuk kehidupan MAPALA Tursina."
      >
        <TextLink href="#/jejak">Temukan Jejak Tursina</TextLink>
      </DocumentaryMedia>
    </section>
  );
}
export function ProgrammeDiscovery() {
  return (
    <section
      className="bg-surface py-14 lg:py-18"
      aria-label="Program dan kegiatan"
      data-ui="section home-programmes"
    >
      <div
        className="w-[calc(100%_-_32px)] max-w-institution mx-auto md:w-[calc(100%_-_48px)]"
        data-ui="container"
      >
        <SectionHeading
          label="Program & kegiatan"
          title="Ruang kegiatan Tursina"
          description="Ekspedisi, pendidikan anggota, dan tradisi organisasi dalam catatan yang terdokumentasi."
        />
        <div
          className="grid gap-4 lg:grid-cols-3 lg:gap-6"
          data-ui="programmes"
        >
          <ProgrammeEntry
            title="Tursina Explore"
            description="Ekspedisi lapangan, perjalanan, dan pengetahuan yang dihimpun dalam edisi terdokumentasi."
            href="#/program/te"
            action="Jelajahi edisi"
            variant="card"
          />
          <ProgrammeEntry
            title="Pemantapan Divisi"
            description="Pendidikan lanjutan untuk mengembangkan kemampuan anggota dalam lima bidang divisi."
            href="#/program/pd"
            action="Jelajahi lima divisi"
            variant="card"
          />
          <ProgrammeEntry
            title="Pendidikan dasar & tradisi"
            description="BATAFIA, napak tilas Kawi, dan kehidupan organisasi yang terdokumentasi."
            href="#/activities"
            action="Buka arsip kegiatan"
            variant="card"
          />
        </div>
      </div>
    </section>
  );
}
export function FeaturedExpedition() {
  const { view } = useContentReadModel();
  const te = view.expeditionRecords.find((a) => a.id === "te11");
  if (!te) return null;
  const expeditionDate = te.date?.replace("-", "–") ?? "Tanggal belum tersedia";
  return (
    <section
      className="border-t border-t-border py-14 lg:py-18"
      data-ui="section home-expedition"
    >
      <div
        className="w-[calc(100%_-_32px)] max-w-institution mx-auto grid gap-8 md:w-[calc(100%_-_48px)] lg:grid-cols-[minmax(0,650fr)_minmax(20rem,508fr)] lg:items-start lg:gap-12"
        data-ui="container home-expedition-layout"
      >
        <DocumentaryMedia
          role="expedition"
          recordId="te11"
          placement="home-expedition"
          fallbackTitle="Bukit Raya / TE11"
          fallback="Catatan ekspedisi merekam perjalanan darat, laut, dan sungai menuju Bukit Raya pada 2024."
        />
        <div
          className="[&_[data-ui~=section-heading]]:mb-6 [&>[data-ui~=body]]:mt-4"
          data-ui="feature-copy home-expedition-copy"
        >
          <SectionHeading
            label="Arsip ekspedisi · 2024"
            title="Tursina Explore #11"
            description={`Bukit Raya, Kalimantan · ${expeditionDate}`}
          />
          <h3
            className="font-editorial text-[26px] leading-[32px] font-semibold lg:text-[30px] lg:leading-[36px]"
            data-ui="content-title"
          >
            Darat, laut, dan sungai menuju Bukit Raya.
          </h3>
          <p
            className="text-[17px] leading-[25px] lg:text-[19px] lg:leading-[28px]"
            data-ui="body"
          >
            Catatan TE11 menghimpun perjalanan, pengalaman lapangan, dan karya
            terkait dari ekspedisi 2024.
          </p>
          <div
            className="mt-6 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-4"
            data-ui="feature-actions"
          >
            <ActionLink href={te.href || "#/expedition/te11"}>
              Baca catatan TE11
            </ActionLink>
            <TextLink href="#/program/te" variant="quiet">
              Lihat semua edisi
            </TextLink>
          </div>
        </div>
      </div>
    </section>
  );
}
export function EducationOverview() {
  const { view } = useContentReadModel();
  const gh = view.activityRecords.find((record) => record.id === "gh29")!;
  const rc = view.activityRecords.find((record) => record.id === "rc29")!;
  return (
    <section
      className="bg-primary py-14 text-inverse [&_[data-ui~=section-heading]]:mb-4 [&_[data-ui~=section-heading]_[data-ui~=label]]:text-inverse [&_[data-ui~=education-copy]]:border-t [&_[data-ui~=education-copy]]:border-t-inverse/55 [&_[data-ui~=education-copy]]:pt-6 [&_[data-ui~=education-discovery]_[data-ui~=link]]:text-inverse [&_[data-ui~=education-discovery]_[data-ui~=link]:hover]:text-inverse [&_[data-ui~=education-discovery]_[data-ui~=link]:active]:text-inverse [&_[data-ui~=education-discovery]_ul]:grid [&_[data-ui~=education-discovery]_ul]:list-none [&_[data-ui~=education-discovery]_ul]:gap-x-6 [&_[data-ui~=education-discovery]_ul]:gap-y-1 [&_[data-ui~=education-discovery]_ul]:p-0 [&_[data-ui~=education-media]_[data-ui~=media]_[data-ui~=caption]]:text-inverse/80 [&_[data-ui~=education-media]_[data-ui~=link]]:text-inverse [&_[data-ui~=education-media]_[data-ui~=link]:hover]:text-inverse [&_[data-ui~=education-media]_[data-ui~=link]:active]:text-inverse [&_:focus-visible]:outline-focus-inverse sm:[&_[data-ui~=education-discovery]_ul]:grid-cols-2 lg:py-18"
      data-ui="education section home-education"
    >
      <div
        className="w-[calc(100%_-_32px)] max-w-institution mx-auto grid gap-8 md:w-[calc(100%_-_48px)] lg:grid-cols-[minmax(0,440fr)_minmax(0,646fr)] lg:items-start lg:gap-12"
        data-ui="container education-grid"
      >
        <div data-ui="education-copy">
          <SectionHeading
            label="Pemantapan Divisi"
            title="Belajar melalui lima bidang praktik."
          />
          <p
            className="text-[17px] leading-[25px] lg:text-[19px] lg:leading-[28px]"
            data-ui="body"
          >
            Pendidikan lanjutan mengembangkan pengetahuan dan kemampuan anggota
            melalui lima bidang divisi.
          </p>
          <nav
            className="mt-5"
            aria-label="Bidang Pemantapan Divisi"
            data-ui="education-discovery"
          >
            <ul>
              {view.divisions.map((d) => (
                <li key={d.id}>
                  <TextLink
                    href={`#/program/pd?division=${d.id}`}
                    inverse
                    variant="quiet"
                  >
                    {d.name}
                  </TextLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-6">
            <ActionLink href="#/program/pd" secondary>
              Jelajahi Pemantapan Divisi
            </ActionLink>
          </div>
        </div>
        <div data-ui="education-media">
          <p className="font-sans text-[12px] leading-[18px] font-semibold uppercase tracking-[.02em] text-inverse/80">
            Catatan lapangan pilihan
          </p>
          <h3 className="mt-2 max-w-[20ch] font-editorial text-[26px] leading-[32px] font-semibold lg:text-[30px] lg:leading-[36px]">
            Dua praktik dari Pemantapan Divisi.
          </h3>
          <div
            className="mt-6 grid items-start gap-8 md:grid-cols-2 md:gap-6"
            data-ui="education-media-grid"
          >
            <article
              className="border-t border-t-inverse/55 pt-4"
              data-ui="education-media-entry"
              data-documentary-entry="gh"
            >
              <h4 className="font-editorial text-[24px] leading-[30px] font-semibold">
                {activityDisplayTitle(gh)}
              </h4>
              <p className="mt-1 mb-4 font-sans text-[14px] leading-[20px] text-inverse/80">
                {gh.location ?? "Lokasi belum tersedia"} ·{" "}
                {gh.date?.replace("-", "–") ?? "Tanggal belum tersedia"}
              </p>
              <DocumentaryMedia
                role="gh"
                recordId="gh29"
                placement="home-education-gh"
                frame="portrait"
                fallbackTitle="Peta dan kompas"
                fallback="Praktik navigasi darat dalam PD Gunung Hutan XXIX di Gunung Lawu, 1–8 Agustus 2025."
              />
              <div className="mt-3">
                <TextLink href={gh.href ?? "#/activity/gh29"} inverse variant="quiet">
                  Baca catatan Gunung Hutan
                </TextLink>
              </div>
            </article>
            <article
              className="border-t border-t-inverse/55 pt-4"
              data-ui="education-media-entry"
              data-documentary-entry="rc"
            >
              <h4 className="font-editorial text-[24px] leading-[30px] font-semibold">
                {activityDisplayTitle(rc)}
              </h4>
              <p className="mt-1 mb-4 font-sans text-[14px] leading-[20px] text-inverse/80">
                {rc.location ?? "Lokasi belum tersedia"} ·{" "}
                {rc.date?.replace("-", "–") ?? "Tanggal belum tersedia"}
              </p>
              <DocumentaryMedia
                role="rc"
                recordId="rc29"
                placement="home-education-rc"
                frame="portrait"
                fallbackTitle="Pemanjatan dan tim belay"
                fallback="Pembelajaran Panjat Tebing XXIX di Tebing Siung, 8–15 Agustus 2025."
              />
              <div className="mt-3">
                <TextLink href={rc.href ?? "#/activity/rc29"} inverse variant="quiet">
                  Baca catatan Panjat Tebing
                </TextLink>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
export function ActivitySelection() {
  const { view } = useContentReadModel();
  const selected = ["kawi29", "batafia30", "gh26"].flatMap(
    (id) => view.activityRecords.find((a) => a.id === id) ?? [],
  );
  const homepageSummaries: Record<string, string> = {
    batafia30:
      "Pendidikan dasar melalui forum dan praktik lapangan di Pegunungan Kawi.",
    gh26:
      "Pelaksanaan Gunung Hutan XXVI di Gunung Slamet tercatat dalam LPJ Pengurus 2023–2024.",
  };
  return (
    <section
      className="w-[calc(100%_-_32px)] max-w-institution mx-auto pt-14 md:w-[calc(100%_-_48px)] pb-14 lg:pt-22 lg:pb-22 [&_[data-ui~=activity-list]]:border-b [&_[data-ui~=activity-list]]:border-b-border [&_[data-ui~=activity]:first-child]:border-t-2 [&_[data-ui~=activity]:first-child]:border-t-primary lg:[&_[data-ui~=section-heading]]:grid lg:[&_[data-ui~=section-heading]]:grid-cols-[minmax(0,1fr)_minmax(260px,.55fr)] lg:[&_[data-ui~=section-heading]]:gap-10 lg:[&_[data-ui~=section-heading]]:items-end lg:[&_[data-ui~=section-heading]_[data-ui~=label]]:col-span-full lg:[&_[data-ui~=section-heading]>[data-ui~=body]]:mt-0 lg:[&_[data-ui~=section-heading]>[data-ui~=body]]:mr-0 lg:[&_[data-ui~=section-heading]>[data-ui~=body]]:mb-1 lg:[&_[data-ui~=section-heading]>[data-ui~=body]]:ml-0"
      data-ui="container section home-activities"
    >
      <SectionHeading
        label="Arsip kegiatan"
        title="Kegiatan dan tradisi lintas angkatan"
        description="Pilihan catatan pendidikan, praktik lapangan, dan tradisi organisasi dari 2023–2025."
      />
      <div className="" data-ui="activity-list">
        {selected.map((a) => (
          <ActivityPreview
            key={a.id}
            activity={a}
            summary={homepageSummaries[a.id]}
            variant="archive"
          />
        ))}
      </div>
      <div className="mt-6">
        <TextLink href="#/activities" variant="quiet">
          Lihat semua kegiatan
        </TextLink>
      </div>
    </section>
  );
}
export function PublicationSelection() {
  const { view } = useContentReadModel();
  const sacred = view.publicWorks.find((w) => w.id === "sacred-gatekeeper"),
    school = view.publicWorks.find((w) => w.id === "design-school");
  return (
    <section
      className="py-14 bg-surface [&[data-ui~=section]]:pb-14 md:[&_[data-ui~=publications]]:gap-8 lg:[&_[data-ui~=section-heading]]:grid lg:[&_[data-ui~=section-heading]]:grid-cols-[minmax(0,1fr)_minmax(260px,.55fr)] lg:[&_[data-ui~=section-heading]]:gap-10 lg:[&_[data-ui~=section-heading]]:items-end lg:[&_[data-ui~=section-heading]_[data-ui~=label]]:col-span-full lg:[&_[data-ui~=section-heading]>[data-ui~=body]]:mt-0 lg:[&_[data-ui~=section-heading]>[data-ui~=body]]:mr-0 lg:[&_[data-ui~=section-heading]>[data-ui~=body]]:mb-1 lg:[&_[data-ui~=section-heading]>[data-ui~=body]]:ml-0 lg:py-22 lg:[&[data-ui~=section]]:pb-22"
      data-ui="section home-publications"
    >
      <div
        className="w-[calc(100%_-_32px)] max-w-institution mx-auto md:w-[calc(100%_-_48px)]"
        data-ui="container"
      >
        <SectionHeading
          label="Karya & pengetahuan"
          title="Karya dan bahan belajar"
          description="Catatan terverifikasi tentang artikel, hubungannya dengan kegiatan, dan bahan belajar Tursina."
        />
        <div
          className="grid gap-8 [&+[data-ui~=link]]:mt-8 [&+[data-ui~=link]]:max-w-66.25 md:grid-cols-2"
          data-ui="publications"
        >
          {sacred && (
            <PublicationPreview
              title={sacred.title}
              type={sacred.type}
              date={sacred.date}
              related="Terkait TE11"
              byline={sacred.author}
              summary="Artikel yang terhubung dengan perjalanan Tursina Explore #11 ke Bukit Raya."
              href={`#/publication/${sacred.id}`}
              action="Buka catatan karya"
              availabilityText="Metadata tersedia; naskah lengkap belum dipublikasikan."
              variant="editorial"
            />
          )}
          {school && (
            <PublicationPreview
              title={school.title}
              type={school.type}
              detail="PDF · 13 halaman"
              summary="Bahan belajar tentang konteks desain, identitas visual, serta proses pra-produksi, produksi, dan pascaproduksi."
              href={`#/publication/${school.id}`}
              action="Buka catatan karya"
              availabilityText="Metadata tersedia; berkas asli belum dipublikasikan."
              variant="editorial"
            />
          )}
        </div>
        <TextLink href="#/publications" variant="quiet">
          Lihat semua publikasi
        </TextLink>
      </div>
    </section>
  );
}
export function Homepage() {
  return (
    <>
      <IdentityOpening />
      <ProgrammeDiscovery />
      <FeaturedExpedition />
      <EducationOverview />
      <ActivitySelection />
      <PublicationSelection />
    </>
  );
}
