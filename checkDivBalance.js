const fs = require('fs');
const lines = fs.readFileSync('src/app/manager/page.tsx', 'utf8').split('\n');

console.log('--- ADMIN MODAL FOOTER (2050-2090) ---');
for (let i = 2050; i < 2090; i++) console.log(i + 1, lines[i]);

console.log('--- DENTISTI MODAL FOOTER (2465-2510) ---');
for (let i = 2465; i < 2510; i++) console.log(i + 1, lines[i]);
