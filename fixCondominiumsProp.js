const fs = require('fs');
let page = fs.readFileSync('src/app/manager/page.tsx', 'utf8');

page = page.replace("condominiGestiti: 10,", "condominiums: ['Condominio Parco Sole'],");

fs.writeFileSync('src/app/manager/page.tsx', page, 'utf8');
console.log('Fixed condominiums property name in page.tsx');
