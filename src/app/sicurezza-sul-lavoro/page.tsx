import { Metadata } from 'next';
import { getLocales } from '../../lib/db';
import SicurezzaClient from './SicurezzaClient';

export async function generateMetadata(): Promise<Metadata> {
  let title = "Sicurezza sul Lavoro Napoli D.Lgs. 81/08 | Redazione DVR S.A.I.";
  let description = "Consulenza completa per la sicurezza sul lavoro a Napoli. Redazione DVR, valutazione rischi, sorveglianza sanitaria e corsi di formazione aziendali.";
  let keywords = "sicurezza sul lavoro napoli, dvr napoli, d.lgs 81/08 campania, medicina del lavoro napoli, rspp esterno";

  try {
    const locales = await getLocales();
    if (locales.seo?.['sicurezza-sul-lavoro']?.title) title = locales.seo['sicurezza-sul-lavoro'].title;
    if (locales.seo?.['sicurezza-sul-lavoro']?.description) description = locales.seo['sicurezza-sul-lavoro'].description;
    if (locales.seo?.['sicurezza-sul-lavoro']?.keywords) keywords = locales.seo['sicurezza-sul-lavoro'].keywords;
  } catch (err) {
    console.error('Error generating metadata for sicurezza-sul-lavoro:', err);
  }

  return { title, description, keywords };
}

export default function Page() {
  return <SicurezzaClient />;
}
