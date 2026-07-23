const fs = require('fs');
let page = fs.readFileSync('src/app/manager/page.tsx', 'utf8');

// Ensure Amministratori section also has Month/Year filter dropdown
const adminAlphabetEnd = `                  </div>
                </div>

                {/* AMMINISTRATORI LIST TABLE */}`;

const adminMonthYearFilter = `                  </div>

                  {/* Month & Year Expiry Filter (Amministratori) */}
                  <div className="flex flex-wrap gap-2 items-center bg-slate-50 p-2.5 rounded-2xl border border-slate-200">
                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider ml-1">Filtra Scadenza:</span>
                    <select 
                      value={selectedMonthAdmin} 
                      onChange={(e) => { setSelectedMonthAdmin(e.target.value); setCurrentPageAdmin(1); }}
                      className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 outline-none focus:border-purple-500 shadow-sm"
                    >
                      <option value="all">Tutti i Mesi</option>
                      <option value="1">Gennaio</option>
                      <option value="2">Febbraio</option>
                      <option value="3">Marzo</option>
                      <option value="4">Aprile</option>
                      <option value="5">Maggio</option>
                      <option value="6">Giugno</option>
                      <option value="7">Luglio</option>
                      <option value="8">Agosto</option>
                      <option value="9">Settembre</option>
                      <option value="10">Ottobre</option>
                      <option value="11">Novembre</option>
                      <option value="12">Dicembre</option>
                    </select>

                    <select 
                      value={selectedYearAdmin} 
                      onChange={(e) => { setSelectedYearAdmin(e.target.value); setCurrentPageAdmin(1); }}
                      className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 outline-none focus:border-purple-500 shadow-sm"
                    >
                      <option value="all">Tutti gli Anni</option>
                      <option value="2025">2025</option>
                      <option value="2026">2026</option>
                      <option value="2027">2027</option>
                      <option value="2028">2028</option>
                    </select>
                    
                    {(selectedMonthAdmin !== 'all' || selectedYearAdmin !== 'all') && (
                      <button 
                        onClick={() => { setSelectedMonthAdmin('all'); setSelectedYearAdmin('all'); }}
                        className="text-xs text-purple-600 font-bold hover:underline ml-auto mr-1"
                      >
                        Reset Filtri
                      </button>
                    )}
                  </div>
                </div>

                {/* AMMINISTRATORI LIST TABLE */}`;

if (page.includes(adminAlphabetEnd)) {
  page = page.replace(adminAlphabetEnd, adminMonthYearFilter);
}

// Amministratori Payments row invoice cells
const adminAmountTdEnd = `                              className="w-24 bg-white border border-slate-200 rounded-lg px-2 py-1 font-bold text-slate-900 text-xs focus:outline-none focus:border-purple-500"
                            />
                          </td>`;

const adminInvoiceTd = `                              className="w-24 bg-white border border-slate-200 rounded-lg px-2 py-1 font-bold text-slate-900 text-xs focus:outline-none focus:border-purple-500"
                            />
                          </td>

                          {/* FATTURA DETAILS (N°, Data, Importo) */}
                          <td className="p-2">
                            <div className="flex items-center gap-1.5">
                              <input 
                                type="text" 
                                placeholder="N° Fatt." 
                                value={p.invoiceNumber || ''} 
                                onChange={(e) => {
                                  const updatedPayments = [...selectedAmministratore.payments];
                                  updatedPayments[index] = { ...updatedPayments[index], invoiceNumber: e.target.value };
                                  setSelectedAmministratore({ ...selectedAmministratore, payments: updatedPayments });
                                }} 
                                className="w-20 px-2 py-1 border border-slate-200 rounded-lg text-xs bg-white font-mono" 
                              />
                              <input 
                                type="date" 
                                value={p.invoiceDate || ''} 
                                onChange={(e) => {
                                  const updatedPayments = [...selectedAmministratore.payments];
                                  updatedPayments[index] = { ...updatedPayments[index], invoiceDate: e.target.value };
                                  setSelectedAmministratore({ ...selectedAmministratore, payments: updatedPayments });
                                }} 
                                className="w-28 px-2 py-1 border border-slate-200 rounded-lg text-xs bg-white text-slate-700" 
                              />
                              <input 
                                type="number" 
                                placeholder="€ Fatt." 
                                value={p.invoiceAmount ?? ''} 
                                onChange={(e) => {
                                  const updatedPayments = [...selectedAmministratore.payments];
                                  updatedPayments[index] = { ...updatedPayments[index], invoiceAmount: e.target.value ? parseFloat(e.target.value) : undefined };
                                  setSelectedAmministratore({ ...selectedAmministratore, payments: updatedPayments });
                                }} 
                                className="w-20 px-2 py-1 border border-slate-200 rounded-lg text-xs bg-white font-bold" 
                              />
                            </div>
                          </td>`;

if (page.includes(adminAmountTdEnd)) {
  const parts = page.split(adminAmountTdEnd);
  if (parts.length > 2) {
    page = parts[0] + adminInvoiceTd + parts[1] + dentistiInvoiceTd + parts.slice(2).join(adminAmountTdEnd);
  }
}

fs.writeFileSync('src/app/manager/page.tsx', page, 'utf8');
console.log('Amministratori UI updated as well.');
