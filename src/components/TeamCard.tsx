import React, { FC } from 'react'

import { Link as RRLink } from 'react-router-dom'

import { Box, HStack, Heading, Image, Link, Text } from '@chakra-ui/react'

import FDVStack from './CustomChakraComponents/FDVStack'

const TeamCard: FC<{
  team: {
    id: string
    name: string
    abbreviation: string
    displayName: string
    location: string
    imageUrl?: string
    color?: string
    alternateColor?: string
  }
  showLinks: boolean
  flexDirection?:
    | 'row'
    | 'row-reverse'
    | 'column'
    | 'column-reverse'
    | undefined
  score?: number
}> = ({ team, showLinks, flexDirection, score }) => {
  const teamColor = team.color && `#${team.color}`
  const teamAlternateColor = team.alternateColor && `#${team.alternateColor}`
  return (
    <FDVStack
      border="1px solid #DDDDDD"
      borderRadius={'10px'}
      w="auto"
      backgroundColor={teamAlternateColor}
      overflow={'hidden'}
      minW={!showLinks ? '320px' : undefined}
    >
      <HStack flexDirection={flexDirection} justifyContent={'space-between'}>
        <HStack flexDirection={flexDirection}>
          <Box backgroundColor={teamColor}>
            <Image src={team.imageUrl} boxSize="100px" />
          </Box>

          <FDVStack w="inherit">
            <HStack>
              {teamColor ? (
                <Text color={teamColor}>{team.displayName}</Text>
              ) : (
                <>
                  <Text size="sm" color={'secondaryColor'}>
                    {team.location}
                  </Text>
                  <Text>{team.name}</Text>
                </>
              )}
            </HStack>

            {showLinks && <TeamLinks teamId={team.id} />}
          </FDVStack>
        </HStack>
        {score !== undefined && (
          <Heading px="20px" size="xl" color={teamColor}>
            {score}
          </Heading>
        )}
      </HStack>
    </FDVStack>
  )
}
export default TeamCard

const TeamLinks: FC<{ teamId: string }> = ({ teamId }) => {
  return (
    <HStack>
      <Link as={RRLink} to={`/players?team=${teamId}`}>
        Players
      </Link>
      <Link as={RRLink} to={`/roster?team=${teamId}`}>
        Roster
      </Link>
      <Link as={RRLink} to={`/depth_charts?team=${teamId}`}>
        Depth Chart
      </Link>
      <Link as={RRLink} to={`/games?team=${teamId}`}>
        Games
      </Link>
    </HStack>
  )
}
