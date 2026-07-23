const fs = require('fs');
let page = fs.readFileSync('src/app/manager/page.tsx', 'utf8');

// 1. Add clientToDelete state
const stateInsert = `  const [clientToDelete, setClientToDelete] = useState<{ id: string, name: string, isAdmin: boolean } | null>(null);`;
if (!page.includes('clientToDelete')) {
  page = page.replace(
    'const [paymentToDelete, setPaymentToDelete] = useState<{isAdmin: boolean, index: number} | null>(null);',
    'const [paymentToDelete, setPaymentToDelete] = useState<{isAdmin: boolean, index: number} | null>(null);\n' + stateInsert
  );
}

// 2. Fix "+ Nuovo Amministratore" button onClick so it does NOT add to state until saved
const oldAmmClick = `                      const updated = [newAmm, ...amministratori];
                      setAmministratori(updated);
                      setSelectedAmministratore(newAmm);`;

const newAmmClick = `                      // Non salvare nello stato finché l'utente non clicca su "Salva Modifiche"
                      setSelectedAmministratore(newAmm);`;

page = page.replace(oldAmmClick, newAmmClick);

// 3. Fix "+ Nuovo Studio Medico" button onClick so it does NOT add to state until saved
const oldDentClick = `                      const updated = [newDentista, ...dentisti];
                      setDentisti(updated);
                      setSelectedDentista(newDentista);`;

const newDentClick = `                      // Non salvare nello stato finché l'utente non clicca su "Salva Modifiche"
                      setSelectedDentista(newDentista);`;

page = page.replace(oldDentClick, newDentClick);

// 4. Add "Elimina Scheda" button in Dentisti modal footer
const oldDentFooter = `<div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button 
                  type="button"
                  onClick={() => alert(\`Stampa sollecito/verbale per \${selectedDentista.name}\`)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl flex items-center gap-2 text-xs"
                >
                  <Printer className="w-4 h-4" /> Stampa Verbale
                </button>`;

const newDentFooter = `<div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button 
                  type="button"
                  onClick={() => setClientToDelete({ id: selectedDentista.id, name: selectedDentista.name, isAdmin: false })}
                  className="px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-xl text-xs flex items-center gap-1.5 border border-red-200 transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                  Elimina Scheda
                </button>
                
                <div className="flex items-center gap-3">
                  <button 
                    type="button"
                    onClick={() => alert(\`Stampa sollecito/verbale per \${selectedDentista.name}\`)}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl flex items-center gap-2 text-xs"
                  >
                    <Printer className="w-4 h-4" /> Stampa Verbale
                  </button>`;

page = page.replace(oldDentFooter, newDentFooter);

// 5. Add "Elimina Scheda" button in Amministratori modal footer
const oldAdminFooter = `<div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button 
                  type="button"
                  onClick={() => setSelectedAmministratore(null)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs"
                >
                  Chiudi
                </button>`;

const newAdminFooter = `<div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button 
                  type="button"
                  onClick={() => setClientToDelete({ id: selectedAmministratore.id, name: selectedAmministratore.name, isAdmin: true })}
                  className="px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-xl text-xs flex items-center gap-1.5 border border-red-200 transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                  Elimina Scheda
                </button>
                
                <div className="flex items-center gap-3">
                  <button 
                    type="button"
                    onClick={() => setSelectedAmministratore(null)}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs"
                  >
                    Chiudi
                  </button>`;

page = page.replace(oldAdminFooter, newAdminFooter);

// 6. Add clientToDelete Modal JSX before </main>
const clientDeleteModalJSX = `
      {/* MODALE ELIMINAZIONE INTERA SCHEDA ANAGRAFICA */}
      {clientToDelete && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 text-left">
            <div className="flex items-center gap-3 text-red-600 mb-3">
              <div className="w-10 h-10 rounded-2xl bg-red-100 flex items-center justify-center font-bold">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
              </div>
              <h3 className="font-black text-lg text-slate-900">Conferma Eliminazione Scheda</h3>
            </div>
            <p className="text-slate-600 text-xs leading-relaxed mb-6">
              Sei sicuro di voler eliminare definitivamente la scheda anagrafica di <strong className="text-slate-900">{clientToDelete.name}</strong>? Tutti i pagamenti e i dati collegati verranno rimossi. L'operazione non può essere annullata.
            </p>
            <div className="flex gap-3 justify-end">
              <button 
                type="button"
                onClick={() => setClientToDelete(null)}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs"
              >
                Annulla
              </button>
              <button 
                type="button"
                onClick={() => {
                  if (clientToDelete.isAdmin) {
                    const updated = amministratori.filter(a => a.id !== clientToDelete.id);
                    setAmministratori(updated);
                    setSelectedAmministratore(null);
                    try { localStorage.setItem('sai_amministratori_db', JSON.stringify(updated)); } catch(e){}
                  } else {
                    const updated = dentisti.filter(d => d.id !== clientToDelete.id);
                    saveDentisti(updated);
                    setSelectedDentista(null);
                  }
                  setClientToDelete(null);
                }}
                className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-xs shadow-md shadow-red-500/20"
              >
                Sì, Elimina Definitivamente
              </button>
            </div>
          </div>
        </div>
      )}
`;

if (!page.includes('MODALE ELIMINAZIONE INTERA SCHEDA ANAGRAFICA')) {
  page = page.replace('</main>', clientDeleteModalJSX + '\n    </main>');
}

fs.writeFileSync('src/app/manager/page.tsx', page, 'utf8');
console.log('Fixed new client creation to require save, and added client deletion confirmation modal.');
