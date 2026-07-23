const fs = require('fs');

// We can restore from git checkout or clean up double insertions
const { execSync } = require('child_process');
execSync('git checkout src/app/manager/page.tsx');

let page = fs.readFileSync('src/app/manager/page.tsx', 'utf8');

// Ensure getExpiryStatus is imported from dentistiSeed
if (!page.includes('getExpiryStatus')) {
  page = page.replace(
    "import { generateInitialDentisti, ClientContract, Payment, hasOverduePayment, addIntervalToDate } from '../../data/dentistiSeed';",
    "import { generateInitialDentisti, ClientContract, Payment, hasOverduePayment, addIntervalToDate, getExpiryStatus } from '../../data/dentistiSeed';"
  );
}

// 1. Amministratori Table Header: add Ultima Fattura & Scadenza
const adminHeaderOld = `<th className="p-4">Condomini Gestiti</th>
                        <th className="p-4">Stato</th>`;

const adminHeaderNew = `<th className="p-4">Condomini Gestiti</th>
                        <th className="p-4">Ultima Fattura & Scadenza</th>
                        <th className="p-4">Stato</th>`;

page = page.replace(adminHeaderOld, adminHeaderNew);

// 2. Amministratori Table Cell insertion
const adminCellOld = `<td className="p-4 text-slate-600">
                              <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-xs font-semibold">
                                {c.condominiums.length} Condomini
                              </span>
                            </td>`;

const adminCellNew = `<td className="p-4 text-slate-600">
                              <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-xs font-semibold">
                                {c.condominiums.length} Condomini
                              </span>
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
                              })()}
                            </td>`;

page = page.replace(adminCellOld, adminCellNew);

// 3. Dentisti Table Header: add Ultima Fattura & Scadenza
const dentHeaderOld = `<th className="p-4">Canone</th>
                        <th className="p-4">Stato</th>`;

const dentHeaderNew = `<th className="p-4">Canone</th>
                        <th className="p-4">Ultima Fattura & Scadenza</th>
                        <th className="p-4">Stato</th>`;

page = page.replace(dentHeaderOld, dentHeaderNew);

// 4. Dentisti Table Cell insertion
const dentCellOld = `<td className="p-4 font-bold text-slate-900 whitespace-nowrap">
                              <div className="flex flex-col gap-1">
                                <span className="bg-purple-50 text-purple-900 px-2.5 py-1 rounded-lg border border-purple-100 inline-flex items-center gap-1 text-xs w-fit">
                                  <span className="font-extrabold font-mono text-purple-900">€ {c.monthlyFee}</span>
                                  <span className="text-slate-400 font-normal">/</span>
                                  <span className="text-purple-700 font-semibold">{c.billingInterval || '1 anno'}</span>
                                </span>
                              </div>
                            </td>`;

const dentCellNew = `<td className="p-4 font-bold text-slate-900 whitespace-nowrap">
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
                                    <div className="font-mono text-slate-900 font-bold text-purple-900">
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
                              })()}
                            </td>`;

page = page.replace(dentCellOld, dentCellNew);

// Update storage key to sai_dentisti_db_v6
page = page.split('sai_dentisti_db_v5').join('sai_dentisti_db_v6');

fs.writeFileSync('src/app/manager/page.tsx', page, 'utf8');
console.log('Cleanly updated table headers and cell structure in page.tsx.');
