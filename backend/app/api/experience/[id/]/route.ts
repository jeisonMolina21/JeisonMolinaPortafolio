import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = req.headers.get('Authorization')?.split(' ')[1];
    if (!token || !verifyToken(token)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = params;
    const { company, role, period, description, skills, lang } = await req.json();

    await pool.query(
      'UPDATE experience SET company = ?, role = ?, period = ?, description = ?, skills = ?, lang = ? WHERE id = ?',
      [company, role, period, description, skills, lang || 'es', id]
    );

    return NextResponse.json({ message: 'Experience updated' });
  } catch (error) {
    return NextResponse.json({ error: 'Error updating experience' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = req.headers.get('Authorization')?.split(' ')[1];
    if (!token || !verifyToken(token)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = params;
    await pool.query('DELETE FROM experience WHERE id = ?', [id]);
    return NextResponse.json({ message: 'Experience deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting experience' }, { status: 500 });
  }
}
