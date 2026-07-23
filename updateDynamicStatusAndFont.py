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
            return dt.strftime('%Y-%m-%d')
    except:
        pass
    s = str(val).strip()
    m = re.search(r'(\d{1,2})[/.-](\d{1,2})[/.-](\d{2,4})', s)
    if m:
        day, month, year = int(m.group(1)), int(m.group(2)), int(m.group(3))
        if year < 100:
            year += 2000
        return f"{year:04d}-{month:02d}-{day:02d}"
    return s

filepath = r'C:\Users\Max\Downloads\DENTISTI. SI EXEL.xls'
wb = xlrd.open_workbook(filepath)

print("=== RE-BUILDING DENTISTI DATASET WITH AUTOMATIC STATUS & ENHANCED DETAILS ===")

doctors_master = {}

for sheet_name in wb.sheet_names():
    if sheet_name in ['RIEPILOGO', 'Rendiconto', 'INDICE', 'CALENDARIO', 'LIA-ROSARIA', 'FATT.2023', 'FATT. 2024', 'FATT. 2025']:
        continue
        
    ws = wb.sheet_by_name(sheet_name)
    current_doc = None
    
    col_map = {
        'contract': -1,
        'indirizzo': -1,
        'frequenza': -1,
        'campioni': -1,
        'proforma': -1,
        'inv_num': -1,
        'inv_date': -1,
        'inv_amount': -1,
        'payments': -1,
        'referti': -1
    }
    
    for r in range(ws.nrows):
        row = [str(ws.cell_value(r, c)).strip() for c in range(ws.ncols)]
        header_text = " ".join([x for x in row[:3] if x])
        
        # Check doctor header row
        if any(h in header_text.upper() for h in ['DOTT', 'STUDIO', 'CENTRO', 'ASS.', 'S.O.A', 'CLINIC', 'DENTAL', 'MEDICA', 'SDP', 'FARMA']):
            if not any(x in header_text.upper() for x in ['CONTRATTI', 'INDIRIZZO', 'FREQUENZA', 'TELEFONO', 'P.IVA', 'EMAIL']):
                doc_name = header_text.strip()
                clean_key = re.sub(r'[^a-z0-9]', '', doc_name.lower())
                
                if clean_key and len(clean_key) > 2:
                    if clean_key not in doctors_master:
                        first_char = clean_key[0].upper()
                        letter = first_char if first_char.isalpha() else 'A'
                        
                        doctors_master[clean_key] = {
                            'id': f"dentista_ex_{len(doctors_master)+1}",
                            'name': doc_name,
                            'letter': letter,
                            'contractNumber': None,
                            'city': 'Napoli',
                            'paese': 'Napoli',
                            'phone': '',
                            'email': '',
                            'monthlyFee': 150,
                            'billingInterval': '1 anno',
                            'startDate': '2023-01-01',
                            'status': 'attivo',
                            'notes': '',
                            'nCampioni': '',
                            'payments': [],
                            'referti': []
                        }
                    current_doc = doctors_master[clean_key]
                    col_map = { 'contract': -1, 'indirizzo': -1, 'frequenza': -1, 'campioni': -1, 'proforma': -1, 'inv_num': -1, 'inv_date': -1, 'inv_amount': -1, 'payments': -1, 'referti': -1 }
        
        if not current_doc:
            continue
            
        row_str = " ".join(row)
        if 'TEL' in row_str.upper() or 'CELL' in row_str.upper():
            for c in row:
                m_phone = re.search(r'(\d{8,11})', c.replace('/', '').replace('-', '').replace(' ', ''))
                if m_phone and not current_doc['phone']:
                    current_doc['phone'] = m_phone.group(1)
        if 'MAIL' in row_str.upper() or '@' in row_str:
            for c in row:
                if '@' in c and not current_doc['email']:
                    current_doc['email'] = c.strip()
        if 'INDIRIZZO' in row_str.upper() or 'VIA' in row_str.upper() or 'CORSO' in row_str.upper() or 'PIAZZA' in row_str.upper():
            for c in row:
                if ('VIA' in c.upper() or 'CORSO' in c.upper() or 'PIAZZA' in c.upper() or 'VIALE' in c.upper()) and len(c) > 5:
                    current_doc['paese'] = c.strip()
        
        row_upper = [x.upper() for x in row]
        if any('FATTURA' in x or 'PAGAMENTI' in x or 'CONTRAT' in x for x in row_upper):
            for c_idx, cell_text in enumerate(row_upper):
                if 'CONTRAT' in cell_text:
                    col_map['contract'] = c_idx
                elif 'INDIRIZZO' in cell_text:
                    col_map['indirizzo'] = c_idx
                elif 'FREQUENZA' in cell_text:
                    col_map['frequenza'] = c_idx
                elif 'CAMPIONI' in cell_text:
                    col_map['campioni'] = c_idx
                elif 'PROFORMA' in cell_text:
                    col_map['proforma'] = c_idx
                elif ('N. FATTURA' in cell_text or 'N.FATTURA' in cell_text or 'N° FATTURA' in cell_text) and 'PROFORMA' not in cell_text:
                    col_map['inv_num'] = c_idx
                elif 'DATA FATTURA' in cell_text or 'DATA FATT' in cell_text:
                    col_map['inv_date'] = c_idx
                elif 'IMPORTO FATTURA' in cell_text or 'IMPORTO FATT' in cell_text:
                    col_map['inv_amount'] = c_idx
                elif 'PAGAMENTI' in cell_text:
                    col_map['payments'] = c_idx
                elif 'REFERTI' in cell_text or 'CONSEGNA' in cell_text:
                    col_map['referti'] = c_idx
            continue
            
        if col_map['inv_num'] != -1 or col_map['inv_amount'] != -1 or col_map['payments'] != -1 or col_map['campioni'] != -1:
            contract_val = row[col_map['contract']] if col_map['contract'] != -1 and col_map['contract'] < len(row) else ''
            campioni_val = row[col_map['campioni']] if col_map['campioni'] != -1 and col_map['campioni'] < len(row) else ''
            inv_num_val = row[col_map['inv_num']] if col_map['inv_num'] != -1 and col_map['inv_num'] < len(row) else ''
            inv_date_val = row[col_map['inv_date']] if col_map['inv_date'] != -1 and col_map['inv_date'] < len(row) else ''
            inv_amt_val = row[col_map['inv_amount']] if col_map['inv_amount'] != -1 and col_map['inv_amount'] < len(row) else ''
            payment_val = row[col_map['payments']] if col_map['payments'] != -1 and col_map['payments'] < len(row) else ''
            referti_val = row[col_map['referti']] if col_map['referti'] != -1 and col_map['referti'] < len(row) else ''
            
            if contract_val:
                try:
                    c_num = int(float(contract_val))
                    if c_num > 0 and not current_doc['contractNumber']:
                        current_doc['contractNumber'] = c_num
                except:
                    pass
                    
            if campioni_val and ('SPORA' in campioni_val.upper() or 'LEGIO' in campioni_val.upper() or 'REGISTRO' in campioni_val.upper()):
                if not current_doc['nCampioni']:
                    current_doc['nCampioni'] = campioni_val
                elif campioni_val not in current_doc['nCampioni']:
                    current_doc['nCampioni'] += f", {campioni_val}"
            
            if referti_val and ('MAIL' in referti_val.upper() or 'INVIATI' in referti_val.upper() or 'CONSEGN' in referti_val.upper()):
                current_doc['referti'].append({
                    'id': f"ref_{len(current_doc['referti'])+1}",
                    'metodoConsegna': 'email' if 'MAIL' in referti_val.upper() else 'cartacea',
                    'emailConsegna': referti_val,
                    'dataConsegna': excel_date_to_str(inv_date_val) or '2025-01-01'
                })

            if inv_num_val or inv_date_val or inv_amt_val or payment_val:
                clean_num = inv_num_val.replace('.0', '').strip()
                clean_date = excel_date_to_str(inv_date_val)
                
                amount = None
                if inv_amt_val:
                    try:
                        amount = float(inv_amt_val)
                    except:
                        m_amt = re.search(r'(\d+[\.,]?\d*)', inv_amt_val.replace(',', '.'))
                        if m_amt:
                            try:
                                amount = float(m_amt.group(1))
                            except:
                                pass
                
                p_text_upper = payment_val.upper()
                if 'DISDETT' in p_text_upper or 'NON REPERIBIL' in p_text_upper:
                    status = 'disdetto'
                elif 'SOSPES' in p_text_upper:
                    status = 'sospeso'
                elif 'INSOLUT' in p_text_upper or 'SOLLECIT' in p_text_upper:
                    status = 'insoluto'
                elif 'PAGATO' in p_text_upper or 'PAG' in p_text_upper or 'OK' in p_text_upper or 'B/B' in p_text_upper:
                    status = 'pagato'
                else:
                    status = 'in_attesa'
                
                if clean_num or clean_date or amount:
                    current_doc['payments'].append({
                        'id': f"p_{len(current_doc['payments'])+1}",
                        'date': clean_date or '2025-01-01',
                        'amount': amount if amount is not None else 150,
                        'status': status,
                        'invoiceNumber': clean_num or None,
                        'invoiceDate': clean_date or None,
                        'invoiceAmount': amount if amount is not None else None
                    })

today = datetime.now()
final_dentisti_list = []
contract_auto = 100

for k, d in doctors_master.items():
    if not d['contractNumber']:
        contract_auto += 1
        d['contractNumber'] = contract_auto
    if not d['phone']:
        d['phone'] = '081 0000000'
    if not d['email']:
        d['email'] = 'info@studiodentistico.it'
    if len(d['payments']) == 0:
        d['payments'] = [{
            'id': 'p_1',
            'date': '2025-01-01',
            'amount': d['monthlyFee'],
            'status': 'in_attesa'
        }]
    
    # Calculate DYNAMIC STATUS based on payments & expiration dates
    has_disdetto = any(p['status'] == 'disdetto' for p in d['payments'])
    has_sospeso = any(p['status'] == 'sospeso' for p in d['payments'])
    has_insoluto = any(p['status'] == 'insoluto' for p in d['payments'])
    
    if has_disdetto:
        d['status'] = 'disdetto'
    elif has_sospeso:
        d['status'] = 'sospeso'
    elif has_insoluto:
        d['status'] = 'sollecito'
    else:
        # Check if overdue past 60 days
        last_paid = [p for p in d['payments'] if p['status'] == 'pagato']
        if last_paid and last_paid[-1].get('date'):
            try:
                p_date = datetime.strptime(last_paid[-1]['date'], '%Y-%m-%d')
                exp_date = p_date.replace(year=p_date.year + 1)
                days_overdue = (today - exp_date).days
                if days_overdue > 90:
                    d['status'] = 'sospeso'
                elif days_overdue > 30:
                    d['status'] = 'sollecito'
                else:
                    d['status'] = 'attivo'
            except:
                d['status'] = 'attivo'
        else:
            d['status'] = 'attivo'
            
    final_dentisti_list.append(d)

with open('src/data/dentisti_full_excel_master.json', 'w', encoding='utf-8') as f:
    json.dump(final_dentisti_list, f, indent=2, ensure_ascii=False)

print(f"Re-saved {len(final_dentisti_list)} doctors with dynamic status into src/data/dentisti_full_excel_master.json")
