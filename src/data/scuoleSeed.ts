import excelMasterScuole from './scuole_full_excel_master.json';

export interface ScuolaPayment {
  id: string;
  date: string;
  amount: number;
  status: 'pagato' | 'in_attesa' | 'insoluto' | 'sospeso' | 'disdetto';
  invoiceNumber?: string;
  invoiceDate?: string;
  refertoData?: string;
  consegnaReferti?: string;
}

export interface ScuolaContract {
  id: string;
  name: string;
  paese: string;
  city: string;
  phone: string;
  email: string;
  contractNumber: number | null;
  billingInterval: string;
  monthlyFee: number;
  status: 'attivo' | 'sollecito' | 'sospeso' | 'disdetto' | 'non_reperibile';
  notes: string;
  letter: string;
  nCampioni?: number | string;
  payments: ScuolaPayment[];
}

export function generateInitialScuole(): ScuolaContract[] {
  return excelMasterScuole as ScuolaContract[];
}
