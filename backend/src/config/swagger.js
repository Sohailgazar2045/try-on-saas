import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Virtual Try-On API',
      version: '1.0.0',
      description: 'AI-powered virtual try-on SaaS backend API. This API allows users to upload images, generate virtual try-on results, and manage their accounts.',
      contact: {
        name: 'API Support',
        email: 'support@virtualtry-on.com',
        url: 'https://virtualtry-on.com'
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
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
          description: 'JWT Bearer token. Format: Bearer {token}'
        },
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'token',
          description: 'Cookie-based JWT token authentication'
        }
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'Unique user identifier',
              example: 'clx1234567890abcdef'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User email address',
              example: 'user@example.com'
            },
            name: {
              type: 'string',
              nullable: true,
              description: 'User full name',
              example: 'John Doe'
            },
            credits: {
              type: 'integer',
              minimum: 0,
              description: 'Available credits for try-on generation',
              example: 25
            },
            subscription: {
              type: 'string',
              enum: ['free', 'basic', 'premium'],
              description: 'User subscription tier',
              example: 'free'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Account creation timestamp',
              example: '2024-01-15T10:30:00Z'
            }
          },
          required: ['id', 'email', 'credits', 'subscription']
        },
        Image: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'Unique image identifier',
              example: 'clx1234567890abcdef'
            },
            url: {
              type: 'string',
              format: 'uri',
              description: 'Image URL (Cloudinary or external)',
              example: 'https://res.cloudinary.com/example/image/upload/v123/image.jpg'
            },
            type: {
              type: 'string',
              enum: ['user', 'outfit', 'generated'],
              description: 'Image type',
              example: 'user'
            },
            cloudinaryId: {
              type: 'string',
              nullable: true,
              description: 'Cloudinary public ID if stored in Cloudinary',
              example: 'images/user_abc123'
            },
            metadata: {
              type: 'object',
              nullable: true,
              description: 'Additional image metadata',
              additionalProperties: true
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Image upload timestamp',
              example: '2024-01-15T10:30:00Z'
            }
          },
          required: ['id', 'url', 'type']
        },
        TryOnRequest: {
          type: 'object',
          properties: {
            personImageId: {
              type: 'string',
              description: 'ID of the uploaded person/user image',
              example: 'clx1234567890abcdef'
            },
            outfitImageId: {
              type: 'string',
              description: 'ID of the uploaded outfit image',
              example: 'clx0987654321fedcba'
            }
          },
          required: ['personImageId', 'outfitImageId']
        },
        TryOnResponse: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              example: 'Try-on generated successfully'
            },
            image: {
              $ref: '#/components/schemas/Image'
            },
            creditsRemaining: {
              type: 'integer',
              minimum: 0,
              description: 'User credits after generation',
              example: 24
            }
          }
        },
        CheckoutSession: {
          type: 'object',
          properties: {
            sessionId: {
              type: 'string',
              description: 'Stripe checkout session ID',
              example: 'cs_test_abc123...'
            },
            url: {
              type: 'string',
              format: 'uri',
              description: 'Stripe checkout URL',
              example: 'https://checkout.stripe.com/c/pay/cs_test_abc123...'
            }
          }
        },
        Pricing: {
          type: 'object',
          properties: {
            subscriptions: {
              type: 'object',
              description: 'Available subscription plans',
              additionalProperties: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  price: { type: 'number' },
                  credits: { type: 'integer' },
                  features: { type: 'array', items: { type: 'string' } }
                }
              }
            },
            creditPackages: {
              type: 'object',
              description: 'Available credit packages',
              additionalProperties: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  price: { type: 'number' },
                  credits: { type: 'integer' }
                }
              }
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Error message',
              example: 'Invalid credentials'
            },
            error: {
              type: 'string',
              description: 'Detailed error information (development only)',
              example: 'Validation failed'
            },
            credits: {
              type: 'integer',
              description: 'Current user credits (for insufficient credits errors)',
              example: 0
            },
            required: {
              type: 'integer',
              description: 'Required credits (for insufficient credits errors)',
              example: 1
            }
          },
          required: ['message']
        },
        Success: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              example: 'Operation successful'
            }
          }
        },
        HealthCheck: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
              example: 'ok'
            },
            timestamp: {
              type: 'string',
              format: 'date-time',
              example: '2024-01-15T10:30:00Z'
            }
          }
        }
      },
      responses: {
        UnauthorizedError: {
          description: 'Authentication required or invalid token',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              },
              example: {
                message: 'Unauthorized. Please provide a valid token.'
              }
            }
          }
        },
        NotFoundError: {
          description: 'Resource not found',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              },
              example: {
                message: 'Resource not found'
              }
            }
          }
        },
        ValidationError: {
          description: 'Invalid input data',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              },
              example: {
                message: 'Validation failed',
                error: 'Email and password are required'
              }
            }
          }
        },
        InsufficientCreditsError: {
          description: 'User does not have enough credits',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              },
              example: {
                message: 'Insufficient credits. Please purchase more credits.',
                credits: 0,
                required: 1
              }
            }
          }
        },
        ServerError: {
          description: 'Internal server error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              },
              example: {
                message: 'Internal Server Error'
              }
            }
          }
        }
      }
    },
    tags: [
      {
        name: 'Auth',
        description: 'Authentication endpoints for user registration, login, and profile management'
      },
      {
        name: 'Images',
        description: 'Image upload and management endpoints'
      },
      {
        name: 'Try-On',
        description: 'Virtual try-on generation endpoints'
      },
      {
        name: 'Billing',
        description: 'Billing, subscriptions, and payment endpoints'
      },
      {
        name: 'User',
        description: 'User profile and account management endpoints'
      },
      {
        name: 'Health',
        description: 'System health check endpoints'
      }
    ]
  },
  apis: ['./src/routes/*.js', './src/server.js']
};

export const specs = swaggerJsdoc(options);

