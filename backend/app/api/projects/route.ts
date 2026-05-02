import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import { translate } from '@/lib/translator';
import { ProjectSchema } from '@/lib/schemas';
import { validateData } from '@/lib/validation';
import { optionsResponse } from '@/lib/cors';
import { successResponse, errorResponse, unauthorizedResponse, validationErrorResponse } from '@/constants/api-responses';

export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get('origin');
  return optionsResponse(origin);
}

export async function GET(req: NextRequest) {
  const origin = req.headers.get('origin');
  try {
    const { searchParams } = new URL(req.url);
    const lang = searchParams.get('lang') || 'es';
    const [rows]: any = await pool.query('SELECT * FROM projects ORDER BY created_at DESC');

    const processedRows = await Promise.all(rows.map(async (row: any) => ({
      ...row,
      title: await translate(row.title, lang),
      description: await translate(row.description, lang),
      tech_stack: await translate(row.tech_stack, lang),
    })));

    return successResponse(processedRows, origin);
  } catch (error: any) {
    console.error('Error fetching projects:', error);
    return errorResponse('Error al obtener los proyectos', 500, error.message, origin);
  }
}

export async function POST(req: NextRequest) {
  const origin = req.headers.get('origin');
  try {
    const user = getAuthUser(req);
    if (!user) {
      return unauthorizedResponse(origin);
    }

    const body = await req.json();
    const { isValid, data, response } = await validateData(ProjectSchema, body);
    if (!isValid) return validationErrorResponse(data, origin);

    const { title, description, image_url, video_url, github_url, demo_url, tech_stack } = data!;

    const [result]: any = await pool.query(
      'INSERT INTO projects (title, description, image_url, video_url, github_url, demo_url, tech_stack) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [title, description, image_url, video_url ?? null, github_url ?? null, demo_url ?? null, tech_stack]
    );

    return successResponse({ id: result.insertId, message: 'Proyecto agregado exitosamente' }, origin);
  } catch (error: any) {
    console.error('Error adding project:', error);
    return errorResponse('Error al agregar el proyecto', 500, error.message, origin);
  }
}

