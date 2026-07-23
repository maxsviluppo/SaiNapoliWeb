const fs = require('fs');
let page = fs.readFileSync('src/app/manager/page.tsx', 'utf8');

// 1. Color coding for Amministratori payment status select
const oldAdminSelect = `                                <select 
                                  value={p.status}
                                  onChange={(e) => {
                                    const newStatus = e.target.value as any;
                                    const updatedPayments = [...selectedAmministratore.payments];
                                    updatedPayments[index] = { ...updatedPayments[index], status: newStatus };
                                    setSelectedAmministratore({ 
                                      ...selectedAmministratore, 
                                      payments: updatedPayments,
                                      status: newStatus === 'pagato' ? 'attivo' : (newStatus === 'disdetto' ? 'disdetto' : (newStatus === 'sospeso' ? 'sospeso' : selectedAmministratore.status))
                                    });
                                  }}
                                  className="w-full bg-transparent outline-none font-black text-xs cursor-pointer"
                                >`;

const newAdminSelect = `                                <select 
                                  value={p.status}
                                  onChange={(e) => {
                                    const newStatus = e.target.value as any;
                                    const updatedPayments = [...selectedAmministratore.payments];
                                    updatedPayments[index] = { ...updatedPayments[index], status: newStatus };
                                    setSelectedAmministratore({ 
                                      ...selectedAmministratore, 
                                      payments: updatedPayments,
                                      status: newStatus === 'pagato' ? 'attivo' : (newStatus === 'disdetto' ? 'disdetto' : (newStatus === 'sospeso' ? 'sospeso' : selectedAmministratore.status))
                                    });
                                  }}
                                  className={\`w-full bg-transparent outline-none font-black text-xs cursor-pointer appearance-none \${
                                    p.status === 'pagato' ? 'text-emerald-800 font-black' :
                                    p.status === 'in_attesa' ? 'text-slate-800 font-bold' :
                                    p.status === 'insoluto' ? 'text-red-900 font-black' :
                                    p.status === 'disdetto' ? 'text-rose-900 font-black' :
                                    'text-orange-900 font-black'
                                  }\`}
                                >`;

page = page.replace(oldAdminSelect, newAdminSelect);

// 2. Further widen Amministratori modal container
const oldAdminModalContainer = `{selectedAmministratore && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] max-w-6xl xl:max-w-7xl w-full p-6 md:p-8 shadow-2xl border border-slate-100 flex flex-col text-left max-h-[92vh] overflow-y-auto">`;

const newAdminModalContainer = `{selectedAmministratore && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] max-w-[96vw] xl:max-w-[1450px] w-full p-6 md:p-8 shadow-2xl border border-slate-100 flex flex-col text-left max-h-[94vh] overflow-y-auto">`;

page = page.replace(oldAdminModalContainer, newAdminModalContainer);

// 3. Also widen Dentisti modal container to max-w-[96vw] xl:max-w-[1450px]
const oldDentistiModalContainer = `{selectedDentista && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] max-w-6xl xl:max-w-7xl w-full p-6 md:p-8 shadow-2xl border border-slate-100 flex flex-col text-left max-h-[92vh] overflow-y-auto">`;

const newDentistiModalContainer = `{selectedDentista && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] max-w-[96vw] xl:max-w-[1450px] w-full p-6 md:p-8 shadow-2xl border border-slate-100 flex flex-col text-left max-h-[94vh] overflow-y-auto">`;

page = page.replace(oldDentistiModalContainer, newDentistiModalContainer);

// Bump local storage database key to sai_dentisti_db_v3
page = page.split('sai_dentisti_db_v2').join('sai_dentisti_db_v3');

fs.writeFileSync('src/app/manager/page.tsx', page, 'utf8');
console.log('Amministratori colors, modal width, and storage key upgraded.');
