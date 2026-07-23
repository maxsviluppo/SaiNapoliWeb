const fs = require('fs');
let content = fs.readFileSync('src/app/manager/page.tsx', 'utf8');

// ============================================================
// FIX 1: Add sort logic to filteredDentisti useMemo
// ============================================================
content = content.replace(
  `    return filtered;\n  }, [dentisti, searchQuery, selectedLetter, selectedStatusFilter, selectedMonth, selectedYear]);`,
  `    return [...filtered].sort((a, b) => {
      const valA = a[sortFieldDentisti];
      const valB = b[sortFieldDentisti];
      if (typeof valA === 'number' && typeof valB === 'number') {
        return sortOrderDentisti === 'asc' ? valA - valB : valB - valA;
      }
      const strA = String(valA || '').toLowerCase();
      const strB = String(valB || '').toLowerCase();
      return sortOrderDentisti === 'asc' ? strA.localeCompare(strB) : strB.localeCompare(strA);
    });
  }, [dentisti, searchQuery, selectedLetter, selectedStatusFilter, selectedMonth, selectedYear, sortFieldDentisti, sortOrderDentisti]);`
);

// ============================================================
// FIX 2: Add sort logic to filteredAmministratori useMemo
// ============================================================
content = content.replace(
  `    return filtered;\n  }, [amministratori, searchQueryAdmin, selectedLetterAdmin, selectedStatusFilterAdmin, selectedMonthAdmin, selectedYearAdmin]);`,
  `    return [...filtered].sort((a, b) => {
      const valA = a[sortFieldAdmin];
      const valB = b[sortFieldAdmin];
      if (typeof valA === 'number' && typeof valB === 'number') {
        return sortOrderAdmin === 'asc' ? valA - valB : valB - valA;
      }
      const strA = String(valA || '').toLowerCase();
      const strB = String(valB || '').toLowerCase();
      return sortOrderAdmin === 'asc' ? strA.localeCompare(strB) : strB.localeCompare(strA);
    });
  }, [amministratori, searchQueryAdmin, selectedLetterAdmin, selectedStatusFilterAdmin, selectedMonthAdmin, selectedYearAdmin, sortFieldAdmin, sortOrderAdmin]);`
);

// ============================================================
// FIX 3: Remove Canone TH from Dentisti table header
// ============================================================
content = content.replace(
  `                        <th onClick={() => handleSortDentisti('monthlyFee')} className="p-4 cursor-pointer hover:bg-purple-100/50 transition-colors text-purple-900 font-extrabold text-left">
                          Canone {sortFieldDentisti === 'monthlyFee' ? (sortOrderDentisti === 'asc' ? '▲' : '▼') : '↕'}
                        </th>`,
  ``
);

// ============================================================
// FIX 4: Remove Canone TD from Dentisti table body
// ============================================================
const canoeTdDentisti = `                            <td className="p-4 font-bold text-slate-900 whitespace-nowrap">
                              <span className="bg-purple-50 text-purple-900 px-2.5 py-1 rounded-lg border border-purple-100 inline-flex items-center gap-1 text-xs w-fit">
                                <span className="font-extrabold font-mono text-purple-900">€ {c.monthlyFee}</span>
                                <span className="text-slate-400 font-normal">/</span>
                                <span className="text-purple-700 font-semibold">{c.billingInterval || '1 anno'}</span>
                              </span>
                            </td>`;
content = content.replace(canoeTdDentisti, '');

// ============================================================
// FIX 5: Remove Canone TH from Amministratori table header
// ============================================================
content = content.replace(
  `                        <th onClick={() => handleSortAdmin('monthlyFee')} className="p-4 cursor-pointer hover:bg-purple-100/50 transition-colors text-purple-900 font-extrabold text-left">
                          Canone {sortFieldAdmin === 'monthlyFee' ? (sortOrderAdmin === 'asc' ? '▲' : '▼') : '↕'}
                        </th>`,
  ``
);

// ============================================================
// FIX 6: Remove Canone TD from Amministratori table body
// ============================================================
const canoeTdAdmin = `                             <td className="p-4 font-bold text-slate-900 whitespace-nowrap">
                               <div className="flex flex-col gap-1">
                                 <span className="bg-purple-50 text-purple-900 px-2.5 py-1 rounded-lg border border-purple-100 inline-flex items-center gap-1 text-xs w-fit">
                                   <span className="font-extrabold font-mono text-purple-900">€ {c.monthlyFee}</span>
                                   <span className="text-slate-400 font-normal">/</span>
                                   <span className="text-purple-700 font-semibold">{c.billingInterval || '1 anno'}</span>
                                 </span>
                               </div>
                             </td>`;
content = content.replace(canoeTdAdmin, '');

fs.writeFileSync('src/app/manager/page.tsx', content, 'utf8');

// Verify
const hasSortDent = content.includes('sortFieldDentisti, sortOrderDentisti');
const hasSortAdmin = content.includes('sortFieldAdmin, sortOrderAdmin');
const hasCanoneDentTh = content.includes("handleSortDentisti('monthlyFee')");
const hasCanoneAdminTh = content.includes("handleSortAdmin('monthlyFee')");

console.log('Sort logic in filteredDentisti:', hasSortDent ? '✅' : '❌ NOT FOUND');
console.log('Sort logic in filteredAmministratori:', hasSortAdmin ? '✅' : '❌ NOT FOUND');
console.log('Canone TH still in Dentisti:', hasCanoneDentTh ? '❌ STILL THERE' : '✅ REMOVED');
console.log('Canone TH still in Admin:', hasCanoneAdminTh ? '❌ STILL THERE' : '✅ REMOVED');
