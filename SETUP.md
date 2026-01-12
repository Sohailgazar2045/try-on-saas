# 🚀 Setup Guide - AI Virtual Try-On SaaS

Complete step-by-step guide to set up and run the application.

## 📋 Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- Cloudinary account (for image storage)
- Stripe account (for payments)
- Google AI API key (for try-on generation)

## 🔧 Backend Setup

### 1. Navigate to backend directory

```bash
cd backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the `backend` directory:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# Server
PORT=5000
NODE_ENV=development

# Database (PostgreSQL)
DATABASE_URL="postgresql://username:password@localhost:5432/virtual_tryon?schema=public"

# JWT Secret (generate a strong random string)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d

# Cloudinary (Get from https://cloudinary.com)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Stripe (Get from https://stripe.com)
STRIPE_SECRET_KEY=sk_test_your-stripe-secret-key
STRIPE_WEBHOOK_SECRET=whsec_your-webhook-secret

# Google AI (Optional - for try-on generation)
GOOGLE_AI_API_KEY=your-google-ai-api-key
GOOGLE_PROJECT_ID=your-project-id

# Frontend URL
FRONTEND_URL=http://localhost:3000

# File Upload Limits
MAX_FILE_SIZE=5242880
ALLOWED_IMAGE_TYPES=jpg,jpeg,png,webp
```

### 4. Set up PostgreSQL database

Create a new PostgreSQL database:

```sql
CREATE DATABASE virtual_tryon;
```

### 5. Run Prisma migrations

```bash
# Generate Prisma Client
npm run db:generate

# Run migrations
npm run db:migrate
```

### 6. Start the backend server

```bash
npm run dev
```

The backend will run on `http://localhost:5000`

## 🎨 Frontend Setup

### 1. Navigate to frontend directory

```bash
cd frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the `frontend` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 4. Start the development server

```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## 🔑 Service Configuration

### Cloudinary Setup

1. Sign up at [cloudinary.com](https://cloudinary.com)
2. Go to Dashboard
3. Copy your Cloud Name, API Key, and API Secret
4. Add them to backend `.env`

### Stripe Setup

1. Sign up at [stripe.com](https://stripe.com)
2. Get your API keys from Dashboard → Developers → API keys
3. Set up webhook endpoint:
   - URL: `https://your-domain.com/api/billing/webhook`
   - Events: `checkout.session.completed`
4. Copy webhook secret to backend `.env`

### Google AI Setup (Optional)

For AI try-on generation, you have options:

**Option 1: Google Gemini API**
- Get API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
- Add to backend `.env`

**Option 2: Third-party Virtual Try-On API**
- Integrate with a specialized virtual try-on service
- Update `backend/src/utils/aiService.js` with your API

**Note:** The current implementation includes a placeholder. You'll need to integrate with an actual virtual try-on service or API.

## 📁 Project Structure

```
SAAS/
├── backend/
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── routes/         # API routes
│   │   ├── middlewares/    # Auth, upload, etc.
│   │   ├── services/       # Business logic
│   │   ├── utils/          # Helpers (db, cloudinary, AI)
│   │   └── server.js       # Entry point
│   ├── prisma/
│   │   └── schema.prisma   # Database schema
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── app/            # Next.js pages (App Router)
    │   ├── components/     # React components
    │   └── lib/            # API client, auth utils
    └── package.json
```

## 🧪 Testing the Application

1. **Register a new account:**
   - Go to `http://localhost:3000/register`
   - Create an account (you'll get 5 free credits)

2. **Upload images:**
   - Go to `/try-on`
   - Upload a person photo
   - Upload an outfit photo

3. **Generate try-on:**
   - Click "Generate Try-On"
   - Wait for the result (may take a few seconds)

4. **View gallery:**
   - Go to `/gallery`
   - View all your uploaded and generated images

5. **Purchase credits:**
   - Go to `/billing`
   - Select a credit package or subscription

## 🐛 Troubleshooting

### Database Connection Issues

- Ensure PostgreSQL is running
- Check `DATABASE_URL` in `.env`
- Verify database exists: `psql -U postgres -l`

### Image Upload Fails

- Check Cloudinary credentials
- Verify file size is under 5MB
- Check file format (jpg, png, webp)

### Authentication Issues

- Clear browser cookies
- Check JWT_SECRET in backend `.env`
- Verify token is being sent in requests

### CORS Errors

- Ensure `FRONTEND_URL` in backend `.env` matches your frontend URL
- Check that backend allows credentials in CORS config

## 🚀 Production Deployment

### Backend

1. Set `NODE_ENV=production`
2. Use a production database (e.g., AWS RDS, Heroku Postgres)
3. Set up HTTPS
4. Configure environment variables on your hosting platform
5. Run migrations: `npm run db:migrate`

### Frontend

1. Build the app: `npm run build`
2. Set `NEXT_PUBLIC_API_URL` to your production API URL
3. Deploy to Vercel, Netlify, or your preferred platform

### Security Checklist

- [ ] Use strong JWT_SECRET
- [ ] Enable HTTPS
- [ ] Set secure cookie flags in production
- [ ] Configure rate limiting
- [ ] Set up proper CORS
- [ ] Use environment variables (never commit secrets)
- [ ] Enable database backups
- [ ] Set up monitoring and logging

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/profile` - Get user profile

### Images
- `POST /api/images/upload` - Upload image
- `GET /api/images` - Get user images
- `DELETE /api/images/:id` - Delete image
- `POST /api/images/save` - Save generated image

### Try-On
- `POST /api/tryon/generate` - Generate try-on image

### Billing
- `GET /api/billing/pricing` - Get pricing plans
- `POST /api/billing/checkout` - Create checkout session
- `POST /api/billing/webhook` - Stripe webhook

### User
- `GET /api/user/profile` - Get profile
- `PUT /api/user/profile` - Update profile
- `DELETE /api/user/account` - Delete account

## 🎯 Next Steps

1. **Integrate Real AI Service:**
   - Replace placeholder in `backend/src/utils/aiService.js`
   - Use a real virtual try-on API or ML model

2. **Add Features:**
   - Email notifications
   - Social sharing
   - Outfit recommendations
   - History tracking

3. **Improve UI/UX:**
   - Add loading skeletons
   - Improve error messages
   - Add image editing tools

4. **Scale:**
   - Add Redis for caching
   - Set up CDN for images
   - Implement queue system for AI processing

## 📞 Support

For issues or questions, check the code comments or create an issue in the repository.

