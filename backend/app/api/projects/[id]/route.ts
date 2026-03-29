import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import { ProjectSchema } from '@/lib/schemas';
import { validateData } from '@/lib/validation';
import { withCors, optionsResponse } from '@/lib/cors';

export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get('origin');
  return optionsResponse(origin);
}

export async function PUT(req: NextRequest, { params }: { params: any }) {
  const origin = req.headers.get('origin');
  try {
    const token = req.headers.get('Authorization')?.split(' ')[1];
    if (!token || !verifyToken(token)) {
      return withCors(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }), origin);
    }

    const { id } = await params;
    const body = await req.json();
    const { isValid, data, response } = await validateData(ProjectSchema, body);
    if (!isValid) return withCors(response!, origin);

    const { title, description, image_url, video_url, github_url, demo_url, tech_stack } = data!;

    await pool.query(
      'UPDATE projects SET title = ?, description = ?, image_url = ?, video_url = ?, github_url = ?, demo_url = ?, tech_stack = ? WHERE id = ?',
      [title, description, image_url, video_url ?? null, github_url ?? null, demo_url ?? null, tech_stack, id]
    );

    return withCors(NextResponse.json({ message: 'Project updated successfully' }), origin);
  } catch (error: any) {
    console.error('Error updating project:', error);
    return withCors(NextResponse.json({ error: 'Error updating project' }, { status: 500 }), origin);
  }
}

export async function DELETE(req: NextRequest, { params }: { params: any }) {
  const origin = req.headers.get('origin');
  try {
    const token = req.headers.get('Authorization')?.split(' ')[1];
    if (!token || !verifyToken(token)) {
      return withCors(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }), origin);
    }

    const { id } = await params;
    await pool.query('DELETE FROM projects WHERE id = ?', [id]);
    return withCors(NextResponse.json({ message: 'Project deleted' }), origin);
  } catch (error: any) {
    console.error('Error deleting project:', error);
    return withCors(NextResponse.json({ error: 'Error deleting project' }, { status: 500 }), origin);
  }
}
