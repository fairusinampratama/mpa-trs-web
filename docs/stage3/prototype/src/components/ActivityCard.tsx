import { StatusLabel, type ActivityState } from './StatusLabel';

export type ActivityFixture = { id: string; title: string; program?: string; summary: string; state: ActivityState; location?: string; date?: string; depth: 'basic' | 'rich' };

export function ActivityCard({ activity }: { activity: ActivityFixture }) {
  return <article className="flex h-full flex-col rounded-card border border-line bg-surface">
    <div className="flex aspect-[4/3] items-end justify-between bg-forest p-6 text-surface" aria-label="Slot dokumentasi, gambar belum dipilih">
      <div><p className="eyebrow text-leaf">Dokumentasi lapangan</p><p className="mt-2 font-editorial text-2xl">Ruang untuk jejak nyata.</p></div><span aria-hidden="true" className="text-3xl text-gold">↗</span>
    </div>
    <div className="flex flex-1 flex-col p-6"><div className="flex flex-wrap items-center justify-between gap-2"><StatusLabel state={activity.state}/><span className="text-xs text-muted">Contoh sintetis</span></div>
      <p className="eyebrow mt-6 text-muted">{activity.program ?? 'Kegiatan mandiri'}</p>
      <h3 className="mt-2 font-editorial text-2xl"><a href={`#/ui-lab/record/${activity.id}`} className="hover:underline">{activity.title}</a></h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{activity.summary}</p>
      {(activity.location || activity.date) && <p className="mt-5 border-t border-line pt-4 text-xs text-muted">{[activity.location, activity.date].filter(Boolean).join(' · ')}</p>}
      <a href={`#/ui-lab/record/${activity.id}`} className="mt-3 inline-flex min-h-11 items-center justify-between text-sm font-semibold text-forest">Lihat contoh catatan <span aria-hidden="true">→</span></a>
    </div>
  </article>;
}
