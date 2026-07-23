const fs = require('fs');
const lines = fs.readFileSync('src/app/manager/page.tsx', 'utf8').split('\n');

lines.forEach((l, idx) => {
  if (l.includes('Filtra Scadenza:') || l.includes('Fattura (N°') || l.includes('N° Fatt.')) {
    console.log(`${idx + 1}: ${l.trim()}`);
  }
});
