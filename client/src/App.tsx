import { useState } from 'react'
import './styles/App.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import DefaultLayout from './components/layouts/Default'
import theme from './theme'
import HomePage from './routes/home/HomePage'
import CalculatorPage from './routes/calculator/CalculatorPage'


// Create theme with cartoon UI
const cartoonTheme = extendTheme({
  ...theme,
  shadows: {
    cartoon: '5px 5px 0px rgba(0, 0, 0, 0.8)',
    cartoonHover: '8px 8px 0px rgba(0, 0, 0, 0.8)'
  }
})

function App() {
  // Page state
  const [activePage, setActivePage] = useState<'home' | 'tool'>('home')

  // Navigate between pages
  const handleNavigate = (page: 'home' | 'tool') => {
    setActivePage(page)
  }  

    return (
        <ChakraProvider theme={cartoonTheme}>
            <DefaultLayout activePage={activePage} onNavigate={handleNavigate}>
                {activePage === 'home' ? (
                    <HomePage onStartCalculating={() => handleNavigate('tool')} />
                ) : (
                    <CalculatorPage />
                )}
            </DefaultLayout>
        </ChakraProvider>
    )
}

export default App
