import excelMasterRegistri from './registri_full_excel_master.json';
import { addIntervalToDate, matchesMonthYearFilter } from './dentistiSeed';

export interface RegistroPayment {
  id: string;
  date: string;
  amount: number;
  status: 'pagato' | 'in_attesa' | 'insoluto' | 'sospeso' | 'disdetto';
  invoiceNumber?: string | null;
  invoiceDate?: string | null;
  contractPeriod?: string | null;
  visitDate?: string | null;
  yearLabel?: string | null;
  paymentNote?: string;
  refertoData?: string;
  consegnaReferti?: string;
  /** Collegamento al servizio attivo (rinnovo archiviato) */
  servizioId?: string;
}

export type RegistroServiceTypeId =
  | 'sicurezza_lavoro'
  | 'sicurezza_alimentare'
  | 'legionella'
  | 'acque'
  | 'acque_piscine'
  | 'gas_radon'
  | 'formazione_alimentaristi'
  | 'autoclavi_dentisti'
  | 'gdpr';

export interface RegistroServiceCatalogItem {
  id: RegistroServiceTypeId;
  label: string;
  shortLabel: string;
  color: string;
}

export const REGISTRO_SERVICE_CATALOG: RegistroServiceCatalogItem[] = [
  { id: 'sicurezza_lavoro', label: 'Sicurezza sul lavoro', shortLabel: 'D.Lgs. 81/08', color: '#64748b' },
  { id: 'sicurezza_alimentare', label: 'Sicurezza alimentare', shortLabel: 'HACCP', color: '#d97706' },
  { id: 'legionella', label: 'Legionella', shortLabel: 'Legionella', color: '#0284c7' },
  { id: 'acque', label: 'Controllo qualità delle acque', shortLabel: 'Acque', color: '#0891b2' },
  { id: 'acque_piscine', label: 'Controllo qualità delle acque delle piscine', shortLabel: 'Piscine', color: '#06b6d4' },
  { id: 'gas_radon', label: 'Gas Radon', shortLabel: 'Radon', color: '#7c3aed' },
  { id: 'formazione_alimentaristi', label: 'Attestati formazioni alimentaristi', shortLabel: 'Formazione', color: '#ea580c' },
  { id: 'autoclavi_dentisti', label: 'Test microbiologici autoclavi studi odontoiatri', shortLabel: 'Autoclavi', color: '#9333ea' },
  { id: 'gdpr', label: 'GDPR', shortLabel: 'GDPR', color: '#475569' },
];

export const REGISTRO_MODALITA_PAGAMENTO = [
  'Bonifico B/B',
  'Bonifico',
  'Contanti',
  'RID / SDD',
  'Assegno',
  'Carta / POS',
  'Fattura da incassare',
  'Altro',
];

export const REGISTRO_FREQUENZE_CONTROLLO = [
  '1 mese',
  '3 mesi',
  '6 mesi',
  '1 anno',
  '2 anni',
  'Su richiesta',
];

export interface RegistroServizioAttivo {
  id: string;
  tipoId: RegistroServiceTypeId;
  scadenza: string;
  costo: number;
  frequenzaControllo: string;
  modalitaPagamento: string;
  dataVisita: string;
  note: string;
  status: 'attivo' | 'in_scadenza' | 'scaduto' | 'sospeso' | 'disdetto';
  /** Fattura e pagamento del rinnovo corrente */
  numeroFattura?: string;
  dataFattura?: string;
  dataPagamento?: string;
  statoPagamento?: RegistroPayment['status'];
  refertoData?: string;
  consegnaReferti?: string;
}

export interface RegistroContract {
  id: string;
  name: string;
  letter: string;
  contractNumber: number | null;
  referente: string;
  phone: string;
  mobile?: string;
  email: string;
  address: string;
  city: string;
  paese: string;
  /** Riepilogo testuale (auto-generato dai servizi attivi) */
  services: string;
  serviziAttivi?: RegistroServizioAttivo[];
  sdi: string;
  monthlyFee: number;
  billingInterval: string;
  status: 'attivo' | 'sollecito' | 'sospeso' | 'disdetto' | 'non_reperibile';
  notes: string;
  payments: RegistroPayment[];
  years: string[];
}

export function getRegistroServiceLabel(tipoId: RegistroServiceTypeId): string {
  return REGISTRO_SERVICE_CATALOG.find(s => s.id === tipoId)?.label || tipoId;
}

export function getRegistroServiceShort(tipoId: RegistroServiceTypeId): string {
  return REGISTRO_SERVICE_CATALOG.find(s => s.id === tipoId)?.shortLabel || tipoId;
}

export function buildServicesSummary(servizi: RegistroServizioAttivo[]): string {
  if (!servizi.length) return '';
  return servizi
    .map(s => getRegistroServiceShort(s.tipoId))
    .filter((v, i, a) => a.indexOf(v) === i)
    .join(' · ');
}

export function getRegistroServiziAttivi(c: RegistroContract): RegistroServizioAttivo[] {
  return c.serviziAttivi && c.serviziAttivi.length > 0 ? c.serviziAttivi : [];
}

const parseDateSafe = (value?: string): Date | null => {
  if (!value) return null;
  const parsed = new Date(value);
  return isNaN(parsed.getTime()) ? null : parsed;
};

export function getServizioExpiryStatus(scadenza: string): 'scaduto' | 'in_scadenza' | 'regolare' {
  if (!scadenza) return 'regolare';
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = parseDateSafe(scadenza);
  if (!due) return 'regolare';
  const diffDays = Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays < 0) return 'scaduto';
  if (diffDays <= 30) return 'in_scadenza';
  return 'regolare';
}

export function getNextServizioScadenza(c: RegistroContract): string | null {
  const servizi = getRegistroServiziAttivi(c).filter(s => s.status !== 'disdetto' && s.scadenza);
  if (!servizi.length) return null;
  const sorted = [...servizi].sort((a, b) => {
    const ta = parseDateSafe(a.scadenza)?.getTime() ?? Number.NaN;
    const tb = parseDateSafe(b.scadenza)?.getTime() ?? Number.NaN;
    if (isNaN(ta) && isNaN(tb)) return 0;
    if (isNaN(ta)) return 1;
    if (isNaN(tb)) return -1;
    return ta - tb;
  });
  return sorted[0]?.scadenza || null;
}

export function matchesRegistroMonthYearFilter(
  c: RegistroContract,
  selectedMonth: string,
  selectedYear: string
): boolean {
  if (selectedMonth === 'all' && selectedYear === 'all') return true;

  const servizi = getRegistroServiziAttivi(c);
  if (servizi.some(s => matchesMonthYearFilter(s.scadenza, selectedMonth, selectedYear))) {
    return true;
  }

  const lastPayment = c.payments[c.payments.length - 1];
  if (lastPayment?.date && matchesMonthYearFilter(lastPayment.date, selectedMonth, selectedYear)) {
    return true;
  }

  return false;
}

function guessServiceTypeFromText(text: string): RegistroServiceTypeId {
  const t = (text || '').toLowerCase();
  if (/legionell|legio/.test(t)) return 'legionella';
  if (/piscin|piscine/.test(t)) return 'acque_piscine';
  if (/radon/.test(t)) return 'gas_radon';
  if (/autoclav|odontoiatr|dent/.test(t)) return 'autoclavi_dentisti';
  if (/gdpr|privacy/.test(t)) return 'gdpr';
  if (/formaz|attestat|alimentarist|haccp/.test(t)) return /formaz|attestat/.test(t) ? 'formazione_alimentaristi' : 'sicurezza_alimentare';
  if (/acqu|potabil|microbiolog/.test(t)) return 'acque';
  if (/sicurezz.*lavor|d\.lgs|81\/08|dvr/.test(t)) return 'sicurezza_lavoro';
  if (/haccp|alimentar/.test(t)) return 'sicurezza_alimentare';
  return 'sicurezza_alimentare';
}

function inferScadenzaFromPayments(c: RegistroContract): string {
  const lastPaid = [...c.payments].reverse().find(p => p.status === 'pagato' && p.date);
  if (lastPaid?.date) {
    return addIntervalToDate(lastPaid.date, c.billingInterval || '1 anno');
  }
  const last = c.payments[c.payments.length - 1];
  return last?.date || new Date().toISOString().split('T')[0];
}

function inferVisitaFromPayments(c: RegistroContract): string {
  const lastWithVisit = [...c.payments].reverse().find(p => p.visitDate);
  if (lastWithVisit?.visitDate) return lastWithVisit.visitDate;
  const lastPaid = [...c.payments].reverse().find(p => p.status === 'pagato');
  return lastPaid?.date || '';
}

function inferPagamentoFromPayments(c: RegistroContract): string {
  const lastNote = [...c.payments].reverse().find(p => p.paymentNote)?.paymentNote || '';
  if (/b\/b|bonif/i.test(lastNote)) return 'Bonifico B/B';
  if (/rid|sdd/i.test(lastNote)) return 'RID / SDD';
  if (/contant/i.test(lastNote)) return 'Contanti';
  return 'Bonifico B/B';
}

export function migrateRegistroServizi(c: RegistroContract): RegistroContract {
  if (c.serviziAttivi && c.serviziAttivi.length > 0) {
    return { ...c, services: buildServicesSummary(c.serviziAttivi) || c.services };
  }

  const text = (c.services || c.notes || '').trim();
  if (!text) return { ...c, serviziAttivi: [] };

  const parts = text.split(/[,;+·]/).map(p => p.trim()).filter(Boolean);
  const chunks = parts.length ? parts : [text];
  const scadenza = inferScadenzaFromPayments(c);
  const expiry = getServizioExpiryStatus(scadenza);

  const serviziAttivi: RegistroServizioAttivo[] = chunks.map((chunk, idx) => ({
    id: `srv_${c.id}_${idx + 1}`,
    tipoId: guessServiceTypeFromText(chunk),
    scadenza,
    costo: c.monthlyFee || 150,
    frequenzaControllo: c.billingInterval || '1 anno',
    modalitaPagamento: inferPagamentoFromPayments(c),
    dataVisita: inferVisitaFromPayments(c),
    note: chunk,
    status: expiry === 'scaduto' ? 'scaduto' : expiry === 'in_scadenza' ? 'in_scadenza' : 'attivo',
  }));

  return {
    ...c,
    serviziAttivi,
    services: buildServicesSummary(serviziAttivi),
  };
}

function resolveServizioStatus(
  s: RegistroServizioAttivo,
): RegistroServizioAttivo['status'] {
  if (s.status === 'disdetto' || s.status === 'sospeso') return s.status;
  const exp = getServizioExpiryStatus(s.scadenza);
  if (exp === 'scaduto') return 'scaduto';
  if (exp === 'in_scadenza') return 'in_scadenza';
  return 'attivo';
}

export function normalizeRegistroOnSave(c: RegistroContract): RegistroContract {
  const serviziAttivi: RegistroServizioAttivo[] = (c.serviziAttivi || []).map(s => ({
    ...s,
    status: resolveServizioStatus(s),
  }));
  return {
    ...c,
    serviziAttivi,
    services: buildServicesSummary(serviziAttivi) || c.services,
  };
}

export function createEmptyRegistroServizio(
  c: RegistroContract,
  tipoId: RegistroServiceTypeId = 'sicurezza_alimentare',
): RegistroServizioAttivo {
  const today = new Date().toISOString().split('T')[0];
  const defaultScadenza = addIntervalToDate(today, c.billingInterval || '1 anno');
  return {
    id: `srv_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    tipoId,
    scadenza: defaultScadenza,
    costo: c.monthlyFee || 200,
    frequenzaControllo: c.billingInterval || '1 anno',
    modalitaPagamento: 'Bonifico B/B',
    dataVisita: '',
    note: '',
    status: 'attivo',
    numeroFattura: '',
    dataFattura: '',
    dataPagamento: '',
    statoPagamento: 'in_attesa',
    refertoData: '',
    consegnaReferti: '',
  };
}

export function archiviaRinnovoServizio(
  c: RegistroContract,
  servizioIndex: number,
): RegistroContract {
  const servizi = [...(c.serviziAttivi || [])];
  const s = servizi[servizioIndex];
  if (!s) return c;

  const payment: RegistroPayment = {
    id: `pay_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    date: s.dataPagamento || s.scadenza || new Date().toISOString().split('T')[0],
    amount: s.costo,
    status: s.statoPagamento || 'pagato',
    invoiceNumber: s.numeroFattura || null,
    invoiceDate: s.dataFattura || null,
    paymentNote: `${getRegistroServiceShort(s.tipoId)} · ${s.modalitaPagamento}`,
    refertoData: s.refertoData || '',
    consegnaReferti: s.consegnaReferti || '',
    servizioId: s.id,
    visitDate: s.dataVisita || null,
  };

  const nuovaScadenza = addIntervalToDate(s.scadenza || payment.date, s.frequenzaControllo || '1 anno');

  servizi[servizioIndex] = {
    ...s,
    scadenza: nuovaScadenza,
    numeroFattura: '',
    dataFattura: '',
    dataPagamento: '',
    statoPagamento: 'in_attesa',
    refertoData: '',
    consegnaReferti: '',
    status: 'attivo',
  };

  return {
    ...c,
    serviziAttivi: servizi,
    payments: [...c.payments, payment],
  };
}

export function getPagamentiStoricoServizio(
  c: RegistroContract,
  servizioId: string,
): RegistroPayment[] {
  return c.payments.filter(p => p.servizioId === servizioId);
}

export function getPagamentiGenerali(c: RegistroContract): RegistroPayment[] {
  return c.payments.filter(p => !p.servizioId);
}

export interface RegistroCalendarEvent {
  id: string;
  clientId: string;
  clientName: string;
  city: string;
  tipoId: RegistroServiceTypeId;
  servizioLabel: string;
  scadenza: string;
  costo: number;
  status: RegistroServizioAttivo['status'];
  expiryStatus: 'scaduto' | 'in_scadenza' | 'regolare';
}

export function buildRegistroCalendarEvents(
  registri: RegistroContract[],
  month: number,
  year: number
): RegistroCalendarEvent[] {
  const events: RegistroCalendarEvent[] = [];
  for (const c of registri) {
    for (const s of getRegistroServiziAttivi(c)) {
      if (!s.scadenza || s.status === 'disdetto') continue;
      const d = parseDateSafe(s.scadenza);
      if (!d) continue;
      if (d.getMonth() + 1 !== month || d.getFullYear() !== year) continue;
      events.push({
        id: `${c.id}_${s.id}`,
        clientId: c.id,
        clientName: c.name,
        city: c.city || c.paese || '',
        tipoId: s.tipoId,
        servizioLabel: getRegistroServiceShort(s.tipoId),
        scadenza: s.scadenza,
        costo: s.costo,
        status: s.status,
        expiryStatus: getServizioExpiryStatus(s.scadenza),
      });
    }
  }
  return events.sort((a, b) => a.scadenza.localeCompare(b.scadenza));
}

export function countRegistroCalendarEventsByDay(
  events: RegistroCalendarEvent[]
): Record<number, number> {
  const counts: Record<number, number> = {};
  for (const e of events) {
    const day = parseDateSafe(e.scadenza)?.getDate();
    if (day) counts[day] = (counts[day] || 0) + 1;
  }
  return counts;
}

export function generateInitialRegistri(): RegistroContract[] {
  return (excelMasterRegistri as RegistroContract[]).map(migrateRegistroServizi);
}
