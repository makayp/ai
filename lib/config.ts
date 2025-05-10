export const RATE_LIMITS = {
  REQUESTS_PER_MINUTE: Number(process.env.REQUESTS_PER_MINUTE) || 5,
  REQUESTS_PER_DAY: Number(process.env.REQUESTS_PER_DAY) || 200,
};

export const MAX_ATTACHMENTS = 2;
export const MAX_ATTACHMENT_SIZE = 10 * 1024 * 1024; // 10MB
export const ALLOWED_ATTACHMENT_TYPES = [
  'image/jpg',
  'image/jpeg',
  'image/png',
  'image/webp',
];
