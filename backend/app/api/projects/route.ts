import { NextRequest } from 'next/server';
import { PortfolioService } from '@/services/PortfolioService';
import { successResponse, errorResponse, unauthorizedResponse } from '@/constants/api-responses';
import { getAuthUser } from '@/lib/auth';
import { optionsResponse } from '@/lib/cors';
import pool from '@/lib/db';

export async function OPTIONS(req: NextRequest) {
  return optionsResponse(req.headers.get('origin'));
}

export async function GET(req: NextRequest) {
  const origin = req.headers.get('origin');
  try {
    const data = await PortfolioService.getProjects();
    return successResponse(data, origin);
  } catch (error: any) {
    return errorResponse('Error fetching projects', 500, error.message, origin);
  }
}

export async function POST(req: NextRequest) {
  const origin = req.headers.get('origin');
  try {
    const user = getAuthUser(req);
    if (!user) return unauthorizedResponse(origin);
    const body = await req.json();
    const id = await PortfolioService.addProject(body);
    return successResponse({ id, message: 'Project added' }, origin);
  } catch (error: any) {
    return errorResponse('Error adding project', 500, error.message, origin);
  }
}

export async function PUT(req: NextRequest) {
  const origin = req.headers.get('origin');
  try {
    const user = getAuthUser(req);
    if (!user) return unauthorizedResponse(origin);
    const body = await req.json();
    const { id, ...data } = body;
    await pool.query('UPDATE projects SET title = ?, description = ?, tech_stack = ?, image_url = ?, challenge = ?, action = ?, result = ? WHERE id = ?', [data.title, data.description, data.tech_stack, data.image_url, data.challenge, data.action, data.result, id]);
    return successResponse({ message: 'Project updated' }, origin);
  } catch (error: any) {
    return errorResponse('Error updating project', 500, error.message, origin);
  }
}

export async function DELETE(req: NextRequest) {
  const origin = req.headers.get('origin');
  try {
    const user = getAuthUser(req);
    if (!user) return unauthorizedResponse(origin);
    const id = req.nextUrl.searchParams.get('id');
    if (!id) return errorResponse('ID required', 400, null, origin);
    await PortfolioService.deleteProjects(parseInt(id));
    return successResponse({ message: 'Project deleted' }, origin);
  } catch (error: any) {
    return errorResponse('Error deleting project', 500, error.message, origin);
  }
}
