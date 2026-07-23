const fs = require('fs');
let page = fs.readFileSync('src/app/manager/page.tsx', 'utf8');

// Build selectedAmministratore modal block
const adminModalCode = `
      {/* DETAIL & EDIT MODAL FOR AMMINISTRATORE */}
      {selectedAmministratore && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] max-w-6xl xl:max-w-7xl w-full p-6 md:p-8 shadow-2xl border border-slate-100 flex flex-col text-left max-h-[92vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4 mb-6">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-purple-600 bg-purple-50 px-2.5 py-1 rounded-md">Modifica Scheda Amministratore</span>
                <h3 className="text-xl font-black text-slate-900 mt-1">{selectedAmministratore.name}</h3>
                <p className="text-xs text-slate-500 font-medium">Modifica i dati anagrafici, condomini gestiti, canoni e scadenze.</p>
              </div>
              <button 
                onClick={() => setSelectedAmministratore(null)}
                className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            <form 
              onSubmit={(e) => {
                e.preventDefault();
                const exists = amministratori.some(d => d.id === selectedAmministratore.id);
                let updatedList;
                if (exists) {
                  updatedList = amministratori.map(d => d.id === selectedAmministratore.id ? selectedAmministratore : d);
                } else {
                  updatedList = [selectedAmministratore, ...amministratori];
                }
                setAmministratori(updatedList);
                setSelectedAmministratore(null);
                try { localStorage.setItem('sai_amministratori_db', JSON.stringify(updatedList)); } catch(err){}
              }} 
              className="space-y-6 text-xs text-slate-700"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* COLONNA SINISTRA: ANAGRAFICA & NOTE */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                    <div className="sm:col-span-2">
                      <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">Nome Amministratore / Studio</label>
                      <input 
                        type="text" 
                        value={selectedAmministratore.name}
                        onChange={(e) => setSelectedAmministratore({ ...selectedAmministratore, name: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-purple-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">Comune / Paese</label>
                      <input 
                        type="text"
                        value={selectedAmministratore.paese}
                        onChange={(e) => setSelectedAmministratore({ ...selectedAmministratore, paese: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-purple-500"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">Città / Provincia</label>
                      <input 
                        type="text"
                        value={selectedAmministratore.city}
                        onChange={(e) => setSelectedAmministratore({ ...selectedAmministratore, city: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-purple-500"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">Numero Contratto N°</label>
                      <input 
                        type="number" 
                        value={selectedAmministratore.contractNumber || ''}
                        onChange={(e) => setSelectedAmministratore({ ...selectedAmministratore, contractNumber: e.target.value ? parseInt(e.target.value) : null })}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold font-mono text-slate-900 focus:outline-none focus:border-purple-500"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">Canone Mensile (€)</label>
                      <input 
                        type="number" 
                        value={selectedAmministratore.monthlyFee}
                        onChange={(e) => setSelectedAmministratore({ ...selectedAmministratore, monthlyFee: parseFloat(e.target.value) || 0 })}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-purple-500"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">Intervallo Rinnovo</label>
                      <select 
                        value={selectedAmministratore.billingInterval}
                        onChange={(e) => setSelectedAmministratore({ ...selectedAmministratore, billingInterval: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-purple-500"
                      >
                        <option value="1 mese">1 Mese (Mensile)</option>
                        <option value="3 mesi">3 Mesi (Trimestrale)</option>
                        <option value="1 anno">1 Anno (Annuale)</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">Telefono</label>
                      <input 
                        type="text" 
                        value={selectedAmministratore.phone}
                        onChange={(e) => setSelectedAmministratore({ ...selectedAmministratore, phone: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-purple-500"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">Email</label>
                      <input 
                        type="email" 
                        value={selectedAmministratore.email}
                        onChange={(e) => setSelectedAmministratore({ ...selectedAmministratore, email: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-purple-500"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">Stato Contratto</label>
                      <select 
                        value={selectedAmministratore.status}
                        onChange={(e) => setSelectedAmministratore({ ...selectedAmministratore, status: e.target.value as any })}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-purple-500"
                      >
                        <option value="attivo">🟢 ATTIVO</option>
                        <option value="sollecito">🔴 SOLLECITO</option>
                        <option value="sospeso">🟠 SOSPESO</option>
                        <option value="disdetto">⚪ DISDETTO</option>
                        <option value="non_reperibile">🟣 NON REPERIBILE</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-slate-900 mb-1 uppercase text-[10px] tracking-wider text-slate-400 block">Note di Servizio & Registri</label>
                    <textarea 
                      rows={3}
                      value={selectedAmministratore.notes}
                      onChange={(e) => setSelectedAmministratore({ ...selectedAmministratore, notes: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-medium text-slate-800 focus:outline-none focus:border-purple-500 leading-relaxed"
                    />
                  </div>
                </div>

                {/* COLONNA DESTRA: SCADENZARIO & REFERTI */}
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-bold text-slate-900 uppercase text-[10px] tracking-wider text-slate-400">Scadenzario Pagamenti & Fatture</h4>
                      <span className="text-[10px] text-purple-600 font-bold bg-purple-50 px-2 py-0.5 rounded-md">Aggiornamento Automatico</span>
                    </div>

                    <div className="border border-slate-200 rounded-xl overflow-hidden">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase">
                          <tr>
                            <th className="p-3">Data Scadenza</th>
                            <th className="p-3">Importo (€)</th>
                            <th className="p-3">Fattura (N°, Data, Importo)</th>
                            <th className="p-3">Stato Pagamento</th>
                            <th className="p-3 w-10"></th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {selectedAmministratore.payments.map((p, index) => (
                            <tr key={p.id || index} className="hover:bg-slate-50/50">
                              <td className="p-2">
                                <input 
                                  type="date" 
                                  value={p.date}
                                  onChange={(e) => {
                                    const updatedPayments = [...selectedAmministratore.payments];
                                    updatedPayments[index] = { ...updatedPayments[index], date: e.target.value };
                                    setSelectedAmministratore({ ...selectedAmministratore, payments: updatedPayments });
                                  }}
                                  className="bg-white border border-slate-200 rounded-lg px-2 py-1 font-mono font-bold text-slate-900 text-xs focus:outline-none focus:border-purple-500"
                                />
                              </td>
                              <td className="p-2">
                                <input 
                                  type="number" 
                                  value={p.amount}
                                  onChange={(e) => {
                                    const updatedPayments = [...selectedAmministratore.payments];
                                    updatedPayments[index] = { ...updatedPayments[index], amount: parseFloat(e.target.value) || 0 };
                                    setSelectedAmministratore({ ...selectedAmministratore, payments: updatedPayments });
                                  }}
                                  className="w-24 bg-white border border-slate-200 rounded-lg px-2 py-1 font-bold text-slate-900 text-xs focus:outline-none focus:border-purple-500"
                                />
                              </td>
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
                              </td>
                              <td className="p-2">
                                <select 
                                  value={p.status}
                                  onChange={(e) => {
                                    const newStatus = e.target.value as any;
                                    const updatedPayments = [...selectedAmministratore.payments];
                                    updatedPayments[index] = { ...updatedPayments[index], status: newStatus };
                                    setSelectedAmministratore({ 
                                      ...selectedAmministratore, 
                                      payments: updatedPayments,
                                      status: newStatus === 'pagato' ? 'attivo' : (newStatus === 'disdetto' ? 'disdetto' : (newStatus === 'sospeso' ? 'sospeso' : selectedAmministratore.status))
                                    });
                                  }}
                                  className="w-full bg-transparent outline-none font-black text-xs cursor-pointer"
                                >
                                  <option value="pagato">PAGATO (Regolare)</option>
                                  <option value="in_attesa">IN ATTESA</option>
                                  <option value="insoluto">INSOLUTO</option>
                                  <option value="disdetto">DISDETTO</option>
                                  <option value="sospeso">SOSPESO</option>
                                </select>
                              </td>
                              <td className="p-2 text-center">
                                <button 
                                  type="button"
                                  onClick={() => setPaymentToDelete({ isAdmin: true, index })} 
                                  title="Elimina pagamento" 
                                  className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button 
                  type="button"
                  onClick={() => setSelectedAmministratore(null)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs"
                >
                  Chiudi
                </button>
                <button 
                  type="submit"
                  className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-xs shadow-md shadow-purple-600/20 transition-all"
                >
                  Salva Modifiche
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
`;

const dentistaModalEnd = `{selectedDentista && (`;
if (page.includes(dentistaModalEnd)) {
  page = page.replace(dentistaModalEnd, adminModalCode + '\n      ' + dentistaModalEnd);
  fs.writeFileSync('src/app/manager/page.tsx', page, 'utf8');
  console.log('Amministratore Detail Modal inserted successfully.');
} else {
  console.log('Dentista modal anchor not found.');
}
