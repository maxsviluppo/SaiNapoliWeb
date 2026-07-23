const fs = require('fs');

// Restore git tracked files using python/shell or replace corrupted section
let page = fs.readFileSync('src/app/manager/page.tsx', 'utf8');

// Find lines 1050 to 1150 and replace cleanly
const startMarker = '<td className="p-4 text-slate-600 font-bold">{c.paese} ({c.city})</td>';
const endMarker = '<td className="p-4 font-bold text-slate-900 whitespace-nowrap">';

// Let's inspect where the syntax error is located
const lines = page.split('\n');
console.log('Total lines in page.tsx:', lines.length);

let errLine = -1;
lines.forEach((l, idx) => {
  if (l.includes('lastInvoice') || l.includes('getExpiryStatus')) {
    console.log(idx + 1, l.substring(0, 80));
  }
});
