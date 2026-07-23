const fs = require('fs');
const file = 'src/app/manager/page.tsx';
let content = fs.readFileSync(file, 'utf8');

const ammStart = content.indexOf('/* TAB: AMMINISTRATORI */');
const scuoleStart = content.indexOf('/* TAB: SCUOLE */');
let ammBlock = content.substring(ammStart, scuoleStart);

ammBlock = ammBlock.replace('<th className="p-4">Canone</th>', '<th className="p-4">Canone</th>\n                        <th className="p-4">Condomini Gestiti</th>');

ammBlock = ammBlock.replace(/<td className="p-4">\s*\{c\.status === 'attivo'/g, "<td className=\"p-4 text-emerald-600 font-bold bg-emerald-50/30 text-center\">\n                              {c.condominiums.length}\n                            </td>\n                            <td className=\"p-4\">\n                              {c.status === 'attivo'");

content = content.substring(0, ammStart) + ammBlock + content.substring(scuoleStart);
fs.writeFileSync(file, content, 'utf8');
console.log('Added Condomini column.');
