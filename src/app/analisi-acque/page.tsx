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
  FileText, 
  Activity, 
  AlertTriangle,
  Info,
  Scale,
  Award,
  ChevronRight,
  FlameKindling,
  Waves,
  GlassWater,
  FlaskConical
} from 'lucide-react';

export default function AnalisiAcquePage() {
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
                  <a href="/haccp" className="px-3.5 py-2.5 hover:bg-slate-50 text-xs font-bold text-slate-700 hover:text-sai-blue rounded-lg transition-colors flex items-center justify-between">
                    <span>Igiene Alimentare (HACCP)</span>
                    <span className="text-[9px] bg-sai-green/10 text-sai-green px-1.5 py-0.5 rounded font-black">OSA</span>
                  </a>
                  <a href="/legionella" className="px-3.5 py-2.5 hover:bg-slate-50 text-xs font-bold text-slate-700 hover:text-sai-blue rounded-lg transition-colors">Controllo Legionella</a>
                  <a href="/studiodontoiatrici" className="px-3.5 py-2.5 hover:bg-slate-50 text-xs font-bold text-slate-700 hover:text-sai-blue rounded-lg transition-colors">Autoclavi Odontoiatri</a>
                  <a href="/analisi-acque" className="px-3.5 py-2.5 hover:bg-slate-50 text-xs font-bold text-sai-blue rounded-lg transition-colors flex items-center justify-between bg-sai-blue/5">
                    <span>Analisi Acque & Piscine</span>
                    <span className="text-[9px] bg-cyan-100 text-cyan-600 px-1.5 py-0.5 rounded font-black">D.Lgs. 18/23</span>
                  </a>
                  <a href="/gasradon" className="px-3.5 py-2.5 hover:bg-slate-50 text-xs font-bold text-slate-700 hover:text-sai-blue rounded-lg transition-colors">Misurazione Gas Radon</a>
                  <a href="/gdpr" className="px-3.5 py-2.5 hover:bg-slate-50 text-xs font-bold text-slate-700 hover:text-sai-blue rounded-lg transition-colors">Privacy & GDPR</a>
                  <a href="/formazione" className="px-3.5 py-2.5 hover:bg-slate-50 text-xs font-bold text-slate-700 hover:text-sai-blue rounded-lg transition-colors">Formazione Professionale</a>
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
                <a href="/haccp" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 text-sm font-bold text-slate-700 hover:text-sai-blue hover:bg-slate-50 rounded-lg transition-colors">Igiene Alimentare (HACCP)</a>
                <a href="/legionella" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 text-sm font-bold text-slate-700 hover:text-sai-blue hover:bg-slate-50 rounded-lg transition-colors">Controllo Legionella</a>
                <a href="/studiodontoiatrici" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 text-sm font-bold text-slate-700 hover:text-sai-blue hover:bg-slate-50 rounded-lg transition-colors">Autoclavi Odontoiatri</a>
                <a href="/analisi-acque" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 text-sm font-bold text-sai-blue bg-sai-blue/5 rounded-lg transition-colors flex items-center justify-between">
                  Analisi Acque & Piscine <span className="text-[9px] bg-cyan-100 text-cyan-600 px-1.5 py-0.5 rounded font-black">D.Lgs. 18/23</span>
                </a>
                <a href="/gasradon" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 text-sm font-bold text-slate-700 hover:text-sai-blue hover:bg-slate-50 rounded-lg transition-colors">Misurazione Gas Radon</a>
                <a href="/gdpr" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 text-sm font-bold text-slate-700 hover:text-sai-blue hover:bg-slate-50 rounded-lg transition-colors">Privacy & GDPR</a>
                <a href="/formazione" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 text-sm font-bold text-slate-700 hover:text-sai-blue hover:bg-slate-50 rounded-lg transition-colors">Formazione Professionale</a>
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
        
        {/* Sfondo tematico su una bellissima piscina azzurra e pulita */}
        <div className="absolute inset-0 opacity-20 z-0 bg-[url('https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=2070')] bg-cover bg-center" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-6">
          <span className="text-xs font-black tracking-widest text-sai-green-light uppercase bg-sai-green/10 border border-sai-green-light/20 px-3.5 py-1.5 rounded-full inline-block">
            Approfondimento a cura di A.Novissimo
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
            Analisi Acque & Piscine
          </h1>
          <p className="text-slate-300 text-lg max-w-3xl leading-relaxed mx-auto">
            Consulenza e controllo chimico-microbiologico delle acque destinate al consumo umano (D.Lgs. 18/2023) ed impianti balneari o piscine pubbliche e condominiali.
          </p>
        </div>
        
        {/* Margine al lato inferiore della slide di colore verde */}
        <div className="absolute bottom-0 left-0 w-full h-[6px] bg-sai-green z-25" />
      </header>

      {/* SEZIONE 1: L'ACQUA UN BENE PREZIOSO (CONSUMO UMANO) */}
      <section className="py-20 max-w-5xl mx-auto px-6 space-y-12">
        <div className="bg-white border border-slate-100 p-8 rounded-2xl shadow-xl space-y-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-sai-blue" />
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase flex items-center gap-2">
            <GlassWater className="text-sai-blue shrink-0" />
            Qualità Acque al Consumo Umano
          </h2>
          <span className="text-xs font-black tracking-wider text-sai-blue uppercase block mt-1">
            NUOVA NORMATIVA DECRETO LEGISLATIVO N. 18 DEL 23 FEBBRAIO 2023
          </span>
          <div className="text-slate-600 space-y-4 leading-relaxed text-sm sm:text-base">
            <p>
              L'acqua assolve la funzione biologica di "igiene", pulizia e prevenzione delle malattie assicurando un superiore livello di qualità della vita. Tuttavia, se l'acqua non è microbiologicamente o chimicamente salubre, essa si trasforma in un pericoloso veicolo di contaminazione patogena.
            </p>
            <p>
              Il <strong>D.Lgs. n.18 del 23/02/2023</strong> (pubblicato in G.U. n.55 del 06/03/2023), concernente la qualità delle acque destinate al consumo umano, sostituisce ed abroga integralmente la vecchia normativa del D.Lgs. 31/2001.
            </p>
          </div>
        </div>

        {/* ESTRATTI CHIAVE DEL DECRETO 18/23 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
          
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-3">
            <h4 className="font-extrabold text-slate-900">Gestore della Distribuzione Interna (GDI)</h4>
            <p className="text-slate-500 leading-relaxed text-xs">
              <strong>Art. 2, lett. q:</strong> Definisce la figura del GDI (proprietario, amministratore di condominio, titolare di attività pubblica o privata), incaricato e responsabile del sistema idro-potabile di distribuzione interno compreso tra il punto di consegna dell'acquedotto e il rubinetto d'uso finale.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-3">
            <h4 className="font-extrabold text-slate-900">Il Punto di Utenza (Art. 5)</h4>
            <p className="text-slate-500 leading-relaxed text-xs">
              I parametri chimici ed i limiti batteriologici previsti dal decreto devono essere rigorosamente rispettati al <strong>punto di uscita dei rubinetti</strong> utilizzati all'interno di stabili pubblici o privati, e non semplicemente all'allacciamento esterno.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-3">
            <h4 className="font-extrabold text-slate-900">Piano di Sicurezza Acque (PSA)</h4>
            <p className="text-slate-500 leading-relaxed text-xs">
              L'<strong>Articolo 8</strong> introduce a carico dei gestori idro-potabili l'obbligo di effettuare un'approfondita valutazione e gestione preventiva del rischio del sistema di fornitura idrica mediante l'elaborazione del PSA.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-3">
            <h4 className="font-extrabold text-red-700">Responsabilità & Sanzioni (Art. 23)</h4>
            <p className="text-slate-500 leading-relaxed text-xs">
              Salvo che il fatto costituisca reato, chiunque utilizzi in imprese alimentari o di somministrazione acqua non conforme, con conseguente alterazione della salubrità del prodotto finale, è punito con la sanzione amministrativa pecuniaria <strong>da 5.000 a 30.000 euro</strong>.
            </p>
          </div>

        </div>

        {/* CONSIGLI PRATICI SULLA SALUBRITÀ */}
        <div className="bg-slate-900 text-slate-300 p-6 rounded-2xl shadow-md space-y-4 text-xs">
          <span className="font-extrabold text-white uppercase tracking-wider block text-sai-green-light">💡 Consigli Pratici S.A.I. s.r.l. sulla Qualità dell'Acqua:</span>
          <ul className="space-y-2 leading-relaxed">
            <li>💧 <strong>Nitriti e Nitrati:</strong> Solo acque con quantità inferiori a 10 mg/l di nitrati sono idonee per l'infanzia; oltre i 50 mg/l (limite normativo) sussiste il rischio di metaemoglobinemia (cianosi infantile).</li>
            <li>🧊 <strong>Residuo Fisso e Durezza:</strong> Livelli eccessivi di durezza o valori di PH inferiori a 8 favoriscono notevolmente lo sviluppo di colonie batteriche all'interno delle cisterne o autoclavi condominiali.</li>
            <li>🍋 <strong>Presenza di Cloro:</strong> Se l'acqua sa di cloro all'uscita dal rubinetto, è sufficiente lasciarla riposare in una caraffa per alcuni minuti per consentirne la naturale dispersione nell'aria.</li>
          </ul>
        </div>
      </section>

      {/* SEZIONE 2: CONTROLLO ACQUE PISCINE */}
      <section className="py-20 bg-slate-100">
        <div className="max-w-5xl mx-auto px-6 space-y-12">
          
          <div className="bg-white border border-slate-100 p-8 rounded-2xl shadow-xl space-y-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-sai-green" />
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase flex items-center gap-2">
              <Waves className="text-sai-green shrink-0" />
              Gestione Igienica Acque di Piscina
            </h2>
            <span className="text-xs font-black tracking-wider text-sai-green uppercase block mt-1">
              ACCORDO STATO-REGIONI 16 GENNAIO 2003 • D.G.R.C. REGIONALI CAMPANIA
            </span>
            <div className="text-slate-600 space-y-4 leading-relaxed text-sm sm:text-base">
              <p>
                Il trattamento igienico e la disinfezione dell'acqua delle piscine è un'operazione complessa, volta a contrastare la contaminazione biologica indotta principalmente dai bagnanti (sudore, urine, epidermide, prodotti cosmetici o mancanza d'uso delle docce prima dell'ingresso).
              </p>
              <p>
                Per una corretta conduzione e conformità alle direttive vigenti (Accordo del 16/01/2003 e delibere regionali D.G.R.C. n. 3530/2001, n. 2003/2003 e n. 2088/2004), l'amministratore o titolare dell'impianto deve dotarsi di un apposito <strong>Registro di Controllo e autocontrollo</strong> dell'acqua di piscina.
              </p>
            </div>
          </div>

          {/* LE 3 FASI DELLA FILTRAZIONE FISICA */}
          <div className="space-y-4 text-xs sm:text-sm">
            <h3 className="font-extrabold text-slate-900 text-lg uppercase">Il ciclo di Filtrazione dell'Acqua</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200/60 space-y-2">
                <span className="text-sai-blue font-bold uppercase block text-xs">Fase 1: Prefiltrazione</span>
                <p className="text-slate-500 text-xs leading-relaxed">
                  Trattenimento delle impurità più grossolane (capelli, foglie, piccoli oggetti) tramite filtri a cestello posizionati prima della pompa.
                </p>
              </div>

              <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200/60 space-y-2">
                <span className="text-sai-blue font-bold uppercase block text-xs">Fase 2: Coagulazione</span>
                <p className="text-slate-500 text-xs leading-relaxed">
                  Aggregazione delle micro-particelle sospese colloidali mediante l'aggiunta controllata di agenti flocculanti (solfato di alluminio).
                </p>
              </div>

              <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200/60 space-y-2">
                <span className="text-sai-blue font-bold uppercase block text-xs">Fase 3: Filtrazione</span>
                <p className="text-slate-500 text-xs leading-relaxed">
                  Trattenimento finale dei micro-aggregati grazie a letti di sabbia multistrato silicea o diatomee (nel Perifiltron d'impianto).
                </p>
              </div>

            </div>
          </div>

          {/* PARAMETRI DI CONTROLLO PISCINE */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-8 text-xs sm:text-sm">
            <div className="space-y-3">
              <span className="font-bold text-slate-900 block uppercase">Parametri Fisico-Chimici Fondamentali:</span>
              <p className="text-slate-600 text-xs leading-relaxed">
                <strong>La Durezza dell'Acqua:</strong> Se troppo dura, i sali di calcio e magnesio precipitano ostruendo i filtri e riducendo l'efficienza dei sistemi igienici.
              </p>
              <p className="text-slate-600 text-xs leading-relaxed">
                <strong>PH ed Efficacia:</strong> La regolazione costante del PH consente al disinfettante (cloro) di agire efficacemente eliminando batteri e virus.
              </p>
            </div>
            <div className="space-y-3 border-t md:border-t-0 md:border-l border-slate-200 pt-4 md:pt-0 md:pl-8">
              <span className="font-bold text-slate-900 block uppercase">Condizioni Ottimali:</span>
              <ul className="space-y-2 text-slate-500 text-xs">
                <li>• Temperatura consigliata costante a circa <strong>27 °C</strong>.</li>
                <li>• Provenienza consigliata dall'acquedotto potabile per garantire parametri di base conformi.</li>
                <li>• Esecuzione periodica di tamponi ed analisi microbiologiche in laboratorio.</li>
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* BANNER CONTATTI SOPRA FOOTER */}
      <section className="bg-sai-green text-white py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="text-xl sm:text-2xl font-black">Esegui l'analisi delle acque</h4>
            <p className="text-white/80 text-sm">Campionamenti potabilità condomini (D.Lgs. 18/2023), registri autocontrollo e campionamenti microbiologici piscine.</p>
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
              <a href="/formazione" className="hover:text-white transition-colors">Formazione Professionale</a>
              <a href="/haccp" className="hover:text-white transition-colors">Igiene HACCP</a>
              <a href="/studiodontoiatrici" className="hover:text-white transition-colors">Autoclavi Odontoiatri</a>
              <a href="/gdpr" className="hover:text-white transition-colors">Privacy & GDPR</a>
              <a href="/gasradon" className="hover:text-white transition-colors">Gas Radon</a>
              <a href="/analisi-acque" className="hover:text-white transition-colors">Analisi Acque</a>
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
