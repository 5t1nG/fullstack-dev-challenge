import React from 'react';
import { VStack, Heading, SimpleGrid, Box } from '@chakra-ui/react';
import FeatureCard from '../FeatureCard/FeatureCard';
import styles from './FeaturesSection.module.css';

const features = [
  {
    title: 'Easy Calculations',
    description: 'Simple sliders and inputs make it fun to experiment with different savings scenarios.',
    color: 'primary.300'
  },
  {
    title: 'Visual Charts',
    description: 'See your money growth in colorful graphs that make financial planning exciting!',
    color: 'secondary.300'
  },
  {
    title: 'Compound Magic',
    description: 'Watch how the miracle of compound interest turns small savings into big treasures.',
    color: 'accent.300'
  },
  {
    title: 'Real-time Updates',
    description: 'Instantly see how changing numbers affects your financial future.',
    color: 'teal.300'
  },
  {
    title: 'Mobile Friendly',
    description: 'Calculate on any device - your finance buddy is always with you!',
    color: 'purple.300'
  },
  {
    title: 'Fun Interface',
    description: "Finance doesn't have to be boring - our playful design makes money fun!",
    color: 'orange.300'
  }
];

const FeaturesSection: React.FC = () => {
  return (
    <VStack spacing={8} align="stretch" className={styles.featuresSection} bg="rgba(255, 255, 255, 0)">
      <Box
        position="relative"
        py={5}
        overflow="hidden"
      >
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          opacity={1}
          zIndex={-1}
          borderRadius="full"
          transform="scale(1.2)"
        />
        <Heading
          as="h2"
          size="xl"
          textAlign="center"
          fontWeight="extrabold"
          color="black"
          textShadow="2px 2px 0 white"
          py={3}
          borderRadius="full"
          border="3px solid black"
          mx="auto"
          bg="white"
          maxW="fit-content"
          px={8}
          boxShadow="4px 4px 0px #000000"
          className={styles.sectionTitle}
        >
          ✨ Super Cool Features! ✨
        </Heading>
      </Box>
      
      <SimpleGrid 
        columns={{ base: 1, md: 2, lg: 3 }} 
        spacing={8} 
        className={styles.featureGrid}
        bg="white"
        p={8}
        borderRadius="30px"
        border="6px solid #000000"
        position="relative"
        _before={{
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bg: "#FFFFFF",
          backdropFilter: "blur(10px)",
          borderRadius: "26px",
          zIndex: -1,
        }}
      >
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            title={feature.title}
            description={feature.description}
            color={feature.color}
          />
        ))}
      </SimpleGrid>
    </VStack>
  );
};

export default FeaturesSection; 