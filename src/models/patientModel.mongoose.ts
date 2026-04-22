import mongoose from 'mongoose';
import { appointmentSchema } from './appointmentModel.mongoose';

const { Schema } = mongoose;

const patientSchema = new Schema(
  {
    serializeNumber: Number,
    firstName: String,
    secondName: String,
    lastName: String,
    gender: String,
    totalProtocolTreatments: Number,
    currentTreatmentNumber: Number,
    preferredLanguage: String,
    appointments: [appointmentSchema],
  },
  { timestamps: true }
);

export { patientSchema };
export const patientModel = mongoose.model('patient', patientSchema);
