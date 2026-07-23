import xlrd
import json
import re
from datetime import datetime, timedelta

SKIP_SHEETS = {
    'Indice', 'Riepilogo', 'INDIRIZZI MAIL',
    'FATTURE 2023', 'FATT. 2024', 'FATT. 2025'
}

FATT_SHEETS = ['FATTURE 2023', 'FATT. 2024', 'FATT. 2025']

filepath = r'C:\Users\Max\Downloads\AMMINISTRATORI - SCUOLE E FATTURE EXEL.xls'
wb = xlrd.open_workbook(filepath)

print('=== BUILDING AMMINISTRATORI DATASET FROM EXCEL ===')


def excel_date_to_str(val):
    if val is None or val == '':
        return ''
    try:
        f = float(val)
        if 30000 < f < 60000:
            dt = datetime(1899, 12, 30) + timedelta(days=f)
            return dt.strftime('%Y-%m-%d')
    except Exception:
        pass
    s = str(val).strip()
    m = re.search(r'(\d{1,2})[/.-](\d{1,2})[/.-](\d{2,4})', s)
    if m:
        day, month, year = int(m.group(1)), int(m.group(2)), int(m.group(3))
        if year < 100:
            year += 2000
        return f'{year:04d}-{month:02d}-{day:02d}'
    return s


def clean_key(name):
    return re.sub(r'[^a-z0-9]', '', (name or '').lower())


def normalize_freq(val):
    s = (val or '').upper().strip()
    if 'SEMESTR' in s:
        return '6 mesi'
    if 'TRIMESTR' in s:
        return '3 mesi'
    if 'MENS' in s:
        return '1 mese'
    if 'BIENN' in s:
        return '2 anni'
    if 'ANN' in s:
        return '1 anno'
    return '1 anno'


def parse_amount(val):
    if val is None or val == '':
        return None
    try:
        return float(str(val).replace(',', '.'))
    except Exception:
        m = re.search(r'(\d+[\.,]?\d*)', str(val).replace(',', '.'))
        if m:
            try:
                return float(m.group(1))
            except Exception:
                pass
    return None


def payment_status(text):
    t = (text or '').upper()
    if any(x in t for x in ['PAGATO', 'PAG', 'B/B', 'OK', 'BONIF']):
        return 'pagato'
    if any(x in t for x in ['INSOL', 'SOLLEC']):
        return 'insoluto'
    return 'in_attesa'


# --- Contact directory from INDIRIZZI MAIL ---
contacts = {}
mail_ws = wb.sheet_by_name('INDIRIZZI MAIL')
for r in range(mail_ws.nrows):
    row = [str(mail_ws.cell_value(r, c)).strip() for c in range(mail_ws.ncols)]
    name = row[2] if len(row) > 2 else ''
    if not name or name.upper() == 'NOMINATIVO':
        continue
    mobile = row[3] if len(row) > 3 else ''
    fisso = row[4] if len(row) > 4 else ''
    email = row[5] if len(row) > 5 else ''
    phone = fisso or mobile
    if mobile and fisso:
        phone = f'{fisso} / {mobile}'
    contacts[clean_key(name)] = {
        'name': name,
        'phone': phone.replace('.0', ''),
        'email': email.lower() if email else ''
    }


admins_master = {}

for sheet_name in wb.sheet_names():
    if sheet_name in SKIP_SHEETS:
        continue

    ws = wb.sheet_by_name(sheet_name)
    key = clean_key(sheet_name)
    if not key:
        continue

    if key not in admins_master:
        admins_master[key] = {
            'id': f'amm_ex_{len(admins_master)+1}',
            'name': sheet_name,
            'letter': sheet_name[0].upper() if sheet_name and sheet_name[0].isalpha() else 'A',
            'contractNumber': None,
            'city': 'Napoli',
            'paese': 'Napoli',
            'phone': '',
            'email': '',
            'condominiums': [],
            'monthlyFee': 150,
            'billingInterval': '1 anno',
            'startDate': '2023-01-01',
            'status': 'attivo',
            'notes': '',
            'nCampioni': '',
            'payments': [],
            'referti': []
        }

    doc = admins_master[key]
    col_map = {}

    for r in range(ws.nrows):
        row = [str(ws.cell_value(r, c)).strip() for c in range(ws.ncols)]
        row_upper = [x.upper() for x in row]
        row_str = ' '.join(row)

        if row[0].upper().startswith('AMM.') or row[0].upper() == 'AMM':
            name_val = row[1] if len(row) > 1 and row[1] else sheet_name
            doc['name'] = name_val
            if name_val and name_val[0].isalpha():
                doc['letter'] = name_val[0].upper()

        if row[0].upper() == 'TELEFONO' and len(row) > 1 and row[1]:
            doc['phone'] = row[1].replace('.0', '')
        if row[0].upper() == 'CELLULARE' and len(row) > 1 and row[1]:
            cell = row[1].replace('.0', '')
            doc['phone'] = f"{doc['phone']} / {cell}" if doc['phone'] else cell
        if row[0].upper() == 'MAIL' and len(row) > 1 and '@' in row[1]:
            doc['email'] = row[1].lower()
        if row[0].upper() == 'STUDIO' and len(row) > 1 and row[1]:
            doc['paese'] = row[1]
            doc['city'] = 'Napoli'

        if row[0].upper().startswith('CONDOMINIO'):
            condo = row[0].strip()
            if condo and condo not in doc['condominiums']:
                doc['condominiums'].append(condo)

        if any('N. FATTURA' in x or 'N.FATTURA' in x for x in row_upper):
            col_map = {}
            for c_idx, cell_text in enumerate(row_upper):
                if 'N CONT' in cell_text or cell_text.startswith('CONTRAT'):
                    col_map['contract'] = c_idx
                elif 'INDIRIZZO' in cell_text:
                    col_map['indirizzo'] = c_idx
                elif 'DATA FATTURA' in cell_text or 'DATA FATT' in cell_text:
                    col_map['inv_date'] = c_idx
                elif 'N. FATTURA' in cell_text or 'N.FATTURA' in cell_text:
                    col_map['inv_num'] = c_idx
                elif 'IMPORTO FATTURA' in cell_text or cell_text == 'IMPORTO':
                    col_map['inv_amount'] = c_idx
                elif 'SCADENZA' in cell_text:
                    col_map['scadenza'] = c_idx
                elif 'FREQUENZA' in cell_text or cell_text == 'FREQUENZA':
                    col_map['frequenza'] = c_idx
                elif 'PAGAMENT' in cell_text:
                    col_map['payments'] = c_idx
            continue

        if any('DATA FATTURA' in x and 'IMPORTO' in ' '.join(row_upper) for x in row_upper):
            col_map = {}
            for c_idx, cell_text in enumerate(row_upper):
                if 'N CONT' in cell_text:
                    col_map['contract'] = c_idx
                elif 'INDIRIZZO' in cell_text:
                    col_map['indirizzo'] = c_idx
                elif 'DATA FATTURA' in cell_text:
                    col_map['inv_date'] = c_idx
                elif 'N. FATTURA' in cell_text:
                    col_map['inv_num'] = c_idx
                elif 'IMPORTO FATTURA' in cell_text:
                    col_map['inv_amount'] = c_idx
                elif 'SCADENZA' in cell_text:
                    col_map['scadenza'] = c_idx
                elif 'FREQUENZA' in cell_text:
                    col_map['frequenza'] = c_idx
                elif 'PAGAMENT' in cell_text:
                    col_map['payments'] = c_idx
            continue

        if not col_map:
            continue

        def cell(col_key):
            idx = col_map.get(col_key, -1)
            return row[idx] if idx != -1 and idx < len(row) else ''

        contract_val = cell('contract')
        inv_num = cell('inv_num').replace('.0', '').strip()
        inv_date = excel_date_to_str(cell('inv_date'))
        amount = parse_amount(cell('inv_amount'))
        scadenza = excel_date_to_str(cell('scadenza'))
        freq = cell('frequenza')
        pay_text = cell('payments') or (row[col_map['payments']] if col_map.get('payments', -1) != -1 and col_map['payments'] < len(row) else '')

        if contract_val:
            try:
                c_num = int(float(contract_val))
                if c_num > 0:
                    if not doc['contractNumber'] or c_num > doc['contractNumber']:
                        doc['contractNumber'] = c_num
            except Exception:
                pass

        if freq:
            doc['billingInterval'] = normalize_freq(freq)

        if inv_num or inv_date or amount:
            due = scadenza or inv_date or '2025-01-01'
            status = payment_status(pay_text)
            doc['payments'].append({
                'id': f"p_{len(doc['payments'])+1}",
                'date': due,
                'amount': amount if amount is not None else 150,
                'status': status,
                'invoiceNumber': inv_num or None,
                'invoiceDate': inv_date or None,
                'invoiceAmount': amount
            })


# Merge global invoice sheets
for fatt_name in FATT_SHEETS:
    try:
        fws = wb.sheet_by_name(fatt_name)
    except Exception:
        continue
    for r in range(2, fws.nrows):
        row = [str(fws.cell_value(r, c)).strip() for c in range(fws.ncols)]
        client = row[7] if len(row) > 7 else ''
        if not client.upper().startswith('AMM'):
            continue
        client_clean = re.sub(r'^AMM\.?\s*', '', client, flags=re.I).strip()
        key = clean_key(client_clean.split()[0] if client_clean else '')
        if not key:
            continue
        if key not in admins_master:
            admins_master[key] = {
                'id': f'amm_ex_{len(admins_master)+1}',
                'name': client_clean,
                'letter': client_clean[0].upper() if client_clean else 'A',
                'contractNumber': None,
                'city': 'Napoli',
                'paese': 'Napoli',
                'phone': '',
                'email': '',
                'condominiums': [],
                'monthlyFee': 150,
                'billingInterval': '1 anno',
                'startDate': '2023-01-01',
                'status': 'attivo',
                'notes': '',
                'nCampioni': '',
                'payments': [],
                'referti': []
            }
        doc = admins_master[key]
        condo = row[8] if len(row) > 8 else ''
        if condo and condo not in doc['condominiums']:
            doc['condominiums'].append(condo)
        inv_num = (row[1] if len(row) > 1 else '').replace('.0', '').strip()
        inv_num = re.sub(r'\s+UNICA$', '', inv_num, flags=re.I)
        amount = parse_amount(row[2] if len(row) > 2 else '')
        inv_date = excel_date_to_str(row[6] if len(row) > 6 else '')
        if inv_num or inv_date or amount:
            doc['payments'].append({
                'id': f"p_fatt_{len(doc['payments'])+1}",
                'date': inv_date or '2025-01-01',
                'amount': amount if amount is not None else 150,
                'status': 'pagato',
                'invoiceNumber': inv_num or None,
                'invoiceDate': inv_date or None,
                'invoiceAmount': amount
            })


# Enrich from contacts directory
for key, doc in admins_master.items():
    ck = clean_key(doc['name'])
    for ckey, cval in contacts.items():
        if key in ckey or ckey in key or ck in ckey or ckey in ck:
            if not doc['phone']:
                doc['phone'] = cval['phone']
            if not doc['email']:
                doc['email'] = cval['email']
            break


final_list = []
contract_auto = 2000

for key in sorted(admins_master.keys(), key=lambda k: admins_master[k]['name'].upper()):
    d = admins_master[key]
    if not d['contractNumber']:
        contract_auto += 1
        d['contractNumber'] = contract_auto
    if not d['phone']:
        d['phone'] = '081 0000000'
    if not d['email']:
        d['email'] = 'info@amministrazione.it'
    if not d['condominiums']:
        d['condominiums'] = ['Condominio non specificato']

    # Deduplicate payments by invoice number + date
    seen = set()
    unique_payments = []
    for p in d['payments']:
        sig = (p.get('invoiceNumber') or '', p.get('invoiceDate') or '', p.get('amount'))
        if sig in seen and sig != ('', '', p.get('amount')):
            continue
        seen.add(sig)
        unique_payments.append(p)
    unique_payments.sort(key=lambda x: x.get('invoiceDate') or x.get('date') or '')
    d['payments'] = unique_payments

    if not d['payments']:
        d['payments'] = [{
            'id': 'p_1',
            'date': '2025-01-01',
            'amount': d['monthlyFee'],
            'status': 'in_attesa'
        }]

    if d['payments']:
        last_amt = d['payments'][-1].get('amount')
        if last_amt:
            d['monthlyFee'] = last_amt

    final_list.append(d)

out_path = 'src/data/amministratori_full_excel_master.json'
with open(out_path, 'w', encoding='utf-8') as f:
    json.dump(final_list, f, indent=2, ensure_ascii=False)

print(f'Saved {len(final_list)} administrators into {out_path}')
abbate = [a for a in final_list if 'ABBATE' in a['name'].upper()]
print(f'Abbate records: {len(abbate)}')
if abbate:
    a = abbate[0]
    print(f"  name={a['name']}, condos={len(a['condominiums'])}, payments={len(a['payments'])}, contract={a['contractNumber']}")
