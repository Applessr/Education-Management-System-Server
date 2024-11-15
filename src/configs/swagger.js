const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'API Documentation EMS Project',
        version: '1.0.0',
        description: 'This is the API documentation for the project',
      },
      servers: [
        {
          url: 'http://localhost:8888',
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
    },
    apis: ['./src/docs/*.js'],
  };
const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};