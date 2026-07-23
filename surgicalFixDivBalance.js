// Surgical fix: track div depth as we go, when depth would go negative, skip that </div>
const fs = require('fs');
const lines = fs.readFileSync('src/app/manager/page.tsx', 'utf8').split('\n');

let depth = 0;
const outputLines = [];
let skipped = 0;

for (let i = 0; i < lines.length; i++) {
  const l = lines[i];
  const opens = (l.match(/<div[^/]*>/g) || []).length;
  const closes = (l.match(/<\/div>/g) || []).length;
  
  // Simulate what would happen
  const newDepth = depth + opens - closes;
  
  if (newDepth < 0 && opens === 0 && closes === 1) {
    // This line only has a closing div and would push depth negative — it's orphan
    console.log(`Skipping orphan </div> on line ${i + 1}: "${l.trim()}"`);
    skipped++;
    // Don't add this line to output
    continue;
  }
  
  depth = newDepth;
  outputLines.push(l);
}

console.log(`\nTotal orphan </div> removed: ${skipped}`);
console.log(`Final depth: ${depth}`);

// Verify
let verifyOpens = 0, verifyCloses = 0;
for (const l of outputLines) {
  verifyOpens += (l.match(/<div[^/]*>/g) || []).length;
  verifyCloses += (l.match(/<\/div>/g) || []).length;
}
console.log(`Verify: opens=${verifyOpens} closes=${verifyCloses} balance=${verifyOpens - verifyCloses}`);

if (verifyOpens === verifyCloses) {
  fs.writeFileSync('src/app/manager/page.tsx', outputLines.join('\n'), 'utf8');
  console.log('File written successfully!');
} else {
  console.log('WARNING: Balance still off, not writing file. Manual intervention needed.');
}
