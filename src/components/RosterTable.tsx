import { Button, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import React, { FC, useEffect, useMemo, useState } from 'react'
import { Player } from 'src/types/Players'

import FDVStack from './CustomChakraComponents/FDVStack'

const RosterTable: FC<{ ps: Player[]; psGroup: string }> = ({ ps, psGroup }) => {
  const rowHeaders = useMemo(() => {
    if (ps && ps.length > 0) {
      return Object.keys(ps[0])
    }
  }, [ps])
  return (
    <FDVStack>
      <TableContainer>
        <Table variant="simple">
          <TableCaption placement="top" textAlign={'start'}>
            {psGroup}
          </TableCaption>
          <Thead>
            <Tr>
              {rowHeaders?.map((h, idx) => {
                return <Th key={idx}> {h}</Th>
              })}
            </Tr>
          </Thead>
          <Tbody>
            {ps.map((p, idx) => {
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
    </FDVStack>
  )
}
export default RosterTable
