import React from 'react';
import { Button, ButtonProps } from '@chakra-ui/react';
import styles from './BubblyButton.module.css';

export interface BubblyButtonProps extends ButtonProps {
  // Any custom props
}

const BubblyButton: React.FC<BubblyButtonProps> = (props) => {
  const { children, className, ...rest } = props;
  
  return (
    <Button
      className={`${styles.bubblyButton} ${className || ''}`}
      fontWeight="bold"
      fontSize="larger"
      py={6}
      border="3px solid black"
      borderRadius="30px"
      boxShadow="5px 5px 0px rgba(0, 0, 0, 0.8)"
      transition="all 0.2s"
      position="relative"
      _before={{
        content: '""',
        position: 'absolute',
        top: '2px',
        left: '2px',
        right: '2px',
        bottom: '2px',
        borderRadius: '28px',
        border: '2px dotted rgba(0,0,0,0.3)'
      }}
      _hover={{ 
        transform: "translateY(-3px) scale(1.02)",
        boxShadow: "8px 8px 0px rgba(0, 0, 0, 0.8)", 
      }}
      _active={{ 
        transform: "translateY(4px)",
        boxShadow: "2px 2px 0px rgba(0, 0, 0, 0.8)"
      }}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default BubblyButton; 