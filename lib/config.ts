export const RATE_LIMITS = {
  REQUESTS_PER_MINUTE: Number(process.env.REQUESTS_PER_MINUTE) || 5,
  REQUESTS_PER_DAY: Number(process.env.REQUESTS_PER_DAY) || 200,
};
