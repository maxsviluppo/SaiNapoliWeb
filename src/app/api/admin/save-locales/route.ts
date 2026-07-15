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
    const result = await saveLocales(data);
    if (result.success) {
      return NextResponse.json({ success: true, storage: 'local_file' });
    } else {
      return NextResponse.json({ success: false, error: result.error }, { status: 500 });
    }
  } catch (error: any) {
    console.error('save-locales API error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
