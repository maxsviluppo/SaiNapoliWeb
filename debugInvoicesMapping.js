const fs = require('fs');

const seedContent = fs.readFileSync('src/data/dentistiSeed.ts', 'utf8');
const invoicesLookup = JSON.parse(fs.readFileSync('src/data/invoices_lookup.json', 'utf8'));
const dentistiNames = JSON.parse(fs.readFileSync('src/data/dentisti_names.json', 'utf8'));

console.log('Total entries in dentisti_names.json:', dentistiNames.length);
console.log('Total entries in invoices_lookup.json:', Object.keys(invoicesLookup).length);

let matchCount = 0;
let totalPaymentsWithInvoice = 0;

dentistiNames.forEach(fullName => {
  const cleanName = fullName.trim();
  const normKey = cleanName.toLowerCase().replace(/[^a-z0-9]/g, '');
  const found = invoicesLookup[normKey];
  if (found && found.length > 0) {
    matchCount++;
    totalPaymentsWithInvoice += found.length;
  }
});

console.log(`Matched doctors from dentisti_names.json to invoices_lookup.json: ${matchCount} / ${dentistiNames.length}`);
console.log(`Total payments with invoice details matched: ${totalPaymentsWithInvoice}`);

// Sample 5 matches
let samples = 0;
dentistiNames.forEach(fullName => {
  if (samples >= 5) return;
  const cleanName = fullName.trim();
  const normKey = cleanName.toLowerCase().replace(/[^a-z0-9]/g, '');
  const found = invoicesLookup[normKey];
  if (found && found.length > 0) {
    console.log(`\nMatch ${samples+1}: "${cleanName}" (key: ${normKey})`);
    console.log('Invoices:', found);
    samples++;
  }
});
