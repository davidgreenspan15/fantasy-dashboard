import { useEffect } from 'react'

import { useToast } from '@chakra-ui/react'

import { useData } from '../Providers/DataProvider'
import useAxios from './axiosHook'
import { LeagueWithTeamsResponse } from '../types/espnApiV2'

export const useInitializeData = () => {
  const { setLeaguesWithTeams, setLeague, league } = useData()
  const toast = useToast()
  const [{ data, error }] = useAxios<LeagueWithTeamsResponse.League[]>({
    path: 'getLeaguesWithTeams',
    method: 'get',
  })

  useEffect(() => {
    if (error) {
      toast({
        status: 'error',
        title: 'Error getting players',
        description: error.message,
        duration: 5000,
      })
    }
  }, [error, toast])

  useEffect(() => {
    if (data) {
      setLeaguesWithTeams(data)
      const defaultLeague = data.find((l) => l.abbreviation === 'NFL')
      if (defaultLeague && !league) {
        setLeague(defaultLeague)
      }
    }
  }, [data, setLeague, setLeaguesWithTeams, league])
}
