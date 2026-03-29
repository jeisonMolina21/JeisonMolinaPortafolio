import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { translate } from '@/lib/translator';
import { withCors, optionsResponse } from '@/lib/cors';

export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get('origin');
  return optionsResponse(origin);
}

export async function GET(req: NextRequest) {
  const origin = req.headers.get('origin');
  try {
    const { searchParams } = new URL(req.url);
    const lang = searchParams.get('lang') || 'es';

    // Fetch all data in parallel
    const [
      [profileRows],
      [experienceRows],
      [projectRows],
      [skillRows],
      [educationRows]
    ]: any = await Promise.all([
      pool.query('SELECT * FROM profile_settings WHERE id = 1'),
      pool.query('SELECT * FROM experience ORDER BY created_at DESC'),
      pool.query('SELECT * FROM projects ORDER BY created_at DESC'),
      pool.query('SELECT * FROM skills ORDER BY name ASC'),
      pool.query('SELECT * FROM education ORDER BY created_at DESC')
    ]);

    // Process Profile
    const profile = profileRows[0];
    if (profile) {
      profile.title = await translate(profile.title_es || profile.title, lang);
      profile.bio = await translate(profile.bio_es || profile.bio, lang);
    }

    // Process Experience
    const experience = await Promise.all(experienceRows.map(async (row: any) => ({
      ...row,
      role: await translate(row.role, lang),
      description: await translate(row.description, lang),
      skills: await translate(row.skills, lang),
    })));

    // Process Projects
    const projects = await Promise.all(projectRows.map(async (row: any) => ({
      ...row,
      title: await translate(row.title, lang),
      description: await translate(row.description, lang),
      tech_stack: await translate(row.tech_stack, lang),
    })));

    // Process Skills (No translation needed usually)
    const skills = skillRows;

    // Process Education
    const education = await Promise.all(educationRows.map(async (row: any) => ({
      ...row,
      degree: await translate(row.degree, lang),
      description: await translate(row.description, lang),
    })));

    return withCors(NextResponse.json({
      profile,
      experience,
      projects,
      skills,
      education
    }), origin);
  } catch (error: any) {
    console.error('Summary fetch error:', error);
    return withCors(NextResponse.json({ 
      error: 'Error fetching portfolio data', 
      details: error.message 
    }, { status: 500 }), origin);
  }
}
