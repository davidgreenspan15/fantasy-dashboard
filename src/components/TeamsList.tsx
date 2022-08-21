import React, { FC, useMemo } from 'react'
import FDVStack from './CustomChakraComponents/FDVStack'
import { useData } from '../Providers/DataProvider'
import TeamCard from './TeamCard'
import { Leagues, LeaguesResponse } from 'src/types/LeagueResponse'

const TeamsList: FC = () => {
  const { league: leagueName, leagueResponse } = useData()

  const league = useMemo(() => {
    return leagueResponse?.find((l) => {
      return l.abr === leagueName
    })
  }, [leagueName, leagueResponse])
  console.debug({ league })
  return (
    <FDVStack>
      {league?.teams?.map((t, idx) => {
        return <TeamCard team={t} key={idx} />
      })}
    </FDVStack>
  )
}
export default TeamsList
