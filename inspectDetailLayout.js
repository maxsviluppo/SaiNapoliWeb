const fs = require('fs');
const lines = fs.readFileSync('src/app/manager/page.tsx', 'utf8').split('\n');

let inDetail = false;
lines.forEach((l, idx) => {
  if (l.includes('selectedDentista ?') || l.includes('selectedAmministratore ?')) {
    console.log(`Start Detail at Line ${idx + 1}: ${l.trim()}`);
  }
});
