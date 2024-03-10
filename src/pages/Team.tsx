import { FC, useEffect } from 'react'

import { Flex } from '@chakra-ui/react'

import { Outlet, useParams } from 'react-router-dom'
import { useData } from '../Providers/DataProvider'

const TeamPage: FC = () => {
  const { league, setTeam } = useData()
  const { team: teamParam } = useParams<{ team: string }>()

  useEffect(() => {
    if (teamParam) {
      const team = league?.Teams.find(
        (l) => l.abbreviation.toLowerCase() === teamParam
      )
      if (team) setTeam(team)
    }
  }, [teamParam, league, setTeam])
  return (
    <Flex w="100%">
      <Outlet />
    </Flex>
  )
}

export default TeamPage
