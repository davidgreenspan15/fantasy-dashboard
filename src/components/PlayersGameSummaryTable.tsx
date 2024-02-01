import { FC } from 'react'

import { Column } from '../types/ColumnDictionary'

import FDVStack from './CustomChakraComponents/FDVStack'
import FDVTable from './CustomChakraComponents/table/FDVTable'
import { GameSummaryResponse } from '../types/espnApiV2'
import { upperFirst } from 'lodash'

const PlayersGameSummaryTable: FC<{
  playerStat: GameSummaryResponse.AthleteStatisticTypes
}> = ({ playerStat }) => {
  const columns = Object.keys(playerStat[0]).reduce((acc, key) => {
    if (key === 'athleteId') return acc
    let isImage = false
    if (key === 'imageUrl') {
      isImage = true
    }

    const newColumns: Column[] = [
      {
        key: key,
        label: upperFirst(key),
        columnFilter: true,
        isImage,
        canSort: true,
        display: true,
        type: typeof playerStat[0][key],
      },
    ]
    return [...acc, ...newColumns]
  }, [] as Column[])

  return (
    <FDVStack>
      <FDVTable
        rows={playerStat ?? []}
        columns={columns}
        limit={200}
        displayColorsAndConfig={false}
      />
    </FDVStack>
  )
}
export default PlayersGameSummaryTable
