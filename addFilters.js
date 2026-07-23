const fs = require('fs');

let page = fs.readFileSync('src/app/manager/page.tsx', 'utf8');

// 1. Add month and year state
const stateInsert = `
  const [selectedMonth, setSelectedMonth] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  
  const [selectedMonthAdmin, setSelectedMonthAdmin] = useState<string>('all');
  const [selectedYearAdmin, setSelectedYearAdmin] = useState<string>('all');
`;

if (!page.includes('setSelectedMonth')) {
  page = page.replace(
    '  const itemsPerPage = 12;',
    stateInsert + '\n  const itemsPerPage = 12;'
  );
}

// 2. We need to add the filter logic to filteredDentisti and filteredAmministratori.
// Let's find filteredDentisti
const filteredDentistiLogic = `
  const filteredDentisti = useMemo(() => {
    let filtered = dentisti;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(d => 
        d.name.toLowerCase().includes(q) || 
        d.email.toLowerCase().includes(q)
      );
    }

    if (selectedLetter !== 'all') {
      filtered = filtered.filter(d => d.letter === selectedLetter);
    }

    if (selectedStatusFilter !== 'all') {
      if (selectedStatusFilter === 'scaduti') {
        const todayStr = new Date().toISOString().split('T')[0];
        filtered = filtered.filter(d => {
          if (d.status !== 'attivo') return false;
          let nextDueDateStr = '';
          const sorted = [...d.payments].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
          const lastPaid = [...sorted].reverse().find(p => p.status === 'pagato');
          if (lastPaid && lastPaid.date) {
            const tempDate = new Date(lastPaid.date);
            tempDate.setFullYear(tempDate.getFullYear() + 1);
            nextDueDateStr = tempDate.toISOString().split('T')[0];
          } else if (d.payments.length > 0) {
            nextDueDateStr = d.payments[d.payments.length - 1].date;
          }
          return nextDueDateStr && nextDueDateStr < todayStr;
        });
      } else {
        filtered = filtered.filter(d => d.status === selectedStatusFilter);
      }
    }
    
    // Nuovo filtro Mese/Anno Scadenza
    if (selectedMonth !== 'all' || selectedYear !== 'all') {
      filtered = filtered.filter(d => {
        let nextDueDateStr = '';
        const sorted = [...d.payments].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        const lastPaid = [...sorted].reverse().find(p => p.status === 'pagato');
        if (lastPaid && lastPaid.date) {
          const tempDate = new Date(lastPaid.date);
          tempDate.setFullYear(tempDate.getFullYear() + 1);
          nextDueDateStr = tempDate.toISOString().split('T')[0];
        } else if (d.payments.length > 0) {
          nextDueDateStr = d.payments[d.payments.length - 1].date;
        }
        
        if (!nextDueDateStr) return false;
        
        const nextDateObj = new Date(nextDueDateStr);
        const m = (nextDateObj.getMonth() + 1).toString();
        const y = nextDateObj.getFullYear().toString();
        
        if (selectedMonth !== 'all' && m !== selectedMonth) return false;
        if (selectedYear !== 'all' && y !== selectedYear) return false;
        
        return true;
      });
    }

    return filtered;
  }, [dentisti, searchQuery, selectedLetter, selectedStatusFilter, selectedMonth, selectedYear]);
`;

// Find existing filteredDentisti
if (page.includes('const filteredDentisti = useMemo(() => {')) {
  const matchStart = page.indexOf('const filteredDentisti = useMemo(() => {');
  let matchEnd = page.indexOf('  }, [dentisti, searchQuery, selectedLetter, selectedStatusFilter]);');
  if (matchEnd > -1) {
    matchEnd += '  }, [dentisti, searchQuery, selectedLetter, selectedStatusFilter]);'.length;
    page = page.substring(0, matchStart) + filteredDentistiLogic.trim() + page.substring(matchEnd);
  }
}

// 3. Similarly for filteredAmministratori
const filteredAdminLogic = `
  const filteredAmministratori = useMemo(() => {
    let filtered = amministratori;

    if (searchQueryAdmin) {
      const q = searchQueryAdmin.toLowerCase();
      filtered = filtered.filter(d => 
        d.name.toLowerCase().includes(q) || 
        d.email.toLowerCase().includes(q)
      );
    }

    if (selectedLetterAdmin !== 'all') {
      filtered = filtered.filter(d => d.letter === selectedLetterAdmin);
    }

    if (selectedStatusFilterAdmin !== 'all') {
      if (selectedStatusFilterAdmin === 'scaduti') {
        const todayStr = new Date().toISOString().split('T')[0];
        filtered = filtered.filter(d => {
          if (d.status !== 'attivo') return false;
          let nextDueDateStr = '';
          const sorted = [...d.payments].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
          const lastPaid = [...sorted].reverse().find(p => p.status === 'pagato');
          if (lastPaid && lastPaid.date) {
            const tempDate = new Date(lastPaid.date);
            tempDate.setFullYear(tempDate.getFullYear() + 1);
            nextDueDateStr = tempDate.toISOString().split('T')[0];
          } else if (d.payments.length > 0) {
            nextDueDateStr = d.payments[d.payments.length - 1].date;
          }
          return nextDueDateStr && nextDueDateStr < todayStr;
        });
      } else {
        filtered = filtered.filter(d => d.status === selectedStatusFilterAdmin);
      }
    }
    
    // Nuovo filtro Mese/Anno Scadenza
    if (selectedMonthAdmin !== 'all' || selectedYearAdmin !== 'all') {
      filtered = filtered.filter(d => {
        let nextDueDateStr = '';
        const sorted = [...d.payments].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        const lastPaid = [...sorted].reverse().find(p => p.status === 'pagato');
        if (lastPaid && lastPaid.date) {
          const tempDate = new Date(lastPaid.date);
          tempDate.setFullYear(tempDate.getFullYear() + 1);
          nextDueDateStr = tempDate.toISOString().split('T')[0];
        } else if (d.payments.length > 0) {
          nextDueDateStr = d.payments[d.payments.length - 1].date;
        }
        
        if (!nextDueDateStr) return false;
        
        const nextDateObj = new Date(nextDueDateStr);
        const m = (nextDateObj.getMonth() + 1).toString();
        const y = nextDateObj.getFullYear().toString();
        
        if (selectedMonthAdmin !== 'all' && m !== selectedMonthAdmin) return false;
        if (selectedYearAdmin !== 'all' && y !== selectedYearAdmin) return false;
        
        return true;
      });
    }

    return filtered;
  }, [amministratori, searchQueryAdmin, selectedLetterAdmin, selectedStatusFilterAdmin, selectedMonthAdmin, selectedYearAdmin]);
`;

if (page.includes('const filteredAmministratori = useMemo(() => {')) {
  const matchStart = page.indexOf('const filteredAmministratori = useMemo(() => {');
  let matchEnd = page.indexOf('  }, [amministratori, searchQueryAdmin, selectedLetterAdmin, selectedStatusFilterAdmin]);');
  if (matchEnd > -1) {
    matchEnd += '  }, [amministratori, searchQueryAdmin, selectedLetterAdmin, selectedStatusFilterAdmin]);'.length;
    page = page.substring(0, matchStart) + filteredAdminLogic.trim() + page.substring(matchEnd);
  }
}

fs.writeFileSync('src/app/manager/page.tsx', page, 'utf8');
console.log('Filters updated in page.tsx');
