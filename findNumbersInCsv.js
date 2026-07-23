const fs = require('fs');
const content = fs.readFileSync('C:\\Users\\Max\\Downloads\\DENTISTI. SI\\DENTISTI. SI.CSV', 'utf8');
const lines = content.split('\n');

lines.forEach((line, i) => {
  const parts = line.split(';');
  parts.forEach((p, colIdx) => {
    const val = p.trim();
    if (val && /\d/.test(val)) {
      console.log(`L${i+1} [Col ${colIdx}]: "${val}"`);
    }
  });
});
