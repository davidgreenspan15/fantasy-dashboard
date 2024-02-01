import React, { FC, useEffect, useState } from 'react'

import useAxios from '../hooks/axiosHook'
import { useSearchParams } from 'react-router-dom'
import { GamesResponse } from '../types/espnApiV2'
import useModal from '../util/useModal'
import LoadingModal from '../components/LoadingModal'
import GamesTable from '../components/GamesTable'
import { useData } from '../Providers/DataProvider'
import FDVStack from '../components/CustomChakraComponents/FDVStack'
import SeasonSelector from '../components/SeasonWrapper'
import { isEqual } from 'lodash'

const GamesPage: FC = () => {
  const [searchParams] = useSearchParams()
  const {
    modal: loadingModal,
    onClose: onCloseLoadingModal,
    onOpen: onOpenLoadingModal,
  } = useModal(<LoadingModal />, 'sm')
  const teamId = searchParams.get('team')

  const [displayYear, setDisplayYear] = useState<string>()
  const [seasonType, setSeasonType] = useState<number>()
  const { leaguesWithTeams, setGames, games } = useData()

  const [{ data, loading, error }, call] = useAxios<GamesResponse[]>({
    path: 'getGames',
    method: 'post',
    lazy: true,
  })

  if (error) {
    console.error(error)
  }

  useEffect(() => {
    if (leaguesWithTeams && displayYear && seasonType) {
      call('getGames', 'post', {
        teamId: teamId,
        displayYear: displayYear,
        seasonType: seasonType,
      }).then((res) => {
        const data = res.data
        if (data) {
          const d = games[`${teamId}_${displayYear}_${seasonType}`]
          if (!isEqual(d, data)) {
            setGames({
              ...games,
              [`${teamId}_${displayYear}_${seasonType}`]: data,
            })
          }
        }
      })
    }
  }, [displayYear, seasonType, leaguesWithTeams, teamId, call, games, setGames])

  useEffect(() => {
    if (loading) {
      onOpenLoadingModal()
    } else {
      onCloseLoadingModal()
    }
  }, [loading, onCloseLoadingModal, onOpenLoadingModal])
  return (
    <FDVStack>
      {loadingModal}
      <SeasonSelector
        displayYear={displayYear}
        seasonType={seasonType}
        setDisplayYear={setDisplayYear}
        setSeasonType={setSeasonType}
      />

      <GamesTable games={data ?? []} />
    </FDVStack>
  )
}

export default GamesPage
