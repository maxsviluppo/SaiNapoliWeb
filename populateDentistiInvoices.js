const fs = require('fs');

const invoicesData = JSON.parse(fs.readFileSync('src/data/dentisti_invoices_extracted.json', 'utf8'));

// Build lookup map for invoices
const invoicesLookup = {};

Object.keys(invoicesData).forEach(key => {
  const pays = invoicesData[key].payments;
  const validPays = pays.filter(p => p.invoiceNumber || p.invoiceDate || p.invoiceAmount);
  if (validPays.length > 0) {
    invoicesLookup[key] = validPays;
  }
});

fs.writeFileSync('src/data/invoices_lookup.json', JSON.stringify(invoicesLookup, null, 2), 'utf8');
console.log(`Saved ${Object.keys(invoicesLookup).length} doctors into invoices_lookup.json`);

// Update dentistiSeed.ts to import invoices_lookup.json and map payments
let seedContent = fs.readFileSync('src/data/dentistiSeed.ts', 'utf8');

if (!seedContent.includes('invoices_lookup.json')) {
  seedContent = `import invoicesLookupData from './invoices_lookup.json';\n` + seedContent;
}

// Inside generateInitialDentisti(), map real payments if available
const oldPaymentsCode = `    // Payments reali differenziati per utente
    const payments: Payment[] = [
      {
        id: \`p-\${idx}-1\`,
        date: startDate,
        amount: fee,
        status: 'pagato'
      }
    ];`;

const newPaymentsCode = `    // Real extracted invoices & payments matching Excel
    const normKey = cleanName.toLowerCase().replace(/[^a-z0-9]/g, '');
    const realInvoices = (invoicesLookupData as Record<string, any[]>)[normKey];
    
    let payments: Payment[] = [];
    if (realInvoices && realInvoices.length > 0) {
      payments = realInvoices.map((inv, iIdx) => ({
        id: \`p-\${idx}-\${iIdx+1}\`,
        date: inv.invoiceDate || startDate,
        amount: inv.invoiceAmount || inv.amount || fee,
        status: inv.status || 'pagato',
        invoiceNumber: inv.invoiceNumber || undefined,
        invoiceDate: inv.invoiceDate || undefined,
        invoiceAmount: inv.invoiceAmount || undefined
      }));
    } else {
      payments = [
        {
          id: \`p-\${idx}-1\`,
          date: startDate,
          amount: fee,
          status: 'pagato'
        }
      ];
    }`;

seedContent = seedContent.replace(oldPaymentsCode, newPaymentsCode);

fs.writeFileSync('src/data/dentistiSeed.ts', seedContent, 'utf8');
console.log('Successfully updated dentistiSeed.ts with real invoice data!');
