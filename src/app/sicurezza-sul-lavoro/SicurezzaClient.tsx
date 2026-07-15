"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  Shield, 
  Leaf, 
  Droplet, 
  BookOpen, 
  CheckCircle2, 
  Phone, 
  Mail, 
  MapPin, 
  Menu, 
  X, 
  ArrowRight, 
  Clock, 
  Users, 
  FileText, 
  Activity, 
  ExternalLink,
  Award,
  ChevronRight,
  FlameKindling,
  CheckCircle,
  AlertTriangle,
  FileCheck
} from 'lucide-react';

export default function SicurezzaSulLavoro() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans text-slate-800">
      
      {/* NAVBAR */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo & Company Name */}
          <a href="/" className="flex items-center gap-3 group">
            <div className="relative w-20 h-20 overflow-hidden transition-transform duration-300 group-hover:scale-105">
              <Image 
                src="/logo.png" 
                alt="S.A.I. Logo" 
                fill 
                sizes="80px"
                className="object-contain" 
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className={`text-xl font-black tracking-tight transition-colors ${
                scrolled ? 'text-sai-blue group-hover:text-sai-blue-light' : 'text-white group-hover:text-white/80'
              }`}>S.A.I. s.r.l.</span>
              <span className={`text-xs font-bold tracking-wider uppercase leading-none transition-colors ${
                scrolled ? 'text-sai-green' : 'text-sai-green-light'
              }`}>Salute Ambiente Igiene</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <div className="relative group flex items-center">
              <button 
                className={`text-sm font-bold transition-colors flex items-center gap-1 ${
                  scrolled ? 'text-slate-600 hover:text-sai-blue' : 'text-white/95 hover:text-white'
                }`}
              >
                Servizi
                <svg className="w-3 h-3 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-72 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-150 scale-95 group-hover:scale-100 z-[100]">
                <div className="bg-white border border-slate-100 rounded-2xl shadow-2xl p-2 grid grid-cols-1 gap-0.5 text-slate-800">
                  <a href="/sicurezza-sul-lavoro" className="px-3.5 py-2.5 hover:bg-slate-50 text-xs font-bold text-sai-blue rounded-lg transition-colors flex items-center justify-between bg-sai-blue/5">
                    <span>Sicurezza sul Lavoro</span>
                    <span className="text-[9px] bg-sai-blue/10 text-sai-blue px-1.5 py-0.5 rounded font-black">D.Lgs. 81/08</span>
                  </a>
                  <a href="/haccp" className="px-3.5 py-2.5 hover:bg-slate-50 text-xs font-bold text-slate-700 hover:text-sai-blue rounded-lg transition-colors flex items-center justify-between">
                    <span>Igiene Alimentare (HACCP)</span>
                    <span className="text-[9px] bg-sai-green/10 text-sai-green px-1.5 py-0.5 rounded font-black">HACCP</span>
                  </a>
                  <a href="/legionella" className="px-3.5 py-2.5 hover:bg-slate-50 text-xs font-bold text-slate-700 hover:text-sai-blue rounded-lg transition-colors flex items-center justify-between">
                    <span>Controllo Legionella</span>
                    <span className="text-[9px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded font-black">Linee Guida</span>
                  </a>
                  <a href="/studiodontoiatrici" className="px-3.5 py-2.5 hover:bg-slate-50 text-xs font-bold text-slate-700 hover:text-sai-blue rounded-lg transition-colors flex items-center justify-between">
                    <span>Autoclavi Odontoiatri</span>
                    <span className="text-[9px] bg-rose-100 text-rose-600 px-1.5 py-0.5 rounded font-black">D.G.R.C. 7301</span>
                  </a>
                  <a href="/analisi-acque" className="px-3.5 py-2.5 hover:bg-slate-50 text-xs font-bold text-slate-700 hover:text-sai-blue rounded-lg transition-colors flex items-center justify-between">
                    <span>Analisi Acque & Piscine</span>
                    <span className="text-[9px] bg-cyan-100 text-cyan-600 px-1.5 py-0.5 rounded font-black">D.Lgs. 18/23</span>
                  </a>
                  <a href="/gasradon" className="px-3.5 py-2.5 hover:bg-slate-50 text-xs font-bold text-slate-700 hover:text-sai-blue rounded-lg transition-colors flex items-center justify-between">
                    <span>Misurazione Gas Radon</span>
                    <span className="text-[9px] bg-amber-100 text-amber-600 px-1.5 py-0.5 rounded font-black">D.Lgs. 101/20</span>
                  </a>
                  <a href="/gdpr" className="px-3.5 py-2.5 hover:bg-slate-50 text-xs font-bold text-slate-700 hover:text-sai-blue rounded-lg transition-colors flex items-center justify-between">
                    <span>Privacy & GDPR</span>
                    <span className="text-[9px] bg-blue-100 text-sai-blue px-1.5 py-0.5 rounded font-black">Reg. UE 679/16</span>
                  </a>
                  <a href="/formazione" className="px-3.5 py-2.5 hover:bg-slate-50 text-xs font-bold text-slate-700 hover:text-sai-blue rounded-lg transition-colors flex items-center justify-between">
                    <span>Formazione Professionale</span>
                    <span className="text-[9px] bg-sai-blue/10 text-sai-blue px-1.5 py-0.5 rounded font-black">Abilitazioni</span>
                  </a>
                </div>
              </div>
            </div>
            <a href="/chisiamo" className={`text-sm font-bold transition-colors ${scrolled ? 'text-slate-600 hover:text-sai-blue' : 'text-white/95 hover:text-white'}`}>Chi Siamo</a>
            <a href="/#perche-noi" className={`text-sm font-bold transition-colors ${scrolled ? 'text-slate-600 hover:text-sai-blue' : 'text-white/95 hover:text-white'}`}>Perché Sceglierci</a>
            <a href="/#contatti" className={`text-sm font-bold transition-colors ${scrolled ? 'text-slate-600 hover:text-sai-blue' : 'text-white/95 hover:text-white'}`}>Contatti</a>
            <a 
              href="/#contatti" 
              className="px-5 py-2.5 bg-sai-blue text-white rounded-xl text-sm font-bold hover:bg-sai-blue-light transition-all shadow-lg shadow-sai-blue/20 hover:scale-105"
            >
              Invia un messaggio
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 transition-colors ${
              scrolled ? 'text-slate-700 hover:text-sai-blue' : 'text-white hover:text-white/80'
            }`}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-white flex flex-col md:hidden overflow-y-auto">
          <div className="flex justify-between items-center px-6 py-5 border-b border-slate-100">
            <a href="/" className="flex items-center gap-2">
              <span className="text-lg font-black text-sai-blue">S.A.I. s.r.l.</span>
            </a>
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
              aria-label="Chiudi menu"
            >
              <X size={22} />
            </button>
          </div>
          <div className="px-6 py-6 flex flex-col gap-1">
            <div className="border-b border-slate-100 pb-3 mb-2">
              <span className="text-xs font-black text-sai-green uppercase tracking-wider block mb-2">Servizi</span>
              <div className="flex flex-col gap-1">
                <a href="/sicurezza-sul-lavoro" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 text-sm font-bold text-sai-blue bg-sai-blue/5 rounded-lg transition-colors flex items-center justify-between">
                  Sicurezza sul Lavoro <span className="text-[9px] bg-sai-blue/10 text-sai-blue px-1.5 py-0.5 rounded font-black">D.Lgs. 81/08</span>
                </a>
                <a href="/haccp" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 text-sm font-bold text-slate-700 hover:text-sai-blue hover:bg-slate-50 rounded-lg transition-colors flex items-center justify-between">
                  Igiene Alimentare (HACCP) <span className="text-[9px] bg-sai-green/10 text-sai-green px-1.5 py-0.5 rounded font-black">OSA</span>
                </a>
                <a href="/legionella" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 text-sm font-bold text-slate-700 hover:text-sai-blue hover:bg-slate-50 rounded-lg transition-colors flex items-center justify-between">
                  Controllo Legionella <span className="text-[9px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded font-black">Linee Guida</span>
                </a>
                <a href="/studiodontoiatrici" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 text-sm font-bold text-slate-700 hover:text-sai-blue hover:bg-slate-50 rounded-lg transition-colors flex items-center justify-between">
                  Autoclavi Odontoiatri <span className="text-[9px] bg-rose-100 text-rose-600 px-1.5 py-0.5 rounded font-black">D.G.R.C. 7301</span>
                </a>
                <a href="/analisi-acque" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 text-sm font-bold text-slate-700 hover:text-sai-blue hover:bg-slate-50 rounded-lg transition-colors flex items-center justify-between">
                  Analisi Acque & Piscine <span className="text-[9px] bg-cyan-100 text-cyan-600 px-1.5 py-0.5 rounded font-black">D.Lgs. 18/23</span>
                </a>
                <a href="/gasradon" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 text-sm font-bold text-slate-700 hover:text-sai-blue hover:bg-slate-50 rounded-lg transition-colors flex items-center justify-between">
                  Misurazione Gas Radon <span className="text-[9px] bg-amber-100 text-amber-600 px-1.5 py-0.5 rounded font-black">D.Lgs. 101/20</span>
                </a>
                <a href="/gdpr" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 text-sm font-bold text-slate-700 hover:text-sai-blue hover:bg-slate-50 rounded-lg transition-colors flex items-center justify-between">
                  Privacy & GDPR <span className="text-[9px] bg-blue-100 text-sai-blue px-1.5 py-0.5 rounded font-black">Reg. UE 679/16</span>
                </a>
                <a href="/formazione" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 text-sm font-bold text-slate-700 hover:text-sai-blue hover:bg-slate-50 rounded-lg transition-colors flex items-center justify-between">
                  Formazione Professionale <span className="text-[9px] bg-sai-blue/10 text-sai-blue px-1.5 py-0.5 rounded font-black">Abilitazioni</span>
                </a>
              </div>
            </div>
            <a href="/chisiamo" onClick={() => setMobileMenuOpen(false)} className="py-3 text-lg font-bold border-b border-slate-100 text-slate-800">Chi Siamo</a>
            <a href="/#perche-noi" onClick={() => setMobileMenuOpen(false)} className="py-3 text-lg font-bold border-b border-slate-100 text-slate-800">Perché Sceglierci</a>
            <a href="/#contatti" onClick={() => setMobileMenuOpen(false)} className="py-3 text-lg font-bold border-b border-slate-100 text-slate-800">Contatti</a>
          </div>
          <div className="px-6 pb-8 mt-auto">
            <a href="/#contatti" onClick={() => setMobileMenuOpen(false)} className="block w-full py-3.5 bg-sai-blue text-white rounded-xl text-center font-bold shadow-lg shadow-sai-blue/20">Invia un messaggio</a>
          </div>
        </div>
      )}

      {/* HERO SECTION */}
      <header 
        className="relative pt-36 pb-24 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-950 text-white"
        style={{ clipPath: 'ellipse(100% 85% at 50% 15%)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/90 to-slate-950/95 z-0" />
        
        {/* Decorative graphic background representing electricity panel */}
        <div className="absolute inset-0 opacity-20 z-0 bg-[url('https://static.wixstatic.com/media/11062b_f67dff5c5ff74c32bfc124c6a631424c~mv2.jpg')] bg-cover bg-center" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-6">
          <span className="text-xs font-black tracking-widest text-sai-green-light uppercase bg-sai-green/10 border border-sai-green-light/20 px-3.5 py-1.5 rounded-full inline-block">
            Approfondimento a cura di A.Novissimo
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
            Sicurezza sul Lavoro
          </h1>
          <p className="text-slate-300 text-lg max-w-3xl leading-relaxed mx-auto">
            Consulenza e procedure operative per l'adeguamento normativo al D.Lgs. 81/08 e successive modifiche. Proteggi la tua azienda ed i tuoi collaboratori.
          </p>
        </div>
        
        {/* Bordino verde a tema di 6px */}
        <div className="absolute bottom-0 left-0 w-full h-[6px] bg-sai-green z-25" />
      </header>

      {/* INTRODUCTION */}
      <section className="py-20 max-w-5xl mx-auto px-6 space-y-8">
        <div className="bg-white border border-slate-100 p-8 rounded-2xl shadow-xl space-y-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-sai-green" />
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            LA SICUREZZA SUL LAVORO
          </h2>
          <span className="text-xs font-black tracking-wider text-sai-blue uppercase block mt-1">
            D.Lgs.vo 81/08 e s.m. e i. • QUALI OBBLIGHI?
          </span>
          <p className="text-slate-600 leading-relaxed text-base">
            La tutela della salute e della sicurezza nei luoghi di lavoro rappresenta un pilastro fondamentale per qualsiasi realtà produttiva, sia essa pubblica o privata. S.A.I. s.r.l. offre un affiancamento costante per adempiere a tutti gli obblighi previsti dal D.Lgs. 81/08, garantendo tranquillità legale e un ambiente lavorativo sicuro e salubre.
          </p>
        </div>
      </section>

      {/* CHI È INTERESSATO */}
      <section className="py-16 bg-slate-100">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-4 flex justify-center">
            <div className="p-6 rounded-full bg-sai-blue/10 text-sai-blue">
              <Users size={64} />
            </div>
          </div>
          <div className="md:col-span-8 space-y-4">
            <h3 className="text-xl font-extrabold text-slate-900">Chi è Interessato?</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Chiunque svolge un'attività lavorativa, indipendentemente dalla tipologia contrattuale, nell'ambito dell'organizzazione di un datore di lavoro pubblico o privato, con o senza retribuzione, anche al solo fine di apprendere un mestiere, un arte o una professione, deve adeguarsi al dettato normativo così come devono contribuire insieme al datore di lavoro all'adempimento degli obblighi previsti a tutela della salute e sicurezza sui luoghi di lavoro.
            </p>
          </div>
        </div>
      </section>

      {/* RESPONSABILITY & DUTIES */}
      <section className="py-20 max-w-5xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Datore di lavoro */}
        <div className="lg:col-span-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-sai-green/10 flex items-center justify-center text-sai-green">
              <Shield size={24} />
            </div>
            <h3 className="text-xl font-black text-slate-900">Chi è Responsabile?</h3>
          </div>
          <p className="text-slate-600 text-sm leading-relaxed">
            Il soggetto titolare del rapporto di lavoro, sul quale ricade la responsabilità dell'unità produttiva in quanto esercita i poteri decisionali e di spesa, è responsabile degli obblighi discendenti dal D.Lgs.vo 81/08 coordinato con il D.L.106/09.
          </p>
          <div className="bg-white border border-slate-100 p-6 rounded-xl space-y-4">
            <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider text-sai-blue">Obblighi del Datore di Lavoro</h4>
            <ul className="space-y-3">
              {[
                "Elaborazione del documento di valutazione dei rischi (DVR)",
                "Designazione del Responsabile del Servizio di Prevenzione e Protezione (RSPP)",
                "Nomina del medico competente per la sorveglianza sanitaria",
                "Designazione addetti antincendio, primo soccorso ed evacuazione",
                "Fornitura dei dispositivi di protezione individuale (DPI) idonei",
                "Obblighi di informazione, formazione e addestramento del personale"
              ].map((item, idx) => (
                <li key={idx} className="flex gap-2 text-xs text-slate-600 items-start">
                  <CheckCircle size={16} className="text-sai-green shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Lavoratori */}
        <div className="lg:col-span-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-rose-100 flex items-center justify-center text-rose-500">
              <Users size={24} />
            </div>
            <h3 className="text-xl font-black text-slate-900">Diritti e Doveri dei Lavoratori</h3>
          </div>
          <p className="text-slate-600 text-sm leading-relaxed">
            Il lavoratore presta la propria opera con rapporto di lavoro subordinato anche temporaneo, speciale, o di formazione. Per il D.Lgs. 81/08 la definizione si allarga a più soggetti, anche privi di retribuzione (borsisti, tirocinanti, volontari). Al lavoratore spettano precisi diritti e doveri:
          </p>
          <div className="bg-white border border-slate-100 p-6 rounded-xl space-y-4">
            <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider text-rose-500">Doveri Comportamentali</h4>
            <ul className="space-y-3">
              {[
                "Osservare le disposizioni ricevute dai superiori in materia di sicurezza",
                "Utilizzare correttamente macchine, impianti, sostanze e DPI",
                "Segnalare subito al preposto e al RLS pericoli e inefficienze",
                "Non rimuovere o modificare segnalazioni o dispositivi di sicurezza",
                "Sottoporsi ai controlli sanitari stabiliti dal medico competente"
              ].map((item, idx) => (
                <li key={idx} className="flex gap-2 text-xs text-slate-600 items-start">
                  <ChevronRight size={16} className="text-rose-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* COSA FA IL PREPOSTO & RLS */}
      <section className="py-16 bg-slate-100">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Preposto */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
            <h3 className="text-lg font-black text-slate-900">Cosa deve fare il Preposto?</h3>
            <ul className="space-y-3">
              <li className="flex gap-2 text-xs text-slate-600">
                <span className="text-sai-green">✔</span> Attiva concretamente le misure disposte dal datore di lavoro e dal dirigente;
              </li>
              <li className="flex gap-2 text-xs text-slate-600">
                <span className="text-sai-green">✔</span> Controlla e vigila che i lavoratori rispettino le disposizioni di sicurezza;
              </li>
              <li className="flex gap-2 text-xs text-slate-600">
                <span className="text-sai-green">✔</span> Comunica al dirigente ogni informazione sui rischi e sui sistemi di prevenzione.
              </li>
            </ul>
          </div>

          {/* RLS */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
            <h3 className="text-lg font-black text-slate-900">Incarichi per il Rappresentante (RLS)</h3>
            <p className="text-xs text-slate-500">Ogni RLS eletto dai lavoratori ha il diritto di:</p>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>• Ricevere una formazione tecnica e giuridica in tema di sicurezza;</li>
              <li>• Accedere ai documenti aziendali (registri infortuni, schede tecniche);</li>
              <li>• Svolgere sopralluoghi ed accedere liberamente ai luoghi di lavoro;</li>
              <li>• Ricevere informazioni su DVR, organizzazione aziendale e dati sanitari anonimi.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* MEDICO COMPETENTE & RSPP */}
      <section className="py-20 max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-4">
          <h3 className="text-xl font-black text-slate-900">Cosa fa il Medico Competente?</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            È un medico con requisiti professionali specifici che si cura dello stato di salute dei lavoratori, nel rispetto del segreto professionale:
          </p>
          <ul className="space-y-2.5 text-xs text-slate-600">
            <li className="flex gap-2"><CheckCircle size={16} className="text-sai-green shrink-0" /> Collabora alla valutazione dei rischi e all'attuazione delle misure preventive;</li>
            <li className="flex gap-2"><CheckCircle size={16} className="text-sai-green shrink-0" /> Effettua gli accertamenti sanitari secondo protocolli stabiliti;</li>
            <li className="flex gap-2"><CheckCircle size={16} className="text-sai-green shrink-0" /> Istituisce ed aggiorna la cartella sanitaria di ogni lavoratore;</li>
            <li className="flex gap-2"><CheckCircle size={16} className="text-sai-green shrink-0" /> Esprime i giudizi di idoneità alla mansione specifica.</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-black text-slate-900">A cosa serve il Servizio RSPP?</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Come organo di consulenza tecnica e giuridica del Datore di Lavoro, il Servizio di Prevenzione e Protezione:
          </p>
          <ul className="space-y-2.5 text-xs text-slate-600">
            <li className="flex gap-2"><CheckCircle size={16} className="text-sai-blue shrink-0" /> Individua i fattori di rischio e collabora alla stesura del DVR;</li>
            <li className="flex gap-2"><CheckCircle size={16} className="text-sai-blue shrink-0" /> Elabora le procedure di sicurezza operative per le mansioni;</li>
            <li className="flex gap-2"><CheckCircle size={16} className="text-sai-blue shrink-0" /> Ispeziona periodicamente gli ambienti e le attrezzature di lavoro;</li>
            <li className="flex gap-2"><CheckCircle size={16} className="text-sai-blue shrink-0" /> Contribuisce alla formazione dei lavoratori sui rischi e prevenzione.</li>
          </ul>
        </div>
      </section>

      {/* DISPOSIZIONI ANTINCENDIO */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-sai-green/10 rounded-full blur-3xl" />
        <div className="max-w-5xl mx-auto px-6 space-y-12">
          
          <div className="text-center space-y-4">
            <span className="text-xs font-black tracking-widest text-sai-green-light uppercase">Normativa Antincendio</span>
            <h2 className="text-3xl font-black tracking-tight">Disposizioni per gli Addetti Antincendio</h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto">
              Il D.M. 2 settembre 2021 (in vigore dal 4 ottobre 2022) stabilisce disposizioni rigide per la formazione degli addetti antincendio e per i requisiti strutturali.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/5 border border-white/10 p-6 rounded-xl space-y-4">
              <h4 className="font-extrabold text-sai-green-light text-sm uppercase tracking-wider">Attestato di Idoneità Tecnica Obbligatorio</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                I lavoratori presenti nei luoghi di lavoro indicati nell'allegato IV del D.M. 2/9/2021 (quali alberghi con oltre 100 posti letto, strutture sanitarie con ricovero, locali di pubblico spettacolo con oltre 100 persone, scuole con oltre 300 persone, attività commerciali con superficie aperta al pubblico superiore a 500 mq) <strong>DEVONO</strong> conseguire l'attestato di idoneità rilasciato dai Vigili del Fuoco.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-6 rounded-xl space-y-4">
              <h4 className="font-extrabold text-sai-green-light text-sm uppercase tracking-wider">Criteri Generali e Mitigazione</h4>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex gap-2">✔ Gestione della Sicurezza Antincendio (GSA) obbligatoria;</li>
                <li className="flex gap-2">✔ Vie di esodo sempre sgombre e percorribili in autonomia;</li>
                <li className="flex gap-2">✔ Estintori con capacità minima 13A (6kg o 6lt) a max 30 metri;</li>
                <li className="flex gap-2">✔ Coperte antincendio conformi alla norma UNI CEI EN 1869:2019.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SORVEGLIANZA SANITARIA E VISITE */}
      <section className="py-20 max-w-5xl mx-auto px-6 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-black tracking-widest text-sai-blue uppercase bg-sai-blue/10 px-3.5 py-1.5 rounded-full inline-block">Art. 41 D.Lgs. 81/08</span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Dettagli Sorveglianza Sanitaria</h2>
          <p className="text-slate-500 text-sm">Le visite mediche ed i relativi obblighi normativi in capo al datore di lavoro:</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { comma: "Comma 1 lett. b)", title: "Visita su richiesta", desc: "Qualora il lavoratore ne faccia richiesta e la stessa sia ritenuta dal medico competente correlata ai rischi lavorativi." },
            { comma: "Comma 2 lett. a)", title: "Visita preventiva", desc: "Intesa a constatare l'assenza di controindicazioni al lavoro cui il lavoratore è destinato per valutare l'idoneità specifica." },
            { comma: "Comma 2 lett. b)", title: "Visita periodica", desc: "Per controllare lo stato di salute nel tempo. La periodicità è stabilita dal medico competente in base alla valutazione del rischio." },
            { comma: "Comma 2 lett. c)", title: "Richiesta per peggioramento", desc: "Qualora ritenuta correlata ai rischi o a condizioni di salute suscettibili di peggioramento a causa dell'attività svolta." },
            { comma: "Comma 2 lett. d)", title: "Cambio mansione", desc: "Visita medica effettuata in occasione del cambio della mansione per verificare l'idoneità alla nuova mansione specifica." },
            { comma: "Comma 2 lett. e)", title: "Cessazione rapporto", desc: "Visita effettuata alla cessazione del rapporto di lavoro nei casi specifici previsti dalla normativa vigente." },
            { comma: "Comma 2 lett. e-bis)", title: "Preassuntiva", desc: "Visita medica preventiva effettuata in fase preassuntiva per accertare l'idoneità del candidato prima dell'assunzione." },
            { comma: "Comma 2 lett. e-ter)", title: "Rientro da malattia (> 60gg)", desc: "Visita medica precedente alla ripresa del lavoro, a seguito di assenza per motivi di salute di durata superiore a 60 giorni continuativi." }
          ].map((visita, idx) => (
            <div key={idx} className="bg-white border border-slate-100 p-6 rounded-xl shadow-sm space-y-2">
              <span className="text-[10px] font-black text-sai-green uppercase tracking-wider block">{visita.comma}</span>
              <h4 className="text-sm font-extrabold text-slate-900">{visita.title}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">{visita.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ULTIME MODIFICHE DECRETO LEGGE */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-sai-blue/10 rounded-full blur-3xl" />
        <div className="max-w-5xl mx-auto px-6 space-y-8">
          
          <div className="space-y-4">
            <span className="text-xs font-black tracking-widest text-sai-green-light uppercase">Aggiornamenti Legislativi</span>
            <h2 className="text-3xl font-black tracking-tight leading-tight">Modifiche apportate dal D.L. 4 Maggio 2023</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Le principali modifiche introdotte ed entrate in vigore il 5 maggio 2023 al D.Lgs. 81/08 stabiliscono nuovi adempimenti:
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-white/5 border border-white/10 p-5 rounded-xl">
              <h5 className="font-bold text-white text-xs uppercase tracking-wider text-sai-green-light mb-1">Articolo 25, comma 1, lett. e-bis)</h5>
              <p className="text-xs text-slate-300 leading-relaxed">
                In occasione della visita di assunzione il medico competente richiede al lavoratore la cartella sanitaria rilasciata dal precedente datore di lavoro e tiene conto del suo contenuto ai fini della formulazione del giudizio di idoneità.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-5 rounded-xl">
              <h5 className="font-bold text-white text-xs uppercase tracking-wider text-sai-green-light mb-1">Articolo 37, comma 2, lett. b-bis)</h5>
              <p className="text-xs text-slate-300 leading-relaxed">
                Monitoraggio dell’applicazione degli accordi in materia di formazione, nonché il controllo sulle attività formative e sul rispetto della normativa di riferimento, sia da parte dei soggetti che erogano la formazione, sia da parte dei soggetti destinatari della stessa.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-5 rounded-xl">
              <h5 className="font-bold text-white text-xs uppercase tracking-wider text-sai-green-light mb-1">Articolo 73, comma 4-bis</h5>
              <p className="text-xs text-slate-300 leading-relaxed">
                Il datore di lavoro che fa uso delle attrezzature che richiedono conoscenze particolari (di cui all’art. 71, comma 7) provvede alla propria formazione e al proprio addestramento specifico al fine di garantire l’utilizzo delle attrezzature in modo idoneo e sicuro.
              </p>
            </div>
          </div>

          <div className="p-6 bg-red-950/20 border border-red-500/20 rounded-xl flex gap-4 items-start">
            <AlertTriangle className="text-red-500 w-6 h-6 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h6 className="text-sm font-bold text-red-400">Sanzioni e Tempistiche</h6>
              <p className="text-xs text-slate-300 leading-relaxed">
                Si ricorda che tutte le inosservanze al Decreto Legislativo 81/08 e s.m. e i. sono sempre punite con sanzioni Penali, Amministrative e Pecuniarie. Per gli adempimenti di quanto sopradetto, i datori di lavoro hanno l’obbligo di adempiervi immediatamente.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* CONTACT BANNER (GREEN THEME) */}
      <section className="py-16 bg-sai-green text-white text-center space-y-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-sai-green-dark/20 to-emerald-600/30 z-0" />
        
        <div className="relative z-10 space-y-6 max-w-4xl mx-auto px-6">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight">Hai bisogno di consulenza specialistica?</h3>
          <p className="text-white/90 text-sm max-w-xl mx-auto">
            I nostri tecnici e coordinatori sono a tua completa disposizione. Contattaci per telefono, invia una mail o avvia una chat immediata su WhatsApp.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-2">
            <a 
              href="/#contatti" 
              className="w-full sm:w-auto px-8 py-4 bg-sai-blue hover:bg-sai-blue-dark text-white font-bold rounded-xl shadow-lg transition-all hover:scale-105"
            >
              Invia un Messaggio
            </a>
            <a 
              href="tel:0810608910" 
              className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-xl transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              <Phone size={18} /> Chiama 081 06 08 910
            </a>
            <a 
              href="https://wa.me/393938879849" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition-all hover:scale-105 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.59 1.984 14.113.96 11.488.96 6.05 1.024 1.628 5.395 1.624 10.825c-.001 1.739.46 3.43 1.332 4.954l-.988 3.613 3.68-.966c1.5.82 3.1 1.25 4.7 1.25zM17.47 14.397c-.32-.16-1.89-.93-2.185-1.04-.294-.11-.51-.16-.723.16-.214.32-.83.1.04-1.02.213-.22.43-.33.65-.54.21-.21.27-.41.13-.57-.14-.16-1.02-2.45-1.4-3.37-.37-.9-.74-.78-1.02-.79-.26-.01-.57-.01-.88-.01s-.81.12-1.24.58c-.43.46-1.64 1.6-1.64 3.9s1.68 4.52 1.91 4.83c.23.3 3.3 5.04 8.01 7.07 1.12.48 2 .77 2.68.99 1.13.36 2.15.31 2.96.19.9-.13 2.18-.89 2.49-1.75.31-.86.31-1.6.22-1.75-.09-.15-.32-.24-.65-.4z"/>
              </svg>
              WhatsApp
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
