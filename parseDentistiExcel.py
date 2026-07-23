import xlrd
import json

filepath = r'C:\Users\Max\Downloads\DENTISTI. SI EXEL.xls'

wb = xlrd.open_workbook(filepath)
print("Sheet Names:", wb.sheet_names())

for sheet_name in wb.sheet_names():
    ws = wb.sheet_by_name(sheet_name)
    print(f"\n==================== SHEET: {sheet_name} ({ws.nrows} rows, {ws.ncols} cols) ====================")
    for r in range(min(50, ws.nrows)):
        row_vals = ws.row_values(r)
        non_empty = [(c, str(val).strip()) for c, val in enumerate(row_vals) if str(val).strip()]
        if non_empty:
            print(f"Row {r+1}: {non_empty[:15]}")
