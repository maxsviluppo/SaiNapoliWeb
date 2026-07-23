const fs = require('fs');
let page = fs.readFileSync('src/app/manager/page.tsx', 'utf8');

// 1. DENTISTI FILTERS
const dentistiAlphabetEnd = `                  </div>
                </div>

                {/* DENTISTI LIST TABLE */}`;

const dentistiMonthYearFilter = `                  </div>

                  {/* Month & Year Expiry Filter (Dentisti) */}
                  <div className="flex flex-wrap gap-2 items-center bg-slate-50 p-2.5 rounded-2xl border border-slate-200">
                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider ml-1">Filtra Scadenza:</span>
                    <select 
                      value={selectedMonth} 
                      onChange={(e) => { setSelectedMonth(e.target.value); setCurrentPage(1); }}
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
                      value={selectedYear} 
                      onChange={(e) => { setSelectedYear(e.target.value); setCurrentPage(1); }}
                      className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 outline-none focus:border-purple-500 shadow-sm"
                    >
                      <option value="all">Tutti gli Anni</option>
                      <option value="2025">2025</option>
                      <option value="2026">2026</option>
                      <option value="2027">2027</option>
                      <option value="2028">2028</option>
                    </select>
                    
                    {(selectedMonth !== 'all' || selectedYear !== 'all') && (
                      <button 
                        onClick={() => { setSelectedMonth('all'); setSelectedYear('all'); }}
                        className="text-xs text-purple-600 font-bold hover:underline ml-auto mr-1"
                      >
                        Reset Filtri
                      </button>
                    )}
                  </div>
                </div>

                {/* DENTISTI LIST TABLE */}`;

if (page.includes(dentistiAlphabetEnd)) {
  const parts = page.split(dentistiAlphabetEnd);
  if (parts.length > 2) {
    // Admin is first, Dentisti is second
    page = parts[0] + dentistiAlphabetEnd.replace('selectedMonth', 'selectedMonthAdmin').replace('selectedYear', 'selectedYearAdmin').replace('setCurrentPage', 'setCurrentPageAdmin').replace('Dentisti', 'Amministratori') + parts[1] + dentistiMonthYearFilter + parts.slice(2).join(dentistiAlphabetEnd);
  } else {
    page = page.replace(dentistiAlphabetEnd, dentistiMonthYearFilter);
  }
}

// 2. PAYMENTS TABLE ROW (DENTISTI)
const dentistiAmountTdEnd = `                              className="w-24 bg-white border border-slate-200 rounded-lg px-2 py-1 font-bold text-slate-900 text-xs focus:outline-none focus:border-purple-500"
                            />
                          </td>`;

const dentistiInvoiceTd = `                              className="w-24 bg-white border border-slate-200 rounded-lg px-2 py-1 font-bold text-slate-900 text-xs focus:outline-none focus:border-purple-500"
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
                                  const updatedPayments = [...selectedDentista.payments];
                                  updatedPayments[index] = { ...updatedPayments[index], invoiceNumber: e.target.value };
                                  setSelectedDentista({ ...selectedDentista, payments: updatedPayments });
                                }} 
                                className="w-20 px-2 py-1 border border-slate-200 rounded-lg text-xs bg-white font-mono" 
                              />
                              <input 
                                type="date" 
                                value={p.invoiceDate || ''} 
                                onChange={(e) => {
                                  const updatedPayments = [...selectedDentista.payments];
                                  updatedPayments[index] = { ...updatedPayments[index], invoiceDate: e.target.value };
                                  setSelectedDentista({ ...selectedDentista, payments: updatedPayments });
                                }} 
                                className="w-28 px-2 py-1 border border-slate-200 rounded-lg text-xs bg-white text-slate-700" 
                              />
                              <input 
                                type="number" 
                                placeholder="€ Fatt." 
                                value={p.invoiceAmount ?? ''} 
                                onChange={(e) => {
                                  const updatedPayments = [...selectedDentista.payments];
                                  updatedPayments[index] = { ...updatedPayments[index], invoiceAmount: e.target.value ? parseFloat(e.target.value) : undefined };
                                  setSelectedDentista({ ...selectedDentista, payments: updatedPayments });
                                }} 
                                className="w-20 px-2 py-1 border border-slate-200 rounded-lg text-xs bg-white font-bold" 
                              />
                            </div>
                          </td>`;

page = page.replace(dentistiAmountTdEnd, dentistiInvoiceTd);

// Also add Trash button cell before </tr> for Dentisti
const selectStatusEndD = `                              <option value="sospeso">SOSPESO</option>
                            </select>
                          </td>
                        </tr>`;

const selectStatusWithTrashD = `                              <option value="sospeso">SOSPESO</option>
                            </select>
                          </td>
                          <td className="p-2 text-center">
                            <button 
                              onClick={() => setPaymentToDelete({ isAdmin: false, index })} 
                              title="Elimina pagamento" 
                              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                            </button>
                          </td>
                        </tr>`;

page = page.replace(selectStatusEndD, selectStatusWithTrashD);

fs.writeFileSync('src/app/manager/page.tsx', page, 'utf8');
console.log('Successfully fixed UI dropdowns and invoice fields in page.tsx');
