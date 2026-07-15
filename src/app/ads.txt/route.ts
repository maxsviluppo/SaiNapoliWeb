import { getLocales } from '../../lib/db';

export async function GET() {
  try {
    const locales = await getLocales();
    const adsTxtContent = locales.seo?.integrations?.ads_txt || '# Predisposizione Ads.txt';
    
    return new Response(adsTxtContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    });
  } catch (error) {
    return new Response('# Errore nel caricamento di ads.txt', {
      status: 500,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    });
  }
}
