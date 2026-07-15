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
  BookOpen,
  Info,
  Award,
  ChevronRight,
  FlameKindling,
  Leaf,
  Scale
} from 'lucide-react';

export default function HaccpPage() {
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
                  <a href="/haccp" className="px-3.5 py-2.5 hover:bg-slate-50 text-xs font-bold text-sai-blue rounded-lg transition-colors flex items-center justify-between bg-sai-blue/5">
                    <span>Igiene Alimentare (HACCP)</span>
                    <span className="text-[9px] bg-sai-green/10 text-sai-green px-1.5 py-0.5 rounded font-black">OSA</span>
                  </a>
                  <a href="/legionella" className="px-3.5 py-2.5 hover:bg-slate-50 text-xs font-bold text-slate-700 hover:text-sai-blue rounded-lg transition-colors">Controllo Legionella</a>
                  <a href="/#servizi" className="px-3.5 py-2.5 hover:bg-slate-50 text-xs font-bold text-slate-700 hover:text-sai-blue rounded-lg transition-colors">Autoclavi Odontoiatri</a>
                  <a href="/#servizi" className="px-3.5 py-2.5 hover:bg-slate-50 text-xs font-bold text-slate-700 hover:text-sai-blue rounded-lg transition-colors">Analisi Acque & Piscine</a>
                  <a href="/#servizi" className="px-3.5 py-2.5 hover:bg-slate-50 text-xs font-bold text-slate-700 hover:text-sai-blue rounded-lg transition-colors">Misurazione Gas Radon</a>
                  <a href="/#servizi" className="px-3.5 py-2.5 hover:bg-slate-50 text-xs font-bold text-slate-700 hover:text-sai-blue rounded-lg transition-colors">Privacy & GDPR</a>
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
                <a href="/haccp" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 text-sm font-bold text-sai-blue bg-sai-blue/5 rounded-lg transition-colors flex items-center justify-between">
                  Igiene Alimentare (HACCP) <span className="text-[9px] bg-sai-green/10 text-sai-green px-1.5 py-0.5 rounded font-black">OSA</span>
                </a>
                <a href="/legionella" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 text-sm font-bold text-slate-700 hover:text-sai-blue hover:bg-slate-50 rounded-lg transition-colors">Controllo Legionella</a>
                <a href="/#servizi" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 text-sm font-bold text-slate-700 hover:text-sai-blue hover:bg-slate-50 rounded-lg transition-colors">Autoclavi Odontoiatri</a>
                <a href="/#servizi" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 text-sm font-bold text-slate-700 hover:text-sai-blue hover:bg-slate-50 rounded-lg transition-colors">Analisi Acque & Piscine</a>
                <a href="/#servizi" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 text-sm font-bold text-slate-700 hover:text-sai-blue hover:bg-slate-50 rounded-lg transition-colors">Privacy & GDPR</a>
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
        
        {/* Sfondo tematico sulla sicurezza alimentare */}
        <div className="absolute inset-0 opacity-15 z-0 bg-[url('https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=2070')] bg-cover bg-center" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-6">
          <span className="text-xs font-black tracking-widest text-sai-green-light uppercase bg-sai-green/10 border border-sai-green-light/20 px-3.5 py-1.5 rounded-full inline-block">
            Approfondimento a cura di A.Novissimo
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
            Igiene e Sicurezza Alimentare (H.A.C.C.P.)
          </h1>
          <p className="text-slate-300 text-lg max-w-3xl leading-relaxed mx-auto">
            Consulenza per l'autocontrollo, manuali di corretta prassi igienica, campionamenti analitici e gestione allergeni ai sensi dei Regolamenti Europei.
          </p>
        </div>
        
        {/* Margine al lato inferiore della slide di colore verde */}
        <div className="absolute bottom-0 left-0 w-full h-[6px] bg-sai-green z-25" />
      </header>

      {/* LEGISLAZIONE E PRINCIPI GENERALI */}
      <section className="py-20 max-w-5xl mx-auto px-6 space-y-8">
        <div className="bg-white border border-slate-100 p-8 rounded-2xl shadow-xl space-y-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-sai-green" />
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase">
            La Sicurezza Alimentare in Europa
          </h2>
          <span className="text-xs font-black tracking-wider text-sai-green uppercase block mt-1">
            REGOLAMENTI UE 178/2002 • 852/2004 • 382/2021
          </span>
          <div className="text-slate-600 space-y-4 leading-relaxed text-sm sm:text-base">
            <p>
              Il conseguimento di un elevato livello di protezione della salute umana è l'obiettivo primario della legislazione alimentare, regolamentata a livello europeo.
            </p>
            <ul className="space-y-3.5 pt-2">
              <li className="flex items-start gap-2.5">
                <span className="font-bold text-sai-blue shrink-0 mt-0.5">Reg. UE 178/2002:</span>
                <span>Dispone la <strong>rintracciabilità</strong> obbligatoria degli alimenti e degli ingredienti lungo tutta la catena alimentare per garantire un ritiro tempestivo in caso di pericoli.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="font-bold text-sai-blue shrink-0 mt-0.5">Reg. UE 852/2004:</span>
                <span>Stabilisce le norme generali sull'igiene dei prodotti alimentari, specificando che della sicurezza risponde direttamente l'<strong>Operatore del Settore Alimentare (OSA)</strong>.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* LE TRE NOVITÀ INTRODOTTE DAL REGOLAMENTO UE 382/2021 */}
      <section className="py-16 bg-slate-100">
        <div className="max-w-5xl mx-auto px-6 space-y-8">
          <div className="text-center space-y-2">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 uppercase">Le tre novità del Regolamento U.E. n. 382/21</h3>
            <p className="text-slate-500 text-xs sm:text-sm max-w-xl mx-auto">
              Aggiornamenti cruciali sull'igiene dei prodotti che ridefiniscono le buone prassi quotidiane per le aziende alimentari.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm">
            
            {/* Novità 1 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-3">
              <span className="w-8 h-8 rounded-full bg-sai-green/10 text-sai-green flex items-center justify-center font-black text-xs">1</span>
              <h4 className="font-extrabold text-slate-900">Gestione degli Allergeni</h4>
              <p className="text-slate-500 leading-relaxed text-xs">
                Mitigazione e prevenzione delle contaminazioni da allergeni nelle attrezzature, veicoli e contenitori. Applicazione armonizzata di buone prassi igieniche a tutela dei consumatori intolleranti.
              </p>
            </div>

            {/* Novità 2 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-3">
              <span className="w-8 h-8 rounded-full bg-sai-green/10 text-sai-green flex items-center justify-center font-black text-xs">2</span>
              <h4 className="font-extrabold text-slate-900">Ridistribuzione Alimenti</h4>
              <p className="text-slate-500 leading-relaxed text-xs">
                Norme per ridurre gli sprechi alimentari e favorire l'economia circolare. Donazioni alimentari in piena sicurezza con l'adozione di analisi dei pericoli specifiche anche per i piccoli dettaglianti.
              </p>
            </div>

            {/* Novità 3 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-3">
              <span className="w-8 h-8 rounded-full bg-sai-green/10 text-sai-green flex items-center justify-center font-black text-xs">3</span>
              <h4 className="font-extrabold text-slate-900">Cultura della Sicurezza</h4>
              <p className="text-slate-500 leading-relaxed text-xs">
                Principio introdotto dal Codex Alimentarius che impone di accrescere consapevolezza e comportamenti igienici sicuri di tutta la dirigenza e del personale dipendente degli stabilimenti.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* DEFINIZIONI UTILI */}
      <section className="py-20 max-w-5xl mx-auto px-6 space-y-8">
        <h3 className="text-xl font-black text-slate-900 uppercase">Definizioni nel Settore Alimentare</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-600">
          <div className="bg-white p-4 rounded-xl border border-slate-100">
            <span className="font-bold text-sai-blue block mb-1">Igiene degli Alimenti:</span>
            Controllo attuato per evitare pericoli derivanti dalla mancata applicazione del Codex Alimentarius e del sistema H.A.C.C.P.
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-100">
            <span className="font-bold text-sai-blue block mb-1">Stabilimento:</span>
            Ogni singola unità di un'impresa del settore alimentare (laboratorio, punto vendita, magazzinaggio).
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-100">
            <span className="font-bold text-sai-blue block mb-1">Criteri Microbiologici:</span>
            Requisiti di controllo delle temperature e parametri microbiologici sulla base di valutazioni scientifiche del rischio.
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-100">
            <span className="font-bold text-sai-blue block mb-1">Manuali di Corretta Prassi:</span>
            Strumenti fondamentali per garantire l'igiene in tutti i passaggi della catena alimentare.
          </div>
        </div>
      </section>

      {/* OPERATORE SETTORE ALIMENTARE (OSA) */}
      <section className="py-16 bg-slate-900 text-white relative">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          <div className="md:col-span-5 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-sai-green/20 flex items-center justify-center text-sai-green-light">
              <Scale size={24} />
            </div>
            <h3 className="text-xl font-black uppercase text-sai-green-light">Responsabilità dell'OSA</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              La responsabilità principale per la sicurezza degli alimenti incombe all'OSA (Regolamento CE 852/2004, Art. 1).
            </p>
          </div>

          <div className="md:col-span-7 bg-white/5 border border-white/10 p-6 rounded-2xl space-y-3.5 text-xs text-slate-300">
            {[
              "Garantire la sicurezza degli alimenti a cominciare dalla produzione primaria",
              "Verificare costantemente la catena del freddo per i prodotti deperibili e surgelati",
              "Applicare procedure basate sui principi HACCP e tenere i registri aggiornati",
              "Garantire la rintracciabilità a monte e a valle dei lotti alimentari (Art. 18 Reg. 178/2002)",
              "Avviare subito il ritiro o richiamo degli alimenti non conformi sul mercato (Art. 19 Reg. 178/2002)"
            ].map((pt, idx) => (
              <div key={idx} className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-sai-green shrink-0" />
                <span>{pt}</span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* PROCEDURE DI PULIZIA E DETERSIONE */}
      <section className="py-20 max-w-5xl mx-auto px-6 space-y-12">
        <div className="text-center space-y-2">
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase">Procedure di Pulizia e Detersione</h3>
          <p className="text-slate-600 text-sm">
            Tutte le attività alimentari hanno l'obbligo di implementare un corretto protocollo di sanificazione.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-xs sm:text-sm">
          
          {/* Fase 1 */}
          <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm space-y-3 relative">
            <span className="text-xs font-black text-sai-blue">FASE 1</span>
            <h4 className="font-extrabold text-slate-900">Rimozione Residui</h4>
            <p className="text-slate-500 text-xs">
              Asportazione meccanica di tutti i residui organici grossolani accumulati durante le fasi giornaliere di lavorazione degli alimenti.
            </p>
          </div>

          {/* Fase 2 */}
          <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm space-y-3 relative">
            <span className="text-xs font-black text-sai-blue">FASE 2</span>
            <h4 className="font-extrabold text-slate-900">Detersione</h4>
            <p className="text-slate-500 text-xs">
              Lavaggio con prodotti specifici per eliminare grassi e sporco. Detergenti <strong>alcalini</strong> per grassi e proteine; detergenti <strong>acidi</strong> per incrostazioni calcaree e inorganiche.
            </p>
          </div>

          {/* Fase 3 */}
          <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm space-y-3 relative">
            <span className="text-xs font-black text-sai-blue">FASE 3</span>
            <h4 className="font-extrabold text-slate-900">Disinfezione</h4>
            <p className="text-slate-500 text-xs">
              Misure per abbattere la carica batterica residua. Utilizzo di disinfettanti a base di alogeni (cloro e iodio), sali quaternari d'ammonio o composti anfoteri.
            </p>
          </div>

        </div>
      </section>

      {/* DIAGRAMMA DI FLUSSO MACELLERIA E CRITERI CARNE */}
      <section className="py-16 bg-slate-100 text-slate-800">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="space-y-4 text-xs sm:text-sm">
            <h4 className="text-lg font-black text-slate-900 uppercase">Il Diagramma di Flusso e i CCP</h4>
            <p className="text-slate-600 leading-relaxed">
              Il diagramma di flusso rappresenta sequenzialmente tutte le fasi del ciclo di lavorazione (ricevimento, stoccaggio, lavorazione, confezionamento, vendita). All'interno di questo flusso l'OSA deve individuare i <strong>Punti Critici di Controllo (CCP)</strong>:
            </p>
            <div className="grid grid-cols-2 gap-2 text-[10px] sm:text-xs">
              <span className="bg-white p-2 rounded shadow-sm">🧊 Controllo temperature banchi</span>
              <span className="bg-white p-2 rounded shadow-sm">🍗 Ricevimento merci</span>
              <span className="bg-white p-2 rounded shadow-sm">🧼 Igiene attrezzature e coltelli</span>
              <span className="bg-white p-2 rounded shadow-sm">🧫 Manipolazione e confezionamento</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4 text-xs sm:text-sm">
            <h4 className="font-extrabold text-slate-900 text-sai-blue">Criteri Microbiologici della Carne</h4>
            <p className="text-slate-600 leading-relaxed">
              In ottemperanza al <strong>Regolamento (CE) n. 2073/2005</strong> ed alle linee guida della Conferenza Stato Regioni:
            </p>
            <div className="bg-red-50 text-red-700 font-bold p-3 rounded-lg border-l-4 border-red-500 text-xs leading-normal">
              🦠 Per la carne macinata e preparati a base di carne il limite di accettabilità della <strong>Salmonella</strong> è: <span className="underline">Assente in 25 grammi</span>.
            </div>
            <p className="text-slate-500 text-xs">
              La carne fresca deve essere mantenuta a temperatura di refrigerazione a <strong>+3 °C</strong> per rallentare la moltiplicazione microbica.
            </p>
          </div>

        </div>
      </section>

      {/* REQUISITI ATTREZZATURE E ARMADIETTI */}
      <section className="py-20 max-w-5xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Attrezzature e Banchi Espositivi */}
        <div className="lg:col-span-6 space-y-6">
          <h3 className="text-xl font-black text-slate-900 uppercase">Requisiti delle Attrezzature</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Ai sensi del Capitolo V del Regolamento UE 852/2004, tutte le attrezzature a contatto con gli alimenti devono essere mantenute pulite, disinfettate e installate per agevolare le operazioni di lavaggio:
          </p>
          
          <div className="bg-white border border-slate-100 p-6 rounded-2xl space-y-3.5 shadow-sm text-xs text-slate-700">
            <p><strong>Banchi Espositivi:</strong> devono garantire la catena del freddo costante per non alterare gli alimenti.</p>
            <p><strong>Pannelli di protezione:</strong> obbligatori se i prodotti esposti nella vetrina (salumi, carne) sono privi di protezione o film conforme (UE 10/2011).</p>
            <p><strong>Rubinetteria:</strong> obbligo di installare lavabi con comando di erogazione non manuale (es. a pedale o fotocellula) nei laboratori e servizi.</p>
          </div>
        </div>

        {/* Spogliatoi e Armadietti */}
        <div className="lg:col-span-6 space-y-6">
          <h3 className="text-xl font-black text-slate-900 uppercase">Armadietti Spogliatoio</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            In tutti gli stabilimenti alimentari è obbligatorio mettere a disposizione dei lavoratori locali spogliatoio convenientemente arredati.
          </p>
          <div className="bg-slate-900 text-slate-300 p-6 rounded-2xl shadow-md space-y-4">
            <span className="font-extrabold text-white text-xs uppercase tracking-wider block text-sai-green-light">Caratteristiche Armadietti:</span>
            <ul className="space-y-2 text-xs">
              <li>👥 <strong>Distinti per sesso:</strong> se il numero degli addetti è superiore a 5 (Napoli Reg. Igiene).</li>
              <li>🔑 <strong>Chiusura a chiave:</strong> per proteggere gli indumenti personali durante il lavoro.</li>
              <li>🚪 <strong>Doppio scomparto:</strong> obbligo di separare gli abiti civili dagli indumenti da lavoro specifici o sporchi.</li>
              <li>🧽 <strong>Igienizzabili:</strong> lavabili, disinfettabili e disinfestabili in metallo o materiale idoneo.</li>
            </ul>
          </div>
        </div>

      </section>

      {/* SANZIONI E ACRILAMMIDE */}
      <section className="py-16 bg-slate-200/50">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 text-xs sm:text-sm">
          
          <div className="space-y-4 bg-white p-6 rounded-2xl shadow-sm">
            <span className="text-red-600 font-bold uppercase tracking-wider block text-xs">⚠️ Sanzioni Amministrative</span>
            <p className="text-slate-600">
              L'inosservanza degli obblighi in materia di igiene personale e procedure HACCP negli stabilimenti è sanzionata ai sensi del <strong>D.Lgs. 193/2007 (Articoli 5 e 6)</strong>.
            </p>
            <p className="text-slate-800 font-black">
              Le sanzioni pecuniarie applicate vanno da euro 500 a euro 6.000.
            </p>
          </div>

          <div className="space-y-4 bg-white p-6 rounded-2xl shadow-sm">
            <span className="text-sai-blue font-bold uppercase tracking-wider block text-xs">🍟 Cos'è l'Acrilammide? (Reg. UE 2158/2017)</span>
            <p className="text-slate-600">
              Sostanza chimica cancerogena che si forma naturalmente nei cibi amidacei (patate, pane, caffè, biscotti) cotti a temperature superiori a 120 °C.
            </p>
            <div className="text-xs text-slate-500 space-y-1">
              <p>• Ridurre le temperature di cottura ed aumentare i tempi.</p>
              <p>• Predisporre sbollentature con acqua e aceto prima di friggere.</p>
              <p>• Evitare oli con punti di fumo bassi.</p>
            </div>
          </div>

        </div>
      </section>

      {/* SEZIONE RIVOLUZIONARIA APP SAI FAST HACCP */}
      <section className="py-20 bg-gradient-to-br from-sai-blue/5 via-white to-sai-green/5 overflow-hidden border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          
          {/* Colonna Testo */}
          <div className="md:col-span-7 space-y-6">
            <span className="text-xs font-black tracking-widest text-sai-green uppercase bg-sai-green/10 border border-sai-green/20 px-3.5 py-1.5 rounded-full inline-block">
              Digitalizzazione Autocontrollo
            </span>
            <h3 className="text-3xl font-black tracking-tight text-slate-900 leading-tight">
              Gestisci l'HACCP direttamente dal tuo smartphone con l'App <span className="text-sai-blue">SAI Fast HACCP</span>
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Dì addio ai registri cartacei ingombranti e alle compilazioni manuali. Con la nostra applicazione proprietaria, gestisci schede di temperatura, tracciabilità lotti ed allergeni in pochi tap, riducendo a zero il rischio di errori e sanzioni ispettive.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-2">
                <span className="text-xs font-black text-sai-blue uppercase tracking-wider block">✍️ Compilazione Automatica</span>
                <p className="text-slate-500 text-[11px] leading-relaxed">Registrazione rapida delle schede di monitoraggio temperature dei frigoriferi.</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-2">
                <span className="text-xs font-black text-sai-green uppercase tracking-wider block">📦 Tracciabilità lotti</span>
                <p className="text-slate-500 text-[11px] leading-relaxed">Archiviazione digitale delle etichette e delle materie prime fornitore.</p>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <a 
                href="/#contatti" 
                className="px-6 py-3.5 bg-sai-blue hover:bg-sai-blue-light text-white font-bold rounded-xl text-center shadow-lg shadow-sai-blue/20 transition-all hover:scale-105 text-sm"
              >
                Richiedi Attivazione
              </a>
              <a 
                href="https://saifasthaccp.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-center transition-all hover:scale-105 flex items-center justify-center gap-1.5 text-sm"
              >
                Visita saifasthaccp.com
              </a>
            </div>
          </div>

          {/* Colonna Mockup Cellulare */}
          <div className="md:col-span-5 flex justify-center w-full">
            <div className="w-full max-w-[280px] bg-slate-950 border-4 border-slate-800 rounded-[2.5rem] shadow-2xl p-2.5 aspect-[9/16] relative overflow-hidden flex flex-col justify-between">
              
              {/* Speaker */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-5 bg-slate-800 rounded-b-2xl z-20 flex items-center justify-center">
                <span className="w-10 h-0.5 bg-slate-700 rounded-full" />
              </div>

              {/* App Screen Content */}
              <div className="w-full h-full bg-slate-900 rounded-[2rem] overflow-hidden relative z-10">
                <Image 
                  src="/Attachment0 (1).jpeg" 
                  alt="App SAI FAST HACCP Mockup" 
                  fill 
                  sizes="(max-width: 768px) 100vw, 280px"
                  className="object-cover" 
                  priority
                />
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* BANNER CONTATTI SOPRA FOOTER */}

      <section className="bg-sai-green text-white py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="text-xl sm:text-2xl font-black">Richiedi la redazione del manuale HACCP</h4>
            <p className="text-white/80 text-sm">Pratiche di autocontrollo, tamponi microbiologici, formazione per OSA ed adeguamento Regolamento 382/2021.</p>
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
