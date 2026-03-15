import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = req.headers.get('Authorization')?.split(' ')[1];
    if (!token || !verifyToken(token)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = params;
    const { institution, degree, period, description, lang } = await req.json();

    await pool.query(
      'UPDATE education SET institution = ?, degree = ?, period = ?, description = ?, lang = ? WHERE id = ?',
      [institution, degree, period, description, lang || 'es', id]
    );

    return NextResponse.json({ message: 'Education updated' });
  } catch (error) {
    return NextResponse.json({ error: 'Error updating education' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = req.headers.get('Authorization')?.split(' ')[1];
    if (!token || !verifyToken(token)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = params;
    await pool.query('DELETE FROM education WHERE id = ?', [id]);
    return NextResponse.json({ message: 'Education deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting education' }, { status: 500 });
  }
}
