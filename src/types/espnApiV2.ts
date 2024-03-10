export namespace LeagueWithTeamsResponse {
  export interface League {
    id: string
    name: string
    shortName: string
    abbreviation: string
    Teams: Team[]
  }

  export interface Team {
    id: string
    name: string
    abbreviation: string
    displayName: string
    location: string
    imageUrl: string
    Division: Division
    GameSeason: Season
    RosterSeason: Season
    alternateColor: string
    color: string
  }

  export interface Division {
    id: string
    name: string
    Conference: Conference
  }
  export interface Conference {
    id: string
    name: string
  }

  export interface Season {
    displayYears: string[]
    types: Type[]
  }

  export interface Type {
    name: Name
    type: number
  }

  export enum Name {
    OffSeason = 'Off Season',
    Postseason = 'Postseason',
    RegularSeason = 'Regular Season',
    SpringTraining = 'Spring Training',
  }
}

export namespace GameSummaryResponse {
  export type AthleteStatisticTypes =
    | PassingStatistic[]
    | RushingStatistic[]
    | ReceivingStatistic[]
    | KickingStatistic[]
    | PuntingStatistic[]
    | KickPuntReturnStatistic[]
    | DefensiveStatistic[]
    | FumbleStatistic[]
    | InterceptionStatistic[]
  export interface GameSummary {
    timeOnClock: string
    period: number
    teams: Team[]
    isComplete: boolean
  }

  export interface Team {
    TeamStatistics?: TeamStatistics
    abbreviation: string
    displayName: string
    id: string
    imageUrl: string
    location: string
    isHome: boolean
    name: string
    color: string
    alternateColor: string
    athletesStatistics: AthleteStatistics
  }

  export interface AthleteStatistics {
    PassingStatistics: PassingStatistic
    RushingStatistics: RushingStatistic
    ReceivingStatistics: ReceivingStatistic
    KickingStatistics: KickingStatistic
    PuntingStatistics: PuntingStatistic
    KickReturnStatistics: KickPuntReturnStatistic
    DefensiveStatistics: DefensiveStatistic
    FumbleStatistics: FumbleStatistic
    InterceptionStatistics: InterceptionStatistic
    PuntReturnStatistics: KickPuntReturnStatistic
  }

  export interface AthleteTotalStatistics {
    PassingStatistics: PassingStatistic
    RushingStatistics: RushingStatistic
    ReceivingStatistics: ReceivingStatistic
    KickingStatistics: KickingStatistic
    PuntingStatistics: PuntingStatistic
    KickReturnStatistics: KickPuntReturnStatistic
    DefensiveStatistics: DefensiveStatistic
    FumbleStatistics: FumbleStatistic
    InterceptionStatistics: InterceptionStatistic
    PuntReturnStatistics: KickPuntReturnStatistic
  }

  export interface DefensiveStatistic {
    displayName: string
    imageUrl: string
    position: DefensiveStatisticPosition
    totalTackles: number
    soloTackles: number
    sacks: number
    tacklesForLoss: number
    passesDefended: number
    qbHits: number
    touchdowns: number
  }

  export enum DefensiveStatisticPosition {
    Cb = 'CB',
    De = 'DE',
    Dt = 'DT',
    LB = 'LB',
    S = 'S',
    Wr = 'WR',
  }

  export interface FumbleStatistic {
    displayName: string
    imageUrl: string
    position: string
    fumbles: number
    lost: number
    recovered: number
  }

  export interface InterceptionStatistic {
    displayName: string
    imageUrl: string
    position: DefensiveStatisticPosition
    interceptions: number
    yards: number
    touchdowns: number
  }

  export interface KickingStatistic {
    displayName: string
    imageUrl: string
    position: string
    fieldGoalAttempts: number
    fieldGoalMade: number
    fieldGoalPct: number
    longest: number
    extraPointAttempts: number
    extraPointMade: number
    totalPoints: number
  }

  export interface PassingStatistic {
    displayName: string
    imageUrl: string
    position: PassingStatisticPosition
    completions: number
    attempts: number
    yards: number
    yardsPerAttempt: number
    touchdowns: number
    interceptions: number
    sacks: number
    sackYardsLost: number
    adjustedRating: number
    rating: number
  }

  export enum PassingStatisticPosition {
    Qb = 'QB',
    Rb = 'RB',
    Te = 'TE',
    Wr = 'WR',
  }

  export interface RushingStatistic {
    displayName: string
    imageUrl: string
    position: PassingStatisticPosition
    yards: number
    touchdowns: number
    longest: number
    attempts: number
    yardsPerAttempt: number
  }

  export interface KickPuntReturnStatistic {
    displayName: string
    imageUrl: string
    position: PassingStatisticPosition
    returns: number
    yards: number
    yardsPerReturn: number
    touchdowns: number
    longest: number
  }

  export interface PuntingStatistic {
    displayName: string
    imageUrl: string
    position: string
    punts: number
    yards: number
    yardsPerPunt: number
    longest: number
    puntsInside20: number
    touchbacks: number
  }

  export interface ReceivingStatistic {
    displayName: string
    imageUrl: string
    position: PassingStatisticPosition
    receptions: number
    targets: number
    yards: number
    yardsPerReception: number
    touchdowns: number
    longest: number
  }

  export enum ParentPositionDisplayName {
    Center = 'Center',
    Defense = 'Defense',
    DefensiveBack = 'Defensive Back',
    Offense = 'Offense',
    SpecialTeams = 'Special Teams',
  }

  export interface TeamStatistics {
    teamScore: number
    teamId: string
    NflStatistic: NflStatistic
    NbaStatistic: null
    NhlStatistic: null
  }

  export interface NflStatistic {
    id: string
    firstDowns: number
    firstDownsPassing: number
    firstDownsRushing: number
    firstDownsPenalty: number
    thirdDownEff: string
    fourthDownEff: string
    totalOffensivePlays: number
    totalYards: number
    yardsPerPlay: number
    totalDrives: number
    netPassingYards: number
    completionsAttempts: string
    yardsPerPass: number
    interceptions: number
    sacks: number
    sackYards: number
    rushingAttempts: number
    rushingYards: number
    yardsPerRushAttempt: number
    redZoneAttempts: number
    redZoneConversions: number
    totalPenalties: number
    totalPenaltyYards: number
    turnovers: number
    fumblesLost: number
    interceptionsThrown: number
    defensiveTds: number
    possessionTime: string
    teamGameStatisticId: string
    athleteTotalStatisticsId: string
    teamId: string
    gameId: string
    AthleteTotalStatistics: AthleteTotalStatistics
  }
}

export interface PlayersResponse {
  uid: string
  firstName: string
  lastName: string
  displayName: string
  imageUrl: string
  number: string
  positionDisplayName: string
  parentPositionDisplayName: string
  rootParentPositionDisplayName: string
}

export interface GamesResponse {
  id: string
  espnId: string
  date: Date
  name: string
  shortName: string
  week: number
  isComplete: boolean
  homeTeamId: string
  awayTeamId: string
  period?: number
  Statistics?: {
    isComplete: boolean
  }
}

export namespace TodaysBirthdaysResponse {
  export interface TodaysBirthdaysResponse {
    fullName: string
    dateOfBirth: string
    birthday: string
    espnUrl: string
    Position: Position
    League: League
    Team: Team
    AthleteGameStatistic: any[]
  }

  export interface Position {
    name: string
    abbreviation: string
  }

  export interface Team {
    id: string
    name: string
    abbreviation: string
    League: League
    Games: Game[]
  }

  export interface Game {
    date: string
    name: string
    week: null
    'Formatted Dated': string
  }

  export interface League {
    abbreviation: string
  }
}
