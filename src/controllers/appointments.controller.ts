import { Request, Response, NextFunction } from 'express';
import {
  getAppointments,
  getNextAppointment as serviceGetNextAppointment,
} from '../services/appointments.service';
import { StatusCodes } from 'http-status-codes';

export const getAllAppointments = (req: Request, res: Response, _next: NextFunction) => {
  try {
    const { patientId } = req.query as { patientId: string };
    const result = getAppointments(patientId);
    res.status(StatusCodes.OK).json(result);
  } catch {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'something went wrong' });
  }
};

export const getNextAppointment = (req: Request, res: Response, _next: NextFunction) => {
  try {
    const { patientId, date } = req.query as { patientId: string; date: string };
    const result = serviceGetNextAppointment(patientId, date);
    res.status(StatusCodes.OK).json(result);
  } catch {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'something went wrong' });
  }
};
