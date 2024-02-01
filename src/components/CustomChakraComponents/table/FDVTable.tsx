import React, { FC, useMemo, useReducer, useState } from 'react'

import {
  Table,
  TableContainer,
  TableProps,
  TableCaption,
  Button,
  Text,
  ButtonGroup,
} from '@chakra-ui/react'

import { Column, ColumnDictionary } from '../../../types/ColumnDictionary'
import FDVTableBody from './FDVTableBody'
import FDVTableConfig from './FDVTableConfig'
import FDVTableHeader from './FDVTableHeader'

const FDVTable: FC<{
  columns: Column[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rows: any[]
  props?: TableProps
  displayColorsAndConfig?: boolean
  limit?: number
}> = ({ rows, columns, props, limit = 50, displayColorsAndConfig = true }) => {
  const [loadingMore, setLoadingMore] = useState(false)
  const [columnFilter, setColumnFilter] = useState(false)
  const [colorCount, setColorCount] = useState(0)
  const [sortSettings, setSortSettings] = useState<
    { column: string; dir: 'up' | 'down'; type: string } | undefined
  >()

  const reducer = (
    state: ColumnDictionary,
    action: { type: string; value: string }
  ) => {
    state[action.type] = { value: action.value }
    return { ...state }
  }

  const [columnDictionary, setColumnDictionary] = useReducer(reducer, {})
  const schemes = [
    'gray',
    'red',
    'orange',
    'yellow',
    'green',
    'teal',
    'blue',
    'cyan',
    'purple',
    'pink',
    'linkedin',
    'facebook',
    'messenger',
    'whatsapp',
    'twitter',
    'telegram',
  ]
  const memoizedBody = useMemo(() => {
    return (
      <FDVTableBody
        loadingMore={loadingMore}
        columnDictionary={columnDictionary}
        rows={rows}
        sortSettings={sortSettings}
        setLoadingMore={setLoadingMore}
        columns={columns}
        limit={limit}
      />
    )
  }, [columnDictionary, columns, limit, loadingMore, rows, sortSettings])
  const memoizedConfig = useMemo(() => {
    return (
      <FDVTableConfig
        setColumnDictionary={setColumnDictionary}
        columnFilter={columnFilter}
        setColumnFilter={setColumnFilter}
      />
    )
  }, [columnFilter])
  const memoizedHeader = useMemo(() => {
    return (
      <FDVTableHeader
        setColumnDictionary={setColumnDictionary}
        columnFilter={columnFilter}
        sortSettings={sortSettings}
        setSortSettings={setSortSettings}
        columns={columns}
      />
    )
  }, [columnFilter, columns, sortSettings])
  return (
    <TableContainer>
      {displayColorsAndConfig && (
        <>
          <Text> Color Scheme</Text>
          <ButtonGroup gap="2" flexWrap={'wrap'} maxW={'50%'} p="10px">
            {schemes.map((scheme, index) => {
              return (
                <Button
                  size="xs"
                  key={index}
                  onClick={() => {
                    setColorCount(index)
                  }}
                  colorScheme={scheme}
                >
                  {scheme.charAt(0).toUpperCase() + scheme.slice(1)}
                </Button>
              )
            })}
          </ButtonGroup>

          {memoizedConfig}
        </>
      )}

      <Table
        variant="striped"
        size="sm"
        colorScheme={schemes[colorCount]}
        {...props}
      >
        <TableCaption placement="top" textAlign={'start'}>
          Rows {rows.length}
        </TableCaption>
        {memoizedHeader}
        {memoizedBody}
      </Table>
    </TableContainer>
  )
}

export default FDVTable
