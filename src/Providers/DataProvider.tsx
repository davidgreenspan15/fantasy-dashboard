import React, { PropsWithChildren, useState } from 'react'
import { LeaguesResponse, League } from '../types/LeagueResponse'
import useEffect from 'react'

type DataContextType = {
  leagueResponse?: League[]
  setLeagueResponse: (leagueResponse: League[]) => void
  league: string
  setLeague: (league: string) => void
}

const initialCtx: DataContextType = {
  setLeagueResponse: (leagueResponse: League[]) => {},
  league: 'nfl',
  setLeague: (league: string) => {},
}

export const DataContext = React.createContext<DataContextType>(initialCtx)

export const DataProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [leagueResponse, setLeagueResponse] = useState<League[]>()
  const [league, setLeague] = useState<string>('nfl')
  const value: DataContextType = {
    leagueResponse: leagueResponse,
    setLeagueResponse: (leagueResponse: League[]) => setLeagueResponse(leagueResponse),
    league: league,
    setLeague: (league: string) => setLeague(league),
  }

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export function useData() {
  return React.useContext(DataContext)
}
