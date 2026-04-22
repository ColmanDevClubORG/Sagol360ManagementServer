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

const readPatientsDb = async (): Promise<PatientsDb> => {
  try {
    const rawPatients = await fs.readFile(patientsDbPath, 'utf-8');
    return JSON.parse(rawPatients);
  } catch (error) {
    console.error('Database Read Error:', error);
    return { patients: [] };
  }
};


export const getPatientBySerializeNumber = async (
  serializeNumber: number
): Promise<PatientResponse | null> => {
  try {
    const { patients } = await readPatientsDb();

    const patient = patients.find((p) => p.serializeNumber === serializeNumber);

    if (
      !patient ||
      patient.serializeNumber === undefined ||
      patient.firstName === undefined ||
      patient.totalProtocolTreatments === undefined ||
      patient.currentTreatmentNumber === undefined
    ) {
      return null;
    }

    return {
      serializeNumber: patient.serializeNumber,
      firstName: patient.firstName,
      totalProtocolTreatments: patient.totalProtocolTreatments,
      currentTreatmentNumber: patient.currentTreatmentNumber,
      appointments: patient.appointments || [], 
    };
  } catch (error) {
    console.error(`Failed to get patient ${serializeNumber}:`, error);
    return null;
  }
};