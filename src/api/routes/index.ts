import { Router } from 'express';
import calculationRoutes from './calculation.routes';

const router = Router();

// Register routes
router.use('/calculations', calculationRoutes);

// Health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

export default router; 