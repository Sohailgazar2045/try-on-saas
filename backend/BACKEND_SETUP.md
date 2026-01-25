# Virtual Try-On Backend API

Complete backend implementation with all required endpoints for the Virtual Try-On SaaS platform.

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
Copy `.env.example` to `.env` and fill in your actual values:
```bash
cp .env.example .env
```

Required environment variables:
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret key for JWT (min 32 characters)
- `CLOUDINARY_*` - Cloudinary API credentials for image storage
- `STRIPE_*` - Stripe API keys for payments

### 3. Database Setup
Initialize the Prisma database:
```bash
npm run db:generate
npm run db:migrate
```

### 4. Start the Server
Development:
```bash
npm run dev
```

Production:
```bash
npm start
```

The server will run on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/profile` - Get current user profile

### Images
- `POST /api/images/upload` - Upload user/outfit image
- `GET /api/images` - Get user's images (supports ?type=user|outfit|general|generated)
- `DELETE /api/images/:id` - Delete image
- `POST /api/images/save` - Save generated image

### Try-On Generation
- `POST /api/tryon/generate` - Generate try-on from person and outfit images

### Billing
- `GET /api/billing/pricing` - Get pricing and plans
- `POST /api/billing/checkout` - Create Stripe checkout session
- `POST /api/billing/webhook` - Stripe webhook handler

### User Management
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile
- `DELETE /api/user/account` - Delete user account

## Key Features Implemented

✅ User Authentication (JWT + Cookies)
✅ Image Upload & Storage (Cloudinary)
✅ Try-On Generation (AI-powered)
✅ Credit System
✅ Stripe Payments Integration
✅ User Profile Management
✅ Error Handling & Validation
✅ Database Schema (Prisma)
✅ Security (Helmet, CORS, Rate Limiting)
