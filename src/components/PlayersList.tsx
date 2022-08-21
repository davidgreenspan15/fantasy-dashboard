import { Button, useQuery } from '@chakra-ui/react'
import React, { FC, useEffect, useMemo, useState } from 'react'

import FDVStack from './CustomChakraComponents/FDVStack'
import PlayerCard from './PlayerCard'
import { Player } from 'src/types/Players'
import { useData } from '../Providers/DataProvider'
import { useLocation } from 'react-router'
import { useSearchParams } from 'react-router-dom'

const PlayersList: FC = () => {
  const { league: leagueName, leagueResponse } = useData()

  let [searchParams] = useSearchParams()

  const teamID = searchParams.get('team')
  const [players, setPlayers] = useState<Player[]>([])
  const [playersLimit, setPlayersLimit] = useState<Player[]>([])

  const league = useMemo(() => {
    return leagueResponse?.find((l) => {
      return l.abr === leagueName
    })
  }, [leagueName, leagueResponse])

  const loadMore = () => {
    const p = players.splice(0, 50)
    setPlayersLimit([...playersLimit, ...p])
    setPlayers(players)
  }
  useEffect(() => {
    if (league) {
      let ps: Player[] = []

      const team = league.teams.find((t) => t.id === teamID)
      if (team) {
        team.players.forEach((p) => {
          ps.push(p)
        })
      } else {
        league.teams?.forEach((t) => {
          t.players.forEach((p) => {
            ps.push(p)
          })
        })
      }

      const pl = [...ps.splice(0, 50)]
      setPlayersLimit(pl)
      setPlayers(ps)
    }
  }, [league, teamID])
  return (
    <FDVStack>
      {playersLimit.map((p, idx) => {
        return <PlayerCard player={p} key={idx} />
      })}
      <Button onClick={loadMore}>Load More</Button>
    </FDVStack>
  )
}
export default PlayersList
