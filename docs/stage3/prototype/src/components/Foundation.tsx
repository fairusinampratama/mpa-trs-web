import { createContext, useContext, useState, type ReactNode } from 'react';
import type { ActivityFixture } from './ActivityCard';

export type MediaRole = 'identity' | 'expedition' | 'gh' | 'rc' | 'history' | 'emblem' | 'expedition-trail' | 'expedition-ecology';
export type ReviewMedia = Partial<Record<MediaRole, { src: string; width: number; height: number; alt: string; caption: string; credit?: string }>>;
// Public entry supplies no held assets. A separate private review entry may provide
// media; that entry and its bytes never belong to the public build root.
export const MediaContext = createContext<ReviewMedia>({});
export function useDocumentaryAsset(role: MediaRole) { return useContext(MediaContext)[role]; }
export function TextLink({ href, children, inverse = false }: { href: string; children: ReactNode; inverse?: boolean }) {
  return <a className={`ds-link${inverse ? ' ds-inverse' : ''}`} href={href}><span>{children}</span><span aria-hidden="true">→</span></a>;
}
export function ActionLink({ href, children, secondary = false }: { href: string; children: ReactNode; secondary?: boolean }) {
  return <a href={href} className={`button button-${secondary ? 'secondary' : 'primary'}`}>{children}</a>;
}
export function SectionHeading({ label, title, description }: { label: string; title: string; description?: string }) {
  return <header className="ds-section-heading"><p className="ds-label">{label}</p><h2 className="ds-section-title">{title}</h2>{description && <p className="ds-body">{description}</p>}</header>;
}
export function MediaCaption({ children, credit }: { children: ReactNode; credit?: string }) {
  return <figcaption className="ds-caption">{children}{credit && <span className="ds-credit">Foto: {credit}</span>}</figcaption>;
}
export function DocumentaryMedia({ role, eager = false, fallbackTitle, fallback, children, omitWhenUnavailable = false }: { role: MediaRole; eager?: boolean; fallbackTitle: string; fallback: string; children?: ReactNode; omitWhenUnavailable?: boolean }) {
  const asset = useDocumentaryAsset(role); const [failed, setFailed] = useState(false);
  if ((!asset || failed) && omitWhenUnavailable) return null;
  return asset && !failed ? <figure className={`ds-media ds-media-${role}`}><img src={asset.src} width={asset.width} height={asset.height} alt={asset.alt} loading={eager ? 'eager' : 'lazy'} fetchPriority={eager ? 'high' : 'auto'} onError={() => setFailed(true)}/><MediaCaption credit={asset.credit}>{asset.caption}</MediaCaption></figure> : <aside className={`ds-media-fallback ds-fallback-${role}`}><p className="ds-label">{failed ? 'Dokumentasi tidak termuat' : 'Catatan dokumentasi'}</p><p className="ds-content-title">{fallbackTitle}</p><p>{fallback}</p>{children}<p className="ds-caption">{failed ? 'Keterangan tetap tersedia; muat ulang untuk mencoba kembali.' : 'Foto arsip menunggu izin publikasi.'}</p></aside>;
}
export function ProgrammeEntry({ index, title, description, href, action }: { index: string; title: string; description: string; href: string; action: string }) {
  return <article className="ds-programme"><span className="ds-label ds-index" aria-hidden="true">{index}</span><div><h3 className="ds-content-title"><a href={href}>{title}</a></h3><p>{description}</p><TextLink href={href}>{action}</TextLink></div></article>;
}
export function ActivityMetadata({ activity, inline = false }: { activity: ActivityFixture; inline?: boolean }) {
  return <div className={`ds-activity-metadata${inline ? ' ds-metadata-inline' : ''}`}>{activity.date && <p>{activity.date}</p>}<p className="ds-label">{activity.state === 'historical' ? 'Historis' : activity.state === 'planned' ? 'Direncanakan' : activity.state === 'ongoing' ? 'Berlangsung' : 'Status belum diketahui'}</p></div>;
}
export function ActivityPreview({ activity, title, summary }: { activity: ActivityFixture; title?: string; summary?: string }) {
  return <article className="ds-activity"><ActivityMetadata activity={activity}/><h3 className="ds-activity-title"><a href={activity.href}>{title || activity.title}</a></h3>{activity.location && <p className="ds-place">{activity.location}</p>}<p>{summary || activity.summary}</p></article>;
}
export function PublicationPreview({ title, type, date, summary, href, action, related }: { title: string; type: string; date?: string; summary: string; href: string; action: string; related?: string }) {
  return <article className="ds-publication"><p className="ds-label">{type}{related ? ` / ${related}` : ' / Mandiri'}</p><h3 className="ds-content-title"><a href={href}>{title}</a></h3>{date && <p className="ds-metadata">{date}</p>}<p>{summary}</p><TextLink href={href}>{action}</TextLink></article>;
}

export function EvidenceDisclosure({ summary = 'Sumber dan batas catatan', children }: { summary?: string; children: ReactNode }) {
  return <details className="ds-evidence"><summary>{summary}</summary><div>{children}</div></details>;
}
export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return <nav className="ds-breadcrumbs" aria-label="Jejak navigasi"><ol>{items.map((item,i)=><li key={item.label}>{i>0&&<span aria-hidden="true">/</span>}{item.href?<a href={item.href}>{item.label}</a>:<span aria-current="page">{item.label}</span>}</li>)}</ol></nav>;
}
