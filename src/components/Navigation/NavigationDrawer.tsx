import React, { FC } from 'react'

import { useNavigate } from 'react-router'

import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Progress,
  Select,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'

import { useInitializeData } from '../../hooks/useInitializeData'
import { useRefreshPlayerData } from '../../hooks/useRefreshPlayerData'
import { useData } from '../../Providers/DataProvider'
import FDVStack from '../CustomChakraComponents/FDVStack'
import NavigationRouteOptions from './NavigationRouteOptions'

const NavigationDrawer: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const navigate = useNavigate()
  const refreshPage = () => {
    navigate(0)
  }
  const {
    isOpen: isOpenModal,
    onOpen: onOpenModal,
    onClose: onCloseModal,
  } = useDisclosure()

  const { league, setLeague, leaguesWithTeams } = useData()
  useInitializeData()
  const [{ loading, progress, error }, refreshPlayerData] =
    useRefreshPlayerData()

  const selectLeague = (abbreviation: string) => {
    const league = leaguesWithTeams?.find(
      (l) => l.abbreviation === abbreviation
    )
    console.log({ league })
    if (league) {
      setLeague(league)
    }
  }

  const routes = [
    'teams',
    'depth-charts',
    'roster',
    'players',
    'fantasy-draft-board',
    'sql-tool',
  ]
  return (
    <Flex
      w="100%"
      boxShadow={'1px 1px #DDDDDD'}
      position="fixed"
      py="10px"
      background="white"
      zIndex={2}
    >
      <HStack w="100%" justifyContent={'space-between'} pr="20px">
        <Flex
          boxSize={'50px'}
          as={Button}
          rounded={'full'}
          onClick={onOpen}
          ml="10px"
        >
          RG
        </Flex>
        <Button onClick={onOpenModal}>Refresh Player Data</Button>

        <Select
          value={league?.abbreviation ?? 'NFL'}
          onChange={(e) => {
            selectLeague(e.target.value)
          }}
          width="150px"
        >
          {leaguesWithTeams?.map((l, idx) => {
            return (
              <option value={l.abbreviation} key={idx}>
                {l.abbreviation}
              </option>
            )
          })}
        </Select>
      </HStack>

      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Welcome Rami</DrawerHeader>

          <DrawerBody px={0}>
            <FDVStack spacing={0}>
              {routes.map((r, idx) => {
                return <NavigationRouteOptions route={r} key={idx} />
              })}
            </FDVStack>
          </DrawerBody>

          <DrawerFooter>
            <Flex justifyContent={'flex-start'} w="100%"></Flex>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <Modal isOpen={isOpenModal} onClose={onCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Refresh Player Data</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack alignItems={'center'} w="100%">
              {progress || loading ? (
                <Progress
                  colorScheme="green"
                  hasStripe
                  value={progress === 0 && loading ? 10 : (progress / 4) * 100}
                  w="100%"
                />
              ) : null}
              {error ? <Text>{error}</Text> : null}
              {progress === 0 && loading ? (
                <Text>Resetting Player Data</Text>
              ) : null}
              {progress === 1 && loading ? <Text>Retrieving Teams</Text> : null}
              {progress === 2 && loading ? (
                <Text>Retrieving Players</Text>
              ) : null}
              {progress === 3 && loading ? (
                <Text>Retrieving FpsData</Text>
              ) : null}
              {progress === 4 ? <Text>Complete</Text> : null}
            </VStack>
          </ModalBody>

          <ModalFooter justifyContent={'center'}>
            {progress === 4 && !loading ? (
              <Button colorScheme="blue" onClick={refreshPage}>
                Reload Page
              </Button>
            ) : (
              <Button
                colorScheme="green"
                onClick={refreshPlayerData}
                isDisabled={loading}
              >
                Refresh
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  )
}
export default NavigationDrawer
