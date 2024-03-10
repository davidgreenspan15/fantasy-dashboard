import { Flex } from '@chakra-ui/react'
import { FC } from 'react'
import { Outlet } from 'react-router-dom'

const ScoreboardPage: FC = () => {
  return (
    <Flex w="100%">
      <Outlet />
    </Flex>
  )
}

export default ScoreboardPage
