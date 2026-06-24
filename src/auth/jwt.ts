import jwt from 'jsonwebtoken'

if (!process.env.JWT_SECRET){
    throw new Error("JWT_SECRET is not set");
}

export interface JwtPayload{
    userId: string
}

export const JWT_SECRET = process.env.JWT_SECRET;

const TOKEN_TTL = '2h'

export function issueToken(userId: string){
    return jwt.sign({userId: userId}, JWT_SECRET, {expiresIn: TOKEN_TTL})
}

export function verifyToken(token: string){
    return jwt.verify(token, JWT_SECRET) as JwtPayload
}