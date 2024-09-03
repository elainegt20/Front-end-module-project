// app/api/upload/route.js

import { writeFile } from 'fs/promises';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const data = await request.formData();
  const file = data.get('file');

  if (!file) {
    return NextResponse.json({ success: false });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Save the file to the filesystem
  const fileName = file.name.replace(/[\s_]/g, '');
  const path = `/tmp/${fileName}`;
  await writeFile(path, buffer);
  console.log(`open ${path} to see the uploaded file`);

  try {
    // Store file temporarily
    const tempFilePath = path.join(process.cwd(), 'tmp', file.name);
    await fs.writeFile(tempFilePath, buffer);
  } catch (error) {
    console.error('Error processing the file:', error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
