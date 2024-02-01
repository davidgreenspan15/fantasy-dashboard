import React, { FC, useEffect, useState } from 'react'

import useAxios from '../hooks/axiosHook'
import { useSearchParams } from 'react-router-dom'
import { GamesResponse, PlayersResponse } from '../types/espnApiV2'
import useModal from '../util/useModal'
import LoadingModal from '../components/LoadingModal'
import GamesTable from '../components/GamesTable'
import { useData } from '../Providers/DataProvider'
import FDVStack from '../components/CustomChakraComponents/FDVStack'
import SeasonSelector from '../components/SeasonWrapper'
import PlayersTable from '../components/PlayersTable'

const RosterPage: FC = () => {
  const [searchParams] = useSearchParams()
  const {
    modal: loadingModal,
    onClose: onCloseLoadingModal,
    onOpen: onOpenLoadingModal,
  } = useModal(<LoadingModal />, 'sm')
  const teamId = searchParams.get('team')

  const [displayYear, setDisplayYear] = useState<string>()
  const [seasonType, setSeasonType] = useState<number>()
  const { leaguesWithTeams } = useData()

  const [{ data, loading, error }, call] = useAxios<PlayersResponse[]>({
    path: 'getRoster',
    method: 'post',
    lazy: true,
  })

  if (error) {
    console.error(error)
  }
  useEffect(() => {
    if (leaguesWithTeams && displayYear && seasonType) {
      call('getRoster', 'post', {
        teamId: teamId,
        displayYear: displayYear,
        seasonType: seasonType,
      })
    }
  }, [displayYear, seasonType, leaguesWithTeams, teamId, call])

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

      <PlayersTable players={data ?? []} />
    </FDVStack>
  )
}

export default RosterPage
