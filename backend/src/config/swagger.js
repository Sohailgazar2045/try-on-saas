import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Virtual Try-On API',
      version: '1.0.0',
      description: 'AI-powered virtual try-on SaaS backend API',
      contact: {
        name: 'Support',
        url: 'https://virtualtry-on.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server'
      },
      {
        url: 'https://api.virtualtry-on.com',
        description: 'Production server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'JWT Bearer token'
        },
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'token',
          description: 'Cookie-based JWT token'
        }
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'User ID'
            },
            email: {
              type: 'string',
              format: 'email'
            },
            name: {
              type: 'string'
            },
            credits: {
              type: 'integer',
              minimum: 0
            },
            subscription: {
              type: 'string',
              enum: ['free', 'basic', 'premium']
            },
            createdAt: {
              type: 'string',
              format: 'date-time'
            }
          }
        },
        Image: {
          type: 'object',
          properties: {
            id: {
              type: 'string'
            },
            url: {
              type: 'string',
              format: 'uri'
            },
            type: {
              type: 'string',
              enum: ['user', 'outfit', 'generated']
            },
            createdAt: {
              type: 'string',
              format: 'date-time'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string'
            },
            error: {
              type: 'string'
            }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.js']
};

export const specs = swaggerJsdoc(options);

