import React, { FC } from 'react'

import { Flex, Text } from '@chakra-ui/react'

import PlayersTable from '../components/PlayersTable'

const PlayersPage: FC = () => {
  return (
    <Flex>
      <PlayersTable />
    </Flex>
  )
}

export default PlayersPage
