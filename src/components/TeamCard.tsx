import React, { FC } from 'react'
import FDVStack from './CustomChakraComponents/FDVStack'
import { HStack, Image, Link, Text } from '@chakra-ui/react'
import { Team } from 'src/types/Teams'
import { Link as RRLink } from 'react-router-dom'

const TeamCard: FC<{ team: Team }> = ({ team }) => {
  return (
    <FDVStack border="1px solid #DDDDDD" borderRadius={'10px'}>
      <HStack>
        <Image src={team.imgSrc} boxSize="100px" />
        <FDVStack>
          <HStack>
            <Text size="sm" color="secondaryColor">
              {team.city}
            </Text>
            <Text>{team.name}</Text>
          </HStack>
          <HStack>
            <Link as={RRLink} to={`/players?team=${team.id}`}>
              Players
            </Link>
            <Link as={RRLink} to={`/rosters/${team.id}`}>
              Roster
            </Link>
            <Link as={RRLink} to={`/depth_charts?team=${team.id}`}>
              Depth Chart
            </Link>
          </HStack>
        </FDVStack>
      </HStack>
    </FDVStack>
  )
}
export default TeamCard
