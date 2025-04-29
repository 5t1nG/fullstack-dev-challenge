import React from 'react';
import {
  VStack,
  Heading,
  Text,
  SimpleGrid,
  Box,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Badge,
  Spinner,
  HStack
} from '@chakra-ui/react';
import BubblyBox from '../../../../shared/components/ui/BubblyBox/BubblyBox';
import BubblyButton from '../../../../shared/components/ui/BubblyButton/BubblyButton';
import LineChart from '../../../../components/LineChart';
import styles from './ResultsPanel.module.css';

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

interface ResultsPanelProps {
  isLoading: boolean;
  calculationError: string | null;
  results: CalculationResult | null;
  handleCalculation: () => void;
  animations: {
    popAnimation: string;
    jiggleAnimation: string;
  };
}

const ResultsPanel: React.FC<ResultsPanelProps> = ({
  isLoading,
  calculationError,
  results,
  handleCalculation,
  animations
}) => {
  // Prepare chart data from results
  const chartData = {
    xAxis: results ? results.yearlyResults.map(item => item.year.toString()) : ['0'],
    yAxis: results ? results.yearlyResults.map(item => item.endBalance.toString()) : ['0']
  };

  return (
    <BubblyBox 
      bg="secondary.100"
      color="black"
      transform="rotate(-1deg)"
      className={styles.resultsPanel}
    >
      {isLoading ? (
        <VStack justify="center" h="100%" spacing={6} py={10}>
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
      ) : calculationError ? (
        <VStack justify="center" h="100%" spacing={4} py={10}>
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
      ) : results ? (
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
            Your Money Journey! 🎢
          </Heading>
          
          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
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
              animation={animations.popAnimation}
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

          <Box 
            h={{ base: "300px", md: "400px" }} 
            bg="white"
            p={4}
            borderRadius="20px"
            border="3px solid black"
            boxShadow="cartoon"
            transform="rotate(1deg)"
            className={styles.chartContainer}
          >
            <LineChart
              title="Money Mountain 📈"
              xAxisData={chartData.xAxis}
              yAxisData={chartData.yAxis}
              xLabel="Years"
              yLabel="$$$ CASH $$$"
              color="rgba(231, 76, 60, 0.8)"
            />
          </Box>

          {/* Key Insights */}
          <Box 
            mt={4} 
            p={4} 
            bg="accent.100" 
            borderRadius="20px"
            border="3px solid black"
            boxShadow="cartoon"
            transform="rotate(-1deg)"
            className={styles.insightsContainer}
          >
            <Text fontWeight="bold" fontSize="xl" mb={3} textAlign="center">💡 Money Facts 💡</Text>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              <HStack
                bg="white"
                p={3}
                borderRadius="15px"
                border="2px solid black"
              >
                <Badge 
                  colorScheme="purple" 
                  fontSize="xl" 
                  p={1} 
                  borderRadius="full"
                  bg="primary.400"
                  color="black"
                  border="2px solid black"
                >1</Badge>
                <Text fontWeight="bold">
                  Your money will grow {(results.summary.finalBalance / (results.summary.initialInvestment + results.summary.totalDeposited)).toFixed(1)}x over {results.summary.years} years!
                </Text>
              </HStack>
              <HStack
                bg="white"
                p={3}
                borderRadius="15px"
                border="2px solid black"
              >
                <Badge 
                  colorScheme="purple" 
                  fontSize="xl" 
                  p={1} 
                  borderRadius="full"
                  bg="primary.400"
                  color="black"
                  border="2px solid black"
                >2</Badge>
                <Text fontWeight="bold">
                  Magic interest makes up {(results.summary.totalInterestEarned / results.summary.finalBalance * 100).toFixed(1)}% of your final cash pile!
                </Text>
              </HStack>
            </SimpleGrid>
          </Box>
        </VStack>
      ) : (
        <VStack justify="center" h="100%" spacing={4} py={10}>
          <Heading
            size="md" 
            textAlign="center"
            animation={animations.jiggleAnimation}
            fontWeight="bold"
          >
            Enter your details and watch the money magic! ✨
          </Heading>
          <Text textAlign="center" fontWeight="bold">
            Fill out the form to see how much money you'll make!
          </Text>
          <Box 
            mt={4} 
            p={4} 
            bg="primary.200" 
            borderRadius="15px"
            border="3px solid black"
            w="full"
            boxShadow="3px 3px 0 rgba(0,0,0,0.8)"
          >
            <Text fontSize="md" fontWeight="bold">
              <Text as="span" fontWeight="extrabold">PRO TIP:</Text> Adding more money every month is the #1 way to grow your piggy bank! 🐷
            </Text>
          </Box>
        </VStack>
      )}
    </BubblyBox>
  );
};

export default ResultsPanel; 