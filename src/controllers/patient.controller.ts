import { Request, Response, NextFunction } from 'express';
import { getPatientBySerializeNumber as findPatientBySerializeNumber } from '../services/patient.service';

const parseSerializeNumber = (value: string | string[] | undefined): number | null => {
  const serializeNumber = Array.isArray(value) ? value[0] : value;

  if (!serializeNumber || !/^\d+$/.test(serializeNumber)) {
    return null;
  }

  return Number(serializeNumber);
};

export const getPatientBySerializeNumber = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const serializeNumber = parseSerializeNumber(req.params.serializeNumber);

    if (serializeNumber === null) {
      return res.status(400).json({
        message: 'serializeNumber must be a string containing only digits',
      });
    }

    const patient = await findPatientBySerializeNumber(serializeNumber);

    if (!patient) {
      return res.status(404).json({
        message: 'Patient not found',
      });
    }

    return res.status(200).json(patient);
  } catch (error) {
    return next(error);
  }
};
