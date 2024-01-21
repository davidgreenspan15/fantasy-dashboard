import React, { FC, PropsWithChildren } from 'react'

import { Flex } from '@chakra-ui/react'
import FDVStack from '../components/CustomChakraComponents/FDVStack'
import NavigationDrawer from '../components/Navigation/NavigationDrawer'

const ProtectedPage: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Flex flexDirection="column" w="100%">
      <NavigationDrawer />
      <FDVStack p="20px" pt="100px" h="100%" overflow={'scroll'}>
        {children}
      </FDVStack>
    </Flex>
  )
}

export default ProtectedPage
