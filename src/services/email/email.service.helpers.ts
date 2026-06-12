import {
  ATTENDANCE_STATUS,
  EMAIL_COLORS,
  EMAIL_SUBJECTS,
  EMAIL_TEXT,
} from '@/constants/email/email.constants';

export interface AttendanceEmailPayload {
  patientName: string;
  patientNumber: string;
  attendanceStatus: 'COMING' | 'NOT_COMING';
  time: string;
  cell: string;
  building: string;
}

export interface EmailContent {
  subject: string;
  text: string;
  html: string;
}

const escapeHtml = (value: string): string => {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

const getAttendanceSubject = (attendanceStatus: string): string => {
  return attendanceStatus === ATTENDANCE_STATUS.COMING
    ? EMAIL_SUBJECTS.ATTENDANCE_COMING
    : EMAIL_SUBJECTS.ATTENDANCE_NOT_COMING;
};

const getAttendanceText = (attendanceStatus: string): string => {
  return attendanceStatus === ATTENDANCE_STATUS.COMING
    ? EMAIL_TEXT.willCome
    : EMAIL_TEXT.willNotCome;
};

const buildAttendanceTextMessage = ({
  patientName,
  patientNumber,
  attendanceStatus,
  time,
  cell,
  building,
}: AttendanceEmailPayload): string => {
  const baseMessage = `${EMAIL_TEXT.dearCaregiver}, ${patientName} ${EMAIL_TEXT.patientNumber} ${patientNumber} ${getAttendanceText(attendanceStatus)} ${EMAIL_TEXT.treatmentTime} ${time}, ${EMAIL_TEXT.cell} ${cell}, ${EMAIL_TEXT.building} ${building}.`;

  if (attendanceStatus === ATTENDANCE_STATUS.NOT_COMING) {
    return `${baseMessage} ${EMAIL_TEXT.rescheduleMessage}`;
  }
  return baseMessage;
};

const buildTableRow = (label: string, value: string): string => {
  return `
    <tr>
      <td style="padding: 10px; background-color: ${EMAIL_COLORS.tableLabelBackground}; font-weight: bold; width: 35%;">
        ${escapeHtml(label)}
      </td>
      <td style="padding: 10px;">
        ${escapeHtml(value)}
      </td>
    </tr>
  `;
};

export const buildAttendanceEmailContent = (payload: AttendanceEmailPayload): EmailContent => {
  const isComing = payload.attendanceStatus === ATTENDANCE_STATUS.COMING;
  const subject = getAttendanceSubject(payload.attendanceStatus);
  const text = buildAttendanceTextMessage(payload);

  const attendanceStatusText = isComing
    ? EMAIL_TEXT.comingStatusLabel
    : EMAIL_TEXT.notComingStatusLabel;

  const html = `
    <div dir="rtl" style="font-family: Arial, sans-serif; background-color: ${EMAIL_COLORS.background}; padding: 24px;">
      <div style="max-width: 620px; margin: 0 auto; background-color: ${EMAIL_COLORS.cardBackground}; border-radius: 12px; border: 1px solid ${EMAIL_COLORS.border}; overflow: hidden;">
        <div style="background-color: ${isComing ? EMAIL_COLORS.comingHeader : EMAIL_COLORS.notComingHeader}; color: #ffffff; padding: 20px;">
          <h2 style="margin: 0; font-size: 22px;">
            ${escapeHtml(subject)}
          </h2>
        </div>

        <div style="padding: 24px; color: ${EMAIL_COLORS.text};">
          <p style="font-size: 16px; line-height: 1.7; margin: 0 0 24px;">
            ${escapeHtml(text)}
          </p>

          <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
            ${buildTableRow(EMAIL_TEXT.patientNameLabel, payload.patientName)}
            ${buildTableRow(EMAIL_TEXT.patientNumberLabel, payload.patientNumber)}
            ${buildTableRow(EMAIL_TEXT.attendanceStatusLabel, attendanceStatusText)}
            ${buildTableRow(EMAIL_TEXT.timeLabel, payload.time)}
            ${buildTableRow(EMAIL_TEXT.cellLabel, payload.cell)}
            ${buildTableRow(EMAIL_TEXT.buildingLabel, payload.building)}
          </table>

          <p style="margin-top: 24px; font-size: 13px; color: ${EMAIL_COLORS.mutedText};">
            ${escapeHtml(EMAIL_TEXT.automaticMessage)}
          </p>
        </div>
      </div>
    </div>
  `;

  return {
    subject,
    text,
    html,
  };
};
