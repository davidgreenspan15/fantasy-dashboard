import React, { FC } from 'react'

import { Link } from 'react-router-dom'

import { Button } from '@chakra-ui/react'

const NavigationRouteOptions: FC<{ route: string }> = ({ route }) => {
  return (
    <Button
      variant={'outline'}
      borderRadius={0}
      borderTop="none"
      borderLeft="none"
      borderRight="none"
      as={Link}
      to={route}
      justifyContent="flex-start"
      textTransform={'capitalize'}
    >
      {route}
    </Button>
  )
}
export default NavigationRouteOptions
