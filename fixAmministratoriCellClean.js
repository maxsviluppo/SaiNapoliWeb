const fs = require('fs');

let page = fs.readFileSync('src/app/manager/page.tsx', 'utf8');

const targetSnippet = `                             <td className="p-4 font-medium text-xs">
                               {(() => {
                                 const lastInvoice = [...c.payments].reverse().find(p => p.invoiceNumber || p.invoiceDate);
                                 const lastPaid = [...c.payments].reverse().find(p => p.status === 'pagato');
                                 const dueDate = lastPaid?.date ? addIntervalToDate(lastPaid.date, c.billingInterval || '1 anno') : (c.payments[c.payments.length - 1]?.date || '');
                                 const expStatus = getExpiryStatus(dueDate);
                                 return (
                                   <div className="flex flex-col gap-0.5">
                                     <div className="font-mono text-slate-900 font-bold">
                             </td>`;

const replacementSnippet = `                             <td className="p-4 font-medium text-xs">
                               {(() => {
                                 const lastInvoice = [...c.payments].reverse().find(p => p.invoiceNumber || p.invoiceDate);
                                 const lastPaid = [...c.payments].reverse().find(p => p.status === 'pagato');
                                 const dueDate = lastPaid?.date ? addIntervalToDate(lastPaid.date, c.billingInterval || '1 anno') : (c.payments[c.payments.length - 1]?.date || '');
                                 const expStatus = getExpiryStatus(dueDate);
                                 return (
                                   <div className="flex flex-col gap-0.5">
                                     <div className="font-mono text-slate-900 font-bold">
                                       {lastInvoice ? \`Fatt. N° \${lastInvoice.invoiceNumber || 'N/D'} del \${lastInvoice.invoiceDate || 'N/D'}\` : <span className="text-slate-400 italic">Nessuna fattura</span>}
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
                             </td>`;

if (page.includes(targetSnippet)) {
  page = page.replace(targetSnippet, replacementSnippet);
  fs.writeFileSync('src/app/manager/page.tsx', page, 'utf8');
  console.log('Successfully replaced corrupted snippet in page.tsx!');
} else {
  console.log('Target snippet not matched directly.');
}
