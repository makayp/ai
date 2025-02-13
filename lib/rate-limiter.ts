import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { RATE_LIMITS } from './config';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const minuteLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(RATE_LIMITS.REQUESTS_PER_MINUTE, '1m'),
  prefix: '@AIPro/ratelimit:minute',
});

const dailyLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(RATE_LIMITS.REQUESTS_PER_DAY, '1d'),
  prefix: '@AIPro/ratelimit:daily',
});

export async function checkRateLimit({ userId }: { userId: string }) {
  try {
    if (
      !process.env.UPSTASH_REDIS_REST_URL ||
      !process.env.UPSTASH_REDIS_REST_TOKEN
    ) {
      throw new Error('Missing Upstash Redis URL or token');
    }

    const [minuteRes, dailyRes] = await Promise.all([
      minuteLimiter.limit(userId),
      dailyLimiter.limit(userId),
    ]);

    return { minuteRes, dailyRes, error: null };
  } catch (error) {
    return { minuteRes: null, dailyRes: null, error };
  }
}
