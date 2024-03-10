import { Heading, SimpleGrid, useMediaQuery } from '@chakra-ui/react'
import { FC } from 'react'

import { useData } from '../Providers/DataProvider'
import { minWidth } from '../themes/themes'
import { LeagueWithTeamsResponse } from '../types/espnApiV2'
import BackgroundComponent from './BackgroundComponent'
import FDVStack from './CustomChakraComponents/FDVStack'
import NoHeaderTable from './NoHeaderTable'

const TeamsList: FC = () => {
  const { league } = useData()

  const teamsOfFour = league?.Teams?.reduce((acc, team, idx) => {
    if (idx % 4 === 0) {
      acc.push([team])
    } else {
      acc[acc.length - 1].push(team)
    }
    return acc
  }, [] as LeagueWithTeamsResponse.Team[][])

  const divisions = [
    'AFC East',
    'AFC North',
    'AFC South',
    'AFC West',
    'NFC East',
    'NFC North',
    'NFC South',
    'NFC West',
  ]
  const columns = [
    { label: 'image', key: 'imageUrl', type: 'image' },
    { label: 'displayName', key: 'displayName', type: 'string' },
    {
      label: 'roster',
      key: 'abbreviation',
      type: 'link',
      path: (k: string) => `${k}/roster`,
    },
    {
      label: 'schedule',
      key: 'abbreviation',
      type: 'link',
      path: (k: string) => `${k}/schedule`,
    },
  ]

  const gridColumns = useMediaQuery(minWidth)[0] ? 2 : 1
  return (
    <FDVStack>
      <Heading variant="floating" alignSelf={'center'}>
        {league?.name}
      </Heading>
      <SimpleGrid columns={gridColumns} gap={'10px'} w="100%">
        {teamsOfFour?.map((g, idx) => {
          return (
            <BackgroundComponent title={divisions[idx]} key={idx}>
              <NoHeaderTable columns={columns} rows={g} />
            </BackgroundComponent>
          )
        })}
      </SimpleGrid>
    </FDVStack>
  )
}
export default TeamsList
