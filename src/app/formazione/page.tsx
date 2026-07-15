import { Metadata } from 'next';
import { getLocales } from '../../lib/db';
import FormazioneClient from './FormazioneClient';

export async function generateMetadata(): Promise<Metadata> {
  let title = "Corsi di Formazione Sicurezza sul Lavoro e HACCP Napoli | S.A.I.";
  let description = "Formazione professionale e corsi certificati per RSPP, RLS, Antincendio, Primo Soccorso e addetti HACCP a Napoli. Corsi in aula e online.";
  let keywords = "corsi sicurezza napoli, formazione haccp campania, corso antincendio napoli, attestato primo soccorso";

  try {
    const locales = await getLocales();
    if (locales.seo?.formazione?.title) title = locales.seo.formazione.title;
    if (locales.seo?.formazione?.description) description = locales.seo.formazione.description;
    if (locales.seo?.formazione?.keywords) keywords = locales.seo.formazione.keywords;
  } catch (err) {
    console.error('Error generating metadata for formazione:', err);
  }

  return { title, description, keywords };
}

export default function Page() {
  return <FormazioneClient />;
}
