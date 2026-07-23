// Add back all the missing closing </div> tags before each )}
// Based on the error analysis, every )} that closes a conditional with a root <div> wrapper
// is missing its closing </div>
const fs = require('fs');
let content = fs.readFileSync('src/app/manager/page.tsx', 'utf8');

// All the broken patterns where )} immediately follows with missing </div> closings
// We fix each one by context

const fixes = [
  // 1. Admin section: line ~1239 - )} for activeTab==='admin'&&( missing outer </div>
  {
    find: `                </div>\r\n           )}\r\n\r\n          {/* TAB: SCUOLE */}`,
    replace: `                </div>\r\n            </div>\r\n          )}\r\n\r\n          {/* TAB: SCUOLE */}`
  },
  // 2. Scuole section: line ~1267 - )} for activeTab==='scuole'&&( already has </div> now but may be short
  // Check separately
  
  // 3. Registri section: line ~1767 - )} for activeTab==='registri'&&(
  {
    find: `              </div>\r\n           )}\r\n\r\n         \r\n      {/* MODALE ELIMINAZIONE PAGAMENTO */}`,
    replace: `              </div>\r\n            </div>\r\n          )}\r\n\r\n      {/* MODALE ELIMINAZIONE PAGAMENTO */}`
  },
  // 4. paymentToDelete modal: line ~1808 - )} missing </div></div>
  {
    find: `          </div>\r\n           \u000b}</div>\r\n       )}\r\n\r\n     \r\n      {/* MODALE ELIMINAZIONE INTERA SCHEDA ANAGRAFICA */}`,
    replace: null // skip this one, check separately
  },
  // 4. paymentToDelete: line 1808
  {
    find: `            </div>\r\n           </div>\r\n       )}\r\n\r\n    \r\n      {/* MODALE ELIMINAZIONE INTERA SCHEDA ANAGRAFICA */}`,
    replace: null // check manually
  },
  // 5. Dentisti A4 print modal: line ~1995 - missing several </div>
  {
    find: `                </div>\r\n      )}\r\n\r\n    </main>\r\n\r\n      {/* DETAIL & EDIT MODAL FOR DENTISTA STUDIO */}`,
    replace: `                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      )}\r\n\r\n    </main>\r\n\r\n      {/* DETAIL & EDIT MODAL FOR DENTISTA STUDIO */}`
  },
  // 6. selectedAmministratore modal close: line ~2304 missing </div>
  {
    find: `            </form>\r\n           </div>\r\n       )}\r\n\r\n      {selectedDentista`,
    replace: null // check manually
  },
  // 6. selectedAmministratore: 2304 )} - missing </div> for outer wrapper
  {
    find: `            </form>\r\n           </div>\r\n      )}\r\n\r\n      {selectedDentista`,
    replace: `            </form>\r\n          </div>\r\n        </div>\r\n      )}\r\n\r\n      {selectedDentista`
  },
  // 7. selectedDentista: 2698 missing </div></div>
  {
    find: `            </form>\r\n      )}\r\n\r\n      {/* MODALE STAMPA VERBALE A4 VERTICALE */}`,
    replace: `            </form>\r\n          </div>\r\n        </div>\r\n      )}\r\n\r\n      {/* MODALE STAMPA VERBALE A4 VERTICALE */}`
  },
  // 8. Dentista print modal: 2843 missing closing divs
  {
    find: `                </div>\r\n      )}\r\n\r\n  );\r\n}`,
    replace: `                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      )}\r\n\r\n    </div>\r\n  );\r\n}`
  }
];

let changeCount = 0;
for (const fix of fixes) {
  if (fix.replace === null) continue;
  if (content.includes(fix.find)) {
    content = content.replace(fix.find, fix.replace);
    changeCount++;
    console.log('Applied fix:', fix.find.substring(0, 60).replace(/\r\n/g, '\\n'));
  } else {
    console.log('NOT FOUND:', fix.find.substring(0, 60).replace(/\r\n/g, '\\n'));
  }
}

fs.writeFileSync('src/app/manager/page.tsx', content, 'utf8');
console.log(`\nApplied ${changeCount} fixes.`);

// Quick div balance check
const opens = (content.match(/<div[^/]*>/g) || []).length;
const closes = (content.match(/<\/div>/g) || []).length;
console.log(`Div balance: opens=${opens} closes=${closes} diff=${opens-closes}`);
