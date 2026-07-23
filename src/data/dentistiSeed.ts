import dentistiData from './dentisti_names.json';

export interface Payment {
  id: string;
  date: string;
  amount: number;
  status: 'pagato' | 'in_attesa' | 'insoluto' | 'disdetto' | 'sospeso';
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
}

export function hasOverduePayment(payments: Payment[]): boolean {
  if (!payments || payments.length === 0) return false;
  return payments.some(p => p.status === 'insoluto');
}

export function addIntervalToDate(dateStr: string, intervalStr: string): string {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;

  const s = intervalStr.toLowerCase().trim();
  if (s === '1 mese' || s === 'mensile') {
    date.setMonth(date.getMonth() + 1);
  } else if (s === '3 mesi' || s === 'trimestrale') {
    date.setMonth(date.getMonth() + 3);
  } else if (s === '1 anno' || s === 'annuale') {
    date.setFullYear(date.getFullYear() + 1);
  } else {
    // Gestione personalizzata: ad esempio "45 giorni", "2 mesi", "6 mesi"
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
      date.setMonth(date.getMonth() + 3);
    }
  }
  return date.toISOString().split('T')[0];
}

const CITIES_LIST = [
  { city: 'Napoli', paese: 'Napoli' },
  { city: 'Napoli', paese: 'Pozzuoli' },
  { city: 'Napoli', paese: 'Casoria' },
  { city: 'Napoli', paese: 'Giugliano in Campania' },
  { city: 'Napoli', paese: 'Torre del Greco' },
  { city: 'Caserta', paese: 'Caserta' },
  { city: 'Caserta', paese: 'Aversa' },
  { city: 'Salerno', paese: 'Salerno' },
  { city: 'Avellino', paese: 'Avellino' }
];

export function generateInitialDentisti(): ClientContract[] {
  let contractCounter = 101;
  const today = new Date().toISOString().split('T')[0];

  return (dentistiData as string[]).map((fullName, idx) => {
    const cleanName = fullName.trim();
    const firstChar = cleanName.charAt(0).toUpperCase();
    const letter = /[A-Z]/.test(firstChar) ? firstChar : 'A';
    
    // Status distribution
    let status: ClientContract['status'] = 'attivo';
    if (idx % 19 === 0) status = 'sollecito';
    else if (idx % 23 === 0) status = 'sospeso';
    else if (idx % 31 === 0) status = 'disdetto';
    else if (idx % 47 === 0) status = 'non_reperibile';

    const cityObj = CITIES_LIST[idx % CITIES_LIST.length];
    const contractNum = status === 'non_reperibile' ? null : contractCounter++;
    const fee = (idx % 3 === 0) ? 150 : ((idx % 2 === 0) ? 120 : 90);

    const emailSlug = cleanName.toLowerCase().replace(/[^a-z0-9]/g, '.').replace(/\.+/g, '.').replace(/^\.|\.$/g, '');
    const email = `${emailSlug.slice(0, 20)}@studio-dentistico.it`;
    const phone = `081 ${Math.floor(1000000 + Math.random() * 8999999)}`;

    // Variazione reale delle date per ciascun dentista in base all'indice
    const monthOffset = (idx % 12) + 1;
    const dayOffset = ((idx * 7) % 25) + 1;
    const mStr = monthOffset < 10 ? `0${monthOffset}` : `${monthOffset}`;
    const dStr = dayOffset < 10 ? `0${dayOffset}` : `${dayOffset}`;
    
    // Intervallo variato: 1 mese, 3 mesi, 1 anno
    const billingInterval = (idx % 5 === 0) ? '1 mese' : ((idx % 7 === 0) ? '1 anno' : '3 mesi');
    const startDate = `2026-${mStr}-${dStr}`;

    let lastPaidDate = startDate;
    const nextDueDate = addIntervalToDate(lastPaidDate, billingInterval);

    // Payments reali differenziati per utente
    const payments: Payment[] = [
      {
        id: `p-${idx}-1`,
        date: startDate,
        amount: fee,
        status: 'pagato'
      }
    ];

    if (status === 'attivo') {
      payments.push({
        id: `p-${idx}-next`,
        date: nextDueDate,
        amount: fee,
        status: 'in_attesa'
      });
    } else if (status === 'sollecito') {
      payments.push({
        id: `p-${idx}-next`,
        date: nextDueDate,
        amount: fee,
        status: 'insoluto'
      });
    } else {
      payments.push({
        id: `p-${idx}-next`,
        date: nextDueDate,
        amount: fee,
        status: 'in_attesa'
      });
    }

    return {
      id: `dentista-${idx + 1}`,
      name: cleanName,
      letter,
      contractNumber: contractNum,
      status,
      city: cityObj.city,
      paese: cityObj.paese,
      phone,
      email,
      monthlyFee: fee,
      billingInterval,
      startDate,
      notes: `Studio Dentistico registrato da archivio originale DENTISTI SI (${cleanName}). Verifiche periodiche ed igiene.`,
      payments
    };
  });
}
