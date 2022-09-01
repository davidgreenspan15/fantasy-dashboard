import { SmallAddIcon, TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'
import { Flex, Input, Th, Thead, Tr } from '@chakra-ui/react'
import { cloneDeep } from 'lodash'
import React, { FC, useMemo, useState } from 'react'

import { ColumnDictionary } from './BasicDraftBoard'
import { columns } from './columns'

const TableHeader: FC<{
  columnDictionary: ColumnDictionary
  setColumnDictionary: (columnDictionary: ColumnDictionary) => void
  columnFilter: boolean
  includeAvgStats: boolean
  includeTotalStats: boolean
  sortSettings: { column: string; dir: 'up' | 'down'; isNumeric: boolean } | undefined
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
}> = ({
  columnDictionary,
  setColumnDictionary,
  columnFilter,
  includeAvgStats,
  includeTotalStats,
  sortSettings,
  setSortSettings,
}) => {
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
    return columns.filter((c) => !c.label?.includes('AVG') && !c.label?.includes('TOTAL'))
  }, [columns, includeAvgStats, includeTotalStats])

  return (
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
  )
}
export default TableHeader

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
