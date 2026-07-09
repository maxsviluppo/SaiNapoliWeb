"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  Shield, 
  Droplet, 
  CheckCircle2, 
  Phone, 
  Mail, 
  MapPin, 
  Menu, 
  X, 
  Users, 
  FileText, 
  Activity, 
  AlertTriangle,
  FileCheck,
  CheckCircle,
  Thermometer,
  Sparkles,
  Info
} from 'lucide-react';

export default function LegionellaPage() {
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
                  <a href="/sicurezza-sul-lavoro" className="px-3.5 py-2.5 hover:bg-slate-50 text-xs font-bold text-slate-700 hover:text-sai-blue rounded-lg transition-colors flex items-center justify-between">
                    <span>Sicurezza sul Lavoro</span>
                    <span className="text-[9px] bg-sai-blue/10 text-sai-blue px-1.5 py-0.5 rounded font-black">D.Lgs. 81/08</span>
                  </a>
                  <a href="/#servizi" className="px-3.5 py-2.5 hover:bg-slate-50 text-xs font-bold text-slate-700 hover:text-sai-blue rounded-lg transition-colors flex items-center justify-between">
                    <span>Igiene Alimentare</span>
                    <span className="text-[9px] bg-sai-green/10 text-sai-green px-1.5 py-0.5 rounded font-black">HACCP</span>
                  </a>
                  <a href="/legionella" className="px-3.5 py-2.5 hover:bg-slate-50 text-xs font-bold text-sai-blue rounded-lg transition-colors flex items-center justify-between bg-sai-blue/5">
                    <span>Controllo Legionella</span>
                    <span className="text-[9px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded font-black">Linee Guida</span>
                  </a>
                  <a href="/#servizi" className="px-3.5 py-2.5 hover:bg-slate-50 text-xs font-bold text-slate-700 hover:text-sai-blue rounded-lg transition-colors">Autoclavi Odontoiatri</a>
                  <a href="/#servizi" className="px-3.5 py-2.5 hover:bg-slate-50 text-xs font-bold text-slate-700 hover:text-sai-blue rounded-lg transition-colors">Analisi Acque & Piscine</a>
                  <a href="/#servizi" className="px-3.5 py-2.5 hover:bg-slate-50 text-xs font-bold text-slate-700 hover:text-sai-blue rounded-lg transition-colors">Misurazione Gas Radon</a>
                  <a href="/#servizi" className="px-3.5 py-2.5 hover:bg-slate-50 text-xs font-bold text-slate-700 hover:text-sai-blue rounded-lg transition-colors">Privacy & GDPR</a>
                  <a href="/#servizi" className="px-3.5 py-2.5 hover:bg-slate-50 text-xs font-bold text-slate-700 hover:text-sai-blue rounded-lg transition-colors">Formazione Professionale</a>
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
                <a href="/sicurezza-sul-lavoro" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 text-sm font-bold text-slate-700 hover:text-sai-blue hover:bg-slate-50 rounded-lg transition-colors">
                  Sicurezza sul Lavoro
                </a>
                <a href="/#servizi" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 text-sm font-bold text-slate-700 hover:text-sai-blue hover:bg-slate-50 rounded-lg transition-colors">Igiene Alimentare (HACCP)</a>
                <a href="/legionella" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 text-sm font-bold text-sai-blue bg-sai-blue/5 rounded-lg transition-colors flex items-center justify-between">
                  Controllo Legionella <span className="text-[9px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded font-black">Linee Guida</span>
                </a>
                <a href="/#servizi" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 text-sm font-bold text-slate-700 hover:text-sai-blue hover:bg-slate-50 rounded-lg transition-colors">Autoclavi Odontoiatri</a>
                <a href="/#servizi" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 text-sm font-bold text-slate-700 hover:text-sai-blue hover:bg-slate-50 rounded-lg transition-colors">Analisi Acque & Piscine</a>
                <a href="/#servizi" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 text-sm font-bold text-slate-700 hover:text-sai-blue hover:bg-slate-50 rounded-lg transition-colors">Privacy & GDPR</a>
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
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/95 to-slate-950 z-0" />
        
        {/* Sfondo tematico sull'acqua/rischio legionella */}
        <div className="absolute inset-0 opacity-15 z-0 bg-[url('https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=2070')] bg-cover bg-center" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-6">
          <span className="text-xs font-black tracking-widest text-sai-green-light uppercase bg-sai-green/10 border border-sai-green-light/20 px-3.5 py-1.5 rounded-full inline-block">
            Approfondimento a cura di A.Novissimo
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
            Prevenzione e Controllo Legionella
          </h1>
          <p className="text-slate-300 text-lg max-w-3xl leading-relaxed mx-auto">
            Consulenza specialistica e procedure operative per il monitoraggio della Legionella spp negli impianti idrici e aeraulici ai sensi del D.Lgs. 81/08 e dell'Accordo Stato Regioni.
          </p>
        </div>
        
        {/* Margine al lato inferiore della slide di colore verde */}
        <div className="absolute bottom-0 left-0 w-full h-[6px] bg-sai-green z-25" />
      </header>

      {/* COS'È LA LEGIONELLA */}
      <section className="py-20 max-w-5xl mx-auto px-6 space-y-8">
        <div className="bg-white border border-slate-100 p-8 rounded-2xl shadow-xl space-y-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-red-500" />
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase">
            Legionella: Cos'è e Storia
          </h2>
          <span className="text-xs font-black tracking-wider text-red-500 uppercase block mt-1">
            Un batterio insidioso e altamente letale negli impianti tecnologici
          </span>
          <div className="text-slate-600 space-y-4 leading-relaxed text-base">
            <p>
              La <strong>Legionella</strong> è un batterio gram negativo, di forma cocco-bacillare, dotato di mobilità tramite flagelli, asporigeno (che non produce spore). Non è capsulato ed è un aerobio obbligato (vive solo in presenza di ossigeno). Un batterio ancora oggi poco conosciuto ma la cui azione lo rende altamente letale.
            </p>
            <p className="bg-slate-50 p-4 rounded-xl border-l-4 border-sai-blue text-sm italic">
              Deve il suo nome all'epidemia di polmonite che si verificò nell'estate del 1976 in un albergo di Philadelphia, tra i partecipanti ad una riunione dell'American Legion. Erano presenti 4000 veterani del Vietnam (Legionari), di questi 221 si ammalarono di una forma di polmonite e ben 34 persero la vita. Fu identificato un nuovo batterio al quale venne dato appunto il nome di "Legionella" e si capì che si era sviluppato nell'impianto di condizionamento presente nell'albergo.
            </p>
          </div>
        </div>
      </section>

      {/* SPECIE E TRASMISSIONE */}
      <section className="py-16 bg-slate-100">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Classificazione */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-sai-blue/10 flex items-center justify-center text-sai-blue">
              <Activity size={24} />
            </div>
            <h3 className="text-lg font-black text-slate-900">Classificazione Clinica</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Il genere Legionella spp. si divide in <strong>61 specie e 70 sierogruppi</strong>. Le specie di rilievo clinico sono:
            </p>
            <ul className="grid grid-cols-2 gap-2 text-xs font-bold text-slate-700">
              <li className="flex items-center gap-2 bg-slate-50 p-2 rounded">
                <span className="w-1.5 h-1.5 rounded-full bg-sai-blue"></span>
                L. pneumophila (90%)
              </li>
              <li className="flex items-center gap-2 bg-slate-50 p-2 rounded">
                <span className="w-1.5 h-1.5 rounded-full bg-sai-blue"></span>
                L. micadei
              </li>
              <li className="flex items-center gap-2 bg-slate-50 p-2 rounded">
                <span className="w-1.5 h-1.5 rounded-full bg-sai-blue"></span>
                L. longreachae
              </li>
              <li className="flex items-center gap-2 bg-slate-50 p-2 rounded">
                <span className="w-1.5 h-1.5 rounded-full bg-sai-blue"></span>
                L. dumoffii
              </li>
            </ul>
            <p className="text-xs text-slate-500 italic">
              Il 90% dei casi clinici è dovuto alla specie <strong>legionella pneumophila</strong> con il sierogruppo 1 e 6.
            </p>
          </div>

          {/* Trasmissione */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-sai-green/10 flex items-center justify-center text-sai-green">
              <Droplet size={24} />
            </div>
            <h3 className="text-lg font-black text-slate-900">Come si Trasmette</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              La Legionella si trasmette per via respiratoria mediante <strong>inalazione, aspirazione o microaspirazione di aerosol</strong> contenente il batterio Legionella o mediante particelle derivate per essiccamento.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              Le goccioline di acqua si formano sia spruzzando acqua che facendo gorgogliare aria in essa (docce, sciacquoni, ecc.). Gocce di diametro inferiore a <strong>5 micron</strong> arrivano direttamente agli alveoli polmonari causando la malattia.
            </p>
            <p className="text-xs text-red-500 font-bold bg-red-50 p-2.5 rounded-lg">
              ⚠️ È da escludere la trasmissione del batterio Legionella dall'acqua che viene ingerita e da contatti interumani.
            </p>
          </div>

        </div>
      </section>

      {/* DOVE SI ANNIDA E FATTORI DI RISCHIO */}
      <section className="py-20 max-w-5xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Dove si trova */}
        <div className="lg:col-span-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-sai-blue/10 flex items-center justify-center text-sai-blue">
              <Sparkles size={22} />
            </div>
            <h3 className="text-xl font-black text-slate-900">Ambienti e Fonti di Rischio</h3>
          </div>
          <p className="text-slate-600 text-sm leading-relaxed">
            Le legionelle spp. sono presenti negli ambienti acquatici naturali (acque sorgive, termali, fiumi, laghi) e da questi raggiungono gli impianti artificiali che fanno da amplificatori e diffusori del batterio:
          </p>
          
          <div className="grid grid-cols-1 gap-2.5">
            {[
              "Impianti idrici di acqua calda e fredda, rubinetti e soffioni docce",
              "Torri di raffreddamento ed evaporative, condensatori evaporativi",
              "Presenza di rami morti e zone di stagnazione della rete idrica",
              "Errato controllo della temperatura (intervallo ideale 20°C - 50°C)",
              "Erogazione intermittente dell'acqua ed autoclavi",
              "Vasche idromassaggio, stazioni termali, umidificatori",
              "Impianti idrici dei riuniti odontoiatrici"
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                <CheckCircle2 size={16} className="text-sai-green shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Fattori predisponenti */}
        <div className="lg:col-span-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500">
              <AlertTriangle size={22} />
            </div>
            <h3 className="text-xl font-black text-slate-900">Soggetti e Fattori di Rischio</h3>
          </div>
          <p className="text-slate-600 text-sm leading-relaxed">
            La probabilità di contrarre l'infezione da Legionella (Legionellosi o Febbre di Pontiac) dipende dall'intensità dell'esposizione e dalla suscettibilità del soggetto:
          </p>

          <div className="bg-white border border-slate-100 p-6 rounded-xl space-y-4 shadow-sm">
            <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider text-sai-blue">Fattori Predisponenti principali:</h4>
            <div className="grid grid-cols-2 gap-3 text-xs text-slate-700">
              <div className="bg-slate-50 p-2 rounded">👴 Età avanzata</div>
              <div className="bg-slate-50 p-2 rounded">🚬 Fumo di sigaretta</div>
              <div className="bg-slate-50 p-2 rounded">❤️ Malattie croniche</div>
              <div className="bg-slate-50 p-2 rounded">🛡️ Immunodeficienza</div>
              <div className="bg-slate-50 p-2 rounded">⏱️ Tempo di esposizione</div>
              <div className="bg-slate-50 p-2 rounded">📈 Carica batterica</div>
              <div className="bg-slate-50 p-2 rounded">🍬 Diabete e cardio-patie</div>
              <div className="bg-slate-50 p-2 rounded">🧪 Insufficienza renale</div>
            </div>
          </div>
        </div>

      </section>

      {/* CHI DEVE ADEGUARSI */}
      <section className="py-16 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-sai-blue/20 to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto px-6 space-y-8 relative z-10">
          <div className="text-center space-y-2">
            <h3 className="text-2xl sm:text-3xl font-black">Chi ha l'obbligo di adeguamento?</h3>
            <p className="text-slate-400 text-sm max-w-2xl mx-auto">
              L'obbligo della valutazione e gestione del rischio legionellosi si applica a tutti i gestori di strutture aperte al pubblico o con lavoratori dipendenti.
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 text-xs font-bold">
            {[
              "Alberghi e Hotel", "B&B e Guest House", "Affittacamere",
              "Case di cura e RSA", "Case vacanza", "Palestre e Centri Sportivi",
              "Studi Odontoiatrici", "Campeggi e Villaggi", "Centri Commerciali",
              "Ristoranti", "Centri Benessere & SPA", "Piscine pubbliche/private"
            ].map((str, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-3.5 text-center hover:bg-white/10 transition-colors">
                {str}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROTOCOLLO DI CONTROLLO */}
      <section className="py-20 max-w-5xl mx-auto px-6 space-y-12">
        <div className="text-center space-y-2">
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900">Come Contrastare il Rischio Legionella</h3>
          <p className="text-slate-600 text-sm max-w-2xl mx-auto">
            Il protocollo di controllo prevede l'inserimento della valutazione all'interno del DVR, strutturata in tre fasi sequenziali (Linee Guida per la Prevenzione ed il Controllo della Legionellosi).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Fase 1 */}
          <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm space-y-4 relative">
            <div className="absolute top-0 left-6 -translate-y-1/2 w-8 h-8 rounded-full bg-sai-blue text-white flex items-center justify-center font-black text-sm">
              1
            </div>
            <h4 className="font-extrabold text-slate-900 pt-2">Valutazione del Rischio</h4>
            <p className="text-slate-600 text-xs leading-relaxed">
              Indagine conoscitiva per individuare le specificità della struttura e di tutti gli impianti idrici ed aeraulici, rappresentati in uno schema di percorso idrico e aeraulico.
            </p>
          </div>

          {/* Fase 2 */}
          <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm space-y-4 relative">
            <div className="absolute top-0 left-6 -translate-y-1/2 w-8 h-8 rounded-full bg-sai-green text-white flex items-center justify-center font-black text-sm">
              2
            </div>
            <h4 className="font-extrabold text-slate-900 pt-2">Gestione del Rischio</h4>
            <p className="text-slate-600 text-xs leading-relaxed">
              Descrizione chiara e dettagliata degli interventi preventivi e delle procedure operative correttive per contenere, mitigare o eliminare lo sviluppo del batterio negli impianti.
            </p>
          </div>

          {/* Fase 3 */}
          <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm space-y-4 relative">
            <div className="absolute top-0 left-6 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center font-black text-sm">
              3
            </div>
            <h4 className="font-extrabold text-slate-900 pt-2">Comunicazione e Formazione</h4>
            <p className="text-slate-600 text-xs leading-relaxed">
              Formazione continua di tutti i soggetti interessati sul potenziale rischio, per l'acquisizione delle competenze necessarie a attuare le manutenzioni e prevenzioni ordinarie.
            </p>
          </div>

        </div>
      </section>

      {/* SICUREZZA SUL LAVORO E PERIODICITÀ */}
      <section className="py-16 bg-slate-100">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="space-y-4">
            <h4 className="text-lg font-black text-slate-900 uppercase">
              Legionella e Sicurezza sul Lavoro (D.Lgs. 81/08)
            </h4>
            <p className="text-slate-600 text-sm leading-relaxed">
              Il <strong>Titolo X, Art. 268 del D.Lgs. 81/08</strong> codifica il batterio Legionella come <strong>agente biologico del gruppo 2</strong> (agente che può causare malattie in soggetti umani e costituire un rischio per i lavoratori). 
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              Ne consegue l'obbligo inderogabile per il Datore di Lavoro di valutare il rischio di esposizione e riportare le misure di prevenzione e protezione nel Documento di Valutazione dei Rischi (DVR).
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/60 space-y-4">
            <div className="flex items-center gap-2 text-sai-blue font-bold text-sm">
              <FileCheck size={20} />
              <span>Quale periodicità ha la valutazione?</span>
            </div>
            <p className="text-slate-600 text-xs leading-relaxed">
              I titolari di impianti con reti idriche di acqua calda/fredda sanitaria, condizionamento o aeraulici devono effettuare e revisionare la valutazione del rischio <strong>almeno una volta all'anno (consigliato)</strong> e formalmente documentarla.
            </p>
            <div className="text-xs text-slate-500 bg-slate-50 p-3 rounded-lg border-l-2 border-sai-green">
              <strong>Obbligo di aggiornamento immediato in caso di:</strong> lavori di ristrutturazione o rifacimento degli impianti, modifiche gestionali, o qualora le analisi microbiologiche evidenzino positività alla ricerca di Legionella.
            </div>
          </div>

        </div>
      </section>

      {/* COME EFFETTUARE I CAMPIONAMENTI */}
      <section className="py-20 max-w-5xl mx-auto px-6 space-y-8">
        <div className="text-center space-y-2">
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase">Come si Effettuano i Campionamenti</h3>
          <p className="text-slate-600 text-sm">
            Metodologie corrette per l'esecuzione dei prelievi ed analisi di laboratorio conformi alle Linee Guida nazionali.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          <div className="md:col-span-7 space-y-4">
            <p className="text-slate-600 text-sm leading-relaxed">
              Il numero di campioni deve essere proporzionato alle dimensioni degli impianti idrici ed aeraulici della struttura. Per ciascun impianto di acqua calda e fredda sanitaria devono essere effettuati almeno i seguenti prelievi:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-bold text-slate-700">
              <div className="bg-white p-3 rounded-lg border border-slate-100 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sai-green" />
                Mandata serbatoio / bollitore
              </div>
              <div className="bg-white p-3 rounded-lg border border-slate-100 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sai-green" />
                Anello di ricircolo idrico
              </div>
              <div className="bg-white p-3 rounded-lg border border-slate-100 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sai-green" />
                Fondo serbatoi e bollitori
              </div>
              <div className="bg-white p-3 rounded-lg border border-slate-100 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sai-green" />
                Almeno 3 punti terminali caldi/freddi
              </div>
              <div className="bg-white p-3 rounded-lg border border-slate-100 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sai-green" />
                Addolcitori e filtri
              </div>
              <div className="bg-white p-3 rounded-lg border border-slate-100 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sai-green" />
                Punti soggetti a ristagno o biofilm
              </div>
            </div>
          </div>

          <div className="md:col-span-5 bg-slate-900 text-slate-300 p-6 rounded-2xl space-y-4">
            <h5 className="font-extrabold text-white text-sm flex items-center gap-2">
              <Thermometer size={18} className="text-sai-green-light" />
              Regole per il Prelievo:
            </h5>
            <ul className="space-y-3.5 text-xs">
              <li className="leading-relaxed">
                💧 <strong>Volume minimo:</strong> alzo zero, prelevare almeno 1 litro di acqua.
              </li>
              <li className="leading-relaxed">
                🚿 <strong>Verifica utilizzo comune:</strong> raccogliere al punto di sbocco senza flambare e senza far scorrere l'acqua preventivamente.
              </li>
              <li className="leading-relaxed">
                🔥 <strong>Verifica impianto:</strong> far scorrere l'acqua per 1 minuto, flambare lo sbocco interno/esterno, quindi campionare misurando la temperatura.
              </li>
              <li className="leading-relaxed">
                🧫 <strong>Biofilm:</strong> il campionamento su biofilm va effettuato tramite tampone sterile strisciato sulle superfici interne dei terminali.
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* DEFINIZIONI UTILI */}
      <section className="py-16 bg-slate-200/50">
        <div className="max-w-5xl mx-auto px-6 space-y-8">
          <h4 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <Info size={20} className="text-sai-blue" />
            Glossario e Definizioni Utili:
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-white p-4 rounded-xl shadow-sm space-y-1">
              <span className="font-black text-sai-blue uppercase">Aerosol</span>
              <p className="text-slate-600">Sospensione di particelle costituite da minuscole goccioline di acqua con diametro inferiore a 5 micron, inalabili nei polmoni.</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm space-y-1">
              <span className="font-black text-sai-blue uppercase">Biofilm</span>
              <p className="text-slate-600">Aggregazione strutturata di microrganismi protetti da una matrice biologica adesiva che li scherma dai disinfettanti ordinari.</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm space-y-1">
              <span className="font-black text-sai-blue uppercase">Biocida Ossidante</span>
              <p className="text-slate-600">Disinfettante in grado di distruggere il materiale cellulare batterico per ossidazione (es. cloro, ozono, bromo, perossido d'idrogeno).</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm space-y-1">
              <span className="font-black text-sai-blue uppercase">Biocida Non Ossidante</span>
              <p className="text-slate-600">Disinfettante chimico che agisce interferendo selettivamente con il metabolismo cellulare dei batteri (es. glutaraldeide).</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm space-y-1">
              <span className="font-black text-sai-blue uppercase">Stagnazione</span>
              <p className="text-slate-600">Assenza di flusso idrico all'interno delle tubature che accelera la formazione di biofilm e favorisce la proliferazione batterica.</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm space-y-1">
              <span className="font-black text-sai-blue uppercase">Valvola Termostatica (TMV)</span>
              <p className="text-slate-600">Miscelatore automatico che regola e stabilizza la temperatura di erogazione in uscita per motivi di sicurezza termica (in genere 42°C - 44°C).</p>
            </div>
          </div>
        </div>
      </section>

      {/* COSA FARE */}
      <section className="py-20 max-w-4xl mx-auto px-6 text-center space-y-6">
        <h3 className="text-2xl sm:text-3xl font-black text-slate-900">Cosa deve fare la tua Azienda?</h3>
        <p className="text-slate-600 text-sm leading-relaxed">
          Conformarsi alla normativa vigente con la massima diligenza richiesta per impedire che nella propria struttura possa scatenarsi una contaminazione della rete idrica o aeraulica da Legionella spp.
        </p>
        <p className="text-sai-blue font-bold text-base bg-sai-blue/5 p-4 rounded-2xl border border-sai-blue/10 max-w-xl mx-auto">
          "Per evitare tutto questo è necessario affidarsi a professionisti titolati, di comprovata esperienza e di elevata competenza."<br />
          <span className="text-xs text-slate-500 font-normal mt-1 block">— Dott. A. Novissimo</span>
        </p>
      </section>

      {/* BANNER CONTATTI SOPRA FOOTER */}
      <section className="bg-sai-green text-white py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="text-xl sm:text-2xl font-black">Richiedi un sopralluogo o una consulenza gratuita</h4>
            <p className="text-white/80 text-sm">I nostri esperti sono a disposizione per l'adeguamento normativo e campionamenti professionali.</p>
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            <a 
              href="tel:0810608910" 
              className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all flex items-center gap-2 shadow-lg text-sm"
            >
              <Phone size={18} />
              Chiama Ora
            </a>
            <a 
              href="https://wa.me/393938879849" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-6 py-3 bg-white text-sai-green rounded-xl font-bold hover:bg-slate-50 transition-all flex items-center gap-2 shadow-lg text-sm"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.062 5.321 5.378.002 12.01.002c3.211 0 6.231 1.249 8.5 3.52 2.27 2.27 3.518 5.289 3.516 8.5-.008 6.684-5.325 12.002-11.956 12.002-1.996-.002-3.956-.499-5.711-1.446L0 24zm6.59-4.846c1.6.95 3.197 1.45 4.817 1.453 5.483 0 9.944-4.461 9.95-9.95.002-2.66-1.033-5.159-2.914-7.04C16.623 1.777 14.12 .74 11.458.74c-5.485 0-9.946 4.46-9.952 9.95-.001 2.005.522 3.966 1.516 5.698L1.879 21.8l5.632-1.479c1.688.92 3.424 1.4 5.136 1.4z" />
              </svg>
              Chat WhatsApp
            </a>
            <a 
              href="/#contatti" 
              className="px-6 py-3 bg-sai-blue text-white rounded-xl font-bold hover:bg-sai-blue-light transition-all flex items-center gap-2 shadow-lg text-sm"
            >
              <Mail size={18} />
              Invia Messaggio
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-400 py-16 px-6 border-t border-slate-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* Company Info */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-xl font-black text-white">S.A.I. s.r.l.</span>
              <span className="text-[10px] tracking-wider uppercase bg-sai-green/20 text-sai-green-light px-2.5 py-1 rounded font-bold">Igienico Ambientale</span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400 max-w-sm">
              Da oltre 20 anni supportiamo le attività commerciali, le strutture ricettive e sanitarie ad adempiere alle normative in materia di sicurezza sul lavoro, igiene alimentare, controllo acque e prevenzione legionellosi.
            </p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/people/Salute-Ambiente-Igiene/100094422848740/?sk=about" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-slate-900 hover:bg-sai-blue hover:text-white transition-all text-slate-400">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H7v3h2v9h3v-9h3.6l.4-3H12V6c0-.9.2-1.2 1-1.2h2V2h-3C9.7 2 9 3.2 9 5.5V8z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/saluteambienteigiene/?igshid=OGQ5ZDc2ODk2ZA%3D%3D" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-slate-900 hover:bg-pink-600 hover:text-white transition-all text-slate-400">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/salute-ambiente-i-giene/?viewAsMember=true" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-slate-900 hover:bg-blue-600 hover:text-white transition-all text-slate-400">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-4 space-y-4 text-xs">
            <span className="font-extrabold text-white uppercase tracking-wider block">S.A.I. S.r.l.</span>
            <div className="space-y-2.5">
              <div className="flex items-start gap-2.5">
                <MapPin size={16} className="text-sai-green-light shrink-0" />
                <span>Via Luigi La Vista, 5 — 80122 Napoli</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={16} className="text-sai-green-light shrink-0" />
                <span>Tel. 081 06 08 910 | +39 393 88 79 849</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={16} className="text-sai-green-light shrink-0" />
                <a href="mailto:saluteambienteigiene@gmail.com" className="hover:text-white transition-colors">saluteambienteigiene@gmail.com</a>
              </div>
              <div className="flex items-center gap-2.5">
                <FileText size={16} className="text-sai-green-light shrink-0" />
                <span>PEC: <a href="mailto:sai.srl@pecaruba.it" className="hover:text-white transition-colors">sai.srl@pecaruba.it</a></span>
              </div>
              <div className="pt-2 text-[10px] text-slate-500">
                P.IVA: 09851301219
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-4 text-xs">
            <span className="font-extrabold text-white uppercase tracking-wider block">Navigazione</span>
            <div className="flex flex-col gap-2">
              <a href="/" className="hover:text-white transition-colors">Home</a>
              <a href="/chisiamo" className="hover:text-white transition-colors">Chi Siamo</a>
              <a href="/sicurezza-sul-lavoro" className="hover:text-white transition-colors">Sicurezza sul Lavoro</a>
              <a href="/legionella" className="hover:text-white transition-colors">Prevenzione Legionella</a>
              <a href="/#servizi" className="hover:text-white transition-colors">Igiene HACCP</a>
              <a href="/#perche-noi" className="hover:text-white transition-colors">Perché Sceglierci</a>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-slate-900 text-center text-[10px] text-slate-600 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} S.A.I. Salute Ambiente Igiene s.r.l. - Tutti i diritti riservati.</p>
          <div className="flex gap-4">
            <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="/cookie" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
