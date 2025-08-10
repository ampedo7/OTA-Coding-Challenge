import jwt from 'jsonwebtoken';
import { JwtPayload, VerifyResult } from '../types/jwtPayload';

export function setSlug(value: string) {
  const suffix = '-';
  return value.toLowerCase().trim().replace(/\s+/g, suffix);
}

export function generateJwtToken(payload: JwtPayload): string {
  const JWT_SECRET = process.env.JWT_SECRET || 'secretlang'; // store secret securely!
  const JWT_EXPIRES_IN = '1h'; // token expires in 1 day (can be '60m', '2h', etc.)

  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN
  });

  return token;
}

export function verifyJwtToken(token: string): VerifyResult {
  const secretKey = process.env.JWT_SECRET || 'secretlang';
  try {
    const decoded = jwt.verify(token, secretKey) as JwtPayload;
    return {
      valid: true,
      expired: false,
      decoded
    };
  } catch (err: any) {
    if (err.name === 'TokenExpiredError') {
      return {
        valid: false,
        expired: true,
        error: 'Token expired'
      };
    }
    return {
      valid: false,
      expired: false,
      error: err.message || 'Invalid token'
    };
  }
}
