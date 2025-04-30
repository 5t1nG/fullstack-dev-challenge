import React from 'react';
import { Box, VStack } from '@chakra-ui/react';
import HeroSection from './components/HeroSection/HeroSection';
import FeaturesSection from './components/FeaturesSection/FeaturesSection';
import HowItWorksSection from './components/HowItWorksSection/HowItWorksSection';
import styles from './home.module.css';

interface HomePageProps {
  onStartCalculating: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onStartCalculating }) => {
  return (
    <Box py={10} px={4} className={styles.homePage}>
      <VStack spacing={12} align="stretch" maxW="container.xl" mx="auto">
        <HeroSection onStartCalculating={onStartCalculating} />
        <FeaturesSection />
        <HowItWorksSection onStartCalculating={onStartCalculating} />
      </VStack>
    </Box>
  );
};

export default HomePage; 