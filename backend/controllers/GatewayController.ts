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
    const { searchParams } = new URL(req.url);
    const lang = searchParams.get('lang') || 'es';

    try {
      // 1. Fetch raw data in parallel
      const [profileRaw, experienceRaw, projectRaw, [skillRows], [educationRows]]: any = await Promise.all([
        ProfileModel.getById(1),
        ExperienceModel.getAll(lang),
        ProjectModel.getAll(),
        pool.query('SELECT * FROM skills ORDER BY name ASC'),
        pool.query('SELECT * FROM education ORDER BY created_at DESC')
      ]);

      // 2. Process data in parallel
      const [profile, experience, projects, education] = await Promise.all([
        this.processProfile(profileRaw, lang),
        this.processExperience(experienceRaw, lang),
        this.processProjects(projectRaw, lang),
        this.processEducation(educationRows, lang)
      ]);

      return successResponse({
        profile,
        experience,
        projects,
        skills: skillRows,
        education
      }, origin);

    } catch (error: any) {
      console.error('🚀 [Gateway Error]:', error);
      return errorResponse('Error al sincronizar el portafolio', 500, error.message, origin);
    }
  }

  private static async processProfile(profile: any, lang: string) {
    if (!profile) return null;
    const localized = localizeObject(profile, ['title', 'bio', 'headline_metric'], lang);
    
    // Auto-translate if empty
    if (!localized.title && profile.title_es) localized.title = await translate(profile.title_es, lang);
    if (!localized.bio && profile.bio_es) localized.bio = await translate(profile.bio_es, lang);
    
    if (profile.metrics_json) {
      try {
        localized.metrics = JSON.parse(profile.metrics_json);
      } catch (e) {
        localized.metrics = [];
      }
    }
    return localized;
  }

  private static async processExperience(items: any[], lang: string) {
    return Promise.all(items.map(async (item) => ({
      ...item,
      role: lang === 'es' ? item.role : await translate(item.role, lang),
      description: lang === 'es' ? item.description : await translate(item.description, lang),
      skills: lang === 'es' ? item.skills : await translate(item.skills, lang)
    })));
  }

  private static async processProjects(items: any[], lang: string) {
    return Promise.all(items.map(async (item) => ({
      ...item,
      title: lang === 'es' ? item.title : await translate(item.title, lang),
      description: lang === 'es' ? item.description : await translate(item.description, lang),
      challenge: lang === 'es' ? (item.challenge || '') : await translate(item.challenge || '', lang),
      action: lang === 'es' ? (item.action || '') : await translate(item.action || '', lang),
      result: lang === 'es' ? (item.result || '') : await translate(item.result || '', lang),
      tech_stack: lang === 'es' ? item.tech_stack : await translate(item.tech_stack, lang)
    })));
  }

  private static async processEducation(items: any[], lang: string) {
    return Promise.all(items.map(async (item) => ({
      ...item,
      degree: lang === 'es' ? item.degree : await translate(item.degree, lang),
      description: lang === 'es' ? (item.description || '') : await translate(item.description || '', lang)
    })));
  }
}
