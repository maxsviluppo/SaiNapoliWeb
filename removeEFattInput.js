const fs = require('fs');

let page = fs.readFileSync('src/app/manager/page.tsx', 'utf8');

const targetInput = `<input 
                                 type="number" 
                                 placeholder="€ Fatt." 
                                 value={p.invoiceAmount ?? ''} 
                                 onChange={(e) => {
                                   const updatedPayments = [...selectedDentista.payments];
                                   updatedPayments[index] = { ...updatedPayments[index], invoiceAmount: e.target.value ? parseFloat(e.target.value) : undefined };
                                   setSelectedDentista({ ...selectedDentista, payments: updatedPayments });
                                 }} 
                                 className="w-20 px-2 py-1 border border-slate-200 rounded-lg text-xs bg-white font-bold" 
                               />`;

if (page.includes(targetInput)) {
  page = page.replace(targetInput, '');
  console.log('Removed € Fatt. input from Dentisti modal.');
}

// Check for any other placeholder="€ Fatt."
page = page.replace(/<input[^>]*placeholder="€ Fatt\."[^>]*\/>/g, '');

fs.writeFileSync('src/app/manager/page.tsx', page, 'utf8');
console.log('Successfully cleaned all € Fatt. inputs from page.tsx!');
