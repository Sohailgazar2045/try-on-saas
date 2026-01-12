# AI Virtual Try-On SaaS

A full-stack SaaS application for AI-powered virtual try-on experiences.

## 🏗️ Project Structure

```
SAAS/
├── backend/          # Node.js/Express backend
├── frontend/         # Next.js frontend
└── README.md
```

## 🚀 Quick Start

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Configure your .env file
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env.local
# Configure your .env.local file
npm run dev
```

## 📋 Features

- ✅ User authentication (JWT)
- ✅ Image upload & storage
- ✅ AI try-on generation
- ✅ Image gallery
- ✅ Credit system
- ✅ Stripe payments
- ✅ Secure API endpoints

## 🔧 Tech Stack

**Backend:**
- Node.js + Express
- PostgreSQL + Prisma
- JWT Authentication
- Multer (file uploads)
- Cloudinary (image storage)
- Stripe (payments)

**Frontend:**
- Next.js 14 (App Router)
- Tailwind CSS
- Axios
- React Hook Form

## 📝 Environment Variables

See `.env.example` files in each directory for required configuration.

