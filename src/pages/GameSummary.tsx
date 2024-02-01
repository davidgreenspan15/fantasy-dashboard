import React, { FC, useEffect, useMemo } from 'react'

import { Flex, Heading } from '@chakra-ui/react'

import useAxios from '../hooks/axiosHook'
import { useSearchParams } from 'react-router-dom'
import { GameSummaryResponse, GamesResponse } from '../types/espnApiV2'
import useModal from '../util/useModal'
import LoadingModal from '../components/LoadingModal'
import FDVStack from '../components/CustomChakraComponents/FDVStack'
import TeamCard from '../components/TeamCard'
import { useData } from '../Providers/DataProvider'
import { isEmpty } from 'lodash'
import { Sport, sportPeriod } from '../util/tools'
import PlayersGameSummaryTable from '../components/PlayersGameSummaryTable'

const oneMinute = 60000
const GameSummaryPage: FC = () => {
  const [searchParams] = useSearchParams()
  const gameId = searchParams.get('game')
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
      }, oneMinute * 2)
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
  return (
    <FDVStack>
      {loadingModal}
      {data && (
        <Flex justifyContent="space-evenly">
          {homeTeam && (
            <TeamCard
              team={homeTeam}
              showLinks={false}
              score={homeTeam.TeamStatistics?.teamScore ?? 0}
            />
          )}
          <FDVStack w="auto" alignItems={'center'} justifyContent={'center'}>
            {!data.isComplete && data.period && league && (
              <Heading>
                {sportPeriod(league.abbreviation as Sport, data.period)}
              </Heading>
            )}
            <Heading>{data?.isComplete ? 'Final' : data?.timeOnClock}</Heading>
          </FDVStack>
          {awayTeam && (
            <TeamCard
              team={awayTeam}
              showLinks={false}
              flexDirection="row-reverse"
              score={awayTeam.TeamStatistics?.teamScore ?? 0}
            />
          )}
        </Flex>
      )}

      <Flex justifyContent="space-evenly">
        <FDVStack maxW={'45vw'}>
          {homeTeam &&
            Object.keys(homeTeam.athletesStatistics ?? {})
              ?.sort()
              ?.map((as) => {
                const stats = homeTeam.athletesStatistics[as]
                return (
                  <FDVStack key={as} columnGap={'2px'} mt="10px">
                    <Heading mb={'-20px'}>
                      {as.replace('Statistic', '')}
                    </Heading>
                    <PlayersGameSummaryTable playerStat={stats} />
                  </FDVStack>
                )
              })}
        </FDVStack>

        <FDVStack maxW={'45vw'}>
          {awayTeam &&
            Object.keys(awayTeam.athletesStatistics ?? {})
              ?.sort()
              ?.map((as) => {
                const stats = awayTeam.athletesStatistics[as]
                return (
                  <FDVStack key={as} columnGap={'2px'} mt="10px">
                    <Heading mb={'-20px'}>
                      {as.replace('Statistic', '')}
                    </Heading>
                    <PlayersGameSummaryTable playerStat={stats} />
                  </FDVStack>
                )
              })}
        </FDVStack>
      </Flex>
    </FDVStack>
  )
}

export default GameSummaryPage
