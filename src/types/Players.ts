export interface Player {
  id: string
  teamId: string
  name: string
  injuryStatus: InjuryStatus | null
  pos: string
  depth: number | null
  positionGroup: PositionGroup
  wrSet: number | null
  playerUrl: string
  playerImageSrc: string
  height: string
  weight: string
  experience: string
  college: string
  age: string
  number: string
  playerDepthPosition: PlayerDepthPosition[]
  createdAt: string
  updatedAt: null
  leagueId: string
  fantasyProsData: FantasyProsData | null
}

export interface FantasyProsData {
  id: string
  playerId: string
  rank: number
  playerName: string
  teamAbr: string
  pos: string
  byeWeek: number
  strengthOgSchedule: string
  avgAdp: string
  notes: string
  avgFanPoints: number
  avgPassingYds: number
  avgPassingTds: number
  avgReceivingRec: number
  avgReceivingYds: number
  avgReceivingTds: number
  avgRushingAtt: number
  avgRushingYds: number
  avgRushingTds: number
  totalFanPoints: number
  totalPassingYds: number
  totalPassingTds: number
  totalReceivingRec: number
  totalReceivingYds: number
  totalReceivingTds: number
  totalRushingAtt: number
  totalRushingYds: number
  totalRushingTds: number
  createdAt: string
  updatedAt: null
}

export enum InjuryStatus {
  D = 'D',
  DD = 'DD',
  Empty = '',
  IR = 'IR',
  O = 'O',
  Q = 'Q',
  Susp = 'SUSP',
}

export enum PlayerDepthPosition {
  C = 'C',
  CF = 'CF',
  Cl = 'CL',
  Dh = 'DH',
  FS = 'FS',
  Fb = 'FB',
  H = 'H',
  Kr = 'KR',
  LF = 'LF',
  Lcb = 'LCB',
  Lde = 'LDE',
  Ldt = 'LDT',
  Lg = 'LG',
  Lilb = 'LILB',
  Ls = 'LS',
  Lt = 'LT',
  Mlb = 'MLB',
  NT = 'NT',
  P = 'P',
  PG = 'PG',
  PR = 'PR',
  Pf = 'PF',
  Pk = 'PK',
  Qb = 'QB',
  RF = 'RF',
  Rb = 'RB',
  Rcb = 'RCB',
  Rde = 'RDE',
  Rdt = 'RDT',
  Rg = 'RG',
  Rilb = 'RILB',
  Rp = 'RP',
  Rt = 'RT',
  Sf = 'SF',
  Sg = 'SG',
  Slb = 'SLB',
  Ss = 'SS',
  Te = 'TE',
  The1B = '1B',
  The2B = '2B',
  The3B = '3B',
  Wlb = 'WLB',
  Wr = 'WR',
}

export enum PositionGroup {
  Catchers = 'Catchers',
  Centers = 'Centers',
  Defense = 'Defense',
  DesignatedHitter = 'Designated Hitter',
  Goalies = 'Goalies',
  Infielders = 'Infielders',
  LeftWings = 'Left Wings',
  Offense = 'Offense',
  Outfielders = 'Outfielders',
  Pitchers = 'Pitchers',
  RightWings = 'Right Wings',
  SpecialTeams = 'Special Teams',
  TeamRoster = 'Team Roster',
}
