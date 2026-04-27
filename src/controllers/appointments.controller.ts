import { Request, Response } from 'express';
import { appointmentsService } from '../services/appointments.service';
import { StatusCodes } from 'http-status-codes';
import { INTERNAL_SERVER_ERROR_MESSAGE } from '../constants/error.constants';

export const getAllAppointments = (
  req: Request<never, never, never, { patientId: string }>,
  res: Response,
) => {
  try {
    const { patientId } = req.query;
    const result = appointmentsService.getAppointmentsByPatientId(patientId);
    res.status(StatusCodes.OK).json(result);
  } catch {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: INTERNAL_SERVER_ERROR_MESSAGE });
  }
};

export const getNextAppointment = (
  req: Request<never, never, never, { patientId: string; date: string }>,
  res: Response,
) => {
  try {
    const { patientId, date } = req.query;
    const result = appointmentsService.getNextAppointment(patientId, date);
    res.status(StatusCodes.OK).json(result);
  } catch {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: INTERNAL_SERVER_ERROR_MESSAGE });
  }
};
