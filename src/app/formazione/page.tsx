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
  Heart,
  ChevronRight,
  FlameKindling
} from 'lucide-react';

export default function FormazionePage() {
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
                  <a href="/legionella" className="px-3.5 py-2.5 hover:bg-slate-50 text-xs font-bold text-slate-700 hover:text-sai-blue rounded-lg transition-colors">Controllo Legionella</a>
                  <a href="/#servizi" className="px-3.5 py-2.5 hover:bg-slate-50 text-xs font-bold text-slate-700 hover:text-sai-blue rounded-lg transition-colors">Autoclavi Odontoiatri</a>
                  <a href="/#servizi" className="px-3.5 py-2.5 hover:bg-slate-50 text-xs font-bold text-slate-700 hover:text-sai-blue rounded-lg transition-colors">Analisi Acque & Piscine</a>
                  <a href="/#servizi" className="px-3.5 py-2.5 hover:bg-slate-50 text-xs font-bold text-slate-700 hover:text-sai-blue rounded-lg transition-colors">Misurazione Gas Radon</a>
                  <a href="/#servizi" className="px-3.5 py-2.5 hover:bg-slate-50 text-xs font-bold text-slate-700 hover:text-sai-blue rounded-lg transition-colors">Privacy & GDPR</a>
                  <a href="/formazione" className="px-3.5 py-2.5 hover:bg-slate-50 text-xs font-bold text-sai-blue rounded-lg transition-colors flex items-center justify-between bg-sai-blue/5">
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
                <a href="/sicurezza-sul-lavoro" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 text-sm font-bold text-slate-700 hover:text-sai-blue hover:bg-slate-50 rounded-lg transition-colors">
                  Sicurezza sul Lavoro
                </a>
                <a href="/#servizi" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 text-sm font-bold text-slate-700 hover:text-sai-blue hover:bg-slate-50 rounded-lg transition-colors">Igiene Alimentare (HACCP)</a>
                <a href="/legionella" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 text-sm font-bold text-slate-700 hover:text-sai-blue hover:bg-slate-50 rounded-lg transition-colors">Controllo Legionella</a>
                <a href="/#servizi" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 text-sm font-bold text-slate-700 hover:text-sai-blue hover:bg-slate-50 rounded-lg transition-colors">Autoclavi Odontoiatri</a>
                <a href="/#servizi" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 text-sm font-bold text-slate-700 hover:text-sai-blue hover:bg-slate-50 rounded-lg transition-colors">Analisi Acque & Piscine</a>
                <a href="/#servizi" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 text-sm font-bold text-slate-700 hover:text-sai-blue hover:bg-slate-50 rounded-lg transition-colors">Privacy & GDPR</a>
                <a href="/formazione" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 text-sm font-bold text-sai-blue bg-sai-blue/5 rounded-lg transition-colors flex items-center justify-between">
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
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/95 to-slate-950 z-0" />
        
        {/* Sfondo tematico sulla formazione d'aula/sicurezza */}
        <div className="absolute inset-0 opacity-15 z-0 bg-[url('https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070')] bg-cover bg-center" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-6">
          <span className="text-xs font-black tracking-widest text-sai-green-light uppercase bg-sai-green/10 border border-sai-green-light/20 px-3.5 py-1.5 rounded-full inline-block">
            Approfondimento a cura di A.Novissimo
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
            Formazione Generale e Specifica
          </h1>
          <p className="text-slate-300 text-lg max-w-3xl leading-relaxed mx-auto">
            Corsi di abilitazione obbligatori in aula ed online ai sensi dell'Art. 37 del D.Lgs. 81/08 e del Regolamento UE 852/2004 per alimentaristi.
          </p>
        </div>
        
        {/* Margine al lato inferiore della slide di colore verde */}
        <div className="absolute bottom-0 left-0 w-full h-[6px] bg-sai-green z-25" />
      </header>

      {/* INTRODUZIONE AL RISCHIO E DANNO */}
      <section className="py-20 max-w-5xl mx-auto px-6 space-y-8">
        <div className="bg-white border border-slate-100 p-8 rounded-2xl shadow-xl space-y-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-sai-blue" />
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase">
            Il Concetto di Rischio, Danno e Prevenzione
          </h2>
          <span className="text-xs font-black tracking-wider text-sai-blue uppercase block mt-1">
            Art. 37, D.Lgs.vo 81/08 e s.m.i.
          </span>
          <div className="text-slate-600 space-y-4 leading-relaxed text-sm sm:text-base">
            <p>
              Il <strong>rischio</strong> è la probabilità che un danno sia causato nelle condizioni di impiego o di esposizione a un evento o agente. L'analisi dei rischi si basa su due elementi chiave:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl font-bold text-slate-800 text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-sai-green shrink-0" />
                1. Probabilità di accadimento di un evento
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-sai-green shrink-0" />
                2. Livello di potenziale danno derivante
              </div>
            </div>
            <p>
              Il rischio si origina dalla presenza di un pericolo concreto e dalla sua probabilità di raggiungere la capacità di produrre lesioni alle persone o cose. Il <strong>danno</strong> è definito come una perdita o lesione fisica rapportata alla sua gravità, classificato come <em>gravissimo</em> (pericolo di vita), <em>grave</em> (malattia seria), <em>lieve</em> (prognosi superiore a 1 giorno) e <em>trascurabile</em>.
            </p>
            <p>
              Il D.Lgs.vo 81/08 definisce la <strong>prevenzione sul lavoro</strong> quale complesso di disposizioni o misure necessarie per evitare o ridurre i rischi aziendali a garanzia della salute e integrità fisica dei lavoratori. La <strong>protezione</strong>, invece, riguarda le misure collettive o individuali (DPI) per tutelare i lavoratori dai rischi residui.
            </p>
          </div>
        </div>
      </section>

      {/* ELENCO DEI RISCHI */}
      <section className="py-16 bg-slate-100">
        <div className="max-w-5xl mx-auto px-6 space-y-8">
          <div className="text-center space-y-2">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 uppercase">La Classificazione dei Rischi Lavorativi</h3>
            <p className="text-slate-500 text-xs sm:text-sm max-w-xl mx-auto">
              La formazione specifica dei lavoratori deve coprire tutte le classi di rischio presenti all'interno dell'ambiente aziendale.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-xs sm:text-sm">
            {[
              {
                title: "Rischio Biologico",
                desc: "Qualsiasi microrganismo, anche se geneticamente modificato, coltura cellulare ed endoparassita umano che potrebbe provocare infezioni, allergie o intossicazioni."
              },
              {
                title: "Rischio Chimico",
                desc: "Uso di sostanze o preparati chimici impiegati nelle attività lavorative che possono essere pericolosi in relazione alle loro condizioni di impiego."
              },
              {
                title: "Rischio Fisico",
                desc: "Agenti fisici generati da attrezzature e impianti: rumore, vibrazioni meccaniche, campi elettromagnetici, radiazioni ottiche, ionizzanti e ultrasuoni."
              },
              {
                title: "Rischio Incendio",
                desc: "Luoghi di lavoro o lavorazioni in cui la presenza di sostanze infiammabili ed ossigeno può favorire lo sviluppo e propagazione di incendi."
              },
              {
                title: "Rischio Ergonomico",
                desc: "Attività connesse al posizionamento inadeguato delle attrezzature che obbligano i lavoratori ad assumere posture inadeguate o movimenti ripetitivi."
              },
              {
                title: "Rischio Psicologico & Stress",
                desc: "Irritabilità, calo di motivazione, riduzione dell'autostima e affaticamento dovuti allo stress lavoro-correlato e organizzazione dei turni."
              }
            ].map((rsk, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-2.5">
                <span className="text-[10px] font-black tracking-widest text-sai-green uppercase bg-sai-green/5 border border-sai-green/10 px-2 py-0.5 rounded-full inline-block">Classe {idx + 1}</span>
                <h4 className="font-extrabold text-slate-900">{rsk.title}</h4>
                <p className="text-slate-500 leading-relaxed text-xs">{rsk.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-white border border-slate-200 p-4 rounded-xl text-center text-xs font-bold text-slate-700">
            📌 <strong>Rischi Trasversali:</strong> turni eccessivi, lavoro notturno, difficoltà d'uso delle attrezzature o lavori speciali (con animali o in acqua).
          </div>
        </div>
      </section>

      {/* MISURE GENERALI DI TUTELA */}
      <section className="py-20 max-w-5xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5 space-y-6">
          <div className="w-12 h-12 rounded-xl bg-sai-green/10 flex items-center justify-center text-sai-green">
            <Shield size={24} />
          </div>
          <h3 className="text-2xl font-black text-slate-900 uppercase">Organizzazione della Prevenzione</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Le misure generali di tutela dei lavoratori nei luoghi di lavoro previste dal decreto legislativo integrano prevenzione tecnica, ergonomia ed igiene delle mansioni:
          </p>
          <div className="space-y-3.5 text-xs text-slate-700">
            <div className="flex items-start gap-2.5">
              <CheckCircle size={16} className="text-sai-green shrink-0 mt-0.5" />
              <span>Valutazione scientifica di tutti i rischi aziendali</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle size={16} className="text-sai-green shrink-0 mt-0.5" />
              <span>Eliminazione o riduzione al minimo dei rischi alla fonte</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle size={16} className="text-sai-green shrink-0 mt-0.5" />
              <span>Rispetto dei principi ergonomici d'ufficio e cantiere</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle size={16} className="text-sai-green shrink-0 mt-0.5" />
              <span>Priorità alla protezione collettiva rispetto alla individuale</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4">
          <h4 className="font-extrabold text-slate-900 text-sm uppercase text-sai-blue flex items-center gap-2">
            <Award size={18} />
            Misure relative alla sicurezza e all'igiene
          </h4>
          <p className="text-slate-600 text-xs leading-relaxed">
            L'informazione e formazione adeguate devono essere costantemente garantite sia per i lavoratori, sia per i preposti, dirigenti ed i Rappresentanti dei Lavoratori per la Sicurezza (RLS).
          </p>
          <div className="text-xs text-red-600 font-bold bg-red-50 p-4 rounded-xl border-l-4 border-red-500">
            ⚠️ "Le misure relative alla sicurezza, all'igiene ed alla salute durante il lavoro non devono in nessun caso comportare oneri finanziari per i lavoratori." (Art. 18 D.Lgs. 81/08)
          </div>
        </div>
      </section>

      {/* DOVERI DATORE E LAVORATORE */}
      <section className="py-16 bg-slate-900 text-white relative">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Datore di lavoro */}
          <div className="space-y-4">
            <h4 className="font-black text-lg text-sai-green-light uppercase tracking-wider">Doveri del Datore di Lavoro</h4>
            <p className="text-xs text-slate-400">Il Datore di lavoro ed il dirigente, in base alle attribuzioni ed incarichi, devono adempiere a:</p>
            <div className="grid grid-cols-1 gap-2.5 text-xs text-slate-300">
              {[
                "Nominare il Medico Competente per la sorveglianza sanitaria",
                "Designare preventivamente gli addetti antincendio e primo soccorso",
                "Fornire ai lavoratori i necessari e idonei DPI certificati",
                "Limitare l'accesso alle aree a rischio solo a personale formato",
                "Richiedere e vigilare sull'osservanza delle norme interne",
                "Elaborare il DUVRI in caso di appalti e subappalti esterni",
                "Adempiere integralmente agli obblighi di informazione e formazione"
              ].map((dt, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="text-sai-green shrink-0 mt-0.5">•</span>
                  <span>{dt}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Lavoratore */}
          <div className="space-y-4">
            <h4 className="font-black text-lg text-sai-green-light uppercase tracking-wider">Doveri del Lavoratore</h4>
            <p className="text-xs text-slate-400">Ogni lavoratore deve prendersi cura della propria salute ed integrità, attenendosi a:</p>
            <div className="grid grid-cols-1 gap-2.5 text-xs text-slate-300">
              {[
                "Diligenza richiesta dalla natura delle prestazioni da svolgere",
                "Osservare le direttive impartite dal Datore di Lavoro e dai superiori",
                "Utilizzare correttamente attrezzature, macchinari e sostanze pericolose",
                "Utilizzare in modo appropriato i DPI messi a disposizione",
                "Segnalare immediatamente deficienze dei dispositivi o pericoli rilevati",
                "Partecipare obbligatoriamente ai programmi di formazione e addestramento",
                "Sottoporsi ai controlli sanitari periodici disposti dal medico competente"
              ].map((lw, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="text-sai-green shrink-0 mt-0.5">•</span>
                  <span>{lw}</span>
                </div>
              ))}
            </div>
            <div className="p-3 bg-white/5 rounded-lg border border-white/10 text-[10px] text-slate-400">
              🔒 <strong>Obbligo di Fedeltà:</strong> il dipendente non può trattare affari in concorrenza con il datore di lavoro né divulgare notizie aziendali che arrechino danno.
            </div>
          </div>

        </div>
      </section>

      {/* RISCHI INFORMATICI, ELETTRICI E MACCHINARI */}
      <section className="py-20 max-w-5xl mx-auto px-6 space-y-12">
        <div className="text-center space-y-2">
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase">La Formazione Specifica per Attrezzature</h3>
          <p className="text-slate-600 text-sm">
            Focus operativo sui rischi legati a macchinari, elettricità, lavori in quota e movimentazione carichi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
          
          <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm space-y-2.5">
            <span className="font-black text-sai-blue uppercase block border-b pb-1">⚡ Rischio Elettrico</span>
            <p className="text-slate-500">
              Contatto diretto o indiretto con elementi in tensione. I lavori elettrici devono essere svolti solo da figure esperte (<strong>PES</strong>), avvertite (<strong>PAV</strong>) o addestrate (<strong>PEC</strong>).
            </p>
          </div>

          <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm space-y-2.5">
            <span className="font-black text-sai-blue uppercase block border-b pb-1">🏗️ Lavori in Quota</span>
            <p className="text-slate-500">
              Qualsiasi attività lavorativa che espone il lavoratore al rischio di caduta da una quota posta ad un'altezza superiore a <strong>2 metri</strong> rispetto ad un piano stabile.
            </p>
          </div>

          <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm space-y-2.5">
            <span className="font-black text-sai-blue uppercase block border-b pb-1">⚙️ Macchine e Scelte</span>
            <p className="text-slate-500">
              L'attrezzatura deve essere installata ed utilizzata seguendo le istruzioni, con tenuta del registro di controllo e manutenzione periodica per conservare i requisiti di sicurezza.
            </p>
          </div>

          <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm space-y-2.5">
            <span className="font-black text-sai-blue uppercase block border-b pb-1">📦 Movimentazione Carichi</span>
            <p className="text-slate-500">
              Operazioni di trasporto o sostegno di un carico ad opera di uno o più lavoratori (sollevare, deporre, spingere, tirare) con rischio di sovraccarico biomeccanico dorso-lombare.
            </p>
          </div>

        </div>

        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600">
          <div>
            <strong>Microclima Confined:</strong> definito dai parametri fisici di temperatura, umidità relativa e velocità dell'aria negli uffici.
          </div>
          <div>
            <strong>Illuminazione:</strong> i posti di lavoro in cui risiedono i lavoratori devono prediligere e favorire la luce naturale.
          </div>
          <div>
            <strong>Apparecchi Sollevamento:</strong> quelli con portata &gt; 200 kg sono soggetti a verifica periodica annuale con limitatori e indicatori visivi.
          </div>
        </div>
      </section>

      {/* PRIMO SOCCORSO E SORVEGLIANZA SANITARIA */}
      <section className="py-20 bg-slate-100">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          
          <div className="md:col-span-7 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500">
                <Heart size={22} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 uppercase">Primo Soccorso Aziendale</h3>
            </div>
            
            <p className="text-slate-600 text-sm leading-relaxed">
              Il primo soccorso è l'insieme di interventi e manovre attuate da chiunque si trovi ad affrontare un'emergenza sanitaria, in attesa dell'arrivo del personale medico avanzato 118.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              Il Datore di lavoro deve formare gli addetti designati e assicurarsi che la <strong>cassetta di primo soccorso</strong> sia custodita in un luogo accessibile con segnaletica adeguata, contenente guanti sterili monouso, visiera paraschizzi, flaconi di soluzione fisiologica, iodopovidone al 10%, garze, cotone idrofilo, cerotti, forbici e misuratore di pressione.
            </p>
          </div>

          <div className="md:col-span-5 bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
            <h5 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
              <FileCheck size={18} className="text-sai-blue" />
              Sorveglianza Sanitaria (Art. 41):
            </h5>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>🏥 <strong>Visita Preventiva:</strong> constata l'idoneità alla mansione prima dell'inserimento lavorativo.</li>
              <li>📅 <strong>Visita Periodica:</strong> monitora lo stato di salute dei lavoratori nel tempo.</li>
              <li>🤒 <strong>Su Richiesta:</strong> se ritenuta correlata ai rischi o al peggioramento delle condizioni.</li>
              <li>🔄 <strong>Altre visite:</strong> cambio mansione, cessazione rapporto, e ripresa dopo assenza &gt; 60 giorni continuativi.</li>
            </ul>
          </div>

        </div>
      </section>

      {/* ORGANI DI VIGILANZA E CONTROLLO */}
      <section className="py-20 max-w-4xl mx-auto px-6 text-center space-y-6">
        <h3 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase">Chi Controlla la tua Azienda?</h3>
        <p className="text-slate-600 text-sm leading-relaxed">
          La corretta applicazione delle norme a tutela della salute e sicurezza nei luoghi di lavoro viene verificata dagli Organi di Vigilanza preposti dallo Stato:
        </p>
        <div className="flex flex-wrap justify-center gap-3 text-xs font-bold text-slate-800">
          <span className="bg-white border px-4 py-2.5 rounded-xl shadow-sm">🏥 ASL (Azienda Sanitaria Locale)</span>
          <span className="bg-white border px-4 py-2.5 rounded-xl shadow-sm">🚒 Vigili del Fuoco</span>
          <span className="bg-white border px-4 py-2.5 rounded-xl shadow-sm">💼 Ispettorato Nazionale del Lavoro (INL)</span>
          <span className="bg-white border px-4 py-2.5 rounded-xl shadow-sm">💼 INAIL</span>
          <span className="bg-white border px-4 py-2.5 rounded-xl shadow-sm">🚔 Carabinieri dei NAS / T.P.L.</span>
        </div>
      </section>

      {/* BANNER CONTATTI SOPRA FOOTER */}
      <section className="bg-sai-green text-white py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="text-xl sm:text-2xl font-black">Organizza la formazione aziendale obbligatoria</h4>
            <p className="text-white/80 text-sm">Corsi in aula, online e consulenze per l'elaborazione dei piani formativi ed attestati abilitativi.</p>
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
              <a href="/#servizi" className="hover:text-white transition-colors">Igiene HACCP</a>
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
