import nodemailer from 'nodemailer';
import { z } from 'zod';
import { ATTENDANCE_STATUS, EMAIL_ERRORS, EMAIL_TYPE } from '@/constants/email/email.constants';
import { buildAttendanceEmailContent, EmailContent } from './email.service.helpers';

const attendanceEmailSchema = z.object({
  emailType: z.literal(EMAIL_TYPE.ATTENDANCE_UPDATE),
  email: z.string().trim().email(),
  payload: z.object({
    patientName: z.string().trim().min(1),
    patientNumber: z.string().trim().min(1),
    attendanceStatus: z.enum([ATTENDANCE_STATUS.COMING, ATTENDANCE_STATUS.NOT_COMING]),
    time: z.string().trim().min(1),
    cell: z.string().trim().min(1),
    building: z.string().trim().min(1),
  }),
});

const sendEmailSchema = z.discriminatedUnion('emailType', [attendanceEmailSchema]);

type SendEmailData = z.infer<typeof sendEmailSchema>;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const buildEmailContent = (data: SendEmailData): EmailContent => {
  switch (data.emailType) {
    case EMAIL_TYPE.ATTENDANCE_UPDATE:
      return buildAttendanceEmailContent(data.payload);

    default:
      throw new Error(EMAIL_ERRORS.unsupportedEmailType);
  }
};

export const sendEmail = async (data: unknown): Promise<void> => {
  const validation = sendEmailSchema.safeParse(data);

  if (!validation.success) {
    throw new Error(EMAIL_ERRORS.invalidEmailData);
  }

  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
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
  } catch {
    throw new Error(EMAIL_ERRORS.emailWasNotSent);
  }
};
