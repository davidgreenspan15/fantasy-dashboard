import { useEffect } from 'react'

import { useToast } from '@chakra-ui/react'

import { useData } from '../Providers/DataProvider'
import { Leagues } from '../types/LeagueResponse'
import useAxios from './axiosHook'

export const useInitializeData = () => {
  const { setLeagueResponse } = useData()
  const toast = useToast()
  const [{ data, error }] = useAxios<Leagues>({
    path: 'getPlayers',
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
    if (data && data['leagues']) {
      setLeagueResponse(data['leagues'])
    }
  }, [data, setLeagueResponse])
}
