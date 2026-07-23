const fs = require('fs');

const masterData = JSON.parse(fs.readFileSync('src/data/dentisti_full_excel_master.json', 'utf8'));

// Build new dentistiSeed.ts
const seedCode = `import excelMasterDentisti from './dentisti_full_excel_master.json';

export interface Payment {
  id: string;
  date: string;
  amount: number;
  status: 'pagato' | 'in_attesa' | 'insoluto' | 'disdetto' | 'sospeso';
  invoiceNumber?: string;
  invoiceDate?: string;
  invoiceAmount?: number;
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
    const match = s.match(/(\\d+)\\s*(giorn[oi]|mes[ei]|ann[oi])/);
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
  return date.toISOString().split('T')[0];
}

export function generateInitialDentisti(): ClientContract[] {
  return excelMasterDentisti as ClientContract[];
}
`;

fs.writeFileSync('src/data/dentistiSeed.ts', seedCode, 'utf8');
console.log(`Updated dentistiSeed.ts to serve all ${masterData.length} doctors from dentisti_full_excel_master.json`);
