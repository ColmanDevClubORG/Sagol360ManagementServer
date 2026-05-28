import { createHash } from 'node:crypto';

const TOKEN_PREFIX = 'mock';
const SIGNATURE_LENGTH = 16;

export interface QrTokenPayload {
  userId: string;
  password: string;
}

const getKey = (): string => {
  const secret = process.env.QR_SECRET;

  if (!secret) {
    throw new Error('QR_SECRET environment variable is required');
  }

  return secret;
};

const isQrTokenPayload = (payload: unknown): payload is QrTokenPayload => {
  if (!payload || typeof payload !== 'object') {
    return false;
  }

  const candidate = payload as Partial<QrTokenPayload>;

  return typeof candidate.userId === 'string' && typeof candidate.password === 'string';
};

const signPayload = (encodedPayload: string): string => {
  return createHash('sha256')
    .update(`${encodedPayload}.${getKey()}`)
    .digest('base64url')
    .slice(0, SIGNATURE_LENGTH);
};

const parsePayload = (encodedPayload: string): QrTokenPayload | null => {
  const payload: unknown = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString('utf8'));

  return isQrTokenPayload(payload) ? payload : null;
};

export const createQrToken = (userId: string, password: string): string => {
  const encodedPayload = Buffer.from(JSON.stringify({ userId, password }), 'utf8').toString(
    'base64url',
  );
  const signature = signPayload(encodedPayload);

  return [TOKEN_PREFIX, encodedPayload, signature].join('.');
};

export const verifyQrToken = (token: string): QrTokenPayload | null => {
  try {
    const [prefix, encodedPayload, signature, extraPart] = token.split('.');
    const hasExtraPart = extraPart !== undefined;
    const hasRequiredParts =
      prefix === TOKEN_PREFIX && Boolean(encodedPayload) && Boolean(signature) && !hasExtraPart;
    const hasValidSignature = hasRequiredParts && signPayload(encodedPayload) === signature;

    if (!hasRequiredParts || !hasValidSignature) {
      return null;
    }

    return parsePayload(encodedPayload);
  } catch {
    return null;
  }
};
