import React from 'react';
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderProps
} from '@chakra-ui/react';
import styles from './CartoonSlider.module.css';

export interface CartoonSliderProps extends SliderProps {
  // Any custom props
}

const CartoonSlider: React.FC<CartoonSliderProps> = (props) => {
  const { className, ...rest } = props;
  
  return (
    <Slider 
      className={`${styles.cartoonSlider} ${className || ''}`}
      {...rest}
    >
      <SliderTrack 
        h="12px" 
        bg="white" 
        borderRadius="full" 
        border="2px solid black"
        boxShadow="inset 1px 1px 2px rgba(0,0,0,0.2)"
      >
        <SliderFilledTrack 
          bg="secondary.400" 
          borderRadius="full" 
          border="2px solid black"
          borderLeft="none"
          boxShadow="inset 1px 1px 0px rgba(255,255,255,0.3)"
        />
      </SliderTrack>
      <SliderThumb 
        boxSize={8} 
        bg="primary.300" 
        border="3px solid black" 
        boxShadow="3px 3px 0 rgba(0,0,0,0.8)"
      />
    </Slider>
  );
};

export default CartoonSlider; 