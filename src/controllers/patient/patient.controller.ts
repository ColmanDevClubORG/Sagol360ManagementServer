import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { PATIENT_ERROR_MESSAGES } from '../../constants/patient/patient.constants';
import { patientService } from '../../services/patient.service';
import { parsePatientSerializeNumber } from './patient.controller.helpers';

export const getPatientBySerializeNumber = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const serializeNumber = parsePatientSerializeNumber(req.params.serializeNumber);

    if (serializeNumber === null) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: PATIENT_ERROR_MESSAGES.INVALID_SERIALIZE_NUMBER,
      });
    }

    const patient = await patientService.getPatientBySerializeNumber(serializeNumber);

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
