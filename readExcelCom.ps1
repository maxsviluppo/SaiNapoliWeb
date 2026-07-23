$excel = New-Object -ComObject Excel.Application
$excel.Visible = $false
$excel.DisplayAlerts = $false
$wb = $excel.Workbooks.Open("C:\Users\Max\Downloads\DENTISTI. SI EXEL.xls")

Write-Host "Total Sheets: $($wb.Sheets.Count)"
foreach ($ws in $wb.Sheets) {
    $sheetName = $ws.Name
    Write-Host "`n--- SHEET: $sheetName ---"
    $usedRange = $ws.UsedRange
    $rowCount = [Math]::Min(20, $usedRange.Rows.Count)
    $colCount = [Math]::Min(25, $usedRange.Columns.Count)
    
    for ($r = 1; $r -le $rowCount; $r++) {
        $rowVals = @()
        for ($c = 1; $c -le $colCount; $c++) {
            $val = $ws.Cells.Item($r, $c).Text
            if ($val -ne $null -and $val.Trim() -ne "") {
                $rowVals += "[Col $c] $val"
            }
        }
        if ($rowVals.Count -gt 0) {
            $joined = $rowVals -join " | "
            Write-Host "Row ${r}: $joined"
        }
    }
}

$wb.Close($false)
$excel.Quit()
[System.Runtime.Interopservices.Marshal]::ReleaseComObject($excel) | Out-Null
