import {
  Flex,
  Image,
  ModalBody,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react'
import React, { FC } from 'react'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import SportsImage from '../assets/sport_logo_transparent_2.png'
import LoadingDots from './LoadingDots'

const LoadingModal: FC = () => {
  return (
    <>
      <ModalOverlay />
      <ModalContent background="rgb(255,255,255,0)" boxShadow="none">
        <ModalBody background="rgb(255,255,255,0)">
          <Flex
            justifyContent={'baseline'}
            alignItems={'center'}
            flexDirection={'column'}
          >
            <Image src={SportsImage} alt="Golfer" h="200px" />
            <LoadingDots />
          </Flex>
        </ModalBody>
      </ModalContent>
    </>
  )
}

export default LoadingModal
