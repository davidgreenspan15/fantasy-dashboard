import React, { FC } from 'react'

import { HStack, Image, Text } from '@chakra-ui/react'

import { InjuryStatus, Player } from '../types/Players'
import FDVStack from './CustomChakraComponents/FDVStack'

const PlayerCard: FC<{ player: Player }> = ({ player }) => {
  const haStatus = player.injuryStatus !== InjuryStatus.Empty
  return (
    <FDVStack border="1px solid #DDDDDD" borderRadius={'10px'}>
      <HStack>
        <Image src={player.playerImageSrc} h="100px" w="135px" />
        <HStack>
          <Text>{player.name}</Text>
          {haStatus ? <Text color="red">{player.injuryStatus}</Text> : null}
        </HStack>
        <HStack>
          <Text>{player.pos}</Text>
          <Text>{player.depth}</Text>
        </HStack>
      </HStack>
    </FDVStack>
  )
}
export default PlayerCard
