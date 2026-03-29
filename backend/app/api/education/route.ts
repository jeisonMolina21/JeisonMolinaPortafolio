import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import { translate } from '@/lib/translator';
import { EducationSchema } from '@/lib/schemas';
import { validateData } from '@/lib/validation';
import { withCors, optionsResponse } from '@/lib/cors';

export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get('origin');
  return optionsResponse(origin);
}

export async function GET(req: NextRequest) {
  const origin = req.headers.get('origin');
  try {
    const { searchParams } = new URL(req.url);
    const lang = searchParams.get('lang') || 'es';
    const [rows]: any = await pool.query('SELECT * FROM education ORDER BY created_at DESC');

    const processedRows = await Promise.all(rows.map(async (row: any) => ({
      ...row,
      degree: await translate(row.degree, lang),
      description: await translate(row.description, lang),
    })));

    return withCors(NextResponse.json(processedRows), origin);
  } catch (error: any) {
    console.error('Error fetching education:', error);
    return withCors(NextResponse.json({ error: 'Error fetching education' }, { status: 500 }), origin);
  }
}

export async function POST(req: NextRequest) {
  const origin = req.headers.get('origin');
  try {
    const token = req.headers.get('Authorization')?.split(' ')[1];
    if (!token || !verifyToken(token)) {
      return withCors(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }), origin);
    }

    const body = await req.json();
    const { isValid, data, response } = await validateData(EducationSchema, body);
    if (!isValid) return withCors(response!, origin);

    const { institution, degree, period, description } = data!;

    const [result]: any = await pool.query(
      'INSERT INTO education (institution, degree, period, description) VALUES (?, ?, ?, ?)',
      [institution, degree, period, description ?? null]
    );

    return withCors(NextResponse.json({ id: result.insertId, message: 'Education added successfully' }, { status: 201 }), origin);
  } catch (error: any) {
    console.error('Error adding education:', error);
    return withCors(NextResponse.json({ error: 'Error adding education' }, { status: 500 }), origin);
  }
}
