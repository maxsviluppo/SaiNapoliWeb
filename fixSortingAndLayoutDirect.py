import re

filepath = 'src/app/manager/page.tsx'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update handleSort functions to reset currentPage to 1
old_sort_funcs = """  const handleSortAdmin = (field: 'name' | 'paese' | 'contractNumber' | 'monthlyFee' | 'status') => {
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
  };"""

new_sort_funcs = """  const handleSortAdmin = (field: 'name' | 'paese' | 'contractNumber' | 'monthlyFee' | 'status') => {
    setCurrentPage(1);
    if (sortFieldAdmin === field) {
      setSortOrderAdmin(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortFieldAdmin(field);
      setSortOrderAdmin('asc');
    }
  };

  const handleSortDentisti = (field: 'name' | 'paese' | 'contractNumber' | 'monthlyFee' | 'status') => {
    setCurrentPage(1);
    if (sortFieldDentisti === field) {
      setSortOrderDentisti(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortFieldDentisti(field);
      setSortOrderDentisti('asc');
    }
  };"""

content = content.replace(old_sort_funcs, new_sort_funcs)

# 2. Update filteredAmministratori and filteredDentisti sorting logic to handle numbers & strings properly
old_admin_sort_logic = """    return [...filtered].sort((a, b) => {
      let valA = a[sortFieldAdmin] ?? '';
      let valB = b[sortFieldAdmin] ?? '';
      if (typeof valA === 'string') valA = valA.toLowerCase();
      if (typeof valB === 'string') valB = valB.toLowerCase();

      if (valA < valB) return sortOrderAdmin === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrderAdmin === 'asc' ? 1 : -1;
      return 0;
    });"""

new_admin_sort_logic = """    return [...filtered].sort((a, b) => {
      let valA = a[sortFieldAdmin];
      let valB = b[sortFieldAdmin];
      if (typeof valA === 'number' && typeof valB === 'number') {
        return sortOrderAdmin === 'asc' ? valA - valB : valB - valA;
      }
      valA = String(valA || '').toLowerCase();
      valB = String(valB || '').toLowerCase();
      return sortOrderAdmin === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
    });"""

content = content.replace(old_admin_sort_logic, new_admin_sort_logic)

old_dent_sort_logic = """    return [...filtered].sort((a, b) => {
      let valA = a[sortFieldDentisti] ?? '';
      let valB = b[sortFieldDentisti] ?? '';
      if (typeof valA === 'string') valA = valA.toLowerCase();
      if (typeof valB === 'string') valB = valB.toLowerCase();

      if (valA < valB) return sortOrderDentisti === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrderDentisti === 'asc' ? 1 : -1;
      return 0;
    });"""

new_dent_sort_logic = """    return [...filtered].sort((a, b) => {
      let valA = a[sortFieldDentisti];
      let valB = b[sortFieldDentisti];
      if (typeof valA === 'number' && typeof valB === 'number') {
        return sortOrderDentisti === 'asc' ? valA - valB : valB - valA;
      }
      valA = String(valA || '').toLowerCase();
      valB = String(valB || '').toLowerCase();
      return sortOrderDentisti === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
    });"""

content = content.replace(old_dent_sort_logic, new_dent_sort_logic)

# 3. Move "Scaduto" badge under studio name in name column (instead of inline next to name)
old_name_col = """                            <td className="p-4 font-bold text-slate-900 flex items-center gap-2">
                              {c.name}
                              {isOverdueActive && (
                                <span className="px-2 py-0.5 bg-red-600 text-white rounded-md text-[9px] font-black uppercase tracking-wider animate-pulse flex items-center gap-1">
                                  <AlertTriangle className="w-3 h-3" /> Scaduto
                                </span>
                              )}
                            </td>"""

new_name_col = """                            <td className="p-4 font-bold text-slate-900">
                              <div className="flex flex-col gap-1 items-start">
                                <span>{c.name}</span>
                                {isOverdueActive && (
                                  <span className="px-2 py-0.5 bg-red-600 text-white rounded-md text-[9px] font-black uppercase tracking-wider animate-pulse flex items-center gap-1 w-fit">
                                    <AlertTriangle className="w-3 h-3" /> Scaduto
                                  </span>
                                )}
                              </div>
                            </td>"""

content = content.replace(old_name_col, new_name_col)

# 4. Remove 🔴 Scaduto badge from Ultima Fattura & Scadenza column cell
old_expiry_badge = """                                        {expStatus === 'scaduto' && (
                                          <span className="px-1.5 py-0.5 bg-red-600 text-white rounded text-[9px] font-black uppercase tracking-wider">🔴 Scaduto</span>
                                        )}"""

content = content.replace(old_expiry_badge, '')

# 5. Make table container scrollable with min-width for responsive screens
content = content.replace('<table className="w-full text-left border-collapse">', '<div className="overflow-x-auto"><table className="w-full text-left border-collapse min-w-[1000px]">')
content = content.replace('</table>\n                </div>', '</table></div>\n                </div>')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Applied sorting fix, name column layout update, and table responsive scroll.")
