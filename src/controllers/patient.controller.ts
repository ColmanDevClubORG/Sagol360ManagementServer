import { Request, Response, NextFunction } from 'express';

export const getPatientBySerializeNumber = (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.status(200).json(res.locals.patient);
  } catch (error) {
    return next(error);
  }
};
