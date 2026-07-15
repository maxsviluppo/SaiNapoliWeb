import fs from 'fs';
import path from 'path';
import postgres from 'postgres';

let sql: any = null;

function getDb() {
  if (!process.env.DATABASE_URL) {
    return null;
  }
  if (!sql) {
    // Connect to Supabase or any standard PostgreSQL database
    sql = postgres(process.env.DATABASE_URL, {
      ssl: 'require', // require SSL for secure cloud connection
      connect_timeout: 10
    });
  }
  return sql;
}

export async function initDb() {
  const db = getDb();
  if (!db) return null;
  
  await db`
    CREATE TABLE IF NOT EXISTS cms_data (
      key TEXT PRIMARY KEY,
      value JSONB NOT NULL,
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  return db;
}

export async function getCmsData(key: string): Promise<any | null> {
  const db = getDb();
  if (!db) return null;
  try {
    const rows = await db`SELECT value FROM cms_data WHERE key = ${key}`;
    if (!rows || rows.length === 0) return null;
    return rows[0].value;
  } catch (err) {
    console.error('Error reading from PostgreSQL:', err);
    return null;
  }
}

export async function setCmsData(key: string, value: any): Promise<void> {
  const db = getDb();
  if (!db) return;
  await db`
    INSERT INTO cms_data (key, value, updated_at)
    VALUES (${key}, ${JSON.stringify(value)}, NOW())
    ON CONFLICT (key) DO UPDATE
    SET value = ${JSON.stringify(value)}, updated_at = NOW()
  `;
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
  // If database is configured, load from DB
  if (process.env.DATABASE_URL) {
    try {
      await initDb();
      const dbData = await getCmsData('locale_it');
      if (dbData) return dbData;
    } catch (dbError) {
      console.error('Database connection failed, falling back to file:', dbError);
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
  // If database is configured, save to DB
  if (process.env.DATABASE_URL) {
    try {
      await initDb();
      await setCmsData('locale_it', data);
      return { success: true, storage: 'database' };
    } catch (dbError: any) {
      console.error('Database save failed:', dbError);
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
