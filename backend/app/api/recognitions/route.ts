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
    const data = await PortfolioService.getRecognitions();
    return successResponse(data, origin);
  } catch (error: any) {
    return errorResponse('Error fetching recognitions', 500, error.message, origin);
  }
}

export async function POST(req: NextRequest) {
  const origin = req.headers.get('origin');
  try {
    const user = getAuthUser(req);
    if (!user) return unauthorizedResponse(origin);
    const body = await req.json();
    const id = await PortfolioService.addRecognition(body);
    return successResponse({ id, message: 'Recognition added' }, origin);
  } catch (error: any) {
    return errorResponse('Error adding recognition', 500, error.message, origin);
  }
}

export async function PUT(req: NextRequest) {
  const origin = req.headers.get('origin');
  try {
    const user = getAuthUser(req);
    if (!user) return unauthorizedResponse(origin);
    const body = await req.json();
    const { id, ...data } = body;
    await pool.query('UPDATE recognitions SET name = ?, entity = ?, date = ?, image_url = ? WHERE id = ?', [data.name, data.entity, data.date, data.image_url, id]);
    return successResponse({ message: 'Recognition updated' }, origin);
  } catch (error: any) {
    return errorResponse('Error updating recognition', 500, error.message, origin);
  }
}

export async function DELETE(req: NextRequest) {
  const origin = req.headers.get('origin');
  try {
    const user = getAuthUser(req);
    if (!user) return unauthorizedResponse(origin);
    const id = req.nextUrl.searchParams.get('id');
    if (!id) return errorResponse('ID required', 400, null, origin);
    await PortfolioService.deleteRecognition(parseInt(id));
    return successResponse({ message: 'Recognition deleted' }, origin);
  } catch (error: any) {
    return errorResponse('Error deleting recognition', 500, error.message, origin);
  }
}
