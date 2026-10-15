import { useEffect, useState } from 'react';
import { Lab } from './Lab';
import { activityRecords } from './content';
import { SitePrototype } from './SitePrototype';
import {InstitutionalContentProvider,institutionalRegistry,type InstitutionalRegistry} from './InstitutionalContent';
import { ActivityContentProvider } from './ActivityContent';
import type { ActivityRecord } from './activity-model';
import { MediaContext, type ReviewMedia } from './components/Foundation';
import './theme.css';

export function App({ reviewMedia = {}, activities, institution }: { reviewMedia?: ReviewMedia; activities?: readonly ActivityRecord[]; institution?: InstitutionalRegistry }) {
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
    const record = path.startsWith('/activity/') ? (activities ?? activityRecords).find(r => r.id === path.split('/')[2]) : undefined;
    const work=path.startsWith('/publication/')?(institution??institutionalRegistry).works.find(w=>w.id===path.split('/')[2]):undefined;
    const title=record?.title??work?.title??titles[path];
    document.title = title ? `${title} — MAPALA Tursina` : path.startsWith('/ui-lab') ? 'Tursina — Laboratorium Antarmuka' : 'MAPALA Tursina — Prototipe Stage 3';
  }, [path, activities, institution]);
  return <ActivityContentProvider records={activities}>
    <InstitutionalContentProvider records={institution}><MediaContext.Provider value={reviewMedia}>
      {path.startsWith('/ui-lab') ? <Lab /> : <SitePrototype route={route} />}
    </MediaContext.Provider></InstitutionalContentProvider>
  </ActivityContentProvider>;
}
