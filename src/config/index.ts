import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export const config = {
  server: {
    port: process.env.PORT || 3001,
    env: process.env.NODE_ENV || 'development',
    isProduction: process.env.NODE_ENV === 'production',
  },
  cors: {
    allowedOrigins: process.env.CORS_ALLOWED_ORIGINS
      ? process.env.CORS_ALLOWED_ORIGINS.split(',')
      : ['http://localhost:5173'], // Default to Vite dev server
    credentials: true,
  },
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50, // limit each IP to 50 requests per windowMs
  },
  calculation: {
    limits: {
      initialSavings: {
        min: 0,
        max: 1000000,
      },
      monthlyDeposit: {
        min: 0,
        max: 10000,
      },
      interestRate: {
        min: 0,
        max: 20, // 20%
      },
      years: {
        min: 1,
        max: 100,
      },
    },
  },
}; 