import React, { FC } from 'react'

import {
  SmallAddIcon,
  TriangleDownIcon,
  TriangleUpIcon,
} from '@chakra-ui/icons'

const FDVSortIcons: FC<{
  sortSettings?: { column: string; dir: 'up' | 'down'; type: string }
  setSortSettings: React.Dispatch<
    React.SetStateAction<
      | {
          column: string
          dir: 'up' | 'down'
          type: string
        }
      | undefined
    >
  >
  column: string
  type: string
}> = ({ sortSettings, column, setSortSettings, type }) => {
  if (sortSettings && sortSettings.column === column) {
    if (sortSettings.dir === 'up') {
      return (
        <TriangleUpIcon
          onClick={() => {
            setSortSettings({ column, dir: 'down', type })
          }}
        />
      )
    } else {
      return (
        <TriangleDownIcon
          onClick={() => {
            setSortSettings(undefined)
          }}
        />
      )
    }
  }
  return (
    <SmallAddIcon
      onClick={() => {
        setSortSettings({ column, dir: 'up', type })
      }}
    />
  )
}

export default FDVSortIcons
