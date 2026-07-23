const fs = require('fs');

let page = fs.readFileSync('src/app/manager/page.tsx', 'utf8');

// 1. Update Contract Number styling in Amministratori Table
const oldAdminContractCell = `<td className="p-4 font-mono font-bold text-slate-700">
                               {c.contractNumber ? \`N° \${c.contractNumber}\` : <span className="text-slate-400 italic">Non reperibile</span>}
                             </td>`;

const newAdminContractCell = `<td className="p-4 font-mono">
                               {c.contractNumber ? (
                                 <span className="text-sm font-black text-purple-950 bg-purple-50 px-3 py-1 rounded-xl border border-purple-200 shadow-sm inline-block">
                                   N° {c.contractNumber}
                                 </span>
                               ) : <span className="text-slate-400 italic text-xs">Non reperibile</span>}
                             </td>`;

page = page.replace(oldAdminContractCell, newAdminContractCell);

// 2. Update Contract Number styling in Dentisti Table
page = page.replace(oldAdminContractCell, newAdminContractCell);

// 3. Bump storage key to v11 to reload dynamic status & font sizes in browser
page = page.split('sai_dentisti_db_v10').join('sai_dentisti_db_v11');

fs.writeFileSync('src/app/manager/page.tsx', page, 'utf8');
console.log('Successfully updated Contract Number font size in dashboard and bumped storage key to v11!');
