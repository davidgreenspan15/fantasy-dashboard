import React, { FC } from 'react'

import { Flex } from '@chakra-ui/react'

import PlayersTable from '../components/PlayersTable'

const PlayersPage: FC = () => {
  return (
    <Flex>
      <PlayersTable />
    </Flex>
  )
}

export default PlayersPage
