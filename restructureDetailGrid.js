const fs = require('fs');
let page = fs.readFileSync('src/app/manager/page.tsx', 'utf8');

// Find the form inside selectedDentista
// Old form tag: `<form onSubmit=... className="space-y-6 text-xs text-slate-700">`
// We will replace `<form ... className="space-y-6 text-xs text-slate-700">`
// with `<form ... className="space-y-6 text-xs text-slate-700">\n<div className="grid grid-cols-1 lg:grid-cols-12 gap-6">`

// Left column starts at `{/* EDIT FORM FIELDS */}`:
// `<div className="lg:col-span-5 space-y-4">`
// Wraps Edit Form Fields + Note di servizio

const oldFormStart = `<form 
              onSubmit={(e) => {
                e.preventDefault();
                const exists = dentisti.some(d => d.id === selectedDentista.id);
                let updatedList;
                if (exists) {
                  updatedList = dentisti.map(d => d.id === selectedDentista.id ? selectedDentista : d);
                } else {
                  updatedList = [selectedDentista, ...dentisti];
                }
                saveDentisti(updatedList);
                setSelectedDentista(null);
              }} 
              className="space-y-6 text-xs text-slate-700"
            >
              {/* EDIT FORM FIELDS */}`;

const newFormStart = `<form 
              onSubmit={(e) => {
                e.preventDefault();
                const exists = dentisti.some(d => d.id === selectedDentista.id);
                let updatedList;
                if (exists) {
                  updatedList = dentisti.map(d => d.id === selectedDentista.id ? selectedDentista : d);
                } else {
                  updatedList = [selectedDentista, ...dentisti];
                }
                saveDentisti(updatedList);
                setSelectedDentista(null);
              }} 
              className="space-y-6 text-xs text-slate-700"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* COLONNA SINISTRA: ANAGRAFICA & NOTE */}
                <div className="lg:col-span-5 space-y-4">
                  {/* EDIT FORM FIELDS */}`;

page = page.replace(oldFormStart, newFormStart);

// Close Left Column and Open Right Column before `{/* TABLE SCADENZARIO PAGAMENTI EDITABILE CON PROSSIMA SCADENZA */}`
const oldScadenzarioHeader = `{/* TABLE SCADENZARIO PAGAMENTI EDITABILE CON PROSSIMA SCADENZA */}`;
const newScadenzarioHeader = `</div> {/* FINE COLONNA SINISTRA */}

                {/* COLONNA DESTRA: SCADENZARIO, FATTURE & REFERTI */}
                <div className="lg:col-span-7 space-y-6">
                  {/* TABLE SCADENZARIO PAGAMENTI EDITABILE CON PROSSIMA SCADENZA */}`;

page = page.replace(oldScadenzarioHeader, newScadenzarioHeader);

// Close Right Column and Close Grid before `<div className="flex justify-end gap-3 pt-4 border-t border-slate-100">`
const oldButtonsHeader = `<div className="flex justify-end gap-3 pt-4 border-t border-slate-100">`;
const newButtonsHeader = `</div> {/* FINE COLONNA DESTRA */}
              </div> {/* FINE GRID DESKTOP */}

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">`;

page = page.replace(oldButtonsHeader, newButtonsHeader);

fs.writeFileSync('src/app/manager/page.tsx', page, 'utf8');
console.log('Dentisti Detail Grid restructured into 2 columns for desktop.');
