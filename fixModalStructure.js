const fs = require('fs');
let page = fs.readFileSync('src/app/manager/page.tsx', 'utf8');

// Clean up Dentisti Modal Footer (around line 2475)
const oldDentFooterBlock = `              </div> {/* FINE COLONNA DESTRA */}
              </div> {/* FINE GRID DESKTOP */}

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
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
                  </button>
                <button 
                  type="submit"
                  className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-xs shadow-md shadow-purple-600/20 transition-all flex items-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" /> Salva Modifiche
                </button>
              </div>
            </form>`;

const newDentFooterBlock = `                </div> {/* FINE COLONNA DESTRA */}
              </div> {/* FINE GRID DESKTOP */}

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
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
                  </button>
                  <button 
                    type="submit"
                    className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-xs shadow-md shadow-purple-600/20 transition-all flex items-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4" /> Salva Modifiche
                  </button>
                </div>
              </div>
            </form>`;

page = page.replace(oldDentFooterBlock, newDentFooterBlock);

// Clean up Admin Modal Footer (around line 2075)
const oldAdminFooterBlock = `                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
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
                  </button>
                <button 
                  type="submit"
                  className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-xs shadow-md shadow-purple-600/20 transition-all"
                >
                  Salva Modifiche
                </button>
              </div>
            </form>`;

const newAdminFooterBlock = `                    </div>
                  </div>
                </div> {/* FINE COLONNA DESTRA */}
              </div> {/* FINE GRID DESKTOP */}

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
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
                  </button>
                  <button 
                    type="submit"
                    className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-xs shadow-md shadow-purple-600/20 transition-all"
                  >
                    Salva Modifiche
                  </button>
                </div>
              </div>
            </form>`;

page = page.replace(oldAdminFooterBlock, newAdminFooterBlock);

fs.writeFileSync('src/app/manager/page.tsx', page, 'utf8');
console.log('Fixed div tag balance in both modal footers.');
