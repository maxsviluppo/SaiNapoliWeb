const fs = require('fs');
let page = fs.readFileSync('src/app/manager/page.tsx', 'utf8');

const oldHeader = `
                    <span className="bg-slate-100 text-slate-500 text-xs font-bold px-2 py-0.5 rounded-md">
                      Contratto #{selectedDentista.contractNumber || 'N/D'}
                    </span>
`;

const newHeader = `
                    <span className="bg-slate-100 text-slate-500 text-xs font-bold px-2 py-0.5 rounded-md">
                      Contratto #{selectedDentista.contractNumber || 'N/D'}
                    </span>
                    <span className="bg-blue-50 text-blue-600 text-xs font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 2v7.31"></path><path d="M14 9.3V1.99"></path><path d="M8.5 2h7"></path><path d="M14 9.3a6.5 6.5 0 1 1-4 0"></path><path d="M5.52 16h12.96"></path></svg>
                      {selectedDentista.nCampioni || '0'} Campioni
                    </span>
`;

if (page.includes(oldHeader.trim())) {
  page = page.replace(oldHeader.trim(), newHeader.trim());
  fs.writeFileSync('src/app/manager/page.tsx', page, 'utf8');
  console.log('Added Campioni to header');
} else {
  console.log('Header not found');
}
