import xlrd
import json
import re

filepath = r'C:\Users\Max\Downloads\DENTISTI. SI EXEL.xls'
wb = xlrd.open_workbook(filepath)

print("Workbook sheets:", wb.sheet_names())

dentisti_map = {}

# Process sheets that are doctor sheets (A, B, C, D... or sheet 0)
for sheet_name in wb.sheet_names():
    if sheet_name in ['RIEPILOGO', 'Rendiconto', 'INDICE', 'Foglio1', 'Foglio2']:
        continue
    ws = wb.sheet_by_name(sheet_name)
    current_doc = None
    
    for r in range(ws.nrows):
        row = ws.row_values(r)
        
        # Check if Doctor header line
        first_val = str(row[0] if len(row) > 0 else '').strip()
        second_val = str(row[1] if len(row) > 1 else '').strip()
        
        if 'Dott' in first_val or 'Dott' in second_val or 'Studio' in first_val or 'Studio' in second_val or 'Ass' in first_val:
            doc_name = second_val if 'Dott' in first_val else (first_val if 'Dott' in second_val else f"{first_val} {second_val}".strip())
            if doc_name and doc_name.lower() not in ['dott.', 'dott', 'studio']:
                current_doc = doc_name
                if current_doc not in dentisti_map:
                    dentisti_map[current_doc] = {
                        'name': current_doc,
                        'phone': '',
                        'address': '',
                        'contractNumber': None,
                        'nCampioni': '',
                        'invoiceNumber': '',
                        'invoiceDate': '',
                        'invoiceAmount': None,
                        'payments': [],
                        'history': []
                    }
        
        # Check for phone/address
        row_str = " ".join([str(x).strip() for x in row if str(x).strip()])
        if current_doc and dentisti_map.get(current_doc):
            if 'Telefono' in row_str or 'Tel' in row_str:
                for cell in row[1:]:
                    cell_str = str(cell).strip()
                    if cell_str and cell_str.lower() != 'telefono':
                        dentisti_map[current_doc]['phone'] = cell_str
                        break
            
            # Check table headers and data rows
            # Table row contains contract like '257/D' or numbers in N. campioni column
            if len(row) >= 7:
                c_val = str(row[1] if len(row) > 1 else '').strip() # Contratti or Indirizzo
                campioni_val = str(row[6] if len(row) > 6 else '').strip() # N. campioni
                fatt_num = str(row[7] if len(row) > 7 else '').strip() # N. Fattura
                fatt_date = str(row[8] if len(row) > 8 else '').strip() # Data Fattura
                fatt_amount = str(row[9] if len(row) > 9 else '').strip() # Importo Fattura
                pagamento = str(row[10] if len(row) > 10 else '').strip() # Pagamenti
                
                if campioni_val and campioni_val.lower() != 'n. campioni':
                    # Clean campioni_val e.g. '1.0' -> '1'
                    clean_campioni = re.sub(r'\.0$', '', campioni_val)
                    if clean_campioni and clean_campioni != '0':
                        dentisti_map[current_doc]['nCampioni'] = clean_campioni
                    
                    if fatt_num and fatt_num.lower() != 'n. fattura':
                        clean_fatt_num = re.sub(r'\.0$', '', fatt_num)
                        dentisti_map[current_doc]['invoiceNumber'] = clean_fatt_num
                    
                    if fatt_amount and fatt_amount.lower() != 'importo fattura':
                        try:
                            dentisti_map[current_doc]['invoiceAmount'] = float(fatt_amount)
                        except:
                            pass

print(f"Extracted data for {len(dentisti_map)} doctors.")
sample_keys = list(dentisti_map.keys())[:10]
for k in sample_keys:
    print(k, "=>", dentisti_map[k])
