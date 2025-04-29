import React from 'react';
import { Box, BoxProps } from '@chakra-ui/react';
import styles from './BubblyBox.module.css';

// Function to generate bubbly border radius
const bubbleBorderRadius = () => {
  const values = [20, 30, 40, 25, 35];
  return values.map(v => `${v}px`).join(' ');
};

export interface BubblyBoxProps extends BoxProps {
  // Add any additional props specific to BubblyBox
}

const BubblyBox: React.FC<BubblyBoxProps> = (props) => {
  const { children, className, ...rest } = props;
  
  return (
    <Box
      className={`${styles.bubblyBox} ${className || ''}`}
      bg="white"
      p={5}
      borderRadius={bubbleBorderRadius()}
      border="4px solid black"
      boxShadow="5px 5px 0px rgba(0, 0, 0, 0.8)"
      position="relative"
      {...rest}
    >
      {children}
    </Box>
  );
};

export default BubblyBox; 