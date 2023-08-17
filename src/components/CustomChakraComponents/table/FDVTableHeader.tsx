import React, { FC, useMemo } from 'react'

import { Flex, Input, Th, Thead, Tr } from '@chakra-ui/react'

import { Column } from '../../../types/ColumnDictionary'
import FDVSortIcons from './FDVSortIcons'

const FDVTableHeader: FC<{
  setColumnDictionary: React.Dispatch<{
    type: string
    value: string
  }>
  columnFilter: boolean
  sortSettings: { column: string; dir: 'up' | 'down'; type: string } | undefined
  setSortSettings: React.Dispatch<
    React.SetStateAction<
      | {
          column: string
          dir: 'up' | 'down'
          type: string
        }
      | undefined
    >
  >
  columns: Column[]
}> = ({
  setColumnDictionary,
  columnFilter,
  sortSettings,
  setSortSettings,
  columns,
}) => {
  const filteredColumns = useMemo(() => {
    return columns.filter((c) => c.display)
  }, [])

  return (
    <Thead>
      <Tr>
        {filteredColumns.map((c, idx) => {
          return (
            <Th key={idx}>
              <Flex alignItems={'center'}>
                {c.label ?? c.key}
                {c.canSort && !c.isImage ? (
                  <FDVSortIcons
                    sortSettings={sortSettings}
                    column={c.key}
                    setSortSettings={setSortSettings}
                    type={c.type}
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
                      setColumnDictionary({
                        type: c.key,
                        value: e.target.value,
                      })
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
export default FDVTableHeader
