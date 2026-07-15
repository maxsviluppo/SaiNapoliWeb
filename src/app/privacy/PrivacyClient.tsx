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
  Lock,
  Globe,
  FileCheck
} from 'lucide-react';

export default function PrivacyPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [azienda, setAzienda] = useState<any>(null);

  useEffect(() => {
    fetch('/api/admin/save-locales')
      .then(res => res.json())
      .then(resData => {
        if (resData.success && resData.data?.azienda) {
          setAzienda(resData.data.azienda);
        }
      })
      .catch(err => console.error('Error loading privacy company data:', err));
  }, []);

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
                  <a href="/analisi-acque" className="px-3.5 py-2.5 hover:bg-slate-50 text-xs font-bold text-slate-700 hover:text-sai-blue rounded-lg transition-colors">Analisi Acque & Piscine</a>
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
                <a href="/analisi-acque" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 text-sm font-bold text-slate-700 hover:text-sai-blue hover:bg-slate-50 rounded-lg transition-colors">Analisi Acque & Piscine</a>
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
        className="relative pt-36 pb-20 overflow-hidden bg-slate-950 text-white"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/95 to-slate-950 z-0" />
        
        {/* Sfondo tematico sulla sicurezza dei dati e crittografia */}
        <div className="absolute inset-0 opacity-10 z-0 bg-[url('https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070')] bg-cover bg-center" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-4">
          <span className="text-xs font-black tracking-widest text-sai-green-light uppercase bg-sai-green/10 border border-sai-green-light/20 px-3.5 py-1.5 rounded-full inline-block">
            S.A.I. s.r.l. • Trasparenza
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight">
            Informativa per la Privacy & Cookie
          </h1>
          <p className="text-slate-400 text-sm max-w-2xl mx-auto">
            Informazioni rese per la raccolta e il trattamento dei dati personali ai sensi del Regolamento UE 679/2016 e del D.Lgs. 101/2018.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-[4px] bg-sai-green z-25" />
      </header>

      {/* INFORMATIVA CONTENUTO */}
      <section className="py-16 max-w-4xl mx-auto px-6 text-slate-600 space-y-10 text-xs sm:text-sm leading-relaxed">
        
        {/* Intro */}
        <div className="space-y-4">
          <h2 className="text-lg font-black text-slate-900 uppercase">Informativa per la Privacy</h2>
          <p>
            In adempimento del <strong>Reg. UE 679/2016 (GDPR)</strong> e del <strong>D.Lgs. 101/2018</strong>, relativo alla protezione delle persone fisiche con riguardo al trattamento dei dati personali, nonché alla libera circolazione di tali dati.
          </p>
        </div>

        {/* Titolare */}
        <div className="bg-white p-6 rounded-xl border border-slate-200/60 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-sai-blue font-extrabold text-sm uppercase">
            <Lock size={18} />
            <span>Titolare del Trattamento</span>
          </div>
          <div className="space-y-2 text-slate-600 text-xs">
            <p><strong>Ragione Sociale:</strong> {azienda?.name || "SALUTE, AMBIENTE, IGIENE s.r.l."}</p>
            <p><strong>Sede Legale:</strong> {azienda?.address_legal || "Via Cesare Sersale 14/16 — Napoli (Italy)"}</p>
            <p><strong>P.IVA:</strong> 09851301219</p>
            <p><strong>Contatti:</strong> Tel: {azienda?.phone || "081 06 08 910"} | Cell: {azienda?.phone_mobile || "+39 393 88 79 849"}</p>
            <p><strong>Email:</strong> {azienda?.email || "saluteambienteigiene@gmail.com"} | <strong>PEC:</strong> {azienda?.pec || "sai.srl@pecaruba.it"}</p>
            <p className="pt-2 text-slate-500">
              Il titolare del trattamento determina le finalità e i mezzi del trattamento dei dati con particolare riguardo all'esercizio dei diritti dell'interessato.
            </p>
          </div>
        </div>

        {/* Finalità */}
        <div className="space-y-4">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Finalità e Base Giuridica del Trattamento</h3>
          <div className="space-y-3">
            <p>
              1. Per la erogazione di tutti i nostri servizi <strong>non è richiesto il suo consenso</strong> quando sussiste una base giuridica ed un legittimo interesse così come previsto dal Reg. UE 679/2016 all'art. 6, comma 1:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-500">
              <li><strong>Lett. B:</strong> Il trattamento è necessario all'esecuzione di un contratto di cui l'interessato è parte o all'esecuzione di misure precontrattuali adottate su richiesta dello stesso.</li>
              <li><strong>Lett. C:</strong> Il trattamento è necessario per adempiere ad un obbligo legale al quale è soggetto il titolare del trattamento.</li>
              <li><strong>Lett. F:</strong> Il trattamento è necessario per il perseguimento del legittimo interesse del titolare, a condizione che non prevalgano gli interessi o i diritti e le libertà fondamentali dell'interessato.</li>
            </ul>
            <p className="text-xs text-red-700 bg-red-50 p-3 rounded-lg border-l-2 border-red-500">
              Ai sensi dell'<strong>Art. 9, comma 1</strong>: è espressamente vietato trattare dati personali che rivelino l'origine razziale o etnica, le opinioni politiche, convinzioni religiose o filosofiche, l'appartenenza sindacale, dati genetici, biometrici o relativi alla salute o orientamento sessuale, tranne in presenza di specifiche deroghe normative.
            </p>
            <p>
              2. I dati forniti dai clienti potranno essere trattati per l'invio di materiale online, comunicazioni commerciali, richiamo appuntamenti tramite SMS, email, posta o contatti telefonici (marketing diretto), ai sensi del <strong>considerando n. 47 del Reg. UE 679/2016</strong> in virtù del legittimo interesse del titolare nel contesto di un rapporto di clientela preesistente.
            </p>
          </div>
        </div>

        {/* Modalità */}
        <div className="space-y-4">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Modalità del Trattamento dei Dati</h3>
          <p>
            I suoi dati personali sono trattati in modo lecito, corretto e trasparente, mediante raccolta cartacea ed elettronica. In conformità con il principio di <strong>minimizzazione dei dati</strong>, le informazioni raccolte sono adeguate, pertinenti e limitate a quanto strettamente necessario.
          </p>
          <p>
            Il titolare adotta adeguate misure tecniche ed organizzative di sicurezza per proteggere i dati da trattamenti illeciti o perdita accidentale, rendicontando tali pratiche all'interno del <strong>Registro delle attività di trattamento (Art. 30 GDPR)</strong> ai fini del principio di <em>Accountability</em>.
          </p>
        </div>

        {/* Destinatari e Conservazione */}
        <div className="space-y-4">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Destinatari, Conservazione e Trasferimento</h3>
          <p>
            <strong>Destinatari:</strong> Per l'esecuzione della prestazione richiesta, i dati personali potranno essere comunicati a consulenti esterni per finalità amministrative, fiscali o inerenti i rapporti di lavoro.
          </p>
          <p>
            <strong>Tempo di Conservazione:</strong> I dati sono conservati per il tempo strettamente necessario a dare corretto adempimento alle obbligazioni contrattuali e civilistiche, in forza dei vigenti termini di legge in ambito civile e sanitario.
          </p>
          <p>
            <strong>Trasferimento Esterno:</strong> I dati personali non saranno in alcun modo oggetto di trasferimento verso paesi extra-UE.
          </p>
        </div>

        {/* Diritti */}
        <div className="space-y-4">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Diritti dell'Interessato</h3>
          <p>
            L'interessato può esercitare in qualsiasi momento i diritti sanciti dal GDPR:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-500">
            <li><strong>Art. 15:</strong> Diritto di accesso ai propri dati personali.</li>
            <li><strong>Art. 16 & 17:</strong> Diritto di rettifica e diritto alla cancellazione ("oblio") ove non contrari a obblighi di legge.</li>
            <li><strong>Art. 18:</strong> Diritto di limitazione del trattamento.</li>
            <li><strong>Art. 20:</strong> Diritto alla portabilità dei dati in un formato strutturato e leggibile da comuni applicazioni.</li>
            <li><strong>Art. 21:</strong> Diritto di opposizione al trattamento.</li>
            <li><strong>Art. 77:</strong> Diritto di proporre reclamo all'Autorità di Controllo: <strong>Garante per la protezione dei dati personali</strong>, Piazza Venezia 11 — Roma (Email: garante@gpdp.it).</li>
          </ul>
        </div>

      </section>

    </div>
  );
}
