const fs = require('fs');
const content = fs.readFileSync('C:\\Users\\Max\\Downloads\\DENTISTI. SI\\DENTISTI. SI.CSV', 'utf8');
const lines = content.split('\n');

lines.forEach((line, i) => {
  const parts = line.split(';');
  const nonEmpty = parts.map((p, idx) => [idx, p.trim()]).filter(([idx, p]) => p.length > 0);
  if (nonEmpty.length > 0) {
    console.log(`L${i+1}: ` + nonEmpty.map(([idx, val]) => `[Col ${idx}] ${val}`).join(' | '));
  }
});
