import xlrd

filepath = r'C:\Users\Max\Downloads\DENTISTI. SI EXEL.xls'
wb = xlrd.open_workbook(filepath)

# Let's inspect doctor blocks in sheet 0 (A) and sheet 2 (C)
for sheet_idx in [0, 2]:
    ws = wb.sheet_by_index(sheet_idx)
    print(f"\n==================== SHEET {ws.name} ====================")
    for r in range(min(150, ws.nrows)):
        row = [str(ws.cell_value(r, c)).strip() for c in range(ws.ncols)]
        row_str = " | ".join([f"[{c}]{v}" for c, v in enumerate(row) if v])
        if any(keyword in row_str.upper() for keyword in ['DOTT', 'CAPUANO', 'ABBATE', 'ACIERNO', 'FATTURA', 'CONTRATTI']):
            print(f"Row {r+1:3d}: {row_str[:250]}")
