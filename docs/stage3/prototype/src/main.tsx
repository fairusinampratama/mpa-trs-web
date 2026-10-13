import { createRoot } from 'react-dom/client';
import { useEffect, useState } from 'react';
import { Lab } from './Lab';
import { SitePrototype } from './SitePrototype';
import './theme.css';

function Root() {
  const [route,setRoute]=useState(location.hash.slice(1) || (location.pathname==='/ui-lab' ? '/ui-lab' : '/review'));
  useEffect(()=>{const update=()=>setRoute(location.hash.slice(1) || '/review');window.addEventListener('hashchange',update);return()=>window.removeEventListener('hashchange',update);},[]);
  useEffect(()=>{document.title=route.startsWith('/ui-lab')?'Tursina — Laboratorium Antarmuka':'MAPALA Tursina — Prototipe Stage 3';},[route]);
  return route.startsWith('/ui-lab') ? <Lab/> : <SitePrototype route={route}/>;
}
createRoot(document.getElementById('tursina-prototype')!).render(<Root/>);
