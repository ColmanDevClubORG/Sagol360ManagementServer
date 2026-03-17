import swaggerJSDoc, { OAS3Options } from 'swagger-jsdoc';

const options: OAS3Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Sagol360 Management Server API',
      version: '1.0.0',
      description: 'API documentation for the Express server',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts'],
};

export const swaggerSpec = swaggerJSDoc(options);
