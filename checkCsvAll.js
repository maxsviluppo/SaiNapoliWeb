const fs = require('fs');
const content = fs.readFileSync('C:\\Users\\Max\\Downloads\\DENTISTI. SI\\DENTISTI. SI.CSV', 'utf8');
const lines = content.split('\n');

lines.forEach((line, i) => {
  if (!line.trim()) return;
  const parts = line.split(';');
  const nonEmpty = parts.map((p, idx) => [idx, p.trim()]).filter(([idx, p]) => p.length > 0);
  if (nonEmpty.length > 0) {
    console.log(`Line ${i+1}:`, nonEmpty.map(([col, val]) => `[${col}]${val}`).join(' | '));
  }
});
