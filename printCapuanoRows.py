import xlrd

filepath = r'C:\Users\Max\Downloads\DENTISTI. SI EXEL.xls'
wb = xlrd.open_workbook(filepath)
ws = wb.sheet_by_name('CAPUANO MICHELA')

for r in range(12, 35):
    row = [str(ws.cell_value(r, c)).strip() for c in range(ws.ncols)]
    cells = " | ".join([f"Col{c}: '{v}'" for c, v in enumerate(row)])
    print(f"Row {r+1:2d}: {cells}")
