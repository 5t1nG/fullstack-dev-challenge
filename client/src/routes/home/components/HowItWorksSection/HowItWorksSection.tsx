import React from 'react';
import { Box, VStack, Heading, SimpleGrid } from '@chakra-ui/react';
import BubblyButton from '../../../../shared/components/ui/BubblyButton/BubblyButton';
import StepCard from '../StepCard/StepCard';
import styles from './HowItWorksSection.module.css';

interface HowItWorksSectionProps {
  onStartCalculating: () => void;
}

const steps = [
  {
    number: 1,
    description: 'Enter your initial savings and monthly deposits',
    color: 'primary.400'
  },
  {
    number: 2,
    description: 'Set your interest rate and time period',
    color: 'secondary.400'
  },
  {
    number: 3,
    description: 'See your money grow with colorful charts and stats!',
    color: 'accent.400'
  }
];

const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ onStartCalculating }) => {
  return (
    <Box
      bg="white"
      py={10} 
      px={8}
      borderRadius="40px"
      border="6px solid black"
      boxShadow="8px 8px 0px #000000"
      className={styles.howItWorksSection}
      position="relative"
      overflow="hidden"
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'radial-gradient(circle at 20% 30%, #FFFFFF 0%, transparent 20%, transparent 100%)',
        backgroundRepeat: 'repeat',
        backgroundSize: '10% 20%',
        zIndex: 0
      }}
    >
      <VStack spacing={8} align="stretch" position="relative" zIndex={1}>
        <Heading
          as="h2"
          size="xl"
          textAlign="center"
          fontWeight="extrabold"
          color="black"
          textShadow="2px 2px 0 black"
          className={styles.sectionTitle}
        >
          How It Works
        </Heading>
        
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} className={styles.stepsGrid}>
          {steps.map((step) => (
            <StepCard 
              key={step.number}
              number={step.number}
              description={step.description}
              color={step.color}
            />
          ))}
        </SimpleGrid>
        
        <Box textAlign="center" mt={6} className={styles.ctaContainer}>
          <BubblyButton
            onClick={onStartCalculating}
            bg="accent.500"
            color="black"
            size="lg"
            height="auto"
            py={5}
            px={8}
            fontSize="lg"
            fontWeight="extrabold"
            className={styles.ctaButton}
            _hover={{
              bg: "accent.600",
              transform: "rotate(2deg) scale(1.05)"
            }}
          >
            Try it Now!
          </BubblyButton>
        </Box>
      </VStack>
    </Box>
  );
};

export default HowItWorksSection;