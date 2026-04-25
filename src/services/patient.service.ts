import { promises as fs } from 'fs';
import path from 'path';
import { PATIENT_ERROR_MESSAGES } from '../constants/patient/patient.constants';

interface Appointment {
  title: string;
  startAt: string;
  durationMinutes: number;
  location: string;
  type: string;
}

interface Patient {
  serializeNumber: number;
  firstName: string;
  secondName: string;
  lastName: string;
  gender: string;
  totalProtocolTreatments: number;
  currentTreatmentNumber: number;
  preferredLanguage: string;
  appointments: Appointment[];
}

interface PatientsDb {
  patients: Patient[];
}

export interface PatientResponse {
  serializeNumber: number;
  firstName: string;
  totalProtocolTreatments: number;
  currentTreatmentNumber: number;
  appointments: Appointment[];
}

const patientsDbPath = path.resolve(process.cwd(), 'src', 'db', 'patients.json');

const getAllPatients = async (): Promise<Patient[]> => {
  const rawPatients = await fs.readFile(patientsDbPath, 'utf-8');
  const { patients } = JSON.parse(rawPatients) as PatientsDb;

  return patients;
};

export const getPatientBySerializeNumber = async (
  serializeNumber: number,
): Promise<PatientResponse> => {
  const patients = await getAllPatients();
  const patient = patients.find(
    (currentPatient) => currentPatient.serializeNumber === serializeNumber,
  );

  if (!patient) {
    throw new Error(PATIENT_ERROR_MESSAGES.PATIENT_NOT_FOUND);
  }

  const {
    serializeNumber: patientSerializeNumber,
    firstName,
    totalProtocolTreatments,
    currentTreatmentNumber,
    appointments,
  } = patient;

  if (
    patientSerializeNumber === undefined ||
    firstName === undefined ||
    totalProtocolTreatments === undefined ||
    currentTreatmentNumber === undefined ||
    appointments === undefined
  ) {
    throw new Error(PATIENT_ERROR_MESSAGES.PATIENT_DATA_MISSING_REQUIRED_FIELDS);
  }

  return {
    serializeNumber: patientSerializeNumber,
    firstName,
    totalProtocolTreatments,
    currentTreatmentNumber,
    appointments,
  };
};

export const patientService = {
  getPatientBySerializeNumber,
};
