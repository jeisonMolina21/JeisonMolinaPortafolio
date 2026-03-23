import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import { translate } from '@/lib/translator';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const lang = searchParams.get('lang') || 'es';
    const [rows]: any = await pool.query('SELECT * FROM education ORDER BY created_at DESC');
    
    const processedRows = await Promise.all(rows.map(async (row: any) => ({
      ...row,
      degree: await translate(row.degree, lang),
      description: await translate(row.description, lang)
    })));

    return NextResponse.json(processedRows);
  } catch (error: any) {
    return NextResponse.json({ error: 'Error fetching education' }, { status: 500 });
  }
}

import { EducationSchema } from '@/lib/schemas';
import { validateData } from '@/lib/validation';

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get('Authorization')?.split(' ')[1];
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { isValid, data, response } = await validateData(EducationSchema, body);
    
    if (!isValid) return response;

    const { institution, degree, period, description } = data;

    const [result]: any = await pool.query(
      'INSERT INTO education (institution, degree, period, description) VALUES (?, ?, ?, ?)',
      [institution, degree, period, description]
    );

    return NextResponse.json({ id: result.insertId, message: 'Education added successfully' }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: 'Error adding education' }, { status: 500 });
  }
}
