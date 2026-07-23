import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://klbvvohhkeytvysbmraq.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

let supabase: any = null;

function getSupabaseClient() {
  if (!supabase && SUPABASE_URL && SUPABASE_KEY) {
    supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
      auth: {
        persistSession: false
      }
    });
  }
  return supabase;
}

export async function getCmsData(key: string): Promise<any | null> {
  const client = getSupabaseClient();
  if (!client) return null;
  try {
    const { data, error } = await client
      .from('cms_data')
      .select('value')
      .eq('key', key)
      .maybeSingle();

    if (error) {
      // Graceful fallback without cluttering console with stack traces
      return null;
    }
    return data ? data.value : null;
  } catch (err) {
    return null;
  }
}

export async function setCmsData(key: string, value: any): Promise<void> {
  const client = getSupabaseClient();
  if (!client) throw new Error('Supabase client non inizializzato');

  const { error } = await client
    .from('cms_data')
    .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: 'key' });

  if (error) {
    if (error.code === '42P01') {
      throw new Error('Tabella "cms_data" mancante. Crea la tabella nel pannello SQL Editor di Supabase con:\n\nCREATE TABLE cms_data (\n  key TEXT PRIMARY KEY,\n  value JSONB NOT NULL,\n  updated_at TIMESTAMPTZ DEFAULT NOW()\n);');
    }
    throw new Error(error.message);
  }
}

const getFilePath = () => {
  const possiblePaths = [
    path.join(process.cwd(), 'src', 'data', 'locales', 'it.json'),
    path.join(process.cwd(), 'sainapoliweb-main', 'src', 'data', 'locales', 'it.json')
  ];

  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      return p;
    }
  }

  const baseDir = process.cwd().endsWith('sainapoliweb-main') 
    ? process.cwd() 
    : path.join(process.cwd(), 'sainapoliweb-main');
  return path.join(baseDir, 'src', 'data', 'locales', 'it.json');
};

export async function getLocales() {
  const client = getSupabaseClient();
  if (client) {
    try {
      const dbData = await getCmsData('locale_it');
      if (dbData) return dbData;
    } catch (dbError) {
      console.error('Supabase connection failed, falling back to file:', dbError);
    }
  }

  try {
    const filePath = getFilePath();
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(fileData);
    }
  } catch (err) {
    console.error('Error reading locales file:', err);
  }
  
  return {};
}

export async function saveLocales(data: any) {
  const client = getSupabaseClient();
  if (client) {
    try {
      await setCmsData('locale_it', data);
      return { success: true, storage: 'database' };
    } catch (dbError: any) {
      console.error('Supabase save failed:', dbError);
      return { success: false, error: dbError.message };
    }
  }

  try {
    const filePath = getFilePath();
    const dirPath = path.dirname(filePath);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return { success: true, storage: 'local_file' };
  } catch (err: any) {
    console.error('Error writing locales file:', err);
    return { success: false, error: err.message };
  }
}
