import xlrd
import json
import re
from datetime import datetime, timedelta

def excel_date_to_str(excel_date):
    if not excel_date:
        return ""
    try:
        val = float(excel_date)
        # Excel epoch starts 1899-12-30
        dt = datetime(1899, 12, 30) + timedelta(days=val)
        return dt.strftime('%Y-%m-%d')
    except:
        return str(excel_date).strip()

filepath = r'C:\Users\Max\Downloads\DENTISTI. SI EXEL.xls'
wb = xlrd.open_workbook(filepath)

extracted_doctors = []

for sheet_name in wb.sheet_names():
    if sheet_name in ['RIEPILOGO', 'Rendiconto', 'INDICE']:
        continue
        
    ws = wb.sheet_by_name(sheet_name)
    current_doc = None
    
    r = 0
    while r < ws.nrows:
        row = [str(cell.value).strip() for cell in ws.row_slice(r)]
        
        # Doctor title detection (e.g. "DOTT. ...", "DOTT.SSA ...", "STUDIO ...", "CENTRO ...", "ASS. ...")
        header_text = " ".join([x for x in row[:3] if x])
        if any(h in header_text.upper() for h in ['DOTT', 'STUDIO', 'CENTRO', 'ASS.', 'S.O.A', 'CLINIC', 'DENTAL', 'MEDICA', 'SDP', 'FARMA']):
            # Exclude false positives like "Contratti" or column headers
            if not any(x in header_text.upper() for x in ['CONTRATTI', 'INDIRIZZO', 'FREQUENZA', 'TELEFONO', 'P.IVA', 'EMAIL']):
                current_doc = {
                    'sheet': sheet_name,
                    'rawName': header_text,
                    'phone': '',
                    'email': '',
                    'address': '',
                    'piva': '',
                    'contractNumber': None,
                    'nCampioni': [],
                    'invoices': [],
                    'payments': [],
                    'referti': []
                }
                extracted_doctors.append(current_doc)
        
        if current_doc:
            row_str = " ".join([x for x in row if x])
            
            # Metadata rows
            if 'Telefono' in row_str or 'Tel' in row_str:
                for val in row[1:4]:
                    if val and 'telefono' not in val.lower() and 'riepilogo' not in val.lower():
                        current_doc['phone'] = val.replace('.0', '')
                        break
            if 'EMAIL' in row_str or 'Mail' in row_str:
                for val in row[1:4]:
                    if '@' in val:
                        current_doc['email'] = val
                        break
            if 'P.IVA' in row_str:
                for val in row[1:4]:
                    if val and 'p.iva' not in val.lower():
                        current_doc['piva'] = val
                        break
            
            # Data row under table headers
            # Check if row looks like table row: contract number in col 0 or address in col 1 or campioni in col 4
            if len(row) >= 5:
                col_contract = row[0]
                col_address = row[1] if len(row) > 1 else ''
                col_campioni = row[4] if len(row) > 4 else ''
                col_inv_num = row[6] if len(row) > 6 else ''
                col_inv_date = row[7] if len(row) > 7 else ''
                col_inv_amount = row[8] if len(row) > 8 else ''
                col_payments = row[9] if len(row) > 9 else ''
                col_referti = row[10] if len(row) > 10 else ''
                
                # Check contract number
                if col_contract and col_contract.lower() not in ['contratti', 'contratto']:
                    try:
                        c_num = int(float(col_contract.replace('/D', '').replace('D', '')))
                        if not current_doc['contractNumber']:
                            current_doc['contractNumber'] = c_num
                    except:
                        pass
                
                if col_address and col_address.lower() not in ['indirizzo', 'telefono', 'email']:
                    if not current_doc['address']:
                        current_doc['address'] = col_address
                
                if col_campioni and col_campioni.lower() not in ['n. campioni', 'n.campioni']:
                    current_doc['nCampioni'].append(col_campioni)
                
                if col_inv_num and col_inv_num.lower() not in ['n. fattura', 'n.fattura']:
                    inv_date_formatted = excel_date_to_str(col_inv_date)
                    current_doc['invoices'].append({
                        'number': col_inv_num.replace('.0', ''),
                        'date': inv_date_formatted,
                        'amount': col_inv_amount
                    })
                
                if col_referti and col_referti.lower() not in ['consegna referti', 'consegna']:
                    current_doc['referti'].append(col_referti)

        r += 1

print(f"Extracted {len(extracted_doctors)} doctor blocks.")
with open('src/data/dentisti_extracted_full.json', 'w', encoding='utf-8') as f:
    json.dump(extracted_doctors, f, indent=2, ensure_ascii=False)

print("Saved to src/data/dentisti_extracted_full.json")
