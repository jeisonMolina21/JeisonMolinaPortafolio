import { NextRequest } from 'next/server';
import { ExperienceController } from '@/controllers/ExperienceController';
import { optionsResponse } from '@/lib/cors';

export async function OPTIONS(req: NextRequest) {
  return optionsResponse(req.headers.get('origin'));
}

export async function GET(req: NextRequest) {
  return ExperienceController.getExperiences(req);
}

export async function POST(req: NextRequest) {
  return ExperienceController.createExperience(req);
}


