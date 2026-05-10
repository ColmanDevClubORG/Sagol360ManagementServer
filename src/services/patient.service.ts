import { PATIENT_ERROR_MESSAGES } from '../constants/patient/patient.constants';
import { patientModel } from '../models/patientModel.mongoose';
import type { Patient } from '../models/patientModel.mongoose';
import { appointmentsService } from './appointments.service';
import { dbService } from './db.service';

interface PatientResponse {
  patientId: string;
  firstName: string;
  totalProtocolTreatments: number;
  currentTreatmentNumber: number;
}

const getAllPatients = async (): Promise<Patient[]> => {
  return dbService.get(patientModel);
};

const getPatientByPatientId = async (patientId: string): Promise<PatientResponse> => {
  const [patient] = await dbService.get(patientModel, { patientId });

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
