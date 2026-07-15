"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Phone, Mail, MapPin, ExternalLink, Shield } from 'lucide-react';

export default function Footer() {
  const [azienda, setAzienda] = useState<any>(null);

  useEffect(() => {
    fetch('/api/admin/save-locales')
      .then(res => res.json())
      .then(resData => {
        if (resData.success && resData.data?.azienda) {
          setAzienda(resData.data.azienda);
        }
      })
      .catch(err => console.error('Error loading footer company data:', err));
  }, []);

  const name = azienda?.name || "S.A.I. s.r.l.";
  const address = azienda?.address || "Via Luigi La Vista, 5 - Napoli (Italy)";
  const phone = azienda?.phone || "081 06 08 910";
  const phoneMobile = azienda?.phone_mobile || "+39 393 88 79 849";
  const email = azienda?.email || "saluteambienteigiene@gmail.com";
  const pec = azienda?.pec || "sai.srl@pecaruba.it";
  const hours = azienda?.hours || "LUN/VEN — 09:00 / 18:00";
  
  const facebook = azienda?.social_facebook || "https://www.facebook.com/people/Salute-Ambiente-Igiene/100094422848740/?sk=about";
  const instagram = azienda?.social_instagram || "https://www.instagram.com/saluteambienteigiene/?igshid=OGQ5ZDc2ODk2ZA%3D%3D";
  const linkedin = azienda?.social_linkedin || "https://www.linkedin.com/company/salute-ambiente-igiene/?viewAsMember=true";

  return (
    <footer className="bg-slate-900 text-white border-t border-white/5 py-12 mt-auto w-full">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Column 1 Logo */}
        <div className="md:col-span-4 space-y-4">
          <div className="flex items-center gap-3">
            <div className="relative w-16 h-16 overflow-hidden">
              <Image 
                src="/logo.png" 
                alt="S.A.I. Logo Footer" 
                fill 
                sizes="64px"
                className="object-contain" 
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-extrabold tracking-tight text-white leading-none">{name}</span>
              <span className="text-[10px] font-bold text-sai-green-light tracking-wider uppercase">Salute Ambiente Igiene</span>
            </div>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
            Consulenza ed assistenza tecnica alle imprese per l'igiene, la sicurezza sul lavoro e la tutela dell'ambiente.
          </p>
          <div className="flex gap-3 pt-2">
            {facebook && facebook !== '#' && (
              <a 
                href={facebook}
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-sai-blue hover:border-sai-blue transition-all"
                title="Facebook S.A.I. s.r.l."
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </a>
            )}
            {instagram && instagram !== '#' && (
              <a 
                href={instagram}
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-pink-600 hover:border-pink-600 transition-all"
                title="Instagram S.A.I. s.r.l."
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            )}
            {linkedin && linkedin !== '#' && (
              <a 
                href={linkedin}
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-sky-700 hover:border-sky-700 transition-all"
                title="LinkedIn S.A.I. s.r.l."
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            )}
          </div>
        </div>

        {/* Column 2 Services Sitemap */}
        <div className="md:col-span-4 space-y-3">
          <h4 className="text-xs font-black tracking-widest text-sai-green-light uppercase">Mappa del Sito</h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <a href="/sicurezza-sul-lavoro" className="text-slate-400 hover:text-white transition-colors">Sicurezza Lavoro</a>
            <a href="/haccp" className="text-slate-400 hover:text-white transition-colors">HACCP Alimentare</a>
            <a href="/legionella" className="text-slate-400 hover:text-white transition-colors">Legionella</a>
            <a href="/studiodontoiatrici" className="text-slate-400 hover:text-white transition-colors">Autoclavi Studi</a>
            <a href="/analisi-acque" className="text-slate-400 hover:text-white transition-colors">Analisi Acque</a>
            <a href="/gasradon" className="text-slate-400 hover:text-white transition-colors">Gas Radon</a>
            <a href="/gdpr" className="text-slate-400 hover:text-white transition-colors">GDPR Privacy</a>
            <a href="/formazione" className="text-slate-400 hover:text-white transition-colors">Corsi Sicurezza</a>
          </div>
        </div>

        {/* Column 3 Interactive Contacts */}
        <div className="md:col-span-4 space-y-3 text-xs">
          <h4 className="text-xs font-black tracking-widest text-sai-green-light uppercase">Contatti Diretti</h4>
          <div className="space-y-2 text-slate-300">
            <p className="flex flex-col gap-2">
              <span className="flex items-center gap-2">
                <Phone size={14} className="text-sai-green shrink-0" />
                <span><strong>Fisso:</strong> <a href={`tel:${phone.replace(/\s+/g, '')}`} className="hover:text-white transition-colors">{phone}</a></span>
              </span>
              <span className="flex items-center gap-2">
                <Phone size={14} className="text-sai-green shrink-0" />
                <span><strong>Cell:</strong> <a href={`tel:${phoneMobile.replace(/\s+/g, '')}`} className="hover:text-white transition-colors">{phoneMobile}</a></span>
              </span>
              <span className="text-[10px] text-slate-500 ml-6 block leading-none">Orari: {hours}</span>
            </p>
            <p className="flex flex-col gap-2 pt-1">
              <span className="flex items-center gap-2">
                <Mail size={14} className="text-sai-green shrink-0" />
                <span><strong>Email:</strong> <a href={`mailto:${email}`} className="hover:text-white transition-colors">{email}</a></span>
              </span>
              {pec && (
                <span className="flex items-center gap-2">
                  <Mail size={14} className="text-sai-green shrink-0" />
                  <span><strong>PEC:</strong> <a href={`mailto:${pec}`} className="hover:text-white transition-colors">{pec}</a></span>
                </span>
              )}
            </p>
            <p className="flex flex-col gap-2 pt-1">
              <span className="flex items-start gap-2">
                <MapPin size={14} className="text-sai-green shrink-0 mt-0.5" />
                <span>
                  <strong>Sede:</strong> {address}<br/>
                  <span className="text-[10px] text-slate-500">Si riceve su appuntamento</span>
                </span>
              </span>
            </p>
            <div className="pt-1">
              <a 
                href={`https://wa.me/${phoneMobile.replace(/[^0-9]/g, '')}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-600 hover:bg-green-500 text-white font-bold rounded-lg transition-colors text-[10px]"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.062 5.321 5.378.002 12.01.002c3.211 0 6.231 1.249 8.5 3.52 2.27 2.27 3.518 5.289 3.516 8.5-.008 6.684-5.325 12.002-11.956 12.002-1.996-.002-3.956-.499-5.711-1.446L0 24zm6.59-4.846c1.6.95 3.197 1.45 4.817 1.453 5.483 0 9.944-4.461 9.95-9.95.002-2.66-1.033-5.159-2.914-7.04C16.623 1.777 14.12 .74 11.458.74c-5.485 0-9.946 4.46-9.952 9.95-.001 2.005.522 3.966 1.516 5.698L1.879 21.8l5.632-1.479c1.688.92 3.424 1.4 5.136 1.4z" />
                </svg>
                Chat WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 border-t border-white/5 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-[10px] text-slate-500">
          © {new Date().getFullYear()} {name}. Tutti i diritti riservati.
        </p>
        <div className="flex gap-4 items-center">
          <a href="/privacy" className="text-[10px] text-slate-500 hover:text-white transition-colors">Privacy Policy</a>
          <a href="/privacy" className="text-[10px] text-slate-500 hover:text-white transition-colors">Cookie Policy</a>
          <a href="/admin" className="text-[10px] text-slate-500 hover:text-white transition-colors flex items-center gap-1" title="Area Amministrativa">
            <Shield size={10} className="text-sai-green shrink-0" />
            <span>Area Riservata</span>
          </a>
          <a href="https://www.codecafe.it" target="_blank" rel="noopener noreferrer" className="text-[10px] text-purple-400 hover:underline flex items-center gap-1 font-bold">
            Realizzato da CODECAFE <ExternalLink size={8} />
          </a>
        </div>
      </div>
    </footer>
  );
}
