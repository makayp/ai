import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { checkRateLimit } from '@/lib/rate-limiter';

export async function middleware(req: NextRequest) {
  const identifier = 'api';
  const ip = req.headers.get('x-forwarded-for') || identifier;

  const { minuteRes, dailyRes, error } = await checkRateLimit({ userId: ip });

  if (error) {
    console.error('Rate limiting error:', error);

    return NextResponse.json(
      { message: 'Something went wrong. Please try again later.' },
      { status: 500 }
    );
  }

  if (dailyRes && !dailyRes.success) {
    return NextResponse.json(
      {
        message: 'Daily request limit reached. Try again tomorrow.',
        rateLimit: { type: 'request-per-day', reset: dailyRes.reset },
      },

      {
        status: 429,
      }
    );
  }

  if (minuteRes && !minuteRes.success) {
    return NextResponse.json(
      {
        message: 'Too many requests per minute. Try again later.',
        rateLimit: { type: 'request-per-minute', reset: minuteRes.reset },
      },
      {
        status: 429,
      }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};
