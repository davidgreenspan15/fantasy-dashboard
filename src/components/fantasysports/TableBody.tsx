import React, { FC, useCallback, useEffect, useMemo, useState } from 'react'

import { cloneDeep } from 'lodash'

import {
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Tbody,
  Td,
  Text,
  Tr,
  useDisclosure,
} from '@chakra-ui/react'

import { NormalizedPlayerResponse } from '../../types/getDraftBoardResponse'
import { columns } from './columns'

export type ColumnDictionary = Record<string, { value?: string; sort?: string }>

const TableBody: FC<{
  columnDictionary: ColumnDictionary
  sortSettings:
    | { column: string; dir: 'up' | 'down'; isNumeric: boolean }
    | undefined
  includeAvgStats: boolean
  includeTotalStats: boolean
  showDrafted: boolean
  players: NormalizedPlayerResponse[]
  setLoadingMore: (loadMore: boolean) => void
}> = ({
  columnDictionary,
  sortSettings,
  includeAvgStats,
  includeTotalStats,
  players,
  showDrafted,
  setLoadingMore,
}) => {
  const [limit, setLimit] = useState(50)
  const [draftedDictionary, setDraftedDictionary] = useState<
    Record<string, boolean>
  >({})
  const filteredList = useMemo(() => {
    if (players) {
      let newPlayers = players
      Object.keys(columnDictionary).forEach((key) => {
        if (key === 'global') {
          newPlayers = globalFilter(
            newPlayers ?? [],
            columnDictionary[key].value ?? ''
          )
        } else {
          newPlayers = filterBy(
            newPlayers ?? [],
            key,
            columnDictionary[key].value ?? ''
          )
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
        return columns.filter((c) => !c.label?.includes('TOTAL'))
      }
    }
    if (includeTotalStats) {
      if (includeAvgStats) {
        return columns
      } else {
        return columns.filter((c) => !c.label?.includes('AVG'))
      }
    }
    return columns.filter(
      (c) => !c.label?.includes('AVG') && !c.label?.includes('TOTAL')
    )
  }, [includeAvgStats, includeTotalStats])

  const handleScroll = useCallback(() => {
    const windowValue = Math.round(
      window.innerHeight + document.documentElement.scrollTop
    )
    const tableValue = Math.round(document.documentElement.offsetHeight)
    if (
      (filteredList?.length ?? 0) > (limitedPlayers?.length ?? 0) &&
      tableValue - windowValue < 2500 &&
      tableValue - windowValue >= 0
    ) {
      setLoadingMore(true)
      setLimit(limit + 50)
    }
  }, [filteredList?.length, limit, limitedPlayers?.length, setLoadingMore])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  useEffect(() => {
    setLoadingMore(false)
  }, [limitedPlayers, setLoadingMore])

  useEffect(() => {
    console.debug({ draftedDictionary })
  }, [draftedDictionary])
  return (
    <Tbody>
      {limitedPlayers?.map((p, idx) => {
        if (!draftedDictionary[p.id] || showDrafted) {
          return (
            <PlayerRow
              key={idx}
              player={p}
              columns={filteredColumns}
              draftDictionary={draftedDictionary}
              setDraftDictionary={setDraftedDictionary}
            />
          )
        }
      })}
    </Tbody>
  )
}
export default TableBody

const filterBy = (
  players: NormalizedPlayerResponse[],
  key: string,
  value: string
) => {
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
  sortSettings?: { column: string; dir: 'up' | 'down'; isNumeric: boolean }
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

const PlayerRow: FC<{
  player: NormalizedPlayerResponse
  columns: {
    key: string
    label?: string
    columnFilter: boolean
    isImage?: boolean
  }[]
  draftDictionary: Record<string, boolean>
  setDraftDictionary: (draftDictionary: Record<string, boolean>) => void
}> = ({ player, columns, draftDictionary, setDraftDictionary }) => {
  const { isOpen, onToggle } = useDisclosure()
  const handleDrafting = () => {
    const clone = cloneDeep(draftDictionary)
    if (draftDictionary[player.id]) {
      clone[player.id] = false
      setDraftDictionary(clone)
    } else {
      clone[player.id] = true
      setDraftDictionary(clone)
    }
  }
  return (
    <>
      <Tr opacity={draftDictionary[player.id] ? 0.3 : 1}>
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
          if (c.key === 'drafted') {
            return (
              <Td
                key={i}
                px={0}
                py={0}
                position="sticky"
                zIndex={1}
                right="1px"
                background="blue.100 !important"
                borderRadius={0}
                transform={'scale(1.02)'}
                boxShadow="-20px 0px 0px 20px #2c5282"
              >
                <Button
                  colorScheme="red"
                  variant="ghost"
                  w="100%"
                  size="lg"
                  onClick={handleDrafting}
                  fontSize={'10px'}
                  transform={'scale(1.02)'}
                  borderRadius={0}
                >
                  {!draftDictionary[player.id] ? 'Draft' : 'Un-Draft'}
                </Button>
              </Td>
            )
          }
          return (
            <Td py={1} px={4} minWidth="100px" w="min-content" key={i}>
              {c.isImage ? (
                <Image
                  src={
                    value !== '-'
                      ? value
                      : 'https://a.espncdn.com/combiner/i?img=/i/headshots/nophoto.png'
                  }
                  height="40px"
                />
              ) : (
                value
              )}
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
            <Text
              size="sm"
              fontWeight={'400'}
              maxW={'80vw'}
              wordBreak="break-word"
              whiteSpace={'break-spaces'}
            >
              {player.notes}
            </Text>
          </Flex>
        </Td>
      </Tr>
    </>
  )
}
