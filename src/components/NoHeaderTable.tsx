import {
  Image,
  Link,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { capitalize } from 'lodash'
import moment from 'moment-timezone'
import { FC } from 'react'
import { Link as RRLink } from 'react-router-dom'

export interface Column {
  label: string
  key: string
  type: string
  path?: (keys: string) => string
  minWidth?: string
}

const NoHeaderTable: FC<{
  columns: Column[]
  rows: any[]
  showColumnHeaders?: boolean
}> = ({ columns, rows, showColumnHeaders }) => {
  return (
    <TableContainer w="100%">
      <Table variant={'noHeader'}>
        <Thead>
          {showColumnHeaders && (
            <Tr>
              {columns.map((c, i) => (
                <Th key={i} textAlign={'start'}>
                  {c.label}
                </Th>
              ))}
            </Tr>
          )}
        </Thead>
        <Tbody>
          {rows.map((r, idx) => {
            return (
              <Tr key={idx}>
                {columns.map((c, i) => {
                  if (c.type === 'image') {
                    return (
                      <Td key={i}>
                        <Image
                          src={r[c.key]}
                          height={'40px'}
                          w="auto"
                          minW={c.minWidth ?? '40px'}
                        />
                      </Td>
                    )
                  }
                  if (c.type === 'link' && c.path) {
                    const to = c.path(r[c.key])
                    return (
                      <Td key={i}>
                        <Link as={RRLink} to={to.toLowerCase()}>
                          {capitalize(c.label)}
                        </Link>
                      </Td>
                    )
                  }
                  if (c.type === 'date') {
                    return (
                      <Td key={i} textAlign={'start'}>
                        <Text>
                          {moment(r[c.key]).format('MMM DD YYYY hh:mm A')}
                        </Text>
                      </Td>
                    )
                  }
                  return (
                    <Td key={i} textAlign={'start'}>
                      <Text>{r[c.key]}</Text>
                    </Td>
                  )
                })}
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default NoHeaderTable

// const TableHeaderComponent: FC<{
//   columns: Column[]
//   tableHeading: string
//   headerColor?: string
// }> = ({ columns, tableHeading, headerColor }) => {
//   // check if column length is odd or even
//   // if odd create tr with array of th with length of columns
//   // the middle th will have the tableHeading
//   // if (columns.length % 2 === 1) {
//   //   return (
//   //     <Tr>
//   //       {columns.map((c, i) => {
//   //         if (i === Math.floor(columns.length / 2)) {
//   //           return <Th key={i}>{tableHeading}</Th>
//   //         }
//   //         return <Th key={i}></Th>
//   //       })}
//   //     </Tr>
//   //   )
//   // }
//   // if even create tr 1 th with colspan of columns.length
//   return (
//     <Tr>
//       <Th
//         backgroundColor={
//           headerColor ? hexToRgb(`#${headerColor}`, 0.5) : 'unset'
//         }
//         colSpan={columns.length}
//       >
//         {tableHeading}
//       </Th>
//     </Tr>
//   )
// }
