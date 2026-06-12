import { ATTENDANCE_STATUS, EMAIL_TYPE } from '@/constants/email/email.constants';
import { sendEmailSchema } from '@/services/email/email.service';
import { z } from 'zod';

export const attendanceEmailSchema = z.object({
  emailType: z.literal(EMAIL_TYPE.ATTENDANCE_UPDATE),
  email: z.string().trim().pipe(z.email()),
  payload: z.object({
    patientName: z.string().trim().min(1),
    patientNumber: z.string().trim().min(1),
    attendanceStatus: z.enum([ATTENDANCE_STATUS.COMING, ATTENDANCE_STATUS.NOT_COMING]),
    time: z.string().trim().min(1),
    cell: z.string().trim().min(1),
    building: z.string().trim().min(1),
  }),
});

export type SendEmailData = z.infer<typeof sendEmailSchema>;
