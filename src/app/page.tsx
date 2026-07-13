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
  FlameKindling
} from 'lucide-react';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // States for animated counters
  const [countClients, setCountClients] = useState(0);
  const [countHours, setCountHours] = useState(48); // We will count down or animate it
  const [countCompliance, setCountCompliance] = useState(0);

  // States for video playlist and crossfade
  const videoPlaylist = [
    "https://www.dropbox.com/scl/fi/f0szt9y9b1fcdf0ilckcb/crea_un_video_che_rappresenta.mp4?rlkey=b4ywtw7zeyxbt8wovva9jqg87&st=ub5znw3f&raw=1", // Piscina
    "https://www.dropbox.com/scl/fi/5vnnmfpyfx0qg10yjcc8k/crea_minivideo_senza_musica_pe-1.mp4?rlkey=ihxy41mb0wx8a2krhegxk3yhi&st=be8ufw3i&raw=1", // Minivideo
    "https://www.dropbox.com/scl/fi/9le40s8pqk05i6e4ciw12/ora_fai_un_video_di_un_autocla.mp4?rlkey=vr3zykccqtwbjas6gjmm1egre&st=304ah2sm&raw=1" // Autoclave
  ];
  const [activeVideoIdx, setActiveVideoIdx] = useState(0);

  useEffect(() => {
    // Animate clients count from 0 to 1000
    let clientStart = 0;
    const clientEnd = 1000;
    const clientDuration = 1500;
    const clientStepTime = Math.abs(Math.floor(clientDuration / clientEnd));
    const clientTimer = setInterval(() => {
      clientStart += 20;
      if (clientStart >= clientEnd) {
        setCountClients(clientEnd);
        clearInterval(clientTimer);
      } else {
        setCountClients(clientStart);
      }
    }, clientStepTime * 20);

    // Animate compliance from 0 to 100
    let complianceStart = 0;
    const complianceEnd = 100;
    const complianceDuration = 1500;
    const complianceStepTime = Math.abs(Math.floor(complianceDuration / complianceEnd));
    const complianceTimer = setInterval(() => {
      complianceStart += 2;
      if (complianceStart >= complianceEnd) {
        setCountCompliance(complianceEnd);
        clearInterval(complianceTimer);
      } else {
        setCountCompliance(complianceStart);
      }
    }, complianceStepTime * 2);

    // Auto switch video every 15 seconds to ensure clean overlay transition without buffering flash
    const videoTimer = setInterval(() => {
      setActiveVideoIdx((prev) => (prev + 1) % 3);
    }, 15000);

    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(clientTimer);
      clearInterval(complianceTimer);
      clearInterval(videoTimer);
    };
  }, []);

  const services = [
    {
      id: 'sicurezza',
      icon: <Shield className="text-sai-blue w-8 h-8" />,
      title: 'Sicurezza sul Lavoro',
      subtitle: 'Adempimenti D.Lgs. 81/08',
      desc: 'Valutazione dei rischi (DVR), assunzione incarico RSPP esterno, rilievi fonometrici e vibrazioni, pratiche antincendio, e piani di emergenza per garantire la conformità di qualsiasi attività commerciale e industriale.',
      points: ['Redazione DVR completo', 'Incarico RSPP Esterno', 'Valutazioni Rumore e Vibrazioni', 'Piani di Emergenza ed Evacuazione']
    },
    {
      id: 'haccp',
      icon: <Leaf className="text-sai-green w-8 h-8" />,
      title: 'Igiene & Sicurezza Alimentare (H.A.C.C.P.)',
      subtitle: 'Autocontrollo HACCP',
      desc: 'Elaborazione manuali HACCP personalizzati, analisi microbiologiche di alimenti e superfici (tamponi ambientali), assistenza per apertura attività (SCIA Sanitarie) e gestione delle schede di autocontrollo quotidiane.',
      points: ['Manuali HACCP Personalizzati', 'Analisi di Laboratorio e Tamponi', 'Assistenza SCIA Alimentare', 'Consulenza per Ristoranti e Industrie']
    },
    {
      id: 'legionella',
      icon: <Droplet className="text-sky-500 w-8 h-8" />,
      title: 'Controllo Legionella',
      subtitle: 'Prevenzione e Campionamenti',
      desc: 'Stesura del Documento di Valutazione del Rischio Legionellosi (DVR), campionamenti microbiologici periodici ed analisi chimiche in laboratorio per strutture ricettive, cliniche, condomini e palestre.',
      points: ['DVR Legionellosi dedicato', 'Analisi microbiologiche certificate', 'Piani di monitoraggio e campionamento', 'Consulenza protocolli di bonifica']
    },
    {
      id: 'autoclavi',
      icon: <FlameKindling className="text-rose-500 w-8 h-8" />,
      title: 'Autoclavi Odontoiatri',
      subtitle: 'Verifiche Studi Medici',
      desc: 'Test e controlli periodici per le autoclavi e sterilizzatrici all\'interno degli studi odontoiatrici. Campionamento delle acque e rilascio dei rapporti di prova per la sicurezza clinica ed igienica.',
      points: ['Controllo microbiologico acqua', 'Test delle spore e sterilizzazione', 'Relazioni per studi odontoiatrici', 'Conformità linee guida Ispesl']
    },
    {
      id: 'radon',
      icon: <Activity className="text-amber-500 w-8 h-8" />,
      title: 'Misurazione Gas Radon',
      subtitle: 'Adempimenti D.Lgs. 101/20',
      desc: 'Rilevamento e monitoraggio annuale della concentrazione media di gas Radon in ambienti interrati e seminterrati con dosimetri certificati, stesura relazioni tecniche ed interventi di mitigazione.',
      points: ['Misurazioni Annuali certificate', 'Posizionamento Dosimetri', 'Relazioni per Locali Commerciali', 'Pianificazione interventi correttivi']
    },
    {
      id: 'GDPR',
      icon: <FileText className="text-indigo-500 w-8 h-8" />,
      title: 'Privacy & GDPR',
      subtitle: 'Regolamento UE 2016/679',
      desc: 'Adeguamento aziendale alle normative sulla protezione dei dati personali. Redazione registri del trattamento, informative clienti/dipendenti, nomine dei responsabili e lettere di incarico.',
      points: ['Redazione Documentazione Privacy', 'Nomina Responsabili ed Addetti', 'Informativa Videosorveglianza', 'Consulenza e Audit periodici']
    },
    {
      id: 'formazione',
      icon: <BookOpen className="text-purple-500 w-8 h-8" />,
      title: 'Formazione Professionale',
      subtitle: 'Corsi ed Abilitazioni Obbligatorie',
      desc: 'Corsi di formazione certificati in aula e online con rilascio di attestati validi per RSPP, RLS, Addetti Antincendio e Primo Soccorso, Carrellisti, Lavori in quota, e addetti alimentari (ex libretto sanitario).',
      points: ['Corsi Sicurezza D.Lgs 81/08', 'Corsi Antincendio e Primo Soccorso', 'Formazione HACCP / Alimentare', 'Piattaforma E-learning attiva']
    },
    {
      id: 'acque',
      icon: <Droplet className="text-cyan-500 w-8 h-8" />,
      title: 'Analisi Acque & Piscine',
      subtitle: 'Condomini e Impianti Sportivi',
      desc: 'Analisi chimiche e microbiologiche periodiche dell\'acqua di rete nei condomini per garantire la potabilità, e campionamenti normativi completi per piscine pubbliche e private.',
      points: ['Verifica potabilità acqua condominio', 'Campionamento microbiologico piscine', 'Rilascio certificati di analisi', 'Adeguamento requisiti igienici']
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans text-slate-800">
      
      {/* NAVBAR */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo & Company Name */}
          <a href="#" className="flex items-center gap-3 group">
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
              {/* Dropdown — wrapper parte da top-full senza gap, pt-3 crea spaziatura visiva restando hover-attivo */}
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
            <a 
              href="/chisiamo" 
              className={`text-sm font-bold transition-colors ${
                scrolled ? 'text-slate-600 hover:text-sai-blue' : 'text-white/95 hover:text-white'
              }`}
            >
              Chi Siamo
            </a>
            <a 
              href="#perche-noi" 
              className={`text-sm font-bold transition-colors ${
                scrolled ? 'text-slate-600 hover:text-sai-blue' : 'text-white/95 hover:text-white'
              }`}
            >
              Perché Sceglierci
            </a>
            <a 
              href="#contatti" 
              className={`text-sm font-bold transition-colors ${
                scrolled ? 'text-slate-600 hover:text-sai-blue' : 'text-white/95 hover:text-white'
              }`}
            >
              Contatti
            </a>
            <a 
              href="#contatti" 
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
          {/* Mobile menu header con pulsante chiudi */}
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
            {/* Servizi con sottocategorie */}
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
            <a 
              href="#contatti" 
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full py-3.5 bg-sai-blue text-white rounded-xl text-center font-bold shadow-lg shadow-sai-blue/20"
            >
              Invia un messaggio
            </a>
          </div>
        </div>
      )}

      {/* HERO SECTION */}
      <header 
        className="relative pt-32 pb-32 lg:pt-48 lg:pb-40 overflow-hidden bg-slate-950 text-white"
      >
        
        {/* Background Video 1 (Piscina) */}
        <video 
          autoPlay 
          loop
          muted 
          playsInline
          preload="auto"
          className={`absolute top-0 left-0 w-full h-full object-cover z-0 transition-opacity duration-[1500ms] ease-in-out ${
            activeVideoIdx === 0 ? 'opacity-85' : 'opacity-0 pointer-events-none'
          }`}
        >
          <source src={videoPlaylist[0]} type="video/mp4" />
        </video>

        {/* Background Video 2 (Minivideo) */}
        <video 
          autoPlay
          loop
          muted 
          playsInline
          preload="auto"
          className={`absolute top-0 left-0 w-full h-full object-cover z-0 transition-opacity duration-[1500ms] ease-in-out ${
            activeVideoIdx === 1 ? 'opacity-85' : 'opacity-0 pointer-events-none'
          }`}
        >
          <source src={videoPlaylist[1]} type="video/mp4" />
        </video>

        {/* Background Video 3 (Autoclave) */}
        <video 
          autoPlay
          loop
          muted 
          playsInline
          preload="auto"
          className={`absolute top-0 left-0 w-full h-full object-cover z-0 transition-opacity duration-[1500ms] ease-in-out ${
            activeVideoIdx === 2 ? 'opacity-85' : 'opacity-0 pointer-events-none'
          }`}
        >
          <source src={videoPlaylist[2]} type="video/mp4" />
        </video>
        
        {/* Dark overlay gradient softened to make the video clearer/brighter */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/25 to-slate-950/40 z-0" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Left: Heading and description */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 backdrop-blur-md">
              <Award className="text-sai-green w-4 h-4" />
              <span className="text-xs font-black tracking-wider uppercase">Oltre 20 Anni di Esperienza</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
              La tua azienda in <span className="text-transparent bg-clip-text bg-gradient-to-r from-sai-green-light to-emerald-400">Sicurezza</span>, la salute al sicuro.
            </h1>
            <p className="text-slate-300 text-lg max-w-2xl leading-relaxed mx-auto lg:mx-0">
              S.A.I. s.r.l. è il partner ideale a Napoli per aziende, professionisti e condomìni. Forniamo consulenza integrata e certificata per la tutela ambientale, igiene alimentare e conformità normativa.
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-4">
              <a 
                href="#servizi" 
                className="px-8 py-4 bg-sai-green hover:bg-sai-green-light text-white font-bold rounded-xl shadow-lg shadow-sai-green/30 hover:scale-105 transition-all flex items-center justify-center gap-2 group"
              >
                I Nostri Servizi
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="#contatti" 
                className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-xl backdrop-blur-sm transition-all hover:scale-105 flex items-center justify-center gap-2"
              >
                Parla con un Tecnico
                <Phone size={18} />
              </a>
            </div>
          </div>

          {/* Hero Right: Featured interactive card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md bg-white/10 border border-white/10 rounded-2xl shadow-2xl p-6 sm:p-8 backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-sai-green/20 rounded-full blur-xl" />
              
              <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sai-green/20 flex items-center justify-center">
                    <CheckCircle2 className="text-sai-green w-6 h-6" />
                  </div>
                  <h3 className="font-extrabold text-lg text-white">Servizi Rapidi & Certificati</h3>
                </div>

                <ul className="space-y-4">
                  {[
                    'Documenti di Valutazione dei Rischi (DVR)',
                    'Tamponi e Analisi di Laboratorio HACCP',
                    'Misurazione e Relazioni annuali Radon',
                    'Prevenzione Legionellosi e Analisi Acque'
                  ].map((item, idx) => (
                    <li key={idx} className="flex gap-3 text-slate-300 text-sm">
                      <CheckCircle2 className="text-sai-green w-5 h-5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-4 border-t border-white/10 text-center">
                  <span className="text-xs text-slate-400 block mb-2">Hai un controllo ispettivo in corso?</span>
                  <a 
                    href="tel:081000000" 
                    className="inline-flex items-center gap-2 text-sai-green-light hover:underline font-bold text-sm"
                  >
                    Pronto Intervento Telefonico <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bordino verde a tema di 6px sul bordo inferiore dell'header */}
        <div className="absolute bottom-0 left-0 w-full h-[6px] bg-sai-green z-10" />
      </header>

      {/* QUICK FACTS STATS */}
      <section className="relative z-20 -mt-16 max-w-7xl mx-auto px-6 w-full animate-in fade-in slide-in-from-bottom-6 duration-1000">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white shadow-xl rounded-2xl p-8 border border-slate-100">
          <div className="flex gap-4 items-center">
            <div className="p-4 rounded-xl bg-sai-blue/10 text-sai-blue">
              <Users size={32} />
            </div>
            <div>
              <h4 className="text-2xl font-black text-slate-900">{countClients}+</h4>
              <p className="text-xs text-slate-500 uppercase font-extrabold">Clienti Assistiti a Napoli</p>
            </div>
          </div>
          <div className="flex gap-4 items-center md:border-x md:border-slate-100 md:px-8">
            <div className="p-4 rounded-xl bg-sai-green/10 text-sai-green">
              <Clock size={32} />
            </div>
            <div>
              <h4 className="text-2xl font-black text-slate-900">24/48 Ore</h4>
              <p className="text-xs text-slate-500 uppercase font-extrabold">Tempi di Risposta Preventivi</p>
            </div>
          </div>
          <div className="flex gap-4 items-center md:pl-8">
            <div className="p-4 rounded-xl bg-sky-100 text-sky-600">
              <Award size={32} />
            </div>
            <div>
              <h4 className="text-2xl font-black text-slate-900">{countCompliance}%</h4>
              <p className="text-xs text-slate-500 uppercase font-extrabold">Conformità Normativa Garantita</p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="servizi" className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-black tracking-widest text-sai-green uppercase bg-sai-green/10 px-3.5 py-1.5 rounded-full">Cosa Facciamo</span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
            Servizi di Consulenza Integrati per la tua Azienda
          </h2>
          <p className="text-slate-600">
            Offriamo soluzioni professionali su misura per far crescere la tua attività nel pieno rispetto della legge, proteggendo dipendenti e clienti.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((srv, idx) => (
            <div 
              key={idx} 
              className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-sai-green/30 active:scale-95 transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between cursor-pointer group animate-in fade-in slide-in-from-bottom-8 duration-700"
              style={{ animationDelay: `${idx * 150}ms`, animationFillMode: 'both' }}
              onClick={() => {
                const contactSection = document.getElementById('contatti');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                  // Pre-select service in form if select exists
                  const selectEl = document.querySelector('select');
                  if (selectEl) {
                    selectEl.value = srv.id === 'GDPR' ? 'privacy' : srv.id;
                  }
                }
              }}
            >
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-xl bg-slate-50 flex items-center justify-center shadow-inner group-hover:scale-110 group-hover:bg-sai-green/10 transition-all duration-300">
                  {srv.icon}
                </div>
                <div>
                  <span className="text-[10px] font-extrabold text-sai-green uppercase tracking-wider block">{srv.subtitle}</span>
                  <h3 className="text-xl font-bold text-slate-900 mt-1">{srv.title}</h3>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed">{srv.desc}</p>
                
                <ul className="space-y-2 pt-2 border-t border-slate-50">
                  {srv.points.map((pt, pIdx) => (
                    <li key={pIdx} className="flex gap-2 text-xs font-medium text-slate-600 items-center">
                      <ChevronRight size={14} className="text-sai-green" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6" onClick={(e) => e.stopPropagation()}>
                {srv.id === 'sicurezza' || srv.id === 'legionella' || srv.id === 'formazione' || srv.id === 'haccp' || srv.id === 'autoclavi' || srv.id === 'GDPR' || srv.id === 'radon' || srv.id === 'acque' ? (
                  <a 
                    href={
                      srv.id === 'sicurezza' ? '/sicurezza-sul-lavoro' : 
                      srv.id === 'legionella' ? '/legionella' : 
                      srv.id === 'formazione' ? '/formazione' : 
                      srv.id === 'haccp' ? '/haccp' : 
                      srv.id === 'autoclavi' ? '/studiodontoiatrici' : 
                      srv.id === 'radon' ? '/gasradon' :
                      srv.id === 'acque' ? '/analisi-acque' :
                      '/gdpr'
                    } 
                    className="inline-flex items-center gap-1 text-sm font-bold text-sai-blue hover:text-sai-blue-light transition-colors group"
                  >
                    Scopri di più
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                ) : (
                  <a 
                    href="#contatti"
                    onClick={() => {
                      const contactSection = document.getElementById('contatti');
                      if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth' });
                        const selectEl = document.querySelector('select');
                        if (selectEl) {
                          selectEl.value = srv.id === 'GDPR' ? 'privacy' : srv.id;
                        }
                      }
                    }}
                    className="inline-flex items-center gap-1 text-sm font-bold text-sai-blue hover:text-sai-blue-light transition-colors group"
                  >
                    Richiedi Informazioni
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* PRESTAZIONI AGGIUNTIVE: 2 COLONNE + BOX RETTANGOLARE SOTTO */}
        <div className="mt-12 space-y-8">
          
          {/* Due box in rigo a 2 colonne */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Box 1: SCIA Alimentare */}
            <div className="bg-white border border-slate-100 rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row group hover:shadow-2xl transition-all duration-300">
              <div className="md:w-2/5 relative min-h-[200px] bg-[url('https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2070')] bg-cover bg-center group-hover:scale-105 transition-transform duration-500" />
              <div className="p-6 md:w-3/5 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="text-[10px] font-black text-sai-green uppercase tracking-wider block">Procedure Amministrative</span>
                  <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-sai-blue transition-colors uppercase">SCIA Alimentare</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Se vuoi avviare un esercizio alimentare o attività di somministrazione di alimenti e bevande, o occupare suolo pubblico, la SCIA (Segnalazione Certificata di Inizio Attività) è il procedimento autorizzatorio ideale. Con la SCIA, puoi avviare rapidamente la tua attività senza dover attendere lunghi tempi di autorizzazione. Offriamo supporto completo nella preparazione e presentazione della SCIA, assicurandoci che tutti i requisiti normativi siano rispettati. Scegli la comodità e la velocità della SCIA per dare vita al tuo esercizio e iniziare a servire i tuoi clienti senza intoppi.
                  </p>
                </div>
                <div className="pt-2">
                  <a 
                    href="#contatti"
                    onClick={() => {
                      const contactSection = document.getElementById('contatti');
                      if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth' });
                        const selectEl = document.querySelector('select');
                        if (selectEl) { selectEl.value = 'haccp'; }
                      }
                    }}
                    className="inline-flex items-center gap-1 text-xs font-bold text-sai-blue hover:text-sai-blue-light transition-colors group"
                  >
                    Richiedi SCIA
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>

            {/* Box 2: Pratiche Edilizie */}
            <div className="bg-white border border-slate-100 rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row group hover:shadow-2xl transition-all duration-300">
              <div className="md:w-2/5 relative min-h-[200px] bg-[url('https://images.unsplash.com/photo-1503387837-b154d5074bd2?q=80&w=2070')] bg-cover bg-center group-hover:scale-105 transition-transform duration-500" />
              <div className="p-6 md:w-3/5 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="text-[10px] font-black text-sai-green uppercase tracking-wider block">Edilizia & Ambiente</span>
                  <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-sai-blue transition-colors uppercase">Pratiche Edilizie, Urbanistiche e Catastali</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Realizzazione di pratiche edilizie, urbanistiche e catastali, offrendo servizi di progettazione tecnica e gestione delle autorizzazioni uniche ambientali (AUA). Affidandoti a noi, avrai il supporto di professionisti qualificati e competenti, garantendo una gestione efficiente e tempestiva di tutte le procedure necessarie. La nostra esperienza ci consente di semplificare il processo e assicurare il rispetto delle normative ambientali e urbanistiche, permettendoti di concentrarti sul tuo progetto con tranquillità e sicurezza.
                  </p>
                </div>
                <div className="pt-2">
                  <a 
                    href="#contatti"
                    onClick={() => {
                      const contactSection = document.getElementById('contatti');
                      if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth' });
                        const selectEl = document.querySelector('select');
                        if (selectEl) { selectEl.value = 'sicurezza'; }
                      }
                    }}
                    className="inline-flex items-center gap-1 text-xs font-bold text-sai-blue hover:text-sai-blue-light transition-colors group"
                  >
                    Richiedi Supporto Tecnico
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Box rettangolare sotto */}
          <div className="bg-white border border-slate-100 rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row group hover:shadow-2xl transition-all duration-300">
            <div className="md:w-1/4 relative min-h-[180px] bg-[url('https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069')] bg-cover bg-center group-hover:scale-105 transition-transform duration-500" />
            <div className="p-6 md:w-3/4 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="text-[10px] font-black text-red-500 uppercase tracking-wider block">Verifiche Obbligatorie DPR 462/01</span>
                <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-sai-blue transition-colors uppercase">Verifica di Messa a Terra Impianti Elettrici</h3>
                <div className="text-xs text-slate-500 space-y-2 leading-relaxed">
                  <p>
                    <strong>DPR 462/2001:</strong> in qualsiasi luogo di lavoro c’è l’obbligo di richiedere la verifica periodica dell’impianto di messa a terra e dei dispositivi di protezione contro le scariche atmosferiche.
                  </p>
                  <p>
                    Nei luoghi con pericolo di esplosione (D.M. 22/11/58) va richiesta la verifica periodica dell’intero impianto elettrico.
                  </p>
                </div>
              </div>
              <div className="pt-2">
                <a 
                  href="#contatti"
                  onClick={() => {
                    const contactSection = document.getElementById('contatti');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' });
                      const selectEl = document.querySelector('select');
                      if (selectEl) { selectEl.value = 'sicurezza'; }
                    }
                  }}
                  className="inline-flex items-center gap-1 text-xs font-bold text-sai-blue hover:text-sai-blue-light transition-colors group"
                >
                  Verifica Impianto
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* CHI SIAMO / VALORI */}
      <section id="chisiamo" className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-sai-green/10 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-black tracking-widest text-sai-green-light uppercase">Chi Siamo</span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
              Esperienza, competenza e puntualità al servizio dell'impresa.
            </h2>
            <p className="text-slate-400 leading-relaxed text-base">
              Nata dall'unione di professionisti ed esperti biologi, chimici ed ingegneri, S.A.I. s.r.l. opera a Napoli ed in tutta la Campania per supportare le attività economiche, i plessi industriali e gli studi professionali nella gestione quotidiana degli obblighi normativi.
            </p>
            <p className="text-slate-400 leading-relaxed text-base">
              Non ci limitiamo a consegnare documentazione cartacea: affianchiamo il cliente per formare il personale, svolgere i controlli periodici di laboratorio ed assicurare che ogni ispezione degli organi di vigilanza (ASL, NAS, Ispettorato del Lavoro) si concluda senza sanzioni.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="flex gap-3">
                <CheckCircle2 className="text-sai-green w-6 h-6 shrink-0" />
                <div>
                  <h5 className="font-extrabold text-white text-sm">Laboratorio Certificato</h5>
                  <p className="text-xs text-slate-400 mt-1">Campionamenti e analisi batteriologiche rapide.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="text-sai-green w-6 h-6 shrink-0" />
                <div>
                  <h5 className="font-extrabold text-white text-sm">Docenti Qualificati</h5>
                  <p className="text-xs text-slate-400 mt-1">Corsi di formazione autorizzati con crediti.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image/Graphic */}
          <div className="lg:col-span-5 flex justify-center w-full">
            <div className="relative w-full aspect-video rounded-2xl bg-black border border-white/10 overflow-hidden shadow-2xl">
              <iframe 
                src="https://www.youtube.com/embed/sXydNHNHgmg?autoplay=1&loop=1&playlist=sXydNHNHgmg&mute=1&controls=0&modestbranding=1" 
                title="S.A.I. Napoli Video Presentazione"
                allow="autoplay; encrypted-media; picture-in-picture"
                className="absolute top-0 left-0 w-full h-full object-cover border-0"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section id="perche-noi" className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-black tracking-widest text-sai-green uppercase bg-sai-green/10 px-3.5 py-1.5 rounded-full">Perché Sceglierci</span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
            Il valore aggiunto della consulenza S.A.I.
          </h2>
          <p className="text-slate-600">
            Scopri come aiutiamo le attività ad azzerare il rischio di sanzioni civili e penali.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              title: 'Soluzioni Personalizzate',
              desc: 'Niente modelli prestampati. Studiamo la tua azienda per scrivere procedure di sicurezza e HACCP realmente applicabili.',
              badge: '01'
            },
            {
              title: 'Rapporti con gli Enti',
              desc: 'Ti assistiamo durante i controlli degli ispettori ASL, Vigili del Fuoco o Carabinieri del NAS, rispondendo per te ai rilievi.',
              badge: '02'
            },
            {
              title: 'Assistenza H24',
              desc: 'Garantiamo reperibilità telefonica e supporto tecnico immediato per qualsiasi urgenza o controllo ispettivo improvviso.',
              badge: '03'
            },
            {
              title: 'Monitoraggio Scadenze',
              desc: 'Ti avvisiamo noi in anticipo quando è il momento di aggiornare i corsi di formazione o ripetere le analisi periodiche.',
              badge: '04'
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm relative group hover:shadow-md transition-shadow">
              <span className="absolute top-4 right-4 text-3xl font-black text-slate-100 group-hover:text-sai-green/20 transition-colors">{item.badge}</span>
              <h4 className="text-lg font-bold text-slate-900 mb-2 mt-4">{item.title}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* NEW BLUE SECTION: SAI FAST HACCP */}
      <section className="bg-gradient-to-br from-sai-blue-dark via-slate-900 to-sai-blue py-20 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sai-green/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Left Text Detail */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-black tracking-widest text-sai-green-light uppercase bg-sai-green/10 border border-sai-green-light/20 px-3.5 py-1.5 rounded-full inline-block">
              Soluzione Software Esclusiva
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              SAI FAST HACCP<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sai-green-light to-emerald-400">Basta carta e registri: fai tutto in Automatico</span>
            </h2>
            <p className="text-slate-300 text-base leading-relaxed">
              Scansiona le fatture, traccia i lotti e genera tutti i registri pronti per i controlli di <strong>NAS</strong> e <strong>ASL</strong>. Senza errori, senza perdere tempo prezioso.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="space-y-3 bg-white/5 border border-white/10 p-5 rounded-xl backdrop-blur-sm">
                <span className="text-xs font-black text-rose-400 uppercase tracking-wider block">Basta con il vecchio metodo</span>
                <ul className="space-y-2">
                  <li className="flex gap-2 items-center text-xs text-slate-300">
                    <span className="text-rose-500">❌</span> Errori che possono costare sanzioni
                  </li>
                  <li className="flex gap-2 items-center text-xs text-slate-300">
                    <span className="text-rose-500">❌</span> Tempo perso a mano ogni giorno
                  </li>
                  <li className="flex gap-2 items-center text-xs text-slate-300">
                    <span className="text-rose-500">❌</span> Controlli ispettivi sempre stressanti
                  </li>
                </ul>
              </div>

              <div className="space-y-3 bg-white/5 border border-white/10 p-5 rounded-xl backdrop-blur-sm">
                <span className="text-xs font-black text-sai-green-light uppercase tracking-wider block">La rivoluzione digitale S.A.I.</span>
                <ul className="space-y-2">
                  <li className="flex gap-2 items-center text-xs text-slate-300">
                    <span className="text-sai-green">✅</span> Registri compilati automaticamente
                  </li>
                  <li className="flex gap-2 items-center text-xs text-slate-300">
                    <span className="text-sai-green">✅</span> Tracciabilità lotti senza errori
                  </li>
                  <li className="flex gap-2 items-center text-xs text-slate-300">
                    <span className="text-sai-green">✅</span> Scadenze sempre sotto controllo
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <a 
                href="#contatti" 
                className="px-6 py-3.5 bg-sai-green hover:bg-sai-green-light text-white font-bold rounded-xl text-center shadow-lg shadow-sai-green/20 transition-all hover:scale-105"
              >
                Attiva Ora l'App
              </a>
              <a 
                href="https://saifasthaccp.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 border border-white/15 text-white font-bold rounded-xl text-center transition-all hover:scale-105 flex items-center justify-center gap-1.5"
              >
                Visita saifasthaccp.com <ExternalLink size={14} />
              </a>
            </div>
          </div>

          {/* Right Mockup Layout */}
          <div className="lg:col-span-5 flex justify-center w-full">
            <div className="w-full max-w-sm bg-slate-950 border-4 border-slate-800 rounded-[2.5rem] shadow-2xl p-3 aspect-[9/16] relative overflow-hidden flex flex-col justify-between">
              {/* Speaker & Sensor */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-2xl z-20 flex items-center justify-center">
                <span className="w-12 h-1 bg-slate-700 rounded-full" />
              </div>

              {/* App Screen Content - Real Image from public folder */}
              <div className="w-full h-full bg-slate-900 rounded-[2rem] overflow-hidden relative z-10">
                <Image 
                  src="/Attachment0 (1).jpeg" 
                  alt="App SAI FAST HACCP Mockup" 
                  fill 
                  sizes="(max-width: 768px) 100vw, 384px"
                  className="object-cover" 
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT / CTA FORM */}
      <section id="contatti" className="py-20 bg-slate-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Contact Details Left */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-black tracking-widest text-sai-green uppercase">Contatti</span>
              <h2 className="text-3xl font-black tracking-tight text-slate-900">Parla con i nostri esperti</h2>
              <p className="text-slate-600 text-sm">
                Richiedi un sopralluogo gratuito o un preventivo di spesa personalizzato per la tua attività commerciale o condominio.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="p-3 bg-white rounded-xl text-sai-blue shadow-sm border border-slate-100">
                  <Phone size={20} />
                </div>
                <div>
                  <h5 className="font-bold text-slate-900 text-sm">Contatti Telefonici</h5>
                  <a href="tel:0810608910" className="text-sm text-slate-600 hover:text-sai-blue block mt-0.5">Fisso: 081 06 08 910</a>
                  <a href="tel:+393938879849" className="text-sm text-slate-600 hover:text-sai-blue block mt-0.5">Cell: +39 393 88 79 849</a>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Lun-Ven: 09:00 - 18:00</span>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="p-3 bg-white rounded-xl text-sai-green shadow-sm border border-slate-100">
                  <Mail size={20} />
                </div>
                <div>
                  <h5 className="font-bold text-slate-900 text-sm">Posta Elettronica</h5>
                  <a href="mailto:saluteambienteigiene@gmail.com" className="text-sm text-slate-600 hover:text-sai-green block mt-0.5">saluteambienteigiene@gmail.com</a>
                  <a href="mailto:sai.srl@pecaruba.it" className="text-[11px] text-slate-500 hover:text-sai-green block mt-0.5">PEC: sai.srl@pecaruba.it</a>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="p-3 bg-white rounded-xl text-sky-500 shadow-sm border border-slate-100">
                  <MapPin size={20} />
                </div>
                <div>
                  <h5 className="font-bold text-slate-900 text-sm">Sede Operativa</h5>
                  <span className="text-sm text-slate-600 block mt-0.5">Via Luigi La Vista, 5 - Napoli (Italy)</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Riceviamo su appuntamento</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Right */}
          <div className="lg:col-span-7">
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Invia una Richiesta Online</h3>
              
              <form className="space-y-4" onSubmit={(e) => { 
                e.preventDefault(); 
                alert("Richiesta inviata con successo! Un tecnico S.A.I. s.r.l. la ricontatterà a breve tramite email (saluteambienteigiene@gmail.com) o telefono."); 
              }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-slate-500">Nome e Cognome *</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="Inserisci il tuo nome" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-sai-blue outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-slate-500">Ragione Sociale / Azienda</label>
                    <input 
                      type="text" 
                      placeholder="Nome attività o condominio" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-sai-blue outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-slate-500">Indirizzo Email *</label>
                    <input 
                      type="email" 
                      required 
                      placeholder="esempio@email.com" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-sai-blue outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-slate-500">Numero di Telefono *</label>
                    <input 
                      type="tel" 
                      required 
                      placeholder="Es. 3331234567" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-sai-blue outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-slate-500">Servizio Richiesto *</label>
                  <select 
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-sai-blue outline-none"
                  >
                    <option value="">-- Seleziona un servizio --</option>
                    <option value="sicurezza">Sicurezza sul Lavoro (D.Lgs 81/08)</option>
                    <option value="haccp">Autocontrollo HACCP / SCIA Alimentare</option>
                    <option value="biologico">Controllo Legionella (Campionamento & DVR)</option>
                    <option value="autoclavi">Autoclavi Odontoiatri (Verifiche Studi)</option>
                    <option value="acque">Analisi Acque & Piscine (Condomini e Piscine)</option>
                    <option value="radon">Valutazione Gas Radon (D.Lgs 101/20)</option>
                    <option value="privacy">Privacy & GDPR (Reg. UE 679/16)</option>
                    <option value="formazione">Corsi di Formazione Sicurezza/HACCP</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-slate-500">Dettagli del Messaggio</label>
                  <textarea 
                    rows={4}
                    placeholder="Descrivi brevemente la tua attività e le tue esigenze..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-sai-blue outline-none resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button 
                    type="submit" 
                    className="w-full py-4 bg-sai-blue hover:bg-sai-blue-dark text-white font-bold rounded-xl shadow-lg shadow-sai-blue/20 transition-all hover:scale-[1.01]"
                  >
                    Invia Messaggio
                  </button>
                  <span className="text-[10px] text-slate-400 block text-center mt-3">
                    Premendo su Invia acconsenti al trattamento dei dati personali ai sensi del Regolamento UE 679/2016.
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
