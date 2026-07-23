const fs = require('fs');
let page = fs.readFileSync('src/app/manager/page.tsx', 'utf8');

// 1. Add states for deleting payment, new payment invoice details, and referti
const newStates = `
  const [paymentToDelete, setPaymentToDelete] = useState<{isAdmin: boolean, index: number} | null>(null);
  
  // New Payment Invoice States (Dentisti)
  const [newInvoiceNumber, setNewInvoiceNumber] = useState('');
  const [newInvoiceDate, setNewInvoiceDate] = useState('');
  const [newInvoiceAmount, setNewInvoiceAmount] = useState<number | ''>('');
  
  // New Payment Invoice States (Amministratori)
  const [newInvoiceNumberAdmin, setNewInvoiceNumberAdmin] = useState('');
  const [newInvoiceDateAdmin, setNewInvoiceDateAdmin] = useState('');
  const [newInvoiceAmountAdmin, setNewInvoiceAmountAdmin] = useState<number | ''>('');

  // Referti States
  const [newRefertoMetodo, setNewRefertoMetodo] = useState<'cartacea' | 'ritiro_in_ufficio' | 'email'>('cartacea');
  const [newRefertoEmail, setNewRefertoEmail] = useState('');
  const [newRefertoDate, setNewRefertoDate] = useState(new Date().toISOString().split('T')[0]);
`;
if (!page.includes('paymentToDelete')) {
  page = page.replace(
    'const [newPaymentAmountAdmin, setNewPaymentAmountAdmin] = useState<number | \'\'>(\'\');',
    'const [newPaymentAmountAdmin, setNewPaymentAmountAdmin] = useState<number | \'\'>(\'\');\n' + newStates
  );
  // Wait, I don't know if newPaymentAmountAdmin exists.
  // Let's just place it under currentPageAdmin
  if(page.includes('const [currentPageAdmin, setCurrentPageAdmin] = useState(1);')) {
    page = page.replace(
      'const [currentPageAdmin, setCurrentPageAdmin] = useState(1);',
      'const [currentPageAdmin, setCurrentPageAdmin] = useState(1);\n' + newStates
    );
  }
}

// 2. Add Modal JSX before </main>
const modalJSX = `
      {/* MODALE ELIMINAZIONE PAGAMENTO */}
      {paymentToDelete && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl">
            <h3 className="font-black text-xl text-slate-900 mb-2">Conferma Eliminazione</h3>
            <p className="text-slate-500 text-sm mb-6">
              Sei sicuro di voler eliminare questa rata di pagamento? L'operazione non può essere annullata.
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setPaymentToDelete(null)}
                className="flex-1 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-all text-sm"
              >
                Annulla
              </button>
              <button 
                onClick={() => {
                  if (paymentToDelete.isAdmin) {
                    if (selectedAmministratore) {
                      const updated = [...selectedAmministratore.payments];
                      updated.splice(paymentToDelete.index, 1);
                      setSelectedAmministratore({...selectedAmministratore, payments: updated});
                    }
                  } else {
                    if (selectedDentista) {
                      const updated = [...selectedDentista.payments];
                      updated.splice(paymentToDelete.index, 1);
                      setSelectedDentista({...selectedDentista, payments: updated});
                    }
                  }
                  setPaymentToDelete(null);
                }}
                className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold transition-all text-sm shadow-md shadow-red-500/20"
              >
                Sì, Elimina
              </button>
            </div>
          </div>
        </div>
      )}
`;

if (!page.includes('MODALE ELIMINAZIONE PAGAMENTO')) {
  page = page.replace('</main>', modalJSX + '\n    </main>');
}

fs.writeFileSync('src/app/manager/page.tsx', page, 'utf8');
console.log('States and modal added.');
