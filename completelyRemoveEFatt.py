import re

filepath = 'src/app/manager/page.tsx'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Remove the € Fatt. input block from Dentisti modal
efatt_input_regex = r'\s*<input\s+type="number"\s+placeholder="€ Fatt\."[\s\S]*?/>'
content = re.sub(efatt_input_regex, '', content)

# 2. In Printable A4 tables, remove the extra <th className="border border-slate-300 p-2">Importo Fattura</th>
content = content.replace('<th className="border border-slate-300 p-2">Importo Fattura</th>\n', '')
content = content.replace('<th className="border border-slate-300 p-2">Importo Fattura</th>', '')
content = content.replace('<td className="border border-slate-300 p-2 font-bold">{p.invoiceAmount ? `€${p.invoiceAmount}` : \'-\'}</td>\n', '')
content = content.replace('<td className="border border-slate-300 p-2 font-bold">{p.invoiceAmount ? `€${p.invoiceAmount}` : \'-\'}</td>', '')

# 3. Bump local storage database key to v7 to ensure fresh load in browser/incognito
content = content.replace('sai_dentisti_db_v6', 'sai_dentisti_db_v7')
content = content.replace('sai_dentisti_db_v5', 'sai_dentisti_db_v7')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Successfully removed all € Fatt. inputs and extra columns. Storage key bumped to v7.")
