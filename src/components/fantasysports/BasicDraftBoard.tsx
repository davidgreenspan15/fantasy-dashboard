import { Flex, Table, TableContainer, Tfoot, Spinner } from '@chakra-ui/react'
import React, { FC, useMemo, useState } from 'react'

import useAxios from '../../hooks/axiosHook'
import { NormalizedPlayerResponse } from '../../types/getDraftBoardResponse'
import FDVStack from '../CustomChakraComponents/FDVStack'
import DraftBoardHeaders from './DraftBoardHeaders'
import TableBody from './TableBody'
import TableHeader from './TableHeader'

export type ColumnDictionary = Record<string, { value?: string; sort?: string }>

const BasicDraftBoard: FC = () => {
  const [{ data, loading }] = useAxios<{ players: NormalizedPlayerResponse[] }>(
    'http://localhost:8000/getDraftBoard',
    'get',
    false,
  )

  const [columnDictionary, setColumnDictionary] = useState<ColumnDictionary>({})
  const [loadingMore, setLoadingMore] = useState(false)

  const [columnFilter, setColumnFilter] = useState(false)
  const [includeAvgStats, setIncludeAvgStats] = useState(false)
  const [includeTotalStats, setIncludeTotalStats] = useState(false)
  const [showDrafted, setShowDrafted] = useState(false)
  const [sortSettings, setSortSettings] = useState<
    { column: string; dir: 'up' | 'down'; isNumeric: boolean } | undefined
  >()
  const players = useMemo(() => {
    setLoadingMore(true)
    if (data && !loading) {
      return data.players
    }
  }, [data, loading])

  return (
    <FDVStack>
      <DraftBoardHeaders
        columnDictionary={columnDictionary}
        setColumnDictionary={setColumnDictionary}
        columnFilter={columnFilter}
        setColumnFilter={setColumnFilter}
        showDrafted={showDrafted}
        setShowDrafted={setShowDrafted}
        includeAvgStats={includeAvgStats}
        setIncludeAvgStats={setIncludeAvgStats}
        includeTotalStats={includeTotalStats}
        setIncludeTotalStats={setIncludeTotalStats}
      />
      <TableContainer>
        <Table variant="striped" size="sm" colorScheme="blue">
          <TableHeader
            columnDictionary={columnDictionary}
            setColumnDictionary={setColumnDictionary}
            columnFilter={columnFilter}
            includeAvgStats={includeAvgStats}
            includeTotalStats={includeTotalStats}
            sortSettings={sortSettings}
            setSortSettings={setSortSettings}
          />
          <TableBody
            columnDictionary={columnDictionary}
            includeAvgStats={includeAvgStats}
            includeTotalStats={includeTotalStats}
            sortSettings={sortSettings}
            players={players ?? []}
            showDrafted={showDrafted}
            setLoadingMore={setLoadingMore}
          />
          <Tfoot>
            {loadingMore ? (
              <Flex pt="10px" position={'absolute'} left="50vw">
                <Spinner />
              </Flex>
            ) : null}
          </Tfoot>
        </Table>
      </TableContainer>
    </FDVStack>
  )
}
export default BasicDraftBoard
