import { Metadata } from 'next';
import { getLocales } from '../../lib/db';
import HaccpClient from './HaccpClient';

export async function generateMetadata(): Promise<Metadata> {
  let title = "Consulenza e Corsi HACCP Napoli | Manuale Autocontrollo Alimentare";
  let description = "Leader a Napoli nella consulenza HACCP. Redazione manuale autocontrollo, corsi OSA e analisi tamponi superficiali per bar, ristoranti e hotel.";
  let keywords = "haccp napoli, corso haccp napoli, manuale autocontrollo alimentare, tamponi superficiali campania, consulenza osa";

  try {
    const locales = await getLocales();
    if (locales.seo?.haccp?.title) title = locales.seo.haccp.title;
    if (locales.seo?.haccp?.description) description = locales.seo.haccp.description;
    if (locales.seo?.haccp?.keywords) keywords = locales.seo.haccp.keywords;
  } catch (err) {
    console.error('Error generating metadata for haccp:', err);
  }

  return { title, description, keywords };
}

export default function Page() {
  return <HaccpClient />;
}
