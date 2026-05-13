import { connect, connection, ConnectionStates, Model } from 'mongoose';
import { DEFAULT_MONGO_URI } from '../constants/db.constants';
import { appointmentModel } from '../models/appointmentModel.mongoose';
import { patientModel } from '../models/patientModel.mongoose';
import { tipModel } from '../models/tipModel.mongoose';
import appointmentsData from '../db/appointments.json';
import patientsData from '../db/patients.json';
import tipsData from '../db/tips.json';

const MONGO_URI = process.env.MONGO_URI ?? DEFAULT_MONGO_URI;

export const seedDb = async (): Promise<void> => {
  await appointmentModel.insertMany(appointmentsData);
  await patientModel.insertMany(patientsData);
  await tipModel.insertMany(tipsData);
  console.log('Seeding complete');
};

export const connectToDb = async (): Promise<void> => {
  if (connection.readyState === ConnectionStates.connected) {
    return;
  }

  await connect(MONGO_URI);
  console.log('MongoDB connected');
};

export const disconnectFromDb = async (): Promise<void> => {
  await connection.close();
};

export const dbService = {
  get: async <T>(model: Model<T>, filter: Record<string, unknown> = {}) => {
    return model.find(filter).lean<T[]>();
  },

  insert: async <T>(model: Model<T>, data: Partial<T>) => {
    return model.create(data);
  },

  update: async <T>(model: Model<T>, filter: Record<string, unknown>, data: Partial<T>) => {
    return model
      .findOneAndUpdate(filter, data, {
        new: true,
        runValidators: true,
      })
      .lean<T>();
  },
};
