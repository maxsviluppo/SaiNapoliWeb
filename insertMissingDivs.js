// Add back the 6 missing outer </div> tags before each )} section close
// Uses \r line endings (file is CRLF but split by \n)
const fs = require('fs');
let content = fs.readFileSync('src/app/manager/page.tsx', 'utf8');
const lines = content.split('\n');

// Each fix: {lineNum (0-indexed), insertBefore: string to insert before that line}
// We insert a new </div> line with appropriate indentation BEFORE the )} line

// Find lines that are ")}" preceded by </div> that are missing an outer wrapper close
// Strategy: insert after the specific line patterns

let insertions = []; // {afterLine: 0-indexed, text: string to insert}

for (let i = 0; i < lines.length; i++) {
  const trimmed = lines[i].replace(/\r$/, '').trimStart();
  
  // Admin section at ~1239
  if (i === 1238 && trimmed === ')}') {
    insertions.push({ afterLine: i - 1, text: '            </div>\r' });
    console.log(`Fix 1: Admin section )} at line ${i+1}`);
  }
  // Dentisti section at ~1746
  if (i === 1745 && trimmed === ')}') {
    insertions.push({ afterLine: i - 1, text: '            </div>\r' });
    console.log(`Fix 2: Dentisti section )} at line ${i+1}`);
  }
  // Registri section at ~1767
  if (i === 1766 && trimmed === ')}') {
    insertions.push({ afterLine: i - 1, text: '            </div>\r' });
    console.log(`Fix 3: Registri section )} at line ${i+1}`);
  }
  // paymentToDelete at ~1808
  if (i === 1807 && trimmed === ')}') {
    insertions.push({ afterLine: i - 1, text: '        </div>\r' });
    console.log(`Fix 4: paymentToDelete )} at line ${i+1}`);
  }
  // clientToDelete at ~1853
  if (i === 1852 && trimmed === ')}') {
    insertions.push({ afterLine: i - 1, text: '        </div>\r' });
    console.log(`Fix 5: clientToDelete )} at line ${i+1}`);
  }
  // selectedAmministratore at ~2308
  if (i === 2307 && trimmed === ')}') {
    insertions.push({ afterLine: i - 1, text: '        </div>\r' });
    console.log(`Fix 6: selectedAmministratore )} at line ${i+1}`);
  }
}

console.log(`Found ${insertions.length} insertion points`);

// Apply insertions in reverse order (so line numbers stay correct)
insertions.sort((a, b) => b.afterLine - a.afterLine);
for (const ins of insertions) {
  lines.splice(ins.afterLine + 1, 0, ins.text);
}

const result = lines.join('\n');
fs.writeFileSync('src/app/manager/page.tsx', result, 'utf8');
console.log('Written!');

const open = (result.match(/<div[\s>]/g) || []).length;
const close = (result.match(/<\/div>/g) || []).length;
console.log(`Div balance: opens=${open} closes=${close} diff=${open - close}`);
