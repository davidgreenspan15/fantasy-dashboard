import './App.css'

import React, { FC } from 'react'

import { RouterProvider } from 'react-router-dom'

import { ChakraProvider } from '@chakra-ui/react'

import router from './router'
import ErrorBoundary from './ErrorBoundry'
import { DataProvider } from './Providers/DataProvider'
import { theme } from './themes/themes'

const App: FC = () => {
  return (
    <ErrorBoundary>
      <ChakraProvider theme={theme}>
        <DataProvider>
          <RouterProvider router={router} />
        </DataProvider>
      </ChakraProvider>
    </ErrorBoundary>
  )
}

export default App
