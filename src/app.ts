import express from 'express';
import cors from 'cors';
import { config } from './config';
import apiRoutes from './api/routes';
import { errorHandler } from './api/middleware/error.middleware';

// Initialize Express app
const app = express();

// Configure CORS
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl requests)
    if (!origin) return callback(null, true);
    
    if (config.cors.allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.warn(`Origin ${origin} not allowed by CORS`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: config.cors.credentials
}));

// Parse JSON request bodies
app.use(express.json());

// Express only serves static assets in production
if (config.server.isProduction) {
  app.use(express.static("client/build"));
}

// Mount API routes
app.use('/api', apiRoutes);

// Global error handler
app.use(errorHandler);

export default app; 