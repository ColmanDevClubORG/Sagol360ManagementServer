import express, { Application } from 'express';
import exampleRoutes from './routes/example.routes';
import { logger } from './middleware/logger.middleware';
import { errorHandler } from './middleware/error.middleware';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './utils/swagger';

const app: Application = express();

app.use(express.json());
app.use(logger);

// Swagger Documentation Route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/', exampleRoutes);

app.use(errorHandler);

export default app;
