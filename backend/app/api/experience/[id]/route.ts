import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const token = req.headers.get('Authorization')?.split(' ')[1];
    if (!token || !verifyToken(token)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const { id } = await params;
    await pool.query('DELETE FROM experience WHERE id = ?', [id]);
    return NextResponse.json({ message: 'Experience deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting experience' }, { status: 500 });
  }
}
