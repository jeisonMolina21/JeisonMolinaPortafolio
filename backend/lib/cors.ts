import { NextResponse } from 'next/server';

const FRONTEND_URL = process.env.FRONTEND_URL || 'https://jeison-molina-portafolio.vercel.app';

const allowedOrigins = [
  FRONTEND_URL,
  'http://localhost:4321',
  'http://localhost:3000',
];

export function corsHeaders(origin?: string | null): Record<string, string> {
  const isVercel = origin && origin.endsWith('.vercel.app');
  const allowed = (origin && allowedOrigins.includes(origin)) || isVercel ? origin : allowedOrigins[0];
  
  return {
    'Access-Control-Allow-Origin': allowed || '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
  };
}

export function withCors(response: NextResponse, origin?: string | null): NextResponse {
  const headers = corsHeaders(origin);
  Object.entries(headers).forEach(([k, v]) => response.headers.set(k, v));
  return response;
}

export function optionsResponse(origin?: string | null): NextResponse {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders(origin),
  });
}
