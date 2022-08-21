import { Button, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { cloneDeep } from 'lodash'
import React, { FC, useEffect, useMemo, useState } from 'react'

import FDVStack from './CustomChakraComponents/FDVStack'

const SQlTable: FC<{ rs?: any[] }> = ({ rs }) => {
  const [rows, setRows] = useState<any[]>([])
  const [rowsLimit, setRowsLimit] = useState<any[]>([])

  const loadMore = () => {
    const r = rows.splice(0, 50)
    setRowsLimit([...rowsLimit, ...r])
    setRows(rows)
  }
  useEffect(() => {
    if (rs) {
      const rsClone = cloneDeep(rs)
      const pl = [...rsClone.splice(0, 50)]
      setRowsLimit(pl)
      setRows(rsClone)
    }
  }, [rs])
  const rowHeaders = useMemo(() => {
    if (rs && rs.length > 0) {
      return Object.keys(rs[0])
    }
  }, [rs])
  return (
    <FDVStack>
      <TableContainer>
        <Table variant="simple">
          <TableCaption placement="top" textAlign={'start'}>
            Rows {rs?.length}
          </TableCaption>
          <Thead>
            <Tr>
              {rowHeaders?.map((h, idx) => {
                return <Th key={idx}> {h}</Th>
              })}
            </Tr>
          </Thead>
          <Tbody>
            {rowsLimit.map((p, idx) => {
              return (
                <Tr key={idx}>
                  {Object.values(p).map((v, i) => {
                    return <Td key={i}>{`${v}`}</Td>
                  })}
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </TableContainer>
      {rows.length > 0 ? <Button onClick={loadMore}>Load More</Button> : null}
    </FDVStack>
  )
}
export default SQlTable
