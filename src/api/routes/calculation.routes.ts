import { Router } from 'express';
import { getSavingsCalculation } from '../controllers/calculation.controller';
import rateLimit from 'express-rate-limit';
import { config } from '../../config';

const router = Router();

// Create rate limiter for calculation endpoints
const calculationRateLimiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "TOO_MANY_REQUESTS",
    message: "You have exceeded the rate limit. Please try again later.",
    retryAfter: `${config.rateLimit.windowMs / (60 * 1000)} minutes`,
    details: {
      limitPerWindow: config.rateLimit.max,
      windowDurationMinutes: config.rateLimit.windowMs / (60 * 1000),
      rateLimitReset: Date.now() + config.rateLimit.windowMs
    }
  }
});

// Apply rate limiting to calculation routes
router.use(calculationRateLimiter);

// POST /api/calculations - Calculate compound interest
router.post('/', getSavingsCalculation);

export default router; 