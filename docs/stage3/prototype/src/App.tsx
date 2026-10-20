import {ContentReadContext} from './ContentReadModel';
import {projectPreview} from './domain/project';
import { useEffect, useState, useMemo } from 'react';
import { Lab } from './Lab';
import { SitePrototype } from './SitePrototype';
import {InstitutionalContentProvider,type InstitutionalRegistry} from './InstitutionalContent';
import { ActivityContentProvider } from './ActivityContent';
import type { ActivityRecord } from './activity-model';
import { MediaContext, CanonicalMediaContext, type ReviewMedia } from './components/Foundation';
import { canonicalRegistry } from './domain/index.ts';
import type { InstitutionalRegistry as CanonicalRegistry } from './domain/contract.ts';
import './theme.css';

export function App({ reviewMedia = {}, activities, institution, registry = canonicalRegistry, mediaRegistry = registry }: { reviewMedia?: ReviewMedia; activities?: readonly ActivityRecord[]; institution?: InstitutionalRegistry; registry?: CanonicalRegistry; mediaRegistry?: CanonicalRegistry }) {
  const view=useMemo(()=>projectPreview(registry),[registry]);
  const activeInstitution=institution??{works:view.publicWorks,history:view.historyInputs,members:view.demoMembers,information:view.information};
  const [route, setRoute] = useState(location.hash.slice(1) || '/');
  const path = route.split('?')[0];
  useEffect(() => {
    const update = () => setRoute(location.hash.slice(1) || '/');
    window.addEventListener('hashchange', update);
    return () => window.removeEventListener('hashchange', update);
  }, []);
  // Changing a facet must not jump a reader back above the programme introduction.
  useEffect(() => { window.scrollTo(0, 0); }, [path]);
  useEffect(() => {
    const titles: Record<string, string> = {
      '/program/pd': 'Pemantapan Divisi', '/activities': 'Kegiatan Tursina',
      '/publications':'Karya & Pengetahuan','/knowledge':'Materi belajar','/about':'Tentang MAPALA Tursina','/jejak':'Jejak Tursina','/members':'Buku Induk / contoh sintetis',
      '/program/te': 'Tursina Explore', '/expedition/te11': 'TE11 — Bukit Raya',
      '/expedition/te12': 'TE12 — Trunyan', '/publication/sacred-gatekeeper': 'The Sacred Gatekeeper',
    };
    const record = path.startsWith('/activity/') ? (activities ?? view.activityRecords).find(r => r.id === path.split('/')[2]) : undefined;
    const work=path.startsWith('/publication/')?activeInstitution.works.find(w=>w.id===path.split('/')[2]):undefined;
    const expedition=path.startsWith('/expedition/')?view.expeditionRecords.find(a=>a.id===path.split('/')[2]):undefined;
    const title=record?.title??work?.title??expedition?.title??titles[path];
    document.title = title ? `${title} — MAPALA Tursina` : path.startsWith('/ui-lab') ? 'Tursina — Laboratorium Antarmuka' : 'MAPALA Tursina — Prototipe Stage 3';
  }, [path, activities, institution, view]);
  return <ContentReadContext.Provider value={{registry,view}}><ActivityContentProvider records={activities??view.activityRecords}>
    <InstitutionalContentProvider records={activeInstitution}><CanonicalMediaContext.Provider value={mediaRegistry}><MediaContext.Provider value={reviewMedia}>
      {path.startsWith('/ui-lab') ? <Lab /> : <SitePrototype route={route} />}
    </MediaContext.Provider></CanonicalMediaContext.Provider></InstitutionalContentProvider>
  </ActivityContentProvider></ContentReadContext.Provider>;
}
