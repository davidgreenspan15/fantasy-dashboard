import React, { FC, useEffect } from 'react'

import { Flex } from '@chakra-ui/react'

import useAxios from '../hooks/axiosHook'
import { useSearchParams } from 'react-router-dom'
import { PlayersResponse } from '../types/espnApiV2'
import useModal from '../util/useModal'
import LoadingModal from '../components/LoadingModal'

const oneMinute = 60000
const GameSummaryPage: FC = () => {
  const [searchParams] = useSearchParams()
  const {
    modal: loadingModal,
    onClose: onCloseLoadingModal,
    onOpen: onOpenLoadingModal,
  } = useModal(<LoadingModal />, 'sm')
  const gameId = searchParams.get('game')
  const [timeoutRed, setTimeoutRef] = React.useState<NodeJS.Timeout | null>(
    null
  )
  const [{ data, loading, error }, call] = useAxios<PlayersResponse[]>({
    path: 'getGameStatistics',
    method: 'post',
    params: {
      gameId: gameId,
      shouldMigrateGame: false,
    },
  })

  if (error) {
    console.log(error)
  }

  useEffect(() => {
    if (data && gameId) {
      const t = setTimeout(() => {
        call('getGameStatistics', 'post', {
          gameId: gameId,
          shouldMigrateGame: true,
        })
      }, oneMinute * 5)
      setTimeoutRef(t)
    }
  }, [call, data, gameId])

  useEffect(() => {
    return () => {
      if (timeoutRed) {
        clearTimeout(timeoutRed)
      }
    }
  }, [timeoutRed])

  useEffect(() => {
    if (loading && !data) {
      onOpenLoadingModal()
    } else {
      onCloseLoadingModal()
    }
  }, [data, loading, onCloseLoadingModal, onOpenLoadingModal])

  return (
    <Flex>
      {loadingModal}

      {/* <PlayersTable players={data ?? []} /> */}
    </Flex>
  )
}

export default GameSummaryPage
