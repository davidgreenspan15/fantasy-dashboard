import { SmallAddIcon, TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'
import {
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Input,
  Switch,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react'
import { clone, cloneDeep } from 'lodash'
import React, { FC, useEffect, useMemo, useState } from 'react'
import { PlayerResponse } from 'src/types/getDraftBoardResponse'

import useAxios from '../../hooks/axiosHook'
import { NormalizedPlayerResponse } from '../../types/getDraftBoardResponse'
import FDVStack from '../CustomChakraComponents/FDVStack'

const BasicDraftBoard: FC = () => {
  const [columnDictionary, setColumnDictionary] = useState<Record<string, { value?: string; sort?: string }>>({})
  const [limit, setLimit] = useState(50)
  const [columnFilter, setColumnFilter] = useState(false)
  const [includeAvgStats, setIncludeAvgStats] = useState(false)
  const [includeTotalStats, setIncludeTotalStats] = useState(false)
  const [sortSettings, setSortSettings] = useState<
    { column: string; dir: 'up' | 'down'; isNumeric: boolean } | undefined
  >()
  const [{ data, loading, error }, getData] = useAxios<{ players: PlayerResponse[] }>(
    'http://localhost:8000/getDraftBoard',
    'get',
  )
  const players: NormalizedPlayerResponse[] | undefined = useMemo(() => {
    if (data && !loading) {
      return normalizedPlayers(data.players)
    }
  }, [data, loading])
  const filteredList = useMemo(() => {
    if (players) {
      let newPlayers = players
      Object.keys(columnDictionary).forEach((key) => {
        if (key === 'global') {
          newPlayers = globalFilter(newPlayers, columnDictionary[key].value ?? '')
        } else {
          newPlayers = filterBy(newPlayers, key, columnDictionary[key].value ?? '')
        }
      })
      return newPlayers
    }
  }, [players, columnDictionary])

  const sortedPlayers = useMemo(() => {
    return sortRows(filteredList, sortSettings)
  }, [filteredList, sortSettings])

  const limitedPlayers = useMemo(() => {
    if (sortedPlayers) {
      return sortedPlayers.slice(0, limit)
    }
  }, [sortedPlayers, limit])

  const filteredColumns = useMemo(() => {
    if (includeAvgStats) {
      if (includeTotalStats) {
        return columns
      } else {
        return columns.filter((c) => !c.key.includes('total'))
      }
    }
    if (includeTotalStats) {
      if (includeAvgStats) {
        return columns
      } else {
        return columns.filter((c) => !c.key.includes('avg'))
      }
    }
    return columns.filter((c) => !c.key.includes('avg') && !c.key.includes('total'))
  }, [columns, includeAvgStats, includeTotalStats])

  return (
    <FDVStack>
      <Switch onChange={() => setColumnFilter(!columnFilter)} isChecked={columnFilter}>
        Column Filters
      </Switch>
      <Switch onChange={() => setIncludeAvgStats(!includeAvgStats)} isChecked={includeAvgStats}>
        Avg Stats
      </Switch>
      <Switch onChange={() => setIncludeTotalStats(!includeTotalStats)} isChecked={includeTotalStats}>
        Total Stats
      </Switch>

      <HStack alignItems={'flex-end'}>
        <Text>Search</Text>
        <Input
          h="auto"
          variant="flushed"
          onChange={(e) => {
            const dictionaryClone = cloneDeep(columnDictionary)
            dictionaryClone['global'] = { value: e.target.value }
            setColumnDictionary(dictionaryClone)
          }}
          w="auto"
        />
      </HStack>
      <TableContainer>
        <Table variant="striped" size="sm" colorScheme="blue">
          <Thead>
            <Tr>
              {filteredColumns.map((c, idx) => {
                return (
                  <Th key={idx}>
                    <Flex alignItems={'center'}>
                      {c.label ?? c.key}
                      {c.canSort && !c.isImage ? (
                        <SortIcons
                          sortSettings={sortSettings}
                          column={c.key}
                          setSortSettings={setSortSettings}
                          isNumeric={!!c.isNumeric}
                        />
                      ) : null}
                    </Flex>
                  </Th>
                )
              })}
            </Tr>
            {columnFilter ? (
              <Tr>
                {filteredColumns.map((c, idx) => {
                  return (
                    <Th key={idx} py={1}>
                      {c.columnFilter ? (
                        <Input
                          h="auto"
                          w="auto"
                          variant="flushed"
                          onChange={(e) => {
                            const dictionaryClone = cloneDeep(columnDictionary)
                            dictionaryClone[c.key] = { value: e.target.value }
                            setColumnDictionary(dictionaryClone)
                          }}
                        />
                      ) : null}
                    </Th>
                  )
                })}
              </Tr>
            ) : null}
          </Thead>
          <Tbody>
            {limitedPlayers?.map((p, idx) => {
              return <PlayerRow key={idx} player={p} columns={filteredColumns} />
            })}
          </Tbody>
        </Table>
      </TableContainer>
      {(filteredList?.length ?? 0) > (limitedPlayers?.length ?? 0) ? (
        <Button onClick={() => setLimit(limit + 50)}>Load More</Button>
      ) : null}
    </FDVStack>
  )
}
export default BasicDraftBoard

const normalizedPlayers = (players?: PlayerResponse[]) => {
  return players?.reduce((acc, p) => {
    delete p.player?.pos
    let normalizedPlayer: any = {
      ...p,
      ...p.player,
      teamName: p.player?.team['name'] ?? '' + p.player?.team['city'] ?? '',
      teamImgSrc: p.player?.team['imgSrc'],
      playerDepthPosition: p.player?.playerDepthPosition ? p.player?.playerDepthPosition.join(', ') : undefined,
    }
    delete normalizedPlayer['player']
    delete normalizedPlayer['team']

    acc.push(normalizedPlayer as NormalizedPlayerResponse)
    return acc
  }, [] as NormalizedPlayerResponse[])
}

const filterBy = (players: NormalizedPlayerResponse[], key: string, value: string) => {
  return players.filter((p) => {
    if (p) return `${p[key]}`.toLowerCase().includes(value.toLowerCase())
  })
}

const globalFilter = (players: NormalizedPlayerResponse[], value: string) => {
  return players.filter((p) => {
    let returnPlayer = false
    Object.values(p).forEach((p) => {
      if (p && typeof p === 'string') {
        if (p.toLowerCase().includes(value.toLowerCase())) {
          returnPlayer = true
        }
      }
    })
    return returnPlayer
  })
}
const sortRows = (
  rows?: NormalizedPlayerResponse[],
  sortSettings?: { column: string; dir: 'up' | 'down'; isNumeric: boolean },
) => {
  const rowsClone = cloneDeep(rows)
  if (sortSettings) {
    if (sortSettings.isNumeric) {
      return rowsClone?.sort(function (a, b) {
        if (sortSettings.dir === 'up') {
          return a[sortSettings.column] - b[sortSettings.column]
        }
        return b[sortSettings.column] - a[sortSettings.column]
      })
    } else {
      return rowsClone?.sort(function (a, b) {
        if (sortSettings.dir === 'up') {
          if (a[sortSettings.column] < b[sortSettings.column]) {
            return -1
          }
          if (a[sortSettings.column] > b[sortSettings.column]) {
            return 1
          }
        }
        if (sortSettings.dir === 'down') {
          if (a[sortSettings.column] > b[sortSettings.column]) {
            return -1
          }
          if (a[sortSettings.column] < b[sortSettings.column]) {
            return 1
          }
        }
        return 0
      })
    }
  }
  return rowsClone
}

const columns: {
  key: string
  label?: string
  columnFilter: boolean
  isImage?: boolean
  isNumeric?: boolean
  canSort: boolean
}[] = [
  { key: 'playerImageSrc', label: '', columnFilter: false, isImage: true, canSort: false },
  { key: 'rank', columnFilter: true, isNumeric: true, canSort: true },
  { key: 'avgAdp', label: 'ADP', columnFilter: true, canSort: true },
  { key: 'playerName', label: 'Name', columnFilter: true, canSort: true },
  { key: 'pos', label: 'position', columnFilter: true, canSort: true },
  { key: 'playerDepthPosition', label: 'Depth Position', columnFilter: true, canSort: true },
  { key: 'depth', label: 'depth', columnFilter: true, isNumeric: true, canSort: true },
  { key: 'byeWeek', label: 'Bye Week', columnFilter: true, isNumeric: true, canSort: true },
  { key: 'avgFanPoints', label: 'AVG Points', columnFilter: true, isNumeric: true, canSort: true },
  { key: 'avgPassingYds', label: 'AVG Passing Yds', columnFilter: true, isNumeric: true, canSort: true },
  { key: 'avgPassingTds', label: 'AVG Passing Tds', columnFilter: true, isNumeric: true, canSort: true },
  { key: 'avgReceivingRec', label: 'AVG Receiving Rec', columnFilter: true, isNumeric: true, canSort: true },
  { key: 'avgReceivingYds', label: 'AVG Receiving Yds', columnFilter: true, isNumeric: true, canSort: true },
  { key: 'avgReceivingTds', label: 'AVG Receiving Tds', columnFilter: true, isNumeric: true, canSort: true },
  { key: 'avgRushingAtt', label: 'AVG Rushing ATT', columnFilter: true, isNumeric: true, canSort: true },
  { key: 'avgRushingYds', label: 'AVG Rushing Yds', columnFilter: true, isNumeric: true, canSort: true },
  { key: 'avgRushingTds', label: 'AVG Rushing Tds', columnFilter: true, isNumeric: true, canSort: true },
  { key: 'totalFanPoints', label: 'TOTAL Points', columnFilter: true, isNumeric: true, canSort: true },
  { key: 'totalPassingYds', label: 'TOTAL Passing Yds', columnFilter: true, isNumeric: true, canSort: true },
  { key: 'totalPassingTds', label: 'TOTAL Passing Tds', columnFilter: true, isNumeric: true, canSort: true },
  { key: 'totalReceivingRec', label: 'TOTAL Receiving Rec', columnFilter: true, isNumeric: true, canSort: true },
  { key: 'totalReceivingYds', label: 'TOTAL Receiving Yds', columnFilter: true, isNumeric: true, canSort: true },
  { key: 'totalReceivingTds', label: 'TOTAL Receiving Tds', columnFilter: true, isNumeric: true, canSort: true },
  { key: 'totalRushingAtt', label: 'TOTAL Rushing ATT', columnFilter: true, isNumeric: true, canSort: true },
  { key: 'totalRushingYds', label: 'TOTAL Rushing Yds', columnFilter: true, isNumeric: true, canSort: true },
  { key: 'totalRushingTds', label: 'TOTAL Rushing Tds', columnFilter: true, isNumeric: true, canSort: true },
  { key: 'strengthOgSchedule', label: 'Strength of Schedule', columnFilter: false, canSort: true },
  { key: 'height', label: 'height', columnFilter: true, canSort: true },
  { key: 'weight', label: 'weight', columnFilter: true, canSort: true },
  { key: 'experience', label: 'experience', columnFilter: true, canSort: true },
  { key: 'number', label: 'number', columnFilter: true, isNumeric: true, canSort: true },
  { key: 'teamName', label: 'Team', columnFilter: true, canSort: true },
]

const PlayerRow: FC<{
  player: NormalizedPlayerResponse
  columns: { key: string; label?: string; columnFilter: boolean; isImage?: boolean }[]
}> = ({ player, columns }) => {
  const { isOpen, onToggle } = useDisclosure()
  return (
    <>
      <Tr>
        {columns.map((c, i) => {
          const value = player[c.key] ?? '-'
          if (c.key === 'playerName') {
            return (
              <Td key={i} px={4} py={1} onClick={onToggle}>
                <HStack>
                  <Heading size="sm">{value}</Heading>
                  <Text color="red" size="sm">
                    {player.injuryStatus ? ` ${player.injuryStatus}` : null}
                  </Text>
                </HStack>
              </Td>
            )
          }
          return (
            <Td py={1} px={4} minWidth="100px" w="min-content" key={i}>
              {c.isImage ? <Image src={value} height="40px" /> : value}
            </Td>
          )
        })}
      </Tr>
      <Tr hidden>
        <Td colSpan={columns.length}></Td>
      </Tr>
      <Tr hidden={!isOpen}>
        <Td colSpan={columns.length} background="#dddddd !important">
          <Flex pl="30px">
            <Text size="sm" fontWeight={'400'} maxW={'500px'} wordBreak="break-word" whiteSpace={'break-spaces'}>
              {player.notes}
            </Text>
          </Flex>
        </Td>
      </Tr>
    </>
  )
}

const SortIcons: FC<{
  sortSettings?: { column: string; dir: 'up' | 'down'; isNumeric: boolean }
  setSortSettings: React.Dispatch<
    React.SetStateAction<
      | {
          column: string
          dir: 'up' | 'down'
          isNumeric: boolean
        }
      | undefined
    >
  >
  column: string
  isNumeric: boolean
}> = ({ sortSettings, column, setSortSettings, isNumeric }) => {
  if (sortSettings && sortSettings.column === column) {
    if (sortSettings.dir === 'up') {
      return (
        <TriangleUpIcon
          onClick={() => {
            setSortSettings({ column, dir: 'down', isNumeric })
          }}
        />
      )
    } else {
      return (
        <TriangleDownIcon
          onClick={() => {
            setSortSettings(undefined)
          }}
        />
      )
    }
  }
  return (
    <SmallAddIcon
      onClick={() => {
        setSortSettings({ column, dir: 'up', isNumeric })
      }}
    />
  )
}
