import 'dotenv/config';
import { connectToDb, disconnectFromDb, seedDb } from './services/db.service';

export const seed = async () => {
  await connectToDb();
  await seedDb();
  await disconnectFromDb();
};

seed().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
