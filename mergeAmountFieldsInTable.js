const fs = require('fs');
let page = fs.readFileSync('src/app/manager/page.tsx', 'utf8');

// 1. Update Dentisti Scadenzario Table Header & Inputs
const oldDentHeader = `<th className="p-3">Fattura (N°, Data, Importo)</th>`;
const newDentHeader = `<th className="p-3">Dati Fattura (N° e Data)</th>`;
page = page.replace(oldDentHeader, newDentHeader);

// In Dentisti table row, simplify invoice cell to 2 inputs (N° Fatt. and Data Fatt.)
const oldDentInvoiceCell = `<div className="flex items-center gap-1.5">
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
                              </div>`;

const newDentInvoiceCell = `<div className="flex items-center gap-1.5">
                                <input 
                                  type="text" 
                                  placeholder="N° Fatt." 
                                  value={p.invoiceNumber || ''} 
                                  onChange={(e) => {
                                    const updatedPayments = [...selectedDentista.payments];
                                    updatedPayments[index] = { ...updatedPayments[index], invoiceNumber: e.target.value };
                                    setSelectedDentista({ ...selectedDentista, payments: updatedPayments });
                                  }} 
                                  className="w-24 px-2 py-1 border border-slate-200 rounded-lg text-xs bg-white font-mono font-bold text-slate-800" 
                                />
                                <input 
                                  type="date" 
                                  value={p.invoiceDate || ''} 
                                  onChange={(e) => {
                                    const updatedPayments = [...selectedDentista.payments];
                                    updatedPayments[index] = { ...updatedPayments[index], invoiceDate: e.target.value };
                                    setSelectedDentista({ ...selectedDentista, payments: updatedPayments });
                                  }} 
                                  className="w-32 px-2 py-1 border border-slate-200 rounded-lg text-xs bg-white text-slate-700" 
                                />
                              </div>`;

page = page.replace(oldDentInvoiceCell, newDentInvoiceCell);

// 2. Update Amministratori Scadenzario Table Header & Inputs
page = page.replace(oldDentHeader, newDentHeader); // in case there's another match

const oldAdminInvoiceCell = `<div className="flex items-center gap-1.5">
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
                                </div>`;

const newAdminInvoiceCell = `<div className="flex items-center gap-1.5">
                                  <input 
                                    type="text" 
                                    placeholder="N° Fatt." 
                                    value={p.invoiceNumber || ''} 
                                    onChange={(e) => {
                                      const updatedPayments = [...selectedAmministratore.payments];
                                      updatedPayments[index] = { ...updatedPayments[index], invoiceNumber: e.target.value };
                                      setSelectedAmministratore({ ...selectedAmministratore, payments: updatedPayments });
                                    }} 
                                    className="w-24 px-2 py-1 border border-slate-200 rounded-lg text-xs bg-white font-mono font-bold text-slate-800" 
                                  />
                                  <input 
                                    type="date" 
                                    value={p.invoiceDate || ''} 
                                    onChange={(e) => {
                                      const updatedPayments = [...selectedAmministratore.payments];
                                      updatedPayments[index] = { ...updatedPayments[index], invoiceDate: e.target.value };
                                      setSelectedAmministratore({ ...selectedAmministratore, payments: updatedPayments });
                                    }} 
                                    className="w-32 px-2 py-1 border border-slate-200 rounded-lg text-xs bg-white text-slate-700" 
                                  />
                                </div>`;

page = page.replace(oldAdminInvoiceCell, newAdminInvoiceCell);

// 3. Update storage key to sai_dentisti_db_v5 to force browser data refresh
page = page.split('sai_dentisti_db_v4').join('sai_dentisti_db_v5');

fs.writeFileSync('src/app/manager/page.tsx', page, 'utf8');
console.log('Merged amount fields and updated storage key to sai_dentisti_db_v5');
