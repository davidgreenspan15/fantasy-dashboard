import React, { FC } from 'react'

import { Column } from '../types/ColumnDictionary'

import FDVStack from './CustomChakraComponents/FDVStack'
import FDVTable from './CustomChakraComponents/table/FDVTable'
import { GamesResponse } from '../types/espnApiV2'
import { useNavigate } from 'react-router-dom'

const GamesTable: FC<{ games: GamesResponse[] }> = ({ games }) => {
  const navigate = useNavigate()
  const columns: Column[] = [
    {
      key: 'name',
      label: 'Name',
      columnFilter: true,
      isImage: false,
      canSort: true,
      display: true,
      type: 'string',
      onClick: (id?: string) =>
        id ? navigate(`/gameSummary?game=${id}`) : null,
    },
    {
      key: 'date',
      label: 'Date',
      columnFilter: true,
      isImage: false,
      canSort: true,
      display: true,
      type: 'date',
    },
    {
      key: 'isComplete',
      label: 'Completed',
      columnFilter: true,
      isImage: false,
      canSort: true,
      display: true,
      type: 'string',
    },
  ]
  return (
    <FDVStack>
      <FDVTable rows={games ?? []} columns={columns} limit={200} />
    </FDVStack>
  )
}
export default GamesTable
