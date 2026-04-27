import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { PATIENT_ERROR_MESSAGES } from '../../constants/patient/patient.constants';
import { patientService } from '../../services/patient.service';
import { parsePatientId } from './patient.controller.helpers';

type GetPatientByPatientIdParams = {
  patientId: string;
};

export const getPatientByPatientId = async (
  req: Request<GetPatientByPatientIdParams>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const patientId = parsePatientId(req.params.patientId);

    if (patientId === null) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: PATIENT_ERROR_MESSAGES.INVALID_PATIENT_ID,
      });
    }

    const patient = await patientService.getPatientByPatientId(patientId);

    return res.status(StatusCodes.OK).json(patient);
  } catch (error) {
    if (error instanceof Error && error.message === PATIENT_ERROR_MESSAGES.PATIENT_NOT_FOUND) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: PATIENT_ERROR_MESSAGES.PATIENT_NOT_FOUND,
      });
    }

    return next(error);
  }
};
