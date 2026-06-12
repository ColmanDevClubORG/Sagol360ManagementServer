import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { sendEmail as serviceSendEmail } from '@/services/email/email.service';
import { EMAIL_ERRORS, EMAIL_SUCCESS_MESSAGES } from '@/constants/email/email.constants';

export const sendEmail = async (req: Request, res: Response) => {
  try {
    await serviceSendEmail(req.body);

    res.status(StatusCodes.OK).json({
      message: EMAIL_SUCCESS_MESSAGES.emailSentSuccessfully,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : EMAIL_ERRORS.emailWasNotSent;

    const statusCode =
      errorMessage === EMAIL_ERRORS.invalidEmailData ||
      errorMessage === EMAIL_ERRORS.unsupportedEmailType
        ? StatusCodes.BAD_REQUEST
        : StatusCodes.INTERNAL_SERVER_ERROR;

    res.status(statusCode).json({
      message: errorMessage,
    });
  }
};
