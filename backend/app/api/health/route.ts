import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    await pool.query('SELECT 1');
    return NextResponse.json({
      status: 'healthy',
      database: 'connected',
      message: 'Portfolio API is running',
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 'unhealthy',
      database: 'disconnected',
      error: error.message,
      message: 'Portfolio API is running but database is not reachable',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
