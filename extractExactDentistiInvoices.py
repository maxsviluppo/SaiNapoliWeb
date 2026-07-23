import xlrd
import json
import re
from datetime import datetime, timedelta

def excel_date_to_str(val):
    if not val:
        return ""
    try:
        f = float(val)
        if f > 30000 and f < 60000:
            dt = datetime(1899, 12, 30) + timedelta(days=f)
            return dt.strftime('%Y-%m-%d')
    except:
        pass
    s = str(val).strip()
    m = re.search(r'(\d{1,2})[/.-](\d{1,2})[/.-](\d{2,4})', s)
    if m:
        day, month, year = int(m.group(1)), int(m.group(2)), int(m.group(3))
        if year < 100:
            year += 2000
        return f"{year:04d}-{month:02d}-{day:02d}"
    return s

filepath = r'C:\Users\Max\Downloads\DENTISTI. SI EXEL.xls'
wb = xlrd.open_workbook(filepath)

# Store accurate doctor invoices mapped by clean key
accurate_lookup = {}

for sheet_name in wb.sheet_names():
    if sheet_name in ['RIEPILOGO', 'Rendiconto', 'INDICE']:
        continue
        
    ws = wb.sheet_by_name(sheet_name)
    current_doc_key = None
    current_doc_name = None
    
    col_inv_num = -1
    col_inv_date = -1
    col_inv_amt = -1
    col_payments = -1
    
    for r in range(ws.nrows):
        row = [str(ws.cell_value(r, c)).strip() for c in range(ws.ncols)]
        header_text = " ".join([x for x in row[:3] if x])
        
        # Check doctor header row
        if any(h in header_text.upper() for h in ['DOTT', 'STUDIO', 'CENTRO', 'ASS.', 'S.O.A', 'CLINIC', 'DENTAL', 'MEDICA', 'SDP', 'FARMA']):
            if not any(x in header_text.upper() for x in ['CONTRATTI', 'INDIRIZZO', 'FREQUENZA', 'TELEFONO', 'P.IVA', 'EMAIL']):
                doc_name = header_text.replace('DOTT.SSA', '').replace('DOTT.', '').replace('DOTT', '').replace('STUDIO', '').replace('CENTRO', '').strip()
                clean_key = re.sub(r'[^a-z0-9]', '', doc_name.lower())
                
                if clean_key and len(clean_key) > 2:
                    current_doc_key = clean_key
                    current_doc_name = header_text
                    col_inv_num = -1
                    col_inv_date = -1
                    col_inv_amt = -1
                    col_payments = -1
        
        # Check header row to find EXACT column indices
        row_upper = [x.upper() for x in row]
        if any('FATTURA' in x or 'PAGAMENTI' in x for x in row_upper):
            for c_idx, cell_text in enumerate(row_upper):
                # Target EXACT N. Fattura column (ignore NUM. PROFORMA)
                if ('N. FATTURA' in cell_text or 'N.FATTURA' in cell_text or 'N° FATTURA' in cell_text) and 'PROFORMA' not in cell_text:
                    col_inv_num = c_idx
                elif 'DATA FATTURA' in cell_text or 'DATA FATT' in cell_text:
                    col_inv_date = c_idx
                elif 'IMPORTO FATTURA' in cell_text or 'IMPORTO FATT' in cell_text:
                    col_inv_amt = c_idx
                elif 'PAGAMENTI' in cell_text:
                    col_payments = c_idx
            continue

        # Data extraction using exact column positions
        if current_doc_key and (col_inv_num != -1 or col_inv_date != -1 or col_inv_amt != -1):
            inv_num_raw = row[col_inv_num] if col_inv_num != -1 and col_inv_num < len(row) else ''
            inv_date_raw = row[col_inv_date] if col_inv_date != -1 and col_inv_date < len(row) else ''
            inv_amt_raw = row[col_inv_amt] if col_inv_amt != -1 and col_inv_amt < len(row) else ''
            payment_val = row[col_payments] if col_payments != -1 and col_payments < len(row) else ''
            
            # Skip header repeats or invalid text
            if inv_num_raw.upper() in ['N. FATTURA', 'N.FATTURA', 'N° FATTURA'] or inv_date_raw.upper() in ['DATA FATTURA']:
                continue
                
            clean_num = inv_num_raw.replace('.0', '').strip()
            clean_date = excel_date_to_str(inv_date_raw)
            
            # Parse exact amount float
            amount = None
            if inv_amt_raw:
                try:
                    amount = float(inv_amt_raw)
                except:
                    m_amt = re.search(r'(\d+[\.,]?\d*)', inv_amt_raw.replace(',', '.'))
                    if m_amt:
                        try:
                            amount = float(m_amt.group(1))
                        except:
                            pass
            
            # Determine payment status
            status = 'pagato' if ('PAGATO' in payment_val.upper() or 'PAG' in payment_val.upper() or 'OK' in payment_val.upper() or 'B/B' in payment_val.upper()) else 'in_attesa'
            
            if clean_num or clean_date or amount:
                if current_doc_key not in accurate_lookup:
                    accurate_lookup[current_doc_key] = []
                
                accurate_lookup[current_doc_key].append({
                    'invoiceNumber': clean_num,
                    'invoiceDate': clean_date,
                    'amount': amount,
                    'invoiceAmount': amount,
                    'paymentText': payment_val,
                    'status': status
                })

print(f"Extracted accurate invoices for {len(accurate_lookup)} doctors.")

# Match with dentisti_names.json (488 names)
dentistiNames = json.load(open('src/data/dentisti_names.json', encoding='utf-8'))
matched_lookup = {}
matched_count = 0

for fullName in dentistiNames:
    cleanName = fullName.strip()
    normKey = re.sub(r'[^a-z0-9]', '', cleanName.lower())
    
    matched_pays = []
    for k in accurate_lookup:
        if k == normKey or k in normKey or normKey in k:
            matched_pays.extend(accurate_lookup[k])
    
    if len(matched_pays) > 0:
        matched_count += 1
        matched_lookup[normKey] = matched_pays

print(f"STRICT MATCHED DOCTORS WITH EXACT FATTURE: {matched_count} / {len(dentistiNames)}")

# Sample check for CAPUANO MICHELA, ACIERNO DANILO, AIELLO ROSARIO
for test_key in ['capuanomichela', 'aciernodanilo', 'aiellorosario', 'abbate']:
    for k in matched_lookup:
        if test_key in k:
            print(f"\nDoctor Key '{k}':")
            print(json.dumps(matched_lookup[k][:3], indent=2))

with open('src/data/invoices_lookup.json', 'w', encoding='utf-8') as f:
    json.dump(matched_lookup, f, indent=2, ensure_ascii=False)

print("Saved exact invoices_lookup.json!")
