import { dateView } from "./domain/read";
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
      className="w-[calc(100%_-_32px)] max-w-institution mx-auto md:w-[calc(100%_-_48px)] pt-6 pb-14 [&_[data-ui~=display]]:mt-3.5 [&_[data-ui~=display]]:mb-4.5 [&_[data-ui~=breadth]]:mt-3.5 [&_[data-ui~=breadth]]:text-muted [&_[data-ui~=breadth]]:text-[15px] [&_[data-ui~=breadth]]:leading-[21px] [&>[data-ui~=media]]:mt-6 [&>[data-ui~=media-fallback]]:mt-6 lg:grid lg:pb-22 lg:[&_[data-ui~=breadth]]:text-[17px] lg:[&_[data-ui~=breadth]]:leading-[24px] lg:[&>[data-ui~=media]]:mt-0 lg:[&>[data-ui~=media-fallback]]:mt-0 wide:gap-22 grid gap-10 md:grid-cols-[1.4fr_1fr] relative lg:grid-cols-[minmax(0,440fr)_minmax(0,646fr)] lg:gap-22 lg:items-center lg:pt-16 lg:[&_[data-ui~=affiliation]::before]:hidden lg:[&_[data-ui~=display]]:text-[54px] lg:[&_[data-ui~=display]]:leading-[58px]"
      aria-labelledby="identity-title"
      data-ui="container identity home-hero"
    >
      <div className="lg:pl-0" data-ui="identity-copy home-hero-copy">
        <p
          className="text-[14px] leading-[20px] font-semibold text-blue relative [&:before]:content-[''] [&:before]:block [&:before]:w-12 [&:before]:h-0.5 [&:before]:bg-gold [&:before]:absolute [&:before]:-top-3 [&:before]:m-0 lg:text-[17px] lg:leading-[24px]"
          data-ui="affiliation"
        >
          {view.information.affiliation}
        </p>
        <h1
          className="font-semibold text-[36px] leading-[38.9px] font-editorial max-[360px]:text-[32px] max-[360px]:leading-[34.6px] lg:text-[56px] lg:leading-[60.5px] lg:[&>span]:block"
          id="identity-title"
          data-ui="display"
        >
          <span>Mahasiswa</span> <span>Pencinta Alam</span> <span>Tursina</span>
        </h1>
        <p
          className="text-[17px] leading-[25px] lg:text-[20px] lg:leading-[29px]"
          data-ui="intro"
        >
          Organisasi mahasiswa yang belajar melalui pendidikan alam bebas,
          ekspedisi, kegiatan lingkungan, dan kehidupan organisasi.
        </p>
        <p className="" data-ui="breadth">
          Jelajahi program, kegiatan, cerita, publikasi, pengetahuan, dan jejak
          lintas generasi.
        </p>
        <div
          className="mt-6 flex flex-col gap-2 md:flex-row lg:[&_[data-ui~=button]:first-child]:min-w-45.5 lg:[&_[data-ui~=button]:last-child]:min-w-51.25 lg:gap-4"
          data-ui="hero-actions"
        >
          <ActionLink href="#/about">Kenali Tursina</ActionLink>
          <ActionLink href="#/activities" secondary>
            Jelajahi kegiatan
          </ActionLink>
        </div>
      </div>
      <DocumentaryMedia
        role="identity"
        recordId="kawi29"
        placement="home-opening"
        eager
        fallbackTitle="Belajar di alam. Bertumbuh bersama."
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
      className="pb-14 bg-surface pt-14 mb-14 [&[data-ui~=section]]:pb-14 [&_[data-ui~=programme]]:relative [&_[data-ui~=programme]]:min-h-57.5 [&_[data-ui~=programme]]:p-6 [&_[data-ui~=programme]]:border [&_[data-ui~=programme]]:border-border [&_[data-ui~=programme]]:bg-page [&_[data-ui~=programme]]:flex [&_[data-ui~=programme]]:flex-col [&_[data-ui~=programme]::before]:content-[''] [&_[data-ui~=programme]::before]:absolute [&_[data-ui~=programme]::before]:[inset:0_0_auto] [&_[data-ui~=programme]::before]:h-0.75 [&_[data-ui~=programme]::before]:bg-primary [&_[data-ui~=programme]>div]:flex [&_[data-ui~=programme]>div]:flex-1 [&_[data-ui~=programme]>div]:flex-col [&_[data-ui~=programme]_[data-ui~=index]]:font-semibold [&_[data-ui~=programme]_[data-ui~=index]]:text-[14px] [&_[data-ui~=programme]_[data-ui~=index]]:leading-[20px] [&_[data-ui~=programme]_[data-ui~=index]]:font-sans [&_[data-ui~=programme]_[data-ui~=link]]:mt-auto [&_[data-ui~=programme]_[data-ui~=link]]:pt-6 [&_[data-ui~=programme]:first-child]:border-primary [&_[data-ui~=programme]:first-child]:bg-primary [&_[data-ui~=programme]:first-child]:text-inverse [&_[data-ui~=programme]:first-child::before]:bg-gold [&_[data-ui~=programme]:first-child_[data-ui~=index]]:text-inverse [&_[data-ui~=programme]:first-child_[data-ui~=link]]:text-inverse md:[&_[data-ui~=programmes]]:gap-4 lg:py-18 lg:mb-0 lg:[&[data-ui~=section]]:pb-18 lg:[&_[data-ui~=programmes]]:grid-cols-[1.18fr_.91fr_.91fr] lg:[&_[data-ui~=programmes]]:gap-6 lg:[&_[data-ui~=programme]]:min-h-67.5 lg:[&_[data-ui~=programme]]:p-8"
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
          description="Program berulang, edisi tersendiri, dan kegiatan mandiri."
        />
        <div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          data-ui="programmes"
        >
          <ProgrammeEntry
            index="01"
            title="Tursina Explore"
            description="Ekspedisi dan edisi terdokumentasi."
            href="#/program/te"
            action="Lihat edisi TE"
          />
          <ProgrammeEntry
            index="02"
            title="Pemantapan Divisi"
            description="Pendidikan lanjutan dan praktik lima divisi."
            href="#/program/pd"
            action="Jelajahi PD"
          />
          <ProgrammeEntry
            index="03"
            title="Kegiatan lainnya"
            description="Pendidikan dasar, tradisi, dan kegiatan mandiri."
            href="#/activities"
            action="Lihat kegiatan"
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
  return (
    <section
      className="py-14 border-y border-y-border lg:py-22 lg:[&_[data-ui~=media]]:self-stretch lg:[&_[data-ui~=media]]:flex lg:[&_[data-ui~=media]]:flex-col lg:[&_[data-ui~=media]]:justify-center"
      data-ui="section home-expedition"
    >
      <div
        className="w-[calc(100%_-_32px)] max-w-institution mx-auto md:w-[calc(100%_-_48px)] grid gap-0 lg:grid-cols-[minmax(0,650fr)_minmax(0,508fr)] lg:items-center"
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
          className="[&>[data-ui~=body]]:mt-4 [&>[data-ui~=link]:last-child]:text-blue [&>[data-ui~=link]:last-child]:text-[16px] pt-8 pr-6 pb-8 pl-6 bg-surface [&_[data-ui~=section-heading]]:mb-6 [&>[data-ui~=content-title]]:pt-6 [&>[data-ui~=content-title]]:border-t-2 [&>[data-ui~=content-title]]:border-t-primary [&>[data-ui~=link]]:mt-4 [&>[data-ui~=link]:first-of-type]:mt-6 lg:p-12"
          data-ui="feature-copy home-expedition-copy"
        >
          <SectionHeading
            label="Arsip ekspedisi / 2024"
            title="Tursina Explore #11"
            description={`Bukit Raya, Kalimantan / ${te.date}`}
          />
          <h3
            className="font-semibold text-[26px] leading-[32px] font-editorial [&_a:hover]:underline [&_a:hover]:underline-offset-4 [&_a]:block [&_a]:min-h-11 [&_a]:text-inherit lg:text-[30px] lg:leading-[36px] lg:font-semibold"
            data-ui="content-title"
          >
            Perjalanan lintas moda menuju Bukit Raya.
          </h3>
          <p
            className="text-[17px] leading-[25px] lg:text-[19px] lg:leading-[28px]"
            data-ui="body"
          >
            Ikuti perjalanan darat, laut, dan sungai menuju Bukit Raya, lalu
            temukan catatan pengalaman lapangan dan karya terkait.
          </p>
          <TextLink href={te.href || "#/expedition/te11"}>
            Baca ekspedisi TE11
          </TextLink>
          <TextLink href="#/program/te">Lihat seluruh edisi</TextLink>
        </div>
      </div>
    </section>
  );
}
export function EducationOverview() {
  const { view } = useContentReadModel();
  return (
    <section
      className="bg-primary text-inverse py-10 mb-14 [&_[data-ui~=label]]:text-inverse [&_[data-ui~=caption]]:text-inverse [&_[data-ui~=link]]:text-inverse [&_:focus-visible]:outline-focus-inverse [&_[data-ui~=section-heading]]:mb-3.5 [&_ul]:list-none [&_ul]:p-0 [&_ul]:grid [&_ul]:gap-2 [&_ul]:font-semibold lg:py-18 lg:mb-22 [&_[data-ui~=education-copy]]:pt-6 [&_[data-ui~=education-copy]]:border-t [&_[data-ui~=education-copy]]:border-t-inverse/55 [&_[data-ui~=education-discovery]_ul]:flex [&_[data-ui~=education-discovery]_ul]:flex-wrap [&_[data-ui~=education-discovery]_ul]:gap-2 [&_[data-ui~=education-discovery]_li]:pt-1.5 [&_[data-ui~=education-discovery]_li]:pr-2.5 [&_[data-ui~=education-discovery]_li]:pb-1.5 [&_[data-ui~=education-discovery]_li]:pl-2.5 [&_[data-ui~=education-discovery]_li]:border [&_[data-ui~=education-discovery]_li]:border-inverse/50 [&_[data-ui~=education-discovery]_li]:text-[15px] [&_[data-ui~=education-discovery]_li]:leading-[22px] [&_[data-ui~=education-media]_[data-ui~=media]]:p-2 [&_[data-ui~=education-media]_[data-ui~=media]]:bg-inverse/8 [&_[data-ui~=enlarge-control]]:border-inverse/55 lg:[&_[data-ui~=education-media]_[data-media-role=rc]]:mt-10"
      data-ui="education section home-education"
    >
      <div
        className="w-[calc(100%_-_32px)] max-w-institution mx-auto md:w-[calc(100%_-_48px)] grid gap-6 lg:grid-cols-[minmax(0,440fr)_minmax(0,646fr)] lg:gap-x-30 lg:gap-y-6"
        data-ui="container education-grid"
      >
        <div className="lg:col-[1] lg:row-[1]" data-ui="education-copy">
          <SectionHeading
            label="Pendidikan anggota"
            title="Keterampilan tumbuh melalui praktik."
          />
          <p
            className="text-[17px] leading-[25px] lg:text-[19px] lg:leading-[28px]"
            data-ui="body"
          >
            Peta, kompas, tali, dan kerja tim menjadi bagian dari pendidikan
            lapangan. Kenali lima bidang belajar Tursina.
          </p>
        </div>
        <div
          className="flex items-start gap-4 min-w-0 [&_[data-media-role=gh]]:w-[calc(242px_*_.5625)] [&_[data-media-role=gh]]:max-w-[42%] [&_[data-media-role=rc]]:w-[calc(242px_*_.75)] [&_[data-media-role=rc]]:max-w-[53%] [&_[data-ui~=media-fallback]]:flex-1 [&_[data-ui~=media-fallback]]:min-w-0 [&_[data-ui~=media-fallback]]:border-inverse [&_[data-ui~=media-fallback]]:bg-transparent [&_[data-ui~=media-fallback]]:pt-4 [&_[data-ui~=media-fallback]]:pr-0 [&_[data-ui~=media-fallback]]:pb-4 [&_[data-ui~=media-fallback]]:pl-0 [&:has([data-ui~=media-fallback])]:flex-col [&_[data-ui~=media-fallback]_[data-ui~=content-title]]:text-[26px] [&_[data-ui~=media-fallback]_[data-ui~=content-title]]:leading-[32px] max-[360px]:[&_[data-media-role=gh]]:w-[112.5px] max-[360px]:[&_[data-media-role=rc]]:w-37.5 md:[&:has([data-ui~=media-fallback])]:flex-row lg:col-[2] lg:row-[1/3] lg:gap-6 lg:[&_[data-media-role=gh]]:w-56.25 lg:[&_[data-media-role=gh]]:max-w-[41%] lg:[&_[data-media-role=rc]]:w-75 lg:[&_[data-media-role=rc]]:max-w-[55%] lg:[&_[data-ui~=media-fallback]]:p-4 lg:[&:has([data-ui~=media-fallback])]:flex-col"
          data-ui="education-media"
        >
          <DocumentaryMedia
            role="gh"
            recordId="gh29"
            placement="home-education-gh"
            enlargement
            fallbackTitle="Peta dan kompas"
            fallback="Praktik navigasi darat dalam PD Gunung Hutan XXIX di Gunung Lawu, 1–8 Agustus 2025."
          >
            <TextLink href="#/activity/gh29" inverse>
              Baca PD Gunung Hutan
            </TextLink>
          </DocumentaryMedia>
          <DocumentaryMedia
            role="rc"
            recordId="rc29"
            placement="home-education-rc"
            enlargement
            fallbackTitle="Pemanjatan dan tim belay"
            fallback="Pembelajaran Panjat Tebing XXIX di Tebing Siung, 8–15 Agustus 2025."
          >
            <TextLink href="#/activity/rc29" inverse>
              Baca PD Panjat Tebing
            </TextLink>
          </DocumentaryMedia>
        </div>
        <div
          className="[&>[data-ui~=link]]:mt-6 lg:col-[1] lg:row-[2]"
          data-ui="education-discovery"
        >
          <ul>
            {view.divisions.map((d) => (
              <li key={d.id}>{d.name}</li>
            ))}
          </ul>
          <TextLink href="#/program/pd" inverse>
            Buka katalog PD
          </TextLink>
        </div>
      </div>
    </section>
  );
}
export function ActivitySelection() {
  const { view } = useContentReadModel();
  const selected = ["rc29", "batafia30", "kawi29"].flatMap(
    (id) => view.activityRecords.find((a) => a.id === id) ?? [],
  );
  return (
    <section
      className="w-[calc(100%_-_32px)] max-w-institution mx-auto md:w-[calc(100%_-_48px)] pb-14 lg:pb-22 [&_[data-ui~=activity-list]]:border-b [&_[data-ui~=activity-list]]:border-b-border [&_[data-ui~=activity]:first-child]:border-t-2 [&_[data-ui~=activity]:first-child]:border-t-primary lg:[&_[data-ui~=section-heading]]:grid lg:[&_[data-ui~=section-heading]]:grid-cols-[minmax(0,1fr)_minmax(260px,.55fr)] lg:[&_[data-ui~=section-heading]]:gap-10 lg:[&_[data-ui~=section-heading]]:items-end lg:[&_[data-ui~=section-heading]_[data-ui~=label]]:col-span-full lg:[&_[data-ui~=section-heading]>[data-ui~=body]]:mt-0 lg:[&_[data-ui~=section-heading]>[data-ui~=body]]:mr-0 lg:[&_[data-ui~=section-heading]>[data-ui~=body]]:mb-1 lg:[&_[data-ui~=section-heading]>[data-ui~=body]]:ml-0"
      data-ui="container section home-activities"
    >
      <SectionHeading
        label="Arsip kegiatan"
        title="Pendidikan dan kehidupan organisasi"
        description="Dokumentasi kegiatan lintas generasi."
      />
      <div className="" data-ui="activity-list">
        {selected.map((a) => (
          <ActivityPreview key={a.id} activity={a} />
        ))}
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
      className="py-14 bg-surface mb-14 [&[data-ui~=section]]:pb-14 [&_[data-ui~=publication]]:p-6 [&_[data-ui~=publication]]:border [&_[data-ui~=publication]]:border-border [&_[data-ui~=publication]]:border-t-3 [&_[data-ui~=publication]]:border-t-blue [&_[data-ui~=publication]]:bg-page [&_[data-ui~=publications]+[data-ui~=link]]:pb-1 [&_[data-ui~=publications]+[data-ui~=link]]:border-b [&_[data-ui~=publications]+[data-ui~=link]]:border-b-primary md:[&_[data-ui~=publications]]:gap-4 lg:[&_[data-ui~=section-heading]]:grid lg:[&_[data-ui~=section-heading]]:grid-cols-[minmax(0,1fr)_minmax(260px,.55fr)] lg:[&_[data-ui~=section-heading]]:gap-10 lg:[&_[data-ui~=section-heading]]:items-end lg:[&_[data-ui~=section-heading]_[data-ui~=label]]:col-span-full lg:[&_[data-ui~=section-heading]>[data-ui~=body]]:mt-0 lg:[&_[data-ui~=section-heading]>[data-ui~=body]]:mr-0 lg:[&_[data-ui~=section-heading]>[data-ui~=body]]:mb-1 lg:[&_[data-ui~=section-heading]>[data-ui~=body]]:ml-0 lg:py-22 lg:mb-22 lg:[&[data-ui~=section]]:pb-22"
      data-ui="section home-publications"
    >
      <div
        className="w-[calc(100%_-_32px)] max-w-institution mx-auto md:w-[calc(100%_-_48px)]"
        data-ui="container"
      >
        <SectionHeading
          label="Karya & pengetahuan"
          title="Pengalaman menjadi bacaan."
          description="Artikel dan materi belajar memiliki ruang tersendiri."
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
              summary="Catatan terkait pengalaman TE11."
              href={`#/publication/${sacred.id}`}
              action="Buka artikel"
            />
          )}
          {school && (
            <PublicationPreview
              title={school.title}
              type={school.type}
              summary="Materi pengantar tentang konteks dan identitas visual."
              href={`#/publication/${school.id}`}
              action="Buka materi"
            />
          )}
        </div>
        <TextLink href="#/publications">Semua publikasi</TextLink>
      </div>
    </section>
  );
}
export function InstitutionalHistoryPreview() {
  const { registry } = useContentReadModel();
  const founding = registry.history.find(
    (h) => h.kind === "founding" && h.publication.website === "preview",
  );
  return (
    <section
      className="w-[calc(100%_-_32px)] max-w-institution mx-auto md:w-[calc(100%_-_48px)] pb-14 lg:pb-22 [&_[data-ui~=history-text]]:border-t-3"
      data-ui="container section history home-history"
    >
      <SectionHeading
        label="Jejak Tursina"
        title="Pengalaman lintas generasi"
        description={
          founding
            ? `Dibentuk pada ${dateView(founding.dates).label}.`
            : undefined
        }
      />
      <div
        className="grid gap-6 [&>div>[data-ui~=body]]:mt-4 [&>div>[data-ui~=link]:first-of-type]:mt-6 [&>div>[data-ui~=link]:last-of-type]:text-blue [&>div>[data-ui~=link]:last-of-type]:mt-4 [&>div>[data-ui~=caption]]:mt-2 lg:grid-cols-[minmax(0,480fr)_minmax(0,678fr)] lg:gap-12 lg:[&>div]:pt-6 border-t-2 border-t-primary pt-6"
        data-ui="history-grid history-text"
      >
        <div>
          <h3
            className="font-semibold text-[26px] leading-[32px] font-editorial [&_a:hover]:underline [&_a:hover]:underline-offset-4 [&_a]:block [&_a]:min-h-11 [&_a]:text-inherit lg:text-[30px] lg:leading-[36px] lg:font-semibold"
            data-ui="content-title"
          >
            Pendidikan, perjalanan, dan pengetahuan yang diteruskan.
          </h3>
          <p
            className="text-[17px] leading-[25px] lg:text-[19px] lg:leading-[28px]"
            data-ui="body"
          >
            Telusuri pembentukan organisasi, pengalaman lapangan, dan karya yang
            tersimpan. Jejak ini menghubungkan catatan yang masih tersedia,
            bukan sejarah tahunan yang lengkap.
          </p>
        </div>
        <div>
          <TextLink href="#/jejak">Baca Jejak Tursina</TextLink>
          <TextLink href="#/members">Buku Induk</TextLink>
          <p
            className="text-[14px] leading-[20px] text-muted"
            data-ui="caption"
          >
            Katalog contoh NIA/nama pada prototipe. Seluruh data anggota
            sintetis.
          </p>
        </div>
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
      <InstitutionalHistoryPreview />
    </>
  );
}
