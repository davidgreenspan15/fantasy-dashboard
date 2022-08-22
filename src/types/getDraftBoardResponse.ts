export interface NormalizedPlayerResponse {
  id: string
  playerId: null | string
  rank?: number
  playerName: string
  teamAbr: string
  pos: string
  byeWeek: number | null
  strengthOgSchedule?: string
  avgAdp?: string
  notes?: string
  avgFanPoints?: number
  avgPassingYds?: number
  avgPassingTds?: number
  avgReceivingRec?: number
  avgReceivingYds?: number
  avgReceivingTds?: number
  avgRushingAtt?: number
  avgRushingYds?: number
  avgRushingTds?: number
  totalFanPoints?: number
  totalPassingYds?: number
  totalPassingTds?: number
  totalReceivingRec?: number
  totalReceivingYds?: number
  totalReceivingTds?: number
  totalRushingAtt?: number
  totalRushingYds?: number
  totalRushingTds?: number
  name: string
  injuryStatus: InjuryStatus | null
  depth: number | null
  positionGroup: PositionGroup | null
  playerDepthPosition: string
  playerImageSrc: string
  height: Height | null
  weight: null | string
  number: null | string
  teamName?: string | null
  teamImgSrc?: string | null
  experience: string | null
  getRoundAndPick?: string | null
}

export enum Height {
  The510 = '5\' 10"',
  The511 = '5\' 11"',
  The56 = '5\' 6"',
  The57 = '5\' 7"',
  The58 = '5\' 8"',
  The59 = '5\' 9"',
  The60 = '6\' 0"',
  The61 = '6\' 1"',
  The62 = '6\' 2"',
  The63 = '6\' 3"',
  The64 = '6\' 4"',
  The65 = '6\' 5"',
  The66 = '6\' 6"',
  The67 = '6\' 7"',
  The68 = '6\' 8"',
}

export enum InjuryStatus {
  D = 'D',
  Empty = '',
  IR = 'IR',
  O = 'O',
  Q = 'Q',
  Susp = 'SUSP',
}

export enum PositionGroup {
  Offense = 'Offense',
  SpecialTeams = 'Special Teams',
}
