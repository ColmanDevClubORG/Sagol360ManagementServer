import type { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { verifyToken } from './jwt';
import { patientModel } from '../models/patientModel.mongoose';
import { dbService } from '../services/db.service';
import { AUTH_ERROR_MESSAGES, BEARER_PREFIX } from '../constants/auth.constants';

interface AuthRequest extends Request {
  userId?: string;
}

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  if (!header?.startsWith(BEARER_PREFIX)) {
    res.status(StatusCodes.UNAUTHORIZED).json({ error: AUTH_ERROR_MESSAGES.MISSING_TOKEN });
    return;
  }
  try {
    const { userId } = verifyToken(header.slice(BEARER_PREFIX.length));
    const [patient] = await dbService.get(patientModel, { patientId: userId });

    if (!patient) {
      res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: AUTH_ERROR_MESSAGES.INVALID_OR_EXPIRED_TOKEN });
      return;
    }

    req.userId = userId;
    next();
  } catch {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: AUTH_ERROR_MESSAGES.INVALID_OR_EXPIRED_TOKEN });
  }
};
