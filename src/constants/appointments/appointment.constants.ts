export const APPOINTMENT_STATUS_CONFIRMED = 'confirmed';

export const APPOINTMENT_STATUSES = [
  APPOINTMENT_STATUS_CONFIRMED,
  'completed',
  'cancelled',
  'pending',
] as const;
