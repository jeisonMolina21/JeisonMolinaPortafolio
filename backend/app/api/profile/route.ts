import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import { translate } from '@/lib/translator';
import { ProfileSchema } from '@/lib/schemas';
import { validateData } from '@/lib/validation';
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
    const [rows]: any = await pool.query('SELECT * FROM profile_settings WHERE id = 1');
    const profile = rows[0];

    if (profile) {
      profile.title = lang === 'en'
        ? (profile.title_en || profile.title_es || null)
        : (profile.title_es || profile.title_en || null);
      profile.bio = lang === 'en'
        ? (profile.bio_en || profile.bio_es || null)
        : (profile.bio_es || profile.bio_en || null);

      // Only call translate if there's an actual value and it might need translating
      if (!profile.title && profile.title_es) profile.title = await translate(profile.title_es, lang);
      if (!profile.bio && profile.bio_es) profile.bio = await translate(profile.bio_es, lang);
    }

    return withCors(NextResponse.json(profile), origin);
  } catch (error: any) {
    console.error('Profile fetch error:', error);
    return withCors(NextResponse.json({ error: 'Error fetching profile', details: error.message }, { status: 500 }), origin);
  }
}

export async function POST(req: NextRequest) {
  const origin = req.headers.get('origin');
  try {
    const token = req.headers.get('Authorization')?.split(' ')[1];
    if (!token || !verifyToken(token)) {
      return withCors(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }), origin);
    }

    const body = await req.json();
    const { isValid, data, response } = await validateData(ProfileSchema, body);
    if (!isValid) return withCors(response!, origin);

    const { full_name, title_es, title_en, bio_es, bio_en, location, whatsapp, email, linkedin, github, image_url } = data!;

    await pool.query(
      'UPDATE profile_settings SET full_name = ?, title_es = ?, title_en = ?, bio_es = ?, bio_en = ?, location = ?, whatsapp = ?, email = ?, linkedin = ?, github = ?, image_url = ? WHERE id = 1',
      [full_name, title_es ?? null, title_en ?? null, bio_es ?? null, bio_en ?? null, location ?? null, whatsapp ?? null, email ?? null, linkedin ?? null, github ?? null, image_url ?? null]
    );

    return withCors(NextResponse.json({ message: 'Profile updated successfully' }), origin);
  } catch (error: any) {
    console.error('Profile update error:', error.message);
    return withCors(NextResponse.json({ error: 'Error updating profile', details: error.message }, { status: 500 }), origin);
  }
}
