import mongoose from 'mongoose';
import { DEFAULT_MONGO_URI } from './constants/db.constants';
import { appointmentModel } from './models/appointmentModel.mongoose';
import { patientModel } from './models/patientModel.mongoose';
import { tipModel } from './models/tipModel.mongoose';
import appointmentsData from './db/appointments.json';
import patientsData from './db/patients.json';
import tipsData from './db/tips.json';

const MONGO_URI = process.env.MONGO_URI ?? DEFAULT_MONGO_URI;

const seed = async () => {
  await mongoose.connect(MONGO_URI);

  await appointmentModel.deleteMany({});
  await patientModel.deleteMany({});
  await tipModel.deleteMany({});

  await appointmentModel.insertMany(appointmentsData);
  await patientModel.insertMany(patientsData.patients);
  await tipModel.insertMany(tipsData);

  console.log('Seeding complete');
  await mongoose.disconnect();
};

seed().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
