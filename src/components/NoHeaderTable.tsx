import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import {
  Flex,
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
import _, { capitalize } from 'lodash'
import moment from 'moment-timezone'
import { FC } from 'react'
import { Link as RRLink } from 'react-router-dom'

export interface Column {
  label: string
  key: string
  type: string
  path?: (keys: string) => string
  pathKey?: string
  minWidth?: string
  dateFormat?: string
  imageSrc?: string
}

const NoHeaderTable: FC<{
  columns: Column[]
  rows: any[]
  showColumnHeaders?: boolean
}> = ({ columns, rows, showColumnHeaders }) => {
  // const [page, setPage] = useState(1)
  // const isDesktop = useMediaQuery(minWidth)[0]
  // const paginatedRows = useMemo(() => {
  //   return rows.slice((page - 1) * 50, page * 50)
  // }, [page, rows])

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
                          src={_.get(r, c.key)}
                          height={'40px'}
                          w="auto"
                          minW={c.minWidth ?? '40px'}
                        />
                      </Td>
                    )
                  }
                  if (c.type === 'link' && c.path) {
                    const to = c.path(_.get(r, c.key))
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
                          {moment(_.get(r, c.key)).format(
                            c.dateFormat ?? 'MMM DD YYYY hh:mm A'
                          )}
                        </Text>
                      </Td>
                    )
                  }
                  return (
                    <Td key={i} textAlign={'start'}>
                      <Flex alignItems={'center'}>
                        {c.imageSrc && _.get(r, c.imageSrc) ? (
                          <Image
                            src={_.get(r, c.imageSrc)}
                            height={'40px'}
                            w="auto"
                            minW={c.minWidth ?? '40px'}
                          />
                        ) : null}
                        <Text
                          as={c.path ? RRLink : Text}
                          _hover={
                            c.path ? { textDecoration: 'underline' } : undefined
                          }
                          // @ts-ignore
                          to={
                            c.path
                              ? c
                                  .path(_.get(r, c.pathKey ?? c.key))
                                  .toLowerCase()
                              : undefined
                          }
                        >
                          {_.get(r, c.key)}
                        </Text>
                      </Flex>
                    </Td>
                  )
                })}
              </Tr>
            )
          })}
        </Tbody>

        {/* <Tfoot>
          <Tr position="relative">
            <Th colSpan={isDesktop ? 3 : 1} textAlign={'start'}></Th>
            <Th colSpan={1} textAlign={'start'}>
              <PagePicker rows={paginatedRows} page={page} setPage={setPage} />
            </Th>
            <Th colSpan={1} textAlign={'start'}>
              {paginatedRows.length ?? 0} rows
            </Th>
          </Tr>
        </Tfoot> */}
      </Table>
    </TableContainer>
  )
}

export default NoHeaderTable

const PagePicker: FC<{
  rows: any[]
  page: number
  setPage: (page: number) => void
}> = ({ rows, page, setPage }) => {
  const pages = Math.ceil(rows.length / 50)
  return (
    <Flex>
      {page > 1 && <ChevronLeftIcon onClick={() => setPage(page - 1)} />}
      <Text>{page}</Text>
      {page === pages && <ChevronRightIcon onClick={() => setPage(page + 1)} />}
    </Flex>
  )
}

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
