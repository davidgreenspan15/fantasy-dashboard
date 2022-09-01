export const columns: {
  key: string
  label?: string
  columnFilter: boolean
  isImage?: boolean
  isNumeric?: boolean
  canSort: boolean
}[] = [
  { key: 'playerImageSrc', label: '', columnFilter: false, isImage: true, canSort: false },
  { key: 'rank', columnFilter: true, isNumeric: true, canSort: true },
  { key: 'playerName', label: 'Name', columnFilter: true, canSort: true },
  { key: 'avgAdp', label: 'ADP', columnFilter: true, canSort: true },
  { key: 'getRoundAndPick', label: 'Round & Pick', columnFilter: true, canSort: true },
  { key: 'pos', label: 'position', columnFilter: true, canSort: true },
  { key: 'playerDepthPosition', label: 'Depth Position', columnFilter: true, canSort: true },
  { key: 'depth', label: 'depth', columnFilter: true, isNumeric: true, canSort: true },
  { key: 'byeWeek', label: 'Bye Week', columnFilter: true, isNumeric: true, canSort: true },
  { key: 'avgFanPoints', label: 'AVG Points', columnFilter: true, isNumeric: true, canSort: true },
  { key: 'avgPassingYds', label: 'AVG Passing Yds', columnFilter: true, isNumeric: true, canSort: true },
  { key: 'avgPassingTds', label: 'AVG Passing Tds', columnFilter: true, isNumeric: true, canSort: true },
  { key: 'avgReceivingRec', label: 'AVG Receiving Rec', columnFilter: true, isNumeric: true, canSort: true },
  { key: 'avgReceivingYds', label: 'AVG Receiving Yds', columnFilter: true, isNumeric: true, canSort: true },
  { key: 'avgReceivingTds', label: 'AVG Receiving Tds', columnFilter: true, isNumeric: true, canSort: true },
  { key: 'avgRushingAtt', label: 'AVG Rushing ATT', columnFilter: true, isNumeric: true, canSort: true },
  { key: 'avgRushingYds', label: 'AVG Rushing Yds', columnFilter: true, isNumeric: true, canSort: true },
  { key: 'avgRushingTds', label: 'AVG Rushing Tds', columnFilter: true, isNumeric: true, canSort: true },
  { key: 'totalFanPoints', label: 'TOTAL Points', columnFilter: true, isNumeric: true, canSort: true },
  { key: 'totalPassingYds', label: 'TOTAL Passing Yds', columnFilter: true, isNumeric: true, canSort: true },
  { key: 'totalPassingTds', label: 'TOTAL Passing Tds', columnFilter: true, isNumeric: true, canSort: true },
  { key: 'totalReceivingRec', label: 'TOTAL Receiving Rec', columnFilter: true, isNumeric: true, canSort: true },
  { key: 'totalReceivingYds', label: 'TOTAL Receiving Yds', columnFilter: true, isNumeric: true, canSort: true },
  { key: 'totalReceivingTds', label: 'TOTAL Receiving Tds', columnFilter: true, isNumeric: true, canSort: true },
  { key: 'totalRushingAtt', label: 'TOTAL Rushing ATT', columnFilter: true, isNumeric: true, canSort: true },
  { key: 'totalRushingYds', label: 'TOTAL Rushing Yds', columnFilter: true, isNumeric: true, canSort: true },
  { key: 'totalRushingTds', label: 'TOTAL Rushing Tds', columnFilter: true, isNumeric: true, canSort: true },
  { key: 'strengthOgSchedule', label: 'Strength of Schedule', columnFilter: false, canSort: true },
  { key: 'height', label: 'height', columnFilter: true, canSort: true },
  { key: 'weight', label: 'weight', columnFilter: true, canSort: true },
  { key: 'experience', label: 'experience', columnFilter: true, canSort: true },
  { key: 'number', label: 'number', columnFilter: true, isNumeric: true, canSort: true },
  { key: 'teamName', label: 'Team', columnFilter: true, canSort: true },
  { key: 'drafted', label: 'Drafted', columnFilter: false, canSort: false },
]
