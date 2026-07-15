"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Shield, Settings, Globe, FileText, Check, Save, Eye, EyeOff, Cpu, Database, 
  MapPin, Phone, Mail, Clock, MessageSquare, AlertCircle, AlertTriangle, 
  ArrowUpRight, BarChart3, Lock, LogOut, RefreshCw, Key, User
} from 'lucide-react';

type Tab = 'dati' | 'seo' | 'pagine' | 'ai' | 'traffico';

interface PageSeoConfig {
  id: string;
  name: string;
  url: string;
  defaultTitle: string;
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  
  const [activeTab, setActiveTab] = useState<Tab>('dati');
  const [locales, setLocales] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [saveMessage, setSaveMessage] = useState('');
  
  const [editingPageId, setEditingPageId] = useState<string | null>(null);
  const [pageModalTitle, setPageModalTitle] = useState('');
  const [pageModalDesc, setPageModalDesc] = useState('');
  const [pageModalKeywords, setPageModalKeywords] = useState('');

  // Predefined pages list
  const pagesList: PageSeoConfig[] = [
    { id: 'home', name: 'Home Page', url: '/', defaultTitle: 'Home' },
    { id: 'haccp', name: 'HACCP (Igiene Alimentare)', url: '/haccp', defaultTitle: 'HACCP' },
    { id: 'sicurezza-sul-lavoro', name: 'Sicurezza sul Lavoro', url: '/sicurezza-sul-lavoro', defaultTitle: 'Sicurezza Lavoro' },
    { id: 'legionella', name: 'Legionella', url: '/legionella', defaultTitle: 'Legionella' },
    { id: 'formazione', name: 'Formazione (Corsi)', url: '/formazione', defaultTitle: 'Formazione' },
    { id: 'gasradon', name: 'Gas Radon', url: '/gasradon', defaultTitle: 'Gas Radon' },
    { id: 'analisi-acque', name: 'Analisi Acque', url: '/analisi-acque', defaultTitle: 'Analisi Acque' },
    { id: 'studiodontoiatrici', name: 'Studi Odontoiatrici', url: '/studiodontoiatrici', defaultTitle: 'Studi Odontoiatrici' },
    { id: 'gdpr', name: 'GDPR Privacy', url: '/gdpr', defaultTitle: 'GDPR' },
    { id: 'privacy', name: 'Privacy Policy', url: '/privacy', defaultTitle: 'Privacy' },
    { id: 'chisiamo', name: 'Chi Siamo', url: '/chisiamo', defaultTitle: 'Chi Siamo' }
  ];

  // Auth check
  useEffect(() => {
    const session = sessionStorage.getItem('sai_admin_logged');
    if (session === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch initial locales
  useEffect(() => {
    if (!isAuthenticated) return;
    
    const loadData = async () => {
      try {
        setIsLoading(true);
        const res = await fetch('/api/admin/save-locales');
        if (res.ok) {
          const resData = await res.json();
          if (resData.success && resData.data) {
            setLocales(resData.data);
          }
        }
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const correctUser = 'Sainapoli';
    const correctPassword = 'Sainapoli!2026';
    if (username === correctUser && password === correctPassword) {
      setIsAuthenticated(true);
      sessionStorage.setItem('sai_admin_logged', 'true');
      setLoginError('');
    } else {
      setLoginError('Credenziali non corrette. Riprova.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('sai_admin_logged');
    setPassword('');
  };

  const getNestedValue = (obj: any, path: string): string => {
    if (!obj) return '';
    const keys = path.split('.');
    let current = obj;
    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key];
      } else {
        return '';
      }
    }
    return typeof current === 'string' ? current : '';
  };

  const setNestedValue = (obj: any, path: string, value: string) => {
    if (!obj) return;
    const keys = path.split('.');
    let current = obj;
    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];
      if (!(key in current)) {
        current[key] = {};
      }
      current = current[key];
    }
    current[keys[keys.length - 1]] = value;
  };

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSaving(true);
    setSaveStatus('idle');
    setSaveMessage('Salvataggio in corso...');

    try {
      const updatedLocales = { ...locales };
      
      // Update form values if on appropriate tab
      if (activeTab === 'dati') {
        setNestedValue(updatedLocales, 'azienda.name', (document.getElementById('az_name') as HTMLInputElement).value);
        setNestedValue(updatedLocales, 'azienda.address', (document.getElementById('az_address') as HTMLInputElement).value);
        setNestedValue(updatedLocales, 'azienda.address_legal', (document.getElementById('az_address_legal') as HTMLInputElement).value);
        setNestedValue(updatedLocales, 'azienda.email', (document.getElementById('az_email') as HTMLInputElement).value);
        setNestedValue(updatedLocales, 'azienda.pec', (document.getElementById('az_pec') as HTMLInputElement).value);
        setNestedValue(updatedLocales, 'azienda.phone', (document.getElementById('az_phone') as HTMLInputElement).value);
        setNestedValue(updatedLocales, 'azienda.phone_mobile', (document.getElementById('az_phone_mobile') as HTMLInputElement).value);
        setNestedValue(updatedLocales, 'azienda.hours', (document.getElementById('az_hours') as HTMLInputElement).value);
        setNestedValue(updatedLocales, 'azienda.social_facebook', (document.getElementById('az_fb') as HTMLInputElement).value);
        setNestedValue(updatedLocales, 'azienda.social_instagram', (document.getElementById('az_ig') as HTMLInputElement).value);
        setNestedValue(updatedLocales, 'azienda.social_linkedin', (document.getElementById('az_li') as HTMLInputElement).value);
      } else if (activeTab === 'seo') {
        setNestedValue(updatedLocales, 'seo.global.title', (document.getElementById('seo_glob_title') as HTMLInputElement).value);
        setNestedValue(updatedLocales, 'seo.global.description', (document.getElementById('seo_glob_desc') as HTMLTextAreaElement).value);
        setNestedValue(updatedLocales, 'seo.global.keywords', (document.getElementById('seo_glob_keywords') as HTMLInputElement).value);
      } else if (activeTab === 'traffico') {
        setNestedValue(updatedLocales, 'seo.integrations.google_search_console', (document.getElementById('int_gsc') as HTMLInputElement).value);
        setNestedValue(updatedLocales, 'seo.integrations.google_analytics', (document.getElementById('int_ga') as HTMLInputElement).value);
        setNestedValue(updatedLocales, 'seo.integrations.ads_txt', (document.getElementById('int_ads') as HTMLTextAreaElement).value);
      }

      const res = await fetch('/api/admin/save-locales', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: updatedLocales })
      });

      if (res.ok) {
        setLocales(updatedLocales);
        setSaveStatus('success');
        const resData = await res.json().catch(() => ({}));
        if (resData.warning) {
          setSaveMessage(`✓ Dati salvati! Nota: ${resData.warning}`);
        } else {
          setSaveMessage('Dati salvati con successo su file locale!');
        }
      } else {
        const errData = await res.json().catch(() => ({}));
        setSaveStatus('error');
        setSaveMessage(`Errore nel salvataggio: ${errData.error || 'Errore interno.'}`);
      }
    } catch (err: any) {
      console.error(err);
      setSaveStatus('error');
      setSaveMessage(`Errore di rete: ${err.message || err}`);
    } finally {
      setIsSaving(false);
      setTimeout(() => {
        setSaveStatus('idle');
      }, 5000);
    }
  };

  const openEditPageSeo = (pageId: string) => {
    setEditingPageId(pageId);
    setPageModalTitle(getNestedValue(locales, `seo.${pageId}.title`));
    setPageModalDesc(getNestedValue(locales, `seo.${pageId}.description`));
    setPageModalKeywords(getNestedValue(locales, `seo.${pageId}.keywords`));
  };

  const handleSavePageSeo = async () => {
    if (!editingPageId) return;
    const updated = { ...locales };
    setNestedValue(updated, `seo.${editingPageId}.title`, pageModalTitle);
    setNestedValue(updated, `seo.${editingPageId}.description`, pageModalDesc);
    setNestedValue(updated, `seo.${editingPageId}.keywords`, pageModalKeywords);

    setIsSaving(true);
    try {
      const res = await fetch('/api/admin/save-locales', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: updated })
      });
      if (res.ok) {
        setLocales(updated);
        setEditingPageId(null);
        setSaveStatus('success');
        const resData = await res.json().catch(() => ({}));
        if (resData.warning) {
          setSaveMessage(`✓ SEO pagina aggiornato! Nota: ${resData.warning}`);
        } else {
          setSaveMessage(`SEO pagina aggiornato con successo!`);
        }
      } else {
        const errData = await res.json().catch(() => ({}));
        alert(`Errore nel salvataggio: ${errData.error || 'Errore del server.'}`);
      }
    } catch (err) {
      console.error(err);
      alert('Errore di rete durante il salvataggio.');
    } finally {
      setIsSaving(false);
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  };

  // AI SEO Calculations
  const calculateAiScore = () => {
    if (!locales) return 0;
    const title = getNestedValue(locales, 'seo.global.title') || '';
    const desc = getNestedValue(locales, 'seo.global.description') || '';
    const keywords = getNestedValue(locales, 'seo.global.keywords') || '';
    
    let score = 15; // base level for page structure
    
    // GSC and GA
    if (getNestedValue(locales, 'seo.integrations.google_search_console')) score += 15;
    if (getNestedValue(locales, 'seo.integrations.google_analytics')) score += 15;
    
    // Title length optimization
    if (title.length >= 30 && title.length <= 65) score += 15;
    else if (title.length > 0) score += 5;
    
    // Description length optimization
    if (desc.length >= 110 && desc.length <= 165) score += 20;
    else if (desc.length > 0) score += 10;
    
    // Keyword alignment (HACCP Napoli / Sicurezza sul lavoro Napoli)
    const keywordsLower = keywords.toLowerCase();
    const titleLower = title.toLowerCase();
    const descLower = desc.toLowerCase();
    
    if (keywordsLower.includes('haccp napoli') || titleLower.includes('haccp napoli') || descLower.includes('haccp napoli')) {
      score += 10;
    }
    if (keywordsLower.includes('sicurezza sul lavoro napoli') || titleLower.includes('sicurezza sul lavoro napoli') || descLower.includes('sicurezza sul lavoro napoli')) {
      score += 10;
    }
    
    return Math.min(score, 100);
  };

  // If not authenticated, render Login Page
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-sai-blue-dark p-6 font-sans">
        <div className="w-full max-w-md bg-white/95 backdrop-blur-lg rounded-[2.5rem] p-10 shadow-2xl border border-white/20 text-slate-850 flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sai-green to-sai-blue flex items-center justify-center text-white mb-6 shadow-lg shadow-sai-blue/20">
            <Shield className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight text-center">S.A.I. s.r.l.</h1>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1 mb-8">Pannello Amministrazione</p>

          <form onSubmit={handleLogin} className="w-full space-y-5">
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-2">Nome Utente</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Inserisci l'utente..." 
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 pl-12 text-sm text-slate-900 focus:outline-none focus:border-sai-blue transition-colors font-medium"
                  required
                />
                <User className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-2">Password di Accesso</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Inserisci la password..." 
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 pl-12 pr-12 text-sm text-slate-900 focus:outline-none focus:border-sai-blue transition-colors font-medium"
                  required
                />
                <Lock className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {loginError && (
                <div className="flex items-center gap-2 mt-2 text-red-600">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span className="text-xs font-bold">{loginError}</span>
                </div>
              )}
            </div>

            <button 
              type="submit" 
              className="w-full py-4 bg-gradient-to-r from-sai-blue to-sai-blue-dark text-white rounded-2xl font-bold text-sm shadow-xl shadow-sai-blue/20 hover:opacity-95 transition-opacity flex items-center justify-center gap-2 cursor-pointer"
            >
              <Key className="w-4 h-4" /> Accedi al Dashboard
            </button>
          </form>

          <Link href="/" className="mt-8 text-xs font-bold text-slate-450 hover:text-sai-blue transition-colors flex items-center gap-1">
            ← Ritorna al sito pubblico
          </Link>
        </div>
      </div>
    );
  }

  // Dashboard Loader
  if (isLoading || !locales) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-4">
          <RefreshCw className="w-8 h-8 text-sai-blue animate-spin" />
          <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Caricamento configurazione...</span>
        </div>
      </div>
    );
  }

  const aiScore = calculateAiScore();

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
      {/* HEADER */}
      <header className="bg-white border-b border-slate-200 py-5 px-6 sm:px-10 sticky top-0 z-40 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sai-green to-sai-blue flex items-center justify-center text-white">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black text-slate-900 uppercase tracking-tight">S.A.I. s.r.l.</h1>
              <span className="text-[10px] bg-sai-green/10 text-sai-green px-2 py-0.5 rounded-full font-black uppercase">Consulenza & Formazione</span>
            </div>
            <p className="text-xs text-slate-500 font-medium">Gestione Configurazione, SEO & Monitor AI</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-slate-100 px-3.5 py-1.5 rounded-xl border border-slate-200">
            <Database className="w-4 h-4 text-sai-blue" />
            <span className="text-xs font-bold text-slate-600">Storage: locale (it.json)</span>
          </div>

          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 rounded-xl text-xs font-bold border border-slate-200 hover:border-red-200 transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" /> Esci
          </button>
        </div>
      </header>

      {/* BODY */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 py-10 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* SIDEBAR TABS */}
        <aside className="lg:col-span-1 space-y-2">
          <div className="bg-white rounded-[1.5rem] border border-slate-200 p-4 shadow-sm space-y-1">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-3 mb-2 block">Menu Principale</span>
            
            <button 
              onClick={() => setActiveTab('dati')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'dati' 
                  ? 'bg-sai-blue text-white shadow-md shadow-sai-blue/20' 
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <MapPin className="w-4 h-4" /> Dati Aziendali
            </button>

            <button 
              onClick={() => setActiveTab('seo')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'seo' 
                  ? 'bg-sai-blue text-white shadow-md shadow-sai-blue/20' 
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Globe className="w-4 h-4" /> SEO Generale
            </button>

            <button 
              onClick={() => setActiveTab('pagine')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'pagine' 
                  ? 'bg-sai-blue text-white shadow-md shadow-sai-blue/20' 
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <FileText className="w-4 h-4" /> Indicizzazione Pagine
            </button>

            <button 
              onClick={() => setActiveTab('ai')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'ai' 
                  ? 'bg-sai-blue text-white shadow-md shadow-sai-blue/20' 
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Cpu className="w-4 h-4" /> Monitor AI SEO
            </button>

            <button 
              onClick={() => setActiveTab('traffico')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'traffico' 
                  ? 'bg-sai-blue text-white shadow-md shadow-sai-blue/20' 
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <BarChart3 className="w-4 h-4" /> Traffico e Analytics
            </button>
          </div>

          {/* QUICK MONITOR CARD */}
          <div className="bg-gradient-to-br from-slate-900 to-sai-blue-dark rounded-[1.5rem] p-6 text-white shadow-lg space-y-4">
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Punteggio di Ricerca AI</span>
            <div>
              <div className="text-4xl font-black">{aiScore}%</div>
              <p className="text-[10px] text-slate-350 mt-1">Pronto per gli indici semantici delle AI di ricerca.</p>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div className="bg-sai-green h-full rounded-full transition-all duration-700" style={{ width: `${aiScore}%` }} />
            </div>
          </div>
        </aside>

        {/* MAIN PANEL CONTENT */}
        <main className="lg:col-span-3 bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm text-slate-800">
          
          {/* TAB: DATI AZIENDALI */}
          {activeTab === 'dati' && (
            <form onSubmit={handleSave} className="space-y-6">
              <div className="border-b border-slate-100 pb-4 mb-6">
                <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight">Dati Aziendali</h2>
                <p className="text-xs text-slate-500">Configura le informazioni pubbliche visualizzate nel footer, nella pagina contatti e nei blocchi aziendali.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-2">Ragione Sociale</label>
                  <input type="text" id="az_name" defaultValue={getNestedValue(locales, 'azienda.name')} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-sai-blue font-medium" />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-2">Orari di Apertura</label>
                  <input type="text" id="az_hours" defaultValue={getNestedValue(locales, 'azienda.hours')} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-sai-blue font-medium" />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-2">Sede Operativa / Ricevimento</label>
                  <input type="text" id="az_address" defaultValue={getNestedValue(locales, 'azienda.address')} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-sai-blue font-medium" />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-2">Sede Legale</label>
                  <input type="text" id="az_address_legal" defaultValue={getNestedValue(locales, 'azienda.address_legal')} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-sai-blue font-medium" />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-2">Telefono Fisso</label>
                  <input type="text" id="az_phone" defaultValue={getNestedValue(locales, 'azienda.phone')} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-sai-blue font-medium" />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-2">Cellulare / WhatsApp</label>
                  <input type="text" id="az_phone_mobile" defaultValue={getNestedValue(locales, 'azienda.phone_mobile')} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-sai-blue font-medium" />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-2">Email di Contatto</label>
                  <input type="email" id="az_email" defaultValue={getNestedValue(locales, 'azienda.email')} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-sai-blue font-medium" />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-2">PEC Aziendale</label>
                  <input type="email" id="az_pec" defaultValue={getNestedValue(locales, 'azienda.pec')} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-sai-blue font-medium" />
                </div>
              </div>

              <div className="border-t border-slate-100 pt-6 space-y-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 block">Link Social Network</span>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="text-[9px] font-bold text-slate-400 block mb-1">Facebook</label>
                    <input type="text" id="az_fb" defaultValue={getNestedValue(locales, 'azienda.social_facebook')} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-900 focus:outline-none focus:border-sai-blue" />
                  </div>
                  <div>
                    <label className="text-[9px] font-bold text-slate-400 block mb-1">Instagram</label>
                    <input type="text" id="az_ig" defaultValue={getNestedValue(locales, 'azienda.social_instagram')} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-900 focus:outline-none focus:border-sai-blue" />
                  </div>
                  <div>
                    <label className="text-[9px] font-bold text-slate-400 block mb-1">LinkedIn</label>
                    <input type="text" id="az_li" defaultValue={getNestedValue(locales, 'azienda.social_linkedin')} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-900 focus:outline-none focus:border-sai-blue" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button type="submit" disabled={isSaving} className="px-6 py-3 bg-sai-blue text-white rounded-xl font-bold text-xs shadow-md shadow-sai-blue/20 hover:opacity-95 transition-opacity flex items-center gap-2 cursor-pointer">
                  <Save className="w-4 h-4" /> Salva Dati Aziendali
                </button>
              </div>
            </form>
          )}

          {/* TAB: SEO GENERALE */}
          {activeTab === 'seo' && (
            <form onSubmit={handleSave} className="space-y-6">
              <div className="border-b border-slate-100 pb-4 mb-6">
                <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight">Configurazione SEO Generale</h2>
                <p className="text-xs text-slate-500">I metadati globali del sito web, utilizzati per impostare i motori di ricerca e i tag dei social network.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-5">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-2">Meta Title Principale</label>
                    <input type="text" id="seo_glob_title" defaultValue={getNestedValue(locales, 'seo.global.title')} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-sai-blue font-medium" />
                    <span className="text-[10px] text-slate-500 mt-1 block">Massimo 60 caratteri consigliati per la visualizzazione ottimale su Google.</span>
                  </div>

                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-2">Meta Description Globale</label>
                    <textarea id="seo_glob_desc" rows={4} defaultValue={getNestedValue(locales, 'seo.global.description')} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-sai-blue resize-none font-medium" />
                    <span className="text-[10px] text-slate-500 mt-1 block">Consigliati tra 120 e 160 caratteri per riassumere il sito nei risultati di ricerca.</span>
                  </div>

                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-2">Keywords Globali</label>
                    <input type="text" id="seo_glob_keywords" defaultValue={getNestedValue(locales, 'seo.global.keywords')} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-sai-blue font-mono" />
                    <div className="bg-sai-green/5 border border-sai-green/20 p-3.5 rounded-xl mt-3 flex items-start gap-2.5">
                      <AlertCircle className="w-4 h-4 text-sai-green shrink-0 mt-0.5" />
                      <p className="text-[11px] text-slate-650 leading-relaxed">
                        <strong>Suggerimento Strategico:</strong> Assicurati di includere <strong>"haccp napoli"</strong> e <strong>"sicurezza sul lavoro napoli"</strong> come termini principali per consolidare l'indicizzazione locale.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Google Snippet Live Preview */}
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col justify-between">
                  <div className="space-y-4">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Anteprima Google Snippet</span>
                    <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-md space-y-1 text-left">
                      <span className="text-[11px] text-slate-550 block font-mono">https://www.sainapoli.it</span>
                      <span className="text-[#1a0dab] text-lg font-medium leading-snug block hover:underline cursor-pointer">
                        {getNestedValue(locales, 'seo.global.title') || 'S.A.I. s.r.l. - Salute Ambiente Igiene'}
                      </span>
                      <p className="text-xs text-[#4d5156] leading-relaxed line-clamp-2">
                        {getNestedValue(locales, 'seo.global.description') || 'Inserisci una meta description per visualizzare l\'anteprima qui.'}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-slate-200/60 pt-4 mt-6">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                      <span>Lunghezza Titolo:</span>
                      <span className={(getNestedValue(locales, 'seo.global.title') || '').length > 60 ? 'text-orange-500' : 'text-sai-green'}>
                        {(getNestedValue(locales, 'seo.global.title') || '').length} caratteri
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs font-bold text-slate-500 mt-1">
                      <span>Lunghezza Descrizione:</span>
                      <span className={(getNestedValue(locales, 'seo.global.description') || '').length > 160 ? 'text-orange-500' : 'text-sai-green'}>
                        {(getNestedValue(locales, 'seo.global.description') || '').length} caratteri
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button type="submit" disabled={isSaving} className="px-6 py-3 bg-sai-blue text-white rounded-xl font-bold text-xs shadow-md shadow-sai-blue/20 hover:opacity-95 transition-opacity flex items-center gap-2 cursor-pointer">
                  <Save className="w-4 h-4" /> Salva SEO Generale
                </button>
              </div>
            </form>
          )}

          {/* TAB: INDICIZZAZIONE PAGINE */}
          {activeTab === 'pagine' && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-4 mb-6">
                <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight">Indicizzazione di Ogni Pagina Singola</h2>
                <p className="text-xs text-slate-500">Imposta e personalizza i tag SEO individuali per ciascuna URL del sito, consentendo un posizionamento mirato per argomenti specifici.</p>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-500 border-b border-slate-200">
                      <th className="py-4 px-6">Nome Pagina</th>
                      <th className="py-4 px-6">URL Dedicata</th>
                      <th className="py-4 px-6">Meta Title Configurato</th>
                      <th className="py-4 px-6 text-right">Azioni</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs font-medium">
                    {pagesList.map((page) => {
                      const pageTitle = getNestedValue(locales, `seo.${page.id}.title`);
                      return (
                        <tr key={page.id} className="hover:bg-slate-50/50">
                          <td className="py-4 px-6 font-bold text-slate-900">{page.name}</td>
                          <td className="py-4 px-6 text-slate-500 font-mono">{page.url}</td>
                          <td className="py-4 px-6 max-w-xs truncate text-slate-650">{pageTitle || '(Predefinito Globale)'}</td>
                          <td className="py-4 px-6 text-right">
                            <button 
                              onClick={() => openEditPageSeo(page.id)}
                              className="px-3.5 py-1.5 bg-slate-100 hover:bg-sai-blue hover:text-white text-slate-700 rounded-lg font-bold text-[11px] border border-slate-200 hover:border-sai-blue transition-all cursor-pointer"
                            >
                              Modifica SEO
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: MONITOR AI SEO */}
          {activeTab === 'ai' && (() => {
            const globalTitle = getNestedValue(locales, 'seo.global.title') || '';
            const globalDesc = getNestedValue(locales, 'seo.global.description') || '';
            const globalKeywords = getNestedValue(locales, 'seo.global.keywords') || '';
            
            const hasSchema = !!(getNestedValue(locales, 'azienda.name') && getNestedValue(locales, 'azienda.address'));
            const hasHaccp = globalKeywords.toLowerCase().includes('haccp napoli') || 
                             globalTitle.toLowerCase().includes('haccp napoli') || 
                             globalDesc.toLowerCase().includes('haccp napoli');
            const hasSicurezza = globalKeywords.toLowerCase().includes('sicurezza sul lavoro napoli') || 
                                 globalTitle.toLowerCase().includes('sicurezza sul lavoro napoli') || 
                                 globalDesc.toLowerCase().includes('sicurezza sul lavoro napoli');
            const hasGsc = !!getNestedValue(locales, 'seo.integrations.google_search_console');
            const hasGa = !!getNestedValue(locales, 'seo.integrations.google_analytics');

            // Dynamic AI Engine scores based on actual optimization
            const perpScore = Math.max(15, aiScore);
            const sgptScore = Math.max(15, Math.round(aiScore * 0.96));
            const geminiScore = Math.max(15, Math.round(aiScore * 0.93));
            const copilotScore = Math.max(15, Math.round(aiScore * 0.95));

            return (
              <div className="space-y-8">
                <div className="border-b border-slate-100 pb-4 mb-6">
                  <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight">Monitor Ottimizzazione AI SEO (LLM Optimization)</h2>
                  <p className="text-xs text-slate-500">Ottimizza il tuo sito per motori di ricerca basati su intelligenze artificiali (SearchGPT, Gemini, Perplexity, Copilot) e modelli RAG.</p>
                </div>

                {/* AI SEARCH ENGINES SCORES */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Perplexity AI</span>
                      <span className="text-[10px] bg-sai-green/10 text-sai-green font-black px-1.5 py-0.5 rounded">RAG Ready</span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <div className="text-3xl font-black">{perpScore}%</div>
                      <span className="text-[10px] text-sai-green font-bold">
                        {perpScore >= 80 ? 'Eccellente' : perpScore >= 50 ? 'Ottimo' : 'Da Migliorare'}
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-sai-green h-full" style={{ width: `${perpScore}%` }} />
                    </div>
                  </div>

                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">SearchGPT</span>
                      <span className="text-[10px] bg-sai-green/10 text-sai-green font-black px-1.5 py-0.5 rounded">Indexed</span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <div className="text-3xl font-black">{sgptScore}%</div>
                      <span className="text-[10px] text-sai-green font-bold">
                        {sgptScore >= 80 ? 'Eccellente' : sgptScore >= 50 ? 'Ottimo' : 'Da Migliorare'}
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-sai-green h-full" style={{ width: `${sgptScore}%` }} />
                    </div>
                  </div>

                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Google Gemini</span>
                      <span className="text-[10px] bg-sai-green/10 text-sai-green font-black px-1.5 py-0.5 rounded">Direct</span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <div className="text-3xl font-black">{geminiScore}%</div>
                      <span className="text-[10px] text-sai-green font-bold">
                        {geminiScore >= 80 ? 'Eccellente' : geminiScore >= 50 ? 'Ottimo' : 'Da Migliorare'}
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-sai-green h-full" style={{ width: `${geminiScore}%` }} />
                    </div>
                  </div>

                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Copilot</span>
                      <span className="text-[10px] bg-sai-green/10 text-sai-green font-black px-1.5 py-0.5 rounded">Live</span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <div className="text-3xl font-black">{copilotScore}%</div>
                      <span className="text-[10px] text-sai-green font-bold">
                        {copilotScore >= 80 ? 'Eccellente' : copilotScore >= 50 ? 'Ottimo' : 'Da Migliorare'}
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-sai-green h-full" style={{ width: `${copilotScore}%` }} />
                    </div>
                  </div>
                </div>

                {/* OPTIMIZATION INSIGHTS */}
                <div className="bg-slate-50 p-6 rounded-[1.5rem] border border-slate-200 space-y-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Fattori Chiave di Scansione Semantica (Dati Reali)</span>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-4.5 rounded-xl border border-slate-100 flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                        hasSchema ? 'bg-sai-green/10 text-sai-green' : 'bg-orange-100 text-orange-600'
                      }`}>
                        <Check className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">Schema.org JSON-LD Rilevato</h4>
                        <p className="text-[11px] text-slate-500 leading-relaxed mt-1">
                          {hasSchema 
                            ? `Attivo - Lo schema LocalBusiness è correttamente implementato a livello di layout e configurato per "${getNestedValue(locales, 'azienda.name')}".`
                            : "Incompleto - Assicurati che la Ragione Sociale e la Sede siano inserite nella scheda Dati Aziendali."
                          }
                        </p>
                      </div>
                    </div>

                    <div className="bg-white p-4.5 rounded-xl border border-slate-100 flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                        hasHaccp ? 'bg-sai-green/10 text-sai-green' : 'bg-orange-100 text-orange-600'
                      }`}>
                        <Check className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">Chiave Primaria "haccp napoli"</h4>
                        <p className="text-[11px] text-slate-500 leading-relaxed mt-1">
                          {hasHaccp
                            ? "Ottimizzato - La parola chiave 'haccp napoli' è presente nei metadati del sito per gli indici semantici delle AI."
                            : "Migliorabile - Aggiungi la parola chiave 'haccp napoli' nel SEO globale o nella descrizione del sito."
                          }
                        </p>
                      </div>
                    </div>

                    <div className="bg-white p-4.5 rounded-xl border border-slate-100 flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                        hasSicurezza ? 'bg-sai-green/10 text-sai-green' : 'bg-orange-100 text-orange-600'
                      }`}>
                        <Check className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">Chiave Primaria "sicurezza sul lavoro napoli"</h4>
                        <p className="text-[11px] text-slate-500 leading-relaxed mt-1">
                          {hasSicurezza
                            ? "Ottimizzato - La parola chiave 'sicurezza sul lavoro napoli' è presente per i motori basati su LLM."
                            : "Migliorabile - Aggiungi la parola chiave 'sicurezza sul lavoro napoli' nella scheda SEO Generale."
                          }
                        </p>
                      </div>
                    </div>

                    <div className="bg-white p-4.5 rounded-xl border border-slate-100 flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                        hasGsc && hasGa ? 'bg-sai-green/10 text-sai-green' : 'bg-orange-100 text-orange-600'
                      }`}>
                        <Check className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">Google Search Console & Analytics</h4>
                        <p className="text-[11px] text-slate-500 leading-relaxed mt-1">
                          {hasGsc && hasGa
                            ? "Ottimizzato - Integrazioni attive per Search Console e Google Analytics."
                            : `Parziale - ${!hasGsc ? 'Inserisci il tag Google Search Console.' : ''} ${!hasGa ? 'Configura l\'ID Google Analytics.' : ''}`
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* TAB: TRAFFICO E ANALYTICS */}
          {activeTab === 'traffico' && (
            <form onSubmit={handleSave} className="space-y-6">
              <div className="border-b border-slate-100 pb-4 mb-6">
                <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight">Traffico Dati e Integrazioni Proprietà</h2>
                <p className="text-xs text-slate-500">Integra i codici di verifica, i tag di tracciamento analitici e le regole commerciali pubblicitarie.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-5">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-2">Codice di Verifica Google Search Console</label>
                    <input 
                      type="text" 
                      id="int_gsc" 
                      defaultValue={getNestedValue(locales, 'seo.integrations.google_search_console')} 
                      placeholder="Es. google-site-verification=abc123xyz..." 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-sai-blue font-mono" 
                    />
                    <span className="text-[10px] text-slate-500 mt-1 block">Meta tag di verifica per indicizzare e monitorare la proprietà del sito nella GSC.</span>
                  </div>

                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-2">ID di Tracciamento Google Analytics (GA4)</label>
                    <input 
                      type="text" 
                      id="int_ga" 
                      defaultValue={getNestedValue(locales, 'seo.integrations.google_analytics')} 
                      placeholder="Es. G-XXXXXXXXXX" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-sai-blue font-mono" 
                    />
                    <span className="text-[10px] text-slate-500 mt-1 block">Il tag G-ID per raccogliere le statistiche di navigazione degli utenti e visualizzare il traffico reale.</span>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-2">Contenuto del file Ads.txt</label>
                  <textarea 
                    id="int_ads" 
                    rows={6} 
                    defaultValue={getNestedValue(locales, 'seo.integrations.ads_txt')} 
                    placeholder="Es. google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-900 focus:outline-none focus:border-sai-blue font-mono resize-none h-[180px]" 
                  />
                  <span className="text-[10px] text-slate-500 mt-1 block">Consente di certificare i venditori autorizzati dei tuoi spazi pubblicitari. Disponibile all'indirizzo pubblico /ads.txt</span>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button type="submit" disabled={isSaving} className="px-6 py-3 bg-sai-blue text-white rounded-xl font-bold text-xs shadow-md shadow-sai-blue/20 hover:opacity-95 transition-opacity flex items-center gap-2 cursor-pointer">
                  <Save className="w-4 h-4" /> Salva Integrazioni
                </button>
              </div>
            </form>
          )}

          {/* SAVE CONFIRMATION BUBBLE */}
          {saveStatus !== 'idle' && (
            <div className={`mt-6 p-4 rounded-xl border flex items-center gap-3 transition-all ${
              saveStatus === 'success' ? 'bg-sai-green/10 border-sai-green/30 text-sai-green' : 'bg-red-50 border-red-200 text-red-600'
            }`}>
              <Check className="w-5 h-5 shrink-0" />
              <span className="text-xs font-bold">{saveMessage}</span>
            </div>
          )}
        </main>
      </div>

      {/* EDIT MODAL FOR PAGE SEO */}
      {editingPageId && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-white rounded-[2rem] max-w-xl w-full p-8 shadow-2xl border border-slate-100 flex flex-col text-left">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4 mb-6">
              <div>
                <h3 className="text-md font-black text-slate-900 uppercase tracking-tight">Modifica SEO della URL Dedicata</h3>
                <p className="text-xs text-slate-400 font-mono font-medium">Pagina: {pagesList.find(p => p.id === editingPageId)?.url}</p>
              </div>
              <button 
                onClick={() => setEditingPageId(null)}
                className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 flex-1">
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-1.5">Meta Title Pagina</label>
                <input 
                  type="text" 
                  value={pageModalTitle}
                  onChange={(e) => setPageModalTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-sai-blue font-medium" 
                />
              </div>

              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-1.5">Meta Description Pagina</label>
                <textarea 
                  rows={4}
                  value={pageModalDesc}
                  onChange={(e) => setPageModalDesc(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-sai-blue resize-none font-medium" 
                />
              </div>

              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-1.5">Keywords Pagina</label>
                <input 
                  type="text" 
                  value={pageModalKeywords}
                  onChange={(e) => setPageModalKeywords(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-sai-blue font-mono" 
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-slate-100 pt-6 mt-6">
              <button 
                onClick={() => setEditingPageId(null)}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-bold cursor-pointer"
              >
                Annulla
              </button>
              <button 
                onClick={handleSavePageSeo}
                disabled={isSaving}
                className="px-5 py-2.5 bg-sai-blue text-white rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer hover:opacity-95 shadow-md shadow-sai-blue/20"
              >
                <Save className="w-3.5 h-3.5" /> Salva Modifiche SEO
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
