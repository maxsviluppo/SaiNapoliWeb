import re

filepath = 'src/app/manager/page.tsx'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Clean Amministratori Table Header & Body
admin_header_exact = """<tr className="select-none bg-slate-100/60 font-black text-slate-500 uppercase tracking-widest text-[10px]">
                        <th onClick={() => handleSortAdmin('name')} className="p-4 cursor-pointer hover:bg-purple-100/50 transition-colors text-purple-900 font-extrabold text-left">
                          Amministratore / Studio {sortFieldAdmin === 'name' ? (sortOrderAdmin === 'asc' ? '▲' : '▼') : '↕'}
                        </th>
                        <th onClick={() => handleSortAdmin('paese')} className="p-4 cursor-pointer hover:bg-purple-100/50 transition-colors text-purple-900 font-extrabold text-left">
                          Comune / Provincia {sortFieldAdmin === 'paese' ? (sortOrderAdmin === 'asc' ? '▲' : '▼') : '↕'}
                        </th>
                        <th onClick={() => handleSortAdmin('contractNumber')} className="p-4 cursor-pointer hover:bg-purple-100/50 transition-colors text-purple-900 font-extrabold text-left">
                          Contratto N° {sortFieldAdmin === 'contractNumber' ? (sortOrderAdmin === 'asc' ? '▲' : '▼') : '↕'}
                        </th>
                        <th onClick={() => handleSortAdmin('monthlyFee')} className="p-4 cursor-pointer hover:bg-purple-100/50 transition-colors text-purple-900 font-extrabold text-left">
                          Canone {sortFieldAdmin === 'monthlyFee' ? (sortOrderAdmin === 'asc' ? '▲' : '▼') : '↕'}
                        </th>
                        <th className="p-4 text-left">Ultima Fattura & Scadenza</th>
                        <th onClick={() => handleSortAdmin('status')} className="p-4 cursor-pointer hover:bg-purple-100/50 transition-colors text-purple-900 font-extrabold text-left">
                          Stato {sortFieldAdmin === 'status' ? (sortOrderAdmin === 'asc' ? '▲' : '▼') : '↕'}
                        </th>
                        <th className="p-4 text-right">Dettaglio</th>
                      </tr>"""

dentisti_header_exact = """<tr className="select-none bg-slate-100/60 font-black text-slate-500 uppercase tracking-widest text-[10px]">
                        <th onClick={() => handleSortDentisti('name')} className="p-4 cursor-pointer hover:bg-purple-100/50 transition-colors text-purple-900 font-extrabold text-left">
                          Studio / Dentista {sortFieldDentisti === 'name' ? (sortOrderDentisti === 'asc' ? '▲' : '▼') : '↕'}
                        </th>
                        <th onClick={() => handleSortDentisti('paese')} className="p-4 cursor-pointer hover:bg-purple-100/50 transition-colors text-purple-900 font-extrabold text-left">
                          Comune / Provincia {sortFieldDentisti === 'paese' ? (sortOrderDentisti === 'asc' ? '▲' : '▼') : '↕'}
                        </th>
                        <th onClick={() => handleSortDentisti('contractNumber')} className="p-4 cursor-pointer hover:bg-purple-100/50 transition-colors text-purple-900 font-extrabold text-left">
                          Contratto N° {sortFieldDentisti === 'contractNumber' ? (sortOrderDentisti === 'asc' ? '▲' : '▼') : '↕'}
                        </th>
                        <th onClick={() => handleSortDentisti('monthlyFee')} className="p-4 cursor-pointer hover:bg-purple-100/50 transition-colors text-purple-900 font-extrabold text-left">
                          Canone {sortFieldDentisti === 'monthlyFee' ? (sortOrderDentisti === 'asc' ? '▲' : '▼') : '↕'}
                        </th>
                        <th className="p-4 text-left">Ultima Fattura & Scadenza</th>
                        <th onClick={() => handleSortDentisti('status')} className="p-4 cursor-pointer hover:bg-purple-100/50 transition-colors text-purple-900 font-extrabold text-left">
                          Stato {sortFieldDentisti === 'status' ? (sortOrderDentisti === 'asc' ? '▲' : '▼') : '↕'}
                        </th>
                        <th className="p-4 text-right">Dettaglio</th>
                      </tr>"""

# Replace headers
content = re.sub(r'<tr className="select-none bg-slate-100/60"[\s\S]*?</tr>', admin_header_exact, content, count=1)
content = re.sub(r'<tr className="select-none bg-slate-100/60"[\s\S]*?</tr>', dentisti_header_exact, content, count=1)

# Now fix Dentisti Body Row so that Canone TD ONLY has the fee badge, and Ultima Fattura & Scadenza TD follows it!
dentisti_body_tr_old_regex = r'(<td className="p-4 font-bold text-slate-900 whitespace-nowrap">\s*<div className="flex flex-col gap-1">\s*<span className="bg-purple-50 text-purple-900 px-2\.5 py-1 rounded-lg border border-purple-100 inline-flex items-center gap-1 text-xs w-fit">\s*<span className="font-extrabold font-mono text-purple-900">€ \{c\.monthlyFee\}</span>\s*<span className="text-slate-400 font-normal">/</span>\s*<span className="text-purple-700 font-semibold">\{c\.billingInterval \|\| \'1 anno\'\}</span>\s*</span>\s*)[\s\S]*?(</div>\s*</td>)'

dentisti_body_tr_new = r'''<td className="p-4 font-bold text-slate-900 whitespace-nowrap">
                              <span className="bg-purple-50 text-purple-900 px-2.5 py-1 rounded-lg border border-purple-100 inline-flex items-center gap-1 text-xs w-fit">
                                <span className="font-extrabold font-mono text-purple-900">€ {c.monthlyFee}</span>
                                <span className="text-slate-400 font-normal">/</span>
                                <span className="text-purple-700 font-semibold">{c.billingInterval || '1 anno'}</span>
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
                                      {lastInvoice ? `Fatt. N° ${lastInvoice.invoiceNumber || 'N/D'} del ${lastInvoice.invoiceDate || 'N/D'}` : <span className="text-slate-400 italic">Nessuna fattura</span>}
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
                            </td>'''

content = re.sub(dentisti_body_tr_old_regex, dentisti_body_tr_new, content)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Applied perfect column alignment for both Dentisti and Amministratori tables!")
