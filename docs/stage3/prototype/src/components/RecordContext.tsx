import { useContentReadModel } from "../ContentReadModel";
import { visibleRelations, workDiscovery } from "../domain/read";
import { EvidenceDisclosure, TextLink, SectionHeading } from "./Foundation";
import { RecordDate } from "./RecordDate";
export { RecordDate, DateEvidence } from "./RecordDate";
export function RelatedRecords({ id }: { id: string }) {
  const { registry } = useContentReadModel();
  const links = visibleRelations(registry, id);
  if (!links.length) return null;
  const groups = [
    {
      title: "Karya terkait",
      items: links.filter((l) =>
        registry.works.some((w) => w.id === l.record.id),
      ),
    },
    {
      title: "Kegiatan terkait",
      items: links.filter((l) =>
        registry.activities.some((a) => a.id === l.record.id),
      ),
    },
    {
      title: "Dalam Jejak Tursina",
      items: links.filter((l) =>
        registry.history.some((h) => h.id === l.record.id),
      ),
    },
  ].filter((g) => g.items.length);
  return (
    <section
      className="w-[calc(100%_-_32px)] max-w-institution mx-auto md:w-[calc(100%_-_48px)] pb-14 lg:pb-22 pt-10 border-t border-t-border scroll-mt-6 lg:pt-14"
      id={`${id}-works`}
      tabIndex={-1}
      data-related-records={id}
      data-ui="container section te-related"
    >
      <SectionHeading
        label="Jelajahi lebih jauh"
        title="Lanjutkan penelusuran."
      />
      <div className="grid gap-8 md:grid-cols-2" data-ui="related-groups">
        {groups.map((group) => (
          <div key={group.title}>
            <h3
              className="font-semibold text-[26px] leading-[32px] font-editorial [&_a:hover]:underline [&_a:hover]:underline-offset-4 [&_a]:block [&_a]:min-h-11 [&_a]:text-inherit lg:text-[30px] lg:leading-[36px] lg:font-semibold"
              data-ui="content-title"
            >
              {group.title}
            </h3>
            {group.items.length > 1 &&
              group.items.every((l) => l.label === group.items[0].label) && (
                <p
                  className="text-[14px] leading-[20px] text-muted"
                  data-ui="caption"
                >
                  {group.items[0].label}
                </p>
              )}
            <ul
              className="list-none p-0 mt-4 [&_li]:py-4 [&_li]:border-t [&_li]:border-t-border [&_h4]:font-semibold [&_h4]:text-[20px] [&_h4]:leading-[28px] [&_h4]:font-sans [&_[data-ui~=link]]:justify-between [&_[data-ui~=link]]:items-center [&_[data-ui~=link]]:min-h-11 [&_[data-ui~=caption]]:mt-1 [&_[data-ui~=metadata]]:mt-1"
              data-ui="related-list"
            >
              {group.items.map(({ edge, record, href, label }) => (
                <li key={edge.id}>
                  <h4>
                    <a
                      className="flex items-center justify-start gap-4 min-h-11 font-semibold text-[17px] leading-[24px] font-sans text-primary no-underline w-fit max-w-full [&>span:last-child]:shrink-0 [&:hover>span:first-child]:underline [&:hover>span:first-child]:underline-offset-4"
                      href={href}
                      data-ui="link"
                    >
                      {record.title}
                      <span aria-hidden="true"> →</span>
                    </a>
                  </h4>
                  <p
                    className="text-[16px] leading-[23px] text-muted"
                    data-ui="metadata"
                  >
                    <RecordDate id={record.id} />
                  </p>
                  {"availability" in record && (
                    <p
                      className="text-[14px] leading-[20px] text-muted"
                      data-ui="caption"
                    >
                      {workDiscovery(record).cue}
                    </p>
                  )}
                  {!(
                    group.items.length > 1 &&
                    group.items.every((l) => l.label === label)
                  ) && (
                    <p
                      className="text-[14px] leading-[20px] text-muted"
                      data-ui="caption"
                    >
                      {label}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <EvidenceDisclosure summary="Konteks hubungan">
        <p>
          Hubungan mengikuti sumber masing-masing catatan. Pemberangkatan
          bersama tidak menyamakan kegiatan; standar belajar bukan bukti
          pencapaian peserta.
        </p>
      </EvidenceDisclosure>
    </section>
  );
}
