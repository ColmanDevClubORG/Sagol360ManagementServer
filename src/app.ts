import express, { Application } from 'express';
import exampleRoutes from './routes/example.routes';
import patientRoutes from './routes/patient.routes';
import loginRoutes from './routes/login.routes';
import appointmentRoutes from './routes/appointments.routes';
import tipsRoutes from './routes/tips.routes';
import { logger } from './middleware/logger.middleware';
import { errorHandler } from './middleware/error.middleware';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './utils/swagger';
import metricsRoutes from './routes/metrics.routes';
import emailRoutes from './routes/email.routes';

const app: Application = express();

app.use(express.json());
app.use(logger);

// Swagger Documentation Route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/', exampleRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/appointment', appointmentRoutes);
app.use('/api/tips', tipsRoutes);
app.use('/api/metrics/', metricsRoutes);
app.use('/api/email', emailRoutes);

app.use(errorHandler);

export default app;
