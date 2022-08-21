import { Player } from './Players'
export interface Team {
  id: string
  leagueId: string
  depthChartUrl: null | string
  rosterUrl: string
  teamUrl: string
  city: string
  name: string
  abr: string
  imgSrc: string
  createdAt: string
  updatedAt: null
  players: Player[]
}
