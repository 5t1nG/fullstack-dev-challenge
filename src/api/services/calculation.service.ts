import { 
  CalculationRequest, 
  CalculationResponse,
  MonthlyResult,
  YearlyResult,
  CalculationSummary
} from '../interfaces/calculation.interface';
import { config } from '../../config';

/**
 * Validates the calculation request parameters against configured limits
 * @param params - The calculation request parameters
 * @throws Error if any parameter is invalid
 */
export const validateCalculationParams = (params: CalculationRequest): void => {
  const { initialSavings, monthlyDeposit, interestRate, years } = params;
  const limits = config.calculation.limits;
  
  // Check for valid numeric inputs
  if (
    isNaN(initialSavings) || 
    isNaN(monthlyDeposit) || 
    isNaN(interestRate) || 
    isNaN(years)
  ) {
    throw new Error('All parameters must be numeric values');
  }
  
  // Check minimum limits
  if (initialSavings < limits.initialSavings.min) {
    throw new Error(`Initial savings must be a positive number`);
  }
  
  if (monthlyDeposit < limits.monthlyDeposit.min) {
    throw new Error(`Monthly deposit must be a positive number`);
  }
  
  if (interestRate < limits.interestRate.min) {
    throw new Error(`Interest rate must be a positive number`);
  }
  
  if (years < limits.years.min) {
    throw new Error(`Years must be greater than 0`);
  }
  
  // Check maximum limits
  if (initialSavings > limits.initialSavings.max) {
    throw new Error(`Initial savings exceeds maximum allowed value of $${limits.initialSavings.max}`);
  }
  
  if (monthlyDeposit > limits.monthlyDeposit.max) {
    throw new Error(`Monthly deposit exceeds maximum allowed value of $${limits.monthlyDeposit.max}`);
  }
  
  if (interestRate > limits.interestRate.max) {
    throw new Error(`Interest rate exceeds maximum allowed value of ${limits.interestRate.max}%`);
  }
  
  if (years > limits.years.max) {
    throw new Error(`Years exceeds maximum allowed value of ${limits.years.max}`);
  }
};

/**
 * Calculates compound interest based on input parameters
 * @param params - The calculation request parameters
 * @returns Calculation results including summary, yearly results, and monthly results
 */
export const calculateCompoundInterest = (params: CalculationRequest): CalculationResponse => {
  // Validate input parameters
  validateCalculationParams(params);
  
  // Parse input parameters
  const { initialSavings, monthlyDeposit, interestRate, years } = params;
  const annualInterestRate = interestRate / 100; // Convert percentage to decimal
  
  // Calculate monthly interest rate
  const monthlyInterestRate = annualInterestRate / 12;
  
  // Calculate compound interest for each month
  let balance = initialSavings;
  const yearlyResults: YearlyResult[] = [];
  const monthlyResults: MonthlyResult[] = [];
  
  for (let year = 1; year <= years; year++) {
    let yearStartBalance = balance;
    
    for (let month = 1; month <= 12; month++) {
      // Add monthly deposit
      balance += monthlyDeposit;
      
      // Apply monthly interest
      const monthlyInterest = balance * monthlyInterestRate;
      balance += monthlyInterest;
      
      // Store monthly result
      monthlyResults.push({
        year,
        month,
        balance: parseFloat(balance.toFixed(2)),
        interest: parseFloat(monthlyInterest.toFixed(2))
      });
    }
    
    // Store yearly result
    yearlyResults.push({
      year,
      startBalance: parseFloat(yearStartBalance.toFixed(2)),
      endBalance: parseFloat(balance.toFixed(2)),
      growth: parseFloat((balance - yearStartBalance).toFixed(2)),
      growthPercentage: parseFloat(((balance / yearStartBalance - 1) * 100).toFixed(2))
    });
  }
  
  // Calculate summary stats
  const totalDeposited = monthlyDeposit * years * 12;
  const totalInterestEarned = balance - initialSavings - totalDeposited;
  
  const summary: CalculationSummary = {
    initialInvestment: initialSavings,
    totalDeposited: parseFloat(totalDeposited.toFixed(2)),
    totalInterestEarned: parseFloat(totalInterestEarned.toFixed(2)),
    finalBalance: parseFloat(balance.toFixed(2)),
    years: years
  };
  
  // Return the results
  return {
    success: true,
    summary,
    yearlyResults,
    monthlyResults
  };
}; 