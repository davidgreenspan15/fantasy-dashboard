import './App.css'

import React, { FC } from 'react'

import { RouterProvider } from 'react-router-dom'

import { ChakraProvider, Image } from '@chakra-ui/react'

import router from './router'
import ErrorBoundary from './ErrorBoundry'
import { DataProvider } from './Providers/DataProvider'
import { theme } from './themes/themes'

const App: FC = () => {
  return (
    <ErrorBoundary>
      <ChakraProvider theme={theme}>
        <Image
          position="fixed"
          width={'100vw'}
          height={'100vh'}
          objectFit="cover"
          src="https://wallpapercave.com/wp/wp2839196.jpg"
          objectPosition={'center'}
          bgRepeat={'no-repeat'}
          zIndex={-1}
        />
        <DataProvider>
          <RouterProvider router={router} />
        </DataProvider>
      </ChakraProvider>
    </ErrorBoundary>
  )
}

export default App
