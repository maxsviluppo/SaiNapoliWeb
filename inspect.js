const fs = require('fs');
const lines = fs.readFileSync('src/app/manager/page.tsx', 'utf8').split('\n');

function findBlock(startStr, endStr, offsetStart=0) {
  let start = -1;
  for(let i=offsetStart; i<lines.length; i++) {
    if(lines[i].includes(startStr)) { start = i; break; }
  }
  if(start === -1) return;
  let end = -1;
  for(let i=start; i<lines.length; i++) {
    if(lines[i].includes(endStr)) { end = i; break; }
  }
  console.log('Block from', start+1, 'to', end+1);
}

console.log('Admin Payments Table Headers:');
findBlock('Data Scadenza', 'Status Pagamento', 1000);

console.log('Admin Payments Row:');
findBlock('{selectedAmministratore.payments.map((p, index) => (', '</tr>', 1000);

console.log('Admin New Payment:');
findBlock('setNewPaymentAmountAdmin', 'Aggiungi', 1000);

console.log('Dentisti Payments Table Headers:');
findBlock('Data Scadenza', 'Status Pagamento', 1600);

console.log('Dentisti Payments Row:');
findBlock('{selectedDentista.payments.map((p, index) => (', '</tr>', 1600);

console.log('Dentisti New Payment:');
findBlock('setNewPaymentAmount(', 'Aggiungi', 1600);
