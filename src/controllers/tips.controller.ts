import { Request, Response, NextFunction } from 'express';
import { getTip as serviceGetTip } from '../services/tips.service';

export const getTip = (req: Request, res: Response, next: NextFunction) => {
  try {
    const totalTreatments = Number(req.query.totalProtocolTreatments);
    const currentTreatment = Number(req.query.currentTreatmentNumber);
    const tip = serviceGetTip(totalTreatments, currentTreatment);
    res.status(200).json({ tip });
  } catch {
    res.status(500).json({
      message: 'Something went wrong',
      tip: 'יש להקפיד על שתיית מים בכמות מספקת',
    });
  }
};
