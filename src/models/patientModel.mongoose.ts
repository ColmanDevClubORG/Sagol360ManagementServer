import mongoose from 'mongoose';
export interface Patient {
  patientId: string;
  password: string;
  firstName: string;
  secondName: string;
  lastName: string;
  gender: string;
  preferredLanguage: string;
}

const patientSchema = new mongoose.Schema(
  {
    patientId: { type: String, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    secondName: { type: String },
    lastName: { type: String, required: true },
    gender: { type: String },
    preferredLanguage: { type: String },
  },
  { timestamps: true },
);

export const patientModel = mongoose.model<Patient>('patient', patientSchema);
