import { Metadata } from 'next';
import { getLocales } from '../../lib/db';
import PrivacyClient from './PrivacyClient';

export async function generateMetadata(): Promise<Metadata> {
  let title = "Privacy Policy | S.A.I. s.r.l. Salute Ambiente Igiene";
  let description = "Informativa sul trattamento dei dati personali ai sensi del Regolamento UE 679/2016 per gli utenti del sito web di S.A.I. s.r.l.";
  let keywords = "privacy policy, trattamento dati personali, sai srl privacy";

  try {
    const locales = await getLocales();
    if (locales.seo?.privacy?.title) title = locales.seo.privacy.title;
    if (locales.seo?.privacy?.description) description = locales.seo.privacy.description;
    if (locales.seo?.privacy?.keywords) keywords = locales.seo.privacy.keywords;
  } catch (err) {
    console.error('Error generating metadata for privacy:', err);
  }

  return { title, description, keywords };
}

export default function Page() {
  return <PrivacyClient />;
}
