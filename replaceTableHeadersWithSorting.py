with open('src/app/manager/page.tsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_admin_header = """                      <tr className="select-none bg-slate-100/60">
                        <th onClick={() => handleSortAdmin('name')} className="p-4 cursor-pointer hover:bg-purple-100/50 transition-colors text-purple-900 font-extrabold">
                          Amministratore {sortFieldAdmin === 'name' ? (sortOrderAdmin === 'asc' ? '▲' : '▼') : '↕'}
                        </th>
                        <th onClick={() => handleSortAdmin('paese')} className="p-4 cursor-pointer hover:bg-purple-100/50 transition-colors text-purple-900 font-extrabold">
                          Comune / Provincia {sortFieldAdmin === 'paese' ? (sortOrderAdmin === 'asc' ? '▲' : '▼') : '↕'}
                        </th>
                        <th onClick={() => handleSortAdmin('contractNumber')} className="p-4 cursor-pointer hover:bg-purple-100/50 transition-colors text-purple-900 font-extrabold">
                          Contratto N° {sortFieldAdmin === 'contractNumber' ? (sortOrderAdmin === 'asc' ? '▲' : '▼') : '↕'}
                        </th>
                        <th onClick={() => handleSortAdmin('monthlyFee')} className="p-4 cursor-pointer hover:bg-purple-100/50 transition-colors text-purple-900 font-extrabold">
                          Canone {sortFieldAdmin === 'monthlyFee' ? (sortOrderAdmin === 'asc' ? '▲' : '▼') : '↕'}
                        </th>
                        <th className="p-4">Condomini Gestiti</th>
                        <th className="p-4">Ultima Fattura & Scadenza</th>
                        <th onClick={() => handleSortAdmin('status')} className="p-4 cursor-pointer hover:bg-purple-100/50 transition-colors text-purple-900 font-extrabold">
                          Stato {sortFieldAdmin === 'status' ? (sortOrderAdmin === 'asc' ? '▲' : '▼') : '↕'}
                        </th>
                        <th className="p-4 text-right">Dettaglio</th>
                      </tr>
"""

new_dentisti_header = """                      <tr className="select-none bg-slate-100/60">
                        <th onClick={() => handleSortDentisti('name')} className="p-4 cursor-pointer hover:bg-purple-100/50 transition-colors text-purple-900 font-extrabold">
                          Studio / Dentista {sortFieldDentisti === 'name' ? (sortOrderDentisti === 'asc' ? '▲' : '▼') : '↕'}
                        </th>
                        <th onClick={() => handleSortDentisti('paese')} className="p-4 cursor-pointer hover:bg-purple-100/50 transition-colors text-purple-900 font-extrabold">
                          Comune / Provincia {sortFieldDentisti === 'paese' ? (sortOrderDentisti === 'asc' ? '▲' : '▼') : '↕'}
                        </th>
                        <th onClick={() => handleSortDentisti('contractNumber')} className="p-4 cursor-pointer hover:bg-purple-100/50 transition-colors text-purple-900 font-extrabold">
                          Contratto N° {sortFieldDentisti === 'contractNumber' ? (sortOrderDentisti === 'asc' ? '▲' : '▼') : '↕'}
                        </th>
                        <th onClick={() => handleSortDentisti('monthlyFee')} className="p-4 cursor-pointer hover:bg-purple-100/50 transition-colors text-purple-900 font-extrabold">
                          Canone {sortFieldDentisti === 'monthlyFee' ? (sortOrderDentisti === 'asc' ? '▲' : '▼') : '↕'}
                        </th>
                        <th className="p-4">Ultima Fattura & Scadenza</th>
                        <th onClick={() => handleSortDentisti('status')} className="p-4 cursor-pointer hover:bg-purple-100/50 transition-colors text-purple-900 font-extrabold">
                          Stato {sortFieldDentisti === 'status' ? (sortOrderDentisti === 'asc' ? '▲' : '▼') : '↕'}
                        </th>
                        <th className="p-4 text-right">Dettaglio</th>
                      </tr>
"""

output_lines = []
i = 0
while i < len(lines):
    line = lines[i]
    if 'Amministratore' in line and '<th className="p-4">Amministratore' in line:
        # Replace Admin header block (from <tr> before to </tr> after)
        # backtrack to <tr>
        while len(output_lines) > 0 and '<tr>' not in output_lines[-1]:
            output_lines.pop()
        if len(output_lines) > 0 and '<tr>' in output_lines[-1]:
            output_lines.pop()
        output_lines.append(new_admin_header)
        # fast forward to </tr>
        while i < len(lines) and '</tr>' not in lines[i]:
            i += 1
        i += 1
        continue
    elif 'Studio / Dentista' in line and '<th className="p-4">Studio / Dentista' in line:
        # Replace Dentisti header block
        while len(output_lines) > 0 and '<tr>' not in output_lines[-1]:
            output_lines.pop()
        if len(output_lines) > 0 and '<tr>' in output_lines[-1]:
            output_lines.pop()
        output_lines.append(new_dentisti_header)
        while i < len(lines) and '</tr>' not in lines[i]:
            i += 1
        i += 1
        continue

    output_lines.append(line)
    i += 1

with open('src/app/manager/page.tsx', 'w', encoding='utf-8') as f:
    f.writelines(output_lines)

print("Replaced table headers with interactive sorting arrows!")
