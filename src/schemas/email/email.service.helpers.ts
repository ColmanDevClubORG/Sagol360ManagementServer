import { buildAttendanceEmailContent, EmailContent } from '@/services/email/email.service.helpers';
import { SendEmailData } from './attendance-email.schema';
import { EMAIL_ERRORS, EMAIL_TYPE } from '@/constants/email/email.constants';

export const buildEmailContent = (data: SendEmailData): EmailContent => {
  switch (data.emailType) {
    case EMAIL_TYPE.ATTENDANCE_UPDATE:
      return buildAttendanceEmailContent(data.payload);

    default:
      throw new Error(EMAIL_ERRORS.unsupportedEmailType);
  }
};
