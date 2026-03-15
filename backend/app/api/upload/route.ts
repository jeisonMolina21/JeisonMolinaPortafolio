import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { verifyToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get('Authorization')?.split(' ')[1];
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Upload to Vercel Blob
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      console.error('BLOB_READ_WRITE_TOKEN is missing');
      return NextResponse.json({ error: 'Configuración de almacenamiento incompleta' }, { status: 500 });
    }

    const blob = await put(file.name, file, {
      access: 'public',
      addRandomSuffix: true,
    });

    console.log('File uploaded to:', blob.url);

    return NextResponse.json({ 
      message: 'File uploaded successfully',
      url: blob.url
    });
  } catch (error: any) {
    console.error('Upload error detail:', {
        message: error.message,
        stack: error.stack,
        cause: error.cause
    });
    return NextResponse.json({ 
      error: 'Error uploading file',
      details: error.message 
    }, { status: 500 });
  }
}
