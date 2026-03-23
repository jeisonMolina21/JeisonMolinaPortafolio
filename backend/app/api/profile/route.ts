import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import { translate } from '@/lib/translator';

import { ProfileSchema } from '@/lib/schemas';
import { validateData } from '@/lib/validation';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const lang = searchParams.get('lang') || 'es';
    const [rows]: any = await pool.query('SELECT * FROM profile_settings WHERE id = 1');
    const profile = rows[0];

    if (profile) {
        profile.title = lang === 'en' ? (profile.title_en || profile.title_es) : (profile.title_es || profile.title_en);
        profile.bio = lang === 'en' ? (profile.bio_en || profile.bio_es) : (profile.bio_es || profile.bio_en);
        
        // Fallback to legacy columns if bilingual are empty
        if (!profile.title) profile.title = await translate(profile.title, lang);
        if (!profile.bio) profile.bio = await translate(profile.bio, lang);
    }

    return NextResponse.json(profile);
  } catch (error: any) {
    console.error('Profile fetch error:', error);
    return NextResponse.json({ error: 'Error fetching profile', details: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get('Authorization')?.split(' ')[1];
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { isValid, data, response } = await validateData(ProfileSchema, body);
    
    if (!isValid) return response;

    const { full_name, title_es, title_en, bio_es, bio_en, location, whatsapp, email, linkedin, github, image_url } = data;

    await pool.query(
      'UPDATE profile_settings SET full_name = ?, title_es = ?, title_en = ?, bio_es = ?, bio_en = ?, location = ?, whatsapp = ?, email = ?, linkedin = ?, github = ?, image_url = ? WHERE id = 1',
      [full_name, title_es || null, title_en || null, bio_es || null, bio_en || null, location, whatsapp || null, email || null, linkedin || null, github || null, image_url || null]
    );

    return NextResponse.json({ message: 'Profile updated successfully' });
  } catch (error: any) {
    console.error('Profile update error detail:', {
        message: error.message,
        stack: error.stack
    });
    return NextResponse.json({ 
        error: 'Error updating profile', 
        details: error.message 
    }, { status: 500 });
  }
}
