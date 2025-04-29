import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";

// Load environment variables from .env file
dotenv.config();

const app = express();

// Configure CORS
const allowedOrigins = process.env.CORS_ALLOWED_ORIGINS 
  ? process.env.CORS_ALLOWED_ORIGINS.split(',') 
  : ['http://localhost:5173']; // Default to Vite dev server

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.warn(`Origin ${origin} not allowed by CORS`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Parse JSON request bodies
app.use(express.json());

app.set("port", process.env.PORT || 3001);

// Express only serves static assets in production 
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Configure rate limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // limit each IP to 50 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: {
    error: "TOO_MANY_REQUESTS",
    message: "You have exceeded the rate limit. Please try again later.",
    retryAfter: "15 minutes",
    details: {
      limitPerWindow: 50,
      windowDurationMinutes: 15,
      rateLimitReset: Date.now() + (15 * 60 * 1000)
    }
  }
});

// Apply rate limiting to all calculation API requests
app.use("/api/get-calculation", apiLimiter);

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
  console.log(`CORS allowed origins: ${allowedOrigins.join(', ')}`);
});

/**
 * Calculate compound interest on savings
 * 
 * Required parameters:
 * - initialSavings: Initial deposit amount
 * - monthlyDeposit: Amount to deposit each month
 * - interestRate: Annual interest rate (as percentage)
 * - years: Number of years for the calculation
 * 
 * Returns compound interest calculation results
 */
app.post("/api/get-calculation", (req, res) => {
  // Validate required parameters
  if (!req.body.initialSavings && req.body.initialSavings !== 0 || 
      !req.body.monthlyDeposit && req.body.monthlyDeposit !== 0 || 
      !req.body.interestRate && req.body.interestRate !== 0 || 
      !req.body.years && req.body.years !== 0) {
    return res.status(400).json({
      error: "MISSING_PARAMETERS",
      message: "Missing required parameters",
      requiredParams: ["initialSavings", "monthlyDeposit", "interestRate", "years"],
      providedParams: Object.keys(req.body)
    });
  }

  try {
    // Parse input parameters
    const initialSavings = parseFloat(req.body.initialSavings);
    const monthlyDeposit = parseFloat(req.body.monthlyDeposit);
    const annualInterestRate = parseFloat(req.body.interestRate) / 100; // Convert percentage to decimal
    const years = parseInt(req.body.years);
    
    // Validate that inputs are numbers
    if (isNaN(initialSavings) || isNaN(monthlyDeposit) || isNaN(annualInterestRate) || isNaN(years)) {
      return res.status(400).json({
        error: "INVALID_PARAMETER_TYPE",
        message: "All parameters must be numeric values",
        invalidParameters: Object.entries({initialSavings, monthlyDeposit, annualInterestRate, years})
                              .filter(([_, value]) => isNaN(value))
                              .map(([key]) => key)
      });
    }
    
    // Validate specific parameter limits
    if (initialSavings < 0) {
      return res.status(400).json({
        error: "NEGATIVE_INITIAL_SAVINGS",
        message: "Initial savings must be a positive number",
        value: initialSavings
      });
    }
    
    if (monthlyDeposit < 0) {
      return res.status(400).json({
        error: "NEGATIVE_MONTHLY_DEPOSIT",
        message: "Monthly deposit must be a positive number",
        value: monthlyDeposit
      });
    }
    
    if (annualInterestRate < 0) {
      return res.status(400).json({
        error: "NEGATIVE_INTEREST_RATE",
        message: "Interest rate must be a positive number",
        value: req.body.interestRate
      });
    }
    
    if (years <= 0) {
      return res.status(400).json({
        error: "INVALID_YEARS",
        message: "Years must be greater than 0",
        value: years
      });
    }
    
    // Validate maximimum limits
    if (initialSavings > 1000000) {
      return res.status(400).json({
        error: "EXCESSIVE_INITIAL_SAVINGS",
        message: "Initial savings exceeds maximum allowed value of $1,000,000",
        value: initialSavings,
        maxAllowed: 1000000
      });
    }
    
    if (monthlyDeposit > 10000) {
      return res.status(400).json({
        error: "EXCESSIVE_MONTHLY_DEPOSIT",
        message: "Monthly deposit exceeds maximum allowed value of $10,000",
        value: monthlyDeposit,
        maxAllowed: 10000
      });
    }
    
    if (annualInterestRate > 0.2) {
      return res.status(400).json({
        error: "EXCESSIVE_INTEREST_RATE",
        message: "Interest rate exceeds maximum allowed value of 20%",
        value: req.body.interestRate,
        maxAllowed: 20
      });
    }
    
    if (years > 100) {
      return res.status(400).json({
        error: "EXCESSIVE_YEARS",
        message: "Years exceeds maximum allowed value of 100",
        value: years,
        maxAllowed: 100
      });
    }

    // Calculate monthly interest rate
    const monthlyInterestRate = annualInterestRate / 12;
    
    // Calculate compound interest for each month
    let balance = initialSavings;
    const yearlyResults = [];
    const monthlyResults = [];
    
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
    
    // Return the results
    return res.status(200).json({
      success: true,
      summary: {
        initialInvestment: initialSavings,
        totalDeposited: parseFloat(totalDeposited.toFixed(2)),
        totalInterestEarned: parseFloat(totalInterestEarned.toFixed(2)),
        finalBalance: parseFloat(balance.toFixed(2)),
        years: years
      },
      yearlyResults,
      monthlyResults
    });
    
  } catch (error) {
    console.error("Error calculating compound interest:", error);
    return res.status(500).json({
      error: "SERVER_ERROR",
      message: "Failed to calculate compound interest",
      details: error instanceof Error ? error.message : "Unknown error"
    });
  }
});
