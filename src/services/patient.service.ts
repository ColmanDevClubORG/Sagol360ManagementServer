import { promises as fs } from 'fs';
import path from 'path';
import { PATIENT_ERROR_MESSAGES } from '../constants/patient/patient.constants';
import type { Patient } from '../models/patientModel.mongoose';
import { appointmentsService } from './appointments.service';

interface PatientsDb {
  patients: Patient[];
}

interface PatientResponse {
  patientId: string;
  firstName: string;
  totalProtocolTreatments: number;
  currentTreatmentNumber: number;
}

const patientsDbPath = path.resolve(process.cwd(), 'src', 'db', 'patients.json');

const getAllPatients = async (): Promise<Patient[]> => {
  const rawPatients = await fs.readFile(patientsDbPath, 'utf-8');
  const { patients } = JSON.parse(rawPatients) as PatientsDb;

  return patients;
};

const getPatientByPatientId = async (patientId: string): Promise<PatientResponse> => {
  const patients = await getAllPatients();
  const patient = patients.find((currentPatient) => currentPatient.patientId === patientId);

  if (!patient) {
    throw new Error(PATIENT_ERROR_MESSAGES.PATIENT_NOT_FOUND);
  }

  const { patientId: foundPatientId, firstName } = patient;

  if (!foundPatientId || !firstName) {
    throw new Error(PATIENT_ERROR_MESSAGES.PATIENT_DATA_MISSING_REQUIRED_FIELDS);
  }

  const appointments = await appointmentsService.getAppointmentsByPatientId(foundPatientId);

  return {
    patientId: foundPatientId,
    firstName,
    totalProtocolTreatments: appointmentsService.getTotalProtocolTreatments(appointments),
    currentTreatmentNumber: appointmentsService.getCurrentTreatmentNumber(appointments),
  };
};

export const patientService = {
  getPatientByPatientId,
  getAllPatients,
};
