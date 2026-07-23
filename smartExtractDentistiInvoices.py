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

extracted_doctors = {}

for sheet_name in wb.sheet_names():
    if sheet_name in ['RIEPILOGO', 'Rendiconto', 'INDICE']:
        continue
        
    ws = wb.sheet_by_name(sheet_name)
    current_doc_key = None
    
    # Column mapping indices for current table block
    col_map = {
        'contract': -1,
        'campioni': -1,
        'proforma': -1,
        'inv_num': -1,
        'inv_date': -1,
        'inv_amount': -1,
        'payments': -1
    }
    
    for r in range(ws.nrows):
        row = [str(ws.cell_value(r, c)).strip() for c in range(ws.ncols)]
        
        # Check doctor header row
        header_text = " ".join([x for x in row[:3] if x])
        if any(h in header_text.upper() for h in ['DOTT', 'STUDIO', 'CENTRO', 'ASS.', 'S.O.A', 'CLINIC', 'DENTAL', 'MEDICA', 'SDP', 'FARMA']):
            if not any(x in header_text.upper() for x in ['CONTRATTI', 'INDIRIZZO', 'FREQUENZA', 'TELEFONO', 'P.IVA', 'EMAIL']):
                doc_name = header_text.replace('DOTT.SSA', '').replace('DOTT.', '').replace('DOTT', '').strip()
                clean_key = re.sub(r'[^a-z0-9]', '', doc_name.lower())
                
                if clean_key and len(clean_key) > 2:
                    current_doc_key = clean_key
                    if current_doc_key not in extracted_doctors:
                        extracted_doctors[current_doc_key] = {
                            'name': header_text,
                            'payments': []
                        }
                    # Reset col_map for new doctor block
                    col_map = {
                        'contract': -1,
                        'campioni': -1,
                        'proforma': -1,
                        'inv_num': -1,
                        'inv_date': -1,
                        'inv_amount': -1,
                        'payments': -1
                    }
        
        # Check if table header row
        row_upper = [x.upper() for x in row]
        if any('FATTURA' in x or 'PAGAMENTI' in x or 'CONTRATTI' in x for x in row_upper):
            for c_idx, cell_text in enumerate(row_upper):
                if 'CONTRAT' in cell_text:
                    col_map['contract'] = c_idx
                elif 'CAMPIONI' in cell_text:
                    col_map['campioni'] = c_idx
                elif 'PROFORMA' in cell_text:
                    col_map['proforma'] = c_idx
                elif 'N. FATTURA' in cell_text or 'N.FATTURA' in cell_text or 'N° FATTURA' in cell_text:
                    col_map['inv_num'] = c_idx
                elif 'DATA FATTURA' in cell_text or 'DATA FATT' in cell_text:
                    col_map['inv_date'] = c_idx
                elif 'IMPORTO FATTURA' in cell_text or 'IMPORTO FATT' in cell_text:
                    col_map['inv_amount'] = c_idx
                elif 'PAGAMENTI' in cell_text:
                    col_map['payments'] = c_idx
            continue

        # Process table data row if current_doc_key and col_map has inv_num or payments
        if current_doc_key and (col_map['inv_num'] != -1 or col_map['inv_amount'] != -1 or col_map['payments'] != -1):
            inv_num_val = row[col_map['inv_num']] if col_map['inv_num'] != -1 and col_map['inv_num'] < len(row) else ''
            inv_date_val = row[col_map['inv_date']] if col_map['inv_date'] != -1 and col_map['inv_date'] < len(row) else ''
            inv_amt_val = row[col_map['inv_amount']] if col_map['inv_amount'] != -1 and col_map['inv_amount'] < len(row) else ''
            payment_val = row[col_map['payments']] if col_map['payments'] != -1 and col_map['payments'] < len(row) else ''
            
            # Check if valid data row (has inv_num or inv_date or inv_amt)
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
                
                status = 'pagato' if ('PAGATO' in payment_val.upper() or 'PAG' in payment_val.upper()) else 'in_attesa'
                
                if clean_inv_num or clean_inv_date or amount:
                    extracted_doctors[current_doc_key]['payments'].append({
                        'invoiceNumber': clean_inv_num,
                        'invoiceDate': clean_inv_date,
                        'invoiceAmount': amount,
                        'amount': amount,
                        'paymentText': payment_val,
                        'status': status
                    })

print(f"Smart Extracted invoices for {len(extracted_doctors)} doctors.")

# Check matches with dentisti_names.json
dentistiNames = json.load(open('src/data/dentisti_names.json', encoding='utf-8'))
matched_count = 0
total_valid_payments = 0

clean_lookup = {}
for fullName in dentistiNames:
    cleanName = fullName.strip()
    normKey = re.sub(r'[^a-z0-9]', '', cleanName.lower())
    if normKey in extracted_doctors:
        pays = extracted_doctors[normKey]['payments']
        if len(pays) > 0:
            matched_count += 1
            total_valid_payments += len(pays)
            clean_lookup[normKey] = pays

print(f"MATCHED DOCTORS WITH REAL INVOICES: {matched_count} / {len(dentistiNames)}")
print(f"TOTAL VALID INVOICE PAYMENTS: {total_valid_payments}")

# Print 3 clean samples
for k in list(clean_lookup.keys())[:3]:
    print(f"\nDoctor Key: {k}")
    print(json.dumps(clean_lookup[k][:3], indent=2))

with open('src/data/invoices_lookup.json', 'w', encoding='utf-8') as f:
    json.dump(clean_lookup, f, indent=2, ensure_ascii=False)

print("Saved clean invoices_lookup.json!")
