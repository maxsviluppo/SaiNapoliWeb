import { Metadata } from 'next';
import { getLocales } from '../../lib/db';
import AnalisiAcqueClient from './AnalisiAcqueClient';

export async function generateMetadata(): Promise<Metadata> {
  let title = "Analisi Acque e Piscine Napoli | Consulenza Chimica e Microbiologica S.A.I.";
  let description = "Analisi chimiche e batteriologiche per acque potabili, reflue e piscine a Napoli e provincia. Certificazioni ufficiali e piani di autocontrollo.";
  let keywords = "analisi acque napoli, controllo microbiologico acqua, analisi piscine campania, parametri chimici acqua";

  try {
    const locales = await getLocales();
    if (locales.seo?.['analisi-acque']?.title) title = locales.seo['analisi-acque'].title;
    if (locales.seo?.['analisi-acque']?.description) description = locales.seo['analisi-acque'].description;
    if (locales.seo?.['analisi-acque']?.keywords) keywords = locales.seo['analisi-acque'].keywords;
  } catch (err) {
    console.error('Error generating metadata for analisi-acque:', err);
  }

  return { title, description, keywords };
}

export default function Page() {
  return <AnalisiAcqueClient />;
}
