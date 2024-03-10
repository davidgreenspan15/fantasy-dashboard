import React, { FC, useEffect } from 'react'

import { Flex } from '@chakra-ui/react'

import { Outlet, useParams } from 'react-router-dom'
import { useData } from '../Providers/DataProvider'

const LeaguePage: FC = () => {
  const { league: leagueParam, team: teamsParam } = useParams<{
    league: string
    team?: string
  }>()

  const { leaguesWithTeams, setLeague, team, setTeam } = useData()

  useEffect(() => {
    if (leagueParam) {
      const league = leaguesWithTeams?.find(
        (l) => l.abbreviation.toLowerCase() === leagueParam
      )
      if (league) setLeague(league)
      if (team && !teamsParam) setTeam(undefined)
    }
  }, [leagueParam, leaguesWithTeams, setLeague, setTeam, team, teamsParam])

  return (
    <Flex>
      <Outlet />
    </Flex>
  )
}

export default LeaguePage
