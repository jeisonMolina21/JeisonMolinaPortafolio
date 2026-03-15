import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { verifyToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get('Authorization')?.split(' ')[1];
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get('file') as Blob | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create a unique filename
    const originalName = (file as any).name || 'upload.png';
    const extension = originalName.split('.').pop();
    const filename = `${uuidv4()}.${extension}`;
    
    // Path to save - using relative path to the public folder in Next.js
    const path = join(process.cwd(), 'public', 'uploads', filename);
    await writeFile(path, buffer);

    return NextResponse.json({ 
      message: 'File uploaded successfully',
      url: `/uploads/${filename}`
    });
  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Error uploading file' }, { status: 500 });
  }
}
