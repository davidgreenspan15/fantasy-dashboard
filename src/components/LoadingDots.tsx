import React from 'react'
import { Box, Flex } from '@chakra-ui/react'
import { keyframes } from '@emotion/react'

// Keyframes for the animation
const bounce = keyframes`
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1.0); }
`

const LoadingDots = () => {
  return (
    <Flex justify="center">
      {[...Array(3)].map((_, index) => (
        <Box
          key={index}
          as="span"
          mx="1"
          h="10px"
          w="10px"
          bg="rgb(34 94 126)"
          borderRadius="full"
          animation={`${bounce} 1.4s infinite ease-in-out both`}
          style={{ animationDelay: `${-0.32 + index * 0.16}s` }}
        />
      ))}
    </Flex>
  )
}

export default LoadingDots
