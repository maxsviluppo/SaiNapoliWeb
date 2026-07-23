const fs = require('fs');
let page = fs.readFileSync('src/app/manager/page.tsx', 'utf8');

const oldTableHeaders = `
                        <th className="p-3">Data Scadenza</th>
                        <th className="p-3">Importo (€)</th>
                        <th className="p-3">Stato Pagamento</th>
`;
const newTableHeaders = `
                        <th className="p-3">Data Scadenza</th>
                        <th className="p-3">Importo (€)</th>
                        <th className="p-3">Fattura (N°, Data, Importo)</th>
                        <th className="p-3">Stato Pagamento</th>
                        <th className="p-3 w-10"></th>
`;

page = page.split(oldTableHeaders).join(newTableHeaders);

// The row rendering. We need to add the Invoice input columns and the trash icon.
// The existing row has:
// 1. Data Scadenza (input date)
// 2. Importo (input number)
// 3. Stato Pagamento (select)

const oldDentistiRow = `
                                setSelectedDentista({ 
                                  ...selectedDentista, 
                                  payments: updatedPayments,
                                  status: newStatus === 'pagato' ? 'attivo' : (newStatus === 'disdetto' ? 'disdetto' : (newStatus === 'sospeso' ? 'sospeso' : selectedDentista.status))
                                });
                              }}
                              className={\`w-full bg-transparent outline-none font-black text-xs cursor-pointer appearance-none \${
                                p.status === 'pagato' ? 'text-emerald-800' :
                                p.status === 'in_attesa' ? 'text-slate-800' :
                                p.status === 'insoluto' ? 'text-red-900' :
                                p.status === 'disdetto' ? 'text-rose-900' :
                                'text-orange-900'
                              }\`}
                            >
                              <option value="pagato">PAGATO (Regolare)</option>
                              <option value="in_attesa">IN ATTESA</option>
                              <option value="insoluto">INSOLUTO</option>
                              <option value="disdetto">DISDETTO</option>
                              <option value="sospeso">SOSPESO</option>
                            </select>
                          </td>
                        </tr>
`;

const newDentistiRow = `
                                setSelectedDentista({ 
                                  ...selectedDentista, 
                                  payments: updatedPayments,
                                  status: newStatus === 'pagato' ? 'attivo' : (newStatus === 'disdetto' ? 'disdetto' : (newStatus === 'sospeso' ? 'sospeso' : selectedDentista.status))
                                });
                              }}
                              className={\`w-full bg-transparent outline-none font-black text-xs cursor-pointer appearance-none \${
                                p.status === 'pagato' ? 'text-emerald-800' :
                                p.status === 'in_attesa' ? 'text-slate-800' :
                                p.status === 'insoluto' ? 'text-red-900' :
                                p.status === 'disdetto' ? 'text-rose-900' :
                                'text-orange-900'
                              }\`}
                            >
                              <option value="pagato">PAGATO (Regolare)</option>
                              <option value="in_attesa">IN ATTESA</option>
                              <option value="insoluto">INSOLUTO</option>
                              <option value="disdetto">DISDETTO</option>
                              <option value="sospeso">SOSPESO</option>
                            </select>
                          </td>
                          <td className="p-2">
                            <button onClick={() => setPaymentToDelete({isAdmin: false, index})} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                            </button>
                          </td>
                        </tr>
`;

const oldAdminRow = `
                                setSelectedAmministratore({ 
                                  ...selectedAmministratore, 
                                  payments: updatedPayments,
                                  status: newStatus === 'pagato' ? 'attivo' : (newStatus === 'disdetto' ? 'disdetto' : (newStatus === 'sospeso' ? 'sospeso' : selectedAmministratore.status))
                                });
                              }}
                              className={\`w-full bg-transparent outline-none font-black text-xs cursor-pointer appearance-none \${
                                p.status === 'pagato' ? 'text-emerald-800' :
                                p.status === 'in_attesa' ? 'text-slate-800' :
                                p.status === 'insoluto' ? 'text-red-900' :
                                p.status === 'disdetto' ? 'text-rose-900' :
                                'text-orange-900'
                              }\`}
                            >
                              <option value="pagato">PAGATO (Regolare)</option>
                              <option value="in_attesa">IN ATTESA</option>
                              <option value="insoluto">INSOLUTO</option>
                              <option value="disdetto">DISDETTO</option>
                              <option value="sospeso">SOSPESO</option>
                            </select>
                          </td>
                        </tr>
`;

const newAdminRow = `
                                setSelectedAmministratore({ 
                                  ...selectedAmministratore, 
                                  payments: updatedPayments,
                                  status: newStatus === 'pagato' ? 'attivo' : (newStatus === 'disdetto' ? 'disdetto' : (newStatus === 'sospeso' ? 'sospeso' : selectedAmministratore.status))
                                });
                              }}
                              className={\`w-full bg-transparent outline-none font-black text-xs cursor-pointer appearance-none \${
                                p.status === 'pagato' ? 'text-emerald-800' :
                                p.status === 'in_attesa' ? 'text-slate-800' :
                                p.status === 'insoluto' ? 'text-red-900' :
                                p.status === 'disdetto' ? 'text-rose-900' :
                                'text-orange-900'
                              }\`}
                            >
                              <option value="pagato">PAGATO (Regolare)</option>
                              <option value="in_attesa">IN ATTESA</option>
                              <option value="insoluto">INSOLUTO</option>
                              <option value="disdetto">DISDETTO</option>
                              <option value="sospeso">SOSPESO</option>
                            </select>
                          </td>
                          <td className="p-2">
                            <button onClick={() => setPaymentToDelete({isAdmin: true, index})} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                            </button>
                          </td>
                        </tr>
`;

page = page.split(oldDentistiRow).join(newDentistiRow);
page = page.split(oldAdminRow).join(newAdminRow);

// We still need to inject the Invoice inputs in the row.
// Let's find: `<td className="p-2">\n<div className="flex items-center ... p.amount ... />\n</div>\n</td>`
const tdAmountD = `
                            <input 
                              type="number" 
                              value={p.amount}
                              onChange={(e) => {
                                let updatedPayments = [...selectedDentista.payments];
                                updatedPayments[index] = { ...updatedPayments[index], amount: Number(e.target.value) };
                                setSelectedDentista({ ...selectedDentista, payments: updatedPayments });
                              }}
                              className="w-16 bg-transparent outline-none font-bold text-slate-700 text-xs text-right"
                            />
                          </div>
                        </td>`;

const newTdAmountD = `
                            <input 
                              type="number" 
                              value={p.amount}
                              onChange={(e) => {
                                let updatedPayments = [...selectedDentista.payments];
                                updatedPayments[index] = { ...updatedPayments[index], amount: Number(e.target.value) };
                                setSelectedDentista({ ...selectedDentista, payments: updatedPayments });
                              }}
                              className="w-16 bg-transparent outline-none font-bold text-slate-700 text-xs text-right"
                            />
                          </div>
                        </td>
                        <td className="p-2 flex items-center gap-2">
                          <input type="text" placeholder="N°" value={p.invoiceNumber || ''} onChange={e => {
                                let updatedPayments = [...selectedDentista.payments];
                                updatedPayments[index] = { ...updatedPayments[index], invoiceNumber: e.target.value };
                                setSelectedDentista({ ...selectedDentista, payments: updatedPayments });
                          }} className="w-12 px-2 py-1 border rounded text-xs bg-white" />
                          <input type="date" value={p.invoiceDate || ''} onChange={e => {
                                let updatedPayments = [...selectedDentista.payments];
                                updatedPayments[index] = { ...updatedPayments[index], invoiceDate: e.target.value };
                                setSelectedDentista({ ...selectedDentista, payments: updatedPayments });
                          }} className="w-24 px-2 py-1 border rounded text-xs bg-white text-slate-500" />
                          <input type="number" placeholder="€" value={p.invoiceAmount || ''} onChange={e => {
                                let updatedPayments = [...selectedDentista.payments];
                                updatedPayments[index] = { ...updatedPayments[index], invoiceAmount: Number(e.target.value) };
                                setSelectedDentista({ ...selectedDentista, payments: updatedPayments });
                          }} className="w-16 px-2 py-1 border rounded text-xs bg-white" />
                        </td>`;
                        
const tdAmountA = `
                            <input 
                              type="number" 
                              value={p.amount}
                              onChange={(e) => {
                                let updatedPayments = [...selectedAmministratore.payments];
                                updatedPayments[index] = { ...updatedPayments[index], amount: Number(e.target.value) };
                                setSelectedAmministratore({ ...selectedAmministratore, payments: updatedPayments });
                              }}
                              className="w-16 bg-transparent outline-none font-bold text-slate-700 text-xs text-right"
                            />
                          </div>
                        </td>`;

const newTdAmountA = `
                            <input 
                              type="number" 
                              value={p.amount}
                              onChange={(e) => {
                                let updatedPayments = [...selectedAmministratore.payments];
                                updatedPayments[index] = { ...updatedPayments[index], amount: Number(e.target.value) };
                                setSelectedAmministratore({ ...selectedAmministratore, payments: updatedPayments });
                              }}
                              className="w-16 bg-transparent outline-none font-bold text-slate-700 text-xs text-right"
                            />
                          </div>
                        </td>
                        <td className="p-2 flex items-center gap-2">
                          <input type="text" placeholder="N°" value={p.invoiceNumber || ''} onChange={e => {
                                let updatedPayments = [...selectedAmministratore.payments];
                                updatedPayments[index] = { ...updatedPayments[index], invoiceNumber: e.target.value };
                                setSelectedAmministratore({ ...selectedAmministratore, payments: updatedPayments });
                          }} className="w-12 px-2 py-1 border rounded text-xs bg-white" />
                          <input type="date" value={p.invoiceDate || ''} onChange={e => {
                                let updatedPayments = [...selectedAmministratore.payments];
                                updatedPayments[index] = { ...updatedPayments[index], invoiceDate: e.target.value };
                                setSelectedAmministratore({ ...selectedAmministratore, payments: updatedPayments });
                          }} className="w-24 px-2 py-1 border rounded text-xs bg-white text-slate-500" />
                          <input type="number" placeholder="€" value={p.invoiceAmount || ''} onChange={e => {
                                let updatedPayments = [...selectedAmministratore.payments];
                                updatedPayments[index] = { ...updatedPayments[index], invoiceAmount: Number(e.target.value) };
                                setSelectedAmministratore({ ...selectedAmministratore, payments: updatedPayments });
                          }} className="w-16 px-2 py-1 border rounded text-xs bg-white" />
                        </td>`;

page = page.split(tdAmountD).join(newTdAmountD);
page = page.split(tdAmountA).join(newTdAmountA);

fs.writeFileSync('src/app/manager/page.tsx', page, 'utf8');
console.log('Payment rows updated.');
