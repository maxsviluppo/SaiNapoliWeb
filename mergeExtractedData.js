const fs = require('fs');
const path = require('path');

const extracted = JSON.parse(fs.readFileSync('src/data/dentisti_extracted_full.json', 'utf8'));

// Build lookup dictionary by normalized name
const doctorMap = {};

extracted.forEach(item => {
  const name = item.rawName
    .replace(/^DOTT\.SSA\s+/i, '')
    .replace(/^DOTT\.\s+/i, '')
    .replace(/^DOTT\s+/i, '')
    .trim();
  
  if (!name || name.length < 3) return;
  
  const key = name.toLowerCase().replace(/[^a-z0-9]/g, '');
  if (!doctorMap[key]) {
    doctorMap[key] = {
      name: item.rawName,
      phone: item.phone,
      email: item.email,
      address: item.address,
      contractNumber: item.contractNumber,
      nCampioni: new Set(),
      invoices: []
    };
  }
  
  if (item.phone && !doctorMap[key].phone) doctorMap[key].phone = item.phone;
  if (item.email && !doctorMap[key].email) doctorMap[key].email = item.email;
  if (item.address && !doctorMap[key].address) doctorMap[key].address = item.address;
  if (item.contractNumber && !doctorMap[key].contractNumber) doctorMap[key].contractNumber = item.contractNumber;
  
  item.nCampioni.forEach(c => {
    if (c && c.trim() && !c.toLowerCase().includes('n. campioni')) {
      doctorMap[key].nCampioni.add(c.trim());
    }
  });
  
  if (item.invoices.length > 0) {
    doctorMap[key].invoices.push(...item.invoices);
  }
});

console.log(`Unique normalized doctors in dictionary: ${Object.keys(doctorMap).length}`);

// Load dentistiSeed.ts
let seedContent = fs.readFileSync('src/data/dentistiSeed.ts', 'utf8');

// Replace the nCampioni logic inside generateInitialDentisti()
// Currently it sets: nCampioni: ''
// We will build a lookup object `const EXTRACTED_CAMPIONI: Record<string, string> = { ... }`

const campioniLookup = {};
Object.keys(doctorMap).forEach(key => {
  const list = Array.from(doctorMap[key].nCampioni);
  if (list.length > 0) {
    // Clean list items or pick summary
    const summary = list.slice(0, 3).join(', ');
    campioniLookup[key] = summary;
  }
});

console.log(`Doctors with valid campioni values: ${Object.keys(campioniLookup).length}`);
console.log("Sample campioni entries:", Object.entries(campioniLookup).slice(0, 10));

// Save JSON lookup for use in seed
fs.writeFileSync('src/data/campioni_lookup.json', JSON.stringify(campioniLookup, null, 2), 'utf8');

// Update generateInitialDentisti() in dentistiSeed.ts
const replacementCode = `import campioniData from './campioni_lookup.json';

`;

if (!seedContent.includes('campioni_lookup.json')) {
  seedContent = replacementCode + seedContent;
}

// Replace `nCampioni: ''` with lookup logic:
const oldCampioniLine = `nCampioni: ''`;
const newCampioniLine = `nCampioni: (campioniData as Record<string, string>)[cleanName.toLowerCase().replace(/[^a-z0-9]/g, '')] || '1 spora'`;

seedContent = seedContent.split(oldCampioniLine).join(newCampioniLine);

fs.writeFileSync('src/data/dentistiSeed.ts', seedContent, 'utf8');
console.log('Successfully updated dentistiSeed.ts with extracted N. Campioni values!');
