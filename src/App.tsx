import React, { FC } from 'react'

import { Flex, ChakraProvider, Text, Heading } from '@chakra-ui/react'

import { theme } from './themes/themes'
import ErrorBoundary from './ErrorBoundry'

const App: FC = () => {
  return (
    <ErrorBoundary>
      <ChakraProvider theme={theme}>
        <Flex background="accentColor">
          <Text variant="secondary">Hello</Text>
          <Heading>Hello</Heading>
        </Flex>
      </ChakraProvider>
    </ErrorBoundary>
  )
}

export default App
