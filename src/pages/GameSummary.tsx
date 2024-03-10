import { Heading, SimpleGrid, useMediaQuery } from '@chakra-ui/react'
import { isEmpty } from 'lodash'
import React, { FC, useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'

import BackgroundComponent from '../components/BackgroundComponent'
import FDVStack from '../components/CustomChakraComponents/FDVStack'
import LoadingModal from '../components/LoadingModal'
import NoHeaderTable, { Column } from '../components/NoHeaderTable'
import TeamCard from '../components/TeamCard'
import useAxios from '../hooks/axiosHook'
import { useData } from '../Providers/DataProvider'
import { minWidth } from '../themes/themes'
import { GamesResponse, GameSummaryResponse } from '../types/espnApiV2'
import { Sport, sportPeriod } from '../util/tools'
import useModal from '../util/useModal'

const oneMinute = 60000
const GameSummaryPage: FC = () => {
  const { gameId } = useParams<{ gameId: string }>()
  const { games, league } = useData()

  const [{ data: gameResponse }] = useAxios<GamesResponse>({
    path: 'getGame',
    method: 'post',
    skip: !isEmpty(games),
    params: {
      gameId: gameId,
    },
  })
  const {
    modal: loadingModal,
    onClose: onCloseLoadingModal,
    onOpen: onOpenLoadingModal,
  } = useModal(<LoadingModal />, 'sm')
  const game = useMemo(() => {
    if (!isEmpty(games)) {
      return Object.values(games)
        .flatMap((g) => g)
        .find((g) => g.id === gameId)
    }
    return gameResponse
  }, [gameId, gameResponse, games])

  const [timeoutRef, setTimeoutRef] = React.useState<NodeJS.Timeout | null>(
    null
  )

  const gameTime = new Date(game?.date ?? '')
  const shouldMigrateGame =
    game &&
    gameTime.getTime() < Date.now() &&
    (!game.isComplete || !game.Statistics || !game.Statistics?.isComplete)
  const [{ data, loading, error }, call] =
    useAxios<GameSummaryResponse.GameSummary>({
      path: 'getGameStatistics',
      method: 'post',
      skip: !game,
      params: {
        gameId: gameId,
        shouldMigrateGame: shouldMigrateGame,
      },
    })

  if (error) {
    console.error(error)
  }

  useEffect(() => {
    if (data && gameId && shouldMigrateGame) {
      const t = setTimeout(() => {
        call('getGameStatistics', 'post', {
          gameId: gameId,
          shouldMigrateGame,
        })
      }, oneMinute / 2)
      setTimeoutRef(t)
    }
  }, [call, data, gameId, shouldMigrateGame])

  useEffect(() => {
    return () => {
      if (timeoutRef) {
        clearTimeout(timeoutRef)
      }
    }
  }, [timeoutRef])

  useEffect(() => {
    if (loading && !data) {
      onOpenLoadingModal()
    } else {
      onCloseLoadingModal()
    }
  }, [data, loading, onCloseLoadingModal, onOpenLoadingModal])
  const homeTeam = data?.teams?.find((d) => d.isHome)
  const awayTeam = data?.teams?.find((d) => !d.isHome)
  const isDesktop = useMediaQuery(minWidth)[0]
  const gridColumns = isDesktop ? 2 : 1

  return (
    <FDVStack w="100%">
      {loadingModal}
      {data && (
        <FDVStack w="100%">
          <SimpleGrid columns={3} gap={isDesktop ? 4 : 2}>
            {homeTeam && (
              <TeamCard
                team={homeTeam}
                showLinks={false}
                score={homeTeam.TeamStatistics?.teamScore ?? 0}
              />
            )}
            <Heading variant="floating" alignSelf={'center'} w="100%">
              {data?.isComplete
                ? 'Final'
                : sportPeriod(league?.abbreviation as Sport, data.period) +
                  ' : ' +
                  data?.timeOnClock}
            </Heading>
            {awayTeam && (
              <TeamCard
                team={awayTeam}
                showLinks={false}
                flexDirection="row-reverse"
                score={awayTeam.TeamStatistics?.teamScore ?? 0}
              />
            )}
          </SimpleGrid>
        </FDVStack>
      )}

      <SimpleGrid columns={gridColumns} gap={4} w="100%">
        <FDVStack w="100%">
          {homeTeam &&
            Object.keys(homeTeam.athletesStatistics ?? {})
              ?.sort()
              ?.map((as, idx) => {
                const stats = homeTeam.athletesStatistics[as]
                return (
                  <StatisticsTable
                    key={idx}
                    title={as}
                    titleBgColor={homeTeam.color}
                    stats={stats}
                  />
                )
              })}
        </FDVStack>

        <FDVStack>
          {awayTeam &&
            Object.keys(awayTeam.athletesStatistics ?? {})
              ?.sort()
              ?.map((as, idx) => {
                const stats = awayTeam.athletesStatistics[as]
                return (
                  <StatisticsTable
                    key={idx}
                    title={as}
                    titleBgColor={awayTeam.color}
                    stats={stats}
                  />
                )
              })}
        </FDVStack>
      </SimpleGrid>
    </FDVStack>
  )
}

export default GameSummaryPage

const StatisticsTable: FC<{
  title: string
  titleBgColor: string
  stats: GameSummaryResponse.AthleteStatisticTypes
}> = ({ title, titleBgColor, stats }) => {
  const columns = Object.values(
    stats.reduce((acc, s) => {
      Object.keys(s).forEach((k) => {
        if (k === 'athleteId') return
        if (!acc[k]) {
          // if (k === 'displayName') {
          //   acc[k] = {
          //     label: k,
          //     key: k,
          //     type: 'string',
          //     imageSrc: 'imageUrl',
          //     minWidth: '50px',
          //   }
          // }
          if (k === 'imageUrl') {
            acc[k] = {
              label: k,
              key: k,
              type: 'image',
              minWidth: '50px',
            }
          } else {
            acc[k] = {
              label: k,
              key: k,
              type: 'string',
            }
          }
        }
      })
      return acc
    }, {} as Record<string, Column>)
  )
  return (
    <BackgroundComponent
      title={title.replace('Statistic', '')}
      titleBgColor={titleBgColor}
    >
      <NoHeaderTable showColumnHeaders={true} rows={stats} columns={columns} />
    </BackgroundComponent>
  )
}
