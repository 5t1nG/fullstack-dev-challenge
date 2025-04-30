export interface CalculationRequest {
  initialSavings: number;
  monthlyDeposit: number;
  interestRate: number;
  years: number;
}

export interface MonthlyResult {
  year: number;
  month: number;
  balance: number;
  interest: number;
}

export interface YearlyResult {
  year: number;
  startBalance: number;
  endBalance: number;
  growth: number;
  growthPercentage: number;
}

export interface CalculationSummary {
  initialInvestment: number;
  totalDeposited: number;
  totalInterestEarned: number;
  finalBalance: number;
  years: number;
}

export interface CalculationResponse {
  success: boolean;
  summary: CalculationSummary;
  yearlyResults: YearlyResult[];
  monthlyResults: MonthlyResult[];
}

export interface ErrorResponse {
  error: string;
  message: string;
  details?: any;
} 