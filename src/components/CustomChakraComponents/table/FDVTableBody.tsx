import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react'

import { cloneDeep } from 'lodash'

import {
  Flex,
  Image,
  Spinner,
  TableCellProps,
  Tbody,
  Td,
  Tr,
} from '@chakra-ui/react'

import useOnScreen from '../../../hooks/useOnScreen'
import { Column, ColumnDictionary } from '../../../types/ColumnDictionary'

const FDVTableBody: FC<{
  columnDictionary: ColumnDictionary
  sortSettings: { column: string; dir: 'up' | 'down'; type: string } | undefined
  rows: any[]
  columns: Column[]
  loadingMore: boolean
  setLoadingMore: (loadMore: boolean) => void
  limit: number
}> = ({
  columnDictionary,
  sortSettings,
  rows,
  loadingMore,
  setLoadingMore,
  columns,
  limit,
}) => {
  const reducer = (
    state: Record<number, string>,
    action: { type: string; value: any; idx: number }
  ) => {
    switch (action.type) {
      default:
        state[action.idx] = action.value
        return { ...state }
    }
  }
  const [visibilityIndex, setVisibilityIndex] = useReducer(reducer, {})

  const [offset, setOffset] = useState(0)
  const filteredList = useMemo(() => {
    if (rows) {
      let newRows = rows
      Object.keys(columnDictionary).forEach((key) => {
        newRows =
          key === 'global'
            ? globalFilter(newRows ?? [], columnDictionary[key].value ?? '')
            : filterBy(newRows ?? [], key, columnDictionary[key].value ?? '')
      })
      return newRows
    }
  }, [rows, columnDictionary])

  const sortedRows = useMemo(() => {
    return sortRows(filteredList, sortSettings)
  }, [filteredList, sortSettings])

  const limitedRows = useMemo(() => {
    if (sortedRows) {
      return sortedRows.slice(0, offset + limit)
    }
  }, [sortedRows, offset, limit])

  const filteredColumns = useMemo(() => {
    return columns.filter((c) => c.display)
  }, [])

  const handleScroll = useCallback(() => {
    const windowValue = Math.round(
      window.innerHeight + document.documentElement.scrollTop
    )
    const tableValue = Math.round(document.documentElement.offsetHeight)
    if (
      (filteredList?.length ?? 0) > (limitedRows?.length ?? 0) &&
      tableValue - windowValue < 2500 &&
      tableValue - windowValue >= 0
    ) {
      setLoadingMore(true)
      setOffset(offset + 50)
    }
  }, [filteredList?.length, limitedRows?.length, offset, setLoadingMore])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  useEffect(() => {
    setLoadingMore(false)
  }, [limitedRows, setLoadingMore])

  const firstAndLast = useMemo(() => {
    const keys = Object.keys(visibilityIndex)
    let first = keys.length
    let last = 0
    keys.forEach((key) => {
      const numberKeys = parseInt(key)
      if (visibilityIndex[numberKeys]) {
        if (numberKeys < first) {
          first = numberKeys
        }
        if (last < numberKeys) {
          last = numberKeys
        }
      }
    })
    return { first, last }
  }, [visibilityIndex])

  return (
    <Tbody>
      {limitedRows?.map((p, idx) => {
        return (
          <FDVRow
            key={idx}
            row={p}
            columns={filteredColumns}
            visibilityIndex={visibilityIndex}
            setVisibilityIndex={setVisibilityIndex}
            firstAndLast={firstAndLast}
            idx={idx}
          />
        )
      })}
      {loadingMore ? (
        <Flex pt="10px" position={'absolute'} left="50vw" as={Tr}>
          <Flex as={Td}>
            <Spinner />
          </Flex>
        </Flex>
      ) : null}
    </Tbody>
  )
}
export default FDVTableBody

function filterBy(rows: any[], key: string, value: string) {
  return rows.filter((p) => {
    if (p) return `${p[key]}`.toLowerCase().includes(value.toLowerCase())
  })
}

function globalFilter(rows: any[], value: string) {
  return rows.filter((p) => {
    let returnRow = false
    Object.values(p).forEach((p) => {
      if (p && typeof p === 'string') {
        if (p.toLowerCase().includes(value.toLowerCase())) {
          returnRow = true
        }
      }
    })
    return returnRow
  })
}
function sortRows(
  rows?: any[],
  sortSettings?: { column: string; dir: 'up' | 'down'; type: string }
): any[] | undefined {
  const rowsClone = cloneDeep(rows)
  if (sortSettings) {
    if (sortSettings.type === 'number') {
      return rowsClone?.sort(function (a, b) {
        if (sortSettings.dir === 'up') {
          return a[sortSettings.column] - b[sortSettings.column]
        }
        return b[sortSettings.column] - a[sortSettings.column]
      })
    }
    if (sortSettings.type === 'string') {
      return rowsClone?.sort(function (a, b) {
        if (sortSettings.dir === 'up') {
          if (a[sortSettings.column] < b[sortSettings.column]) {
            return -1
          }
          if (a[sortSettings.column] > b[sortSettings.column]) {
            return 1
          }
        }
        if (sortSettings.dir === 'down') {
          if (a[sortSettings.column] > b[sortSettings.column]) {
            return -1
          }
          if (a[sortSettings.column] < b[sortSettings.column]) {
            return 1
          }
        }
        return 0
      })
    }
  }
  return rowsClone
}

const FDVRow: FC<{
  row: any[]
  columns: {
    key: string
    label?: string
    columnFilter: boolean
    isImage?: boolean
    sticky?: string
  }[]
  setVisibilityIndex: React.Dispatch<{
    type: string
    value: any
    idx: number
  }>
  visibilityIndex: Record<number, string>
  idx: number
  firstAndLast: { first: number; last: number }
}> = ({ row, columns, setVisibilityIndex, idx, firstAndLast }) => {
  function stickyProps(c: {
    key: string
    label?: string
    columnFilter: boolean
    isImage?: boolean
    sticky?: string
  }): TableCellProps | null {
    if (!c.sticky) {
      return null
    }
    const props: TableCellProps = {
      px: 0,
      py: 0,
      position: 'sticky',
      zIndex: 1,
      background: 'blue.100 !important',
      borderRadius: 0,
      transform: 'scale(1.02)',
      boxShadow: '-20px 0px 0px 20px #2c5282',
    }
    if (c.sticky === 'left') {
      props['left'] = '0px'
    }
    if (c.sticky === 'right') {
      props['right'] = '0px'
    }
    return props
  }

  const ref = useRef<any>()
  const isVisible = useOnScreen(ref)
  useEffect(() => {
    setVisibilityIndex({ type: 'visibility', value: isVisible, idx })
  }, [idx, isVisible, setVisibilityIndex])

  return (
    <Tr ref={ref}>
      {columns.map((c, i) => {
        const value = row[c.key] ?? '-'
        const props = stickyProps(c)

        return (
          <Td
            py={1}
            px={4}
            {...props}
            minWidth={props ? '60px' : '100px'}
            w="min-content"
            key={i}
          >
            {c.isImage ? (
              !displayImage(firstAndLast, idx, isVisible) ? null : (
                <Image
                  src={
                    value !== '-'
                      ? value
                      : 'https://a.espncdn.com/combiner/i?img=/i/headshots/nophoto.png'
                  }
                  height="40px"
                />
              )
            ) : (
              value
            )}
          </Td>
        )
      })}
    </Tr>
  )
}

function displayImage(
  firstAndLast: { first: number; last: number },
  idx: number,
  isVisible: boolean
) {
  const { first, last } = firstAndLast
  if (isVisible) {
    return true
  }
  if (idx < last + 100 && idx > first - 100) {
    return true
  }

  return false
}
