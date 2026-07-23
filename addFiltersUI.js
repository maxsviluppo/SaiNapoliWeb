const fs = require('fs');

let page = fs.readFileSync('src/app/manager/page.tsx', 'utf8');

// The UI has a search/filter bar for Dentisti and one for Amministratori.
// Let's find the container for Dentisti filters.
// We can find: <select className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:border-purple-400" value={selectedLetter} onChange={(e) => { setSelectedLetter(e.target.value); setCurrentPage(1); }}>

const dentistiFilterUI = `
                <select className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:border-purple-400" value={selectedMonth} onChange={(e) => { setSelectedMonth(e.target.value); setCurrentPage(1); }}>
                  <option value="all">Tutti i Mesi</option>
                  <option value="1">Gennaio</option>
                  <option value="2">Febbraio</option>
                  <option value="3">Marzo</option>
                  <option value="4">Aprile</option>
                  <option value="5">Maggio</option>
                  <option value="6">Giugno</option>
                  <option value="7">Luglio</option>
                  <option value="8">Agosto</option>
                  <option value="9">Settembre</option>
                  <option value="10">Ottobre</option>
                  <option value="11">Novembre</option>
                  <option value="12">Dicembre</option>
                </select>
                <select className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:border-purple-400" value={selectedYear} onChange={(e) => { setSelectedYear(e.target.value); setCurrentPage(1); }}>
                  <option value="all">Tutti gli Anni</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                  <option value="2028">2028</option>
                </select>
`;

// Insert the filters before the Status select for Dentisti.
// Usually it looks like:
/*
                <select className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:border-purple-400" value={selectedLetter} ...>
                  ...
                </select>
                <select className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:border-purple-400" value={selectedStatusFilter} ...>
*/

// Let's use string split and join. We know it exists twice in the file (one for dentisti, one for amministratori).
// For dentisti:
page = page.replace(
  '<select className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:border-purple-400" value={selectedStatusFilter} onChange={(e) => { setSelectedStatusFilter(e.target.value); setCurrentPage(1); }}>',
  dentistiFilterUI + '\n                <select className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:border-purple-400" value={selectedStatusFilter} onChange={(e) => { setSelectedStatusFilter(e.target.value); setCurrentPage(1); }}>'
);

const adminFilterUI = `
                <select className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:border-purple-400" value={selectedMonthAdmin} onChange={(e) => { setSelectedMonthAdmin(e.target.value); setCurrentPageAdmin(1); }}>
                  <option value="all">Tutti i Mesi</option>
                  <option value="1">Gennaio</option>
                  <option value="2">Febbraio</option>
                  <option value="3">Marzo</option>
                  <option value="4">Aprile</option>
                  <option value="5">Maggio</option>
                  <option value="6">Giugno</option>
                  <option value="7">Luglio</option>
                  <option value="8">Agosto</option>
                  <option value="9">Settembre</option>
                  <option value="10">Ottobre</option>
                  <option value="11">Novembre</option>
                  <option value="12">Dicembre</option>
                </select>
                <select className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:border-purple-400" value={selectedYearAdmin} onChange={(e) => { setSelectedYearAdmin(e.target.value); setCurrentPageAdmin(1); }}>
                  <option value="all">Tutti gli Anni</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                  <option value="2028">2028</option>
                </select>
`;

page = page.replace(
  '<select className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:border-purple-400" value={selectedStatusFilterAdmin} onChange={(e) => { setSelectedStatusFilterAdmin(e.target.value); setCurrentPageAdmin(1); }}>',
  adminFilterUI + '\n                <select className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:border-purple-400" value={selectedStatusFilterAdmin} onChange={(e) => { setSelectedStatusFilterAdmin(e.target.value); setCurrentPageAdmin(1); }}>'
);

fs.writeFileSync('src/app/manager/page.tsx', page, 'utf8');
console.log('UI filters inserted.');
