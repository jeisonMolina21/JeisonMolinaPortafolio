import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { verifyToken } from '@/lib/auth';
import { withCors, optionsResponse } from '@/lib/cors';

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4'];
const MAX_SIZE_MB = 10;

export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get('origin');
  return optionsResponse(origin);
}

export async function POST(req: NextRequest) {
  const origin = req.headers.get('origin');
  try {
    const token = req.headers.get('Authorization')?.split(' ')[1];
    if (!token || !verifyToken(token)) {
      return withCors(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }), origin);
    }

    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return withCors(NextResponse.json({ error: 'No file uploaded' }, { status: 400 }), origin);
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return withCors(NextResponse.json({ error: 'Tipo de archivo no permitido' }, { status: 400 }), origin);
    }

    // Validate file size
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      return withCors(NextResponse.json({ error: `El archivo supera el límite de ${MAX_SIZE_MB}MB` }, { status: 400 }), origin);
    }

    const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
    if (!blobToken) {
      console.error('❌ CRITICAL: BLOB_READ_WRITE_TOKEN is not defined in environment variables.');
      return withCors(NextResponse.json({ error: 'Configuración de almacenamiento incompleta en el servidor' }, { status: 500 }), origin);
    }

    console.log(`🚀 Uploading to Vercel Blob: ${file.name} (${(file.size / 1024).toFixed(2)} KB)`);

    const blob = await put(file.name, file, {
      access: 'public',
      addRandomSuffix: true,
      token: blobToken,
    });

    return withCors(NextResponse.json({ message: 'File uploaded successfully', url: blob.url }), origin);
  } catch (error: any) {
    console.error('Upload error:', { message: error.message, stack: error.stack });
    return withCors(NextResponse.json({ error: 'Error uploading file', details: error.message }, { status: 500 }), origin);
  }
}
