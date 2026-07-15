import { Metadata } from 'next';
import { getLocales } from '../../lib/db';
import StudioDontoiatriciClient from './StudioDontoiatriciClient';

export async function generateMetadata(): Promise<Metadata> {
  let title = "Consulenza Sicurezza e HACCP Studi Odontoiatrici Napoli | S.A.I.";
  let description = "Servizi specifici per studi dentistici e odontoiatrici a Napoli: verifica impianti a pressione (autoclavi), protocolli legionella e sicurezza 81/08.";
  let keywords = "sicurezza studi dentistici, autoclavi odontoiatri napoli, legionella studi medici, dvr studi dentistici";

  try {
    const locales = await getLocales();
    if (locales.seo?.studiodontoiatrici?.title) title = locales.seo.studiodontoiatrici.title;
    if (locales.seo?.studiodontoiatrici?.description) description = locales.seo.studiodontoiatrici.description;
    if (locales.seo?.studiodontoiatrici?.keywords) keywords = locales.seo.studiodontoiatrici.keywords;
  } catch (err) {
    console.error('Error generating metadata for studiodontoiatrici:', err);
  }

  return { title, description, keywords };
}

export default function Page() {
  return <StudioDontoiatriciClient />;
}
