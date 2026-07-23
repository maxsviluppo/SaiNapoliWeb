"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { 
  Lock, Key, Eye, EyeOff, LogOut, Shield, Users, GraduationCap, Stethoscope, 
  BookOpen, Plus, Database, AlertCircle, Search, MapPin, Phone, Mail, ChevronLeft, ChevronRight,
  Edit, Trash2, Calendar, Euro, FileText, CheckCircle, Clock, XCircle, Printer,
  TrendingUp, Activity, AlertTriangle, FileX, FileCheck
} from 'lucide-react';
import { generateInitialDentisti, ClientContract, Payment, hasOverduePayment, addIntervalToDate, getExpiryStatus, getNextDueDate, matchesMonthYearFilter } from '../../data/dentistiSeed';
import { generateInitialAmministratori, AmministratoreContract } from '../../data/amministratoriSeed';

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

  // Amministratori state loaded from seed & localStorage safely
  const [amministratori, setAmministratori] = useState<AmministratoreContract[]>([]);
  const [selectedAmministratore, setSelectedAmministratore] = useState<AmministratoreContract | null>(null);

  // Filters & Sorting for Dentisti
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLetter, setSelectedLetter] = useState<string>('all');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);

  // Filters & Sorting for Amministratori
  const [searchQueryAdmin, setSearchQueryAdmin] = useState('');
  const [selectedLetterAdmin, setSelectedLetterAdmin] = useState<string>('all');
  const [selectedStatusFilterAdmin, setSelectedStatusFilterAdmin] = useState<string>('all');
  const [currentPageAdmin, setCurrentPageAdmin] = useState(1);

  const [paymentToDelete, setPaymentToDelete] = useState<{isAdmin: boolean, index: number} | null>(null);
  const [clientToDelete, setClientToDelete] = useState<{ id: string, name: string, isAdmin: boolean } | null>(null);
  // Sorting State for Amministratori
  const [sortFieldAdmin, setSortFieldAdmin] = useState<'name' | 'paese' | 'contractNumber' | 'monthlyFee' | 'status'>('contractNumber');
  const [sortOrderAdmin, setSortOrderAdmin] = useState<'asc' | 'desc'>('asc');

  // Sorting State for Dentisti
  const [sortFieldDentisti, setSortFieldDentisti] = useState<'name' | 'paese' | 'contractNumber' | 'monthlyFee' | 'status'>('contractNumber');
  const [sortOrderDentisti, setSortOrderDentisti] = useState<'asc' | 'desc'>('asc');

  const handleSortAdmin = (field: 'name' | 'paese' | 'contractNumber' | 'monthlyFee' | 'status') => {
    setCurrentPageAdmin(1);
    if (sortFieldAdmin === field) {
      setSortOrderAdmin(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortFieldAdmin(field);
      setSortOrderAdmin('asc');
    }
  };

  const handleSortDentisti = (field: 'name' | 'paese' | 'contractNumber' | 'monthlyFee' | 'status') => {
    setCurrentPage(1);
    if (sortFieldDentisti === field) {
      setSortOrderDentisti(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortFieldDentisti(field);
      setSortOrderDentisti('asc');
    }
  };

  const [printClient, setPrintClient] = useState<ClientContract | AmministratoreContract | null>(null);
  const [printDentistiList, setPrintDentistiList] = useState(false);
  const [printAmministratoriList, setPrintAmministratoriList] = useState(false);
  
  // New Payment Invoice States (Dentisti)
  const [newInvoiceNumber, setNewInvoiceNumber] = useState('');
  const [newInvoiceDate, setNewInvoiceDate] = useState('');
  const [newInvoiceAmount, setNewInvoiceAmount] = useState<number | ''>('');
  
  // New Payment Invoice States (Amministratori)
  const [newInvoiceNumberAdmin, setNewInvoiceNumberAdmin] = useState('');
  const [newInvoiceDateAdmin, setNewInvoiceDateAdmin] = useState('');
  const [newInvoiceAmountAdmin, setNewInvoiceAmountAdmin] = useState<number | ''>('');

  // Referti States
  const [newRefertoMetodo, setNewRefertoMetodo] = useState<'cartacea' | 'ritiro_in_ufficio' | 'email'>('cartacea');
  const [newRefertoEmail, setNewRefertoEmail] = useState('');
  const [newRefertoDate, setNewRefertoDate] = useState(new Date().toISOString().split('T')[0]);



  const [selectedMonth, setSelectedMonth] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  
  const [selectedMonthAdmin, setSelectedMonthAdmin] = useState<string>('all');
  const [selectedYearAdmin, setSelectedYearAdmin] = useState<string>('all');

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
      localStorage.setItem('sai_dentisti_db_v11', JSON.stringify(seed));
    } catch (e) {
      console.warn("Storage quota exceeded, keeping in-memory state:", e);
    }

    const seedAdmin = generateInitialAmministratori();
    setAmministratori(seedAdmin);
    try {
      localStorage.setItem('sai_amministratori_db', JSON.stringify(seedAdmin));
    } catch (e) {
      console.warn("Storage quota exceeded, keeping in-memory state:", e);
    }
  }, []);

  const saveDentisti = (newList: ClientContract[]) => {
    setDentisti(newList);
    try {
      localStorage.setItem('sai_dentisti_db_v11', JSON.stringify(newList));
    } catch (e) {
      console.warn("Could not save to localStorage due to quota:", e);
    }
  };

  const saveAmministratori = (newList: AmministratoreContract[]) => {
    setAmministratori(newList);
    try {
      localStorage.setItem('sai_amministratori_db', JSON.stringify(newList));
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
    let filtered = dentisti;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(d => 
        d.name.toLowerCase().includes(q) || 
        d.email.toLowerCase().includes(q)
      );
    }

    if (selectedLetter !== 'all') {
      filtered = filtered.filter(d => d.letter === selectedLetter);
    }

    if (selectedStatusFilter !== 'all') {
      if (selectedStatusFilter === 'scaduti') {
        const todayStr = new Date().toISOString().split('T')[0];
        filtered = filtered.filter(d => {
          if (d.status !== 'attivo') return false;
          const nextDueDateStr = getNextDueDate(d.payments, d.billingInterval);
          return !!nextDueDateStr && nextDueDateStr < todayStr;
        });
      } else {
        filtered = filtered.filter(d => d.status === selectedStatusFilter);
      }
    }
    
    if (selectedMonth !== 'all' || selectedYear !== 'all') {
      filtered = filtered.filter(d =>
        matchesMonthYearFilter(getNextDueDate(d.payments, d.billingInterval), selectedMonth, selectedYear)
      );
    }

    return [...filtered].sort((a, b) => {
      const valA = a[sortFieldDentisti];
      const valB = b[sortFieldDentisti];
      if (typeof valA === 'number' && typeof valB === 'number') {
        return sortOrderDentisti === 'asc' ? valA - valB : valB - valA;
      }
      const strA = String(valA || '').toLowerCase();
      const strB = String(valB || '').toLowerCase();
      return sortOrderDentisti === 'asc' ? strA.localeCompare(strB) : strB.localeCompare(strA);
    });
  }, [dentisti, searchQuery, selectedLetter, selectedStatusFilter, selectedMonth, selectedYear, sortFieldDentisti, sortOrderDentisti]);

  // Paginated Dentisti
  const totalPages = Math.ceil(filteredDentisti.length / itemsPerPage) || 1;
  const paginatedDentisti = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredDentisti.slice(start, start + itemsPerPage);
  }, [filteredDentisti, currentPage]);

  const MONTH_NAMES = ['', 'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];

  const dentistiFilterSummary = useMemo(() => {
    const parts: string[] = [];
    if (searchQuery.trim()) parts.push(`Ricerca: "${searchQuery.trim()}"`);
    if (selectedLetter !== 'all') parts.push(`Lettera: ${selectedLetter}`);
    if (selectedStatusFilter !== 'all') {
      const statusLabels: Record<string, string> = {
        attivo: 'Attivo',
        sollecito: 'Sollecito',
        sospeso: 'Sospeso',
        disdetto: 'Disdetto',
        non_reperibile: 'Non reperibile',
        scaduti: 'Scaduti',
      };
      parts.push(`Stato: ${statusLabels[selectedStatusFilter] || selectedStatusFilter}`);
    }
    if (selectedMonth !== 'all') parts.push(`Mese scadenza: ${MONTH_NAMES[parseInt(selectedMonth, 10)]}`);
    if (selectedYear !== 'all') parts.push(`Anno scadenza: ${selectedYear}`);
    return parts.length ? parts.join(' · ') : 'Nessun filtro attivo — elenco completo';
  }, [searchQuery, selectedLetter, selectedStatusFilter, selectedMonth, selectedYear]);

  const getDentistaStatusLabel = (c: ClientContract) => {
    const todayStr = new Date().toISOString().split('T')[0];
    const isOverdueActive = c.status === 'attivo' && c.payments.some(p => (p.status === 'in_attesa' || p.status === 'insoluto') && p.date < todayStr);
    if (c.status === 'attivo' && !isOverdueActive) return 'ATTIVO';
    if (c.status === 'attivo' && isOverdueActive) return 'ATTIVO (SCADUTO)';
    if (c.status === 'sollecito') return 'SOLLECITO';
    if (c.status === 'sospeso') return 'SOSPESO';
    if (c.status === 'disdetto') return 'DISDETTO';
    if (c.status === 'non_reperibile') return 'NON REPERIBILE';
    return String(c.status || '').toUpperCase();
  };

  const getDentistaInvoiceSummary = (c: ClientContract) => {
    const lastInvoice = [...c.payments].reverse().find(p => p.invoiceNumber || p.invoiceDate);
    const lastPaid = [...c.payments].reverse().find(p => p.status === 'pagato');
    const dueDate = lastPaid?.date
      ? addIntervalToDate(lastPaid.date, c.billingInterval || '1 anno')
      : (c.payments[c.payments.length - 1]?.date || '');

    const invoiceText = lastInvoice
      ? `Fatt. N° ${lastInvoice.invoiceNumber || 'N/D'} del ${lastInvoice.invoiceDate || 'N/D'}`
      : 'Nessuna fattura';
    const dueText = dueDate ? `Scadenza: ${dueDate}` : '';

    return { invoiceText, dueText };
  };

  const amministratoriFilterSummary = useMemo(() => {
    const parts: string[] = [];
    if (searchQueryAdmin.trim()) parts.push(`Ricerca: "${searchQueryAdmin.trim()}"`);
    if (selectedLetterAdmin !== 'all') parts.push(`Lettera: ${selectedLetterAdmin}`);
    if (selectedStatusFilterAdmin !== 'all') {
      const statusLabels: Record<string, string> = {
        attivo: 'Attivo',
        sollecito: 'Sollecito',
        sospeso: 'Sospeso',
        disdetto: 'Disdetto',
        non_reperibile: 'Non reperibile',
        scaduti: 'Scaduti',
      };
      parts.push(`Stato: ${statusLabels[selectedStatusFilterAdmin] || selectedStatusFilterAdmin}`);
    }
    if (selectedMonthAdmin !== 'all') parts.push(`Mese scadenza: ${MONTH_NAMES[parseInt(selectedMonthAdmin, 10)]}`);
    if (selectedYearAdmin !== 'all') parts.push(`Anno scadenza: ${selectedYearAdmin}`);
    return parts.length ? parts.join(' · ') : 'Nessun filtro attivo — elenco completo';
  }, [searchQueryAdmin, selectedLetterAdmin, selectedStatusFilterAdmin, selectedMonthAdmin, selectedYearAdmin]);

  const getAmministratoreStatusLabel = (c: AmministratoreContract) => {
    const todayStr = new Date().toISOString().split('T')[0];
    const isOverdueActive = c.status === 'attivo' && c.payments.some(p => (p.status === 'in_attesa' || p.status === 'insoluto') && p.date < todayStr);
    if (c.status === 'attivo' && !isOverdueActive) return 'ATTIVO';
    if (c.status === 'attivo' && isOverdueActive) return 'ATTIVO (SCADUTO)';
    if (c.status === 'sollecito') return 'SOLLECITO';
    if (c.status === 'sospeso') return 'SOSPESO';
    if (c.status === 'disdetto') return 'DISDETTO';
    if (c.status === 'non_reperibile') return 'NON REPERIBILE';
    return String(c.status || '').toUpperCase();
  };

  const getAmministratoreInvoiceSummary = (c: AmministratoreContract) => {
    const lastInvoice = [...c.payments].reverse().find(p => p.invoiceNumber || p.invoiceDate);
    const lastPaid = [...c.payments].reverse().find(p => p.status === 'pagato');
    const dueDate = lastPaid?.date
      ? addIntervalToDate(lastPaid.date, c.billingInterval || '1 anno')
      : (c.payments[c.payments.length - 1]?.date || '');

    const invoiceText = lastInvoice
      ? `Fatt. N° ${lastInvoice.invoiceNumber || 'N/D'} del ${lastInvoice.invoiceDate || 'N/D'}`
      : 'Nessuna fattura';
    const dueText = dueDate ? `Scadenza: ${dueDate}` : '';

    return { invoiceText, dueText };
  };

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

  // --- AMMINISTRATORI LOGIC ---

  // Filtered Amministratori
  const filteredAmministratori = useMemo(() => {
    let filtered = amministratori;

    if (searchQueryAdmin) {
      const q = searchQueryAdmin.toLowerCase();
      filtered = filtered.filter(d => 
        d.name.toLowerCase().includes(q) || 
        d.email.toLowerCase().includes(q)
      );
    }

    if (selectedLetterAdmin !== 'all') {
      filtered = filtered.filter(d => d.letter === selectedLetterAdmin);
    }

    if (selectedStatusFilterAdmin !== 'all') {
      if (selectedStatusFilterAdmin === 'scaduti') {
        const todayStr = new Date().toISOString().split('T')[0];
        filtered = filtered.filter(d => {
          if (d.status !== 'attivo') return false;
          const nextDueDateStr = getNextDueDate(d.payments, d.billingInterval);
          return !!nextDueDateStr && nextDueDateStr < todayStr;
        });
      } else {
        filtered = filtered.filter(d => d.status === selectedStatusFilterAdmin);
      }
    }
    
    if (selectedMonthAdmin !== 'all' || selectedYearAdmin !== 'all') {
      filtered = filtered.filter(d =>
        matchesMonthYearFilter(getNextDueDate(d.payments, d.billingInterval), selectedMonthAdmin, selectedYearAdmin)
      );
    }

    return [...filtered].sort((a, b) => {
      const valA = a[sortFieldAdmin];
      const valB = b[sortFieldAdmin];
      if (typeof valA === 'number' && typeof valB === 'number') {
        return sortOrderAdmin === 'asc' ? valA - valB : valB - valA;
      }
      const strA = String(valA || '').toLowerCase();
      const strB = String(valB || '').toLowerCase();
      return sortOrderAdmin === 'asc' ? strA.localeCompare(strB) : strB.localeCompare(strA);
    });
  }, [amministratori, searchQueryAdmin, selectedLetterAdmin, selectedStatusFilterAdmin, selectedMonthAdmin, selectedYearAdmin, sortFieldAdmin, sortOrderAdmin]);

  // Paginated Amministratori
  const totalPagesAdmin = Math.ceil(filteredAmministratori.length / itemsPerPage) || 1;
  const paginatedAmministratori = useMemo(() => {
    const start = (currentPageAdmin - 1) * itemsPerPage;
    return filteredAmministratori.slice(start, start + itemsPerPage);
  }, [filteredAmministratori, currentPageAdmin]);

  const totalCondominiumsAdmin = useMemo(
    () => amministratori.reduce((sum, a) => sum + (a.condominiums?.length || 0), 0),
    [amministratori]
  );

  // General Statistics & MRR Revenue calculations for Amministratori
  const statsAdmin = useMemo(() => {
    const total = amministratori.length;
    const attivi = amministratori.filter(c => c.status === 'attivo').length;
    const sollecito = amministratori.filter(c => c.status === 'sollecito').length;
    const sospesi = amministratori.filter(c => c.status === 'sospeso').length;
    const disdetti = amministratori.filter(c => c.status === 'disdetto').length;
    const nonReperibili = amministratori.filter(c => c.status === 'non_reperibile').length;
    const scaduti = amministratori.filter(c => {
      const todayStr = new Date().toISOString().split('T')[0];
      return c.payments.some(p => p.status === 'in_attesa' && p.date < todayStr);
    }).length;

    // Last contract number
    const validContractNumbers = amministratori
      .map(c => c.contractNumber)
      .filter((num): num is number => num !== null);
    const lastContractNumber = validContractNumbers.length > 0 ? Math.max(...validContractNumbers) : 547;

    // Monthly Recurring Revenue (MRR)
    const activeRevenue = amministratori
      .filter(c => c.status === 'attivo')
      .reduce((sum, c) => sum + c.monthlyFee, 0);

    const pendingRevenue = amministratori
      .filter(c => c.status === 'sospeso' || c.status === 'sollecito')
      .reduce((sum, c) => sum + c.monthlyFee, 0);

    const totalMRR = activeRevenue + pendingRevenue;

    // City distribution top 5
    const cityCounts: Record<string, number> = {};
    amministratori.forEach(c => {
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
  }, [amministratori]);

  // Donut slices calculations for Amministratori
  const donutSlicesAdmin = useMemo(() => {
    const statusItems = [
      { key: 'attivo', label: 'Attivi', count: statsAdmin.attivi, color: '#10B981', bg: 'bg-emerald-500' },
      { key: 'sospeso', label: 'In Sospeso', count: statsAdmin.sospesi, color: '#F59E0B', bg: 'bg-amber-500' },
      { key: 'sollecito', label: 'Solleciti', count: statsAdmin.sollecito, color: '#EF4444', bg: 'bg-red-500' },
      { key: 'disdetto', label: 'Disdetti', count: statsAdmin.disdetti, color: '#6B7280', bg: 'bg-slate-500' },
      { key: 'non_reperibile', label: 'Non Reperibili', count: statsAdmin.nonReperibili, color: '#8B5CF6', bg: 'bg-purple-500' },
    ];

    const totalCount = statsAdmin.total || 1;
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
  }, [statsAdmin]);

  // LOGIN SCREEN
  if (!isAuthenticated) {
    
<style>{`
  @media print {
    body * {
      visibility: hidden !important;
    }
    #printable-a4-document, #printable-a4-document * {
      visibility: visible !important;
    }
    #printable-a4-document {
      position: fixed !important;
      left: 0 !important;
      top: 0 !important;
      width: 210mm !important;
      min-height: 297mm !important;
      margin: 0 !important;
      padding: 15mm !important;
      box-shadow: none !important;
      border: none !important;
      background: white !important;
    }
    .no-print {
      display: none !important;
    }
  }
`}</style>

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
    <>
    <style>{`
      @media print {
        body * {
          visibility: hidden !important;
        }
        #printable-a4-document, #printable-a4-document * {
          visibility: visible !important;
        }
        #printable-a4-document {
          position: fixed !important;
          left: 0 !important;
          top: 0 !important;
          width: 210mm !important;
          min-height: 297mm !important;
          margin: 0 !important;
          padding: 12mm !important;
          box-shadow: none !important;
          border: none !important;
          background: white !important;
        }
        .no-print {
          display: none !important;
        }
      }
    `}</style>
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
              <Stethoscope className="w-4 h-4 text-purple-500" /> Dentisti
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

          {/* INFO BOXES SIDEBAR */}
          <div className="space-y-3">
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[1.5rem] p-5 text-white shadow-lg border border-slate-700/50">
              <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400">Database Amministratori</span>
              <div className="text-2xl font-black mt-1">{amministratori.length} Anagrafiche</div>
              <p className="text-[10px] text-slate-400 mt-2 leading-relaxed">
                {statsAdmin.attivi} attivi · {totalCondominiumsAdmin.toLocaleString('it-IT')} condomini censiti
              </p>
            </div>

            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[1.5rem] p-5 text-white shadow-lg border border-slate-700/50">
              <span className="text-[9px] font-black uppercase tracking-widest text-purple-400">Database DENTISTI.SI</span>
              <div className="text-2xl font-black mt-1">{stats.total.toLocaleString('it-IT')} Studi</div>
              <p className="text-[10px] text-slate-400 mt-2 leading-relaxed">
                {stats.attivi.toLocaleString('it-IT')} attivi · Ultimo contratto N° {stats.lastContractNumber}
              </p>
            </div>

            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[1.5rem] p-5 text-white shadow-lg border border-slate-700/50">
              <span className="text-[9px] font-black uppercase tracking-widest text-blue-400">Gestionale Scuole</span>
              <div className="text-2xl font-black mt-1">0 Plessi</div>
              <p className="text-[10px] text-slate-400 mt-2 leading-relaxed">
                Modulo HACCP mensa e potabilità acque — in attivazione
              </p>
            </div>

            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[1.5rem] p-5 text-white shadow-lg border border-slate-700/50">
              <span className="text-[9px] font-black uppercase tracking-widest text-amber-400">Registri & Verbali</span>
              <div className="text-2xl font-black mt-1">0 Registri</div>
              <p className="text-[10px] text-slate-400 mt-2 leading-relaxed">
                Archivio sanificazioni, temperature e interventi ASL
              </p>
            </div>

            <div className="bg-gradient-to-br from-amber-900/40 to-slate-900 rounded-[1.5rem] p-5 text-white shadow-lg border border-amber-500/20">
              <span className="text-[9px] font-black uppercase tracking-widest text-amber-300">Riepilogo Incassi Stimati</span>
              <div className="text-xl font-black mt-1">€ {stats.totalMRR.toLocaleString('it-IT')} <span className="text-sm font-bold text-slate-400">/ mese</span></div>
              <p className="text-[10px] text-slate-400 mt-2 leading-relaxed">
                Dentisti: € {stats.activeRevenue.toLocaleString('it-IT')} · Amm.: € {statsAdmin.activeRevenue.toLocaleString('it-IT')}
              </p>
            </div>
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
                  <p className="text-[11px] text-slate-500 mt-1">{amministratori.length} Anagrafiche</p>
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

              <div className="border-t border-slate-100 pt-6">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Riepilogo Database Caricati</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-5 text-white border border-slate-700/50">
                    <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400">Amministratori</span>
                    <div className="text-2xl font-black mt-1">{amministratori.length}</div>
                    <p className="text-[10px] text-slate-400 mt-2">{statsAdmin.attivi} attivi · {statsAdmin.sollecito} solleciti · {totalCondominiumsAdmin.toLocaleString('it-IT')} condomini</p>
                  </div>
                  <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-5 text-white border border-slate-700/50">
                    <span className="text-[9px] font-black uppercase tracking-widest text-purple-400">Dentisti</span>
                    <div className="text-2xl font-black mt-1">{stats.total.toLocaleString('it-IT')}</div>
                    <p className="text-[10px] text-slate-400 mt-2">{stats.attivi.toLocaleString('it-IT')} attivi · {stats.scaduti} scaduti · MRR € {stats.totalMRR.toLocaleString('it-IT')}</p>
                  </div>
                  <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-5 text-white border border-slate-700/50">
                    <span className="text-[9px] font-black uppercase tracking-widest text-blue-400">Scuole</span>
                    <div className="text-2xl font-black mt-1">0</div>
                    <p className="text-[10px] text-slate-400 mt-2">Plessi scolastici — modulo in preparazione</p>
                  </div>
                  <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-5 text-white border border-slate-700/50">
                    <span className="text-[9px] font-black uppercase tracking-widest text-amber-400">Registri</span>
                    <div className="text-2xl font-black mt-1">0</div>
                    <p className="text-[10px] text-slate-400 mt-2">Verbali autoclavi e registri ufficiali</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: AMMINISTRATORI */}
          {activeTab === 'amministratori' && (
            <div className="space-y-8">
              
              {/* DASHBOARD STATS & ANALYTICS INSERITA DENTRO LA SEZIONE DENTISTI */}
              <div className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm text-slate-800 space-y-8">
                
                {/* Header Amministratori Dashboard */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-purple-100 text-purple-700 text-[10px] font-black uppercase tracking-wider">Database AMMINISTRATORI</span>
                      <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Gestionale Amministratori di Condominio ({filteredAmministratori.length})</h2>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">Anagrafica completa amministratori, condomini gestiti, fatture e scadenze contrattuali.</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        setPrintClient(null);
                        setPrintDentistiList(false);
                        setPrintAmministratoriList(true);
                      }}
                      className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs flex items-center gap-2 border border-slate-200 transition-all"
                    >
                      <Printer className="w-4 h-4" /> Stampa Lista
                    </button>
                    <button 
                      onClick={() => {
                        const newId = `amm_${Date.now()}`;
                        const today = new Date().toISOString().split('T')[0];
                        const maxContract = amministratori.reduce((max, d) => Math.max(max, d.contractNumber || 0), 0);
                        const newAmm: AmministratoreContract = {
                          id: newId,
                          name: 'Nuovo Amministratore',
                          letter: 'N',
                          contractNumber: maxContract > 0 ? maxContract + 1 : 100,
                          status: 'attivo',
                          city: 'Napoli',
                          paese: 'Napoli',
                          phone: '081 0000000',
                          email: 'info@nuovoamministratore.it',
                          monthlyFee: 150,
                          billingInterval: '1 anno',
                          startDate: today,
                          condominiums: ['Condominio Parco Sole'],
                          notes: 'Nuovo amministratore registrato.',
                          payments: [
                            {
                              id: `pay_${Date.now()}`,
                              date: today,
                              amount: 150,
                              status: 'in_attesa'
                            }
                          ],
                          referti: []
                        };
                        setSelectedAmministratore(newAmm);
                      }}
                      className="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold text-xs flex items-center gap-2 shadow-md shadow-purple-600/20 transition-all shrink-0"
                    >
                      <Plus className="w-4 h-4" /> Nuovo Amministratore
                    </button>
                  </div>
                </div>

                {/* 4 KPI CARDS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  
                  {/* KPI 1: Totale Amministratori */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 shadow-sm">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">Totale Amministratori</span>
                        <div className="text-3xl font-black text-slate-900 mt-1">{statsAdmin.total}</div>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold">
                        <Users className="w-5 h-5" />
                      </div>
                    </div>
                    <span className="text-[10px] text-emerald-600 font-bold mt-3 block flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span> {statsAdmin.attivi} Attivi in lista
                    </span>
                  </div>

                  {/* KPI 2: Ultimo Numero Contratto */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 shadow-sm overflow-hidden">
                    <div className="flex justify-between items-start gap-2">
                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">Ultimo N° Contratto</span>
                        <div className="mt-1 font-black text-slate-900 font-mono leading-tight break-all text-[clamp(0.7rem,1.4vw,1.05rem)]">
                          N° {statsAdmin.lastContractNumber}
                        </div>
                      </div>
                      <div className="w-10 h-10 shrink-0 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold">
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
                          € {statsAdmin.totalMRR.toLocaleString('it-IT')}
                        </div>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                        <Euro className="w-5 h-5" />
                      </div>
                    </div>
                    <span className="text-[10px] text-emerald-600 font-bold mt-3 block">
                      Incassato: € {statsAdmin.activeRevenue}
                    </span>
                  </div>

                  {/* KPI 4: Solleciti & Insoluti */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 shadow-sm">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">Solleciti & Scadenze</span>
                        <div className="text-3xl font-black text-red-600 mt-1">{statsAdmin.sollecito}</div>
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
                          {donutSlicesAdmin.map((slice) => {
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
                          <span className="text-xl font-black text-white">{statsAdmin.attivi}</span>
                        </div>
                      </div>

                      <div className="flex-1 space-y-2 w-full max-w-xs text-xs">
                        {donutSlicesAdmin.map((item) => (
                          <div 
                            key={item.key} 
                            onClick={() => { setSelectedStatusFilterAdmin(selectedStatusFilterAdmin === item.key ? 'all' : item.key); setCurrentPageAdmin(1); }}
                            className={`flex items-center justify-between p-2 rounded-xl border cursor-pointer transition-colors ${selectedStatusFilterAdmin === item.key ? 'bg-purple-900/50 border-purple-400 text-white font-bold' : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700/50 text-slate-200'}`}
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
                      {statsAdmin.topCities.map(([cityName, count]) => {
                        const percentage = (count / statsAdmin.maxCityCount) * 100;
                        return (
                          <div key={cityName} className="space-y-1">
                            <div className="flex justify-between items-center text-xs font-bold">
                              <span className="text-slate-800">{cityName}</span>
                              <span className="text-purple-600 font-mono">{count} amm.</span>
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
                    onClick={() => { setSelectedStatusFilterAdmin('all'); setCurrentPageAdmin(1); }}
                    className={`p-3 rounded-2xl border text-left transition-all ${selectedStatusFilterAdmin === 'all' ? 'bg-slate-900 text-white border-slate-900 shadow-md' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'}`}
                  >
                    <span className="text-[9px] font-black uppercase tracking-widest block opacity-70">Tutti i Contratti</span>
                    <span className="text-xl font-black">{statsAdmin.total}</span>
                  </button>

                  <button 
                    onClick={() => { setSelectedStatusFilterAdmin('attivo'); setCurrentPageAdmin(1); }}
                    className={`p-3 rounded-2xl border text-left transition-all ${selectedStatusFilterAdmin === 'attivo' ? 'bg-emerald-600 text-white border-emerald-600 shadow-md' : 'bg-emerald-50/50 border-emerald-100 hover:bg-emerald-100'}`}
                  >
                    <span className="text-[9px] font-black uppercase tracking-widest block opacity-70">Attivi</span>
                    <span className="text-xl font-black">{statsAdmin.attivi}</span>
                  </button>

                  <button 
                    onClick={() => { setSelectedStatusFilterAdmin('sollecito'); setCurrentPageAdmin(1); }}
                    className={`p-3 rounded-2xl border text-left transition-all ${selectedStatusFilterAdmin === 'sollecito' ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-red-50/50 border-red-100 hover:bg-red-100'}`}
                  >
                    <span className="text-[9px] font-black uppercase tracking-widest block opacity-70">Sollecito</span>
                    <span className="text-xl font-black">{statsAdmin.sollecito}</span>
                  </button>

                  <button 
                    onClick={() => { setSelectedStatusFilterAdmin('sospeso'); setCurrentPageAdmin(1); }}
                    className={`p-3 rounded-2xl border text-left transition-all ${selectedStatusFilterAdmin === 'sospeso' ? 'bg-amber-600 text-white border-amber-600 shadow-md' : 'bg-amber-50/50 border-amber-100 hover:bg-amber-100'}`}
                  >
                    <span className="text-[9px] font-black uppercase tracking-widest block opacity-70">Sospesi</span>
                    <span className="text-xl font-black">{statsAdmin.sospesi}</span>
                  </button>

                  <button 
                    onClick={() => { setSelectedStatusFilterAdmin('disdetto'); setCurrentPageAdmin(1); }}
                    className={`p-3 rounded-2xl border text-left transition-all ${selectedStatusFilterAdmin === 'disdetto' ? 'bg-slate-600 text-white border-slate-600 shadow-md' : 'bg-slate-100 border-slate-200 hover:bg-slate-200'}`}
                  >
                    <span className="text-[9px] font-black uppercase tracking-widest block opacity-70">Disdetti</span>
                    <span className="text-xl font-black">{statsAdmin.disdetti}</span>
                  </button>

                  <button 
                    onClick={() => { setSelectedStatusFilterAdmin('scaduti'); setCurrentPageAdmin(1); }}
                    className={`p-3 rounded-2xl border text-left transition-all ${selectedStatusFilterAdmin === 'scaduti' ? 'bg-red-800 text-white border-red-800 shadow-md' : 'bg-red-50/50 border-red-200 hover:bg-red-100 text-red-900'}`}
                  >
                    <span className="text-[9px] font-black uppercase tracking-widest block opacity-70">Scaduti</span>
                    <span className="text-xl font-black">{statsAdmin.scaduti}</span>
                  </button>
                </div>

                {/* SEARCH & ALPHABET FILTER */}
                <div className="space-y-3">
                  <div className="relative">
                    <input 
                      type="text" 
                      value={searchQueryAdmin}
                      onChange={(e) => { setSearchQueryAdmin(e.target.value); setCurrentPageAdmin(1); }}
                      placeholder="Cerca per nome amministratore, città o comune (es. Abbate, Caputo, Pozzuoli)..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 pl-11 text-xs text-slate-900 focus:outline-none focus:border-purple-500 font-medium"
                    />
                    <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  </div>

                  {/* Alphabet Bar */}
                  <div className="flex flex-wrap gap-1 bg-slate-50 p-2 rounded-2xl border border-slate-200 justify-center">
                    <button 
                      onClick={() => { setSelectedLetterAdmin('all'); setCurrentPageAdmin(1); }}
                      className={`px-2.5 py-1 rounded-xl text-[10px] font-black uppercase transition-all ${selectedLetterAdmin === 'all' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-200'}`}
                    >
                      TUTTI
                    </button>
                    {alphabet.map(l => (
                      <button 
                        key={l}
                        onClick={() => { setSelectedLetterAdmin(l); setCurrentPageAdmin(1); }}
                        className={`w-7 h-7 rounded-xl text-[10px] font-black transition-all ${selectedLetterAdmin === l ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-200'}`}
                      >
                        {l}
                      </button>
                    ))}
                  </div>

                  {/* Month & Year Expiry Filter (Amministratori) */}
                  <div className="flex flex-wrap gap-2 items-center bg-slate-50 p-2.5 rounded-2xl border border-slate-200">
                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider ml-1">Filtra Scadenza:</span>
                    <select 
                      value={selectedMonthAdmin} 
                      onChange={(e) => { setSelectedMonthAdmin(e.target.value); setCurrentPageAdmin(1); }}
                      className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 outline-none focus:border-purple-500 shadow-sm"
                    >
                      <option value="all">Tutti i Mesi</option>
                      <option value="1">Gennaio</option>
                      <option value="2">Febbraio</option>
                      <option value="3">Marzo</option>
                      <option value="4">Aprile</option>
                      <option value="5">Maggio</option>
                      <option value="6">Giugno</option>
                      <option value="7">Luglio</option>
                      <option value="8">Agosto</option>
                      <option value="9">Settembre</option>
                      <option value="10">Ottobre</option>
                      <option value="11">Novembre</option>
                      <option value="12">Dicembre</option>
                    </select>

                    <select 
                      value={selectedYearAdmin} 
                      onChange={(e) => { setSelectedYearAdmin(e.target.value); setCurrentPageAdmin(1); }}
                      className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 outline-none focus:border-purple-500 shadow-sm"
                    >
                      <option value="all">Tutti gli Anni</option>
                      <option value="2023">2023</option>
                      <option value="2024">2024</option>
                      <option value="2025">2025</option>
                      <option value="2026">2026</option>
                      <option value="2027">2027</option>
                      <option value="2028">2028</option>
                    </select>
                    
                    {(selectedMonthAdmin !== 'all' || selectedYearAdmin !== 'all') && (
                      <button 
                        onClick={() => { setSelectedMonthAdmin('all'); setSelectedYearAdmin('all'); }}
                        className="text-xs text-purple-600 font-bold hover:underline ml-auto mr-1"
                      >
                        Reset Filtri
                      </button>
                    )}
                  </div>
                </div>

                {/* AMMINISTRATORI LIST TABLE */}
                <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                  <table className="w-full table-fixed text-left border-collapse">
                    <colgroup>
                      <col className="w-[22%]" />
                      <col className="w-[14%]" />
                      <col className="w-[10%]" />
                      <col className="w-[20%]" />
                      <col className="w-[8%]" />
                      <col className="w-[14%]" />
                      <col className="w-[12%]" />
                    </colgroup>
                    <thead className="bg-slate-50 border-b border-slate-200 text-[9px] font-black text-slate-400 uppercase">
                      <tr className="select-none bg-slate-100/60 font-black text-slate-500 uppercase text-[9px] leading-tight">
                        <th onClick={() => handleSortAdmin('name')} className="px-2 py-2.5 cursor-pointer hover:bg-purple-100/50 transition-colors text-purple-900 font-extrabold text-left">
                          Amministratore {sortFieldAdmin === 'name' ? (sortOrderAdmin === 'asc' ? '▲' : '▼') : '↕'}
                        </th>
                        <th onClick={() => handleSortAdmin('paese')} className="px-2 py-2.5 cursor-pointer hover:bg-purple-100/50 transition-colors text-purple-900 font-extrabold text-left">
                          Comune {sortFieldAdmin === 'paese' ? (sortOrderAdmin === 'asc' ? '▲' : '▼') : '↕'}
                        </th>
                        <th onClick={() => handleSortAdmin('contractNumber')} className="px-2 py-2.5 cursor-pointer hover:bg-purple-100/50 transition-colors text-purple-900 font-extrabold text-left">
                          Contratto {sortFieldAdmin === 'contractNumber' ? (sortOrderAdmin === 'asc' ? '▲' : '▼') : '↕'}
                        </th>
                        <th className="px-2 py-2.5 text-left">Fattura / Scadenza</th>
                        <th className="px-2 py-2.5 text-center">Condomini</th>
                        <th onClick={() => handleSortAdmin('status')} className="px-2 py-2.5 cursor-pointer hover:bg-purple-100/50 transition-colors text-purple-900 font-extrabold text-left">
                          Stato {sortFieldAdmin === 'status' ? (sortOrderAdmin === 'asc' ? '▲' : '▼') : '↕'}
                        </th>
                        <th className="px-2 py-2.5 text-center">Scheda</th>
                      </tr>
                    </thead>
                    <tbody className="text-[11px] divide-y divide-slate-100 font-medium text-slate-700">
                      {paginatedAmministratori.map(c => {
                        const todayStr = new Date().toISOString().split('T')[0];
                        const isOverdueActive = c.status === 'attivo' && c.payments.some(p => (p.status === 'in_attesa' || p.status === 'insoluto') && p.date < todayStr);

                        return (
                          <tr key={c.id} className={`transition-colors ${isOverdueActive ? 'bg-red-50/90 hover:bg-red-100/90 text-red-900 border-l-4 border-red-500 font-bold' : 'hover:bg-purple-50/30'}`}>
                            <td className="px-2 py-2 font-bold text-slate-900 align-top">
                              <div className="flex flex-col gap-1 items-start min-w-0">
                                <span className="line-clamp-2 break-words leading-snug" title={c.name}>{c.name}</span>
                                {isOverdueActive && (
                                  <span className="px-1.5 py-0.5 bg-red-600 text-white rounded text-[8px] font-black uppercase tracking-wide animate-pulse flex items-center gap-1 w-fit shrink-0">
                                    <AlertTriangle className="w-2.5 h-2.5" /> Scaduto
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="px-2 py-2 text-slate-600 align-top">
                              <div className="line-clamp-2 break-words leading-snug" title={`${c.paese} (${c.city})`}>
                                {c.paese} <span className="text-slate-400">({c.city})</span>
                              </div>
                            </td>
                            <td className="px-2 py-2 font-mono font-bold text-slate-700 align-top whitespace-nowrap">
                              {c.contractNumber ? `N° ${c.contractNumber}` : <span className="text-slate-400 italic font-sans text-[10px]">N/D</span>}
                            </td>
                            <td className="pl-2 pr-1 py-2 font-medium align-top min-w-0">
                              {(() => {
                                const lastInvoice = [...c.payments].reverse().find(p => p.invoiceNumber || p.invoiceDate);
                                const lastPaid = [...c.payments].reverse().find(p => p.status === 'pagato');
                                const dueDate = lastPaid?.date ? addIntervalToDate(lastPaid.date, c.billingInterval || '1 anno') : (c.payments[c.payments.length - 1]?.date || '');
                                const expStatus = getExpiryStatus(dueDate);
                                return (
                                  <div className="flex flex-col gap-0.5 min-w-0">
                                    <div className="font-mono text-slate-900 font-bold text-[10px] leading-snug break-words">
                                      {lastInvoice ? (
                                        <>Fatt. {lastInvoice.invoiceNumber || 'N/D'}<br /><span className="text-slate-500 font-sans font-medium">{lastInvoice.invoiceDate || 'N/D'}</span></>
                                      ) : (
                                        <span className="text-slate-400 italic font-sans">Nessuna fattura</span>
                                      )}
                                    </div>
                                    {dueDate && (
                                      <div className="flex flex-wrap items-center gap-1 mt-0.5">
                                        <span className="text-[9px] text-slate-500 font-medium whitespace-nowrap">Scad. {dueDate}</span>
                                        {expStatus === 'in_scadenza' && (
                                          <span className="px-1 py-0.5 bg-amber-500 text-white rounded text-[8px] font-black uppercase animate-pulse shrink-0">⚠️ 15gg</span>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                );
                              })()}
                            </td>
                            <td className="px-1 py-2 text-center align-top">
                              <span className="inline-block px-1.5 py-0.5 bg-emerald-50 text-emerald-700 rounded text-[9px] font-black">{c.condominiums.length}</span>
                            </td>
                            <td className="pl-1 pr-2 py-2 align-top">
                              {c.status === 'attivo' && !isOverdueActive && <span className="inline-block px-1.5 py-0.5 bg-emerald-100 text-emerald-800 rounded text-[9px] font-black leading-snug">ATTIVO</span>}
                              {c.status === 'attivo' && isOverdueActive && <span className="inline-block px-1.5 py-0.5 bg-red-200 text-red-900 rounded text-[9px] font-black leading-snug">ATTIVO (SCADUTO)</span>}
                              {c.status === 'sollecito' && <span className="inline-block px-1.5 py-0.5 bg-red-100 text-red-800 rounded text-[9px] font-black leading-snug">SOLLECITO</span>}
                              {c.status === 'sospeso' && <span className="inline-block px-1.5 py-0.5 bg-amber-100 text-amber-800 rounded text-[9px] font-black leading-snug">SOSPESO</span>}
                              {c.status === 'disdetto' && <span className="inline-block px-1.5 py-0.5 bg-slate-200 text-slate-700 rounded text-[9px] font-black leading-snug">DISDETTO</span>}
                              {c.status === 'non_reperibile' && <span className="inline-block px-1.5 py-0.5 bg-purple-100 text-purple-800 rounded text-[9px] font-black leading-snug break-words">NON REPERIBILE</span>}
                            </td>
                            <td className="px-1 py-2 text-center align-top">
                              <button 
                                onClick={() => {
                                  let amm = { ...c };
                                  if (amm.payments && amm.payments.length > 0) {
                                    const last = amm.payments[amm.payments.length - 1];
                                    if (last.status === 'pagato') {
                                      const nextDate = addIntervalToDate(last.date || new Date().toISOString().split('T')[0], amm.billingInterval || '3 mesi');
                                      amm.payments = [
                                        ...amm.payments,
                                        {
                                          id: `pay_${Date.now()}`,
                                          date: nextDate,
                                          amount: amm.monthlyFee,
                                          status: 'in_attesa'
                                        }
                                      ];
                                    }
                                  }
                                  setSelectedAmministratore(amm);
                                }}
                                className={`px-1.5 py-1 font-bold rounded-md text-[9px] transition-all border whitespace-nowrap ${isOverdueActive ? 'bg-red-600 hover:bg-red-700 text-white border-red-700 shadow-sm' : 'bg-purple-50 hover:bg-purple-600 hover:text-white text-purple-700 border-purple-200'}`}
                              >
                                Apri
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
                  <span className="text-xs text-slate-500 font-medium">Pagina {currentPageAdmin} di {totalPagesAdmin} ({filteredAmministratori.length} amministratori)</span>
                  <div className="flex gap-2">
                    <button 
                      disabled={currentPageAdmin === 1}
                      onClick={() => setCurrentPageAdmin(prev => Math.max(prev - 1, 1))}
                      className="p-2 rounded-xl border border-slate-200 text-slate-600 disabled:opacity-30 hover:bg-slate-100"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button 
                      disabled={currentPageAdmin === totalPagesAdmin}
                      onClick={() => setCurrentPageAdmin(prev => Math.min(prev + 1, totalPagesAdmin))}
                      className="p-2 rounded-xl border border-slate-200 text-slate-600 disabled:opacity-30 hover:bg-slate-100"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

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

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        setPrintClient(null);
                        setPrintDentistiList(true);
                      }}
                      className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs flex items-center gap-2 border border-slate-200 transition-all"
                    >
                      <Printer className="w-4 h-4" /> Stampa Lista
                    </button>
                    <button 
                      onClick={() => {
                        const newId = `dentista_${Date.now()}`;
                        const today = new Date().toISOString().split('T')[0];
                        const maxContract = dentisti.reduce((max, d) => Math.max(max, d.contractNumber || 0), 0);
                        const newDentista: ClientContract = {
                          id: newId,
                          name: 'Nuovo Studio Dentistico',
                          letter: 'N',
                          contractNumber: maxContract > 0 ? maxContract + 1 : 100,
                          status: 'attivo',
                          city: 'Napoli',
                          paese: 'Napoli',
                          phone: '081 0000000',
                          email: 'info@nuovostudio.it',
                          monthlyFee: 150,
                          billingInterval: '1 anno',
                          startDate: today,
                          notes: 'Nuovo studio registrato da pannello di controllo.',
                          payments: [
                            {
                              id: `pay_${Date.now()}`,
                              date: today,
                              amount: 150,
                              status: 'in_attesa'
                            }
                          ],
                          referti: [],
                          nCampioni: ''
                        };
                        setSelectedDentista(newDentista);
                      }}
                      className="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold text-xs flex items-center gap-2 shadow-md shadow-purple-600/20 transition-all shrink-0"
                    >
                      <Plus className="w-4 h-4" /> Nuovo Studio Medico
                    </button>
                  </div>
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
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 shadow-sm overflow-hidden">
                    <div className="flex justify-between items-start gap-2">
                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">Ultimo N° Contratto</span>
                        <div className="mt-1 font-black text-slate-900 font-mono leading-tight break-all text-[clamp(0.7rem,1.4vw,1.05rem)]">
                          N° {stats.lastContractNumber}
                        </div>
                      </div>
                      <div className="w-10 h-10 shrink-0 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold">
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

                  {/* Month & Year Expiry Filter (Dentisti) */}
                  <div className="flex flex-wrap gap-2 items-center bg-slate-50 p-2.5 rounded-2xl border border-slate-200">
                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider ml-1">Filtra Scadenza:</span>
                    <select 
                      value={selectedMonth} 
                      onChange={(e) => { setSelectedMonth(e.target.value); setCurrentPage(1); }}
                      className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 outline-none focus:border-purple-500 shadow-sm"
                    >
                      <option value="all">Tutti i Mesi</option>
                      <option value="1">Gennaio</option>
                      <option value="2">Febbraio</option>
                      <option value="3">Marzo</option>
                      <option value="4">Aprile</option>
                      <option value="5">Maggio</option>
                      <option value="6">Giugno</option>
                      <option value="7">Luglio</option>
                      <option value="8">Agosto</option>
                      <option value="9">Settembre</option>
                      <option value="10">Ottobre</option>
                      <option value="11">Novembre</option>
                      <option value="12">Dicembre</option>
                    </select>

                    <select 
                      value={selectedYear} 
                      onChange={(e) => { setSelectedYear(e.target.value); setCurrentPage(1); }}
                      className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 outline-none focus:border-purple-500 shadow-sm"
                    >
                      <option value="all">Tutti gli Anni</option>
                      <option value="2025">2025</option>
                      <option value="2026">2026</option>
                      <option value="2027">2027</option>
                      <option value="2028">2028</option>
                    </select>
                    
                    {(selectedMonth !== 'all' || selectedYear !== 'all') && (
                      <button 
                        onClick={() => { setSelectedMonth('all'); setSelectedYear('all'); }}
                        className="text-xs text-purple-600 font-bold hover:underline ml-auto mr-1"
                      >
                        Reset Filtri
                      </button>
                    )}
                  </div>
                </div>

                {/* DENTISTI LIST TABLE */}
                <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                  <table className="w-full table-fixed text-left border-collapse">
                    <colgroup>
                      <col className="w-[25%]" />
                      <col className="w-[15%]" />
                      <col className="w-[12%]" />
                      <col className="w-[22%]" />
                      <col className="w-[16%]" />
                      <col className="w-[10%]" />
                    </colgroup>
                    <thead className="bg-slate-50 border-b border-slate-200 text-[9px] font-black text-slate-400 uppercase">
                      <tr className="select-none bg-slate-100/60 font-black text-slate-500 uppercase text-[9px] leading-tight">
                        <th onClick={() => handleSortDentisti('name')} className="px-2 py-2.5 cursor-pointer hover:bg-purple-100/50 transition-colors text-purple-900 font-extrabold text-left">
                          Studio / Dentista {sortFieldDentisti === 'name' ? (sortOrderDentisti === 'asc' ? '▲' : '▼') : '↕'}
                        </th>
                        <th onClick={() => handleSortDentisti('paese')} className="px-2 py-2.5 cursor-pointer hover:bg-purple-100/50 transition-colors text-purple-900 font-extrabold text-left">
                          Comune {sortFieldDentisti === 'paese' ? (sortOrderDentisti === 'asc' ? '▲' : '▼') : '↕'}
                        </th>
                        <th onClick={() => handleSortDentisti('contractNumber')} className="px-2 py-2.5 cursor-pointer hover:bg-purple-100/50 transition-colors text-purple-900 font-extrabold text-left">
                          Contratto {sortFieldDentisti === 'contractNumber' ? (sortOrderDentisti === 'asc' ? '▲' : '▼') : '↕'}
                        </th>

                        <th className="px-2 py-2.5 text-left">Fattura / Scadenza</th>
                        <th onClick={() => handleSortDentisti('status')} className="px-2 py-2.5 cursor-pointer hover:bg-purple-100/50 transition-colors text-purple-900 font-extrabold text-left">
                          Stato {sortFieldDentisti === 'status' ? (sortOrderDentisti === 'asc' ? '▲' : '▼') : '↕'}
                        </th>
                        <th className="px-2 py-2.5 text-center">Scheda</th>
                      </tr>
                    </thead>
                    <tbody className="text-[11px] divide-y divide-slate-100 font-medium text-slate-700">
                      {paginatedDentisti.map(c => {
                        // Verifica se è un utente ATTIVO ed ha superato la data di scadenza del pagamento
                        const todayStr = new Date().toISOString().split('T')[0];
                        const isOverdueActive = c.status === 'attivo' && c.payments.some(p => (p.status === 'in_attesa' || p.status === 'insoluto') && p.date < todayStr);

                        return (
                          <tr key={c.id} className={`transition-colors ${isOverdueActive ? 'bg-red-50/90 hover:bg-red-100/90 text-red-900 border-l-4 border-red-500 font-bold' : 'hover:bg-purple-50/30'}`}>
                            <td className="px-2 py-2 font-bold text-slate-900 align-top">
                              <div className="flex flex-col gap-1 items-start min-w-0">
                                <span className="line-clamp-2 break-words leading-snug" title={c.name}>{c.name}</span>
                                {isOverdueActive && (
                                  <span className="px-1.5 py-0.5 bg-red-600 text-white rounded text-[8px] font-black uppercase tracking-wide animate-pulse flex items-center gap-1 w-fit shrink-0">
                                    <AlertTriangle className="w-2.5 h-2.5" /> Scaduto
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="px-2 py-2 text-slate-600 align-top">
                              <div className="line-clamp-2 break-words leading-snug" title={`${c.paese} (${c.city})`}>
                                {c.paese} <span className="text-slate-400">({c.city})</span>
                              </div>
                            </td>
                            <td className="px-2 py-2 font-mono font-bold text-slate-700 align-top whitespace-nowrap">
                              {c.contractNumber ? `N° ${c.contractNumber}` : <span className="text-slate-400 italic font-sans text-[10px]">N/D</span>}
                            </td>

                            <td className="pl-2 pr-1 py-2 font-medium align-top min-w-0">
                              {(() => {
                                const lastInvoice = [...c.payments].reverse().find(p => p.invoiceNumber || p.invoiceDate);
                                const lastPaid = [...c.payments].reverse().find(p => p.status === 'pagato');
                                const dueDate = lastPaid?.date ? addIntervalToDate(lastPaid.date, c.billingInterval || '1 anno') : (c.payments[c.payments.length - 1]?.date || '');
                                const expStatus = getExpiryStatus(dueDate);
                                return (
                                  <div className="flex flex-col gap-0.5 min-w-0">
                                    <div className="font-mono text-slate-900 font-bold text-[10px] leading-snug break-words">
                                      {lastInvoice ? (
                                        <>Fatt. {lastInvoice.invoiceNumber || 'N/D'}<br /><span className="text-slate-500 font-sans font-medium">{lastInvoice.invoiceDate || 'N/D'}</span></>
                                      ) : (
                                        <span className="text-slate-400 italic font-sans">Nessuna fattura</span>
                                      )}
                                    </div>
                                    {dueDate && (
                                      <div className="flex flex-wrap items-center gap-1 mt-0.5">
                                        <span className="text-[9px] text-slate-500 font-medium whitespace-nowrap">Scad. {dueDate}</span>

                                        {expStatus === 'in_scadenza' && (
                                          <span className="px-1 py-0.5 bg-amber-500 text-white rounded text-[8px] font-black uppercase animate-pulse shrink-0">⚠️ 15gg</span>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                );
                              })()}
                            </td>
                            <td className="pl-1 pr-2 py-2 align-top">
                              {c.status === 'attivo' && !isOverdueActive && <span className="inline-block px-1.5 py-0.5 bg-emerald-100 text-emerald-800 rounded text-[9px] font-black leading-snug">ATTIVO</span>}
                              {c.status === 'attivo' && isOverdueActive && <span className="inline-block px-1.5 py-0.5 bg-red-200 text-red-900 rounded text-[9px] font-black leading-snug">ATTIVO (SCADUTO)</span>}
                              {c.status === 'sollecito' && <span className="inline-block px-1.5 py-0.5 bg-red-100 text-red-800 rounded text-[9px] font-black leading-snug">SOLLECITO</span>}
                              {c.status === 'sospeso' && <span className="inline-block px-1.5 py-0.5 bg-amber-100 text-amber-800 rounded text-[9px] font-black leading-snug">SOSPESO</span>}
                              {c.status === 'disdetto' && <span className="inline-block px-1.5 py-0.5 bg-slate-200 text-slate-700 rounded text-[9px] font-black leading-snug">DISDETTO</span>}
                              {c.status === 'non_reperibile' && <span className="inline-block px-1.5 py-0.5 bg-purple-100 text-purple-800 rounded text-[9px] font-black leading-snug break-words">NON REPERIBILE</span>}
                            </td>
                            <td className="px-1 py-2 text-center align-top">
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
                                className={`px-1.5 py-1 font-bold rounded-md text-[9px] transition-all border whitespace-nowrap ${isOverdueActive ? 'bg-red-600 hover:bg-red-700 text-white border-red-700 shadow-sm' : 'bg-purple-50 hover:bg-purple-600 hover:text-white text-purple-700 border-purple-200'}`}
                              >
                                Apri
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

        
      {/* MODALE ELIMINAZIONE PAGAMENTO */}
      {paymentToDelete && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl">
            <h3 className="font-black text-xl text-slate-900 mb-2">Conferma Eliminazione</h3>
            <p className="text-slate-500 text-sm mb-6">
              Sei sicuro di voler eliminare questa rata di pagamento? L'operazione non può essere annullata.
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setPaymentToDelete(null)}
                className="flex-1 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-all text-sm"
              >
                Annulla
              </button>
              <button 
                onClick={() => {
                  if (paymentToDelete.isAdmin) {
                    if (selectedAmministratore) {
                      const updated = [...selectedAmministratore.payments];
                      updated.splice(paymentToDelete.index, 1);
                      setSelectedAmministratore({...selectedAmministratore, payments: updated});
                    }
                  } else {
                    if (selectedDentista) {
                      const updated = [...selectedDentista.payments];
                      updated.splice(paymentToDelete.index, 1);
                      setSelectedDentista({...selectedDentista, payments: updated});
                    }
                  }
                  setPaymentToDelete(null);
                }}
                className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold transition-all text-sm shadow-md shadow-red-500/20"
              >
                Sì, Elimina
              </button>
            </div>
          </div>
        </div>
      )}

    
      {/* MODALE ELIMINAZIONE INTERA SCHEDA ANAGRAFICA */}
      {clientToDelete && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 text-left">
            <div className="flex items-center gap-3 text-red-600 mb-3">
              <div className="w-10 h-10 rounded-2xl bg-red-100 flex items-center justify-center font-bold">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
              </div>
              <h3 className="font-black text-lg text-slate-900">Conferma Eliminazione Scheda</h3>
            </div>
            <p className="text-slate-600 text-xs leading-relaxed mb-6">
              Sei sicuro di voler eliminare definitivamente la scheda anagrafica di <strong className="text-slate-900">{clientToDelete.name}</strong>? Tutti i pagamenti e i dati collegati verranno rimossi. L'operazione non può essere annullata.
            </p>
            <div className="flex gap-3 justify-end">
              <button 
                type="button"
                onClick={() => setClientToDelete(null)}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs"
              >
                Annulla
              </button>
              <button 
                type="button"
                onClick={() => {
                  if (clientToDelete.isAdmin) {
                    const updated = amministratori.filter(a => a.id !== clientToDelete.id);
                    setAmministratori(updated);
                    setSelectedAmministratore(null);
                    try { localStorage.setItem('sai_amministratori_db', JSON.stringify(updated)); } catch(e){}
                  } else {
                    const updated = dentisti.filter(d => d.id !== clientToDelete.id);
                    saveDentisti(updated);
                    setSelectedDentista(null);
                  }
                  setClientToDelete(null);
                }}
                className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-xs shadow-md shadow-red-500/20"
              >
                Sì, Elimina Definitivamente
              </button>
            </div>
          </div>
        </div>
      )}

    
      {/* MODALE STAMPA VERBALE A4 VERTICALE */}
      {printClient && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-md flex items-center justify-center z-[70] p-4 overflow-y-auto">
          <div className="w-full max-w-4xl flex flex-col items-center">
            {/* ACTION BAR (NO PRINT) */}
            <div className="no-print w-full max-w-[210mm] bg-slate-900 text-white rounded-t-2xl p-4 flex justify-between items-center shadow-xl">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping"></span>
                <span className="text-xs font-black uppercase tracking-wider">Anteprima Verbale A4 (Verticale)</span>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => window.print()}
                  className="px-5 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-lg transition-all cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
                  Stampa / Salva PDF
                </button>
                <button 
                  onClick={() => setPrintClient(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl text-xs transition-all cursor-pointer"
                >
                  Chiudi
                </button>
              </div>
            </div>

            {/* FOGLIO A4 STAMPABILE */}
            <div 
              id="printable-a4-document"
              className="bg-white text-slate-900 w-full max-w-[210mm] min-h-[297mm] p-10 shadow-2xl border border-slate-200 flex flex-col justify-between font-sans text-xs text-left"
            >
              <div>
                {/* TESTATA LOGO E DOCUMENTO */}
                <div className="flex justify-between items-start border-b-2 border-slate-900 pb-5 mb-6">
                  <div>
                    <h1 className="text-2xl font-black tracking-tight text-slate-900 uppercase">SAI NAPOLI WEB</h1>
                    <p className="text-[10px] font-bold text-slate-500 tracking-wider uppercase mt-0.5">Servizi Ambientali & Igiene - Registri Autoclavi & Verbali</p>
                    <p className="text-[10px] text-slate-400">Via Napoli 100, 80100 Napoli (NA) | Tel: 081 0000000 | info@sainapoli.it</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-black text-purple-700 uppercase tracking-wider">VERBALE DI VERIFICA</div>
                    <div className="text-xs font-mono font-bold text-slate-800 mt-1">N° Contratto: #{printClient.contractNumber || 'N/D'}</div>
                    <div className="text-[10px] text-slate-500 font-medium">Data Emisione: {new Date().toLocaleDateString('it-IT')}</div>
                  </div>
                </div>

                {/* SCHEDA ANAGRAFICA CLIENTE */}
                <div className="mb-6 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <h3 className="font-black text-xs uppercase tracking-wider text-purple-900 mb-3 border-b border-slate-200 pb-1">Dati Anagrafici Cliente / Studio</h3>
                  <div className="grid grid-cols-2 gap-y-2 gap-x-6">
                    <div><strong className="text-slate-500">Ragione Sociale:</strong> <span className="font-bold text-slate-900">{printClient.name}</span></div>
                    <div><strong className="text-slate-500">Stato Contratto:</strong> <span className="font-bold uppercase text-purple-700">{printClient.status}</span></div>
                    <div><strong className="text-slate-500">Comune / Città:</strong> <span className="font-bold text-slate-900">{printClient.paese} ({printClient.city})</span></div>
                    <div><strong className="text-slate-500">Telefono Studio:</strong> <span className="font-bold text-slate-900">{printClient.phone}</span></div>
                    <div><strong className="text-slate-500">Email Ufficiale:</strong> <span className="font-bold text-slate-900">{printClient.email}</span></div>
                    <div><strong className="text-slate-500">Canone / Rinnovo:</strong> <span className="font-bold text-slate-900">€{printClient.monthlyFee} / {printClient.billingInterval}</span></div>
                    {('nCampioni' in printClient) && printClient.nCampioni && (
                      <div className="col-span-2"><strong className="text-slate-500">N° Campioni Registrati:</strong> <span className="font-bold text-blue-700">{printClient.nCampioni}</span></div>
                    )}
                  </div>
                </div>

                {/* RIEPILOGO SCADENZARIO PAGAMENTI & FATTURE */}
                <div className="mb-6">
                  <h3 className="font-black text-xs uppercase tracking-wider text-slate-900 mb-2">Storico Scadenzario Pagamenti & Fatturazione</h3>
                  <table className="w-full border-collapse text-left text-[11px] border border-slate-300">
                    <thead className="bg-slate-100 font-bold text-slate-700 uppercase text-[9px]">
                      <tr>
                        <th className="border border-slate-300 p-2">Data Scadenza</th>
                        <th className="border border-slate-300 p-2">Importo Rata</th>
                        <th className="border border-slate-300 p-2">N° Fattura</th>
                        <th className="border border-slate-300 p-2">Data Fattura</th>
                                                <th className="border border-slate-300 p-2">Stato Pagamento</th>
                      </tr>
                    </thead>
                    <tbody>
                      {printClient.payments.map((p, idx) => (
                        <tr key={idx} className="border-b border-slate-200">
                          <td className="border border-slate-300 p-2 font-mono font-bold">{p.date}</td>
                          <td className="border border-slate-300 p-2 font-bold">€{p.amount}</td>
                          <td className="border border-slate-300 p-2 font-mono">{p.invoiceNumber || '-'}</td>
                          <td className="border border-slate-300 p-2 font-mono">{p.invoiceDate || '-'}</td>
                                                    <td className="border border-slate-300 p-2 uppercase font-black">{p.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* SEZIONE REFERTI SE DISPONIBILE */}
                {printClient.referti && printClient.referti.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-black text-xs uppercase tracking-wider text-slate-900 mb-2">Registro Consegna Referti Ufficiali</h3>
                    <table className="w-full border-collapse text-left text-[11px] border border-slate-300">
                      <thead className="bg-slate-100 font-bold text-slate-700 uppercase text-[9px]">
                        <tr>
                          <th className="border border-slate-300 p-2">Data Consegna</th>
                          <th className="border border-slate-300 p-2">Metodo</th>
                          <th className="border border-slate-300 p-2">Indirizzo / Note</th>
                        </tr>
                      </thead>
                      <tbody>
                        {printClient.referti.map((r, idx) => (
                          <tr key={idx} className="border-b border-slate-200">
                            <td className="border border-slate-300 p-2 font-mono font-bold">{r.dataConsegna}</td>
                            <td className="border border-slate-300 p-2 uppercase font-bold">{r.metodoConsegna}</td>
                            <td className="border border-slate-300 p-2">{r.emailConsegna || 'Rilasciato a mano'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* NOTE DI SERVIZIO */}
                {printClient.notes && (
                  <div className="mb-6 bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <h4 className="font-bold text-[10px] uppercase text-slate-400 mb-1">Note di Servizio & Registri</h4>
                    <p className="text-xs text-slate-800 leading-relaxed whitespace-pre-wrap">{printClient.notes}</p>
                  </div>
                )}
              </div>

              {/* PIÈ DI PAGINA E FIRME */}
              <div className="pt-8 border-t-2 border-slate-900 mt-6">
                <div className="grid grid-cols-2 gap-12 text-center text-xs">
                  <div>
                    <p className="font-bold text-slate-700 mb-12">Firma del Tecnico / Operatore SAI</p>
                    <div className="border-b border-slate-400 w-3/4 mx-auto"></div>
                  </div>
                  <div>
                    <p className="font-bold text-slate-700 mb-12">Timbro e Firma per Accettazione Cliente</p>
                    <div className="border-b border-slate-400 w-3/4 mx-auto"></div>
                  </div>
                </div>
                <div className="text-center text-[9px] text-slate-400 mt-8">
                  Documento generato da SAI NAPOLI WEB - Gestionale Amministratori & Dentisti | Pagina 1 di 1 (A4 Verticale)
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </main>

      {/* DETAIL & EDIT MODAL FOR DENTISTA STUDIO */}
      
      {/* DETAIL & EDIT MODAL FOR AMMINISTRATORE */}
      {selectedAmministratore && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] max-w-[96vw] xl:max-w-[1450px] w-full p-6 md:p-8 shadow-2xl border border-slate-100 flex flex-col text-left max-h-[94vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4 mb-6">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-purple-600 bg-purple-50 px-2.5 py-1 rounded-md">Modifica Scheda Amministratore</span>
                <h3 className="text-xl font-black text-slate-900 mt-1">{selectedAmministratore.name}</h3>
                <p className="text-xs text-slate-500 font-medium">Modifica i dati anagrafici, condomini gestiti, canoni e scadenze.</p>
              </div>
              <button 
                onClick={() => setSelectedAmministratore(null)}
                className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            <form 
              onSubmit={(e) => {
                e.preventDefault();
                const exists = amministratori.some(d => d.id === selectedAmministratore.id);
                let updatedList;
                if (exists) {
                  updatedList = amministratori.map(d => d.id === selectedAmministratore.id ? selectedAmministratore : d);
                } else {
                  updatedList = [selectedAmministratore, ...amministratori];
                }
                setAmministratori(updatedList);
                setSelectedAmministratore(null);
                try { localStorage.setItem('sai_amministratori_db', JSON.stringify(updatedList)); } catch(err){}
              }} 
              className="space-y-6 text-xs text-slate-700"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* COLONNA SINISTRA: ANAGRAFICA & NOTE */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                    <div className="sm:col-span-2">
                      <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">Nome Amministratore / Studio</label>
                      <input 
                        type="text" 
                        value={selectedAmministratore.name}
                        onChange={(e) => setSelectedAmministratore({ ...selectedAmministratore, name: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-purple-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">Comune / Paese</label>
                      <input 
                        type="text"
                        value={selectedAmministratore.paese}
                        onChange={(e) => setSelectedAmministratore({ ...selectedAmministratore, paese: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-purple-500"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">Città / Provincia</label>
                      <input 
                        type="text"
                        value={selectedAmministratore.city}
                        onChange={(e) => setSelectedAmministratore({ ...selectedAmministratore, city: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-purple-500"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">Numero Contratto N°</label>
                      <input 
                        type="number" 
                        value={selectedAmministratore.contractNumber || ''}
                        onChange={(e) => setSelectedAmministratore({ ...selectedAmministratore, contractNumber: e.target.value ? parseInt(e.target.value) : null })}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold font-mono text-slate-900 focus:outline-none focus:border-purple-500"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">Canone Mensile (€)</label>
                      <input 
                        type="number" 
                        value={selectedAmministratore.monthlyFee}
                        onChange={(e) => setSelectedAmministratore({ ...selectedAmministratore, monthlyFee: parseFloat(e.target.value) || 0 })}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-purple-500"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">Intervallo Rinnovo</label>
                      <select 
                        value={selectedAmministratore.billingInterval}
                        onChange={(e) => setSelectedAmministratore({ ...selectedAmministratore, billingInterval: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-purple-500"
                      >
                        <option value="1 mese">1 Mese (Mensile)</option>
                        <option value="3 mesi">3 Mesi (Trimestrale)</option>
                        <option value="1 anno">1 Anno (Annuale)</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">Telefono</label>
                      <input 
                        type="text" 
                        value={selectedAmministratore.phone}
                        onChange={(e) => setSelectedAmministratore({ ...selectedAmministratore, phone: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-purple-500"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">Email</label>
                      <input 
                        type="email" 
                        value={selectedAmministratore.email}
                        onChange={(e) => setSelectedAmministratore({ ...selectedAmministratore, email: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-purple-500"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">Stato Contratto</label>
                      <select 
                        value={selectedAmministratore.status}
                        onChange={(e) => setSelectedAmministratore({ ...selectedAmministratore, status: e.target.value as any })}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-purple-500"
                      >
                        <option value="attivo">🟢 ATTIVO</option>
                        <option value="sollecito">🔴 SOLLECITO</option>
                        <option value="sospeso">🟠 SOSPESO</option>
                        <option value="disdetto">⚪ DISDETTO</option>
                        <option value="non_reperibile">🟣 NON REPERIBILE</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-slate-900 mb-1 uppercase text-[10px] tracking-wider text-slate-400 block">Note di Servizio & Registri</label>
                    <textarea 
                      rows={3}
                      value={selectedAmministratore.notes}
                      onChange={(e) => setSelectedAmministratore({ ...selectedAmministratore, notes: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-medium text-slate-800 focus:outline-none focus:border-purple-500 leading-relaxed"
                    />
                  </div>
                </div>

                {/* COLONNA DESTRA: SCADENZARIO & REFERTI */}
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-bold text-slate-900 uppercase text-[10px] tracking-wider text-slate-400">Scadenzario Pagamenti & Prossima Scadenza</h4>
                      <span className="text-[10px] text-purple-600 font-bold bg-purple-50 px-2 py-0.5 rounded-md">Aggiornamento Automatico Scadenze</span>
                    </div>

                    <div className="border border-slate-200 rounded-xl overflow-hidden">
                      <table className="w-full table-fixed text-left border-collapse">
                        <colgroup>
                          <col className="w-[13%]" />
                          <col className="w-[10%]" />
                          <col className="w-[24%]" />
                          <col className="w-[24%]" />
                          <col className="w-[29%]" />
                        </colgroup>
                        <thead className="bg-slate-50 text-[9px] font-black text-slate-400 uppercase">
                          <tr>
                            <th className="px-1.5 py-2">Scadenza</th>
                            <th className="px-1.5 py-2">Importo</th>
                            <th className="px-1.5 py-2">Fattura (N° / Data)</th>
                            <th className="px-1.5 py-2">Consegna Referti</th>
                            <th className="px-1.5 py-2">Stato</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {selectedAmministratore.payments.map((p, index) => (
                            <tr key={p.id || index} className="hover:bg-slate-50/50">
                              <td className="px-1 py-1.5 align-top">
                                <input 
                                  type="date" 
                                  value={p.date}
                                  onChange={(e) => {
                                    const updatedPayments = [...selectedAmministratore.payments];
                                    updatedPayments[index] = { ...updatedPayments[index], date: e.target.value };
                                    setSelectedAmministratore({ ...selectedAmministratore, payments: updatedPayments });
                                  }}
                                  className="w-full min-w-0 bg-white border border-slate-200 rounded-md px-1 py-1 font-mono font-bold text-slate-900 text-[10px] focus:outline-none focus:border-purple-500"
                                />
                              </td>
                              <td className="px-1 py-1.5 align-top">
                                <input 
                                  type="number" 
                                  value={p.amount}
                                  onChange={(e) => {
                                    const updatedPayments = [...selectedAmministratore.payments];
                                    updatedPayments[index] = { ...updatedPayments[index], amount: parseFloat(e.target.value) || 0 };
                                    setSelectedAmministratore({ ...selectedAmministratore, payments: updatedPayments });
                                  }}
                                  className="w-full min-w-0 bg-white border border-slate-200 rounded-md px-1 py-1 font-bold text-slate-900 text-[10px] focus:outline-none focus:border-purple-500"
                                />
                              </td>
                              <td className="px-1 py-1.5 align-top">
                                <div className="flex items-center gap-1 min-w-0">
                                  <input 
                                    type="text" 
                                    placeholder="N°"
                                    value={p.invoiceNumber || ''}
                                    onChange={(e) => {
                                      const updatedPayments = [...selectedAmministratore.payments];
                                      updatedPayments[index] = { ...updatedPayments[index], invoiceNumber: e.target.value };
                                      setSelectedAmministratore({ ...selectedAmministratore, payments: updatedPayments });
                                    }}
                                    className="w-[38%] min-w-0 px-1 py-1 border border-slate-200 rounded-md text-[10px] bg-white font-mono"
                                  />
                                  <input 
                                    type="date" 
                                    value={p.invoiceDate || ''}
                                    onChange={(e) => {
                                      const updatedPayments = [...selectedAmministratore.payments];
                                      updatedPayments[index] = { ...updatedPayments[index], invoiceDate: e.target.value };
                                      setSelectedAmministratore({ ...selectedAmministratore, payments: updatedPayments });
                                    }}
                                    className="w-[62%] min-w-0 px-1 py-1 border border-slate-200 rounded-md text-[10px] bg-white text-slate-700"
                                  />
                                </div>
                              </td>
                              <td className="px-1 py-1.5 align-top">
                                <div className="flex flex-col gap-1 min-w-0">
                                  <input 
                                    type="date" 
                                    value={p.refertoData || ''}
                                    onChange={(e) => {
                                      const updatedPayments = [...selectedAmministratore.payments];
                                      updatedPayments[index] = { ...updatedPayments[index], refertoData: e.target.value };
                                      setSelectedAmministratore({ ...selectedAmministratore, payments: updatedPayments });
                                    }}
                                    className="w-full min-w-0 bg-white border border-slate-200 rounded-md px-1 py-1 font-mono text-[10px] focus:outline-none focus:border-purple-500"
                                    title="Data consegna referti"
                                  />
                                  <input 
                                    type="text" 
                                    placeholder="Consegna"
                                    value={p.consegnaReferti || ''}
                                    onChange={(e) => {
                                      const updatedPayments = [...selectedAmministratore.payments];
                                      updatedPayments[index] = { ...updatedPayments[index], consegnaReferti: e.target.value };
                                      setSelectedAmministratore({ ...selectedAmministratore, payments: updatedPayments });
                                    }}
                                    className="w-full min-w-0 bg-white border border-slate-200 rounded-md px-1 py-1 text-[10px] focus:outline-none focus:border-purple-500"
                                  />
                                </div>
                              </td>
                              <td className="px-1 py-1.5 align-top">
                                <select 
                                  value={p.status}
                                  onChange={(e) => {
                                    const newStatus = e.target.value as Payment['status'];
                                    const updatedPayments = [...selectedAmministratore.payments];
                                    updatedPayments[index] = { ...updatedPayments[index], status: newStatus };
                                    setSelectedAmministratore({ 
                                      ...selectedAmministratore, 
                                      payments: updatedPayments,
                                      status: newStatus === 'pagato' ? 'attivo' : (newStatus === 'disdetto' ? 'disdetto' : (newStatus === 'sospeso' ? 'sospeso' : selectedAmministratore.status))
                                    });
                                  }}
                                  className={`w-full min-w-0 border rounded-md px-1 py-1 font-black text-[10px] focus:outline-none transition-all ${
                                    p.status === 'pagato' ? 'bg-emerald-100 text-emerald-800 border-emerald-300' :
                                    p.status === 'in_attesa' ? 'bg-amber-100 text-amber-900 border-amber-300' :
                                    p.status === 'insoluto' ? 'bg-red-100 text-red-900 border-red-300' :
                                    p.status === 'sospeso' ? 'bg-orange-100 text-orange-900 border-orange-300' :
                                    'bg-slate-200 text-slate-800 border-slate-300'
                                  }`}
                                >
                                  <option value="pagato" className="bg-white text-emerald-800 font-bold">PAGATO</option>
                                  <option value="in_attesa" className="bg-white text-amber-900 font-bold">IN ATTESA</option>
                                  <option value="insoluto" className="bg-white text-red-900 font-bold">INSOLUTO</option>
                                  <option value="sospeso" className="bg-white text-orange-900 font-bold">SOSPESO</option>
                                  <option value="disdetto" className="bg-white text-slate-800 font-bold">DISDETTO</option>
                                </select>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div> {/* FINE COLONNA DESTRA */}
              </div> {/* FINE GRID DESKTOP */}

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button 
                  type="button"
                  onClick={() => setClientToDelete({ id: selectedAmministratore.id, name: selectedAmministratore.name, isAdmin: true })}
                  className="px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-xl text-xs flex items-center gap-1.5 border border-red-200 transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                  Elimina Scheda
                </button>
                
                <div className="flex items-center gap-3">
                  <button 
                    type="button"
                    onClick={() => { setPrintDentistiList(false); setPrintAmministratoriList(false); setPrintClient(selectedAmministratore); }}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl flex items-center gap-2 text-xs"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
                    Stampa Verbale
                  </button>
                  <button 
                    type="button"
                    onClick={() => setSelectedAmministratore(null)}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs"
                  >
                    Chiudi
                  </button>
                  <button 
                    type="submit"
                    className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-xs shadow-md shadow-purple-600/20 transition-all"
                  >
                    Salva Modifiche
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {selectedDentista && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] max-w-[96vw] xl:max-w-[1450px] w-full p-6 md:p-8 shadow-2xl border border-slate-100 flex flex-col text-left max-h-[94vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4 mb-6">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-purple-600 bg-purple-50 px-2.5 py-1 rounded-md">Modifica Scheda Studio Dentistico</span>
                  {selectedDentista.nCampioni && (
                    <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
                      Campioni: {selectedDentista.nCampioni}
                    </span>
                  )}
                </div>
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
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* COLONNA SINISTRA: ANAGRAFICA & NOTE */}
                <div className="lg:col-span-5 space-y-4">
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
                <div>
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">N. Campioni</label>
                  <input 
                    type="text" 
                    value={selectedDentista.nCampioni || ''}
                    onChange={(e) => setSelectedDentista({ ...selectedDentista, nCampioni: e.target.value })}
                    placeholder="Es. 3"
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

              </div> {/* FINE COLONNA SINISTRA */}

                {/* COLONNA DESTRA: SCADENZARIO, FATTURE & REFERTI */}
                <div className="lg:col-span-7 space-y-6">
                  {/* TABLE SCADENZARIO PAGAMENTI EDITABILE CON PROSSIMA SCADENZA */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-bold text-slate-900 uppercase text-[10px] tracking-wider text-slate-400">Scadenzario Pagamenti & Prossima Scadenza</h4>
                  <span className="text-[10px] text-purple-600 font-bold bg-purple-50 px-2 py-0.5 rounded-md">Aggiornamento Automatico Scadenze</span>
                </div>

                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="w-full table-fixed text-left border-collapse">
                    <colgroup>
                      <col className="w-[13%]" />
                      <col className="w-[10%]" />
                      <col className="w-[24%]" />
                      <col className="w-[24%]" />
                      <col className="w-[29%]" />
                    </colgroup>
                    <thead className="bg-slate-50 text-[9px] font-black text-slate-400 uppercase">
                      <tr>
                        <th className="px-1.5 py-2">Scadenza</th>
                        <th className="px-1.5 py-2">Importo</th>
                        <th className="px-1.5 py-2">Fattura (N° / Data)</th>
                        <th className="px-1.5 py-2">Consegna Referti</th>
                        <th className="px-1.5 py-2">Stato</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {selectedDentista.payments.map((p, index) => (
                        <tr key={p.id || index} className="hover:bg-slate-50/50">
                          {/* SELETTORE DATA SCADENZA */}
                          <td className="px-1 py-1.5 align-top">
                            <input 
                              type="date" 
                              value={p.date}
                              onChange={(e) => {
                                const newDate = e.target.value;
                                const updatedPayments = [...selectedDentista.payments];
                                updatedPayments[index] = { ...updatedPayments[index], date: newDate };
                                setSelectedDentista({ ...selectedDentista, payments: updatedPayments });
                              }}
                              className="w-full min-w-0 bg-white border border-slate-200 rounded-md px-1.5 py-1 font-mono font-bold text-slate-900 text-[10px] focus:outline-none focus:border-purple-500"
                            />
                          </td>

                          {/* IMPORTO */}
                          <td className="px-1 py-1.5 align-top">
                            <input 
                              type="number" 
                              value={p.amount}
                              onChange={(e) => {
                                const newAmount = parseFloat(e.target.value) || 0;
                                const updatedPayments = [...selectedDentista.payments];
                                updatedPayments[index] = { ...updatedPayments[index], amount: newAmount };
                                setSelectedDentista({ ...selectedDentista, payments: updatedPayments });
                              }}
                              className="w-full min-w-0 bg-white border border-slate-200 rounded-md px-1.5 py-1 font-bold text-slate-900 text-[10px] focus:outline-none focus:border-purple-500"
                            />
                          </td>

                          {/* FATTURA DETAILS (N°, Data) */}
                          <td className="px-1 py-1.5 align-top">
                            <div className="flex items-center gap-1 min-w-0">
                              <input 
                                type="text" 
                                placeholder="N°" 
                                value={p.invoiceNumber || ''} 
                                onChange={(e) => {
                                  const updatedPayments = [...selectedDentista.payments];
                                  updatedPayments[index] = { ...updatedPayments[index], invoiceNumber: e.target.value };
                                  setSelectedDentista({ ...selectedDentista, payments: updatedPayments });
                                }} 
                                className="w-[38%] min-w-0 px-1.5 py-1 border border-slate-200 rounded-md text-[10px] bg-white font-mono" 
                              />
                              <input 
                                type="date" 
                                value={p.invoiceDate || ''} 
                                onChange={(e) => {
                                  const updatedPayments = [...selectedDentista.payments];
                                  updatedPayments[index] = { ...updatedPayments[index], invoiceDate: e.target.value };
                                  setSelectedDentista({ ...selectedDentista, payments: updatedPayments });
                                }} 
                                className="w-[62%] min-w-0 px-1.5 py-1 border border-slate-200 rounded-md text-[10px] bg-white text-slate-700" 
                              />
                            </div>
                          </td>

                          {/* CONSEGNA REFERTI */}
                          <td className="px-1 py-1.5 align-top">
                            <div className="flex flex-col gap-1 min-w-0">
                              <input 
                                type="date" 
                                value={p.refertoData || ''} 
                                onChange={(e) => {
                                  const updatedPayments = [...selectedDentista.payments];
                                  updatedPayments[index] = { ...updatedPayments[index], refertoData: e.target.value };
                                  setSelectedDentista({ ...selectedDentista, payments: updatedPayments });
                                }} 
                                className="w-full min-w-0 px-1 py-1 border border-slate-200 rounded-md text-[10px] bg-white font-mono focus:outline-none focus:border-purple-500" 
                                title="Data consegna referti"
                              />
                              <input 
                                type="text" 
                                placeholder="Consegna" 
                                value={p.consegnaReferti || ''} 
                                onChange={(e) => {
                                  const updatedPayments = [...selectedDentista.payments];
                                  updatedPayments[index] = { ...updatedPayments[index], consegnaReferti: e.target.value };
                                  setSelectedDentista({ ...selectedDentista, payments: updatedPayments });
                                }} 
                                className="w-full min-w-0 px-1 py-1 border border-slate-200 rounded-md text-[10px] bg-white focus:outline-none focus:border-purple-500" 
                              />
                            </div>
                          </td>

                          {/* CAMBIO STATO CON COLORI DEDICATI ED AGGIORNAMENTO AUTOMATICO SCADENZA */}
                          <td className="px-1 py-1.5 align-top">
                            <select 
                              value={p.status}
                              onChange={(e) => {
                                const newStatus = e.target.value as Payment['status'];
                                let updatedPayments = [...selectedDentista.payments];
                                updatedPayments[index] = { ...updatedPayments[index], status: newStatus };

                                // Se viene impostato in PAGATO, crea automaticamente la nuova scadenza in ATTESA basandosi sul termine scelto
                                if (newStatus === 'pagato') {
                                  const currentDate = p.date || new Date().toISOString().split('T')[0];
                                  const nextDate = addIntervalToDate(currentDate, selectedDentista.billingInterval || '1 anno');

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
                              className={`w-full min-w-0 border rounded-md px-1 py-1 font-black text-[10px] focus:outline-none transition-all ${
                                p.status === 'pagato' ? 'bg-emerald-100 text-emerald-800 border-emerald-300' :
                                p.status === 'in_attesa' ? 'bg-amber-100 text-amber-900 border-amber-300' :
                                p.status === 'insoluto' ? 'bg-red-100 text-red-900 border-red-300' :
                                p.status === 'sospeso' ? 'bg-orange-100 text-orange-900 border-orange-300' :
                                'bg-slate-200 text-slate-800 border-slate-300'
                              }`}
                            >
                              <option value="pagato" className="bg-white text-emerald-800 font-bold">PAGATO</option>
                              <option value="in_attesa" className="bg-white text-amber-900 font-bold">IN ATTESA</option>
                              <option value="insoluto" className="bg-white text-red-900 font-bold">INSOLUTO</option>
                              <option value="sospeso" className="bg-white text-orange-900 font-bold">SOSPESO</option>
                              <option value="disdetto" className="bg-white text-slate-800 font-bold">DISDETTO</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

                </div> {/* FINE COLONNA DESTRA */}
              </div> {/* FINE GRID DESKTOP */}

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button 
                  type="button"
                  onClick={() => setClientToDelete({ id: selectedDentista.id, name: selectedDentista.name, isAdmin: false })}
                  className="px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-xl text-xs flex items-center gap-1.5 border border-red-200 transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                  Elimina Scheda
                </button>
                
                <div className="flex items-center gap-3">
                  <button 
                    type="button"
                    onClick={() => { setPrintDentistiList(false); setPrintClient(selectedDentista); }}
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
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODALE STAMPA VERBALE A4 VERTICALE */}
      {printClient && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md flex flex-col items-center justify-start z-[100] p-3 sm:p-6 overflow-y-auto">
          <div className="w-full max-w-[210mm] flex flex-col my-auto">
            
            {/* STICKY ACTION BAR (ALWAYS VISIBLE AT TOP, HIDDEN ON PRINT) */}
            <div className="no-print sticky top-0 z-[101] w-full bg-slate-900 text-white rounded-t-2xl p-4 flex flex-wrap justify-between items-center shadow-2xl border-b border-slate-800 gap-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-xs font-black uppercase tracking-wider text-slate-100">Anteprima Verbale A4 (Verticale)</span>
              </div>
              
              <div className="flex items-center gap-3">
                <button 
                  type="button"
                  onClick={() => window.print()}
                  className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-lg transition-all cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
                  Stampa / Salva PDF
                </button>
                <button 
                  type="button"
                  onClick={() => setPrintClient(null)}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl text-xs transition-all cursor-pointer border border-slate-700"
                >
                  Chiudi Anteprima
                </button>
              </div>
            </div>

            {/* FOGLIO A4 STAMPABILE (210mm x 297mm) */}
            <div 
              id="printable-a4-document"
              className="bg-white text-slate-900 w-full min-h-[297mm] p-8 sm:p-12 shadow-2xl rounded-b-2xl border border-slate-200 flex flex-col justify-between font-sans text-xs text-left"
            >
              <div>
                {/* TESTATA LOGO E DOCUMENTO */}
                <div className="flex justify-between items-start border-b-2 border-slate-900 pb-5 mb-6">
                  <div>
                    <h1 className="text-2xl font-black tracking-tight text-slate-900 uppercase">SAI NAPOLI WEB</h1>
                    <p className="text-[10px] font-bold text-slate-500 tracking-wider uppercase mt-0.5">Servizi Ambientali & Igiene - Registri Autoclavi & Verbali</p>
                    <p className="text-[10px] text-slate-400">Via Napoli 100, 80100 Napoli (NA) | Tel: 081 0000000 | info@sainapoli.it</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-black text-purple-700 uppercase tracking-wider">VERBALE DI VERIFICA</div>
                    <div className="text-xs font-mono font-bold text-slate-800 mt-1">N° Contratto: #{printClient.contractNumber || 'N/D'}</div>
                    <div className="text-[10px] text-slate-500 font-medium">Data Emissione: {new Date().toLocaleDateString('it-IT')}</div>
                  </div>
                </div>

                {/* SCHEDA ANAGRAFICA CLIENTE */}
                <div className="mb-6 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <h3 className="font-black text-xs uppercase tracking-wider text-purple-900 mb-3 border-b border-slate-200 pb-1">Dati Anagrafici Cliente / Studio</h3>
                  <div className="grid grid-cols-2 gap-y-2 gap-x-6">
                    <div><strong className="text-slate-500">Ragione Sociale:</strong> <span className="font-bold text-slate-900">{printClient.name}</span></div>
                    <div><strong className="text-slate-500">Stato Contratto:</strong> <span className="font-bold uppercase text-purple-700">{printClient.status}</span></div>
                    <div><strong className="text-slate-500">Comune / Città:</strong> <span className="font-bold text-slate-900">{printClient.paese} ({printClient.city})</span></div>
                    <div><strong className="text-slate-500">Telefono Studio:</strong> <span className="font-bold text-slate-900">{printClient.phone}</span></div>
                    <div><strong className="text-slate-500">Email Ufficiale:</strong> <span className="font-bold text-slate-900">{printClient.email}</span></div>
                    <div><strong className="text-slate-500">Canone / Rinnovo:</strong> <span className="font-bold text-slate-900">€{printClient.monthlyFee} / {printClient.billingInterval}</span></div>
                    {('nCampioni' in printClient) && printClient.nCampioni && (
                      <div className="col-span-2"><strong className="text-slate-500">N° Campioni Registrati:</strong> <span className="font-bold text-blue-700">{printClient.nCampioni}</span></div>
                    )}
                  </div>
                </div>

                {/* RIEPILOGO SCADENZARIO PAGAMENTI & FATTURE */}
                <div className="mb-6">
                  <h3 className="font-black text-xs uppercase tracking-wider text-slate-900 mb-2">Storico Scadenzario Pagamenti & Fatturazione</h3>
                  <table className="w-full border-collapse text-left text-[11px] border border-slate-300">
                    <thead className="bg-slate-100 font-bold text-slate-700 uppercase text-[9px]">
                      <tr>
                        <th className="border border-slate-300 p-2">Data Scadenza</th>
                        <th className="border border-slate-300 p-2">Importo Rata</th>
                        <th className="border border-slate-300 p-2">N° Fattura</th>
                        <th className="border border-slate-300 p-2">Data Fattura</th>
                                                <th className="border border-slate-300 p-2">Stato Pagamento</th>
                      </tr>
                    </thead>
                    <tbody>
                      {printClient.payments.map((p, idx) => (
                        <tr key={idx} className="border-b border-slate-200">
                          <td className="border border-slate-300 p-2 font-mono font-bold">{p.date}</td>
                          <td className="border border-slate-300 p-2 font-bold">€{p.amount}</td>
                          <td className="border border-slate-300 p-2 font-mono">{p.invoiceNumber || '-'}</td>
                          <td className="border border-slate-300 p-2 font-mono">{p.invoiceDate || '-'}</td>
                                                    <td className="border border-slate-300 p-2 uppercase font-black">{p.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* SEZIONE REFERTI SE DISPONIBILE */}
                {printClient.referti && printClient.referti.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-black text-xs uppercase tracking-wider text-slate-900 mb-2">Registro Consegna Referti Ufficiali</h3>
                    <table className="w-full border-collapse text-left text-[11px] border border-slate-300">
                      <thead className="bg-slate-100 font-bold text-slate-700 uppercase text-[9px]">
                        <tr>
                          <th className="border border-slate-300 p-2">Data Consegna</th>
                          <th className="border border-slate-300 p-2">Metodo</th>
                          <th className="border border-slate-300 p-2">Indirizzo / Note</th>
                        </tr>
                      </thead>
                      <tbody>
                        {printClient.referti.map((r, idx) => (
                          <tr key={idx} className="border-b border-slate-200">
                            <td className="border border-slate-300 p-2 font-mono font-bold">{r.dataConsegna}</td>
                            <td className="border border-slate-300 p-2 uppercase font-bold">{r.metodoConsegna}</td>
                            <td className="border border-slate-300 p-2">{r.emailConsegna || 'Rilasciato a mano'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* NOTE DI SERVIZIO */}
                {printClient.notes && (
                  <div className="mb-6 bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <h4 className="font-bold text-[10px] uppercase text-slate-400 mb-1">Note di Servizio & Registri</h4>
                    <p className="text-xs text-slate-800 leading-relaxed whitespace-pre-wrap">{printClient.notes}</p>
                  </div>
                )}
              </div>

              {/* PIÈ DI PAGINA E FIRME */}
              <div className="pt-8 border-t-2 border-slate-900 mt-6">
                <div className="grid grid-cols-2 gap-12 text-center text-xs">
                  <div>
                    <p className="font-bold text-slate-700 mb-12">Firma del Tecnico / Operatore SAI</p>
                    <div className="border-b border-slate-400 w-3/4 mx-auto"></div>
                  </div>
                  <div>
                    <p className="font-bold text-slate-700 mb-12">Timbro e Firma per Accettazione Cliente</p>
                    <div className="border-b border-slate-400 w-3/4 mx-auto"></div>
                  </div>
                </div>
                <div className="text-center text-[9px] text-slate-400 mt-8">
                  Documento generato da SAI NAPOLI WEB - Gestionale Amministratori & Dentisti | Pagina 1 di 1 (A4 Verticale)
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODALE STAMPA ELENCO DENTISTI A4 */}
      {printDentistiList && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md flex flex-col items-center justify-start z-[100] p-3 sm:p-6 overflow-y-auto">
          <div className="w-full max-w-[210mm] flex flex-col my-auto">
            <div className="no-print sticky top-0 z-[101] w-full bg-slate-900 text-white rounded-t-2xl p-4 flex flex-wrap justify-between items-center shadow-2xl border-b border-slate-800 gap-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-xs font-black uppercase tracking-wider text-slate-100">Anteprima Elenco Studi A4</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-lg transition-all cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  Stampa / Salva PDF
                </button>
                <button
                  type="button"
                  onClick={() => setPrintDentistiList(false)}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl text-xs transition-all cursor-pointer border border-slate-700"
                >
                  Chiudi Anteprima
                </button>
              </div>
            </div>

            <div
              id="printable-a4-document"
              className="bg-white text-slate-900 w-full min-h-[297mm] p-8 sm:p-10 shadow-2xl rounded-b-2xl border border-slate-200 flex flex-col font-sans text-xs text-left"
            >
              <div className="flex justify-between items-start border-b-2 border-slate-900 pb-4 mb-5">
                <div>
                  <h1 className="text-2xl font-black tracking-tight text-slate-900 uppercase">SAI NAPOLI WEB</h1>
                  <p className="text-[10px] font-bold text-slate-500 tracking-wider uppercase mt-0.5">Servizi Ambientali & Igiene - Registri Autoclavi & Verbali</p>
                  <p className="text-[10px] text-slate-400">Via Napoli 100, 80100 Napoli (NA) | Tel: 081 0000000 | info@sainapoli.it</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-black text-purple-700 uppercase tracking-wider">Elenco Studi Odontoiatrici</div>
                  <div className="text-[10px] text-slate-500 font-medium mt-1">Data stampa: {new Date().toLocaleDateString('it-IT')}</div>
                  <div className="text-[10px] font-bold text-slate-700 mt-1">{filteredDentisti.length} studi in elenco</div>
                </div>
              </div>

              <div className="mb-4 bg-slate-50 p-3 rounded-lg border border-slate-200">
                <p className="text-[10px] font-black uppercase tracking-wider text-purple-900 mb-1">Filtri applicati</p>
                <p className="text-[11px] text-slate-700 leading-relaxed">{dentistiFilterSummary}</p>
              </div>

              <table className="w-full border-collapse text-left text-[10px] border border-slate-300">
                <thead className="bg-slate-100 font-bold text-slate-700 uppercase text-[9px]">
                  <tr>
                    <th className="border border-slate-300 p-2 w-[24%]">Studio / Dentista</th>
                    <th className="border border-slate-300 p-2 w-[16%]">Comune / Prov.</th>
                    <th className="border border-slate-300 p-2 w-[12%]">Contratto N°</th>
                    <th className="border border-slate-300 p-2 w-[30%]">Ultima Fattura & Scadenza</th>
                    <th className="border border-slate-300 p-2 w-[18%]">Stato</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDentisti.map((c) => {
                    const { invoiceText, dueText } = getDentistaInvoiceSummary(c);
                    return (
                      <tr key={c.id} className="border-b border-slate-200 align-top">
                        <td className="border border-slate-300 p-2 font-bold text-slate-900 leading-snug break-words">{c.name}</td>
                        <td className="border border-slate-300 p-2 text-slate-700 leading-snug break-words">{c.paese} ({c.city})</td>
                        <td className="border border-slate-300 p-2 font-mono font-bold whitespace-nowrap">
                          {c.contractNumber ? `N° ${c.contractNumber}` : 'N/D'}
                        </td>
                        <td className="border border-slate-300 p-2 leading-snug">
                          <div className="font-mono font-bold text-slate-900">{invoiceText}</div>
                          {dueText && <div className="text-[9px] text-slate-500 mt-0.5">{dueText}</div>}
                        </td>
                        <td className="border border-slate-300 p-2 font-black uppercase text-[9px] leading-snug">
                          {getDentistaStatusLabel(c)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {filteredDentisti.length === 0 && (
                <p className="text-center text-slate-500 italic py-8">Nessuno studio corrisponde ai filtri selezionati.</p>
              )}

              <div className="mt-auto pt-6 border-t border-slate-200 text-[9px] text-slate-400 text-center">
                Documento generato da S.A.I. Manager — {new Date().toLocaleString('it-IT')}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODALE STAMPA ELENCO AMMINISTRATORI A4 */}
      {printAmministratoriList && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md flex flex-col items-center justify-start z-[100] p-3 sm:p-6 overflow-y-auto">
          <div className="w-full max-w-[210mm] flex flex-col my-auto">
            <div className="no-print sticky top-0 z-[101] w-full bg-slate-900 text-white rounded-t-2xl p-4 flex flex-wrap justify-between items-center shadow-2xl border-b border-slate-800 gap-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-xs font-black uppercase tracking-wider text-slate-100">Anteprima Elenco Amministratori A4</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-lg transition-all cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  Stampa / Salva PDF
                </button>
                <button
                  type="button"
                  onClick={() => setPrintAmministratoriList(false)}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl text-xs transition-all cursor-pointer border border-slate-700"
                >
                  Chiudi Anteprima
                </button>
              </div>
            </div>

            <div
              id="printable-a4-document"
              className="bg-white text-slate-900 w-full min-h-[297mm] p-8 sm:p-10 shadow-2xl rounded-b-2xl border border-slate-200 flex flex-col font-sans text-xs text-left"
            >
              <div className="flex justify-between items-start border-b-2 border-slate-900 pb-4 mb-5">
                <div>
                  <h1 className="text-2xl font-black tracking-tight text-slate-900 uppercase">SAI NAPOLI WEB</h1>
                  <p className="text-[10px] font-bold text-slate-500 tracking-wider uppercase mt-0.5">Servizi Ambientali & Igiene - Amministratori di Condominio</p>
                  <p className="text-[10px] text-slate-400">Via Napoli 100, 80100 Napoli (NA) | Tel: 081 0000000 | info@sainapoli.it</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-black text-purple-700 uppercase tracking-wider">Elenco Amministratori</div>
                  <div className="text-[10px] text-slate-500 font-medium mt-1">Data stampa: {new Date().toLocaleDateString('it-IT')}</div>
                  <div className="text-[10px] font-bold text-slate-700 mt-1">{filteredAmministratori.length} amministratori in elenco</div>
                </div>
              </div>

              <div className="mb-4 bg-slate-50 p-3 rounded-lg border border-slate-200">
                <p className="text-[10px] font-black uppercase tracking-wider text-purple-900 mb-1">Filtri applicati</p>
                <p className="text-[11px] text-slate-700 leading-relaxed">{amministratoriFilterSummary}</p>
              </div>

              <table className="w-full border-collapse text-left text-[10px] border border-slate-300">
                <thead className="bg-slate-100 font-bold text-slate-700 uppercase text-[9px]">
                  <tr>
                    <th className="border border-slate-300 p-2 w-[20%]">Amministratore</th>
                    <th className="border border-slate-300 p-2 w-[14%]">Comune / Prov.</th>
                    <th className="border border-slate-300 p-2 w-[10%]">Contratto N°</th>
                    <th className="border border-slate-300 p-2 w-[8%]">Condomini</th>
                    <th className="border border-slate-300 p-2 w-[28%]">Ultima Fattura & Scadenza</th>
                    <th className="border border-slate-300 p-2 w-[20%]">Stato</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAmministratori.map((c) => {
                    const { invoiceText, dueText } = getAmministratoreInvoiceSummary(c);
                    return (
                      <tr key={c.id} className="border-b border-slate-200 align-top">
                        <td className="border border-slate-300 p-2 font-bold text-slate-900 leading-snug break-words">{c.name}</td>
                        <td className="border border-slate-300 p-2 text-slate-700 leading-snug break-words">{c.paese} ({c.city})</td>
                        <td className="border border-slate-300 p-2 font-mono font-bold whitespace-nowrap">
                          {c.contractNumber ? `N° ${c.contractNumber}` : 'N/D'}
                        </td>
                        <td className="border border-slate-300 p-2 text-center font-bold">{c.condominiums.length}</td>
                        <td className="border border-slate-300 p-2 leading-snug">
                          <div className="font-mono font-bold text-slate-900">{invoiceText}</div>
                          {dueText && <div className="text-[9px] text-slate-500 mt-0.5">{dueText}</div>}
                        </td>
                        <td className="border border-slate-300 p-2 font-black uppercase text-[9px] leading-snug">
                          {getAmministratoreStatusLabel(c)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {filteredAmministratori.length === 0 && (
                <p className="text-center text-slate-500 italic py-8">Nessun amministratore corrisponde ai filtri selezionati.</p>
              )}

              <div className="mt-auto pt-6 border-t border-slate-200 text-[9px] text-slate-400 text-center">
                Documento generato da S.A.I. Manager — {new Date().toLocaleString('it-IT')}
              </div>
            </div>
          </div>
        </div>
      )}

      </div>
    </div>
    </>
  );
}
