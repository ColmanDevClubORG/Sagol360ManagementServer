import { Request, Response, NextFunction } from 'express';
import { getExampleMessage } from '../services/example.service';

export const getExample = (req: Request, res: Response, next: NextFunction) => {
  try {
    const message = getExampleMessage();
    res.send(message);
  } catch (error) {
    next(error);
  }
};
