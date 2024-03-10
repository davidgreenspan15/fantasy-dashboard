import { FC } from 'react'

import { Link as RRLink } from 'react-router-dom'

import {
  Box,
  Flex,
  HStack,
  Heading,
  Image,
  Link,
  Text,
  useMediaQuery,
} from '@chakra-ui/react'

import FDVStack from './CustomChakraComponents/FDVStack'
import { hexToRgb } from './BackgroundComponent'
import { minWidth } from '../themes/themes'

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
  const isDesktop = useMediaQuery(minWidth)[0]
  const teamName = isDesktop ? team.displayName : team.name
  const fontSize = isDesktop ? undefined : '12px'
  return (
    <FDVStack
      w="100%"
      backgroundColor={
        teamAlternateColor ? hexToRgb(teamAlternateColor, 1) : 'unset'
      }
      overflow={'hidden'}
      borderRadius={10}
    >
      <Flex
        flexDirection={flexDirection}
        justifyContent={'space-between'}
        w="100%"
        alignItems={'center'}
      >
        <HStack flexDirection={flexDirection}>
          <Box
            backgroundColor={teamColor ? hexToRgb(teamColor, 1) : 'unset'}
            p="5px"
          >
            <Image src={team.imageUrl} boxSize={isDesktop ? '50px' : '38px'} />
          </Box>

          <FDVStack w="inherit">
            <HStack>
              {teamColor ? (
                <Text color={teamColor} fontSize={fontSize}>
                  {teamName}
                </Text>
              ) : (
                <>
                  <Text fontSize={fontSize} color={'secondaryColor'}>
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
          <Heading
            px={isDesktop ? '20px' : '10px'}
            fontSize={fontSize}
            color={teamColor}
          >
            {score}
          </Heading>
        )}
      </Flex>
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
