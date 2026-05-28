import type { Patient } from '@/models/patientModel.mongoose';
import patientsData from '../db/patients.json';

const patients = patientsData as Patient[];

export const findPatientByCredentials = (userId: string, password: string): Patient | null => {
  return (
    patients.find((patient) => patient.patientId === userId && patient.password === password) ??
    null
  );
};
