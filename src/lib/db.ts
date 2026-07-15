import fs from 'fs';
import path from 'path';

// Local file path
const getFilePath = () => path.join(process.cwd(), 'src', 'data', 'locales', 'it.json');

export async function getLocales() {
  try {
    const filePath = getFilePath();
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(fileData);
    }
  } catch (err) {
    console.error('Error reading locales file:', err);
  }
  
  // Fallback if file doesn't exist
  return {};
}

export async function saveLocales(data: any) {
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
