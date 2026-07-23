const fs = require('fs');
const content = fs.readFileSync('C:\\Users\\Max\\Downloads\\DENTISTI. SI\\DENTISTI. SI.CSV', 'utf8');
const lines = content.split('\n');

for (let i = 0; i < 20; i++) {
  console.log(`Line ${i+1}:`, lines[i]);
}
