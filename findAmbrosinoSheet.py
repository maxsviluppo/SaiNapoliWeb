import xlrd

filepath = r'C:\Users\Max\Downloads\DENTISTI. SI EXEL.xls'
wb = xlrd.open_workbook(filepath)

print("Searching across all sheets...")
for sheet_name in wb.sheet_names():
    ws = wb.sheet_by_name(sheet_name)
    for r in range(ws.nrows):
        row = [str(ws.cell_value(r, c)).strip() for c in range(ws.ncols)]
        row_str = " ".join(row).upper()
        if 'AMBROSINO' in row_str or 'MICCIO' in row_str:
            print(f"MATCH: Sheet '{sheet_name}', Row {r+1}: {row_str[:150]}")
