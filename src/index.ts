import mongoose from 'mongoose';
import app from './app';
import { connectToDb } from './services/db.service';
import { appointmentModel } from './models/appointmentModel.mongoose';
import { patientModel } from './models/patientModel.mongoose';
import { tipModel } from './models/tipModel.mongoose';
import appointmentsData from './db/appointments.json';
import patientsData from './db/patients.json';
import tipsData from './db/tips.json';

const PORT = Number(process.env.PORT) || 3000;

const startServer = async (): Promise<void> => {
  if (!process.env.MONGO_URI) {
    const { MongoMemoryServer } = await import('mongodb-memory-server');
    const mongod = await MongoMemoryServer.create();
    await mongoose.connect(mongod.getUri());
    console.log('Local in-memory MongoDB started');

    await appointmentModel.deleteMany({});
    await patientModel.deleteMany({});
    await tipModel.deleteMany({});
    await appointmentModel.insertMany(appointmentsData);
    await patientModel.insertMany(patientsData.patients);
    await tipModel.insertMany(tipsData);
    console.log('Seeding complete');
  } else {
    await connectToDb();
    console.log('MongoDB connected');
  }

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`Swagger Documentation at http://localhost:${PORT}/api-docs`);
  });
};

startServer().catch((error) => {
  console.error('Failed to start server', error);
  process.exit(1);
});
