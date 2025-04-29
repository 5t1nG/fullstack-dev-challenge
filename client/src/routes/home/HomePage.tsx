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
  // Random bubble animations for background
  const randomBubbles = [...Array(8)].map((_, i) => (
    <div
      key={i}
      className={styles.bubble}
      style={{
        width: `${Math.random() * 40 + 20}px`,
        height: `${Math.random() * 40 + 20}px`,
        left: `${Math.random() * 90}%`,
        top: `${Math.random() * 90}%`,
        animationDuration: `${Math.random() * 5 + 3}s`
      }}
    />
  ));

  return (
    <Box py={10} px={4} className={styles.homePage}>
      {randomBubbles}
      <VStack spacing={12} align="stretch" maxW="container.xl" mx="auto">
        <HeroSection onStartCalculating={onStartCalculating} />
        <FeaturesSection />
        <HowItWorksSection onStartCalculating={onStartCalculating} />
      </VStack>
    </Box>
  );
};

export default HomePage; 