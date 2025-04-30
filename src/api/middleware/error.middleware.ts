import { Request, Response, NextFunction } from 'express';
import { ErrorResponse } from '../interfaces/calculation.interface';

/**
 * Custom Error class for API errors
 */
export class ApiError extends Error {
  statusCode: number;
  error: string;
  details?: any;

  constructor(statusCode: number, error: string, message: string, details?: any) {
    super(message);
    this.statusCode = statusCode;
    this.error = error;
    this.details = details;
  }
}

/**
 * Error handling middleware
 */
export const errorHandler = (
  err: Error | ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', err);

  // Default error response
  const statusCode = err instanceof ApiError ? err.statusCode : 500;
  const errorCode = err instanceof ApiError ? err.error : 'SERVER_ERROR';
  const message = err.message || 'An unexpected error occurred';
  const details = err instanceof ApiError ? err.details : undefined;

  const errorResponse: ErrorResponse = {
    error: errorCode,
    message: message,
  };

  if (details) {
    errorResponse.details = details;
  }

  res.status(statusCode).json(errorResponse);
}; 