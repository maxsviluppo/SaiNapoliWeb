const fs = require('fs');
let page = fs.readFileSync('src/app/manager/page.tsx', 'utf8');

// Fix Amministratore creation block (around line 733)
const oldAdminCreate = `                  <button 
                    onClick={() => {
                      const newId = \`amm_\${Date.now()}\`;
                      const today = new Date().toISOString().split('T')[0];
                      const newDentista: ClientContract = {
                        id: newId,
                        name: 'Nuovo Studio Dentistico',
                        letter: 'N',
                        contractNumber: Math.floor(600 + Math.random() * 300),
                        status: 'attivo',
                        city: 'Napoli',
                        paese: 'Napoli',
                        phone: '081 0000000',
                        email: 'info@nuovostudio.it',
                        monthlyFee: 150,
                        billingInterval: '3 mesi',
                        startDate: today,
                        notes: 'Nuovo studio registrato da pannello di controllo.',
                        payments: [
                          {
                            id: \`pay_\${Date.now()}\`,
                            date: today,
                            amount: 150,
                            status: 'in_attesa'
                          }
                        ]
                      };
                      setSelectedAmministratore(newDentista);
                    }}`;

const newAdminCreate = `                  <button 
                    onClick={() => {
                      const newId = \`amm_\${Date.now()}\`;
                      const today = new Date().toISOString().split('T')[0];
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
                        notes: 'Nuovo amministratore registrato.',
                        payments: [
                          {
                            id: \`pay_\${Date.now()}\`,
                            date: today,
                            amount: 150,
                            status: 'in_attesa'
                          }
                        ],
                        referti: []
                      };
                      const updated = [newAmm, ...amministratori];
                      setAmministratori(updated);
                      setSelectedAmministratore(newAmm);
                    }}`;

page = page.replace(oldAdminCreate, newAdminCreate);

// Fix Dentista creation block (around line 1203)
const oldDentistaCreate = `                  <button 
                    onClick={() => {
                      const newId = \`dentista_\${Date.now()}\`;
                      const today = new Date().toISOString().split('T')[0];
                      const newDentista: ClientContract = {
                        id: newId,
                        name: 'Nuovo Studio Dentistico',
                        letter: 'N',
                        contractNumber: Math.floor(600 + Math.random() * 300),
                        status: 'attivo',
                        city: 'Napoli',
                        paese: 'Napoli',
                        phone: '081 0000000',
                        email: 'info@nuovostudio.it',
                        monthlyFee: 150,
                        billingInterval: '3 mesi',
                        startDate: today,
                        notes: 'Nuovo studio registrato da pannello di controllo.',
                        payments: [
                          {
                            id: \`pay_\${Date.now()}\`,
                            date: today,
                            amount: 150,
                            status: 'in_attesa'
                          }
                        ]
                      };
                      setSelectedDentista(newDentista);
                    }}`;

const newDentistaCreate = `                  <button 
                    onClick={() => {
                      const newId = \`dentista_\${Date.now()}\`;
                      const today = new Date().toISOString().split('T')[0];
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
                        notes: 'Nuovo studio registrato da pannello di controllo.',
                        payments: [
                          {
                            id: \`pay_\${Date.now()}\`,
                            date: today,
                            amount: 150,
                            status: 'in_attesa'
                          }
                        ],
                        referti: [],
                        nCampioni: ''
                      };
                      const updated = [newDentista, ...dentisti];
                      setDentisti(updated);
                      setSelectedDentista(newDentista);
                    }}`;

page = page.replace(oldDentistaCreate, newDentistaCreate);

fs.writeFileSync('src/app/manager/page.tsx', page, 'utf8');
console.log('Fixed object creation type errors.');
