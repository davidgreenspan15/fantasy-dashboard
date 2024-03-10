import { isEqual } from 'lodash'
import React, { FC, useEffect, useState } from 'react'

import BackgroundComponent from '../components/BackgroundComponent'
import FDVStack from '../components/CustomChakraComponents/FDVStack'
import LoadingModal from '../components/LoadingModal'
import NoHeaderTable from '../components/NoHeaderTable'
import SeasonSelector from '../components/SeasonWrapper'
import useAxios from '../hooks/axiosHook'
import { useData } from '../Providers/DataProvider'
import { GamesResponse } from '../types/espnApiV2'
import useModal from '../util/useModal'
import { Heading } from '@chakra-ui/react'

const GamesPage: FC = () => {
  const {
    modal: loadingModal,
    onClose: onCloseLoadingModal,
    onOpen: onOpenLoadingModal,
  } = useModal(<LoadingModal />, 'sm')

  const [displayYear, setDisplayYear] = useState<string>()
  const [seasonType, setSeasonType] = useState<number>()
  const { team, setGames, games } = useData()

  const [{ data, loading, error }, call] = useAxios<GamesResponse[]>({
    path: 'getGames',
    method: 'post',
    lazy: true,
  })

  if (error) {
    console.error(error)
  }

  useEffect(() => {
    if (team && displayYear && seasonType) {
      const teamId = team.id
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
  }, [displayYear, seasonType, call, games, setGames, team])

  const tables = data?.reduce((acc, game) => {
    // Break up tables between in progress, previous, and upcoming
    const date = new Date(game.date)
    const now = new Date()
    const key = date < now ? 'Previous' : date > now ? 'Upcoming' : 'InProgress'
    if (!acc[key]) {
      acc[key] = [game]
    } else {
      acc[key].push(game)
    }

    return acc
  }, {} as Record<string, GamesResponse[]>)

  useEffect(() => {
    if (loading) {
      onOpenLoadingModal()
    } else {
      onCloseLoadingModal()
    }
  }, [loading, onCloseLoadingModal, onOpenLoadingModal])
  return (
    <FDVStack w="100%">
      {loadingModal}
      <Heading variant="floating" alignSelf={'center'}>
        {team?.displayName} Schedule
      </Heading>
      <SeasonSelector
        displayYear={displayYear}
        seasonType={seasonType}
        setDisplayYear={setDisplayYear}
        setSeasonType={setSeasonType}
        teamId={team?.id}
        page="schedule"
      />
      {tables
        ? Object.keys(tables).map((key, idx) => {
            return (
              <BackgroundComponent
                key={idx}
                title={key}
                titleBgColor={team?.color}
              >
                <NoHeaderTable
                  showColumnHeaders={true}
                  columns={[
                    { label: 'date', key: 'date', type: 'date' },
                    { label: 'name', key: 'name', type: 'string' },
                    {
                      label: 'Box Score',
                      key: 'id',
                      type: 'link',
                      path: (key: string) => {
                        return `../../../scoreboard/${key}`
                      },
                    },
                  ]}
                  rows={tables[key]}
                />
              </BackgroundComponent>
            )
          })
        : null}
    </FDVStack>
  )
}

export default GamesPage
