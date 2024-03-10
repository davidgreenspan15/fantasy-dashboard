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

  // Group Teams by Conference and Division
  const conferences = league?.Teams?.reduce((acc, team) => {
    if (!acc[team.Division.Conference.name]) {
      acc[team.Division.Conference.name] = {}
    }
    if (!acc[team.Division.Conference.name][team.Division.name]) {
      acc[team.Division.Conference.name][team.Division.name] = []
    }
    acc[team.Division.Conference.name][team.Division.name].push(team)
    return acc
  }, {} as Record<string, Record<string, LeagueWithTeamsResponse.Team[]>>)

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

      {conferences && (
        <SimpleGrid columns={gridColumns} gap={'10px'} w="100%">
          {Object.keys(conferences).map((c, idx) => {
            return (
              <FDVStack key={idx}>
                <Heading variant="floating" alignSelf={'center'} size={'sm'}>
                  {c}
                </Heading>
                {Object.keys(conferences[c]).map((d, idx) => {
                  return (
                    <BackgroundComponent title={d} key={idx}>
                      <NoHeaderTable
                        columns={columns}
                        rows={conferences[c][d]}
                      />
                    </BackgroundComponent>
                  )
                })}
              </FDVStack>
            )
          })}
        </SimpleGrid>
      )}
      {/* {teamsOfFour?.map((g, idx) => {
          return (
            <BackgroundComponent title={divisions[idx]} key={idx}>
              <NoHeaderTable columns={columns} rows={g} />
            </BackgroundComponent>
          )
        })} */}
    </FDVStack>
  )
}
export default TeamsList
