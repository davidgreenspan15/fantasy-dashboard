import React, { FC } from 'react'

import { StackProps, VStack } from '@chakra-ui/react'

const FDVStack: FC<StackProps> = (props) => {
  return <VStack w="100%" alignItems={'100%'} {...props}></VStack>
}
export default FDVStack
