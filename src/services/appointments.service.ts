import appointments from '../db/appointments.json';

interface Appointment {
  appointmentId: string;
  patientId: string;
  date: string;
  time: string;
  chamber: string;
  chairNumber: number;
  treatmentNumber: number;
  status: string;
}

export const getAppointments = (patientId: string): Appointment[] => {
  return appointments.filter((a) => a.patientId === patientId);
};

export const getNextAppointment = (patientId: string, date: string): Appointment | undefined => {
  return appointments
    .filter((a) => a.patientId === patientId && a.date >= date)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];
};

export const appointmentService = {
  getNextAppointment,
  getAppointments 
} 