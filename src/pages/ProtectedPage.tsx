import React, { FC, PropsWithChildren, useEffect, useState } from 'react'

import { Flex, useToast } from '@chakra-ui/react'
import FDVStack from '../components/CustomChakraComponents/FDVStack'
import NavBar from '../components/NavBar'
import useAxios from '../hooks/axiosHook'
import { LeagueWithTeamsResponse } from '../types/espnApiV2'
import { useData } from '../Providers/DataProvider'
import { Outlet } from 'react-router-dom'

const ProtectedPage: FC<PropsWithChildren> = ({ children }) => {
  const [currentKey, setCurrentKey] = useState<string>()

  const toast = useToast()
  const { setLeaguesWithTeams } = useData()
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
    }
  }, [data, setLeaguesWithTeams])
  return (
    <Flex flexDirection="column" w="100%">
      <NavBar currentKey={currentKey} setCurrentKey={setCurrentKey} />
      <FDVStack
        p="20px"
        h="100%"
        overflow={'scroll'}
        onClick={() => setCurrentKey(undefined)}
      >
        <Outlet />
      </FDVStack>
    </Flex>
  )
}

export default ProtectedPage
