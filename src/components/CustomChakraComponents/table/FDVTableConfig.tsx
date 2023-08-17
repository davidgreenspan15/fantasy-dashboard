import React, { FC } from 'react'

import { HStack, Input, Switch, Text } from '@chakra-ui/react'

import FDVStack from '../FDVStack'

const FDVTableConfig: FC<{
  setColumnDictionary: React.Dispatch<{
    type: string
    value: string
  }>
  columnFilter: boolean
  setColumnFilter: (columnFilter: boolean) => void
}> = ({ setColumnDictionary, columnFilter, setColumnFilter }) => {
  return (
    <FDVStack>
      <Switch onChange={() => setColumnFilter(!columnFilter)}>
        Column Filters
      </Switch>
      <HStack alignItems={'flex-end'}>
        <Text>Search</Text>
        <Input
          h="auto"
          variant="flushed"
          onChange={(e) => {
            setColumnDictionary({ type: 'global', value: e.target.value })
          }}
          w="auto"
        />
      </HStack>
    </FDVStack>
  )
}
export default FDVTableConfig
