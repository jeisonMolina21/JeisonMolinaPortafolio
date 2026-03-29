import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import bcrypt from 'bcryptjs';
import { signToken } from '@/lib/auth';
import { LoginSchema } from '@/lib/schemas';
import { validateData } from '@/lib/validation';
import { withCors, optionsResponse } from '@/lib/cors';

export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get('origin');
  return optionsResponse(origin);
}

export async function POST(req: NextRequest) {
  const origin = req.headers.get('origin');
  try {
    const body = await req.json();
    const { isValid, data, response } = await validateData(LoginSchema, body);
    if (!isValid) return withCors(response!, origin);

    const { username, password } = data!;

    const [rows]: any = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    const user = rows[0];

    // Use same error message for both "user not found" and "bad password" to prevent user enumeration
    if (!user) {
      return withCors(NextResponse.json({ error: 'Credenciales inválidas' }, { status: 401 }), origin);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return withCors(NextResponse.json({ error: 'Credenciales inválidas' }, { status: 401 }), origin);
    }

    const token = signToken({ userId: user.id, username: user.username });

    return withCors(NextResponse.json({
      message: 'Login exitoso',
      token,
      user: { id: user.id, username: user.username },
    }), origin);

  } catch (error: any) {
    console.error('Login error:', error);
    return withCors(NextResponse.json({ error: 'Error del servidor' }, { status: 500 }), origin);
  }
}
