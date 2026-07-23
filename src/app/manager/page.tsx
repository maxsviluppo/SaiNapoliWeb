"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { 
  Lock, Key, Eye, EyeOff, LogOut, Shield, Users, GraduationCap, Stethoscope, 
  BookOpen, Plus, Database, AlertCircle, Search, MapPin, Phone, Mail, ChevronLeft, ChevronRight,
  Edit, Trash2, Calendar, Euro, FileText, CheckCircle, Clock, XCircle, Printer,
  TrendingUp, Activity, AlertTriangle, FileX, FileCheck
} from 'lucide-react';
import { generateInitialDentisti, ClientContract, Payment, hasOverduePayment, addIntervalToDate } from '../../data/dentistiSeed';

type ManagerTab = 'dashboard' | 'amministratori' | 'scuole' | 'dentisti' | 'registri';

export default function ManagerDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<ManagerTab>('dashboard');

  // Dentisti state loaded from seed & localStorage safely
  const [dentisti, setDentisti] = useState<ClientContract[]>([]);
  const [selectedDentista, setSelectedDentista] = useState<ClientContract | null>(null);

  // Filters & Sorting for Dentisti
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLetter, setSelectedLetter] = useState<string>('all');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    const session = sessionStorage.getItem('sai_manager_logged');
    if (session === 'true') {
      setIsAuthenticated(true);
    }

    // Rigenera e applica il seed per sincronizzare le date ed eliminare date duplicate
    const seed = generateInitialDentisti();
    setDentisti(seed);
    try {
      localStorage.setItem('sai_dentisti_db', JSON.stringify(seed));
    } catch (e) {
      console.warn("Storage quota exceeded, keeping in-memory state:", e);
    }
  }, []);

  const saveDentisti = (newList: ClientContract[]) => {
    setDentisti(newList);
    try {
      localStorage.setItem('sai_dentisti_db', JSON.stringify(newList));
    } catch (e) {
      console.warn("Could not save to localStorage due to quota:", e);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const correctUser = 'Sainapoli';
    const correctPassword = 'Sainapoli!2026';
    if (username === correctUser && password === correctPassword) {
      setIsAuthenticated(true);
      sessionStorage.setItem('sai_manager_logged', 'true');
      setLoginError('');
    } else {
      setLoginError('Credenziali Manager non corrette.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('sai_manager_logged');
    setPassword('');
  };

  // Alphabet list
  const alphabet = "ABCDEFGIKLMNOPQRSTUVZ".split("");

  // Filtered Dentisti
  const filteredDentisti = useMemo(() => {
    let result = [...dentisti];

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(c => 
        c.name.toLowerCase().includes(q) || 
        c.city.toLowerCase().includes(q) ||
        c.paese.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q)
      );
    }

    if (selectedLetter !== 'all') {
      result = result.filter(c => c.letter.toUpperCase() === selectedLetter.toUpperCase());
    }

    if (selectedStatusFilter !== 'all') {
      if (selectedStatusFilter === 'scaduti') {
        const todayStr = new Date().toISOString().split('T')[0];
        result = result.filter(c => c.payments.some(p => p.status === 'in_attesa' && p.date < todayStr));
      } else {
        result = result.filter(c => c.status === selectedStatusFilter);
      }
    }

    return result;
  }, [dentisti, searchQuery, selectedLetter, selectedStatusFilter]);

  // Paginated Dentisti
  const totalPages = Math.ceil(filteredDentisti.length / itemsPerPage) || 1;
  const paginatedDentisti = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredDentisti.slice(start, start + itemsPerPage);
  }, [filteredDentisti, currentPage]);

  // General Statistics & MRR Revenue calculations
  const stats = useMemo(() => {
    const total = dentisti.length;
    const attivi = dentisti.filter(c => c.status === 'attivo').length;
    const sollecito = dentisti.filter(c => c.status === 'sollecito').length;
    const sospesi = dentisti.filter(c => c.status === 'sospeso').length;
    const disdetti = dentisti.filter(c => c.status === 'disdetto').length;
    const nonReperibili = dentisti.filter(c => c.status === 'non_reperibile').length;
    const scaduti = dentisti.filter(c => {
      const todayStr = new Date().toISOString().split('T')[0];
      return c.payments.some(p => p.status === 'in_attesa' && p.date < todayStr);
    }).length;

    // Last contract number
    const validContractNumbers = dentisti
      .map(c => c.contractNumber)
      .filter((num): num is number => num !== null);
    const lastContractNumber = validContractNumbers.length > 0 ? Math.max(...validContractNumbers) : 547;

    // Monthly Recurring Revenue (MRR)
    const activeRevenue = dentisti
      .filter(c => c.status === 'attivo')
      .reduce((sum, c) => sum + c.monthlyFee, 0);

    const pendingRevenue = dentisti
      .filter(c => c.status === 'sospeso' || c.status === 'sollecito')
      .reduce((sum, c) => sum + c.monthlyFee, 0);

    const totalMRR = activeRevenue + pendingRevenue;

    // City distribution top 5
    const cityCounts: Record<string, number> = {};
    dentisti.forEach(c => {
      const location = c.paese || c.city;
      cityCounts[location] = (cityCounts[location] || 0) + 1;
    });
    const topCities = Object.entries(cityCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    const maxCityCount = topCities.length > 0 ? Math.max(...topCities.map(t => t[1])) : 1;

    return {
      total,
      attivi,
      sollecito,
      sospesi,
      disdetti,
      nonReperibili,
      scaduti,
      lastContractNumber,
      activeRevenue,
      pendingRevenue,
      totalMRR,
      topCities,
      maxCityCount
    };
  }, [dentisti]);

  // Donut slices calculations
  const donutSlices = useMemo(() => {
    const statusItems = [
      { key: 'attivo', label: 'Attivi', count: stats.attivi, color: '#10B981', bg: 'bg-emerald-500' },
      { key: 'sospeso', label: 'In Sospeso', count: stats.sospesi, color: '#F59E0B', bg: 'bg-amber-500' },
      { key: 'sollecito', label: 'Solleciti', count: stats.sollecito, color: '#EF4444', bg: 'bg-red-500' },
      { key: 'disdetto', label: 'Disdetti', count: stats.disdetti, color: '#6B7280', bg: 'bg-slate-500' },
      { key: 'non_reperibile', label: 'Non Reperibili', count: stats.nonReperibili, color: '#8B5CF6', bg: 'bg-purple-500' },
    ];

    const totalCount = stats.total || 1;
    let cumulativePercent = 0;

    return statusItems.map((item) => {
      const percent = item.count / totalCount;
      const startPercent = cumulativePercent;
      cumulativePercent += percent;

      const getCoordinatesForPercent = (p: number) => {
        const x = Math.cos(2 * Math.PI * p - Math.PI / 2);
        const y = Math.sin(2 * Math.PI * p - Math.PI / 2);
        return [x, y];
      };

      const [startX, startY] = getCoordinatesForPercent(startPercent);
      const [endX, endY] = getCoordinatesForPercent(cumulativePercent);
      const largeArcFlag = percent > 0.5 ? 1 : 0;

      const r = 40;
      const pathData = percent === 1 
        ? `M 0 ${-r} A ${r} ${r} 0 1 1 -0.01 ${-r} Z` 
        : `M ${startX * r} ${startY * r} A ${r} ${r} 0 ${largeArcFlag} 1 ${endX * r} ${endY * r}`;

      return {
        ...item,
        pathData,
        percentStr: (percent * 100).toFixed(1) + '%'
      };
    });
  }, [stats]);

  // LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col justify-center items-center p-6 relative font-sans text-white">
        <div className="w-full max-w-md bg-white text-slate-800 rounded-[2rem] p-8 shadow-2xl border border-slate-100 flex flex-col items-center text-center relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center mb-6 shadow-inner">
            <Lock className="w-8 h-8" />
          </div>

          <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">S.A.I. Manager</h1>
          <p className="text-xs text-slate-400 mt-1 font-medium max-w-xs mb-8">Piattaforma Gestionali Aziendali (Amministratori, Scuole, Dentisti e Registri)</p>

          <form onSubmit={handleLogin} className="w-full space-y-4 text-left">
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-2">Utente Manager</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Utente Manager..." 
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm text-slate-900 focus:outline-none focus:border-amber-500 font-medium"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-2">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password..." 
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 pl-5 pr-12 text-sm text-slate-900 focus:outline-none focus:border-amber-500 font-medium"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
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
              className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-2xl font-bold text-sm shadow-xl shadow-amber-500/20 hover:opacity-95 transition-opacity flex items-center justify-center gap-2 cursor-pointer mt-4"
            >
              <Key className="w-4 h-4" /> Accedi a SAI Manager
            </button>
          </form>

          <Link href="/" className="mt-8 text-xs font-bold text-slate-400 hover:text-amber-500 transition-colors flex items-center gap-1">
            ← Torna al sito pubblico
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
      {/* HEADER */}
      <header className="bg-slate-900 text-white border-b border-slate-800 py-5 px-6 sm:px-10 sticky top-0 z-40 shadow-md flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black uppercase tracking-tight text-white">S.A.I. MANAGER</h1>
              <span className="text-[10px] bg-purple-500/20 border border-purple-500/30 text-purple-300 px-2 py-0.5 rounded-full font-black uppercase">Database Dentisti Attivo</span>
            </div>
            <p className="text-xs text-slate-400 font-medium">Gestione Anagrafiche, Contratti & Verbali Autoclavi</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-slate-800 px-3.5 py-1.5 rounded-xl border border-slate-700">
            <Database className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold text-slate-300">{dentisti.length} Studi Odontoiatrici</span>
          </div>

          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-red-500/20 text-slate-300 hover:text-red-400 rounded-xl text-xs font-bold border border-slate-700 hover:border-red-500/30 transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" /> Esci
          </button>
        </div>
      </header>

      {/* MAIN LAYOUT */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 py-10 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* SIDEBAR TABS */}
        <aside className="lg:col-span-1 space-y-4">
          <div className="bg-white rounded-[1.5rem] border border-slate-200 p-4 shadow-sm space-y-1">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-3 mb-2 block">Pannello Gestionali</span>
            
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'dashboard' 
                  ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20' 
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Shield className="w-4 h-4" /> Panoramica Dashboard
            </button>

            <button 
              onClick={() => setActiveTab('amministratori')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'amministratori' 
                  ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20' 
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Users className="w-4 h-4 text-emerald-500" /> Amministratori
            </button>

            <button 
              onClick={() => setActiveTab('scuole')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'scuole' 
                  ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20' 
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <GraduationCap className="w-4 h-4 text-blue-500" /> Scuole
            </button>

            <button 
              onClick={() => setActiveTab('dentisti')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'dentisti' 
                  ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20' 
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Stethoscope className="w-4 h-4 text-purple-500" /> Dentisti ({dentisti.length})
            </button>

            <button 
              onClick={() => setActiveTab('registri')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'registri' 
                  ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20' 
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <BookOpen className="w-4 h-4 text-amber-600" /> Registri
            </button>
          </div>

          {/* SYSTEM SUMMARY CARD */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[1.5rem] p-6 text-white shadow-lg space-y-3 border border-slate-700/50">
            <span className="text-[9px] font-black uppercase tracking-widest text-purple-400">Database DENTISTI.SI Caricato</span>
            <div className="text-3xl font-black">{dentisti.length} Studi</div>
            <p className="text-[10px] text-slate-400 leading-relaxed">Importazione automatica dall'archivio Excel/CSV originale.</p>
          </div>
        </aside>

        {/* MAIN DISPLAY AREA */}
        <main className="lg:col-span-3 space-y-8">
          
          {/* DASHBOARD MINIMAL OVERVIEW */}
          {activeTab === 'dashboard' && (
            <div className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm text-slate-800 space-y-8">
              <div className="border-b border-slate-100 pb-4">
                <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Panoramica Gestionali</h2>
                <p className="text-xs text-slate-500">Seleziona uno dei gestionali aziendali per accedere alle anagrafiche, verbali e registri.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <button onClick={() => setActiveTab('amministratori')} className="bg-emerald-50/50 border border-emerald-100 hover:border-emerald-300 p-5 rounded-2xl text-left transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center mb-4 shadow-sm group-hover:scale-105 transition-transform">
                    <Users className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">Amministratori</h3>
                  <p className="text-[11px] text-slate-500 mt-1">0 Anagrafiche</p>
                  <span className="text-[10px] text-emerald-600 font-bold mt-3 block">Apri Gestionale →</span>
                </button>

                <button onClick={() => setActiveTab('scuole')} className="bg-blue-50/50 border border-blue-100 hover:border-blue-300 p-5 rounded-2xl text-left transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-blue-500 text-white flex items-center justify-center mb-4 shadow-sm group-hover:scale-105 transition-transform">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">Scuole</h3>
                  <p className="text-[11px] text-slate-500 mt-1">0 Plessi</p>
                  <span className="text-[10px] text-blue-600 font-bold mt-3 block">Apri Gestionale →</span>
                </button>

                <button onClick={() => setActiveTab('dentisti')} className="bg-purple-50/50 border border-purple-100 hover:border-purple-300 p-5 rounded-2xl text-left transition-all group relative overflow-hidden">
                  <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center mb-4 shadow-md group-hover:scale-105 transition-transform">
                    <Stethoscope className="w-5 h-5" />
                  </div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-slate-900 text-sm">Dentisti</h3>
                    <span className="text-[10px] font-black bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">DB DENTISTI.SI</span>
                  </div>
                  <p className="text-[11px] text-purple-700 font-bold mt-1">{dentisti.length} Studi Censiti</p>
                  <span className="text-[10px] text-purple-600 font-bold mt-3 block">Apri Anagrafica & Statistiche →</span>
                </button>

                <button onClick={() => setActiveTab('registri')} className="bg-amber-50/50 border border-amber-100 hover:border-amber-300 p-5 rounded-2xl text-left transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center mb-4 shadow-sm group-hover:scale-105 transition-transform">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">Registri</h3>
                  <p className="text-[11px] text-slate-500 mt-1">0 Verbali</p>
                  <span className="text-[10px] text-amber-600 font-bold mt-3 block">Apri Registro →</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB: AMMINISTRATORI */}
          {activeTab === 'amministratori' && (
            <div className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm text-slate-800 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-wider">Gestionale V1</span>
                    <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight">Amministratori di Condominio</h2>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Anagrafica, contratti di igiene ambientale, legionella ed autoclavaggio condomini.</p>
                </div>
                <button onClick={() => alert("Form in attivazione")} className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs flex items-center gap-2">
                  <Plus className="w-4 h-4" /> Nuovo Amministratore
                </button>
              </div>
              <div className="border border-slate-200 rounded-2xl p-12 text-center bg-slate-50/50">
                <Users className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <h3 className="font-bold text-slate-700 text-sm">Nessuna anagrafica presente</h3>
              </div>
            </div>
          )}

          {/* TAB: SCUOLE */}
          {activeTab === 'scuole' && (
            <div className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm text-slate-800 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-blue-100 text-blue-700 text-[10px] font-black uppercase tracking-wider">Gestionale V1</span>
                    <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight">Istituti Scolastici & Plessi</h2>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Gestione piani HACCP mensa scolastica, potabilità acque e corsi sicurezza personale.</p>
                </div>
                <button onClick={() => alert("Form in attivazione")} className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs flex items-center gap-2">
                  <Plus className="w-4 h-4" /> Nuovo Plesso Scolastico
                </button>
              </div>
              <div className="border border-slate-200 rounded-2xl p-12 text-center bg-slate-50/50">
                <GraduationCap className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <h3 className="font-bold text-slate-700 text-sm">Nessun plesso scolastico censito</h3>
              </div>
            </div>
          )}

          {/* TAB: DENTISTI (GESTIONALE DENTISTI + DASHBOARD STATISTICHE E GRAFICI INSIDE) */}
          {activeTab === 'dentisti' && (
            <div className="space-y-8">
              
              {/* DASHBOARD STATS & ANALYTICS INSERITA DENTRO LA SEZIONE DENTISTI */}
              <div className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm text-slate-800 space-y-8">
                
                {/* Header Dentisti Dashboard */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-purple-100 text-purple-700 text-[10px] font-black uppercase tracking-wider">Database DENTISTI.SI</span>
                      <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Gestionale Studi Odontoiatrici ({filteredDentisti.length})</h2>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">Anagrafica completa, statistiche entrate (MRR), grafici di distribuzione e verbali autoclavi.</p>
                  </div>

                  <button 
                    onClick={() => {
                      const newId = `dentista_${Date.now()}`;
                      const today = new Date().toISOString().split('T')[0];
                      const newDentista: ClientContract = {
                        id: newId,
                        name: 'Nuovo Studio Dentistico',
                        letter: 'N',
                        contractNumber: Math.floor(600 + Math.random() * 300),
                        status: 'attivo',
                        city: 'Napoli',
                        paese: 'Napoli',
                        phone: '081 0000000',
                        email: 'info@nuovostudio.it',
                        monthlyFee: 150,
                        billingInterval: '3 mesi',
                        startDate: today,
                        notes: 'Nuovo studio registrato da pannello di controllo.',
                        payments: [
                          {
                            id: `pay_${Date.now()}`,
                            date: today,
                            amount: 150,
                            status: 'in_attesa'
                          }
                        ]
                      };
                      setSelectedDentista(newDentista);
                    }}
                    className="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold text-xs flex items-center gap-2 shadow-md shadow-purple-600/20 transition-all shrink-0"
                  >
                    <Plus className="w-4 h-4" /> Nuovo Studio Medico
                  </button>
                </div>

                {/* 4 KPI CARDS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  
                  {/* KPI 1: Totale Studi */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 shadow-sm">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">Totale Studi</span>
                        <div className="text-3xl font-black text-slate-900 mt-1">{stats.total}</div>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold">
                        <Users className="w-5 h-5" />
                      </div>
                    </div>
                    <span className="text-[10px] text-emerald-600 font-bold mt-3 block flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span> {stats.attivi} Attivi in lista
                    </span>
                  </div>

                  {/* KPI 2: Ultimo Numero Contratto */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 shadow-sm">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">Ultimo N° Contratto</span>
                        <div className="text-3xl font-black text-slate-900 mt-1">N° {stats.lastContractNumber}</div>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold">
                        <FileCheck className="w-5 h-5" />
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-500 font-bold mt-3 block">
                      Registro progressivo contratti
                    </span>
                  </div>

                  {/* KPI 3: Entrate Ricorrenti MRR */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 shadow-sm">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">Entrate Stimate (MRR)</span>
                        <div className="text-2xl font-black text-slate-900 mt-1">
                          € {stats.totalMRR.toLocaleString('it-IT')}
                        </div>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                        <Euro className="w-5 h-5" />
                      </div>
                    </div>
                    <span className="text-[10px] text-emerald-600 font-bold mt-3 block">
                      Incassato: € {stats.activeRevenue}
                    </span>
                  </div>

                  {/* KPI 4: Solleciti & Insoluti */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 shadow-sm">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">Solleciti & Scadenze</span>
                        <div className="text-3xl font-black text-red-600 mt-1">{stats.sollecito}</div>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center font-bold">
                        <AlertTriangle className="w-5 h-5" />
                      </div>
                    </div>
                    <span className="text-[10px] text-red-600 font-bold mt-3 block">
                      Rinnovo o pagamento in ritardo
                    </span>
                  </div>
                </div>

                {/* CHARTS SECTION */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                  
                  {/* Left: Donut Chart Visualization */}
                  <div className="lg:col-span-3 bg-slate-900 rounded-2xl p-6 text-white shadow-lg space-y-4 border border-slate-800">
                    <h3 className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" /> Distribuzione Stati Contrattuali
                    </h3>

                    <div className="flex flex-col sm:flex-row items-center justify-around gap-6 pt-2">
                      <div className="relative w-36 h-36">
                        <svg viewBox="-50 -50 100 100" className="w-full h-full transform -rotate-90">
                          {donutSlices.map((slice) => {
                            if (slice.count === 0) return null;
                            return (
                              <path
                                key={slice.key}
                                d={slice.pathData}
                                fill="none"
                                stroke={slice.color}
                                strokeWidth="12"
                                className="transition-all duration-300 hover:stroke-[15px] cursor-pointer"
                              />
                            );
                          })}
                          <circle cx="0" cy="0" r="32" fill="#0f172a" />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                          <span className="text-[9px] text-slate-400 font-bold uppercase">Attivi</span>
                          <span className="text-xl font-black text-white">{stats.attivi}</span>
                        </div>
                      </div>

                      <div className="flex-1 space-y-2 w-full max-w-xs text-xs">
                        {donutSlices.map((item) => (
                          <div 
                            key={item.key} 
                            onClick={() => { setSelectedStatusFilter(selectedStatusFilter === item.key ? 'all' : item.key); setCurrentPage(1); }}
                            className={`flex items-center justify-between p-2 rounded-xl border cursor-pointer transition-colors ${selectedStatusFilter === item.key ? 'bg-purple-900/50 border-purple-400 text-white font-bold' : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700/50 text-slate-200'}`}
                          >
                            <div className="flex items-center gap-2">
                              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                              <span className="font-bold">{item.label}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-black text-white px-2 py-0.5 rounded bg-slate-900 border border-slate-700">
                                {item.count}
                              </span>
                              <span className="text-[10px] text-slate-400 font-bold w-10 text-right">
                                {item.percentStr}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right: Top Cities Distribution */}
                  <div className="lg:col-span-2 bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                    <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-purple-600" /> Top Comuni / Città
                    </h3>

                    <div className="space-y-3 pt-2">
                      {stats.topCities.map(([cityName, count]) => {
                        const percentage = (count / stats.maxCityCount) * 100;
                        return (
                          <div key={cityName} className="space-y-1">
                            <div className="flex justify-between items-center text-xs font-bold">
                              <span className="text-slate-800">{cityName}</span>
                              <span className="text-purple-600 font-mono">{count} studi</span>
                            </div>
                            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                              <div 
                                className="bg-purple-600 h-full rounded-full transition-all duration-500"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>

                {/* KPI STATUS FILTER BUTTONS (FILTRI RAPIDI PRIMA DELLA LISTA DATI) */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 pt-4 border-t border-slate-100">
                  <button 
                    onClick={() => { setSelectedStatusFilter('all'); setCurrentPage(1); }}
                    className={`p-3 rounded-2xl border text-left transition-all ${selectedStatusFilter === 'all' ? 'bg-slate-900 text-white border-slate-900 shadow-md' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'}`}
                  >
                    <span className="text-[9px] font-black uppercase tracking-widest block opacity-70">Tutti i Contratti</span>
                    <span className="text-xl font-black">{stats.total}</span>
                  </button>

                  <button 
                    onClick={() => { setSelectedStatusFilter('attivo'); setCurrentPage(1); }}
                    className={`p-3 rounded-2xl border text-left transition-all ${selectedStatusFilter === 'attivo' ? 'bg-emerald-600 text-white border-emerald-600 shadow-md' : 'bg-emerald-50/50 border-emerald-100 hover:bg-emerald-100'}`}
                  >
                    <span className="text-[9px] font-black uppercase tracking-widest block opacity-70">Attivi</span>
                    <span className="text-xl font-black">{stats.attivi}</span>
                  </button>

                  <button 
                    onClick={() => { setSelectedStatusFilter('sollecito'); setCurrentPage(1); }}
                    className={`p-3 rounded-2xl border text-left transition-all ${selectedStatusFilter === 'sollecito' ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-red-50/50 border-red-100 hover:bg-red-100'}`}
                  >
                    <span className="text-[9px] font-black uppercase tracking-widest block opacity-70">Sollecito</span>
                    <span className="text-xl font-black">{stats.sollecito}</span>
                  </button>

                  <button 
                    onClick={() => { setSelectedStatusFilter('sospeso'); setCurrentPage(1); }}
                    className={`p-3 rounded-2xl border text-left transition-all ${selectedStatusFilter === 'sospeso' ? 'bg-amber-600 text-white border-amber-600 shadow-md' : 'bg-amber-50/50 border-amber-100 hover:bg-amber-100'}`}
                  >
                    <span className="text-[9px] font-black uppercase tracking-widest block opacity-70">Sospesi</span>
                    <span className="text-xl font-black">{stats.sospesi}</span>
                  </button>

                  <button 
                    onClick={() => { setSelectedStatusFilter('disdetto'); setCurrentPage(1); }}
                    className={`p-3 rounded-2xl border text-left transition-all ${selectedStatusFilter === 'disdetto' ? 'bg-slate-600 text-white border-slate-600 shadow-md' : 'bg-slate-100 border-slate-200 hover:bg-slate-200'}`}
                  >
                    <span className="text-[9px] font-black uppercase tracking-widest block opacity-70">Disdetti</span>
                    <span className="text-xl font-black">{stats.disdetti}</span>
                  </button>

                  <button 
                    onClick={() => { setSelectedStatusFilter('scaduti'); setCurrentPage(1); }}
                    className={`p-3 rounded-2xl border text-left transition-all ${selectedStatusFilter === 'scaduti' ? 'bg-red-800 text-white border-red-800 shadow-md' : 'bg-red-50/50 border-red-200 hover:bg-red-100 text-red-900'}`}
                  >
                    <span className="text-[9px] font-black uppercase tracking-widest block opacity-70">Scaduti</span>
                    <span className="text-xl font-black">{stats.scaduti}</span>
                  </button>
                </div>

                {/* SEARCH & ALPHABET FILTER */}
                <div className="space-y-3">
                  <div className="relative">
                    <input 
                      type="text" 
                      value={searchQuery}
                      onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                      placeholder="Cerca per nome studio, città o comune (es. Abbate, Esposito, Pozzuoli)..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 pl-11 text-xs text-slate-900 focus:outline-none focus:border-purple-500 font-medium"
                    />
                    <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  </div>

                  {/* Alphabet Bar */}
                  <div className="flex flex-wrap gap-1 bg-slate-50 p-2 rounded-2xl border border-slate-200 justify-center">
                    <button 
                      onClick={() => { setSelectedLetter('all'); setCurrentPage(1); }}
                      className={`px-2.5 py-1 rounded-xl text-[10px] font-black uppercase transition-all ${selectedLetter === 'all' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-200'}`}
                    >
                      TUTTI
                    </button>
                    {alphabet.map(l => (
                      <button 
                        key={l}
                        onClick={() => { setSelectedLetter(l); setCurrentPage(1); }}
                        className={`w-7 h-7 rounded-xl text-[10px] font-black transition-all ${selectedLetter === l ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-200'}`}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                </div>

                {/* DENTISTI LIST TABLE */}
                <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50 border-b border-slate-200 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      <tr>
                        <th className="p-4">Studio / Dentista</th>
                        <th className="p-4">Comune / Provincia</th>
                        <th className="p-4">Contratto N°</th>
                        <th className="p-4">Canone</th>
                        <th className="p-4">Stato</th>
                        <th className="p-4 text-right">Dettaglio</th>
                      </tr>
                    </thead>
                    <tbody className="text-xs divide-y divide-slate-100 font-medium text-slate-700">
                      {paginatedDentisti.map(c => {
                        // Verifica se è un utente ATTIVO ed ha superato la data di scadenza del pagamento
                        const todayStr = new Date().toISOString().split('T')[0];
                        const isOverdueActive = c.status === 'attivo' && c.payments.some(p => (p.status === 'in_attesa' || p.status === 'insoluto') && p.date < todayStr);

                        return (
                          <tr key={c.id} className={`transition-colors ${isOverdueActive ? 'bg-red-50/90 hover:bg-red-100/90 text-red-900 border-l-4 border-red-500 font-bold' : 'hover:bg-purple-50/30'}`}>
                            <td className="p-4 font-bold text-slate-900 flex items-center gap-2">
                              {c.name}
                              {isOverdueActive && (
                                <span className="px-2 py-0.5 bg-red-600 text-white rounded-md text-[9px] font-black uppercase tracking-wider animate-pulse flex items-center gap-1">
                                  <AlertTriangle className="w-3 h-3" /> Scaduto
                                </span>
                              )}
                            </td>
                            <td className="p-4 text-slate-600">{c.paese} ({c.city})</td>
                            <td className="p-4 font-mono font-bold text-slate-700">
                              {c.contractNumber ? `N° ${c.contractNumber}` : <span className="text-slate-400 italic">Non reperibile</span>}
                            </td>
                            <td className="p-4 font-bold text-slate-900 whitespace-nowrap">
                              <div className="flex flex-col gap-1">
                                <span className="bg-purple-50 text-purple-900 px-2.5 py-1 rounded-lg border border-purple-100 inline-flex items-center gap-1 text-xs w-fit">
                                  <span className="font-extrabold font-mono text-purple-900">€ {c.monthlyFee}</span>
                                  <span className="text-slate-400 font-normal">/</span>
                                  <span className="text-purple-700 font-semibold">{c.billingInterval || '3 mesi'}</span>
                                </span>
                                {(() => {
                                  // Trova l'ultimo pagamento effettuato (in stato PAGATO)
                                  const paidPayments = c.payments.filter(p => p.status === 'pagato');
                                  const lastPaid = paidPayments.length > 0 ? paidPayments[paidPayments.length - 1] : null;
                                  
                                  // Se esiste una rata pagata, calcola la data successiva partendo da quella, altrimenti prende l'ultima data disponibile
                                  let nextDueDateStr = '';
                                  if (lastPaid && lastPaid.date) {
                                    nextDueDateStr = addIntervalToDate(lastPaid.date, c.billingInterval || '3 mesi');
                                  } else if (c.payments.length > 0) {
                                    nextDueDateStr = c.payments[c.payments.length - 1].date;
                                  }

                                  if (!nextDueDateStr) return null;
                                  const isPast = nextDueDateStr < todayStr;

                                  return (
                                    <span className={`px-2.5 py-1 rounded-lg border inline-flex items-center gap-1.5 text-xs font-mono font-bold w-fit ${
                                      isPast 
                                        ? 'bg-red-50 text-red-700 border-red-200' 
                                        : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                    }`}>
                                      <Calendar className={`w-3.5 h-3.5 ${isPast ? 'text-red-500' : 'text-emerald-600'}`} />
                                      <span>{nextDueDateStr}</span>
                                    </span>
                                  );
                                })()}
                              </div>
                            </td>
                            <td className="p-4">
                              {c.status === 'attivo' && !isOverdueActive && <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-md text-[10px] font-black">ATTIVO</span>}
                              {c.status === 'attivo' && isOverdueActive && <span className="px-2 py-0.5 bg-red-200 text-red-900 rounded-md text-[10px] font-black">ATTIVO (SCADUTO)</span>}
                              {c.status === 'sollecito' && <span className="px-2 py-0.5 bg-red-100 text-red-800 rounded-md text-[10px] font-black">SOLLECITO</span>}
                              {c.status === 'sospeso' && <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded-md text-[10px] font-black">SOSPESO</span>}
                              {c.status === 'disdetto' && <span className="px-2 py-0.5 bg-slate-200 text-slate-700 rounded-md text-[10px] font-black">DISDETTO</span>}
                              {c.status === 'non_reperibile' && <span className="px-2 py-0.5 bg-purple-100 text-purple-800 rounded-md text-[10px] font-black">NON REPERIBILE</span>}
                            </td>
                            <td className="p-4 text-right">
                              <button 
                                onClick={() => {
                                  // Garantisci che ci sia sempre la riga del prossimo pagamento in stato IN ATTESA
                                  let dent = { ...c };
                                  if (dent.payments && dent.payments.length > 0) {
                                    const last = dent.payments[dent.payments.length - 1];
                                    if (last.status === 'pagato') {
                                      const nextDate = addIntervalToDate(last.date || new Date().toISOString().split('T')[0], dent.billingInterval || '3 mesi');
                                      dent.payments = [
                                        ...dent.payments,
                                        {
                                          id: `pay_${Date.now()}`,
                                          date: nextDate,
                                          amount: dent.monthlyFee,
                                          status: 'in_attesa'
                                        }
                                      ];
                                    }
                                  }
                                  setSelectedDentista(dent);
                                }}
                                className={`px-3 py-1.5 font-bold rounded-xl text-xs transition-all border ${isOverdueActive ? 'bg-red-600 hover:bg-red-700 text-white border-red-700 shadow-sm' : 'bg-purple-50 hover:bg-purple-600 hover:text-white text-purple-700 border-purple-200'}`}
                              >
                                Scheda Studio
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* PAGINATION */}
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-slate-500 font-medium">Pagina {currentPage} di {totalPages} ({filteredDentisti.length} studi)</span>
                  <div className="flex gap-2">
                    <button 
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      className="p-2 rounded-xl border border-slate-200 text-slate-600 disabled:opacity-30 hover:bg-slate-100"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button 
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      className="p-2 rounded-xl border border-slate-200 text-slate-600 disabled:opacity-30 hover:bg-slate-100"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB: REGISTRI */}
          {activeTab === 'registri' && (
            <div className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm text-slate-800 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-800 text-[10px] font-black uppercase tracking-wider">Gestionale V1</span>
                    <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight">Registri Ufficiali & Verbali</h2>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Archivio digitale dei registri di sanificazione, schede temperature, manutenzioni e interventi ASL.</p>
                </div>
                <button onClick={() => alert("Form in attivazione")} className="px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold text-xs flex items-center gap-2">
                  <Plus className="w-4 h-4" /> Genera Registro Intervento
                </button>
              </div>
              <div className="border border-slate-200 rounded-2xl p-12 text-center bg-slate-50/50">
                <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <h3 className="font-bold text-slate-700 text-sm">Nessun registro archiviato</h3>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* DETAIL & EDIT MODAL FOR DENTISTA STUDIO */}
      {selectedDentista && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] max-w-2xl w-full p-8 shadow-2xl border border-slate-100 flex flex-col text-left max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4 mb-6">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-purple-600 bg-purple-50 px-2.5 py-1 rounded-md">Modifica Scheda Studio Dentistico</span>
                <h3 className="text-xl font-black text-slate-900 mt-1">{selectedDentista.name}</h3>
                <p className="text-xs text-slate-500 font-medium">Modifica i dati anagrafici, importi e note contrattuali.</p>
              </div>
              <button 
                onClick={() => setSelectedDentista(null)}
                className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            <form 
              onSubmit={(e) => {
                e.preventDefault();
                const exists = dentisti.some(d => d.id === selectedDentista.id);
                let updatedList;
                if (exists) {
                  updatedList = dentisti.map(d => d.id === selectedDentista.id ? selectedDentista : d);
                } else {
                  updatedList = [selectedDentista, ...dentisti];
                }
                saveDentisti(updatedList);
                setSelectedDentista(null);
              }} 
              className="space-y-6 text-xs text-slate-700"
            >
              {/* EDIT FORM FIELDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                <div className="sm:col-span-2">
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">Ragione Sociale / Studio Medico</label>
                  <input 
                    type="text" 
                    value={selectedDentista.name}
                    onChange={(e) => setSelectedDentista({ ...selectedDentista, name: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-purple-500"
                    required
                  />
                </div>

                {/* DROPDOWN MENU SELETTORE COMUNE / PAESE */}
                <div>
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">Comune / Paese (Scelta Rapida)</label>
                  <select 
                    value={selectedDentista.paese}
                    onChange={(e) => setSelectedDentista({ ...selectedDentista, paese: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-purple-500"
                  >
                    <option value="Napoli">Napoli</option>
                    <option value="Marano di Napoli">Marano di Napoli</option>
                    <option value="Pozzuoli">Pozzuoli</option>
                    <option value="Casoria">Casoria</option>
                    <option value="Giugliano in Campania">Giugliano in Campania</option>
                    <option value="Torre del Greco">Torre del Greco</option>
                    <option value="Aversa">Aversa</option>
                    <option value="Caserta">Caserta</option>
                    <option value="Salerno">Salerno</option>
                    <option value="Avellino">Avellino</option>
                    <option value="Benevento">Benevento</option>
                    {/* fallback option if custom */}
                    {!["Napoli","Marano di Napoli","Pozzuoli","Casoria","Giugliano in Campania","Torre del Greco","Aversa","Caserta","Salerno","Avellino","Benevento"].includes(selectedDentista.paese) && (
                      <option value={selectedDentista.paese}>{selectedDentista.paese}</option>
                    )}
                  </select>
                </div>

                {/* DROPDOWN MENU SELETTORE CITTÀ / PROVINCIA */}
                <div>
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">Città / Provincia (Scelta Rapida)</label>
                  <select 
                    value={selectedDentista.city}
                    onChange={(e) => setSelectedDentista({ ...selectedDentista, city: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-purple-500"
                  >
                    <option value="Napoli">Napoli (NA)</option>
                    <option value="Caserta">Caserta (CE)</option>
                    <option value="Salerno">Salerno (SA)</option>
                    <option value="Avellino">Avellino (AV)</option>
                    <option value="Benevento">Benevento (BN)</option>
                    {!["Napoli","Caserta","Salerno","Avellino","Benevento"].includes(selectedDentista.city) && (
                      <option value={selectedDentista.city}>{selectedDentista.city}</option>
                    )}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">Numero Contratto N°</label>
                  <input 
                    type="number" 
                    value={selectedDentista.contractNumber || ''}
                    onChange={(e) => setSelectedDentista({ ...selectedDentista, contractNumber: e.target.value ? parseInt(e.target.value) : null })}
                    placeholder="Es. 547"
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold font-mono text-slate-900 focus:outline-none focus:border-purple-500"
                  />
                </div>

                {/* CANONE E TERMINE (STESSO BLOCCO COMBINATO) */}
                <div className="sm:col-span-2 bg-purple-50/50 border border-purple-100 p-4 rounded-2xl space-y-3">
                  <span className="text-[10px] font-black uppercase tracking-wider text-purple-700 block">Canone (€) & Termine / Frequenza Contratto</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[9px] font-black uppercase text-slate-400 block mb-1">Importo Canone (€)</label>
                      <input 
                        type="number" 
                        value={selectedDentista.monthlyFee}
                        onChange={(e) => setSelectedDentista({ ...selectedDentista, monthlyFee: parseFloat(e.target.value) || 0 })}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-purple-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-[9px] font-black uppercase text-slate-400 block mb-1">Termine / Frequenza</label>
                      <select 
                        value={["1 mese", "3 mesi", "1 anno"].includes(selectedDentista.billingInterval) ? selectedDentista.billingInterval : "personalizzata"}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val === 'personalizzata') {
                            setSelectedDentista({ ...selectedDentista, billingInterval: '45 giorni' });
                          } else {
                            setSelectedDentista({ ...selectedDentista, billingInterval: val });
                          }
                        }}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-purple-500"
                      >
                        <option value="1 mese">1 Mese (Mensile)</option>
                        <option value="3 mesi">3 Mesi (Trimestrale)</option>
                        <option value="1 anno">1 Anno (Annuale)</option>
                        <option value="personalizzata">Personalizzata (Inserisci Manuale)</option>
                      </select>
                    </div>
                  </div>

                  {/* CAMPO DI TESTO PER INSERIRE UN PERIODO PERSONALIZZATO MANUALE */}
                  {!["1 mese", "3 mesi", "1 anno"].includes(selectedDentista.billingInterval) && (
                    <div className="pt-2 border-t border-purple-100">
                      <label className="text-[9px] font-black uppercase text-purple-700 block mb-1">Periodo Personalizzato Manuale (es. 45 giorni, 2 mesi, 6 mesi)</label>
                      <input 
                        type="text" 
                        value={selectedDentista.billingInterval}
                        onChange={(e) => setSelectedDentista({ ...selectedDentista, billingInterval: e.target.value })}
                        placeholder="Es. 45 giorni, 60 giorni, 2 mesi..."
                        className="w-full bg-white border border-purple-300 rounded-xl px-3 py-2 text-xs font-bold text-purple-900 focus:outline-none focus:border-purple-600"
                        required
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">Telefono</label>
                  <input 
                    type="text" 
                    value={selectedDentista.phone}
                    onChange={(e) => setSelectedDentista({ ...selectedDentista, phone: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">Email Contatto</label>
                  <input 
                    type="email" 
                    value={selectedDentista.email}
                    onChange={(e) => setSelectedDentista({ ...selectedDentista, email: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">Stato Contratto Generale</label>
                  <select 
                    value={selectedDentista.status}
                    onChange={(e) => setSelectedDentista({ ...selectedDentista, status: e.target.value as ClientContract['status'] })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-purple-500"
                  >
                    <option value="attivo">ATTIVO</option>
                    <option value="sollecito">SOLLECITO</option>
                    <option value="sospeso">SOSPESO</option>
                    <option value="disdetto">DISDETTO</option>
                    <option value="non_reperibile">NON REPERIBILE</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-900 mb-1 uppercase text-[10px] tracking-wider text-slate-400 block">Note di Servizio & Registri</label>
                <textarea 
                  rows={3}
                  value={selectedDentista.notes}
                  onChange={(e) => setSelectedDentista({ ...selectedDentista, notes: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-medium text-slate-800 focus:outline-none focus:border-purple-500 leading-relaxed"
                />
              </div>

              {/* TABLE SCADENZARIO PAGAMENTI EDITABILE CON PROSSIMA SCADENZA */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-bold text-slate-900 uppercase text-[10px] tracking-wider text-slate-400">Scadenzario Pagamenti & Prossima Scadenza</h4>
                  <span className="text-[10px] text-purple-600 font-bold bg-purple-50 px-2 py-0.5 rounded-md">Aggiornamento Automatico Scadenze</span>
                </div>

                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase">
                      <tr>
                        <th className="p-3">Data Scadenza</th>
                        <th className="p-3">Importo (€)</th>
                        <th className="p-3">Stato Pagamento</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {selectedDentista.payments.map((p, index) => (
                        <tr key={p.id || index} className="hover:bg-slate-50/50">
                          {/* SELETTORE DATA SCADENZA */}
                          <td className="p-2">
                            <input 
                              type="date" 
                              value={p.date}
                              onChange={(e) => {
                                const newDate = e.target.value;
                                const updatedPayments = [...selectedDentista.payments];
                                updatedPayments[index] = { ...updatedPayments[index], date: newDate };
                                setSelectedDentista({ ...selectedDentista, payments: updatedPayments });
                              }}
                              className="bg-white border border-slate-200 rounded-lg px-2 py-1 font-mono font-bold text-slate-900 text-xs focus:outline-none focus:border-purple-500"
                            />
                          </td>

                          {/* IMPORTO */}
                          <td className="p-2">
                            <input 
                              type="number" 
                              value={p.amount}
                              onChange={(e) => {
                                const newAmount = parseFloat(e.target.value) || 0;
                                const updatedPayments = [...selectedDentista.payments];
                                updatedPayments[index] = { ...updatedPayments[index], amount: newAmount };
                                setSelectedDentista({ ...selectedDentista, payments: updatedPayments });
                              }}
                              className="w-24 bg-white border border-slate-200 rounded-lg px-2 py-1 font-bold text-slate-900 text-xs focus:outline-none focus:border-purple-500"
                            />
                          </td>

                          {/* CAMBIO STATO CON COLORI DEDICATI ED AGGIORNAMENTO AUTOMATICO SCADENZA */}
                          <td className="p-2">
                            <select 
                              value={p.status}
                              onChange={(e) => {
                                const newStatus = e.target.value as Payment['status'];
                                let updatedPayments = [...selectedDentista.payments];
                                updatedPayments[index] = { ...updatedPayments[index], status: newStatus };

                                // Se viene impostato in PAGATO, crea automaticamente la nuova scadenza in ATTESA basandosi sul termine scelto
                                if (newStatus === 'pagato') {
                                  const currentDate = p.date || new Date().toISOString().split('T')[0];
                                  const nextDate = addIntervalToDate(currentDate, selectedDentista.billingInterval || '3 mesi');

                                  const hasFuture = updatedPayments.some((pay, i) => i > index);
                                  if (!hasFuture) {
                                    updatedPayments.push({
                                      id: `pay_${Date.now()}`,
                                      date: nextDate,
                                      amount: selectedDentista.monthlyFee,
                                      status: 'in_attesa'
                                    });
                                  } else {
                                    if (updatedPayments[index + 1]) {
                                      updatedPayments[index + 1].status = 'in_attesa';
                                      if (!updatedPayments[index + 1].date) {
                                        updatedPayments[index + 1].date = nextDate;
                                      }
                                    }
                                  }
                                }

                                setSelectedDentista({ 
                                  ...selectedDentista, 
                                  payments: updatedPayments,
                                  status: newStatus === 'pagato' ? 'attivo' : (newStatus === 'disdetto' ? 'disdetto' : (newStatus === 'sospeso' ? 'sospeso' : selectedDentista.status))
                                });
                              }}
                              className={`border rounded-lg px-2 py-1 font-black text-xs focus:outline-none transition-all ${
                                p.status === 'pagato' ? 'bg-emerald-100 text-emerald-800 border-emerald-300' :
                                p.status === 'in_attesa' ? 'bg-amber-100 text-amber-900 border-amber-300' :
                                p.status === 'insoluto' ? 'bg-red-100 text-red-900 border-red-300' :
                                p.status === 'sospeso' ? 'bg-orange-100 text-orange-900 border-orange-300' :
                                'bg-slate-200 text-slate-800 border-slate-300'
                              }`}
                            >
                              <option value="pagato" className="bg-white text-emerald-800 font-bold">🟢 PAGATO</option>
                              <option value="in_attesa" className="bg-white text-amber-900 font-bold">🟡 IN ATTESA</option>
                              <option value="insoluto" className="bg-white text-red-900 font-bold">🔴 INSOLUTO</option>
                              <option value="sospeso" className="bg-white text-orange-900 font-bold">🟠 SOSPESO</option>
                              <option value="disdetto" className="bg-white text-slate-800 font-bold">⚪ DISDETTO</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button 
                  type="button"
                  onClick={() => alert(`Stampa sollecito/verbale per ${selectedDentista.name}`)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl flex items-center gap-2 text-xs"
                >
                  <Printer className="w-4 h-4" /> Stampa Verbale
                </button>
                <button 
                  type="submit"
                  className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-xs shadow-md shadow-purple-600/20 transition-all flex items-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" /> Salva Modifiche
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
