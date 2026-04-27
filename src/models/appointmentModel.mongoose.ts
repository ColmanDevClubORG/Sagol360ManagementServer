import mongoose, { Schema } from 'mongoose';
import { APPOINTMENT_STATUSES } from '../constants/appointments/appointment.constants';

export type AppointmentStatus = (typeof APPOINTMENT_STATUSES)[number];

export interface Appointment {
  appointmentId: string;
  patientId: string;
  time: string;
  date: string;
  chamber: string;
  chairNumber: number;
  status: AppointmentStatus;
}

const appointmentSchema = new Schema<Appointment>({
  appointmentId: { type: String, required: true },
  patientId: { type: String, required: true },
  time: { type: String, required: true },
  date: { type: String, required: true },
  chamber: { type: String, required: true },
  chairNumber: { type: Number, required: true },
  status: { type: String, enum: APPOINTMENT_STATUSES, required: true },
});

export const appointmentModel = mongoose.model<Appointment>('appointment', appointmentSchema);
