import excelMasterDentisti from './dentisti_full_excel_master.json';

export interface Payment {
  id: string;
  date: string;
  amount: number;
  status: 'pagato' | 'in_attesa' | 'insoluto' | 'disdetto' | 'sospeso';
  invoiceNumber?: string;
  invoiceDate?: string;
  invoiceAmount?: number;
  refertoData?: string;
  consegnaReferti?: string;
}

export interface Referto {
  id: string;
  metodoConsegna: 'cartacea' | 'ritiro_in_ufficio' | 'email';
  emailConsegna?: string;
  dataConsegna: string;
}

export interface ClientContract {
  id: string;
  name: string;
  letter: string;
  contractNumber: number | null;
  status: 'attivo' | 'sospeso' | 'disdetto' | 'sollecito' | 'non_reperibile';
  city: string;
  paese: string;
  phone: string;
  email: string;
  monthlyFee: number;
  billingInterval: string;
  startDate: string;
  notes: string;
  payments: Payment[];
  referti: Referto[];
  nCampioni?: string;
}

export function hasOverduePayment(payments: Payment[]): boolean {
  if (!payments || payments.length === 0) return false;
  return payments.some(p => p.status === 'insoluto');
}

export function getExpiryStatus(dueDateStr: string): 'scaduto' | 'in_scadenza' | 'regolare' {
  if (!dueDateStr) return 'regolare';
  const today = new Date();
  today.setHours(0,0,0,0);
  const due = new Date(dueDateStr);
  if (isNaN(due.getTime())) return 'regolare';
  
  const diffDays = Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays < 0) return 'scaduto';
  if (diffDays <= 15) return 'in_scadenza';
  return 'regolare';
}

export function addIntervalToDate(dateStr: string, intervalStr: string): string {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;

  const s = (intervalStr || '1 anno').toLowerCase().trim();
  if (s === '1 mese' || s === 'mensile') {
    date.setMonth(date.getMonth() + 1);
  } else if (s === '3 mesi' || s === 'trimestrale') {
    date.setMonth(date.getMonth() + 3);
  } else if (s === '1 anno' || s === 'annuale') {
    date.setFullYear(date.getFullYear() + 1);
  } else {
    const match = s.match(/(\d+)\s*(giorn[oi]|mes[ei]|ann[oi])/);
    if (match) {
      const num = parseInt(match[1]);
      const unit = match[2];
      if (unit.startsWith('giorn')) {
        date.setDate(date.getDate() + num);
      } else if (unit.startsWith('mes')) {
        date.setMonth(date.getMonth() + num);
      } else if (unit.startsWith('ann')) {
        date.setFullYear(date.getFullYear() + num);
      }
    } else {
      date.setFullYear(date.getFullYear() + 1);
    }
  }
  return isNaN(date.getTime()) ? dateStr : date.toISOString().split('T')[0];
}

const parseDateSafe = (value?: string): Date | null => {
  if (!value) return null;
  const parsed = new Date(value);
  return isNaN(parsed.getTime()) ? null : parsed;
};

/** Prossima scadenza calcolata in modo sicuro (evita crash su date invalide). */
export function getNextDueDate(payments: Payment[], billingInterval?: string): string | null {
  if (!payments || payments.length === 0) return null;

  const sorted = [...payments].sort((a, b) => {
    const ta = parseDateSafe(a.date)?.getTime() ?? Number.NaN;
    const tb = parseDateSafe(b.date)?.getTime() ?? Number.NaN;
    if (isNaN(ta) && isNaN(tb)) return 0;
    if (isNaN(ta)) return 1;
    if (isNaN(tb)) return -1;
    return ta - tb;
  });

  const lastPaid = [...sorted].reverse().find(p => p.status === 'pagato' && p.date);
  if (lastPaid?.date) {
    const next = addIntervalToDate(lastPaid.date, billingInterval || '1 anno');
    return parseDateSafe(next) ? next : null;
  }

  const fallback = sorted[sorted.length - 1]?.date;
  if (!fallback) return null;
  return parseDateSafe(fallback) ? fallback : null;
}

export function matchesMonthYearFilter(
  dueDateStr: string | null,
  selectedMonth: string,
  selectedYear: string
): boolean {
  if (!dueDateStr) return false;
  const due = parseDateSafe(dueDateStr);
  if (!due) return false;

  const month = (due.getMonth() + 1).toString();
  const year = due.getFullYear().toString();

  if (selectedMonth !== 'all' && month !== selectedMonth) return false;
  if (selectedYear !== 'all' && year !== selectedYear) return false;
  return true;
}

export function generateInitialDentisti(): ClientContract[] {
  return excelMasterDentisti as ClientContract[];
}
