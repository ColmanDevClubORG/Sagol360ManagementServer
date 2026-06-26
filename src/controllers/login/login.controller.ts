import { findPatientByCredentials } from '@/services/login.service';
import { createQrToken, verifyQrToken } from '@/services/qr-token.service';
import { signToken } from '@/auth/jwt';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { PATIENT_ERROR_MESSAGES } from '@/constants/patient/patient.constants';
import { LOGIN_MESSAGES } from '@/constants/login/login.constants';
interface QRCreateBody {
  userId?: string;
  password?: string;
}

interface QRVerifyBody {
  token?: string;
}
export const createQR = (req: Request<never, never, QRCreateBody>, res: Response) => {
  const { userId, password } = req.body;

  if (!userId || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: PATIENT_ERROR_MESSAGES.PATIENT_ID_AND_PASSWORD_REQUIRED,
    });
  }

  const patient = findPatientByCredentials(userId, password);

  if (!patient) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: PATIENT_ERROR_MESSAGES.INVALID_PATIENT_ID_AND_PASSWORD,
    });
  }

  const token = createQrToken(patient.patientId, patient.password);

  return res.json({
    token,
  });
};

export const verifyQR = (req: Request<never, never, QRVerifyBody>, res: Response) => {
  const { token } = req.body;

  if (!token) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: LOGIN_MESSAGES.REQUIRED_TOKEN,
    });
  }

  const payload = verifyQrToken(token);

  if (!payload) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: LOGIN_MESSAGES.INVALID_QR_TOKEN,
    });
  }

  const patient = findPatientByCredentials(payload.userId, payload.password);

  if (!patient) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: PATIENT_ERROR_MESSAGES.PATIENTS_NOT_FOUND,
    });
  }

  const sessionToken = signToken(patient.patientId);

  return res.json({
    message: LOGIN_MESSAGES.QR_LOGIN_SUCCESS,
    token: sessionToken,
    user: {
      userId: patient.patientId,
    },
  });
};
