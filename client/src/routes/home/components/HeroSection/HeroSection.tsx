import React from 'react';
import { Box, Flex, VStack, Heading, Text } from '@chakra-ui/react';
import BubblyButton from '../../../../shared/components/ui/BubblyButton/BubblyButton';
import styles from './HeroSection.module.css';

interface HeroSectionProps {
  onStartCalculating: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onStartCalculating }) => {
  return (
    <Box
      bg="white"
      py={10} 
      px={8}
      borderRadius="40px"
      border="6px solid black"
      boxShadow="8px 8px 0px #000000"
      position="relative"
      overflow="hidden"
      className={styles.heroSection}
    >
      <Flex 
        direction={{ base: 'column', md: 'row' }} 
        align="center" 
        justify="space-between"
        gap={8}
        position="relative"
        zIndex={1}
      >
        <VStack align="flex-start" spacing={6} maxW={{ base: "100%", md: "50%" }}>
          <Heading
            as="h1"
            size="2xl"
            fontWeight="extrabold"
            color="black"
            lineHeight="1.2"
            className={styles.title}
          >
            Make Your Money Grow With Compound Interest!
          </Heading>
          
          <Text fontSize="xl" fontWeight="bold" color="gray.700" className={styles.subtitle}>
            See how your savings can multiply over time with our fun, 
            easy-to-use calculator. Watch your virtual money pile grow!
          </Text>
          
          <BubblyButton
            onClick={onStartCalculating}
            bg="primary.400"
            color="black"
            size="lg"
            height="auto"
            py={6}
            px={10}
            fontSize="xl"
            fontWeight="extrabold"
            className={styles.ctaButton}
            _hover={{
              bg: "primary.500",
              transform: "translateY(-5px) scale(1.05)",
              boxShadow: "0 15px 25px -5px #000000"
            }}
          >
            Start Calculating!
          </BubblyButton>
        </VStack>
      </Flex>
    </Box>
  );
};

export default HeroSection; 