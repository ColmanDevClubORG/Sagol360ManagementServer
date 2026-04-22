import { promises as fs } from 'fs';
import path from 'path';

interface Appointment {
  title?: string;
  startAt?: string;
  durationMinutes?: number;
  location?: string;
  type?: string;
}

interface Patient {
  serializeNumber?: number;
  firstName?: string;
  secondName?: string;
  lastName?: string;
  gender?: string;
  totalProtocolTreatments?: number;
  currentTreatmentNumber?: number;
  preferredLanguage?: string;
  appointments?: Appointment[];
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
  serializeNumber: number
): Promise<PatientResponse | null> => {
  const patients = await getAllPatients();
  const patient = patients.find((currentPatient) => currentPatient.serializeNumber === serializeNumber);

  if (!patient) {
    return null;
  }

  const {
    serializeNumber: patientSerializeNumber,
    firstName,
    totalProtocolTreatments,
    currentTreatmentNumber,
    appointments = [],
  } = patient;

  if (
    patientSerializeNumber === undefined ||
    firstName === undefined ||
    totalProtocolTreatments === undefined ||
    currentTreatmentNumber === undefined
  ) {
    return null;
  }

  return {
    serializeNumber: patientSerializeNumber,
    firstName,
    totalProtocolTreatments,
    currentTreatmentNumber,
    appointments,
  };
};
