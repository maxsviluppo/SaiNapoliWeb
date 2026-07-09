"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Controlla se l'utente ha già fatto una scelta
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Mostra il banner dopo 1 secondo per fluidità
      const timer = setTimeout(() => {
        setVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 md:left-auto md:max-w-md bg-slate-900/95 backdrop-blur-md text-white p-6 rounded-2xl shadow-2xl border border-white/10 z-[200] transition-all duration-300 animate-in slide-in-from-bottom-5">
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-lg">🍪</span>
            <h4 className="font-extrabold text-sm tracking-tight text-white">Informativa sui Cookie</h4>
          </div>
          <p className="text-slate-300 text-xs leading-relaxed">
            Utilizziamo cookie tecnici essenziali e cookie analitici di terze parti per ottimizzare l'esperienza di navigazione sul sito di S.A.I. s.r.l. Puoi acconsentire o rifiutare l'installazione. Per saperne di più, leggi la nostra{' '}
            <a href="/privacy" className="text-sai-green-light underline hover:text-white transition-colors">
              Privacy & Cookie Policy
            </a>.
          </p>
        </div>
        <div className="flex gap-3 justify-end text-xs">
          <button 
            onClick={handleDecline} 
            className="px-4 py-2 border border-white/20 hover:border-white/40 text-slate-300 hover:text-white rounded-lg transition-colors font-bold"
          >
            Rifiuta
          </button>
          <button 
            onClick={handleAccept} 
            className="px-4 py-2 bg-sai-green hover:bg-sai-green-light text-white rounded-lg transition-all hover:scale-105 font-bold shadow-lg shadow-sai-green/10"
          >
            Accetta Tutti
          </button>
        </div>
      </div>
    </div>
  );
}
