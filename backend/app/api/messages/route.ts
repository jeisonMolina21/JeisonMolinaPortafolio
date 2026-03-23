import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { getAuthUser, unauthorizedResponse } from '@/lib/auth';

import { MessageSchema } from '@/lib/schemas';
import { validateData } from '@/lib/validation';

/**
 * GET: Fetch all messages (Protected)
 */
export async function GET(req: NextRequest) {
  const user = getAuthUser(req);
  if (!user) return unauthorizedResponse();

  try {
    const [rows] = await pool.query('SELECT * FROM messages ORDER BY created_at DESC');
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json({ error: 'Error al obtener mensajes' }, { status: 500 });
  }
}

/**
 * POST: Save a new message (Public)
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { isValid, data, response } = await validateData(MessageSchema, body);
    
    if (!isValid) return response;

    const { name, phone, whatsapp, city, message } = data;

    await pool.query(
      'INSERT INTO messages (name, phone, whatsapp, city, message) VALUES (?, ?, ?, ?, ?)',
      [name, phone, whatsapp, city, message]
    );

    return NextResponse.json({ message: 'Mensaje enviado con éxito' }, { status: 201 });
  } catch (error) {
    console.error('Error saving message:', error);
    return NextResponse.json({ error: 'Error al enviar mensaje' }, { status: 500 });
  }
}

/**
 * DELETE: Remove a message (Protected)
 */
export async function DELETE(req: NextRequest) {
    const user = getAuthUser(req);
    if (!user) return unauthorizedResponse();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ error: 'ID requerido' }, { status: 400 });

    try {
        await pool.query('DELETE FROM messages WHERE id = ?', [id]);
        return NextResponse.json({ message: 'Mensaje eliminado' });
    } catch (error) {
        return NextResponse.json({ error: 'Error al eliminar mensaje' }, { status: 500 });
    }
}
