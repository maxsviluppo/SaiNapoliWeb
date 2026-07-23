const fs = require('fs');

// 1. Update dentistiSeed.ts
let dSeed = fs.readFileSync('src/data/dentistiSeed.ts', 'utf8');
dSeed = dSeed.replace(
  "const billingInterval = (idx % 5 === 0) ? '1 mese' : ((idx % 7 === 0) ? '1 anno' : '3 mesi');",
  "const billingInterval = '1 anno';"
);
// Also update the '3 mesi' fallback in addIntervalToDate if needed, but not strictly required if we set it properly.
fs.writeFileSync('src/data/dentistiSeed.ts', dSeed, 'utf8');

// 2. Update amministratoriSeed.ts
let aSeed = fs.readFileSync('src/data/amministratoriSeed.ts', 'utf8');
aSeed = aSeed.replace(
  "const billingInterval = (idx % 5 === 0) ? '1 mese' : ((idx % 7 === 0) ? '1 anno' : '3 mesi');",
  "const billingInterval = '1 anno';"
);
fs.writeFileSync('src/data/amministratoriSeed.ts', aSeed, 'utf8');

// 3. Update page.tsx
let page = fs.readFileSync('src/app/manager/page.tsx', 'utf8');

// Change fallback from '3 mesi' to '1 anno' in both the view and the editor
page = page.replace(/c\.billingInterval \|\| '3 mesi'/g, "c.billingInterval || '1 anno'");
page = page.replace(/selectedDentista\.billingInterval \|\| '3 mesi'/g, "selectedDentista.billingInterval || '1 anno'");

// We need to add the 1-week warning.
// Let's replace the nextDueDateStr logic in both tables.
const oldRenderDate = `
                                  if (!nextDueDateStr) return null;
                                  const isPast = nextDueDateStr < todayStr;

                                  return (
                                    <span className={\`px-2.5 py-1 rounded-lg border inline-flex items-center gap-1.5 text-xs font-mono font-bold w-fit \${
                                      isPast 
                                        ? 'bg-red-50 text-red-700 border-red-200' 
                                        : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                    }\`}>
                                      <Calendar className={\`w-3.5 h-3.5 \${isPast ? 'text-red-500' : 'text-emerald-600'}\`} />
                                      <span>{nextDueDateStr}</span>
                                    </span>
                                  );`;

const newRenderDate = `
                                  if (!nextDueDateStr) return null;
                                  
                                  const nextDateObj = new Date(nextDueDateStr);
                                  const todayObj = new Date(todayStr);
                                  const diffTime = nextDateObj.getTime() - todayObj.getTime();
                                  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                                  
                                  const isPast = diffDays < 0;
                                  const isWarning = diffDays >= 0 && diffDays <= 7;

                                  let colorClasses = 'bg-emerald-50 text-emerald-700 border-emerald-200';
                                  let iconColor = 'text-emerald-600';
                                  
                                  if (isPast) {
                                    colorClasses = 'bg-red-50 text-red-700 border-red-200';
                                    iconColor = 'text-red-500';
                                  } else if (isWarning) {
                                    colorClasses = 'bg-amber-50 text-amber-700 border-amber-200 animate-pulse';
                                    iconColor = 'text-amber-500';
                                  }

                                  return (
                                    <span className={\`px-2.5 py-1 rounded-lg border inline-flex items-center gap-1.5 text-xs font-mono font-bold w-fit \${colorClasses}\`}>
                                      <Calendar className={\`w-3.5 h-3.5 \${iconColor}\`} />
                                      <span>{nextDueDateStr} {isWarning ? '(In Scadenza)' : ''}</span>
                                    </span>
                                  );`;

page = page.split(oldRenderDate).join(newRenderDate);

fs.writeFileSync('src/app/manager/page.tsx', page, 'utf8');
console.log('Successfully updated seeds and page.tsx with 1 anno and 1-week warning.');
