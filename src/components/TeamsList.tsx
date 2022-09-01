import React, { FC, useMemo } from 'react'

import { useData } from '../Providers/DataProvider'
import FDVStack from './CustomChakraComponents/FDVStack'
import TeamCard from './TeamCard'

const TeamsList: FC = () => {
  const { league: leagueName, leagueResponse } = useData()

  const league = useMemo(() => {
    return leagueResponse?.find((l) => {
      return l.abr === leagueName
    })
  }, [leagueName, leagueResponse])
  return (
    <FDVStack>
      {league?.teams?.map((t, idx) => {
        return <TeamCard team={t} key={idx} />
      })}
    </FDVStack>
  )
}
export default TeamsList
