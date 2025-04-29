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
      _after={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'#FFFFFF\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
        opacity: 1,
        zIndex: 0
      }}
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
        
        <Box
          position="relative"
          width={{ base: "100%", md: "40%" }}
          height={{ base: "200px", md: "300px" }}
          className={styles.illustration}
        >
          {/* Illustration elements */}
          <Box
            position="absolute"
            width="80%"
            height="80%"
            bg="secondary.200"
            borderRadius="30px"
            border="4px solid black"
            transform="rotate(-5deg)"
            boxShadow="5px 5px 0px #000000"
            className={styles.illustrationElement1}
          />
          <Box
            position="absolute"
            bottom="10%"
            right="5%"
            width="60%"
            height="60%"
            bg="accent.300"
            borderRadius="30px"
            border="4px solid black"
            transform="rotate(8deg)"
            boxShadow="5px 5px 0px #000000"
            className={styles.illustrationElement2}
          />
          <Text
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            fontSize="7xl"
            className={styles.moneyEmoji}
          >
            💸
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default HeroSection; 