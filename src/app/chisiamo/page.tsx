import { Metadata } from 'next';
import { getLocales } from '../../lib/db';
import ChiSiamoClient from './ChiSiamoClient';

export async function generateMetadata(): Promise<Metadata> {
  let title = "Chi Siamo | S.A.I. s.r.l. Consulenza Sicurezza e Ambiente Napoli";
  let description = "Conosci la storia di S.A.I. s.r.l., da oltre 20 anni partner delle imprese a Napoli per l'adeguamento normativo, la sicurezza e l'igiene nei luoghi di lavoro.";
  let keywords = "consulenza aziendale napoli, team esperti sicurezza, storia s.a.i. srl, ambiente e igiene napoli";

  try {
    const locales = await getLocales();
    if (locales.seo?.chisiamo?.title) title = locales.seo.chisiamo.title;
    if (locales.seo?.chisiamo?.description) description = locales.seo.chisiamo.description;
    if (locales.seo?.chisiamo?.keywords) keywords = locales.seo.chisiamo.keywords;
  } catch (err) {
    console.error('Error generating metadata for chisiamo:', err);
  }

  return { title, description, keywords };
}

export default function Page() {
  return <ChiSiamoClient />;
}
