import 'dotenv/config';
import app from './app';
import { connectToDb, disconnectFromDb } from './services/db.service';

const PORT = Number(process.env.PORT) || 3000;

const startServer = async (): Promise<void> => {
  await connectToDb();

  const server = app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`Swagger Documentation at http://localhost:${PORT}/api-docs`);
  });

  const closeServer = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      server.close((error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  };

  const shutdown = async () => {
    try {
      await closeServer();
      await disconnectFromDb();
      process.exit(0);
    } catch (error) {
      console.error('Error during shutdown:', error);
      process.exit(1);
    }
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
};

startServer().catch((error) => {
  console.error('Failed to start server', error);
  process.exit(1);
});
