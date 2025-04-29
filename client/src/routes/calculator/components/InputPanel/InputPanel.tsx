import React from 'react';
import {
  VStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Heading,
  Box
} from '@chakra-ui/react';
import BubblyBox from '../../../../shared/components/ui/BubblyBox/BubblyBox';
import BubblyButton from '../../../../shared/components/ui/BubblyButton/BubblyButton';
import CartoonSlider from '../../../../shared/components/ui/CartoonSlider/CartoonSlider';
import styles from './InputPanel.module.css';

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

interface InputPanelProps {
  formData: FormDataType;
  formErrors: FormErrorsType;
  isTouched: Record<string, boolean>;
  isLoading: boolean;
  handleInputChange: (name: keyof FormDataType, value: string | number) => void;
  handleCalculation: () => void;
}

// Updated input styling for better cartoon look
const InputStyle = {
  bg: 'white',
  border: '3px solid black',
  borderRadius: '15px',
  boxShadow: '3px 3px 0 rgba(0,0,0,0.8)',
  fontWeight: 'bold',
  height: '48px',
  fontSize: '18px',
  _hover: {
    borderColor: 'black',
  },
  _focus: {
    borderColor: 'black',
    boxShadow: '4px 4px 0 rgba(0,0,0,0.8)',
  }
};

// Addon styling for better consistency
const LeftAddonStyle = {
  bg: 'secondary.500', // More vibrant pink
  color: 'white',
  border: '3px solid black',
  borderRadius: '15px 0 0 15px',
  borderRight: 'none', // Ensure smooth transition to input field
  fontWeight: 'bold',
  height: '48px',
  width: '48px',
  fontSize: '20px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0',
  boxShadow: '3px 3px 0 rgba(0,0,0,0.8)',
  marginRight: '-1px' // Overlap slightly for better appearance
};

const RightAddonStyle = {
  bg: 'secondary.300',
  color: 'black',
  border: '3px solid black',
  borderRadius: '0 15px 15px 0',
  borderLeft: 'none',
  fontWeight: 'bold',
  height: '48px',
  fontSize: '18px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  boxShadow: '3px 3px 0 rgba(0,0,0,0.8)',
  marginLeft: '-1px' // Overlap slightly for better appearance
};

// Stepper button styling
const StepperStyle = {
  border: '2px solid black',
  borderRadius: '10px',
  bg: 'primary.300',
  color: 'black',
  boxShadow: '2px 2px 0 rgba(0,0,0,0.8)',
  transition: 'all 0.2s ease',
  _hover: {
    boxShadow: '4px 4px 0 rgba(0,0,0,0.8)',
    transform: 'translateY(-2px)'
  },
  _active: {
    bg: 'primary.400',
    transform: 'translateY(2px)',
    boxShadow: '1px 1px 0 rgba(0,0,0,0.8)'
  }
};

const InputPanel: React.FC<InputPanelProps> = ({
  formData,
  formErrors,
  isTouched,
  isLoading,
  handleInputChange,
  handleCalculation
}) => {
  // Handles decimal input without losing the decimal point during typing
  const handleDecimalInput = (field: keyof FormDataType, value: string) => {
    handleInputChange(field, value);
  };

  // Function to get a numeric value for sliders
  const getNumericValue = (value: string | number): number => {
    if (typeof value === 'string') {
      return parseFloat(value) || 0;
    }
    return value;
  };

  return (
    <BubblyBox 
      bg="accent.100"
      transform="rotate(1deg)"
      className={styles.inputPanel}
    >
      <VStack spacing={6}>
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
          Your Numbers
        </Heading>

        {/* Initial Savings Field */}
        <FormControl isInvalid={!!formErrors.initialSavings && isTouched.initialSavings}>
          <FormLabel color="black" fontWeight="bold">💲 Initial Savings</FormLabel>
          <InputGroup size="lg" className={styles.inputGroup}>
            <InputLeftAddon {...LeftAddonStyle}>
              $
            </InputLeftAddon>
            <NumberInput
              value={formData.initialSavings}
              min={0}
              max={1000000}
              step={100}
              precision={2}
              onChange={(valueAsString) => handleDecimalInput('initialSavings', valueAsString)}
              width="100%"
              size="lg"
              allowMouseWheel
              keepWithinRange={true}
              clampValueOnBlur={true}
              format={(val) => val} // Preserve the input value as is during typing
            >
              <NumberInputField
                {...InputStyle}
                borderRadius="0 15px 15px 0"
                borderLeft="none"
                pl={3}
              />
              <NumberInputStepper mr={3} pr={0} mt="1px" position="absolute" right="2px" height="calc(100% - 2px)" top="1px">
                <NumberIncrementStepper {...StepperStyle} my={1} />
                <NumberDecrementStepper {...StepperStyle} my={1} />
              </NumberInputStepper>
            </NumberInput>
          </InputGroup>
          <FormErrorMessage fontWeight="bold" color="red.600">{formErrors.initialSavings}</FormErrorMessage>
          
          <CartoonSlider
            mt={4}
            aria-label="Initial savings slider"
            value={getNumericValue(formData.initialSavings)}
            min={0}
            max={50000}
            step={500}
            onChange={(value: number) => handleInputChange('initialSavings', value)}
            focusThumbOnChange={false}
          />
        </FormControl>
        
        {/* Monthly Deposit Field */}
        <FormControl isInvalid={!!formErrors.monthlyDeposit && isTouched.monthlyDeposit}>
          <FormLabel color="black" fontWeight="bold">💰 Monthly Deposit</FormLabel>
          <InputGroup size="lg" className={styles.inputGroup}>
            <InputLeftAddon {...LeftAddonStyle}>
              $
            </InputLeftAddon>
            <NumberInput
              value={formData.monthlyDeposit}
              min={0}
              max={10000}
              step={10}
              precision={2}
              onChange={(valueAsString) => handleDecimalInput('monthlyDeposit', valueAsString)}
              width="100%"
              size="lg"
              allowMouseWheel
              keepWithinRange={true}
              clampValueOnBlur={true}
              format={(val) => val} // Preserve the input value as is during typing
            >
              <NumberInputField
                {...InputStyle}
                borderRadius="0 15px 15px 0"
                borderLeft="none"
                pl={3}
              />
              <NumberInputStepper mr={3} pr={0} mt="1px" position="absolute" right="2px" height="calc(100% - 2px)" top="1px">
                <NumberIncrementStepper {...StepperStyle} my={1} />
                <NumberDecrementStepper {...StepperStyle} my={1} />
              </NumberInputStepper>
            </NumberInput>
          </InputGroup>
          <FormErrorMessage fontWeight="bold" color="red.600">{formErrors.monthlyDeposit}</FormErrorMessage>
          
          <CartoonSlider
            mt={4}
            aria-label="Monthly deposit slider"
            value={getNumericValue(formData.monthlyDeposit)}
            min={0}
            max={1000}
            step={10}
            onChange={(value: number) => handleInputChange('monthlyDeposit', value)}
            focusThumbOnChange={false}
          />
        </FormControl>
        
        {/* Interest Rate Field */}
        <FormControl isInvalid={!!formErrors.interestRate && isTouched.interestRate}>
          <FormLabel color="black" fontWeight="bold">✨ Interest Rate (%)</FormLabel>
          <InputGroup size="lg" className={styles.inputGroup}>
            <NumberInput
              value={formData.interestRate}
              min={0}
              max={20}
              step={0.1}
              precision={2}
              onChange={(valueAsString) => handleDecimalInput('interestRate', valueAsString)}
              width="100%"
              size="lg"
              allowMouseWheel
              keepWithinRange={true}
              clampValueOnBlur={true}
              format={(val) => val} // Preserve the input value as is during typing
            >
              <NumberInputField
                {...InputStyle}
                borderRadius="15px"
                pl={3}
                mb={-1}
              />
              <NumberInputStepper ml={0} mr={3} pr={0} mt="1px" position="absolute" right="2px" height="calc(100% - 2px)" top="1px">
                <NumberIncrementStepper {...StepperStyle} my={1} />
                <NumberDecrementStepper {...StepperStyle} my={1} />
              </NumberInputStepper>
            </NumberInput>
          </InputGroup>
          <FormErrorMessage fontWeight="bold" color="red.600">{formErrors.interestRate}</FormErrorMessage>
          
          <CartoonSlider
            mt={4}
            aria-label="Interest rate slider"
            value={getNumericValue(formData.interestRate)}
            min={0}
            max={15}
            step={0.1}
            onChange={(value: number) => handleInputChange('interestRate', value)}
            focusThumbOnChange={false}
          />
        </FormControl>
        
        {/* Years Field */}
        <FormControl isInvalid={!!formErrors.years && isTouched.years}>
          <FormLabel color="black" fontWeight="bold">⏱️ Years</FormLabel>
          <InputGroup size="lg" className={styles.inputGroup}>
            <NumberInput
              value={formData.years}
              min={1}
              max={100}
              step={1}
              precision={0}
              onChange={(valueAsString) => {
                // For years, we should only allow whole numbers
                const intValue = valueAsString.includes('.')
                  ? Math.floor(parseFloat(valueAsString))
                  : valueAsString;
                handleInputChange('years', intValue);
              }}
              width="100%"
              size="lg"
              allowMouseWheel
              keepWithinRange={true}
              clampValueOnBlur={true}
            >
              <NumberInputField
                {...InputStyle}
                pl={3}
                mb={-1}
              />
              <NumberInputStepper mr={3} pr={0} mt="1px" position="absolute" right="2px" height="calc(100% - 2px)" top="1px">
                <NumberIncrementStepper {...StepperStyle} my={1} />
                <NumberDecrementStepper {...StepperStyle} my={1} />
              </NumberInputStepper>
            </NumberInput>
          </InputGroup>
          <FormErrorMessage fontWeight="bold" color="red.600">{formErrors.years}</FormErrorMessage>
          
          <CartoonSlider
            mt={4}
            aria-label="Years slider"
            value={getNumericValue(formData.years)}
            min={1}
            max={50}
            step={1}
            onChange={(value: number) => handleInputChange('years', Math.floor(value))}
            focusThumbOnChange={false}
          />
        </FormControl>
      </VStack>
    </BubblyBox>
  );
};

export default InputPanel; 