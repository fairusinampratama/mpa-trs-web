export type ActivityState = 'planned' | 'ongoing' | 'historical' | 'unknown';
const labels: Record<ActivityState, string> = { planned: 'Direncanakan', ongoing: 'Berlangsung', historical: 'Catatan historis', unknown: 'Status belum diketahui' };
const tones: Record<ActivityState, string> = { planned: 'bg-river/10 text-river', ongoing: 'bg-leaf/40 text-forest', historical: 'bg-paper text-muted', unknown: 'bg-paper text-muted' };

export function StatusLabel({ state }: { state: ActivityState }) {
  return <span className={`inline-flex items-center gap-2 rounded-control px-3 py-1.5 text-xs font-semibold ${tones[state]}`}><span aria-hidden="true">•</span>{labels[state]}</span>;
}
