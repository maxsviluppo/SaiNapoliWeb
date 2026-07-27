# -*- coding: utf-8 -*-
"""Parse GESTIONE - HACCP.xls (1255 sheets) into registri_full_excel_master.json"""
import xlrd
import json
import re
from datetime import datetime, timedelta

FILEPATH = r'C:\Users\Max\Downloads\data base sai\data base sai\GESTIONE - HACCP.xls'
OUTPATH = r'src/data/registri_full_excel_master.json'
SKIP = {'Indice', 'Riepilogo', 'indice', 'riepilogo'}


def excel_date_to_str(val):
    if val is None or val == '':
        return ''
    try:
        f = float(val)
        if 20000 < f < 60000:
            dt = datetime(1899, 12, 30) + timedelta(days=int(f))
            return dt.strftime('%Y-%m-%d')
    except Exception:
        pass
    s = str(val).strip()
    m = re.search(r'(\d{1,2})[/.-](\d{1,2})[/.-](\d{2,4})', s)
    if m:
        d, mo, y = int(m.group(1)), int(m.group(2)), int(m.group(3))
        if y < 100:
            y += 2000
        try:
            return f'{y:04d}-{mo:02d}-{d:02d}'
        except Exception:
            return s
    return s


def parse_amount(val):
    if val is None or val == '':
        return None
    s = str(val).replace('€', '').replace('EURO', '').replace('euro', '')
    # take first number like 300,00 or 120 + 120
    m = re.search(r'(\d+[.,]?\d*)', s.replace(' ', ''))
    if not m:
        return None
    try:
        return float(m.group(1).replace(',', '.'))
    except Exception:
        return None


def normalize_freq(val):
    s = (val or '').lower()
    if 'semestr' in s:
        return '6 mesi'
    if 'trimestr' in s:
        return '3 mesi'
    if 'mens' in s:
        return '1 mese'
    if 'ann' in s:
        return '1 anno'
    return '1 anno'


def payment_status(text):
    t = (text or '').upper()
    if any(x in t for x in ['PAGATO', 'PAG.', 'B/B', 'A/B', 'BONIF', 'ACC']):
        return 'pagato'
    if any(x in t for x in ['INSOL', 'SOLLEC', 'NON PAG']):
        return 'insoluto'
    return 'in_attesa'


def cell_label(row):
    """Find Ditta/TEL style label in cols 0-2."""
    for i in range(min(3, len(row))):
        v = str(row[i]).strip().upper()
        if v:
            return v, i
    return '', -1


def extract_value_after_label(row, label_idx):
    for i in range(label_idx + 1, min(label_idx + 3, len(row))):
        v = str(row[i]).strip()
        if v:
            return v
    return ''


def infer_city(address):
    s = (address or '').upper()
    if 'CAPRI' in s:
        return 'Capri'
    if 'POZZUOLI' in s:
        return 'Pozzuoli'
    if 'MARANO' in s:
        return 'Marano di Napoli'
    if 'GIUGLIANO' in s:
        return 'Giugliano in Campania'
    if 'CASERTA' in s:
        return 'Caserta'
    if 'SORRENTO' in s:
        return 'Sorrento'
    if 'ISCHIA' in s:
        return 'Ischia'
    if 'TORRE' in s:
        return 'Torre del Greco'
    return 'Napoli'


print('Opening workbook (large file, may take ~1-2 min)...')
wb = xlrd.open_workbook(FILEPATH)
print(f'Sheets: {len(wb.sheet_names())}')

registri = []
contract_auto = 5000

for sheet_name in wb.sheet_names():
    if sheet_name.strip() in SKIP:
        continue

    ws = wb.sheet_by_name(sheet_name)
    name = sheet_name.strip()
    letter = next((c.upper() for c in name if c.isalpha()), 'R')

    doc = {
        'id': f'reg_ex_{len(registri)+1}',
        'name': name,
        'letter': letter,
        'contractNumber': None,
        'referente': '',
        'phone': '',
        'email': '',
        'address': '',
        'city': 'Napoli',
        'paese': 'Napoli',
        'services': '',
        'sdi': '',
        'monthlyFee': 200,
        'billingInterval': '1 anno',
        'status': 'attivo',
        'notes': '',
        'payments': [],
        'years': [],
    }

    current_year = ''
    note_bits = []

    for r in range(ws.nrows):
        row = [str(ws.cell_value(r, c)).strip() for c in range(ws.ncols)]
        label, lidx = cell_label(row)
        row_joined = ' '.join(row).upper()

        # Year markers
        for cell in row:
            mu = cell.upper()
            if mu.startswith('ANNO ') and len(mu) < 20:
                current_year = cell.strip()
                if current_year and current_year not in doc['years']:
                    doc['years'].append(current_year)

        if label.startswith('DITTA') or label.startswith('DOTT'):
            val = extract_value_after_label(row, lidx)
            if val and len(val) > 2:
                # Prefer fuller company name from sheet body
                if len(val) > len(doc['name']) or doc['name'] == name:
                    doc['name'] = val

        if label.startswith('REFERENTE'):
            val = extract_value_after_label(row, lidx)
            if val:
                doc['referente'] = val

        if label.startswith('N CONTRATTO') or label == 'N CONTRATTO':
            val = extract_value_after_label(row, lidx)
            try:
                n = int(float(val))
                if n > 0:
                    doc['contractNumber'] = n
            except Exception:
                m = re.search(r'(\d{2,6})', val or '')
                if m:
                    doc['contractNumber'] = int(m.group(1))

        if label == 'TEL' or label.startswith('TEL '):
            val = extract_value_after_label(row, lidx)
            if val and not val.replace('.', '').isdigit() or (val and '/' in val):
                if val and not doc['phone']:
                    doc['phone'] = val.replace('.0', '')
            elif val and re.search(r'\d{6,}', val.replace(' ', '').replace('/', '')):
                if not doc['phone']:
                    doc['phone'] = val.replace('.0', '')

        if label.startswith('CELLULARE'):
            val = extract_value_after_label(row, lidx)
            if val:
                cell = val.replace('.0', '')
                if doc['phone'] and cell not in doc['phone']:
                    doc['phone'] = f"{doc['phone']} / {cell}"
                elif not doc['phone']:
                    doc['phone'] = cell

        if 'EMAIL' in label:
            val = extract_value_after_label(row, lidx)
            if val and '@' in val:
                doc['email'] = val.lower()
            # sometimes email is misplaced in INDIRIZZO column area
            for c in row:
                if '@' in c and not doc['email']:
                    doc['email'] = c.lower()

        if label.startswith('SDI') or 'CODICE UNIVOCO' in label:
            val = extract_value_after_label(row, lidx)
            if val:
                doc['sdi'] = val

        if label.startswith('INDIRIZZO') or label.startswith('SEDE LEGALE'):
            val = extract_value_after_label(row, lidx)
            if val and ('VIA' in val.upper() or 'VICO' in val.upper() or 'CORSO' in val.upper() or 'PIAZZA' in val.upper() or 'VICOLETTO' in val.upper() or len(val) > 8):
                if not doc['address'] or len(val) > len(doc['address']):
                    doc['address'] = val
                    doc['city'] = infer_city(val)
                    doc['paese'] = doc['address']

        if "CIITA" in label or label.startswith("CITT"):
            val = extract_value_after_label(row, lidx)
            if val and not doc['services']:
                doc['services'] = val
            elif val and val.lower() not in (doc['services'] or '').lower():
                if any(x in val.lower() for x in ['haccp', 'legio', 'split', 'registro', 'acqua']):
                    doc['services'] = (doc['services'] + ' | ' + val).strip(' |')

        if 'STESSO TITOLARE' in row_joined:
            note_bits.append(' '.join([c for c in row if c])[:120])

        # Payment / contract data rows: look for contract date range or amounts near header cols
        # Typical layout starting at col ~3: data contratto | importo | visita | frequenza | fattura | data f. | pagamento | scadenza
        # Find columns dynamically by scanning for known headers in row
        upper_row = [x.upper() for x in row]
        if any('DATA CONTRATTO' in x or x == 'IMPORTO' for x in upper_row) and any('FATTURA' in x or 'PAGAMENTO' in x or 'SCADENZA' in x for x in upper_row):
            continue  # header row

        # Heuristic: row has a date range like 16/09/21 - 16/09/22 OR excel date in visita/scadenza area
        contract_period = ''
        amount = None
        visita = ''
        freq = ''
        inv_num = ''
        inv_date = ''
        pay_text = ''
        scadenza = ''

        # Search for period pattern in row
        for c in row:
            if re.search(r'\d{1,2}/\d{1,2}/\d{2,4}\s*-\s*\d{1,2}/\d{1,2}/\d{2,4}', c):
                contract_period = c
                break

        # Column offsets: many sheets put data starting at index 3 when col0 empty, col1=label, col2=value
        # Try fixed positions based on common layout (cols 3-10)
        def get(idx):
            return row[idx] if idx < len(row) else ''

        # Prefer layout where period is in col 3
        period_col = -1
        for i, c in enumerate(row):
            if re.search(r'\d{1,2}/\d{1,2}/\d{2,4}\s*-\s*\d{1,2}/\d{1,2}/\d{2,4}', c):
                period_col = i
                break

        if period_col >= 0:
            contract_period = row[period_col]
            amount = parse_amount(get(period_col + 1))
            visita = excel_date_to_str(get(period_col + 2)) or get(period_col + 2)
            freq = get(period_col + 3)
            inv_num = get(period_col + 4).replace('.0', '')
            inv_date = excel_date_to_str(get(period_col + 5))
            pay_text = get(period_col + 6)
            scadenza = excel_date_to_str(get(period_col + 7)) or get(period_col + 7)
        else:
            # Continuation rows: empty period but have pagamento / fattura / scadenza
            # look for pagato text
            pay_idx = -1
            for i, c in enumerate(row):
                if 'PAGATO' in c.upper() or 'PAG.' in c.upper() or 'B/B' in c.upper() or 'A/B' in c.upper():
                    pay_idx = i
                    pay_text = c
                    break
            if pay_idx < 0:
                continue
            # try to backfill invoice/amount around pay_idx
            inv_num = get(pay_idx - 2).replace('.0', '') if pay_idx >= 2 else ''
            inv_date = excel_date_to_str(get(pay_idx - 1)) if pay_idx >= 1 else ''
            amount = parse_amount(get(pay_idx - 4)) if pay_idx >= 4 else parse_amount(pay_text)
            scadenza = excel_date_to_str(get(pay_idx + 1)) if pay_idx + 1 < len(row) else ''
            visita = excel_date_to_str(get(pay_idx - 3)) if pay_idx >= 3 else ''
            freq = get(pay_idx - 2) if pay_idx >= 2 and not inv_num else ''

        if not (contract_period or pay_text or inv_num or amount):
            continue

        if freq:
            doc['billingInterval'] = normalize_freq(freq)
        if amount:
            doc['monthlyFee'] = amount

        due = scadenza if scadenza and re.match(r'\d{4}-\d{2}-\d{2}', str(scadenza)) else ''
        if not due:
            due = inv_date if inv_date and re.match(r'\d{4}-\d{2}-\d{2}', str(inv_date)) else ''
        if not due:
            due = visita if visita and re.match(r'\d{4}-\d{2}-\d{2}', str(visita)) else '2025-01-01'

        status = payment_status(pay_text)
        if not pay_text and not inv_num:
            status = 'in_attesa'

        # skip garbage inv numbers that are frequencies
        if inv_num and any(x in inv_num.lower() for x in ['semestr', 'annuale', 'mensile', 'trimestr']):
            inv_num = ''

        doc['payments'].append({
            'id': f'p_{len(doc["payments"])+1}',
            'date': due,
            'amount': amount if amount is not None else doc['monthlyFee'],
            'status': status,
            'invoiceNumber': inv_num or None,
            'invoiceDate': inv_date or None,
            'contractPeriod': contract_period or None,
            'visitDate': visita if visita and re.match(r'\d{4}-\d{2}-\d{2}', str(visita)) else None,
            'yearLabel': current_year or None,
            'paymentNote': pay_text[:180] if pay_text else '',
            'refertoData': '',
            'consegnaReferti': '',
        })

    if not doc['contractNumber']:
        contract_auto += 1
        doc['contractNumber'] = contract_auto
    if not doc['phone']:
        doc['phone'] = '081 0000000'
    if not doc['email']:
        doc['email'] = 'info@cliente.it'
    if not doc['address']:
        doc['address'] = doc['paese'] = 'Napoli'
        doc['city'] = 'Napoli'
    if not doc['payments']:
        doc['payments'] = [{
            'id': 'p_1',
            'date': '2025-01-01',
            'amount': doc['monthlyFee'],
            'status': 'in_attesa',
            'invoiceNumber': None,
            'invoiceDate': None,
            'contractPeriod': None,
            'visitDate': None,
            'yearLabel': None,
            'paymentNote': '',
            'refertoData': '',
            'consegnaReferti': '',
        }]

    # Deduplicate near-identical payments
    seen = set()
    unique = []
    for p in doc['payments']:
        sig = (p.get('invoiceNumber'), p.get('invoiceDate'), p.get('amount'), p.get('date'), (p.get('paymentNote') or '')[:40])
        if sig in seen:
            continue
        seen.add(sig)
        unique.append(p)
    doc['payments'] = unique

    has_insoluto = any(p['status'] == 'insoluto' for p in doc['payments'])
    last = doc['payments'][-1] if doc['payments'] else None
    if has_insoluto:
        doc['status'] = 'sollecito'
    elif last and last['status'] == 'in_attesa':
        doc['status'] = 'attivo'
    else:
        doc['status'] = 'attivo'

    if note_bits:
        doc['notes'] = ' · '.join(note_bits[:3])
    elif doc['services']:
        doc['notes'] = f"Servizi: {doc['services']}"
    else:
        doc['notes'] = f'Registro HACCP — {doc["name"]}'

    registri.append(doc)

    if len(registri) % 200 == 0:
        print(f'  ... {len(registri)} clienti elaborati')

print(f'Total clients: {len(registri)}')
with open(OUTPATH, 'w', encoding='utf-8') as f:
    json.dump(registri, f, indent=2, ensure_ascii=False)
print(f'Saved → {OUTPATH}')
# sample
if registri:
    s = registri[0]
    print(f"Sample: {s['name']} | ctr={s['contractNumber']} | pay={len(s['payments'])} | {s['email']}")
