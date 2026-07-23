'use client';

import React from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { ManagerCalendarEvent, countManagerCalendarEventsByDay } from '../lib/managerCalendarUtils';

type CalendarTheme = 'purple' | 'blue' | 'amber';

const THEME: Record<CalendarTheme, { active: string; badge: string; badgeText: string; ring: string }> = {
  purple: {
    active: 'bg-purple-600 text-white shadow-md',
    badge: 'bg-purple-50 border-purple-200 text-purple-800',
    badgeText: 'text-purple-800',
    ring: 'ring-purple-400',
  },
  blue: {
    active: 'bg-blue-600 text-white shadow-md',
    badge: 'bg-blue-50 border-blue-200 text-blue-800',
    badgeText: 'text-blue-800',
    ring: 'ring-blue-400',
  },
  amber: {
    active: 'bg-amber-600 text-white shadow-md',
    badge: 'bg-amber-50 border-amber-200 text-amber-800',
    badgeText: 'text-amber-800',
    ring: 'ring-amber-400',
  },
};

interface Props {
  theme: CalendarTheme;
  month: number;
  year: number;
  monthNames: string[];
  events: ManagerCalendarEvent[];
  selectedDay: number | null;
  onMonthChange: (month: number, year: number) => void;
  onSelectDay: (day: number | null) => void;
  onOpenClient: (clientId: string) => void;
  listLabel?: string;
}

export default function ManagerScadenzeCalendar({
  theme,
  month,
  year,
  monthNames,
  events,
  selectedDay,
  onMonthChange,
  onSelectDay,
  onOpenClient,
  listLabel = 'scadenze',
}: Props) {
  const t = THEME[theme];
  const dayCounts = countManagerCalendarEventsByDay(events);
  const eventsForDay = selectedDay
    ? events.filter(e => new Date(e.scadenza).getDate() === selectedDay)
    : events;

  const daysInMonth = new Date(year, month, 0).getDate();
  const firstWeekday = new Date(year, month - 1, 1).getDay();
  const startOffset = firstWeekday === 0 ? 6 : firstWeekday - 1;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
        <div className="flex gap-2">
          <span className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wide flex items-center gap-1.5 ${t.active}`}>
            <Calendar className="w-3.5 h-3.5" /> Calendario Scadenze
          </span>
        </div>
        <span className={`text-[10px] font-bold px-3 py-1.5 rounded-xl border ${t.badge}`}>
          {events.length} {listLabel} in {monthNames[month]} {year}
        </span>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <div className="xl:col-span-7 bg-slate-50 border border-slate-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={() => {
                let m = month - 1;
                let y = year;
                if (m < 1) { m = 12; y -= 1; }
                onMonthChange(m, y);
                onSelectDay(null);
              }}
              className="p-2 rounded-xl border border-slate-200 hover:bg-white"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide">
              {monthNames[month]} {year}
            </h3>
            <button
              type="button"
              onClick={() => {
                let m = month + 1;
                let y = year;
                if (m > 12) { m = 1; y += 1; }
                onMonthChange(m, y);
                onSelectDay(null);
              }}
              className="p-2 rounded-xl border border-slate-200 hover:bg-white"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'].map(d => (
              <div key={d} className="text-center text-[9px] font-black text-slate-400 uppercase py-1">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: startOffset }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square" />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const count = dayCounts[day] || 0;
              const isSelected = selectedDay === day;
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => onSelectDay(isSelected ? null : day)}
                  className={`aspect-square rounded-xl text-xs font-bold flex flex-col items-center justify-center transition-all border ${
                    isSelected ? `ring-2 ${t.ring} bg-white border-slate-300 shadow-md` :
                    count > 0 ? 'bg-white border-slate-200 hover:border-slate-400 hover:shadow-sm' :
                    'border-transparent hover:bg-white/60 text-slate-400'
                  }`}
                >
                  <span className={count > 0 ? 'text-slate-900' : ''}>{day}</span>
                  {count > 0 && (
                    <span className={`text-[8px] font-black mt-0.5 px-1 rounded ${t.badge}`}>{count}</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="xl:col-span-5 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm max-h-[480px] overflow-y-auto">
          <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-3">
            {selectedDay
              ? `${listLabel} del ${selectedDay} ${monthNames[month]} ${year}`
              : `Tutte le ${listLabel} — ${monthNames[month]} ${year}`}
          </h4>
          {eventsForDay.length === 0 ? (
            <p className="text-xs text-slate-400 italic py-8 text-center">Nessuna scadenza in questo periodo.</p>
          ) : (
            <div className="space-y-2">
              {eventsForDay.map(ev => (
                <button
                  key={ev.id}
                  type="button"
                  onClick={() => onOpenClient(ev.clientId)}
                  className={`w-full text-left p-3 rounded-xl border transition-all hover:shadow-md ${
                    ev.expiryStatus === 'scaduto' ? 'bg-red-50 border-red-200' :
                    ev.expiryStatus === 'in_scadenza' ? 'bg-amber-50 border-amber-200' :
                    'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <span
                        className="text-[8px] font-black uppercase px-1.5 py-0.5 rounded text-white inline-block mb-1"
                        style={{ backgroundColor: ev.accentColor }}
                      >
                        {ev.label}
                      </span>
                      <p className="font-bold text-slate-900 text-xs truncate">{ev.clientName}</p>
                      <p className="text-[10px] text-slate-500">
                        {ev.city} · Scad. {ev.scadenza}{ev.subtitle ? ` · ${ev.subtitle}` : ''}
                      </p>
                    </div>
                    <span className="text-[8px] font-black uppercase text-slate-400 shrink-0">Apri →</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
