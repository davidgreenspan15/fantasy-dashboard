import React, { FC } from 'react'

import { Link as RRLink } from 'react-router-dom'

import { HStack, Image, Link, Text } from '@chakra-ui/react'

import FDVStack from './CustomChakraComponents/FDVStack'

const TeamCard: FC<{
  team: {
    id: string
    name: string
    abbreviation: string
    displayName: string
    location: string
    imageUrl?: string
  }
}> = ({ team }) => {
  return (
    <FDVStack border="1px solid #DDDDDD" borderRadius={'10px'}>
      <HStack>
        <Image src={team.imageUrl} boxSize="100px" />
        <FDVStack>
          <HStack>
            <Text size="sm" color="secondaryColor">
              {team.location}
            </Text>
            <Text>{team.name}</Text>
          </HStack>
          <HStack>
            <Link as={RRLink} to={`/players?team=${team.id}`}>
              Players
            </Link>
            <Link as={RRLink} to={`/roster?team=${team.id}`}>
              Roster
            </Link>
            <Link as={RRLink} to={`/depth_charts?team=${team.id}`}>
              Depth Chart
            </Link>
            <Link as={RRLink} to={`/games?team=${team.id}`}>
              Games
            </Link>
          </HStack>
        </FDVStack>
      </HStack>
    </FDVStack>
  )
}
export default TeamCard
