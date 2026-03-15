import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export async function PUT(req: NextRequest, { params }: { params: any }) {
  try {
    const token = req.headers.get('Authorization')?.split(' ')[1];
    if (!token || !verifyToken(token)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    const data = await req.json();
    const { title, description, image_url, video_url, github_url, demo_url, tech_stack } = data;

    await pool.query(
      'UPDATE projects SET title = ?, description = ?, image_url = ?, video_url = ?, github_url = ?, demo_url = ?, tech_stack = ? WHERE id = ?',
      [title, description, image_url, video_url || null, github_url || null, demo_url || null, tech_stack, id]
    );

    return NextResponse.json({ message: 'Project updated successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Error updating project' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: any }) {
  try {
    const token = req.headers.get('Authorization')?.split(' ')[1];
    if (!token || !verifyToken(token)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    await pool.query('DELETE FROM projects WHERE id = ?', [id]);
    return NextResponse.json({ message: 'Project deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting project' }, { status: 500 });
  }
}
