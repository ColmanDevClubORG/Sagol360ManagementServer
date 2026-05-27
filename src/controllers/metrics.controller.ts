import { Request, Response, NextFunction } from 'express';
import { metricsService } from '@/services/metrics.service';
import { StatusCodes } from 'http-status-codes';

export const SentToday = async (req: Request<{patientId: string}>, res: Response, next: NextFunction) => {
  try {
    const patientId = req.params.patientId;
    const sentToday = await metricsService.isSentToday(patientId);
    res.json(sentToday);
  } catch (error) {
    next(error);
  }
};

export const SubmitReport = async (req: Request<{patientId: string}>, res: Response, next: NextFunction) => {
  try {
    const patientId = req.params.patientId;
    const metrics = req.body;
    const submitReport = await metricsService.SubmitReport(patientId, metrics);
    res.status(StatusCodes.CREATED).json(submitReport);
  } catch (error) {
    next(error);
  }
};
