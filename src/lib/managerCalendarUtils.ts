import { Payment, getExpiryStatus, getNextDueDate } from '../data/dentistiSeed';

export interface ManagerCalendarEvent {
  id: string;
  clientId: string;
  clientName: string;
  city: string;
  label: string;
  scadenza: string;
  subtitle?: string;
  accentColor: string;
  expiryStatus: 'scaduto' | 'in_scadenza' | 'regolare';
}

const parseDateSafe = (value?: string): Date | null => {
  if (!value) return null;
  const parsed = new Date(value);
  return isNaN(parsed.getTime()) ? null : parsed;
};

export function countManagerCalendarEventsByDay(
  events: ManagerCalendarEvent[],
): Record<number, number> {
  const counts: Record<number, number> = {};
  for (const e of events) {
    const day = parseDateSafe(e.scadenza)?.getDate();
    if (day) counts[day] = (counts[day] || 0) + 1;
  }
  return counts;
}

export function buildPaymentCalendarEvents<T extends {
  id: string;
  name: string;
  city?: string;
  paese?: string;
  payments: Payment[];
  billingInterval?: string;
}>(
  clients: T[],
  month: number,
  year: number,
  accentColor = '#9333ea',
  defaultLabel = 'Scadenza pagamento',
): ManagerCalendarEvent[] {
  const events: ManagerCalendarEvent[] = [];
  const seen = new Set<string>();

  for (const c of clients) {
    const city = c.city || c.paese || '';

    for (const p of c.payments) {
      if (!p.date) continue;
      const d = parseDateSafe(p.date);
      if (!d || d.getMonth() + 1 !== month || d.getFullYear() !== year) continue;
      const key = `${c.id}_${p.id || p.date}_${p.amount}`;
      if (seen.has(key)) continue;
      seen.add(key);
      events.push({
        id: key,
        clientId: c.id,
        clientName: c.name,
        city,
        label: defaultLabel,
        scadenza: p.date,
        subtitle: `€ ${p.amount} · ${String(p.status || '').toUpperCase()}`,
        accentColor,
        expiryStatus: getExpiryStatus(p.date),
      });
    }

    const nextDue = getNextDueDate(c.payments, c.billingInterval);
    if (nextDue) {
      const d = parseDateSafe(nextDue);
      if (d && d.getMonth() + 1 === month && d.getFullYear() === year) {
        const key = `${c.id}_next_${nextDue}`;
        if (!seen.has(key)) {
          seen.add(key);
          events.push({
            id: key,
            clientId: c.id,
            clientName: c.name,
            city,
            label: 'Prossima scadenza',
            scadenza: nextDue,
            subtitle: 'Rinnovo contrattuale',
            accentColor,
            expiryStatus: getExpiryStatus(nextDue),
          });
        }
      }
    }
  }

  return events.sort((a, b) => a.scadenza.localeCompare(b.scadenza));
}
