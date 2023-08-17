import React, { FC } from 'react'

import { cloneDeep } from 'lodash'

import { HStack, Input, Switch, Text } from '@chakra-ui/react'

import { ColumnDictionary } from '../../types/ColumnDictionary'
import FDVStack from '../CustomChakraComponents/FDVStack'

const DraftBoardHeaders: FC<{
  columnDictionary: ColumnDictionary
  setColumnDictionary: (columnDictionary: ColumnDictionary) => void
  columnFilter: boolean
  setColumnFilter: (columnFilter: boolean) => void
  includeAvgStats: boolean
  setIncludeAvgStats: (includeAvgStats: boolean) => void
  includeTotalStats: boolean
  setIncludeTotalStats: (includeTotalStats: boolean) => void
  showDrafted: boolean
  setShowDrafted: (showDrafted: boolean) => void
}> = ({
  columnDictionary,
  setColumnDictionary,
  columnFilter,
  setColumnFilter,
  includeAvgStats,
  setIncludeAvgStats,
  includeTotalStats,
  setIncludeTotalStats,
  showDrafted,
  setShowDrafted,
}) => {
  return (
    <FDVStack>
      <Switch onChange={() => setColumnFilter(!columnFilter)}>
        Column Filters
      </Switch>
      <Switch onChange={() => setIncludeAvgStats(!includeAvgStats)}>
        Avg Stats
      </Switch>
      <Switch onChange={() => setIncludeTotalStats(!includeTotalStats)}>
        Total Stats
      </Switch>
      <Switch onChange={() => setShowDrafted(!showDrafted)}>
        Show Drafted
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
    </FDVStack>
  )
}
export default DraftBoardHeaders
