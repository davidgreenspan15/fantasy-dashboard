import {
  Button,
  Table,
  Thead,
  Tbody,
  Text,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Image,
  HStack,
  Heading,
} from '@chakra-ui/react'
import React, { FC, useEffect, useMemo, useState } from 'react'

import FDVStack from './CustomChakraComponents/FDVStack'
import PlayerCard from './PlayerCard'
import { InjuryStatus, Player } from 'src/types/Players'
import { useData } from '../Providers/DataProvider'
import { useLocation } from 'react-router'
import { useSearchParams } from 'react-router-dom'

const PlayersTable: FC = () => {
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

      const pl = [...ps.splice(0, 50)]
      setPlayersLimit(pl)
      setPlayers(ps)
    }
  }, [league, teamID])
  return (
    <FDVStack>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th> </Th>
              <Th p={0}>Player</Th>
              <Th p={0}>Number</Th>
              <Th p={0}>Position</Th>
              <Th p={0}>Position Group</Th>
            </Tr>
          </Thead>
          <Tbody>
            {playersLimit.map((p, idx) => {
              return (
                <Tr key={idx}>
                  <Td p={0} w="min-content">
                    <Image src={p.playerImageSrc} height="40px" />
                  </Td>
                  <Td p={0}>
                    <HStack>
                      <Heading size="sm">{p.name}</Heading>
                      <Text color="red" size="sm">
                        {p.injuryStatus ? ` ${p.injuryStatus}` : null}
                      </Text>
                    </HStack>
                  </Td>
                  <Td p={0}>{p.number}</Td>
                  <Td p={0}>{p.pos}</Td>
                  <Td p={0}>{p.positionGroup}</Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </TableContainer>
      {players.length > 0 ? <Button onClick={loadMore}>Load More</Button> : null}
    </FDVStack>
  )
}
export default PlayersTable
