import React, { FC } from 'react'

import { Column } from '../types/ColumnDictionary'

import FDVStack from './CustomChakraComponents/FDVStack'
import FDVTable from './CustomChakraComponents/table/FDVTable'
import { PlayersResponse } from '../types/espnApiV2'

const PlayersTable: FC<{ players: PlayersResponse[] }> = ({ players }) => {
  const columns: Column[] = [
    {
      key: 'imageUrl',
      label: '',
      columnFilter: false,
      isImage: true,
      canSort: false,
      // sticky: 'left',
      display: true,
      type: 'string',
    },
    {
      key: 'displayName',
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
      key: 'positionDisplayName',
      label: 'Position',
      columnFilter: true,
      isImage: false,
      canSort: true,
      display: true,
      type: 'string',
    },
    {
      key: 'parentPositionDisplayName',
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
