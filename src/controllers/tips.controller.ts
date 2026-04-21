import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { getTip as serviceGetTip } from '@/services/tips.service';

export const getTip = (
  { query: { totalProtocolTreatments, currentTreatmentNumber } }: Request,
  res: Response,
  _next: NextFunction,
) => {
  try {
    const totalTreatments = Number(totalProtocolTreatments);
    const currentTreatment = Number(currentTreatmentNumber);
    const tip = serviceGetTip(totalTreatments, currentTreatment);
    res.status(StatusCodes.OK).json({ tip });
  } catch {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Something went wrong',
      tip: 'יש להקפיד על שתיית מים בכמות מספקת',
    });
  }
};
