const fs = require('fs');

const file = 'src/app/manager/page.tsx';
let content = fs.readFileSync(file, 'utf8');

// Find start points
const ammStart = content.indexOf('/* TAB: AMMINISTRATORI */');
const scuoleStart = content.indexOf('/* TAB: SCUOLE */');
const dentistiStart = content.indexOf('/* TAB: DENTISTI (GESTIONALE DENTISTI + DASHBOARD STATISTICHE E GRAFICI INSIDE) */');
const registriStart = content.indexOf('/* TAB: REGISTRI */');

if (ammStart === -1 || scuoleStart === -1 || dentistiStart === -1 || registriStart === -1) {
  console.log('Error: Could not find all markers', ammStart, scuoleStart, dentistiStart, registriStart);
  process.exit(1);
}

// Extract Dentisti block
const dentistiBlock = content.substring(dentistiStart, registriStart);

// Clone and adapt it for Amministratori
let ammBlock = dentistiBlock;

ammBlock = ammBlock.replace(/\/\* TAB: DENTISTI[^\*]+\*\//g, '/* TAB: AMMINISTRATORI */');
ammBlock = ammBlock.replace(/activeTab === 'dentisti'/g, "activeTab === 'amministratori'");

// Variables
ammBlock = ammBlock.replace(/filteredDentisti/g, 'filteredAmministratori');
ammBlock = ammBlock.replace(/paginatedDentisti/g, 'paginatedAmministratori');
ammBlock = ammBlock.replace(/dentisti\.length/g, 'amministratori.length');
ammBlock = ammBlock.replace(/setDentisti/g, 'setAmministratori');
ammBlock = ammBlock.replace(/saveDentisti/g, 'saveAmministratori');
ammBlock = ammBlock.replace(/dentisti\.map/g, 'amministratori.map');
ammBlock = ammBlock.replace(/selectedDentista/g, 'selectedAmministratore');
ammBlock = ammBlock.replace(/setSelectedDentista/g, 'setSelectedAmministratore');
ammBlock = ammBlock.replace(/stats\./g, 'statsAdmin.');
ammBlock = ammBlock.replace(/stats,/g, 'statsAdmin,');
ammBlock = ammBlock.replace(/stats }/g, 'statsAdmin }');
ammBlock = ammBlock.replace(/donutSlices/g, 'donutSlicesAdmin');

// Filters
ammBlock = ammBlock.replace(/searchQuery/g, 'searchQueryAdmin');
ammBlock = ammBlock.replace(/setSearchQueryAdmin/g, 'setSearchQueryAdmin'); // already handled by above if we were careful.
// Wait, if I replace `searchQuery` with `searchQueryAdmin`, `setSearchQuery` becomes `setSearchQueryAdmin` ! Perfect!
ammBlock = ammBlock.replace(/selectedLetter/g, 'selectedLetterAdmin');
// `setSelectedLetter` -> `setSelectedLetterAdmin`
ammBlock = ammBlock.replace(/selectedStatusFilter/g, 'selectedStatusFilterAdmin');
// `setSelectedStatusFilter` -> `setSelectedStatusFilterAdmin`
ammBlock = ammBlock.replace(/currentPage/g, 'currentPageAdmin');
ammBlock = ammBlock.replace(/setCurrentPageAdmin/g, 'setCurrentPageAdmin');
ammBlock = ammBlock.replace(/totalPages/g, 'totalPagesAdmin');

// UI Texts
ammBlock = ammBlock.replace(/Database DENTISTI\.SI/g, 'Database AMMINISTRATORI');
ammBlock = ammBlock.replace(/Gestionale Studi Odontoiatrici/g, 'Gestionale Amministratori di Condominio');
ammBlock = ammBlock.replace(/dentista_/g, 'amm_');
ammBlock = ammBlock.replace(/Nuovo Studio Medico/g, 'Nuovo Amministratore');
ammBlock = ammBlock.replace(/Dott\./g, 'Amm.');
ammBlock = ammBlock.replace(/Studio \/ Dentista/g, 'Amministratore');

// Now, the critical substitution: remove the old Amministratori block and insert the new one.
// The old block is from `ammStart` to `scuoleStart`.
const beforeAmm = content.substring(0, ammStart);
const afterAmm = content.substring(scuoleStart);

const newContent = beforeAmm + ammBlock + '\n\n          ' + afterAmm;

fs.writeFileSync(file, newContent, 'utf8');
console.log('Successfully replaced Amministratori tab with Dentisti clone.');
