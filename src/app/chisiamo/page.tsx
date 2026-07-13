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
  Sparkles,
  Building,
  GraduationCap,
  HeartPulse,
  Wrench,
  Stethoscope
} from 'lucide-react';

export default function ChiSiamo() {
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

  const settori = [
    { label: "Sicurezza lavoro", desc: "D.Lgs.vo 81/08" },
    { label: "Sicurezza alimentare", desc: "Sistema H.A.C.C.P. - Reg.UE 852/2004" },
    { label: "Legionella", desc: "Accordo Stato Regioni 7/5/2015" },
    { label: "Controllo qualità acqua", desc: "D.Lgs.vo 18/23" },
    { label: "Gas Radon", desc: "D.Lgs.vo 241/2000" },
    { label: "Attestati di Formazione", desc: "Reg.UE 852/2004" },
    { label: "Test autoclave odontoiatri", desc: "D.G.R.C. 7301/2001" },
    { label: "Privacy", desc: "Reg. UE 679/2016 e D.L. 101/2018" },
    { label: "Verifica messa a terra", desc: "D.P.R. 492/2001" },
    { label: "Pratiche edilizie", desc: "D.P.R. 380/2001" },
    { label: "Scia alimentare", desc: "DD.LL.VI nn. 126 e 222/2016" },
    { label: "Informatica", desc: "Hardware e software" }
  ];

  const organigramma = [
    { nome: "Rita Ercolano", ruolo: "Amministratore", tag: "Direzione", icon: <Building className="text-sai-blue w-5 h-5" /> },
    { nome: "Paola Vitrone", ruolo: "Coordinatore Attività", tag: "Coordinamento", icon: <Sparkles className="text-sai-green w-5 h-5" /> },
    { nome: "Valentina Colantonio", ruolo: "Responsabile Marketing", tag: "Marketing", icon: <Users className="text-sky-500 w-5 h-5" /> },
    { nome: "Lia Ferrara", ruolo: "Responsabile Amministrativa", tag: "Amministrazione", icon: <FileText className="text-indigo-500 w-5 h-5" /> },
    { nome: "Salvatore Vitrone", ruolo: "Tecnico Ambientale e Sicurezza", tag: "Tecnico", icon: <Wrench className="text-amber-500 w-5 h-5" /> },
    { nome: "Raffaele De Santo", ruolo: "Tecnico Ambientale e Sicurezza", tag: "Tecnico", icon: <Wrench className="text-amber-500 w-5 h-5" /> },
    { nome: "Dott.ssa Rosaria Lazzo", ruolo: "Responsabile Coordinatore Scientifico", tag: "Comitato Scientifico", icon: <HeartPulse className="text-rose-500 w-5 h-5" /> },
    { nome: "Dott. Antonio Novissimo", ruolo: "Consulente Scientifico", tag: "Consulente", icon: <Award className="text-purple-500 w-5 h-5" /> },
    { nome: "Dott. Manuel Spagnuolo", ruolo: "Collaboratore formativo", tag: "Formazione", icon: <GraduationCap className="text-emerald-500 w-5 h-5" /> },
    { nome: "Dott. Vincenzo Autiero", ruolo: "Medico Competente", tag: "Medicina del Lavoro", icon: <Stethoscope className="text-pink-500 w-5 h-5" /> },
    { nome: "Ing. Gennaro D’Andrea", ruolo: "Responsabile pratiche edilizie", tag: "Ingegneria", icon: <Building className="text-indigo-500 w-5 h-5" /> },
    { nome: "Gianvito Vitiello", ruolo: "Informatica (hardware e software)", tag: "IT & Sviluppo", icon: <Activity className="text-sky-500 w-5 h-5" /> }
  ];

  const partner = [
    { tipo: "Laboratori associati", nome: "Lab Service SRL" },
    { tipo: "Laboratorio di analisi chimiche – microbiologiche", nome: "Ambiente e salute a socio unico" },
    { tipo: "Attestati di formazione", nome: "Fadservice" }
  ];

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
                <a href="/sicurezza-sul-lavoro" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 text-sm font-bold text-slate-700 hover:text-sai-blue hover:bg-slate-50 rounded-lg transition-colors flex items-center justify-between">
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
        {/* Background Video looping and optimized (Chiara al 85% come home) */}
        <video 
          autoPlay 
          loop
          muted 
          playsInline
          preload="auto"
          className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-85 transition-opacity duration-1000"
        >
          <source src="https://www.dropbox.com/scl/fi/f0szt9y9b1fcdf0ilckcb/crea_un_video_che_rappresenta.mp4?rlkey=b4ywtw7zeyxbt8wovva9jqg87&st=ub5znw3f&raw=1" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/25 to-slate-950/40 z-0" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-6">
          <span className="text-xs font-black tracking-widest text-sai-green-light uppercase bg-sai-green/10 border border-sai-green-light/20 px-3.5 py-1.5 rounded-full inline-block">
            S.A.I. s.r.l. Napoli
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
            Una Squadra da <span className="text-transparent bg-clip-text bg-gradient-to-r from-sai-green-light to-emerald-400">Oltre 20 Anni</span>
          </h1>
          <p className="text-slate-300 text-lg max-w-3xl leading-relaxed mx-auto">
            Assistendo diverse centinaia di clienti, consolidando la sua fama di azienda leader nel settore della sicurezza ambientale a Napoli ed in tutta la Campania.
          </p>
        </div>

        {/* Bordino verde a tema di 6px */}
        <div className="absolute bottom-0 left-0 w-full h-[6px] bg-sai-green z-25" />
      </header>

      {/* MISSION & PRESENTATION */}
      <section className="py-20 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Il nostro approccio alla consulenza aziendale
          </h2>
          <div className="w-12 h-1.5 bg-sai-green rounded-full" />
          <p className="text-slate-600 text-base leading-relaxed">
            Attraverso la nostra opera di consulenza alle attività commerciali, ci pregiamo di renderle edotte e autonome nella corretta applicazione dei dispositivi di Legge da rispettare, lasciando a noi solo la parte specifica e professionale.
          </p>
          <p className="text-slate-600 text-base leading-relaxed">
            Questo metodo garantisce non solo l'assoluta conformità alle normative vigenti, ma permette ai titolari d'azienda ed al personale dipendente di comprendere appieno le procedure operative quotidiane, minimizzando i rischi legati a sanzioni e ispezioni.
          </p>
        </div>
        <div className="lg:col-span-5 bg-white border border-slate-100 p-8 rounded-2xl shadow-xl space-y-6">
          <h3 className="text-lg font-black text-slate-900 border-b border-slate-100 pb-3">Perché affidarsi a S.A.I.</h3>
          <ul className="space-y-4">
            <li className="flex gap-3 text-sm text-slate-600">
              <CheckCircle2 className="text-sai-green w-5 h-5 shrink-0" />
              <span>Supporto ispezioni con tecnici in sede</span>
            </li>
            <li className="flex gap-3 text-sm text-slate-600">
              <CheckCircle2 className="text-sai-green w-5 h-5 shrink-0" />
              <span>Consulenza integrata multi-settore</span>
            </li>
            <li className="flex gap-3 text-sm text-slate-600">
              <CheckCircle2 className="text-sai-green w-5 h-5 shrink-0" />
              <span>Verifiche e campionamenti periodici programmati</span>
            </li>
          </ul>
        </div>
      </section>

      {/* DISPOSITIVI DI LEGGE / SETTORI */}
      <section className="py-20 bg-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-black tracking-widest text-sai-blue uppercase bg-sai-blue/10 px-3.5 py-1.5 rounded-full">Aree Operative</span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">I nostri settori di intervento tecnico</h2>
            <p className="text-slate-500 text-sm">Il team di S.A.I. Salute, Ambiente, Igiene s.r.l. opera per garantire la conformità nei seguenti ambiti normativi:</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {settori.map((set, idx) => (
              <div key={idx} className="bg-white border border-slate-150 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow flex items-start gap-4">
                <div className="p-3 bg-sai-green/10 text-sai-green rounded-lg">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm">{set.label}</h4>
                  <p className="text-xs text-slate-500 mt-1">{set.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IL TEAM */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-black tracking-widest text-sai-green uppercase bg-sai-green/10 px-3.5 py-1.5 rounded-full">Organico</span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Il Nostro Team</h2>
          <p className="text-slate-500 text-sm">Professionisti ed esperti qualificati a tua completa disposizione</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {organigramma.map((team, idx) => (
            <div key={idx} className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm flex flex-col justify-between hover:border-sai-green/20 transition-all hover:scale-[1.02]">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center shadow-inner">
                  {team.icon}
                </div>
                <div>
                  <h4 className="text-base font-extrabold text-slate-900">{team.nome}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">{team.ruolo}</p>
                </div>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-50">
                <span className="text-[10px] font-black uppercase tracking-wider text-sai-green bg-sai-green/10 px-2.5 py-1 rounded-full">
                  {team.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PARTNER / LABORATORI */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-sai-green/10 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-black tracking-widest text-sai-green-light uppercase">Qualità Certificata</span>
            <h2 className="text-3xl font-black tracking-tight leading-tight">Laboratori di analisi e partner accreditati</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Per l'esecuzione di analisi microbiologiche e chimiche e per l'erogazione di corsi di formazione a distanza (FAD), S.A.I. s.r.l. si avvale di partner scientifici certificati e laboratori associati accreditati.
            </p>
          </div>

          <div className="lg:col-span-6 space-y-4">
            {partner.map((part, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 p-5 rounded-xl flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">{part.tipo}</span>
                  <span className="text-base font-bold text-white block">{part.nome}</span>
                </div>
                <Award className="text-sai-green-light w-6 h-6 shrink-0" />
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
