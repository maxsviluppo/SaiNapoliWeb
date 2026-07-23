const fs = require('fs');
let page = fs.readFileSync('src/app/manager/page.tsx', 'utf8');

// Aggiungiamo i referti!
// I referti vanno sotto i pagamenti, quindi cerchiamo `{/* AGGIUNGI NUOVO PAGAMENTO */}` o simile
// e dopo aver chiuso quel div, aggiungiamo la sezione Referti.

const dentistiRefertiSection = `
              {/* SEZIONE CONSEGNA REFERTI (DENTISTI) */}
              <div className="mt-8 border-t border-slate-200 pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-bold text-slate-900 uppercase text-[10px] tracking-wider text-slate-400">Consegna Referti</h4>
                </div>
                
                {/* Nuova Consegna */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-4">
                  <div className="flex gap-2 items-center flex-wrap">
                    <select 
                      value={newRefertoMetodo}
                      onChange={e => setNewRefertoMetodo(e.target.value as any)}
                      className="px-3 py-2 border rounded-lg text-xs font-bold"
                    >
                      <option value="cartacea">Cartacea</option>
                      <option value="ritiro_in_ufficio">Ritiro in Ufficio</option>
                      <option value="email">Email</option>
                    </select>
                    
                    {newRefertoMetodo === 'email' && (
                      <input 
                        type="email" 
                        placeholder="Indirizzo Email"
                        value={newRefertoEmail}
                        onChange={e => setNewRefertoEmail(e.target.value)}
                        className="px-3 py-2 border rounded-lg text-xs"
                      />
                    )}
                    
                    <input 
                      type="date"
                      value={newRefertoDate}
                      onChange={e => setNewRefertoDate(e.target.value)}
                      className="px-3 py-2 border rounded-lg text-xs"
                    />
                    
                    <button 
                      onClick={() => {
                        const ref = {
                          id: 'ref_' + Date.now(),
                          metodoConsegna: newRefertoMetodo,
                          emailConsegna: newRefertoMetodo === 'email' ? newRefertoEmail : undefined,
                          dataConsegna: newRefertoDate
                        };
                        const updated = [...(selectedDentista.referti || []), ref];
                        setSelectedDentista({...selectedDentista, referti: updated});
                        setNewRefertoEmail('');
                      }}
                      className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-bold"
                    >
                      Registra Consegna
                    </button>
                  </div>
                </div>

                {/* Lista Referti */}
                {(selectedDentista.referti && selectedDentista.referti.length > 0) ? (
                  <div className="border border-slate-200 rounded-xl overflow-hidden">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 text-slate-500 uppercase font-black text-[10px]">
                        <tr>
                          <th className="p-3">Data</th>
                          <th className="p-3">Metodo</th>
                          <th className="p-3">Dettagli</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {selectedDentista.referti.map((r, i) => (
                          <tr key={i} className="hover:bg-slate-50">
                            <td className="p-3 font-bold text-slate-700">{r.dataConsegna}</td>
                            <td className="p-3">
                              {r.metodoConsegna === 'cartacea' ? '📄 Cartacea' : 
                               r.metodoConsegna === 'ritiro_in_ufficio' ? '🏢 In Ufficio' : '📧 Email'}
                            </td>
                            <td className="p-3 text-slate-500">{r.emailConsegna || '-'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-xs text-slate-400">Nessun referto registrato.</p>
                )}
              </div>
`;

const ammRefertiSection = `
              {/* SEZIONE CONSEGNA REFERTI (AMMINISTRATORI) */}
              <div className="mt-8 border-t border-slate-200 pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-bold text-slate-900 uppercase text-[10px] tracking-wider text-slate-400">Consegna Referti</h4>
                </div>
                
                {/* Nuova Consegna */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-4">
                  <div className="flex gap-2 items-center flex-wrap">
                    <select 
                      value={newRefertoMetodo}
                      onChange={e => setNewRefertoMetodo(e.target.value as any)}
                      className="px-3 py-2 border rounded-lg text-xs font-bold"
                    >
                      <option value="cartacea">Cartacea</option>
                      <option value="ritiro_in_ufficio">Ritiro in Ufficio</option>
                      <option value="email">Email</option>
                    </select>
                    
                    {newRefertoMetodo === 'email' && (
                      <input 
                        type="email" 
                        placeholder="Indirizzo Email"
                        value={newRefertoEmail}
                        onChange={e => setNewRefertoEmail(e.target.value)}
                        className="px-3 py-2 border rounded-lg text-xs"
                      />
                    )}
                    
                    <input 
                      type="date"
                      value={newRefertoDate}
                      onChange={e => setNewRefertoDate(e.target.value)}
                      className="px-3 py-2 border rounded-lg text-xs"
                    />
                    
                    <button 
                      onClick={() => {
                        const ref = {
                          id: 'ref_' + Date.now(),
                          metodoConsegna: newRefertoMetodo,
                          emailConsegna: newRefertoMetodo === 'email' ? newRefertoEmail : undefined,
                          dataConsegna: newRefertoDate
                        };
                        const updated = [...(selectedAmministratore.referti || []), ref];
                        setSelectedAmministratore({...selectedAmministratore, referti: updated});
                        setNewRefertoEmail('');
                      }}
                      className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-bold"
                    >
                      Registra Consegna
                    </button>
                  </div>
                </div>

                {/* Lista Referti */}
                {(selectedAmministratore.referti && selectedAmministratore.referti.length > 0) ? (
                  <div className="border border-slate-200 rounded-xl overflow-hidden">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 text-slate-500 uppercase font-black text-[10px]">
                        <tr>
                          <th className="p-3">Data</th>
                          <th className="p-3">Metodo</th>
                          <th className="p-3">Dettagli</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {selectedAmministratore.referti.map((r, i) => (
                          <tr key={i} className="hover:bg-slate-50">
                            <td className="p-3 font-bold text-slate-700">{r.dataConsegna}</td>
                            <td className="p-3">
                              {r.metodoConsegna === 'cartacea' ? '📄 Cartacea' : 
                               r.metodoConsegna === 'ritiro_in_ufficio' ? '🏢 In Ufficio' : '📧 Email'}
                            </td>
                            <td className="p-3 text-slate-500">{r.emailConsegna || '-'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-xs text-slate-400">Nessun referto registrato.</p>
                )}
              </div>
`;

// Insert the Referti sections before `</> // CHIUSURA DETTAGLIO UTENTE` or similar
// Dentisti block ends with `              </div>\n\n            </div>\n          ) : (`
const dEnd = `              </div>

            </div>
          ) : (`;
if (page.includes(dEnd)) {
  const parts = page.split(dEnd);
  if (parts.length > 2) {
    // Amministratori is first, Dentisti is second
    page = parts[0] + ammRefertiSection + '\n' + dEnd + parts[1] + dentistiRefertiSection + '\n' + dEnd + parts.slice(2).join(dEnd);
  }
}

// Next, the Nuovo Pagamento inputs for Dentisti
const dNewPay = `
                        <tr className="bg-slate-50/50">
                          <td className="p-2">
                            <input 
                              type="date" 
                              value={newPaymentDate}
                              onChange={(e) => setNewPaymentDate(e.target.value)}
                              className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs font-medium text-slate-600 outline-none focus:border-purple-400"
                            />
                          </td>
                          <td className="p-2">
                            <div className="flex items-center gap-1">
                              <span className="text-xs font-bold text-slate-400">€</span>
                              <input 
                                type="number" 
                                value={newPaymentAmount}
                                onChange={(e) => setNewPaymentAmount(Number(e.target.value))}
                                className="w-16 bg-white border border-slate-200 rounded-lg p-2 text-xs font-bold text-slate-700 outline-none focus:border-purple-400 text-right"
                              />
                            </div>
                          </td>
                          <td className="p-2">
                            <button 
                              onClick={() => {
                                if (!newPaymentDate || !newPaymentAmount) return;
                                const np = {
                                  id: 'pay_' + Date.now(),
                                  date: newPaymentDate,
                                  amount: newPaymentAmount,
                                  status: 'pagato' as const
                                };
                                const updated = [...selectedDentista.payments, np];
                                setSelectedDentista({ ...selectedDentista, payments: updated });
                                setNewPaymentDate(new Date().toISOString().split('T')[0]);
                              }}
                              className="w-full px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-[10px] uppercase tracking-wider transition-colors shadow-sm"
                            >
                              Aggiungi
                            </button>
                          </td>
                        </tr>
`;

const dNewPayUpdate = `
                        <tr className="bg-slate-50/50">
                          <td className="p-2">
                            <input 
                              type="date" 
                              value={newPaymentDate}
                              onChange={(e) => setNewPaymentDate(e.target.value)}
                              className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs font-medium text-slate-600 outline-none focus:border-purple-400"
                            />
                          </td>
                          <td className="p-2">
                            <div className="flex items-center gap-1">
                              <span className="text-xs font-bold text-slate-400">€</span>
                              <input 
                                type="number" 
                                value={newPaymentAmount}
                                onChange={(e) => setNewPaymentAmount(Number(e.target.value))}
                                className="w-16 bg-white border border-slate-200 rounded-lg p-2 text-xs font-bold text-slate-700 outline-none focus:border-purple-400 text-right"
                              />
                            </div>
                          </td>
                          <td className="p-2 flex items-center gap-2">
                            <input type="text" placeholder="N° Fattura" value={newInvoiceNumber} onChange={e => setNewInvoiceNumber(e.target.value)} className="w-16 px-2 py-1 border rounded text-xs bg-white" />
                            <input type="date" value={newInvoiceDate} onChange={e => setNewInvoiceDate(e.target.value)} className="w-24 px-2 py-1 border rounded text-xs bg-white text-slate-500" />
                            <input type="number" placeholder="€ Fattura" value={newInvoiceAmount} onChange={e => setNewInvoiceAmount(Number(e.target.value))} className="w-16 px-2 py-1 border rounded text-xs bg-white" />
                          </td>
                          <td className="p-2">
                            <button 
                              onClick={() => {
                                if (!newPaymentDate || !newPaymentAmount) return;
                                const np = {
                                  id: 'pay_' + Date.now(),
                                  date: newPaymentDate,
                                  amount: newPaymentAmount,
                                  status: 'pagato' as const,
                                  invoiceNumber: newInvoiceNumber,
                                  invoiceDate: newInvoiceDate,
                                  invoiceAmount: newInvoiceAmount !== '' ? newInvoiceAmount : undefined
                                };
                                const updated = [...selectedDentista.payments, np];
                                setSelectedDentista({ ...selectedDentista, payments: updated });
                                setNewPaymentDate(new Date().toISOString().split('T')[0]);
                                setNewInvoiceNumber('');
                                setNewInvoiceDate('');
                                setNewInvoiceAmount('');
                              }}
                              className="w-full px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-[10px] uppercase tracking-wider transition-colors shadow-sm"
                            >
                              Aggiungi
                            </button>
                          </td>
                        </tr>
`;

page = page.replace(dNewPay, dNewPayUpdate);

// Admin New Payment
const aNewPay = `
                        <tr className="bg-slate-50/50">
                          <td className="p-2">
                            <input 
                              type="date" 
                              value={newPaymentDateAdmin}
                              onChange={(e) => setNewPaymentDateAdmin(e.target.value)}
                              className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs font-medium text-slate-600 outline-none focus:border-purple-400"
                            />
                          </td>
                          <td className="p-2">
                            <div className="flex items-center gap-1">
                              <span className="text-xs font-bold text-slate-400">€</span>
                              <input 
                                type="number" 
                                value={newPaymentAmountAdmin}
                                onChange={(e) => setNewPaymentAmountAdmin(Number(e.target.value))}
                                className="w-16 bg-white border border-slate-200 rounded-lg p-2 text-xs font-bold text-slate-700 outline-none focus:border-purple-400 text-right"
                              />
                            </div>
                          </td>
                          <td className="p-2">
                            <button 
                              onClick={() => {
                                if (!newPaymentDateAdmin || !newPaymentAmountAdmin) return;
                                const np = {
                                  id: 'pay_' + Date.now(),
                                  date: newPaymentDateAdmin,
                                  amount: newPaymentAmountAdmin,
                                  status: 'pagato' as const
                                };
                                const updated = [...selectedAmministratore.payments, np];
                                setSelectedAmministratore({ ...selectedAmministratore, payments: updated });
                                setNewPaymentDateAdmin(new Date().toISOString().split('T')[0]);
                              }}
                              className="w-full px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-[10px] uppercase tracking-wider transition-colors shadow-sm"
                            >
                              Aggiungi
                            </button>
                          </td>
                        </tr>
`;

const aNewPayUpdate = `
                        <tr className="bg-slate-50/50">
                          <td className="p-2">
                            <input 
                              type="date" 
                              value={newPaymentDateAdmin}
                              onChange={(e) => setNewPaymentDateAdmin(e.target.value)}
                              className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs font-medium text-slate-600 outline-none focus:border-purple-400"
                            />
                          </td>
                          <td className="p-2">
                            <div className="flex items-center gap-1">
                              <span className="text-xs font-bold text-slate-400">€</span>
                              <input 
                                type="number" 
                                value={newPaymentAmountAdmin}
                                onChange={(e) => setNewPaymentAmountAdmin(Number(e.target.value))}
                                className="w-16 bg-white border border-slate-200 rounded-lg p-2 text-xs font-bold text-slate-700 outline-none focus:border-purple-400 text-right"
                              />
                            </div>
                          </td>
                          <td className="p-2 flex items-center gap-2">
                            <input type="text" placeholder="N° Fattura" value={newInvoiceNumberAdmin} onChange={e => setNewInvoiceNumberAdmin(e.target.value)} className="w-16 px-2 py-1 border rounded text-xs bg-white" />
                            <input type="date" value={newInvoiceDateAdmin} onChange={e => setNewInvoiceDateAdmin(e.target.value)} className="w-24 px-2 py-1 border rounded text-xs bg-white text-slate-500" />
                            <input type="number" placeholder="€ Fattura" value={newInvoiceAmountAdmin} onChange={e => setNewInvoiceAmountAdmin(Number(e.target.value))} className="w-16 px-2 py-1 border rounded text-xs bg-white" />
                          </td>
                          <td className="p-2">
                            <button 
                              onClick={() => {
                                if (!newPaymentDateAdmin || !newPaymentAmountAdmin) return;
                                const np = {
                                  id: 'pay_' + Date.now(),
                                  date: newPaymentDateAdmin,
                                  amount: newPaymentAmountAdmin,
                                  status: 'pagato' as const,
                                  invoiceNumber: newInvoiceNumberAdmin,
                                  invoiceDate: newInvoiceDateAdmin,
                                  invoiceAmount: newInvoiceAmountAdmin !== '' ? newInvoiceAmountAdmin : undefined
                                };
                                const updated = [...selectedAmministratore.payments, np];
                                setSelectedAmministratore({ ...selectedAmministratore, payments: updated });
                                setNewPaymentDateAdmin(new Date().toISOString().split('T')[0]);
                                setNewInvoiceNumberAdmin('');
                                setNewInvoiceDateAdmin('');
                                setNewInvoiceAmountAdmin('');
                              }}
                              className="w-full px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-[10px] uppercase tracking-wider transition-colors shadow-sm"
                            >
                              Aggiungi
                            </button>
                          </td>
                        </tr>
`;

page = page.replace(aNewPay, aNewPayUpdate);

fs.writeFileSync('src/app/manager/page.tsx', page, 'utf8');
console.log('Referti UI and New Payment Inputs inserted.');
