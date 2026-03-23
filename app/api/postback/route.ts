import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

// Set POSTBACK_SECRET in .env.local — 1win postback URL must include ?secret=YOUR_VALUE
const SECRET = process.env.POSTBACK_SECRET ?? 'mines2026';

const redis = Redis.fromEnv();

function extractId(params: URLSearchParams): string | null {
  const raw =
    params.get('user_id') ??
    params.get('id') ??
    params.get('player_id') ??
    params.get('uid') ??
    params.get('source_id') ??
    null;
  if (!raw) return null;
  const clean = raw.trim().replace(/\D/g, '');
  return clean || null;
}

async function handle(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const secret = searchParams.get('secret');
  if (secret !== SECRET) {
    return new NextResponse('Forbidden', { status: 403 });
  }

  const playerId = extractId(searchParams);
  if (!playerId) {
    return new NextResponse('Missing user_id', { status: 400 });
  }

  const eventType = searchParams.get('type') ?? searchParams.get('event_type') ?? 'unknown';

  await redis.sadd('valid_ids', playerId);

  console.log(`[postback] +ID ${playerId} type=${eventType}`);

  return new NextResponse('OK', { status: 200 });
}

export const GET = handle;
export const POST = handle;
