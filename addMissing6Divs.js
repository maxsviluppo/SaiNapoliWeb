// Add back exactly the 6 missing outer </div> tags before each )} section close
const fs = require('fs');
let content = fs.readFileSync('src/app/manager/page.tsx', 'utf8');

const fixes = [
  // 1. Admin section (line ~1239)
  {
    find: '              </div>\r\n           )}\r\n\r\n          {/* TAB: SCUOLE */}',
    replace: '              </div>\r\n            </div>\r\n          )}\r\n\r\n          {/* TAB: SCUOLE */}'
  },
  // 2. Dentisti section (line ~1746)
  {
    find: '              </div>\r\n           )}\r\n\r\n          {/* TAB: REGISTRI */}',
    replace: '              </div>\r\n            </div>\r\n          )}\r\n\r\n          {/* TAB: REGISTRI */}'
  },
  // 3. Registri section (line ~1767)
  {
    find: '              </div>\r\n           )}\r\n\r\n         \r\n      {/* MODALE ELIMINAZIONE PAGAMENTO */}',
    replace: '              </div>\r\n            </div>\r\n          )}\r\n\r\n      {/* MODALE ELIMINAZIONE PAGAMENTO */}'
  },
  // 4. paymentToDelete modal (line ~1808)
  {
    find: '           </div>\r\n       )}\r\n\r\n     \r\n      {/* MODALE ELIMINAZIONE INTERA SCHEDA ANAGRAFICA */}',
    replace: '           </div>\r\n        </div>\r\n      )}\r\n\r\n      {/* MODALE ELIMINAZIONE INTERA SCHEDA ANAGRAFICA */}'
  },
  // 5. clientToDelete modal (line ~1853)
  {
    find: '           </div>\r\n       )}\r\n\r\n     \r\n      {/* MODALE STAMPA VERBALE A4 VERTICALE */}',
    replace: '           </div>\r\n        </div>\r\n      )}\r\n\r\n      {/* MODALE STAMPA VERBALE A4 VERTICALE */}'
  },
  // 6. selectedAmministratore modal (line ~2308)
  {
    find: '           </div>\r\n       )}\r\n\r\n      {selectedDentista',
    replace: '           </div>\r\n        </div>\r\n      )}\r\n\r\n      {selectedDentista'
  }
];

let applied = 0;
for (const fix of fixes) {
  if (content.includes(fix.find)) {
    content = content.replace(fix.find, fix.replace);
    applied++;
    console.log('✅ Fixed:', fix.find.substring(0, 55).replace(/\r\n/g, '↵'));
  } else {
    console.log('❌ NOT FOUND:', fix.find.substring(0, 55).replace(/\r\n/g, '↵'));
    // Try with \n only (Unix line endings)
    const findLF = fix.find.replace(/\r\n/g, '\n');
    const replaceLF = fix.replace.replace(/\r\n/g, '\n');
    if (content.includes(findLF)) {
      content = content.replace(findLF, replaceLF);
      applied++;
      console.log('  ✅ Fixed with LF:', findLF.substring(0, 55).replace(/\n/g, '↵'));
    }
  }
}

fs.writeFileSync('src/app/manager/page.tsx', content, 'utf8');
console.log(`\nApplied ${applied} fixes.`);

const open = (content.match(/<div[\s>]/g) || []).length;
const close = (content.match(/<\/div>/g) || []).length;
console.log(`Div balance: opens=${open} closes=${close} diff=${open - close}`);
