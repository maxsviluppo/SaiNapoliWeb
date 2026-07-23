import xlrd

filepath = r'C:\Users\Max\Downloads\DENTISTI. SI EXEL.xls'
wb = xlrd.open_workbook(filepath)

ws = wb.sheet_by_index(0) # First sheet e.g. A

for r in range(min(120, ws.nrows)):
    row = ws.row_values(r)
    non_empty = [(c, str(val).strip()) for c, val in enumerate(row) if str(val).strip()]
    if non_empty:
        print(f"R{r+1:3d}: {non_empty}")
