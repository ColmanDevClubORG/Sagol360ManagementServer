import { createQrToken, findPatientByLogin, verifyQrToken } from '@/services/login.service';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import type { QRCreateBody, QRVerifyBody } from './login.controller.helpers';

export const QR_create = (req: Request<never, never, QRCreateBody>, res: Response) => {
  const { userId, password } = req.body;

  if (!userId || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: 'userId and password are required',
    });
  }

  const patient = findPatientByLogin(userId, password);

  if (!patient) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: 'Invalid userId or password',
    });
  }

  const token = createQrToken(patient.patientId, patient.password);

  return res.json({
    token,
  });
};

export const QR_verify = (req: Request<never, never, QRVerifyBody>, res: Response) => {
  const { token } = req.body;

  if (!token) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: 'Token is required',
    });
  }

  const payload = verifyQrToken(token);

  if (!payload) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: 'Invalid QR token',
    });
  }

  const patient = findPatientByLogin(payload.userId, payload.password);

  if (!patient) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: 'User not found',
    });
  }

  return res.json({
    message: 'QR login success',
    user: {
      userId: patient.patientId,
    },
  });
};
