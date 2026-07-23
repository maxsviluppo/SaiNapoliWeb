const fs = require('fs');

// 1. Update dentistiSeed.ts
let seed = fs.readFileSync('src/data/dentistiSeed.ts', 'utf8');

const helperFunctions = `
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
`;

if (!seed.includes('getExpiryStatus')) {
  seed = seed.replace('export function addIntervalToDate', helperFunctions + '\nexport function addIntervalToDate');
  fs.writeFileSync('src/data/dentistiSeed.ts', seed, 'utf8');
  console.log('Added getExpiryStatus to dentistiSeed.ts');
}

// 2. Update page.tsx
let page = fs.readFileSync('src/app/manager/page.tsx', 'utf8');

// Ensure getExpiryStatus is imported from dentistiSeed
if (!page.includes('getExpiryStatus')) {
  page = page.replace(
    "import { generateInitialDentisti, ClientContract, Payment, hasOverduePayment, addIntervalToDate } from '../../data/dentistiSeed';",
    "import { generateInitialDentisti, ClientContract, Payment, hasOverduePayment, addIntervalToDate, getExpiryStatus } from '../../data/dentistiSeed';"
  );
}

// Update Amministratori Main Table Headers to include Ultima Fattura & Scadenza
const oldAdminHeaderRow = `<th className="p-4">Stato</th>`;
const newAdminHeaderRow = `<th className="p-4">Ultima Fattura & Scadenza</th>\n                        <th className="p-4">Stato</th>`;
if (!page.includes('Ultima Fattura & Scadenza')) {
  page = page.replace(oldAdminHeaderRow, newAdminHeaderRow);
  page = page.replace(oldAdminHeaderRow, newAdminHeaderRow); // for Dentisti table as well
}

// Insert Ultima Fattura cell in Amministratori table body
const oldAdminRowCell = `<td className="p-4 font-bold text-slate-900 whitespace-nowrap">
                              <div className="flex flex-col gap-1">
                                <span className="bg-purple-50 text-purple-900 px-2.5 py-1 rounded-lg border border-purple-100 inline-flex items-center gap-1 text-xs w-fit">
                                  <span className="font-extrabold font-mono text-purple-900">€ {c.monthlyFee}</span>
                                  <span className="text-slate-400 font-normal">/</span>
                                  <span className="text-purple-700 font-semibold">{c.billingInterval || '1 anno'}</span>
                                </span>`;

const newAdminRowCell = `<td className="p-4 font-bold text-slate-900 whitespace-nowrap">
                              <div className="flex flex-col gap-1">
                                <span className="bg-purple-50 text-purple-900 px-2.5 py-1 rounded-lg border border-purple-100 inline-flex items-center gap-1 text-xs w-fit">
                                  <span className="font-extrabold font-mono text-purple-900">€ {c.monthlyFee}</span>
                                  <span className="text-slate-400 font-normal">/</span>
                                  <span className="text-purple-700 font-semibold">{c.billingInterval || '1 anno'}</span>
                                </span>
                              </div>
                            </td>
                            <td className="p-4 font-medium text-xs">
                              {(() => {
                                const lastInvoice = [...c.payments].reverse().find(p => p.invoiceNumber || p.invoiceDate);
                                const lastPaid = [...c.payments].reverse().find(p => p.status === 'pagato');
                                const dueDate = lastPaid?.date ? addIntervalToDate(lastPaid.date, c.billingInterval || '1 anno') : (c.payments[c.payments.length - 1]?.date || '');
                                const expStatus = getExpiryStatus(dueDate);
                                return (
                                  <div className="flex flex-col gap-0.5">
                                    <div className="font-mono text-slate-900 font-bold">
                                      {lastInvoice ? \`Fatt. N° \${lastInvoice.invoiceNumber || 'N/D'} del \${lastInvoice.invoiceDate || 'N/D'}\` : <span className="text-slate-400 italic">Nessuna fattura</span>}
                                    </div>
                                    {dueDate && (
                                      <div className="flex items-center gap-1.5 mt-0.5">
                                        <span className="text-[10px] text-slate-500 font-medium">Scadenza: {dueDate}</span>
                                        {expStatus === 'scaduto' && (
                                          <span className="px-1.5 py-0.5 bg-red-600 text-white rounded text-[9px] font-black uppercase tracking-wider">🔴 Scaduto</span>
                                        )}
                                        {expStatus === 'in_scadenza' && (
                                          <span className="px-1.5 py-0.5 bg-amber-500 text-white rounded text-[9px] font-black uppercase tracking-wider animate-pulse">⚠️ In Scadenza (15gg)</span>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                );
                              })()}`;

page = page.replace(oldAdminRowCell, newAdminRowCell);
page = page.replace(oldAdminRowCell, newAdminRowCell); // for Dentisti table as well

// Bump storage key to sai_dentisti_db_v6
page = page.split('sai_dentisti_db_v5').join('sai_dentisti_db_v6');

fs.writeFileSync('src/app/manager/page.tsx', page, 'utf8');
console.log('Updated page.tsx with Ultima Fattura & Scadenza column, 15-day warning badge, and bumped storage key to v6.');
