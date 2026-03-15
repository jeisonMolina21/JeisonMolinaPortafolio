import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export async function DELETE(req: NextRequest, { params }: { params: any }) {
  try {
    const token = req.headers.get('Authorization')?.split(' ')[1];
    if (!token || !verifyToken(token)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    await pool.query('DELETE FROM skills WHERE id = ?', [id]);
    return NextResponse.json({ message: 'Skill deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting skill' }, { status: 500 });
  }
}
