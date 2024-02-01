import React, { FC, useEffect } from 'react'

import { Flex } from '@chakra-ui/react'

import PlayersTable from '../components/PlayersTable'
import useAxios from '../hooks/axiosHook'
import { useSearchParams } from 'react-router-dom'
import { PlayersResponse } from '../types/espnApiV2'
import useModal from '../util/useModal'
import LoadingModal from '../components/LoadingModal'

const PlayersPage: FC = () => {
  const [searchParams] = useSearchParams()
  const {
    modal: loadingModal,
    onClose: onCloseLoadingModal,
    onOpen: onOpenLoadingModal,
  } = useModal(<LoadingModal />, 'sm')
  const teamId = searchParams.get('team')
  const [{ data, loading, error }] = useAxios<PlayersResponse[]>({
    path: 'getAthlete',
    method: 'post',
    params: {
      teamId: teamId,
    },
  })

  if (error) {
    console.error(error)
  }

  useEffect(() => {
    if (loading) {
      onOpenLoadingModal()
    } else {
      onCloseLoadingModal()
    }
  }, [loading, onCloseLoadingModal, onOpenLoadingModal])

  return (
    <Flex>
      {loadingModal}
      <PlayersTable players={data ?? []} />
    </Flex>
  )
}

export default PlayersPage
