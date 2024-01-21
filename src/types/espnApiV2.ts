export namespace LeagueWithTeamsResponse {
  export interface League {
    id: string
    name: string
    shortName: string
    Teams: Team[]
    abbreviation: string
    Games: Game[]
    Rosters: Roster[]
  }
  export interface Team {
    id: string
    name: string
    abbreviation: string
    displayName: string
    location: string
    imageUrl?: string
  }

  export interface Roster {
    Season: Season
  }
  export interface Game {
    Season: Season
  }
  export interface Season {
    displayYear: string
    type: number
    name: string
  }
}

export interface PlayersResponse {
  uid: string
  firstName: string
  lastName: string
  displayName: string
  imageUrl: string
  number: string
  positionDispalyName: string
  parentPositionDisplayName: string
}

export interface GamesResponse {
  id: string
  espnId: string
  date: string
  name: string
  shortName: string
  week: number
}
