import excelMasterAmministratori from './amministratori_full_excel_master.json';
import { Payment, addIntervalToDate } from './dentistiSeed';

export type { Payment };
export { addIntervalToDate };

export interface Referto {
  id: string;
  metodoConsegna: 'cartacea' | 'ritiro_in_ufficio' | 'email';
  emailConsegna?: string;
  dataConsegna: string;
}

export type CondominiumDueFrequency = 'mensile' | 'trimestrale' | 'annuale' | 'personalizzato';

export interface Condominium {
  id: string;
  name: string;
  address: string;
  city: string;
  partitaIva?: string;
  codiceFiscale?: string;
  invoiceNumber?: string;
  invoiceDate?: string;
  dueDate?: string;
  dueFrequency?: CondominiumDueFrequency;
  customFrequencyDays?: number;
  portiere?: string;
  portierePhone?: string;
  notes?: string;
}

export interface AmministratoreContract {
  id: string;
  name: string;
  letter: string;
  contractNumber: number | null;
  status: 'attivo' | 'sospeso' | 'disdetto' | 'sollecito' | 'non_reperibile';
  city: string;
  paese: string;
  phone: string;
  mobile?: string;
  email: string;
  condominiums: Condominium[];
  monthlyFee: number;
  billingInterval: string;
  startDate: string;
  notes: string;
  payments: Payment[];
  referti: Referto[];
  nCampioni?: string;
}

export function createEmptyCondominium(name = ''): Condominium {
  return {
    id: `cond_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    name,
    address: '',
    city: '',
    partitaIva: '',
    codiceFiscale: '',
    invoiceNumber: '',
    invoiceDate: '',
    dueDate: '',
    dueFrequency: 'annuale',
    customFrequencyDays: 30,
    portiere: '',
    portierePhone: '',
    notes: '',
  };
}

export function getCondominiumIntervalLabel(freq: CondominiumDueFrequency): string {
  switch (freq) {
    case 'mensile': return '1 mese';
    case 'trimestrale': return '3 mesi';
    case 'annuale': return '1 anno';
    default: return '';
  }
}

export function computeCondominiumDueDate(
  invoiceDate: string,
  frequency: CondominiumDueFrequency = 'annuale',
  customDays?: number
): string {
  if (!invoiceDate) return '';
  if (frequency === 'personalizzato') {
    if (!customDays || customDays <= 0) return '';
    const date = new Date(invoiceDate);
    if (isNaN(date.getTime())) return '';
    date.setDate(date.getDate() + customDays);
    return date.toISOString().split('T')[0];
  }
  return addIntervalToDate(invoiceDate, getCondominiumIntervalLabel(frequency));
}

export function getCondominiumFrequencyLabel(freq?: CondominiumDueFrequency, customDays?: number): string {
  switch (freq) {
    case 'mensile': return 'Mensile';
    case 'trimestrale': return 'Trimestrale';
    case 'annuale': return 'Annuale';
    case 'personalizzato': return customDays ? `Personalizzato (${customDays} gg)` : 'Personalizzato';
    default: return 'Annuale';
  }
}

export function normalizeCondominium(raw: string | Condominium, index = 0): Condominium {
  if (typeof raw === 'string') {
    const trimmed = raw.trim();
    return createEmptyCondominium(trimmed);
  }
  return {
    ...createEmptyCondominium(),
    ...raw,
    id: raw.id || `cond_${index}_${Math.random().toString(36).slice(2, 7)}`,
    name: raw.name || '',
    dueFrequency: raw.dueFrequency || 'annuale',
    customFrequencyDays: raw.customFrequencyDays ?? 30,
  };
}

export interface RawAmministratoreContract extends Omit<AmministratoreContract, 'condominiums'> {
  condominiums: (string | Condominium)[];
}

export function normalizeAmministratore(admin: RawAmministratoreContract): AmministratoreContract {
  return {
    ...admin,
    condominiums: (admin.condominiums || []).map((c, i) => normalizeCondominium(c, i)),
  };
}

export function getCondominiumDisplayName(cond: Condominium | string): string {
  return typeof cond === 'string' ? cond : (cond.name || 'Condominio senza nome');
}

export function generateInitialAmministratori(): AmministratoreContract[] {
  return (excelMasterAmministratori as RawAmministratoreContract[]).map(normalizeAmministratore);
}
