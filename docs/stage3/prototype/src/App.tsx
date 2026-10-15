import { useEffect, useState } from 'react';
import { Lab } from './Lab';
import { SitePrototype } from './SitePrototype';
import { MediaContext, type ReviewMedia } from './components/Foundation';
import './theme.css';
export function App({reviewMedia={}}:{reviewMedia?:ReviewMedia}) {
  const [route,setRoute]=useState(location.hash.slice(1)||'/');
  useEffect(()=>{const update=()=>{setRoute(location.hash.slice(1)||'/');window.scrollTo(0,0);};window.addEventListener('hashchange',update);return()=>window.removeEventListener('hashchange',update);},[]);
  useEffect(()=>{const titles:Record<string,string>={'/program/te':'Tursina Explore','/expedition/te11':'TE11 — Bukit Raya','/expedition/te12':'TE12 — Trunyan','/publication/sacred-gatekeeper':'The Sacred Gatekeeper'};document.title=titles[route]?`${titles[route]} — MAPALA Tursina`:route.startsWith('/ui-lab')?'Tursina — Laboratorium Antarmuka':'MAPALA Tursina — Prototipe Stage 3';},[route]);
  return <MediaContext.Provider value={reviewMedia}>{route.startsWith('/ui-lab')?<Lab/>:<SitePrototype route={route}/>}</MediaContext.Provider>;
}
