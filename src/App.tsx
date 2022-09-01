import React, { FC } from 'react'

import { BrowserRouter } from 'react-router-dom'

import { ChakraProvider } from '@chakra-ui/react'

import AppRoutes from './AppRoutes'
import FDVStack from './components/CustomChakraComponents/FDVStack'
import NavigationDrawer from './components/Navigation/NavigationDrawer'
import ErrorBoundary from './ErrorBoundry'
import { DataProvider } from './Providers/DataProvider'
import { theme } from './themes/themes'

const App: FC = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ChakraProvider theme={theme}>
          <DataProvider>
            <NavigationDrawer />
            <FDVStack p="20px" pt="100px" h="100%" overflow={'scroll'}>
              <AppRoutes />
            </FDVStack>
          </DataProvider>
        </ChakraProvider>
      </ErrorBoundary>
    </BrowserRouter>
  )
}

export default App
