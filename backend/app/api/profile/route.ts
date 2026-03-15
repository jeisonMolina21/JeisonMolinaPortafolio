import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import { translate } from '@/lib/translator';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const lang = searchParams.get('lang') || 'es';
    const [rows]: any = await pool.query('SELECT * FROM profile_settings WHERE id = 1');
    const profile = rows[0];

    if (profile) {
        profile.title = await translate(profile.title, lang);
        profile.bio = await translate(profile.bio, lang);
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

    const data = await req.json();
    const { full_name, title, bio, location, whatsapp, email, linkedin, github, image_url } = data;

    await pool.query(
      'UPDATE profile_settings SET full_name = ?, title = ?, bio = ?, location = ?, whatsapp = ?, email = ?, linkedin = ?, github = ?, image_url = ? WHERE id = 1',
      [full_name, title, bio, location, whatsapp || null, email || null, linkedin || null, github || null, image_url || null]
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
