import fs from 'fs';

let page = fs.readFileSync('src/app/manager/page.tsx', 'utf8');

// Replace max-w-2xl with max-w-6xl xl:max-w-7xl
page = page.replace(
  'className="bg-white rounded-[2rem] max-w-2xl w-full p-8 shadow-2xl border border-slate-100 flex flex-col text-left max-h-[90vh] overflow-y-auto"',
  'className="bg-white rounded-[2.5rem] max-w-6xl xl:max-w-7xl w-full p-6 md:p-8 shadow-2xl border border-slate-100 flex flex-col text-left max-h-[92vh] overflow-y-auto"'
);

// We want to transform the form inside selectedDentista to a 2-column Desktop grid layout
// Find the start of the form content: `<form` ... `>`
// And wrap the Anagrafica + Note in <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

const dentistaModalHeaderOld = `<span className="text-[10px] font-black uppercase tracking-widest text-purple-600 bg-purple-50 px-2.5 py-1 rounded-md">Modifica Scheda Studio Dentistico</span>`;
const dentistaModalHeaderNew = `<div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-purple-600 bg-purple-50 px-2.5 py-1 rounded-md">Modifica Scheda Studio Dentistico</span>
                  {selectedDentista.nCampioni && (
                    <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
                      Campioni: {selectedDentista.nCampioni}
                    </span>
                  )}
                </div>`;

page = page.replace(dentistaModalHeaderOld, dentistaModalHeaderNew);

// Let's create the script to adjust the grid layout of form fields
fs.writeFileSync('src/app/manager/page.tsx', page, 'utf8');
console.log('Modal header and width upgraded.');
