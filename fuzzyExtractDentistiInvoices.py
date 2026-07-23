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

# Parse all doctor blocks in all sheets
all_blocks = []

for sheet_name in wb.sheet_names():
    if sheet_name in ['RIEPILOGO', 'Rendiconto', 'INDICE']:
        continue
        
    ws = wb.sheet_by_name(sheet_name)
    current_block = None
    
    col_map = { 'inv_num': -1, 'inv_date': -1, 'inv_amount': -1, 'payments': -1 }
    
    for r in range(ws.nrows):
        row = [str(ws.cell_value(r, c)).strip() for c in range(ws.ncols)]
        header_text = " ".join([x for x in row[:3] if x])
        
        # Doctor header row
        if any(h in header_text.upper() for h in ['DOTT', 'STUDIO', 'CENTRO', 'ASS.', 'S.O.A', 'CLINIC', 'DENTAL', 'MEDICA', 'SDP', 'FARMA']):
            if not any(x in header_text.upper() for x in ['CONTRATTI', 'INDIRIZZO', 'FREQUENZA', 'TELEFONO', 'P.IVA', 'EMAIL']):
                doc_name = header_text.replace('DOTT.SSA', '').replace('DOTT.', '').replace('DOTT', '').replace('STUDIO', '').replace('CENTRO', '').strip()
                clean_key = re.sub(r'[^a-z0-9]', '', doc_name.lower())
                
                if clean_key and len(clean_key) > 2:
                    current_block = {
                        'sheet': sheet_name,
                        'name': header_text,
                        'clean_key': clean_key,
                        'payments': []
                    }
                    all_blocks.append(current_block)
                    col_map = { 'inv_num': -1, 'inv_date': -1, 'inv_amount': -1, 'payments': -1 }
        
        # Header detection
        row_upper = [x.upper() for x in row]
        if any('FATTURA' in x or 'PAGAMENTI' in x for x in row_upper):
            for c_idx, cell_text in enumerate(row_upper):
                if 'N. FATTURA' in cell_text or 'N.FATTURA' in cell_text or 'N° FATTURA' in cell_text:
                    col_map['inv_num'] = c_idx
                elif 'DATA FATTURA' in cell_text or 'DATA FATT' in cell_text:
                    col_map['inv_date'] = c_idx
                elif 'IMPORTO FATTURA' in cell_text or 'IMPORTO FATT' in cell_text:
                    col_map['inv_amount'] = c_idx
                elif 'PAGAMENTI' in cell_text:
                    col_map['payments'] = c_idx
            continue

        # Data extraction
        if current_block and (col_map['inv_num'] != -1 or col_map['inv_amount'] != -1 or col_map['payments'] != -1):
            inv_num_val = row[col_map['inv_num']] if col_map['inv_num'] != -1 and col_map['inv_num'] < len(row) else ''
            inv_date_val = row[col_map['inv_date']] if col_map['inv_date'] != -1 and col_map['inv_date'] < len(row) else ''
            inv_amt_val = row[col_map['inv_amount']] if col_map['inv_amount'] != -1 and col_map['inv_amount'] < len(row) else ''
            payment_val = row[col_map['payments']] if col_map['payments'] != -1 and col_map['payments'] < len(row) else ''
            
            if (inv_num_val or inv_date_val or inv_amt_val) and not any(x in str(inv_num_val).upper() for x in ['N. FATTURA', 'DATA FATTURA', 'IMPORTO']):
                clean_inv_num = inv_num_val.replace('.0', '').strip()
                clean_inv_date = excel_date_to_str(inv_date_val)
                
                amount = None
                try:
                    amount = float(inv_amt_val)
                except:
                    m_amt = re.search(r'(\d+[\.,]?\d*)', inv_amt_val.replace(',', '.'))
                    if m_amt:
                        try:
                            amount = float(m_amt.group(1))
                        except:
                            pass
                
                status = 'pagato' if ('PAGATO' in payment_val.upper() or 'PAG' in payment_val.upper() or 'OK' in payment_val.upper() or 'B/B' in payment_val.upper()) else 'in_attesa'
                
                if clean_inv_num or clean_inv_date or amount:
                    current_block['payments'].append({
                        'invoiceNumber': clean_inv_num,
                        'invoiceDate': clean_inv_date,
                        'invoiceAmount': amount,
                        'amount': amount,
                        'paymentText': payment_val,
                        'status': status
                    })

print(f"Total doctor blocks found in Excel: {len(all_blocks)}")

# Load dentisti_names.json (488 names)
dentistiNames = json.load(open('src/data/dentisti_names.json', encoding='utf-8'))
final_invoices_lookup = {}
matched_names = 0

for fullName in dentistiNames:
    cleanName = fullName.strip()
    normKey = re.sub(r'[^a-z0-9]', '', cleanName.lower())
    
    # Try exact key match or substring match
    matched_pays = []
    for block in all_blocks:
        b_key = block['clean_key']
        if b_key == normKey or b_key in normKey or normKey in b_key:
            if len(block['payments']) > 0:
                matched_pays.extend(block['payments'])
    
    if len(matched_pays) > 0:
        matched_names += 1
        final_invoices_lookup[normKey] = matched_pays

print(f"FUZZY MATCHED DOCTORS WITH REAL INVOICES: {matched_names} / {len(dentistiNames)}")

with open('src/data/invoices_lookup.json', 'w', encoding='utf-8') as f:
    json.dump(final_invoices_lookup, f, indent=2, ensure_ascii=False)

print("Saved fuzzy matched invoices_lookup.json!")
