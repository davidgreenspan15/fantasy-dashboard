/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { PropsWithChildren, useState } from 'react'

import { LeagueWithTeamsResponse } from '../types/espnApiV2'

type DataContextType = {
  leagueResponse?: LeagueWithTeamsResponse.League[]
  setLeagueResponse: (leagueResponse: LeagueWithTeamsResponse.League[]) => void
  leaguesWithTeams?: LeagueWithTeamsResponse.League[]
  setLeaguesWithTeams: (
    leaguesWithTeams: LeagueWithTeamsResponse.League[]
  ) => void
  league?: LeagueWithTeamsResponse.League
  setLeague: (league: LeagueWithTeamsResponse.League) => void
}

const initialCtx: DataContextType = {
  setLeagueResponse: (leagueResponse: LeagueWithTeamsResponse.League[]) => {},
  setLeaguesWithTeams: (
    leaguesWithTeams: LeagueWithTeamsResponse.League[]
  ) => {},
  setLeague: (league: LeagueWithTeamsResponse.League) => {},
}

export const DataContext = React.createContext<DataContextType>(initialCtx)

export const DataProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [leagueResponse, setLeagueResponse] =
    useState<LeagueWithTeamsResponse.League[]>()
  const [leaguesWithTeams, setLeaguesWithTeams] =
    useState<LeagueWithTeamsResponse.League[]>()
  const [league, setLeague] = useState<LeagueWithTeamsResponse.League>()
  const value: DataContextType = {
    leagueResponse: leagueResponse,
    setLeagueResponse: (leagueResponse: LeagueWithTeamsResponse.League[]) =>
      setLeagueResponse(leagueResponse),
    leaguesWithTeams: leaguesWithTeams,
    setLeaguesWithTeams: (leaguesWithTeams: LeagueWithTeamsResponse.League[]) =>
      setLeaguesWithTeams(leaguesWithTeams),
    league: league,
    setLeague: (league: LeagueWithTeamsResponse.League) => setLeague(league),
  }

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export function useData() {
  return React.useContext(DataContext)
}
