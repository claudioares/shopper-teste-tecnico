import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { promisify } from 'util';

const writeFileAsync = promisify(fs.writeFile);
const accessAsync = promisify(fs.access);

async function ensureCacheDirectoryExists(directory: string): Promise<void> {
  try {
    await accessAsync(directory);
  } catch (error:any) {
    if (error.code === 'ENOENT') {
      fs.mkdirSync(directory, { recursive: true });
    } else {
      throw error;
    }
  }
}

export async function base64ToTempImage(base64Image: string): Promise<string> {

    const cacheDirectory = path.join(__dirname, 'cache');
    await ensureCacheDirectoryExists(cacheDirectory);

    const base64Data = base64Image.replace(/^data:image\/jpeg;base64,/, '');
    const imageBuffer = Buffer.from(base64Data, 'base64');

    const fileName = `${uuidv4()}.jpg`;
    const filePath = path.join(cacheDirectory, fileName);

    await writeFileAsync(filePath, imageBuffer);

    const tempLink:string = `http://localhost:3000/cache/${fileName}` as string;

    return tempLink;
}
