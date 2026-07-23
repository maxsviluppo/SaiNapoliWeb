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

export interface AmministratoreContract {
  id: string;
  name: string;
  letter: string;
  contractNumber: number | null;
  status: 'attivo' | 'sospeso' | 'disdetto' | 'sollecito' | 'non_reperibile';
  city: string;
  paese: string;
  phone: string;
  email: string;
  condominiums: string[];
  monthlyFee: number;
  billingInterval: string;
  startDate: string;
  notes: string;
  payments: Payment[];
  referti: Referto[];
  nCampioni?: string;
}

export function generateInitialAmministratori(): AmministratoreContract[] {
  return excelMasterAmministratori as AmministratoreContract[];
}
