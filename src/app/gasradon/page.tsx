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
  FileCheck,
  CheckCircle,
  Award,
  ChevronRight,
  FlameKindling,
  Scale
} from 'lucide-react';

export default function GasRadonPage() {
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
                  <a href="/#servizi" className="px-3.5 py-2.5 hover:bg-slate-50 text-xs font-bold text-slate-700 hover:text-sai-blue rounded-lg transition-colors">Analisi Acque & Piscine</a>
                  <a href="/gasradon" className="px-3.5 py-2.5 hover:bg-slate-50 text-xs font-bold text-sai-blue rounded-lg transition-colors flex items-center justify-between bg-sai-blue/5">
                    <span>Misurazione Gas Radon</span>
                    <span className="text-[9px] bg-amber-100 text-amber-600 px-1.5 py-0.5 rounded font-black">D.Lgs. 101/20</span>
                  </a>
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
                <a href="/#servizi" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 text-sm font-bold text-slate-700 hover:text-sai-blue hover:bg-slate-50 rounded-lg transition-colors">Analisi Acque & Piscine</a>
                <a href="/gasradon" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 text-sm font-bold text-sai-blue bg-sai-blue/5 rounded-lg transition-colors flex items-center justify-between">
                  Misurazione Gas Radon <span className="text-[9px] bg-amber-100 text-amber-600 px-1.5 py-0.5 rounded font-black">D.Lgs. 101/20</span>
                </a>
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
        
        {/* Sfondo tematico sul gas Radon (laboratorio e misurazione scientifica delle radiazioni) */}
        <div className="absolute inset-0 opacity-20 z-0 bg-[url('https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=2080')] bg-cover bg-center" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-6">
          <span className="text-xs font-black tracking-widest text-sai-green-light uppercase bg-sai-green/10 border border-sai-green-light/20 px-3.5 py-1.5 rounded-full inline-block">
            Approfondimento a cura di A.Novissimo
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
            Gas Radon: Un Pericoloso Nemico
          </h1>
          <p className="text-slate-300 text-lg max-w-3xl leading-relaxed mx-auto">
            Consulenza qualificata e misurazioni certificate in ambienti interrati e seminterrati ai sensi del D.Lgs. 101/2020.
          </p>
        </div>
        
        {/* Margine al lato inferiore della slide di colore verde */}
        <div className="absolute bottom-0 left-0 w-full h-[6px] bg-sai-green z-25" />
      </header>

      {/* COS'È IL GAS RADON */}
      <section className="py-20 max-w-5xl mx-auto px-6 space-y-8">
        <div className="bg-white border border-slate-100 p-8 rounded-2xl shadow-xl space-y-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-amber-500" />
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase">
            Che cos'è il Radon?
          </h2>
          <span className="text-xs font-black tracking-wider text-amber-500 uppercase block mt-1">
            GAS RADIOATTIVO NATURALE • BECQUEREL PER METRO CUBO (BQ/M³)
          </span>
          <div className="text-slate-600 space-y-4 leading-relaxed text-sm sm:text-base">
            <p>
              Il <strong>Radon</strong> è un gas radioattivo naturale, inodore, insapore e incolore, estremamente volatile e solubile in acqua. È un prodotto del decadimento radioattivo del radio che, a sua volta, deriva dall'uranio presente nelle rocce e nel terreno.
            </p>
            <p>
              Decadendo, il radon origina isotopi radioattivi solidi (chiamati <em>"figli del radon"</em>). Questi rappresentano il pericolo maggiore per la salute: inalati con la respirazione, si depositano nei polmoni dove continuano a emettere radiazioni ionizzanti che danneggiano gravemente le cellule e il tessuto polmonare.
            </p>
          </div>
        </div>
      </section>

      {/* EFFETTI SANITARI & STATISTICHE DECESSI */}
      <section className="py-16 bg-slate-900 text-white relative">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-sai-green/10 flex items-center justify-center text-sai-green-light">
              <Activity size={24} />
            </div>
            <h3 className="text-xl font-black uppercase text-sai-green-light font-black">Quali sono gli effetti sulla salute?</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Il Radon è classificato dall'Organizzazione Mondiale della Sanità (OMS) come <strong>cancerogeno di Gruppo 1</strong>, collocandolo al secondo posto come causa di insorgenza di tumori polmonari, subito dopo il fumo di tabacco.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-4 text-xs">
            <div className="flex items-center gap-2 text-amber-400 font-bold uppercase tracking-wider text-xs">
              <AlertTriangle size={18} />
              <span>Dati Nazionali ed Esposizione</span>
            </div>
            <ul className="space-y-2 text-slate-300">
              <li>🇮🇹 In Italia oltre <strong>3.200 decessi all'anno</strong> per cancro al polmone sono direttamente attribuibili al gas Radon.</li>
              <li>🏠 Trascorriamo l'<strong>80-90%</strong> del nostro tempo all'interno di ambienti confinati ed edifici chiusi, dove il gas tende ad accumularsi.</li>
              <li>👶 I bambini sono circa <strong>10 volte più sensibili</strong> alle radiazioni del Radon rispetto agli adulti.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ORIGINE & MECCANISMO DI PENETRAZIONE */}
      <section className="py-20 max-w-5xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-6 space-y-6">
          <h3 className="text-xl font-black text-slate-900 uppercase font-black">Da dove proviene il Radon?</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            La principale sorgente è il suolo: il gas si propaga attraverso le porosità del terreno fino alla superficie. Altre sorgenti secondarie ma rilevanti sono i materiali da costruzione (tufi, lave) e le acque termali o attinte da pozzi artesiani profondi.
          </p>
        </div>

        <div className="lg:col-span-6 space-y-6">
          <h3 className="text-xl font-black text-slate-900 uppercase font-black">Come penetra negli edifici?</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Il radon penetra negli edifici a causa dell'<strong>"effetto camino"</strong>: la differenza di temperatura tra interno ed esterno crea una depressione che richiama l'aria (e il gas) dal sottosuolo attraverso crepe, giunture di pavimentazione e passaggi di tubature. Il problema riguarda perciò principalmente locali interrati, seminterrati e piani terra.
          </p>
        </div>
      </section>

      {/* COMPONENTI DEL MONITORAGGIO E AZIONI MITIGATIVE */}
      <section className="py-16 bg-slate-100">
        <div className="max-w-5xl mx-auto px-6 space-y-12">
          
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-black text-slate-900 uppercase">Misurazione & Interventi di Bonifica</h3>
            <p className="text-slate-500 text-xs sm:text-sm">
              Come rilevare il gas Radon e quali azioni intraprendere in conformità al D.Lgs. 101/2020.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-xs sm:text-sm">
            
            {/* Dosimetri */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <span className="font-extrabold text-sai-blue uppercase block">📊 Dosimetri Passivi</span>
              <p className="text-slate-500 text-xs leading-relaxed">
                Il metodo di misura ufficiale prevede il posizionamento di dosimetri passivi per un periodo di esposizione annuale (diviso in due semestri), analizzati successivamente da laboratori specializzati.
              </p>
            </div>

            {/* Azioni Passive */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <span className="font-extrabold text-sai-blue uppercase block">💨 Azioni Passive</span>
              <ul className="space-y-1.5 text-slate-500 text-xs">
                <li>• Sigillatura accurata di crepe e intercapedini.</li>
                <li>• Incremento della ventilazione naturale dei locali.</li>
                <li>• Depressurizzazione passiva del vespaio sanitario.</li>
              </ul>
            </div>

            {/* Azioni Attive */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <span className="font-extrabold text-sai-blue uppercase block">⚙️ Azioni Attive</span>
              <p className="text-slate-500 text-xs leading-relaxed">
                In presenza di concentrazioni elevate, si rende necessaria l'installazione di sistemi di ventilazione meccanica forzata o la depressurizzazione attiva del suolo al di sotto della fondazione dell'edificio.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* BANNER CONTATTI SOPRA FOOTER */}
      <section className="bg-sai-green text-white py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="text-xl sm:text-2xl font-black">Richiedi la misurazione del Gas Radon</h4>
            <p className="text-white/80 text-sm">Posizionamento dosimetri annuali certificati, stesura relazioni tecniche ed interventi di mitigazione.</p>
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

    </div>
  );
}
