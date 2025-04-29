import React from 'react'
import { Box } from '@chakra-ui/react'
import NavHeader from '../NavHeader'

type LayoutProps = {
    children: React.ReactNode;
    activePage: 'home' | 'tool';
    onNavigate: (page: 'home' | 'tool') => void;
}

const DefaultLayout = ({ children, activePage, onNavigate }: LayoutProps) => (
    <Box display="flex" minHeight="100vh" height="100%" flexDirection="column">
        <NavHeader activePage={activePage} onNavigate={onNavigate} />
        <Box flex="1">{children}</Box>
    </Box>
)

export default DefaultLayout
