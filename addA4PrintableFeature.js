const fs = require('fs');
let page = fs.readFileSync('src/app/manager/page.tsx', 'utf8');

// 1. Add printClient state
if (!page.includes('printClient')) {
  page = page.replace(
    'const [clientToDelete, setClientToDelete] = useState<{ id: string, name: string, isAdmin: boolean } | null>(null);',
    'const [clientToDelete, setClientToDelete] = useState<{ id: string, name: string, isAdmin: boolean } | null>(null);\n  const [printClient, setPrintClient] = useState<ClientContract | AmministratoreContract | null>(null);'
  );
}

// 2. Connect "Stampa Verbale" button in Dentisti modal
const oldDentPrint = `onClick={() => alert(\`Stampa sollecito/verbale per \${selectedDentista.name}\`)}`;
const newDentPrint = `onClick={() => setPrintClient(selectedDentista)}`;
page = page.replace(oldDentPrint, newDentPrint);

// 3. Add "Stampa Verbale" button in Amministratori modal footer
const oldAdminFooterBtns = `<div className="flex items-center gap-3">
                  <button 
                    type="button"
                    onClick={() => setSelectedAmministratore(null)}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs"
                  >
                    Chiudi
                  </button>`;

const newAdminFooterBtns = `<div className="flex items-center gap-3">
                  <button 
                    type="button"
                    onClick={() => setPrintClient(selectedAmministratore)}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl flex items-center gap-2 text-xs"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
                    Stampa Verbale
                  </button>
                  <button 
                    type="button"
                    onClick={() => setSelectedAmministratore(null)}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs"
                  >
                    Chiudi
                  </button>`;

page = page.replace(oldAdminFooterBtns, newAdminFooterBtns);

// 4. Add A4 Printable Modal JSX before </main>
const printableA4JSX = `
      {/* MODALE STAMPA VERBALE A4 VERTICALE */}
      {printClient && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-md flex items-center justify-center z-[70] p-4 overflow-y-auto">
          <div className="w-full max-w-4xl flex flex-col items-center">
            {/* ACTION BAR (NO PRINT) */}
            <div className="no-print w-full max-w-[210mm] bg-slate-900 text-white rounded-t-2xl p-4 flex justify-between items-center shadow-xl">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping"></span>
                <span className="text-xs font-black uppercase tracking-wider">Anteprima Verbale A4 (Verticale)</span>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => window.print()}
                  className="px-5 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-lg transition-all cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
                  Stampa / Salva PDF
                </button>
                <button 
                  onClick={() => setPrintClient(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl text-xs transition-all cursor-pointer"
                >
                  Chiudi
                </button>
              </div>
            </div>

            {/* FOGLIO A4 STAMPABILE */}
            <div 
              id="printable-a4-document"
              className="bg-white text-slate-900 w-full max-w-[210mm] min-h-[297mm] p-10 shadow-2xl border border-slate-200 flex flex-col justify-between font-sans text-xs text-left"
            >
              <div>
                {/* TESTATA LOGO E DOCUMENTO */}
                <div className="flex justify-between items-start border-b-2 border-slate-900 pb-5 mb-6">
                  <div>
                    <h1 className="text-2xl font-black tracking-tight text-slate-900 uppercase">SAI NAPOLI WEB</h1>
                    <p className="text-[10px] font-bold text-slate-500 tracking-wider uppercase mt-0.5">Servizi Ambientali & Igiene - Registri Autoclavi & Verbali</p>
                    <p className="text-[10px] text-slate-400">Via Napoli 100, 80100 Napoli (NA) | Tel: 081 0000000 | info@sainapoli.it</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-black text-purple-700 uppercase tracking-wider">VERBALE DI VERIFICA</div>
                    <div className="text-xs font-mono font-bold text-slate-800 mt-1">N° Contratto: #{printClient.contractNumber || 'N/D'}</div>
                    <div className="text-[10px] text-slate-500 font-medium">Data Emisione: {new Date().toLocaleDateString('it-IT')}</div>
                  </div>
                </div>

                {/* SCHEDA ANAGRAFICA CLIENTE */}
                <div className="mb-6 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <h3 className="font-black text-xs uppercase tracking-wider text-purple-900 mb-3 border-b border-slate-200 pb-1">Dati Anagrafici Cliente / Studio</h3>
                  <div className="grid grid-cols-2 gap-y-2 gap-x-6">
                    <div><strong className="text-slate-500">Ragione Sociale:</strong> <span className="font-bold text-slate-900">{printClient.name}</span></div>
                    <div><strong className="text-slate-500">Stato Contratto:</strong> <span className="font-bold uppercase text-purple-700">{printClient.status}</span></div>
                    <div><strong className="text-slate-500">Comune / Città:</strong> <span className="font-bold text-slate-900">{printClient.paese} ({printClient.city})</span></div>
                    <div><strong className="text-slate-500">Telefono Studio:</strong> <span className="font-bold text-slate-900">{printClient.phone}</span></div>
                    <div><strong className="text-slate-500">Email Ufficiale:</strong> <span className="font-bold text-slate-900">{printClient.email}</span></div>
                    <div><strong className="text-slate-500">Canone / Rinnovo:</strong> <span className="font-bold text-slate-900">€{printClient.monthlyFee} / {printClient.billingInterval}</span></div>
                    {('nCampioni' in printClient) && printClient.nCampioni && (
                      <div className="col-span-2"><strong className="text-slate-500">N° Campioni Registrati:</strong> <span className="font-bold text-blue-700">{printClient.nCampioni}</span></div>
                    )}
                  </div>
                </div>

                {/* RIEPILOGO SCADENZARIO PAGAMENTI & FATTURE */}
                <div className="mb-6">
                  <h3 className="font-black text-xs uppercase tracking-wider text-slate-900 mb-2">Storico Scadenzario Pagamenti & Fatturazione</h3>
                  <table className="w-full border-collapse text-left text-[11px] border border-slate-300">
                    <thead className="bg-slate-100 font-bold text-slate-700 uppercase text-[9px]">
                      <tr>
                        <th className="border border-slate-300 p-2">Data Scadenza</th>
                        <th className="border border-slate-300 p-2">Importo Rata</th>
                        <th className="border border-slate-300 p-2">N° Fattura</th>
                        <th className="border border-slate-300 p-2">Data Fattura</th>
                        <th className="border border-slate-300 p-2">Importo Fattura</th>
                        <th className="border border-slate-300 p-2">Stato Pagamento</th>
                      </tr>
                    </thead>
                    <tbody>
                      {printClient.payments.map((p, idx) => (
                        <tr key={idx} className="border-b border-slate-200">
                          <td className="border border-slate-300 p-2 font-mono font-bold">{p.date}</td>
                          <td className="border border-slate-300 p-2 font-bold">€{p.amount}</td>
                          <td className="border border-slate-300 p-2 font-mono">{p.invoiceNumber || '-'}</td>
                          <td className="border border-slate-300 p-2 font-mono">{p.invoiceDate || '-'}</td>
                          <td className="border border-slate-300 p-2 font-bold">{p.invoiceAmount ? \`€\${p.invoiceAmount}\` : '-'}</td>
                          <td className="border border-slate-300 p-2 uppercase font-black">{p.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* SEZIONE REFERTI SE DISPONIBILE */}
                {printClient.referti && printClient.referti.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-black text-xs uppercase tracking-wider text-slate-900 mb-2">Registro Consegna Referti Ufficiali</h3>
                    <table className="w-full border-collapse text-left text-[11px] border border-slate-300">
                      <thead className="bg-slate-100 font-bold text-slate-700 uppercase text-[9px]">
                        <tr>
                          <th className="border border-slate-300 p-2">Data Consegna</th>
                          <th className="border border-slate-300 p-2">Metodo</th>
                          <th className="border border-slate-300 p-2">Indirizzo / Note</th>
                        </tr>
                      </thead>
                      <tbody>
                        {printClient.referti.map((r, idx) => (
                          <tr key={idx} className="border-b border-slate-200">
                            <td className="border border-slate-300 p-2 font-mono font-bold">{r.dataConsegna}</td>
                            <td className="border border-slate-300 p-2 uppercase font-bold">{r.metodoConsegna}</td>
                            <td className="border border-slate-300 p-2">{r.emailConsegna || 'Rilasciato a mano'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* NOTE DI SERVIZIO */}
                {printClient.notes && (
                  <div className="mb-6 bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <h4 className="font-bold text-[10px] uppercase text-slate-400 mb-1">Note di Servizio & Registri</h4>
                    <p className="text-xs text-slate-800 leading-relaxed whitespace-pre-wrap">{printClient.notes}</p>
                  </div>
                )}
              </div>

              {/* PIÈ DI PAGINA E FIRME */}
              <div className="pt-8 border-t-2 border-slate-900 mt-6">
                <div className="grid grid-cols-2 gap-12 text-center text-xs">
                  <div>
                    <p className="font-bold text-slate-700 mb-12">Firma del Tecnico / Operatore SAI</p>
                    <div className="border-b border-slate-400 w-3/4 mx-auto"></div>
                  </div>
                  <div>
                    <p className="font-bold text-slate-700 mb-12">Timbro e Firma per Accettazione Cliente</p>
                    <div className="border-b border-slate-400 w-3/4 mx-auto"></div>
                  </div>
                </div>
                <div className="text-center text-[9px] text-slate-400 mt-8">
                  Documento generato da SAI NAPOLI WEB - Gestionale Amministratori & Dentisti | Pagina 1 di 1 (A4 Verticale)
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
`;

if (!page.includes('MODALE STAMPA VERBALE A4 VERTICALE')) {
  page = page.replace('</main>', printableA4JSX + '\n    </main>');
}

// 5. Add @media print styles to ensure only #printable-a4-document is printed
const printStyles = `
<style>{\`
  @media print {
    body * {
      visibility: hidden !important;
    }
    #printable-a4-document, #printable-a4-document * {
      visibility: visible !important;
    }
    #printable-a4-document {
      position: fixed !important;
      left: 0 !important;
      top: 0 !important;
      width: 210mm !important;
      min-height: 297mm !important;
      margin: 0 !important;
      padding: 15mm !important;
      box-shadow: none !important;
      border: none !important;
      background: white !important;
    }
    .no-print {
      display: none !important;
    }
  }
\`}</style>
`;

if (!page.includes('@media print')) {
  page = page.replace('return (', printStyles + '\n  return (');
}

fs.writeFileSync('src/app/manager/page.tsx', page, 'utf8');
console.log('Successfully added A4 Vertical Printable Verbale Feature!');
