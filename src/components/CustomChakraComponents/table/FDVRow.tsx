import React, { FC, useEffect, useRef } from 'react'

import { Image, TableCellProps, Td, Tr } from '@chakra-ui/react'

import useOnScreen from '../../../hooks/useOnScreen'

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
              displayImage(firstAndLast, idx, isVisible) ? (
                <Image
                  src={
                    value !== '-'
                      ? value
                      : 'https://a.espncdn.com/combiner/i?img=/i/headshots/nophoto.png'
                  }
                  height="40px"
                />
              ) : null
            ) : (
              value
            )}
          </Td>
        )
      })}
    </Tr>
  )
}

export default FDVRow

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
