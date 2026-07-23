import xlrd
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
ws = wb.sheet_by_name('AMBROSINO DI MICCIO SERGIO')

print(f"==================== DENTISTA: DOTT. AMBROSINO DI MICCIO SERGIO ====================")
print(f"Sheet Name: '{ws.name}' | Total Rows: {ws.nrows}\n")

for r in range(ws.nrows):
    row = [str(ws.cell_value(r, c)).strip() for c in range(ws.ncols)]
    non_empty = []
    for c, v in enumerate(row):
        if v:
            # Format excel date serial if numerical
            formatted_val = excel_date_to_str(v) if (v.replace('.0', '').isdigit() and float(v) > 30000 and float(v) < 60000) else v
            non_empty.append(f"Col{c}: '{formatted_val}'")
    if non_empty:
        print(f"Row {r+1:2d}: " + " | ".join(non_empty))
