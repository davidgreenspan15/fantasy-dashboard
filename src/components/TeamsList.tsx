import React, { FC } from 'react'

import { useData } from '../Providers/DataProvider'
import FDVStack from './CustomChakraComponents/FDVStack'
import TeamCard from './TeamCard'

const TeamsList: FC = () => {
  const { league } = useData()

  return (
    <FDVStack>
      {league?.Teams?.map((t, idx) => {
        return <TeamCard team={t} key={idx} />
      })}
    </FDVStack>
  )
}
export default TeamsList
