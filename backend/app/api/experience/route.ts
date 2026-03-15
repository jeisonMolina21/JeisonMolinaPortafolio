import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import { translate } from '@/lib/translator';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const lang = searchParams.get('lang') || 'es';
    const [rows]: any = await pool.query('SELECT * FROM experience ORDER BY created_at DESC');
    
    const processedRows = await Promise.all(rows.map(async (row: any) => ({
      ...row,
      role: await translate(row.role, lang),
      description: await translate(row.description, lang),
      skills: await translate(row.skills, lang)
    })));

    return NextResponse.json(processedRows);
  } catch (error: any) {
    return NextResponse.json({ error: 'Error fetching experience' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get('Authorization')?.split(' ')[1];
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { company, role, period, description, skills } = await req.json();

    const [result]: any = await pool.query(
      'INSERT INTO experience (company, role, period, description, skills) VALUES (?, ?, ?, ?, ?)',
      [company, role, period, description, skills]
    );

    return NextResponse.json({ id: result.insertId, message: 'Experience added successfully' }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: 'Error adding experience' }, { status: 500 });
  }
}
