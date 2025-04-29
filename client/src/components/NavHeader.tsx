import React from 'react'
import { Box, Flex, Text, Button } from '@chakra-ui/react'

interface NavLinkProps {
  isActive?: boolean;
  children: React.ReactNode;
  onClick: () => void;
}

const NavLink = ({ isActive = false, children, onClick }: NavLinkProps) => {
  return (
    <Button
      onClick={onClick}
      variant="unstyled"
      position="relative"
      height="auto"
      rounded="full"
      px={4}
      py={2}
      fontSize="lg"
      fontWeight="extrabold"
      color="black"
      bg={isActive ? "primary.300" : "white"}
      border="3px solid black"
      boxShadow={isActive ? "5px 5px 0px rgba(0, 0, 0, 0.8)" : "3px 3px 0px rgba(0, 0, 0, 0.8)"}
      transition="all 0.2s"
      _hover={{
        transform: "translateY(-2px)",
        boxShadow: "6px 6px 0px rgba(0, 0, 0, 0.8)",
      }}
      _active={{
        transform: "translateY(2px)",
        boxShadow: "2px 2px 0px rgba(0, 0, 0, 0.8)",
      }}
      mx={2}
    >
      {children}
    </Button>
  )
}

interface NavHeaderProps {
  activePage?: 'home' | 'tool';
  onNavigate: (page: 'home' | 'tool') => void;
}

const NavHeader = ({ activePage = 'tool', onNavigate }: NavHeaderProps) => {
  return (
    <Box
      py={4}
      px={8}
      bg="accent.100"
      borderBottom="4px solid black"
      position="relative"
      zIndex={10}
    >
      <Flex 
        maxW="container.xl" 
        mx="auto"
        alignItems="center" 
        justifyContent="space-between"
      >
        <Flex alignItems="center">
          <Text 
            fontSize="2xl" 
            fontWeight="extrabold" 
            color="black"
            textShadow="2px 2px 0 white"
            mr={2}
          >
            MoneyGrow
          </Text>
          <Text
            fontSize="md"
            fontWeight="bold"
            color="secondary.500"
            transform="rotate(-2deg)"
            bg="white"
            px={2}
            border="2px dashed black"
            borderRadius="full"
          >
            Calculator
          </Text>
        </Flex>
        
        <Flex>
          <NavLink 
            isActive={activePage === 'home'} 
            onClick={() => onNavigate('home')}
          >
            Home
          </NavLink>
          <NavLink 
            isActive={activePage === 'tool'} 
            onClick={() => onNavigate('tool')}
          >
            Calculator
          </NavLink>
        </Flex>
      </Flex>
    </Box>
  )
}

export default NavHeader
