import * as fs from 'fs';

export async function writeFile(filePath: string, data: any) {
  const directory = filePath.substring(0, filePath.lastIndexOf('/'));

  // Ensure the directory exists
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }

  // Write the data to the file
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}
