import React, { FC } from 'react'

import { Flex } from '@chakra-ui/react'

import { Outlet } from 'react-router-dom'

const TeamsPage: FC = () => {
  return (
    <Flex w="100%">
      <Outlet />
    </Flex>
  )
}

export default TeamsPage
