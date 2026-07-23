import xlrd
import json
import re
from datetime import datetime, timedelta

SKIP_SHEETS = {'Indice ', 'Indice', 'riepilogo', 'RIEPILOGO'}

filepath = r'C:\Users\Max\Downloads\SCUOLE EXEL.xls'
wb = xlrd.open_workbook(filepath)

print('=== BUILDING SCUOLE DATASET FROM EXCEL ===')


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


def normalize_freq(val):
    s = (val or '').upper().strip()
    if 'SEMESTR' in s:
        return '6 mesi'
    if 'TRIMESTR' in s:
        return '3 mesi'
    if 'MENS' in s:
        return '1 mese'
    if 'ANN' in s:
        return '1 anno'
    return '6 mesi'


def payment_status(text, inv_num, amount):
    t = (text or '').upper()
    if any(x in t for x in ['PAGATO', 'PAG', 'B/B', 'OK', 'BONIF']):
        return 'pagato'
    if any(x in t for x in ['INSOL', 'SOLLEC']):
        return 'insoluto'
    if inv_num or amount:
        return 'pagato' if amount else 'in_attesa'
    return 'in_attesa'


def infer_city(address):
    s = (address or '').upper()
    if 'POZZUOLI' in s:
        return 'Pozzuoli', 'Napoli'
    if 'GIUGLIANO' in s:
        return 'Giugliano in Campania', 'Napoli'
    if 'ACERRA' in s:
        return 'Acerra', 'Napoli'
    if 'CASERTA' in s or "SANT'ANTIMO" in s or 'SANTANTIMO' in s:
        return 'Caserta', 'Caserta'
    return 'Napoli', 'Napoli'


schools = []

for sheet_name in wb.sheet_names():
    if sheet_name.strip().upper() in {s.upper() for s in SKIP_SHEETS}:
        continue

    ws = wb.sheet_by_name(sheet_name)
    name = sheet_name.strip()
    letter = name[0].upper() if name and name[0].isalpha() else 'S'

    doc = {
        'id': f'scuola_ex_{len(schools)+1}',
        'name': f'SCUOLA {name.upper()}',
        'paese': 'Napoli',
        'city': 'Napoli',
        'phone': '',
        'email': '',
        'contractNumber': None,
        'billingInterval': '6 mesi',
        'monthlyFee': 350,
        'status': 'attivo',
        'notes': '',
        'letter': letter,
        'nCampioni': '',
        'payments': []
    }

    plessi = []
    col_map = {}
    note_parts = []

    for r in range(ws.nrows):
        row = [str(ws.cell_value(r, c)).strip() for c in range(ws.ncols)]
        row_upper = [x.upper() for x in row]
        label = row[0].upper() if row else ''

        if label.startswith('DIRIGENTE'):
            if len(row) > 1 and row[1]:
                note_parts.append(f'Dirigente: {row[1]}')
        if label == 'TELEFONO' and len(row) > 1:
            doc['phone'] = row[1].replace('.0', '')
        if label in ('CELLULARE', 'FAX') and len(row) > 1 and row[1] and not doc['phone']:
            doc['phone'] = row[1].replace('.0', '')
        if 'EMAIL' in label and len(row) > 1 and '@' in row[1]:
            doc['email'] = row[1].lower()
        if 'FREQ' in label and len(row) > 1:
            doc['billingInterval'] = normalize_freq(row[1])
        if 'N. CAMPIONI' in label or label == 'CAMPIONI':
            if len(row) > 1 and row[1]:
                doc['nCampioni'] = row[1].replace('.0', '')
        if label == 'CONTRATTI' or label == 'CONTRATTO':
            if len(row) > 1 and row[1]:
                m = re.search(r'(\d{2,6})', row[1])
                if m:
                    doc['contractNumber'] = int(m.group(1))
        if label == 'INDIRIZZO' and len(row) > 1 and row[1]:
            doc['paese'] = row[1]
            doc['city'], doc['paese'] = infer_city(row[1])
            if doc['paese'] == doc['city']:
                doc['paese'] = row[1]
        if label in ('SEDE CENTRALE', 'PLESSO') and len(row) > 1 and row[1]:
            plessi.append(f'{row[0]}: {row[1]}')
        if 'IMPORTO' in label and 'EURO' in ' '.join(row_upper):
            amt = parse_amount(re.sub(r'[^\d,\.]', ' ', row[1]))
            if amt:
                doc['monthlyFee'] = amt

        if any('FATTURA' in x or 'PRELIEVO' in x for x in row_upper):
            col_map = {}
            for c_idx, cell_text in enumerate(row_upper):
                if 'PRELIEVO' in cell_text or 'DATA ULTIMO' in cell_text:
                    col_map['prelievo'] = c_idx
                elif 'N. FATTURA' in cell_text or 'N.FATTURA' in cell_text:
                    col_map['inv_num'] = c_idx
                elif 'DATA FATTURA' in cell_text or 'DATA FATT' in cell_text:
                    col_map['inv_date'] = c_idx
                elif 'IMPORTO' in cell_text:
                    col_map['inv_amount'] = c_idx
                elif 'SCADENZA' in cell_text:
                    col_map['scadenza'] = c_idx
            continue

        if not col_map:
            continue

        def cell(key):
            idx = col_map.get(key, -1)
            return row[idx] if idx != -1 and idx < len(row) else ''

        prelievo = excel_date_to_str(cell('prelievo'))
        inv_num = cell('inv_num').replace('.0', '').strip()
        inv_date = excel_date_to_str(cell('inv_date'))
        amount = parse_amount(cell('inv_amount'))
        scadenza_raw = cell('scadenza')
        scadenza = excel_date_to_str(scadenza_raw)
        pay_text = scadenza_raw if not scadenza else scadenza_raw

        if not (prelievo or inv_num or inv_date or amount):
            continue
        if inv_num.upper().startswith('DA FATT'):
            status = 'in_attesa'
        else:
            status = payment_status(pay_text, inv_num, amount)

        due = scadenza if scadenza else (inv_date if inv_date else (prelievo if prelievo else None))
        if not due:
            continue
        doc['payments'].append({
            'id': f'p_{len(doc["payments"])+1}',
            'date': due,
            'amount': amount if amount is not None else doc['monthlyFee'],
            'status': status,
            'invoiceNumber': inv_num or None,
            'invoiceDate': inv_date or prelievo or None,
            'refertoData': '',
            'consegnaReferti': ''
        })

    if plessi:
        note_parts.append('Plessi: ' + ' | '.join(plessi[:8]))
    doc['notes'] = '. '.join(note_parts) if note_parts else f'Plesso scolastico {name} - Excel import'

    if not doc['phone']:
        doc['phone'] = '081 0000000'
    if not doc['email']:
        doc['email'] = 'scuola@istruzione.it'

    if not doc['payments']:
        doc['payments'] = [{
            'id': 'p_1',
            'date': '2025-01-01',
            'amount': doc['monthlyFee'],
            'status': 'in_attesa',
            'refertoData': '',
            'consegnaReferti': ''
        }]

    has_insoluto = any(p['status'] == 'insoluto' for p in doc['payments'])
    has_pending = any(p['status'] == 'in_attesa' for p in doc['payments'])
    if has_insoluto:
        doc['status'] = 'sollecito'
    elif has_pending:
        doc['status'] = 'attivo'

    schools.append(doc)

contract_auto = 3000
for s in schools:
    if not s['contractNumber']:
        contract_auto += 1
        s['contractNumber'] = contract_auto

out = 'src/data/scuole_full_excel_master.json'
with open(out, 'w', encoding='utf-8') as f:
    json.dump(schools, f, indent=2, ensure_ascii=False)

print(f'Saved {len(schools)} schools into {out}')
