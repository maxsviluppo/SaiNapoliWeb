const fs = require('fs');
let page = fs.readFileSync('src/app/manager/page.tsx', 'utf8');

// For Dentisti Table Headers
const dth = '<th className="p-4">N° Contratto</th>';
// This matches both Dentisti and Amministratori tables actually, but wait, the Amministratori table was replaced so it might have the same line.
// The request says "i campioni vale solo per i dentisti", so we only do it for Dentisti.
// Dentisti block is the second table in the file (Wait! Amministratori is first if activeTab === 'amministratori').
// The easiest way is to target the `selectedDentista` block or `activeTab === 'dentisti'` block.
// But we want to add the column only for Dentisti table.
// Let's use string split on '/* TAB: DENTISTI */'
const parts = page.split('/* TAB: DENTISTI */');
if(parts.length > 1) {
  let dentistiBlock = parts[1];
  dentistiBlock = dentistiBlock.replace('<th className="p-4">N° Contratto</th>', '<th className="p-4">N° Contratto</th>\n                        <th className="p-4">N. Campioni</th>');
  
  dentistiBlock = dentistiBlock.replace('<td className="p-4 font-bold text-slate-700">{c.contractNumber || \'N/D\'}</td>', '<td className="p-4 font-bold text-slate-700">{c.contractNumber || \'N/D\'}</td>\n                            <td className="p-4 font-medium text-slate-600">{c.nCampioni || \'-\'}</td>');
  
  page = parts[0] + '/* TAB: DENTISTI */' + dentistiBlock;
}

fs.writeFileSync('src/app/manager/page.tsx', page, 'utf8');
console.log('N. Campioni table columns added for dentisti.');
