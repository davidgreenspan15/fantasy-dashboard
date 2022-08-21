import { Team } from './Teams'

export type Leagues = League[]

export interface LeaguesResponse {
  leagues: Leagues
}

export interface League {
  id: string
  teamsListUrl: string
  abr: string
  createdAt: string
  updatedAt: null
  teams: Team[]
}
