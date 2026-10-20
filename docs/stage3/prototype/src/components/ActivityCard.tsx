import { StatusLabel } from "./StatusLabel";
import type { ActivityFixture } from "../activity-model";
export type { ActivityFixture } from "../activity-model";
export function ActivityCard({ activity }: { activity: ActivityFixture }) {
  const href = activity.href ?? `#/ui-lab/record/${activity.id}`;
  return (
    <article className="flex h-full flex-col rounded-card border border-line bg-surface">
      {activity.depth === "rich" && (
        <div
          className="flex aspect-video items-end justify-between bg-forest p-6 text-surface"
          aria-label="Sampul tipografis catatan, bukan foto"
          data-ui="activity-cover"
        >
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-widest text-leaf"
              data-ui="eyebrow"
            >
              {activity.program ?? "Kegiatan mandiri"}
            </p>
            <p className="mt-2 font-editorial text-2xl">
              {activity.edition
                ? `Edisi ${activity.edition}`
                : "Catatan kegiatan"}
            </p>
            <p className="mt-3 text-xs text-leaf">Foto pilihan menunggu izin</p>
          </div>
          <span aria-hidden="true" className="text-3xl text-gold">
            ↗
          </span>
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <StatusLabel state={activity.state} />
          <span className="text-xs text-muted">
            {activity.evidenceLabel ?? "Contoh sintetis"}
          </span>
        </div>
        <p
          className="text-xs font-semibold uppercase tracking-widest mt-6 text-muted"
          data-ui="eyebrow"
        >
          {activity.program ?? "Kegiatan mandiri"}
        </p>
        <h3 className="mt-2 font-editorial text-2xl" data-ui="card-heading">
          <a href={href} className="block hover:underline">
            {activity.title}
          </a>
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
          {activity.summary}
        </p>
        {(activity.location || activity.date) && (
          <p className="mt-5 border-t border-line pt-4 text-xs text-muted">
            {[activity.location, activity.date].filter(Boolean).join(" · ")}
          </p>
        )}
        <a
          href={href}
          className="mt-3 inline-flex min-h-11 items-center justify-between text-sm font-semibold text-forest"
        >
          Baca catatan <span aria-hidden="true">→</span>
        </a>
      </div>
    </article>
  );
}
