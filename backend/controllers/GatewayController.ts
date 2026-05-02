import { NextRequest } from 'next/server';
import pool from '@/lib/db';
import { ProfileModel } from '@/models/ProfileModel';
import { ExperienceModel } from '@/models/ExperienceModel';
import { ProjectModel } from '@/models/ProjectModel';
import { translate } from '@/lib/translator';
import { successResponse, errorResponse } from '@/constants/api-responses';
import { localizeObject } from '@/constants/languages';

export class GatewayController {
  static async getSummary(req: NextRequest) {
    const origin = req.headers.get('origin');
    try {
      const { searchParams } = new URL(req.url);
      const lang = searchParams.get('lang') || 'es';

      // Fetch all data in parallel using Models
      const [
        profileRaw,
        experienceRaw,
        projectRaw,
        [skillRows],
        [educationRows]
      ]: any = await Promise.all([
        ProfileModel.getById(1),
        ExperienceModel.getAll(),
        ProjectModel.getAll(),
        pool.query('SELECT * FROM skills ORDER BY name ASC'),
        pool.query('SELECT * FROM education ORDER BY created_at DESC')
      ]);

      // Process Profile
      let profile = profileRaw;
      if (profile) {
        profile = localizeObject(profile, ['title', 'bio'], lang);
        if (!profile.title && profile.title_es) profile.title = await translate(profile.title_es, lang);
        if (!profile.bio && profile.bio_es) profile.bio = await translate(profile.bio_es, lang);
      }

      // Process Experience
      const experience = await Promise.all(experienceRaw.map(async (row: any) => ({
        ...row,
        role: await translate(row.role, lang),
        description: await translate(row.description, lang),
        skills: await translate(row.skills, lang),
      })));

      // Process Projects
      const projects = await Promise.all(projectRaw.map(async (row: any) => ({
        ...row,
        title: await translate(row.title, lang),
        description: await translate(row.description, lang),
        tech_stack: await translate(row.tech_stack, lang),
      })));

      // Process Education
      const education = await Promise.all(educationRows.map(async (row: any) => ({
        ...row,
        degree: await translate(row.degree, lang),
        description: await translate(row.description, lang),
      })));

      return successResponse({
        profile,
        experience,
        projects,
        skills: skillRows,
        education
      }, origin);
    } catch (error: any) {
      console.error('Gateway Error:', error);
      return errorResponse('Error al obtener el resumen del portafolio', 500, error.message, origin);
    }
  }
}
