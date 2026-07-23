import re

filepath = 'src/app/manager/page.tsx'
with open(filepath, 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
skip = False
i = 0

while i < len(lines):
    line = lines[i]
    
    # Detect duplicated TD block around line 1100
    if 'Fatt. N°' in line and i > 1080 and i < 1150:
        # Check if line 1111/1112 has orphan </div> and another td
        sub_chunk = "".join(lines[i-5:i+30])
        if sub_chunk.count('lastInvoice') > 1:
            # We found the duplicated chunk, let's keep only 1 instance
            print(f"Fixing duplicate at line {i+1}")
            # Skip until the end of the second duplicate
            # Find index of second '})()}'
            dup_count = 0
            while i < len(lines):
                if '})()}' in lines[i]:
                    dup_count += 1
                    if dup_count == 2:
                        # Add closing </td> and </tr> for this row
                        new_lines.append("                            </td>\n")
                        i += 1
                        # If next line is </div> or </td>, skip it if it's orphan
                        if i < len(lines) and ('</div>' in lines[i] or '</td>' in lines[i]):
                            i += 1
                        break
                i += 1
            continue

    new_lines.append(line)
    i += 1

with open(filepath, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print("Line-by-line cleanup finished.")
