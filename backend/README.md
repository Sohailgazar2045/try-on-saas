# Backend API - AI Virtual Try-On SaaS

Express.js backend API for the Virtual Try-On SaaS application.

## Quick Start

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Set up database
npm run db:generate
npm run db:migrate

# Start development server
npm run dev
```

## Scripts

- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm run db:migrate` - Run database migrations
- `npm run db:generate` - Generate Prisma Client
- `npm run db:studio` - Open Prisma Studio

## API Documentation

See main README.md for API endpoint documentation.

## Environment Variables

See `.env.example` for all required environment variables.

