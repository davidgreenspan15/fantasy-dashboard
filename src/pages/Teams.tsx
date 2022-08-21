import React, { FC } from 'react'

import { Flex, Text } from '@chakra-ui/react'

import TeamsList from '../components/TeamsList'

const TeamsPage: FC = () => {
  return (
    <Flex>
      <TeamsList />
    </Flex>
  )
}

export default TeamsPage
