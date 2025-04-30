import React, { useState } from 'react'
import { 
  Box, 
  Flex, 
  Text, 
  Button, 
  IconButton, 
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  VStack,
  useBreakpointValue
} from '@chakra-ui/react'

interface NavLinkProps {
  isActive?: boolean;
  children: React.ReactNode;
  onClick: () => void;
  isMobile?: boolean;
}

const NavLink = ({ isActive = false, children, onClick, isMobile = false }: NavLinkProps) => {
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
      width={isMobile ? "100%" : "auto"}
      my={isMobile ? 2 : 0}
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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });

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
        
        {isMobile ? (
          <>
            <IconButton
              aria-label="Open menu"
              icon={<HamburgerIcon />}
              variant="outline"
              colorScheme="black"
              border="3px solid black"
              bg="white"
              _hover={{ bg: "primary.100" }}
              onClick={onOpen}
            />
            <Drawer
              isOpen={isOpen}
              placement="right"
              onClose={onClose}
            >
              <DrawerOverlay />
              <DrawerContent bg="accent.100" border="3px solid black">
                <DrawerCloseButton 
                  color="black" 
                  size="lg" 
                  bg="white"
                  border="2px solid black"
                  borderRadius="full"
                  _hover={{ bg: "primary.100" }}
                  mt={3}
                  mr={3}
                />
                <DrawerBody pt={14}>
                  <VStack spacing={4} align="stretch">
                    <NavLink 
                      isActive={activePage === 'home'} 
                      onClick={() => {
                        onNavigate('home');
                        onClose();
                      }}
                      isMobile={true}
                    >
                      Home
                    </NavLink>
                    <NavLink 
                      isActive={activePage === 'tool'} 
                      onClick={() => {
                        onNavigate('tool');
                        onClose();
                      }}
                      isMobile={true}
                    >
                      Calculator
                    </NavLink>
                  </VStack>
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </>
        ) : (
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
        )}
      </Flex>
    </Box>
  )
}

const HamburgerIcon = () => (
  <Box>
    <Box as="span" display="block" width="24px" height="3px" bg="black" mb="5px" borderRadius="3px" />
    <Box as="span" display="block" width="24px" height="3px" bg="black" mb="5px" borderRadius="3px" />
    <Box as="span" display="block" width="24px" height="3px" bg="black" borderRadius="3px" />
  </Box>
)

export default NavHeader
