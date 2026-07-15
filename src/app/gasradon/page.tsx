import { Metadata } from 'next';
import { getLocales } from '../../lib/db';
import GasRadonClient from './GasRadonClient';

export async function generateMetadata(): Promise<Metadata> {
  let title = "Misurazione e Bonifica Gas Radon Campania | S.A.I. s.r.l.";
  let description = "Servizio qualificato di misurazione concentrazione Gas Radon a Napoli e Campania. Adeguamento legge regionale e relazioni tecniche di conformità.";
  let keywords = "gas radon campania, misurazione radon napoli, bonifica radon locali commerciali, obbligo legge radon";

  try {
    const locales = await getLocales();
    if (locales.seo?.gasradon?.title) title = locales.seo.gasradon.title;
    if (locales.seo?.gasradon?.description) description = locales.seo.gasradon.description;
    if (locales.seo?.gasradon?.keywords) keywords = locales.seo.gasradon.keywords;
  } catch (err) {
    console.error('Error generating metadata for gasradon:', err);
  }

  return { title, description, keywords };
}

export default function Page() {
  return <GasRadonClient />;
}
