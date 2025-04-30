import { Request, Response, NextFunction } from 'express';
import { calculateCompoundInterest } from '../services/calculation.service';
import { CalculationRequest } from '../interfaces/calculation.interface';
import { ApiError } from '../middleware/error.middleware';

/**
 * Controller for handling savings calculation requests
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
export const getSavingsCalculation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Check required parameters
    const requiredParams = ['initialSavings', 'monthlyDeposit', 'interestRate', 'years'];
    const missingParams = requiredParams.filter(param => req.body[param] === undefined);
    
    if (missingParams.length > 0) {
      throw new ApiError(
        400,
        'MISSING_PARAMETERS',
        'Missing required parameters',
        {
          requiredParams,
          providedParams: Object.keys(req.body),
          missingParams
        }
      );
    }

    // Parse the parameters
    const calculationParams: CalculationRequest = {
      initialSavings: parseFloat(req.body.initialSavings),
      monthlyDeposit: parseFloat(req.body.monthlyDeposit),
      interestRate: parseFloat(req.body.interestRate),
      years: parseInt(req.body.years)
    };

    // Calculate the results
    const results = calculateCompoundInterest(calculationParams);
    
    // Return the calculation results
    return res.status(200).json(results);
  } catch (error) {
    // Pass errors to the error handling middleware
    if (error instanceof Error) {
      // Convert regular errors to ApiErrors with appropriate status codes
      if (error.message.includes('must be a positive') || 
          error.message.includes('exceeds maximum allowed') ||
          error.message.includes('must be numeric')) {
        return next(new ApiError(400, 'INVALID_PARAMETER', error.message));
      }
    }
    next(error);
  }
}; 