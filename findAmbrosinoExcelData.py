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
            return dt.strftime('%d/%m/%Y')
    except:
        pass
    return str(val).strip()

filepath = r'C:\Users\Max\Downloads\DENTISTI. SI EXEL.xls'
wb = xlrd.open_workbook(filepath)

print("=== SEARCHING FOR 'AMBROSINO DI MICCIO SERGIO' IN DENTISTI. SI EXEL.xls ===")

found = False

for sheet_name in wb.sheet_names():
    ws = wb.sheet_by_name(sheet_name)
    
    for r in range(ws.nrows):
        row = [str(ws.cell_value(r, c)).strip() for c in range(ws.ncols)]
        row_text = " ".join([x for x in row if x])
        
        if 'AMBROSINO' in row_text.upper() or 'MICCIO' in row_text.upper() or 'SERGIO' in row_text.upper():
            print(f"\n[SHEET: '{sheet_name}' | ROW {r+1}]")
            print("Full Row Text:", row_text)
            
            # Print table headers and data rows around this row
            start_row = max(0, r - 2)
            end_row = min(ws.nrows, r + 15)
            
            print("\nDetailed Block:")
            for sub_r in range(start_row, end_row):
                sub_row = [str(ws.cell_value(sub_r, c)).strip() for c in range(ws.ncols)]
                non_empty = [f"Col{c}: '{v}'" for c, v in enumerate(sub_row) if v]
                print(f"Row {sub_r+1:3d}: " + " | ".join(non_empty))
            found = True

if not found:
    print("No direct match found for 'AMBROSINO'. Searching for similar names...")
