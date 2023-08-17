import { useCallback, useState } from 'react'

import { Leagues } from '../types/LeagueResponse'
import useAxios from './axiosHook'

interface RefreshPlayerDataStatus {
  loading: boolean
  progress: number // 0 = Not Started, 1 = Resetting Data, 2 = Getting Teams, 3 = Getting Players, 4 = Getting FpsData, 5 = Complete
  error?: string
}
export const useRefreshPlayerData: () => [
  RefreshPlayerDataStatus,
  () => Promise<void>
] = () => {
  const [{ loading: loadingResetData }, resetData] = useAxios<Leagues>({
    path: 'resetData',
    method: 'get',
    lazy: true,
  })
  const [{ loading: loadingTeams }, getTeams] = useAxios<Leagues>({
    path: 'setTeams',
    method: 'get',
    lazy: true,
  })
  const [{ loading: loadingPlayers }, getPlayers] = useAxios<Leagues>({
    path: 'setPlayers',
    method: 'get',
    lazy: true,
  })
  const [{ loading: loadingFpsData }, getFpsData] = useAxios<Leagues>({
    path: 'setFpsData',
    method: 'get',
    lazy: true,
  })
  const [progress, setProgress] = useState<number>(0)
  const [error, setError] = useState<string>()
  const refreshPlayerData = useCallback(async () => {
    try {
      const resetDataResponse = await resetData('resetData', 'get')
      if (resetDataResponse.data) {
        setProgress(1)
        try {
          const teamsResponse = await getTeams('setTeams', 'get')
          if (teamsResponse.data) {
            setProgress(2)
            try {
              const playersResponse = await getPlayers('setPlayers', 'get')
              if (playersResponse.data) {
                setProgress(3)
                try {
                  const fpsDataResponse = await getFpsData('setFpsData', 'get')
                  if (fpsDataResponse.data) setProgress(4)
                } catch (err) {
                  console.error(err)
                  setError('Error getting FpsData')
                }
              }
            } catch (err) {
              console.error(err)

              setError('Error getting Players')
            }
          }
        } catch (err) {
          console.error(err)

          setError('Error getting Teams')
        }
      }
    } catch (err) {
      console.error(err)
      setError('Error resetting data')
    }
  }, [getFpsData, getPlayers, getTeams, resetData])

  return [
    {
      loading:
        loadingTeams || loadingPlayers || loadingFpsData || loadingResetData,
      progress,
      error,
    },
    refreshPlayerData,
  ]
}
