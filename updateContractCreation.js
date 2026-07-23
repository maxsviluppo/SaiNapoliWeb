const fs = require('fs');
let page = fs.readFileSync('src/app/manager/page.tsx', 'utf8');

const ammReplacement = `
                      const maxContract = amministratori.reduce((max, d) => Math.max(max, d.contractNumber || 0), 0);
                      const newAmm: AmministratoreContract = {
                        id: newId,
                        name: 'Nuovo Amministratore',
                        letter: 'N',
                        contractNumber: maxContract > 0 ? maxContract + 1 : 100,
                        status: 'attivo',
                        city: 'Napoli',
                        paese: 'Napoli',
                        phone: '081 0000000',
                        email: 'info@nuovoamministratore.it',
                        monthlyFee: 150,
                        billingInterval: '1 anno',
                        startDate: today,
                        condominiGestiti: 10,
                        nCampioni: '',
                        notes: '',
                        payments: [{ id: 'pay_1', date: today, amount: 150, status: 'pagato' }],
                        referti: []
                      };
                      const updated = [newAmm, ...amministratori];
                      setAmministratori(updated);
                      setSelectedAmministratore(newAmm);
                      try { localStorage.setItem('sai_amministratori_db', JSON.stringify(updated)); } catch(e){}
`;

// Replace the old admin creation block
const adminStart = page.indexOf('const newId = `amm_${Date.now()}`;');
const adminEnd = page.indexOf('} catch (e) {', adminStart);
if(adminStart !== -1 && adminEnd !== -1) {
   const blockEnd = page.indexOf('}', adminEnd) + 1;
   page = page.substring(0, adminStart) + 'const newId = `amm_${Date.now()}`;\n                      const today = new Date().toISOString().split(\'T\')[0];' + ammReplacement + page.substring(blockEnd);
}

const dentistiReplacement = `
                      const maxContract = dentisti.reduce((max, d) => Math.max(max, d.contractNumber || 0), 0);
                      const newDentista: ClientContract = {
                        id: newId,
                        name: 'Nuovo Studio Dentistico',
                        letter: 'N',
                        contractNumber: maxContract > 0 ? maxContract + 1 : 100,
                        status: 'attivo',
                        city: 'Napoli',
                        paese: 'Napoli',
                        phone: '081 0000000',
                        email: 'info@nuovostudio.it',
                        monthlyFee: 150,
                        billingInterval: '1 anno',
                        startDate: today,
                        nCampioni: '',
                        notes: '',
                        payments: [{ id: 'pay_1', date: today, amount: 150, status: 'pagato' }],
                        referti: []
                      };
                      const updated = [newDentista, ...dentisti];
                      setDentisti(updated);
                      setSelectedDentista(newDentista);
                      try { localStorage.setItem('sai_dentisti_db', JSON.stringify(updated)); } catch(e){}
`;

const dentStart = page.indexOf('const newId = `dent_${Date.now()}`;');
const dentEnd = page.indexOf('} catch (e) {', dentStart);
if(dentStart !== -1 && dentEnd !== -1) {
   const blockEnd = page.indexOf('}', dentEnd) + 1;
   page = page.substring(0, dentStart) + 'const newId = `dent_${Date.now()}`;\n                      const today = new Date().toISOString().split(\'T\')[0];' + dentistiReplacement + page.substring(blockEnd);
}

fs.writeFileSync('src/app/manager/page.tsx', page, 'utf8');
console.log('Contract logic updated.');
