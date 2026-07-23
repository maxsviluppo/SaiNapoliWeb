const fs = require('fs');
let page = fs.readFileSync('src/app/manager/page.tsx', 'utf8');

const contractInputBlock = `
                <div>
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">Numero Contratto N°</label>
                  <input 
                    type="number" 
                    value={selectedDentista.contractNumber || ''}
                    onChange={(e) => setSelectedDentista({ ...selectedDentista, contractNumber: e.target.value ? parseInt(e.target.value) : null })}
                    placeholder="Es. 547"
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold font-mono text-slate-900 focus:outline-none focus:border-purple-500"
                  />
                </div>
`;

const newContractInputBlock = `
                <div>
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">Numero Contratto N°</label>
                  <input 
                    type="number" 
                    value={selectedDentista.contractNumber || ''}
                    onChange={(e) => setSelectedDentista({ ...selectedDentista, contractNumber: e.target.value ? parseInt(e.target.value) : null })}
                    placeholder="Es. 547"
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold font-mono text-slate-900 focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">N. Campioni</label>
                  <input 
                    type="text" 
                    value={selectedDentista.nCampioni || ''}
                    onChange={(e) => setSelectedDentista({ ...selectedDentista, nCampioni: e.target.value })}
                    placeholder="Es. 3"
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold font-mono text-slate-900 focus:outline-none focus:border-purple-500"
                  />
                </div>
`;

if(page.includes(contractInputBlock.trim())) {
  page = page.replace(contractInputBlock.trim(), newContractInputBlock.trim());
  fs.writeFileSync('src/app/manager/page.tsx', page, 'utf8');
  console.log('Added Campioni input');
} else {
  console.log('Contract block not found');
}
