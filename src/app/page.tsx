import { Metadata } from 'next';
import { getLocales } from '../lib/db';
import HomeClient from './HomeClient';

export async function generateMetadata(): Promise<Metadata> {
  let title = "S.A.I. s.r.l. | Consulenza Sicurezza sul Lavoro e HACCP Napoli";
  let description = "Consulenza professionale a Napoli e Campania per sicurezza sul lavoro, igiene alimentare, radon e corsi di formazione certificati D.Lgs. 81/08.";
  let keywords = "haccp napoli, sicurezza sul lavoro napoli, corsi sicurezza campania, consulenza d.lgs 81/08, autocontrollo alimentare";

  try {
    const locales = await getLocales();
    if (locales.seo?.home?.title) title = locales.seo.home.title;
    if (locales.seo?.home?.description) description = locales.seo.home.description;
    if (locales.seo?.home?.keywords) keywords = locales.seo.home.keywords;
  } catch (err) {
    console.error('Error generating metadata for home:', err);
  }

  return {
    title,
    description,
    keywords
  };
}

export default function Page() {
  return <HomeClient />;
}
