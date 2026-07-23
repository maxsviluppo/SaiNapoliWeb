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
        
        if current_doc_key and len(row) >= 9:
            inv_num = row[6] if len(row) > 6 else ''
            inv_date_raw = row[7] if len(row) > 7 else ''
            inv_amount_raw = row[8] if len(row) > 8 else ''
            payment_text = row[9] if len(row) > 9 else ''
            
            if inv_num and inv_num.lower() not in ['n. fattura', 'n.fattura', 'n° fattura', 'num. proforma', 'n. proforma']:
                inv_date = excel_date_to_str(inv_date_raw)
                
                amount = None
                try:
                    amount = float(inv_amount_raw)
                except:
                    m_amt = re.search(r'(\d+[\.,]?\d*)', inv_amount_raw.replace(',', '.'))
                    if m_amt:
                        try:
                            amount = float(m_amt.group(1))
                        except:
                            pass
                
                status = 'pagato' if ('PAGATO' in payment_text.upper() or 'PAG' in payment_text.upper()) else 'in_attesa'
                
                extracted_doctors[current_doc_key]['payments'].append({
                    'invoiceNumber': inv_num.replace('.0', ''),
                    'invoiceDate': inv_date,
                    'invoiceAmount': amount,
                    'amount': amount,
                    'paymentText': payment_text,
                    'status': status
                })

print(f"Extracted invoices for {len(extracted_doctors)} doctors.")

count_with_invoices = sum(1 for d in extracted_doctors.values() if len(d['payments']) > 0)
print(f"Doctors with at least 1 invoice: {count_with_invoices}")

# Sample display
sample_keys = [k for k in extracted_doctors.keys() if len(extracted_doctors[k]['payments']) > 0][:5]
for k in sample_keys:
    print(k, "=>", extracted_doctors[k]['payments'][:2])

with open('src/data/dentisti_invoices_extracted.json', 'w', encoding='utf-8') as f:
    json.dump(extracted_doctors, f, indent=2, ensure_ascii=False)

print("Saved to src/data/dentisti_invoices_extracted.json")
