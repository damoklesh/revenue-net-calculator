import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Link, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { copy, type Language } from './copy';
import './style.css';

function App() {
  const [language, setLanguage] = useState<Language>('es');
  const t = copy[language];
  const location = useLocation();
  const main = useRef<HTMLElement>(null);
  useEffect(() => { document.documentElement.lang = language; }, [language]);
  useEffect(() => { main.current?.focus(); window.scrollTo(0, 0); }, [location.pathname]);
  return <>
    <a className="skip" href="#content">{t.skip}</a>
    <header><Link className="brand" to="/" aria-label={`Neto · ${t.home}`}>neto<span>↗</span></Link><nav aria-label={t.home}><NavLink to="/" end>{t.home}</NavLink><NavLink to="/calculator">{t.calculator}</NavLink><NavLink to="/methodology">{t.methodology}</NavLink></nav><label className="language">{t.language}<select value={language} onChange={e => setLanguage(e.target.value as Language)}><option value="es">Español</option><option value="fr">Français</option><option value="en">English</option></select></label></header>
    <main id="content" ref={main} tabIndex={-1}><Routes>
      <Route path="/" element={<><section className="hero"><p className="eyebrow">{t.eyebrow}</p><h1>{t.title}</h1><p className="intro">{t.intro}</p><Link className="button" to="/calculator">{t.cta} <span aria-hidden="true">→</span></Link><p className="country-label">{t.countries}</p><div className="countries"><span>{t.spain}</span><span>{t.france}</span></div></section><section><h2>{t.stepsTitle}</h2><ol className="steps">{t.steps.map((step, i) => <li key={i}><span aria-hidden="true">0{i + 1}</span><p>{step}</p></li>)}</ol></section><section className="privacy"><h2>{t.privacyTitle}</h2><p>{t.privacy}</p><p>{t.independent}</p></section></>} />
      <Route path="/calculator" element={<section className="page"><p className="eyebrow">ES / FR</p><h1>{t.calculator}</h1><p className="intro">{t.calcIntro}</p><p className="notice">{t.pending}</p><p>{t.privacy}</p><Link to="/methodology">{t.methodology} →</Link><p><Link to="/">{t.back}</Link></p></section>} />
      <Route path="/methodology" element={<section className="page"><h1>{t.methodology}</h1><p className="intro">{t.methodIntro}</p><p>{t.limits}</p><Link className="button" to="/calculator">{t.cta}</Link><p><Link to="/">{t.back}</Link></p></section>} />
      <Route path="*" element={<section className="page"><p className="eyebrow">404</p><h1>{t.missing}</h1><p className="intro">{t.missingText}</p><Link className="button" to="/">{t.back}</Link><p><Link to="/calculator">{t.cta}</Link></p></section>} />
    </Routes></main><footer>neto · {t.footer}</footer>
  </>;
}
createRoot(document.getElementById('root')!).render(<React.StrictMode><BrowserRouter><App /></BrowserRouter></React.StrictMode>);
