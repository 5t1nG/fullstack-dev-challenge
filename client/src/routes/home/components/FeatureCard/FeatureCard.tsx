import React from 'react';
import { Box, Heading, Text, useToken } from '@chakra-ui/react';
import styles from './FeatureCard.module.css';

interface FeatureCardProps {
  title: string;
  description: string;
  emoji: string;
  color?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, emoji, color = "primary.300" }) => {
  // Get the token values for black and white
  const [black, white] = useToken('colors', ['black', 'white']);
  
  return (
    <Box
      bg={color}
      p={6}
      borderRadius="30px"
      border="4px solid black"
      boxShadow="5px 5px 0px rgba(0, 0, 0, 0.8)"
      transition="all 0.2s"
      position="relative"
      className={styles.featureCard}
      _after={{
        content: '""',
        position: 'absolute',
        bottom: '-15px',
        right: '30px',
        width: '30px',
        height: '30px',
        background: 'white',
        border: '3px solid black',
        borderRadius: '50%',
        zIndex: -1
      }}
      _before={{
        content: '""',
        position: 'absolute',
        bottom: '-10px',
        left: '25px',
        width: '20px',
        height: '20px',
        background: 'white',
        border: '3px solid black',
        borderRadius: '50%',
        zIndex: -1
      }}
    >
      <Text
        position="absolute"
        top="-12px"
        right="20px"
        width="40px"
        height="40px"
        borderRadius="50%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        fontSize="24px"
        zIndex="1"
        className={styles.emoji}
      >
        {emoji}
      </Text>
      <Box
        position="absolute"
        top="-12px"
        right="20px"
        width="40px"
        height="40px"
        bg={color}
        borderRadius="50%"
        border="3px solid black"
        className={styles.emojiBackground}
        boxShadow={`3px 3px 0 ${black}`}
        _after={{
          content: '""',
          position: 'absolute',
          top: '5px',
          left: '5px',
          width: '10px',
          height: '10px',
          borderRadius: 'full',
          background: white,
          opacity: 0.6
        }}
      />
      <Heading
        as="h3"
        size="md"
        mb={3}
        fontWeight="extrabold"
        color="black"
        className={styles.title}
      >
        {title}
      </Heading>
      <Text color="gray.700" fontWeight="medium" className={styles.description}>
        {description}
      </Text>
    </Box>
  );
};

export default FeatureCard; 