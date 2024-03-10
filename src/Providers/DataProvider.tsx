/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { PropsWithChildren, useState } from 'react'

import { GamesResponse, LeagueWithTeamsResponse } from '../types/espnApiV2'

type DataContextType = {
  leaguesWithTeams?: LeagueWithTeamsResponse.League[]
  setLeaguesWithTeams: (
    leaguesWithTeams: LeagueWithTeamsResponse.League[]
  ) => void
  league?: LeagueWithTeamsResponse.League
  setLeague: (league: LeagueWithTeamsResponse.League) => void
  team?: LeagueWithTeamsResponse.Team
  setTeam: (team?: LeagueWithTeamsResponse.Team) => void
  games: Record<string, GamesResponse[]>
  setGames: (games: Record<string, GamesResponse[]>) => void
}

const initialCtx: DataContextType = {
  setLeaguesWithTeams: (
    leaguesWithTeams: LeagueWithTeamsResponse.League[]
  ) => {},
  setLeague: (league: LeagueWithTeamsResponse.League) => {},
  setTeam: (team?: LeagueWithTeamsResponse.Team) => {},
  games: {},
  setGames: (games: Record<string, GamesResponse[]>) => {},
}

export const DataContext = React.createContext<DataContextType>(initialCtx)

export const DataProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [leaguesWithTeams, setLeaguesWithTeams] =
    useState<LeagueWithTeamsResponse.League[]>()
  const [league, setLeague] = useState<LeagueWithTeamsResponse.League>()
  const [team, setTeam] = useState<LeagueWithTeamsResponse.Team>()
  const [games, setGames] = useState<Record<string, GamesResponse[]>>({})
  const value: DataContextType = {
    leaguesWithTeams: leaguesWithTeams,
    setLeaguesWithTeams: (leaguesWithTeams: LeagueWithTeamsResponse.League[]) =>
      setLeaguesWithTeams(leaguesWithTeams),
    league: league,
    setLeague: (league: LeagueWithTeamsResponse.League) => setLeague(league),
    team: team,
    setTeam: (team?: LeagueWithTeamsResponse.Team) => setTeam(team),
    games: games,
    setGames: (games: Record<string, GamesResponse[]>) => setGames(games),
  }

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export function useData() {
  return React.useContext(DataContext)
}
