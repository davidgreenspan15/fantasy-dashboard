import React, { FC, useMemo, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useData } from '../Providers/DataProvider'
import { Player } from '../types/Players'
import FDVStack from '../components/CustomChakraComponents/FDVStack'
import RosterTable from '../components/RosterTable'

const Roster: FC = () => {
  const { id } = useParams<{ id?: string }>()

  const { league: leagueName, leagueResponse } = useData()
  const [playerMap, setPlayerMap] = useState<Record<string, Player[]>>({})
  const league = useMemo(() => {
    return leagueResponse?.find((l) => {
      return l.abr === leagueName
    })
  }, [leagueName, leagueResponse])

  useEffect(() => {
    if (league) {
      let ps: Record<string, Player[]> = {}

      const t = league.teams.find((t) => t.id === id)
      if (t) {
        t.players.forEach((p) => {
          if (ps[p.positionGroup]) {
            ps[p.positionGroup].push(p)
          } else {
            ps[p.positionGroup] = []
            ps[p.positionGroup].push(p)
          }
        })
      }

      setPlayerMap(ps)
    }
  }, [league, id])
  if (!id) {
    return null
  }

  return (
    <FDVStack>
      {Object.keys(playerMap).map((k) => {
        return <RosterTable ps={playerMap[k]} psGroup={k} />
      })}
    </FDVStack>
  )
}

export default Roster