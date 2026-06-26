export const EMAIL_TYPE = {
  ATTENDANCE_UPDATE: 'ATTENDANCE_UPDATE',
} as const;

export const ATTENDANCE_STATUS = {
  COMING: 'COMING',
  NOT_COMING: 'NOT_COMING',
} as const;

export const EMAIL_SUBJECTS = {
  ATTENDANCE_COMING: 'אישור הגעה לטיפול',
  ATTENDANCE_NOT_COMING: 'ביטול הגעה לטיפול',
} as const;

export const EMAIL_TEXT = {
  dearCaregiver: 'מטפל יקר',
  patientNumber: 'מספר מטופל',
  willCome: 'יגיע לטיפול',
  willNotCome: 'לא יוכל להגיע לטיפול',
  treatmentTime: 'בשעה',
  cell: 'תא',
  building: 'בניין',
  rescheduleMessage: 'אנא פנה למטופל לקביעת מועד חדש ועדכן במערכת כי התפנה כיסא.',
  automaticMessage: 'הודעה זו נשלחה אוטומטית ממערכת Sagol360.',
  patientNameLabel: 'שם מטופל',
  patientNumberLabel: 'מספר מטופל',
  attendanceStatusLabel: 'סטטוס הגעה',
  timeLabel: 'שעה',
  cellLabel: 'תא',
  buildingLabel: 'בניין',
  comingStatusLabel: 'מגיע לטיפול',
  notComingStatusLabel: 'לא מגיע לטיפול',
} as const;

export const EMAIL_ERRORS = {
  invalidEmailData: 'Invalid email data',
  unsupportedEmailType: 'Unsupported email type',
  missingEmailEnvironmentVariables: 'Missing email environment variables',
  emailWasNotSent: 'Email was not sent',
} as const;

export const EMAIL_SUCCESS_MESSAGES = {
  emailSentSuccessfully: 'Email sent successfully',
} as const;

export const EMAIL_COLORS = {
  comingHeader: '#1f7a4d',
  notComingHeader: '#9f2f2f',
  background: '#f4f6f8',
  cardBackground: '#ffffff',
  border: '#e0e0e0',
  text: '#222222',
  mutedText: '#777777',
  tableLabelBackground: '#f8f9fa',
} as const;
