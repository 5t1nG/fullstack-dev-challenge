import React, { useState, useEffect, useRef } from 'react';
import { 
  Container, 
  Flex, 
  useToast, 
  Box, 
  VStack, 
  Spinner, 
  Text, 
  Stat, 
  StatLabel, 
  StatNumber, 
  StatHelpText, 
  Badge, 
  SimpleGrid, 
  Heading,
  HStack 
} from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import InputPanel from './components/InputPanel/InputPanel';
import styles from './calculator.module.css';
import BubblyBox from '../../shared/components/ui/BubblyBox/BubblyBox';
import BubblyButton from '../../shared/components/ui/BubblyButton/BubblyButton';
import LineChart from '../../components/LineChart';

// Animation definitions
const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
`;

const wobble = keyframes`
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-5deg); }
  75% { transform: rotate(5deg); }
`;

const pop = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

const jiggle = keyframes`
  0%, 100% { transform: skewX(0deg); }
  15% { transform: skewX(-5deg); }
  30% { transform: skewX(4deg); }
  45% { transform: skewX(-3deg); }
  60% { transform: skewX(2deg); }
  75% { transform: skewX(-1deg); }
  90% { transform: skewX(1deg); }
`;

// Define types
interface FormDataType {
  initialSavings: string | number;
  monthlyDeposit: string | number;
  interestRate: string | number;
  years: string | number;
}

interface FormErrorsType {
  initialSavings?: string;
  monthlyDeposit?: string;
  interestRate?: string;
  years?: string;
}

interface YearlyResult {
  year: number;
  startBalance: number;
  endBalance: number;
  growth: number;
  growthPercentage: number;
}

interface ResultSummary {
  initialInvestment: number;
  totalDeposited: number;
  totalInterestEarned: number;
  finalBalance: number;
  years: number;
}

interface CalculationResult {
  success: boolean;
  summary: ResultSummary;
  yearlyResults: YearlyResult[];
  monthlyResults: any[];
}

// Use Vite environment variables format
const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';

const CalculatorPage: React.FC = () => {
  // Form state
  const [formData, setFormData] = useState<FormDataType>({
    initialSavings: 1000,
    monthlyDeposit: 100,
    interestRate: 4,
    years: 50
  });
  
  // Validation state
  const [formErrors, setFormErrors] = useState<FormErrorsType>({});
  const [isTouched, setIsTouched] = useState<Record<string, boolean>>({});
  
  // Results state
  const [results, setResults] = useState<CalculationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [calculationError, setCalculationError] = useState<string | null>(null);
  
  // Add a mounted flag to prevent multiple API calls on initial render
  const [isMounted, setIsMounted] = useState(false);
  
  const toast = useToast();
  const calculationTimeoutRef = useRef<number | null>(null);

  // Animations
  const bounceAnimation = `${bounce} 4s ease-in-out infinite`;
  const wobbleAnimation = `${wobble} 5s ease-in-out infinite`;
  const popAnimation = `${pop} 2s ease-in-out infinite`;
  const jiggleAnimation = `${jiggle} 3s ease-in-out infinite`;

  // Validate a single field
  const validateField = (name: string, value: string | number): string | undefined => {
    // Convert string to number for validation
    const numericValue = typeof value === 'string' ? parseFloat(value) : value;
    
    if (name === 'initialSavings') {
      if (isNaN(numericValue) || numericValue < 0) return 'Initial savings must be a positive number';
      if (numericValue > 1000000) return 'Initial savings cannot exceed $1,000,000';
    }
    
    if (name === 'monthlyDeposit') {
      if (isNaN(numericValue) || numericValue < 0) return 'Monthly deposit must be a positive number';
      if (numericValue > 10000) return 'Monthly deposit cannot exceed $10,000';
    }
    
    if (name === 'interestRate') {
      if (isNaN(numericValue) || numericValue < 0) return 'Interest rate must be a positive number';
      if (numericValue > 20) return 'Interest rate cannot exceed 20%';
    }
    
    if (name === 'years') {
      if (isNaN(numericValue) || numericValue <= 0) return 'Years must be greater than 0';
      if (numericValue > 100) return 'Years cannot exceed 100';
      
      // Only for years, we check if it's a whole number
      // But allow string inputs like '10.' during typing
      if (typeof value === 'number' && Math.floor(value) !== value) {
        return 'Years must be a whole number';
      }
    }
    
    return undefined;
  };

  // Validate all fields
  const validateForm = (data: FormDataType): FormErrorsType => {
    const errors: FormErrorsType = {};
    
    Object.entries(data).forEach(([key, value]) => {
      const error = validateField(key, value);
      if (error) {
        errors[key as keyof FormDataType] = error;
      }
    });
    
    return errors;
  };

  // Handle input changes with validation
  const handleInputChange = (name: keyof FormDataType, value: string | number) => {
    // Mark field as touched
    setIsTouched(prev => ({ ...prev, [name]: true }));
    
    // Check for validation errors
    const error = validateField(name, value);
    setFormErrors(prev => ({
      ...prev,
      [name]: error
    }));
    
    // Allow string inputs to preserve decimal points during typing
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Helpers to convert form data to numeric values for calculations
  const getNumericFormData = (): Record<keyof FormDataType, number> => {
    return {
      initialSavings: typeof formData.initialSavings === 'string' 
        ? parseFloat(formData.initialSavings) || 0 
        : formData.initialSavings,
      monthlyDeposit: typeof formData.monthlyDeposit === 'string' 
        ? parseFloat(formData.monthlyDeposit) || 0 
        : formData.monthlyDeposit,
      interestRate: typeof formData.interestRate === 'string' 
        ? parseFloat(formData.interestRate) || 0 
        : formData.interestRate,
      years: typeof formData.years === 'string' 
        ? Math.floor(parseFloat(formData.years)) || 0 
        : formData.years
    };
  };

  // Function to get meaningful error messages based on error codes
  const getErrorMessage = (errorData: any): string => {
    if (!errorData || !errorData.error) {
      return 'Unknown error occurred';
    }

    // Map error codes to user-friendly messages
    switch (errorData.error) {
      case 'MISSING_PARAMETERS':
        return `Missing required parameters: ${errorData.requiredParams?.join(', ')}`;
      
      case 'INVALID_PARAMETER_TYPE':
        return `Invalid parameter type: ${errorData.message}`;
      
      case 'NEGATIVE_INITIAL_SAVINGS':
        return 'Initial savings must be a positive number';
      
      case 'NEGATIVE_MONTHLY_DEPOSIT':
        return 'Monthly deposit must be a positive number';
      
      case 'NEGATIVE_INTEREST_RATE':
        return 'Interest rate must be a positive number';
      
      case 'INVALID_YEARS':
        return 'Years must be greater than 0';
        
      case 'EXCESSIVE_INITIAL_SAVINGS':
        return `Initial savings exceeds maximum allowed value of $${errorData.maxAllowed?.toLocaleString()}`;
        
      case 'EXCESSIVE_MONTHLY_DEPOSIT':
        return `Monthly deposit exceeds maximum allowed value of $${errorData.maxAllowed?.toLocaleString()}`;
        
      case 'EXCESSIVE_INTEREST_RATE':
        return `Interest rate exceeds maximum allowed value of ${errorData.maxAllowed}%`;
        
      case 'EXCESSIVE_YEARS':
        return `Years exceeds maximum allowed value of ${errorData.maxAllowed}`;
        
      case 'SERVER_ERROR':
        return `Server error: ${errorData.details || errorData.message}`;
        
      case 'TOO_MANY_REQUESTS':
        const minutesLeft = errorData.details?.windowDurationMinutes || 15;
        return `Rate limit exceeded: ${errorData.message} You can make up to ${errorData.details?.limitPerWindow || 50} requests per ${minutesLeft} minutes. Please try again in ${errorData.retryAfter}.`;
      
      case 'Too many requests':
        return `Rate limit exceeded: ${errorData.message}. Try again in ${errorData.retryAfter}.`;
        
      default:
        return errorData.message || 'Failed to calculate';
    }
  };

  // Calculate results when form data changes
  useEffect(() => {
    // Only run calculation effect if component is mounted and not in initial render
    if (!isMounted) return;
    
    // Clear previous timeout
    if (calculationTimeoutRef.current) {
      window.clearTimeout(calculationTimeoutRef.current);
    }
    
    // Validate full form
    const errors = validateForm(formData);
    const hasErrors = Object.keys(errors).length > 0;
    
    // Only calculate if there are no errors
    if (!hasErrors) {
      setIsLoading(true);
      setCalculationError(null);
      
      // Debounce the calculation to avoid too many requests
      calculationTimeoutRef.current = window.setTimeout(async () => {
        try {
          // Get numeric values for API call
          const numericData = getNumericFormData();
          
          const response = await fetch(`${backendUrl}/api/get-calculation`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(numericData)
          });
          
          const data = await response.json();
          
          if (!response.ok) {
            // Handle specific error codes from the API
            const errorMessage = getErrorMessage(data);
            throw new Error(errorMessage || 'Failed to calculate');
          }
          
          setResults(data as CalculationResult);
          
          // Remove success toast - success is clear from UI results
        } catch (error: any) {
          // Handle rate limit errors specifically
          if (error.message?.includes('rate limit') || error.message?.includes('Rate limit')) {
            setCalculationError('Rate limit exceeded. Please wait before making more requests.');
            toast({
              title: 'Rate Limit Exceeded',
              description: error.message || 'Too many requests. Please wait before trying again.',
              status: 'error',
              duration: 8000,
              isClosable: true
            });
          } else {
            setCalculationError(error.message || 'An error occurred');
            toast({
              title: 'Calculation Error',
              description: error.message || 'An error occurred during calculation.',
              status: 'error',
              duration: 5000,
              isClosable: true
            });
          }
        } finally {
          setIsLoading(false);
        }
      }, 500); // 500ms debounce
    }
    
    return () => {
      if (calculationTimeoutRef.current) {
        window.clearTimeout(calculationTimeoutRef.current);
      }
    };
  }, [formData, toast, isMounted]);

  // Initial calculation on component mount - only run once
  useEffect(() => {
    // Mark component as mounted after initial setup
    setIsMounted(true);
    
    // Trigger initial calculation
    const errors = validateForm(formData);
    if (Object.keys(errors).length === 0) {
      handleCalculation();
    }
    
    // Clean up on unmount
    return () => {
      if (calculationTimeoutRef.current) {
        window.clearTimeout(calculationTimeoutRef.current);
      }
    };
  }, []);

  // Manual calculation handling
  const handleCalculation = async () => {
    // Validate all fields
    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      // Show validation error toast
      toast({
        title: 'Validation Error',
        description: 'Please fix the form errors before calculating. Check highlighted fields for specific issues.',
        status: 'error',
        duration: 5000,
        isClosable: true
      });
      return;
    }
    
    setIsLoading(true);
    setCalculationError(null);
    
    try {
      // Convert string inputs to numbers for API call
      const numericData = getNumericFormData();
      
      const response = await fetch(`${backendUrl}/api/get-calculation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(numericData)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        // Handle specific error codes from the API
        const errorMessage = getErrorMessage(data);
        throw new Error(errorMessage || 'Failed to calculate');
      }
      
      setResults(data as CalculationResult);
      
      // Remove success toast - success is clear from UI results
    } catch (error: any) {
      setCalculationError(error.message || 'An error occurred');
      toast({
        title: 'Calculation failed',
        description: error.message || 'An error occurred during calculation.',
        status: 'error',
        duration: 5000,
        isClosable: true
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxW="100vw" pt={4} pb={10} className={styles.calculatorPage}>
      <Flex 
        className={styles.calculatorLayout}
        gap={4}
        justify="center"
        align="start"
      >
        {/* Column 1 - Input */}
        <Box className={styles.panelColumn} flex="2">
          <InputPanel 
            formData={formData}
            formErrors={formErrors}
            isTouched={isTouched}
            isLoading={isLoading}
            handleInputChange={handleInputChange}
            handleCalculation={handleCalculation}
          />
        </Box>
        
        {/* Column 2 - Results Summary */}
        <Box className={styles.panelColumn} flex="2">
          {isLoading ? (
            <BubblyBox bg="secondary.100" color="black" transform="rotate(-1deg)" className={styles.resultsPanel}>
              <VStack justify="center" spacing={6} py={10}>
                <Spinner 
                  size="xl" 
                  thickness="6px"
                  speed="0.8s"
                  color="accent.400"
                  emptyColor="white"
                  w={20}
                  h={20}
                />
                <Text fontWeight="bold" fontSize="xl">Crunching numbers...</Text>
              </VStack>
            </BubblyBox>
          ) : calculationError ? (
            <BubblyBox bg="secondary.100" color="black" transform="rotate(-1deg)" className={styles.resultsPanel}>
              <VStack justify="center" spacing={4} py={10}>
                <Text color="red.500" fontSize="xl" fontWeight="bold">Oops! Something went wrong</Text>
                <Text>{calculationError}</Text>
                <BubblyButton
                  onClick={handleCalculation}
                  bg="primary.400"
                  color="black"
                  mt={4}
                >
                  Try Again 🔄
                </BubblyButton>
              </VStack>
            </BubblyBox>
          ) : results ? (
            <BubblyBox bg="secondary.100" color="black" transform="rotate(-1deg)" className={styles.resultsPanel}>
              <VStack spacing={6} align="stretch" position="relative" zIndex={1}>
                <Heading 
                  as="h2" 
                  size="lg" 
                  textAlign="center"
                  color="black"
                  bg="secondary.300"
                  fontWeight="extrabold"
                  py={2}
                  px={4}
                  borderRadius="full"
                  border="3px solid black"
                  transform="rotate(1deg)"
                  boxShadow="3px 3px 0 rgba(0,0,0,0.8)"
                  my={2}
                >
                  Your Money Journey!
                </Heading>
                
                <SimpleGrid columns={{ base: 2, md: 2 }} spacing={4}>
                  <Box
                    bg="white"
                    p={3}
                    borderRadius="20px"
                    border="3px solid black"
                    boxShadow="cartoon"
                    transform="rotate(-2deg)"
                    transition="transform 0.2s"
                    _hover={{ transform: "rotate(-2deg) scale(1.05)" }}
                    className={styles.statBox}
                  >
                    <Stat>
                      <StatLabel fontWeight="bold">Starting With</StatLabel>
                      <StatNumber fontSize="xl" fontWeight="black">${results.summary.initialInvestment.toLocaleString()}</StatNumber>
                    </Stat>
                  </Box>
                  
                  <Box
                    bg="white"
                    p={3}
                    borderRadius="20px"
                    border="3px solid black"
                    boxShadow="cartoon"
                    transform="rotate(1deg)"
                    transition="transform 0.2s"
                    _hover={{ transform: "rotate(1deg) scale(1.05)" }}
                    className={styles.statBox}
                  >
                    <Stat>
                      <StatLabel fontWeight="bold">You'll Add</StatLabel>
                      <StatNumber fontSize="xl" fontWeight="black">${results.summary.totalDeposited.toLocaleString()}</StatNumber>
                    </Stat>
                  </Box>
                  
                  <Box
                    bg="white"
                    p={3}
                    borderRadius="20px"
                    border="3px solid black"
                    boxShadow="cartoon"
                    transform="rotate(-1deg)"
                    transition="transform 0.2s"
                    _hover={{ transform: "rotate(-1deg) scale(1.05)" }}
                    className={styles.statBox}
                  >
                    <Stat>
                      <StatLabel fontWeight="bold">Magic Money</StatLabel>
                      <StatNumber fontSize="xl" fontWeight="black">${results.summary.totalInterestEarned.toLocaleString()}</StatNumber>
                      <StatHelpText fontWeight="bold">
                        {(results.summary.totalInterestEarned / results.summary.totalDeposited * 100).toFixed(0)}% Extra!
                        <Badge ml={2} bg="success.400" color="black" border="2px solid black" borderRadius="full">✨</Badge>
                      </StatHelpText>
                    </Stat>
                  </Box>
                  
                  <Box
                    bg="primary.300"
                    p={3}
                    borderRadius="20px"
                    border="3px solid black"
                    boxShadow="cartoon"
                    transition="transform 0.2s"
                    animation={popAnimation}
                    transform="rotate(2deg)"
                    _hover={{ transform: "rotate(2deg) scale(1.05)" }}
                    className={styles.statBox}
                  >
                    <Stat>
                      <StatLabel fontWeight="extrabold">TOTAL TREASURE</StatLabel>
                      <StatNumber fontSize="xl" fontWeight="black">${results.summary.finalBalance.toLocaleString()}</StatNumber>
                      <StatHelpText fontWeight="bold">After {results.summary.years} years 🎉</StatHelpText>
                    </Stat>
                  </Box>
                </SimpleGrid>
              </VStack>
            </BubblyBox>
          ) : null}
        </Box>
        
        {/* Column 3 - Chart and Money Facts */}
        <Box className={styles.panelColumn} flex="5">
          {isLoading ? (
            <BubblyBox bg="primary.100" color="black" transform="rotate(1deg)" className={styles.chartPanel}>
              <VStack justify="center" spacing={6} py={10}>
                <Spinner 
                  size="xl" 
                  thickness="6px"
                  speed="0.8s"
                  color="accent.400"
                  emptyColor="white"
                  w={20}
                  h={20}
                />
                <Text fontWeight="bold" fontSize="xl">Crunching numbers...</Text>
              </VStack>
            </BubblyBox>
          ) : calculationError ? (
            <BubblyBox bg="primary.100" color="black" transform="rotate(1deg)" className={styles.chartPanel}>
              <VStack justify="center" spacing={4} py={10}>
                <Text color="red.500" fontSize="xl" fontWeight="bold">Oops! Something went wrong</Text>
                <Text>{calculationError}</Text>
              </VStack>
            </BubblyBox>
          ) : results ? (
            <VStack spacing={4} align="stretch">
              {/* Chart Panel */}
              <BubblyBox 
                bg="primary.100"
                color="black"
                transform="rotate(1deg)"
                className={styles.chartPanel}
              >
                <VStack spacing={4}>
                  <Heading 
                    as="h2" 
                    size="md" 
                    textAlign="center"
                    color="black"
                    fontWeight="bold"
                    letterSpacing="wide"
                    mb={2}
                    border="3px solid black"
                    borderRadius="full"
                    px={4}
                    py={2}
                    bg="white"
                    textTransform="uppercase"
                  >
                    Growth Chart
                  </Heading>
                  
                  <Box 
                    h={{ base: "250px", md: "300px" }} 
                    w="full"
                    bg="white"
                    p={4}
                    borderRadius="20px"
                    border="3px solid black"
                    boxShadow="cartoon"
                    className={styles.chartContainer}
                  >
                    <LineChart
                      title="Money Mountain"
                      xAxisData={results.yearlyResults.map(item => item.year.toString())}
                      yAxisData={results.yearlyResults.map(item => item.endBalance.toString())}
                      xLabel="Years"
                      yLabel="Balance"
                      color="#e91e63"
                    />
                  </Box>
                </VStack>
              </BubblyBox>
            </VStack>
          ) : null}
        </Box>
      </Flex>
    </Container>
  );
};

export default CalculatorPage;