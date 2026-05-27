export const PATIENT_ERROR_MESSAGES = {
  INVALID_PATIENT_ID: 'patientId must be a string containing only digits',
  INVALID_PATIENT_ID_AND_PASSWORD: 'Invalid patientId or password',
  PATIENT_DATA_MISSING_REQUIRED_FIELDS: 'Patient data is missing required fields',
  PATIENT_NOT_FOUND: 'Patient not found',
  PATIENT_ID_AND_PASSWORD_REQUIRED: 'userId and password are required',
  PATIENTS_NOT_FOUND: 'Patients not found',
} as const;
