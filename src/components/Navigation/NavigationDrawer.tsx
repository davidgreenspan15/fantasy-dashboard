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
  Select,
  useDisclosure,
} from '@chakra-ui/react'
import React, { ChangeEvent, FC } from 'react'
import { useData } from '../../Providers/DataProvider'
import FDVStack from '../CustomChakraComponents/FDVStack'
import GetTeams from '../GetTeams'
import NavigationRouteOptions from './NavigationRouteOptions'

const NavigationDrawer: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { league, setLeague, leagueResponse } = useData()
  const routes = ['teams', 'depth-charts', 'rosters', 'players', 'fantasy-draft-board', 'sql-tool']
  return (
    <Flex w="100%" boxShadow={'1px 1px #DDDDDD'} position="fixed" py="10px" background="white" zIndex={2}>
      <HStack w="100%" justifyContent={'space-between'} pr="20px">
        <Flex boxSize={'50px'} as={Button} rounded={'full'} onClick={onOpen} ml="10px">
          RG
        </Flex>
        <Select
          value={league}
          onChange={(e: any) => {
            setLeague(e.target.value)
          }}
          width="150px"
        >
          {leagueResponse?.map((l, idx) => {
            return (
              <option value={l.abr} key={idx}>
                {l.abr.toUpperCase()}
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
            <Flex justifyContent={'flex-start'} w="100%">
              <GetTeams />
            </Flex>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Flex>
  )
}
export default NavigationDrawer
