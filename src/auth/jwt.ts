import jwt from 'jsonwebtoken';

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is not set');
}

export type TokenType = 'session' | 'qr-signature';

export interface JwtPayload {
  userId: string;
  type: TokenType;
}

export const JWT_SECRET = process.env.JWT_SECRET;

const TOKEN_TTL = '2h';

export const signToken = (userId: string, type: TokenType = 'session') => {
  return jwt.sign({ userId: userId, type }, JWT_SECRET, { expiresIn: TOKEN_TTL });
};

export const verifyToken = (token: string, expectedType: TokenType = 'session') => {
  const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;

  if (payload.type !== expectedType) {
    throw new Error('Unexpected token type');
  }

  return payload;
};
