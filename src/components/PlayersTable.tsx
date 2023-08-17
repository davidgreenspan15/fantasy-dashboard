import React, { FC, useEffect, useMemo, useState } from 'react'

import { useSearchParams } from 'react-router-dom'
import { Column } from 'src/types/ColumnDictionary'
import { Player } from 'src/types/Players'

import { useData } from '../Providers/DataProvider'
import FDVStack from './CustomChakraComponents/FDVStack'
import FDVTable from './CustomChakraComponents/table/FDVTable'

const PlayersTable: FC = () => {
  const { league: leagueName, leagueResponse } = useData()

  const [searchParams] = useSearchParams()

  const teamID = searchParams.get('team')
  const [players, setPlayers] = useState<Player[]>([])

  const league = useMemo(() => {
    return leagueResponse?.find((l) => {
      return l.abr === leagueName
    })
  }, [leagueName, leagueResponse])

  useEffect(() => {
    if (league) {
      const ps: Player[] = []

      const team = league.teams.find((t) => t.id === teamID)
      if (team) {
        team.players
          .sort((a, b) => (a.positionGroup > b.positionGroup ? 1 : -1))
          .forEach((p) => {
            ps.push(p)
          })
      } else {
        league.teams?.forEach((t) => {
          t.players.forEach((p) => {
            ps.push(p)
          })
        })
      }

      setPlayers(ps)
    }
  }, [league, teamID])

  const columns: Column[] = [
    {
      key: 'playerImageSrc',
      label: '',
      columnFilter: false,
      isImage: true,
      canSort: false,
      // sticky: 'left',
      display: true,
      type: 'string',
    },
    {
      key: 'name',
      label: 'Player',
      columnFilter: true,
      isImage: false,
      canSort: true,
      display: true,
      type: 'string',
    },
    {
      key: 'number',
      label: 'Number',
      columnFilter: true,
      isImage: false,
      canSort: true,
      display: true,
      type: 'number',
    },
    {
      key: 'pos',
      label: 'Position',
      columnFilter: true,
      isImage: false,
      canSort: true,
      display: true,
      type: 'string',
    },
    {
      key: 'positionGroup',
      label: 'Position Group',
      columnFilter: true,
      isImage: false,
      canSort: true,
      display: true,
      type: 'string',
    },
  ]
  return (
    <FDVStack>
      <FDVTable rows={players ?? []} columns={columns} limit={200} />
    </FDVStack>
  )
}
export default PlayersTable
