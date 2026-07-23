const fs = require('fs');

function updateSeedFile(filePath, isDentisti) {
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Update Payment interface
  if (content.includes('export interface Payment {') && !content.includes('invoiceNumber?: string;')) {
    content = content.replace(
      "status: 'pagato' | 'in_attesa' | 'insoluto' | 'disdetto' | 'sospeso';\n}",
      "status: 'pagato' | 'in_attesa' | 'insoluto' | 'disdetto' | 'sospeso';\n  invoiceNumber?: string;\n  invoiceDate?: string;\n  invoiceAmount?: number;\n}"
    );
  }

  // 2. Add Referto interface if missing
  if (!content.includes('export interface Referto {')) {
    const refertoInterface = `
export interface Referto {
  id: string;
  metodoConsegna: 'cartacea' | 'ritiro_in_ufficio' | 'email';
  emailConsegna?: string;
  dataConsegna: string;
}
`;
    // Insert before ClientContract/AmministratoreContract
    content = content.replace('export interface ClientContract {', refertoInterface + '\nexport interface ClientContract {');
    content = content.replace('export interface AmministratoreContract {', refertoInterface + '\nexport interface AmministratoreContract {');
  }

  // 3. Update ClientContract / AmministratoreContract
  if (!content.includes('referti: Referto[];')) {
    content = content.replace('payments: Payment[];', 'payments: Payment[];\n  referti: Referto[];\n  nCampioni?: string;');
  }

  // 4. Update the seed generator object return
  if (!content.includes('referti: []')) {
    // Both generators return an object at the end of the map:
    //       payments
    //     };
    // We want to add nCampioni and referti
    // Use regex to find `payments\n    };` and add them.
    content = content.replace(/payments(\s*)\};/g, "payments,\n      referti: [],\n      nCampioni: ''$1};");
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Updated ' + filePath);
}

updateSeedFile('src/data/dentistiSeed.ts', true);
updateSeedFile('src/data/amministratoriSeed.ts', false);
