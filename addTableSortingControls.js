const fs = require('fs');

let page = fs.readFileSync('src/app/manager/page.tsx', 'utf8');

// 1. Add sorting state for Amministratori and Dentisti
const stateInsert = `
  // Sorting State for Amministratori
  const [sortFieldAdmin, setSortFieldAdmin] = useState<'name' | 'paese' | 'contractNumber' | 'monthlyFee' | 'status'>('contractNumber');
  const [sortOrderAdmin, setSortOrderAdmin] = useState<'asc' | 'desc'>('asc');

  // Sorting State for Dentisti
  const [sortFieldDentisti, setSortFieldDentisti] = useState<'name' | 'paese' | 'contractNumber' | 'monthlyFee' | 'status'>('contractNumber');
  const [sortOrderDentisti, setSortOrderDentisti] = useState<'asc' | 'desc'>('asc');

  const handleSortAdmin = (field: 'name' | 'paese' | 'contractNumber' | 'monthlyFee' | 'status') => {
    if (sortFieldAdmin === field) {
      setSortOrderAdmin(sortOrderAdmin === 'asc' ? 'desc' : 'asc');
    } else {
      setSortFieldAdmin(field);
      setSortOrderAdmin('asc');
    }
  };

  const handleSortDentisti = (field: 'name' | 'paese' | 'contractNumber' | 'monthlyFee' | 'status') => {
    if (sortFieldDentisti === field) {
      setSortOrderDentisti(sortOrderDentisti === 'asc' ? 'desc' : 'asc');
    } else {
      setSortFieldDentisti(field);
      setSortOrderDentisti('asc');
    }
  };
`;

if (!page.includes('sortFieldAdmin')) {
  page = page.replace(
    "const [clientToDelete, setClientToDelete] = useState<{ id: string, name: string, isAdmin: boolean } | null>(null);",
    "const [clientToDelete, setClientToDelete] = useState<{ id: string, name: string, isAdmin: boolean } | null>(null);" + stateInsert
  );
}

// 2. Sort filteredAmministratori before pagination
const oldFilteredAdminEnd = `return filtered;\n  }, [amministratori, searchQueryAdmin, selectedLetterAdmin, selectedStatusFilterAdmin, selectedMonthAdmin, selectedYearAdmin]);`;

const newFilteredAdminEnd = `    return [...filtered].sort((a, b) => {
      let valA = a[sortFieldAdmin] ?? '';
      let valB = b[sortFieldAdmin] ?? '';
      if (typeof valA === 'string') valA = valA.toLowerCase();
      if (typeof valB === 'string') valB = valB.toLowerCase();

      if (valA < valB) return sortOrderAdmin === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrderAdmin === 'asc' ? 1 : -1;
      return 0;
    });
  }, [amministratori, searchQueryAdmin, selectedLetterAdmin, selectedStatusFilterAdmin, selectedMonthAdmin, selectedYearAdmin, sortFieldAdmin, sortOrderAdmin]);`;

page = page.replace(oldFilteredAdminEnd, newFilteredAdminEnd);

// 3. Sort filteredDentisti before pagination
const oldFilteredDentEnd = `return filtered;\n  }, [dentisti, searchQuery, selectedLetter, selectedStatusFilter, selectedMonth, selectedYear]);`;

const newFilteredDentEnd = `    return [...filtered].sort((a, b) => {
      let valA = a[sortFieldDentisti] ?? '';
      let valB = b[sortFieldDentisti] ?? '';
      if (typeof valA === 'string') valA = valA.toLowerCase();
      if (typeof valB === 'string') valB = valB.toLowerCase();

      if (valA < valB) return sortOrderDentisti === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrderDentisti === 'asc' ? 1 : -1;
      return 0;
    });
  }, [dentisti, searchQuery, selectedLetter, selectedStatusFilter, selectedMonth, selectedYear, sortFieldDentisti, sortOrderDentisti]);`;

page = page.replace(oldFilteredDentEnd, newFilteredDentEnd);

// 4. Update Amministratori Table Header with Clickable Sorting Columns
const oldAdminThs = `<tr className="border-b border-slate-200">
                        <th className="p-4">Amministratore / Studio</th>
                        <th className="p-4">Comune / Provincia</th>
                        <th className="p-4">Contratto N°</th>
                        <th className="p-4">Canone</th>
                        <th className="p-4">Condomini Gestiti</th>
                        <th className="p-4">Ultima Fattura & Scadenza</th>
                        <th className="p-4">Stato</th>
                        <th className="p-4 text-right">Dettaglio</th>
                      </tr>`;

const newAdminThs = `<tr className="border-b border-slate-200 select-none">
                        <th onClick={() => handleSortAdmin('name')} className="p-4 cursor-pointer hover:bg-slate-100 transition-colors">
                          Amministratore / Studio {sortFieldAdmin === 'name' ? (sortOrderAdmin === 'asc' ? '▲' : '▼') : '↕'}
                        </th>
                        <th onClick={() => handleSortAdmin('paese')} className="p-4 cursor-pointer hover:bg-slate-100 transition-colors">
                          Comune / Provincia {sortFieldAdmin === 'paese' ? (sortOrderAdmin === 'asc' ? '▲' : '▼') : '↕'}
                        </th>
                        <th onClick={() => handleSortAdmin('contractNumber')} className="p-4 cursor-pointer hover:bg-slate-100 transition-colors">
                          Contratto N° {sortFieldAdmin === 'contractNumber' ? (sortOrderAdmin === 'asc' ? '▲' : '▼') : '↕'}
                        </th>
                        <th onClick={() => handleSortAdmin('monthlyFee')} className="p-4 cursor-pointer hover:bg-slate-100 transition-colors">
                          Canone {sortFieldAdmin === 'monthlyFee' ? (sortOrderAdmin === 'asc' ? '▲' : '▼') : '↕'}
                        </th>
                        <th className="p-4">Condomini Gestiti</th>
                        <th className="p-4">Ultima Fattura & Scadenza</th>
                        <th onClick={() => handleSortAdmin('status')} className="p-4 cursor-pointer hover:bg-slate-100 transition-colors">
                          Stato {sortFieldAdmin === 'status' ? (sortOrderAdmin === 'asc' ? '▲' : '▼') : '↕'}
                        </th>
                        <th className="p-4 text-right">Dettaglio</th>
                      </tr>`;

page = page.replace(oldAdminThs, newAdminThs);

// 5. Update Dentisti Table Header with Clickable Sorting Columns
const oldDentThs = `<tr className="border-b border-slate-200 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        <th className="p-4">Studio / Dentista</th>
                        <th className="p-4">Comune / Provincia</th>
                        <th className="p-4">Contratto N°</th>
                        <th className="p-4">Canone</th>
                        <th className="p-4">Ultima Fattura & Scadenza</th>
                        <th className="p-4">Stato</th>
                        <th className="p-4 text-right">Dettaglio</th>
                      </tr>`;

const newDentThs = `<tr className="border-b border-slate-200 text-[10px] font-black text-slate-400 uppercase tracking-widest select-none">
                        <th onClick={() => handleSortDentisti('name')} className="p-4 cursor-pointer hover:bg-slate-100 transition-colors">
                          Studio / Dentista {sortFieldDentisti === 'name' ? (sortOrderDentisti === 'asc' ? '▲' : '▼') : '↕'}
                        </th>
                        <th onClick={() => handleSortDentisti('paese')} className="p-4 cursor-pointer hover:bg-slate-100 transition-colors">
                          Comune / Provincia {sortFieldDentisti === 'paese' ? (sortOrderDentisti === 'asc' ? '▲' : '▼') : '↕'}
                        </th>
                        <th onClick={() => handleSortDentisti('contractNumber')} className="p-4 cursor-pointer hover:bg-slate-100 transition-colors">
                          Contratto N° {sortFieldDentisti === 'contractNumber' ? (sortOrderDentisti === 'asc' ? '▲' : '▼') : '↕'}
                        </th>
                        <th onClick={() => handleSortDentisti('monthlyFee')} className="p-4 cursor-pointer hover:bg-slate-100 transition-colors">
                          Canone {sortFieldDentisti === 'monthlyFee' ? (sortOrderDentisti === 'asc' ? '▲' : '▼') : '↕'}
                        </th>
                        <th className="p-4">Ultima Fattura & Scadenza</th>
                        <th onClick={() => handleSortDentisti('status')} className="p-4 cursor-pointer hover:bg-slate-100 transition-colors">
                          Stato {sortFieldDentisti === 'status' ? (sortOrderDentisti === 'asc' ? '▲' : '▼') : '↕'}
                        </th>
                        <th className="p-4 text-right">Dettaglio</th>
                      </tr>`;

page = page.replace(oldDentThs, newDentThs);

fs.writeFileSync('src/app/manager/page.tsx', page, 'utf8');
console.log('Successfully added interactive ascending/descending sorting controls on table columns!');
