const fs = require('fs');
let page = fs.readFileSync('src/app/manager/page.tsx', 'utf8');
const targetStr = "{selectedDentista.contractNumber || 'N/D'}";
const idx = page.indexOf(targetStr);
console.log(page.substring(idx - 150, idx + 150));
