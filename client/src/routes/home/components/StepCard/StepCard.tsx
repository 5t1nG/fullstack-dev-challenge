import React from 'react';
import { Box, Text, Circle, useToken } from '@chakra-ui/react';
import styles from './StepCard.module.css';

interface StepCardProps {
  number: number;
  description: string;
  color?: string;
}

const StepCard: React.FC<StepCardProps> = ({ number, description, color = "primary.400" }) => {
  // Get the token values for black and white
  const [black, white] = useToken('colors', ['black', 'white']);
  
  return (
    <Box
      bg={color}
      p={6}
      borderRadius="30px"
      border="4px solid black"
      boxShadow="5px 5px 0px rgba(0, 0, 0, 0.8)"
      transition="all 0.3s"
      position="relative"
      className={styles.stepCard}
      _after={{
        content: '""',
        position: 'absolute',
        bottom: '-12px',
        right: '20px',
        width: '25px',
        height: '25px',
        background: 'white',
        border: '3px solid black',
        borderRadius: '50%',
        zIndex: -1
      }}
      _before={{
        content: '""',
        position: 'absolute',
        bottom: '-8px',
        left: '20px',
        width: '18px',
        height: '18px',
        background: 'white',
        border: '3px solid black',
        borderRadius: '50%',
        zIndex: -1
      }}
    >
      <Circle
        size="50px"
        bg={color}
        color="black"
        border="3px solid black"
        position="absolute"
        top="-15px"
        left="50%"
        transform="translateX(-50%)"
        fontWeight="extrabold"
        fontSize="xl"
        className={styles.numberCircle}
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
      >
        {number}
      </Circle>
      
      <Text 
        mt={7} 
        fontWeight="bold" 
        fontSize="lg" 
        textAlign="center"
        className={styles.description}
      >
        {description}
      </Text>
    </Box>
  );
};

export default StepCard; 