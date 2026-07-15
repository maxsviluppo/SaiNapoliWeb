import { Metadata } from 'next';
import { getLocales } from '../../lib/db';
import LegionellaClient from './LegionellaClient';

export async function generateMetadata(): Promise<Metadata> {
  let title = "Valutazione Rischio Legionella Napoli | Prevenzione e Bonifica Acque";
  let description = "Piano di valutazione del rischio Legionella per hotel, cliniche, palestre e condomini a Napoli. Analisi microbiologiche e protocolli di disinfezione.";
  let keywords = "legionella napoli, valutazione rischio legionellosi, analisi acqua legionella, sanificazione impianti idrici";

  try {
    const locales = await getLocales();
    if (locales.seo?.legionella?.title) title = locales.seo.legionella.title;
    if (locales.seo?.legionella?.description) description = locales.seo.legionella.description;
    if (locales.seo?.legionella?.keywords) keywords = locales.seo.legionella.keywords;
  } catch (err) {
    console.error('Error generating metadata for legionella:', err);
  }

  return { title, description, keywords };
}

export default function Page() {
  return <LegionellaClient />;
}
