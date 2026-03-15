import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export async function GET() {
  try {
    const [rows] = await pool.query('SELECT * FROM skills ORDER BY name ASC');
    return NextResponse.json(rows);
  } catch (error: any) {
    return NextResponse.json({ error: 'Error fetching skills' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get('Authorization')?.split(' ')[1];
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { name, category } = await req.json();
    await pool.query('INSERT IGNORE INTO skills (name, category) VALUES (?, ?)', [name, category]);

    return NextResponse.json({ message: 'Skill added successfully' }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: 'Error adding skill' }, { status: 500 });
  }
}
