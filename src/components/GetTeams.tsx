import React, { FC } from 'react'

import axios from 'axios'
import { Leagues } from 'src/types/LeagueResponse'

import { Button, Flex } from '@chakra-ui/react'

import { useData } from '../Providers/DataProvider'

const GetTeams: FC = () => {
  const { setLeagueResponse } = useData()
  const getPlayers = () => {
    axios
      .get<{ leagues: Leagues }>(`http://localhost:8000/getPlayers`, {
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
      })
      .then((resp) => {
        console.debug(resp)
        setLeagueResponse(resp.data.leagues)
      })
  }

  return (
    <Flex>
      <Button onClick={getPlayers}>Get Players</Button>
    </Flex>
  )
}

export default GetTeams
