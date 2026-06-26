import { signToken, verifyToken } from '@/auth/jwt';
const TOKEN_PREFIX = 'mock';

export interface QrTokenPayload {
  userId: string;
  password: string;
}

const isQrTokenPayload = (payload: unknown): payload is QrTokenPayload => {
  if (!payload || typeof payload !== 'object') {
    return false;
  }

  const candidate = payload as Partial<QrTokenPayload>;

  return typeof candidate.userId === 'string' && typeof candidate.password === 'string';
};

const signPayload = (encodedPayload: string): string => {
  return signToken(encodedPayload, 'qr-signature');
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

  return [TOKEN_PREFIX, encodedPayload, signature].join(':');
};

export const verifyQrToken = (token: string): QrTokenPayload | null => {
  try {
    const [prefix, encodedPayload, signature, extraPart] = token.split(':');
    const hasExtraPart = extraPart !== undefined;
    const hasRequiredParts =
      prefix === TOKEN_PREFIX && Boolean(encodedPayload) && Boolean(signature) && !hasExtraPart;
    if (!hasRequiredParts) {
      return null;
    }

    const hasValidSignature = verifyToken(signature, 'qr-signature').userId === encodedPayload;

    if (!hasValidSignature) {
      return null;
    }

    return parsePayload(encodedPayload);
  } catch (error) {
    console.error('Failed to verify QR token:', error);
    return null;
  }
};
