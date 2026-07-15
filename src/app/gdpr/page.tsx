import { Metadata } from 'next';
import { getLocales } from '../../lib/db';
import GdprClient from './GdprClient';

export async function generateMetadata(): Promise<Metadata> {
  let title = "Adeguamento Privacy e GDPR Napoli | Consulenza Sicurezza Dati S.A.I.";
  let description = "Servizio completo di consulenza per l'adeguamento al Regolamento UE 2016/679 (GDPR) a Napoli. Redazione registro trattamenti e nomina DPO.";
  let keywords = "gdpr napoli, adeguamento privacy campania, consulenza dpo, regolamento europeo privacy";

  try {
    const locales = await getLocales();
    if (locales.seo?.gdpr?.title) title = locales.seo.gdpr.title;
    if (locales.seo?.gdpr?.description) description = locales.seo.gdpr.description;
    if (locales.seo?.gdpr?.keywords) keywords = locales.seo.gdpr.keywords;
  } catch (err) {
    console.error('Error generating metadata for gdpr:', err);
  }

  return { title, description, keywords };
}

export default function Page() {
  return <GdprClient />;
}
