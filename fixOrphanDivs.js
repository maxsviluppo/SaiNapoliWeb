// Fix the broken JSX structure caused by the bad regex substitution of </table>\n</div>
const fs = require('fs');
let content = fs.readFileSync('src/app/manager/page.tsx', 'utf8');

// The problem: script replaced </table>\n                </div> with </table></div>\n                </div>
// This added extra </div> after print tables that don't have overflow-x-auto wrappers.
// Fix: The two orphan </table></div> at lines 1950 and 2806 need the </div> removed (they weren't wrapped)

// Fix 1950 area: table inside printClient modal - no wrapper needed, just </table>
// Fix 2806 area: same issue

// Count occurrences in context to target correctly
// The print tables are inside modals with regular table tags (no overflow-x-auto wrapper)
// We need to revert </table></div> -> </table> only for the print modals

// Strategy: find the print table endings and fix them
// Print modal tables have specific context - they're inside printClient && (...) conditionals
// and have className="w-full border-collapse text-left text-[11px] border border-slate-300"

let lines = content.split('\n');

let fixCount = 0;
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  // If this line is </table></div> and the NEXT line is </div> (closing another div)
  // AND there's no <div className="overflow-x-auto"> before this table
  // We need to find which </table></div> are orphaned (no matching overflow-x-auto opener)
  
  if (line.includes('</table></div>')) {
    // Look back up to 200 lines to see if there's a matching overflow-x-auto opener
    let foundWrapper = false;
    let depth = 0;
    for (let j = i - 1; j >= Math.max(0, i - 200); j--) {
      if (lines[j].includes('</table>') || lines[j].includes('</div>')) depth++;
      if (lines[j].includes('<div className="overflow-x-auto">') && lines[j].includes('<table')) {
        foundWrapper = true;
        break;
      }
      // Stop if we hit a table opening without overflow-x-auto
      if (lines[j].includes('<table ') && !lines[j].includes('overflow-x-auto')) {
        break;
      }
    }
    
    if (!foundWrapper) {
      // This is an orphaned </table></div> - remove the extra </div>
      lines[i] = line.replace('</table></div>', '</table>');
      fixCount++;
      console.log(`Fixed orphaned </div> on line ${i+1}`);
    }
  }
}

content = lines.join('\n');
fs.writeFileSync('src/app/manager/page.tsx', content, 'utf8');
console.log(`\nTotal fixes applied: ${fixCount}`);

// Verify
const remaining = (content.match(/overflow-x-auto/g) || []).length;
const tables = (content.match(/<table /g) || []).length;
const tableCloses = (content.match(/<\/table>/g) || []).length;
const doubleClose = (content.match(/<\/table><\/div>/g) || []).length;
console.log(`overflow-x-auto wrappers: ${remaining}`);
console.log(`<table opens: ${tables}, </table> closes: ${tableCloses}`);
console.log(`</table></div> remaining: ${doubleClose}`);
