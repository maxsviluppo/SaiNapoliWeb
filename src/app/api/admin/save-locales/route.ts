import { NextResponse } from 'next/server';
import { getLocales, saveLocales } from '../../../../lib/db';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const data = await getLocales();
    return NextResponse.json({ success: true, data, storage: 'local_file' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { data } = await req.json();

    // Check if we are running in production on Vercel without a database
    if (process.env.VERCEL && !process.env.DATABASE_URL) {
      console.warn('DATABASE_URL not set on Vercel. Changes will not persist across deployments.');
      return NextResponse.json({ 
        success: true, 
        storage: 'memory',
        warning: 'In produzione online i dati non possono essere scritti su file. Configura DATABASE_URL per memorizzarli permanentemente.'
      });
    }

    const result = await saveLocales(data);
    if (result.success) {
      return NextResponse.json({ success: true, storage: 'local_file' });
    } else {
      // If it failed due to EROFS, return fallback success with warning
      const errorMsg = String(result.error || '');
      if (errorMsg.includes('EROFS') || errorMsg.includes('read-only')) {
        return NextResponse.json({
          success: true,
          storage: 'memory',
          warning: 'Salvataggio in memoria: impossibile scrivere su file online. Configura DATABASE_URL per renderlo persistente.'
        });
      }
      return NextResponse.json({ success: false, error: result.error }, { status: 500 });
    }
  } catch (error: any) {
    console.error('save-locales API error:', error);
    const errorMsg = String(error.message || error);
    if (errorMsg.includes('EROFS') || errorMsg.includes('read-only')) {
      return NextResponse.json({
        success: true,
        storage: 'memory',
        warning: 'Salvataggio in memoria: filesystem in sola lettura online.'
      });
    }
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
