import rawAppointments from '../db/appointments.json';
import { APPOINTMENT_STATUS_CONFIRMED } from '../constants/appointments/appointment.constants';
import type { Appointment } from '../models/appointmentModel.mongoose';

const appointments = rawAppointments as Appointment[];

const getAppointmentsByPatientId = (patientId: string): Appointment[] => {
    return appointments.filter((appointment) => appointment.patientId === patientId)
};

export const getNextAppointment = (patientId: string, date: string): Appointment | undefined => {
  return appointments
    .filter((a) => a.patientId === patientId && a.date >= date)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];
};
const getTotalProtocolTreatments = (appointments: Appointment[]): number => appointments.length;

const getCurrentTreatmentNumber = (appointments: Appointment[]): number => {
  const activeAppointments = appointments.filter(
    (appointment) => appointment.status === APPOINTMENT_STATUS_CONFIRMED,
  );

  return activeAppointments.length;
};

export const appointmentsService = {
  getAppointmentsByPatientId,
  getNextAppointment,
  getTotalProtocolTreatments,
  getCurrentTreatmentNumber,
};
