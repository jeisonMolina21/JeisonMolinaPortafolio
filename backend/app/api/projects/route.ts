import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import { translate } from '@/lib/translator';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const lang = searchParams.get('lang') || 'es';
    const [rows]: any = await pool.query('SELECT * FROM projects ORDER BY created_at DESC');
    
    // Process translations if necessary
    const processedRows = await Promise.all(rows.map(async (row: any) => ({
      ...row,
      title: await translate(row.title, lang),
      description: await translate(row.description, lang),
      tech_stack: await translate(row.tech_stack, lang)
    })));

    return NextResponse.json(processedRows);
  } catch (error: any) {
    return NextResponse.json({ error: 'Error fetching projects' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get('Authorization')?.split(' ')[1];
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await req.json();
    const { title, description, image_url, video_url, github_url, demo_url, tech_stack } = data;

    const [result]: any = await pool.query(
      'INSERT INTO projects (title, description, image_url, video_url, github_url, demo_url, tech_stack) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [title, description, image_url, video_url || null, github_url || null, demo_url || null, tech_stack]
    );

    return NextResponse.json({ id: result.insertId, message: 'Project added successfully' }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: 'Error adding project' }, { status: 500 });
  }
}
