const fs = require('fs');

let page = fs.readFileSync('src/app/manager/page.tsx', 'utf8');

page = page.split('sai_dentisti_db_v7').join('sai_dentisti_db_v10');

fs.writeFileSync('src/app/manager/page.tsx', page, 'utf8');
console.log('Bumped storage key to sai_dentisti_db_v10 in page.tsx');
