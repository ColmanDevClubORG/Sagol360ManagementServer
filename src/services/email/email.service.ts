import nodemailer from 'nodemailer';
import { z } from 'zod';
import { EMAIL_ERRORS } from '@/constants/email/email.constants';
import { attendanceEmailSchema } from '@/schemas/email/attendance-email.schema';
import { buildEmailContent } from '@/schemas/email/email.service.helpers';

export const sendEmailSchema = z.discriminatedUnion('emailType', [attendanceEmailSchema]);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendEmail = async (data: unknown): Promise<void> => {
  const validation = sendEmailSchema.safeParse(data);

  if (!validation.success) {
    console.error(EMAIL_ERRORS.invalidEmailData, validation.error);
    throw new Error(EMAIL_ERRORS.invalidEmailData);
  }

  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.error(EMAIL_ERRORS.missingEmailEnvironmentVariables, {
      hasSmtpUser: Boolean(process.env.SMTP_USER),
      hasSmtpPass: Boolean(process.env.SMTP_PASS),
    });

    throw new Error(EMAIL_ERRORS.missingEmailEnvironmentVariables);
  }
  const emailData = validation.data;
  const { subject, text, html } = buildEmailContent(emailData);

  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: emailData.email,
      subject: subject,
      text: text,
      html: html,
    });
  } catch (error) {
    console.error(EMAIL_ERRORS.emailWasNotSent, error);
    throw new Error(EMAIL_ERRORS.emailWasNotSent, {
      cause: error,
    });
  }
};
