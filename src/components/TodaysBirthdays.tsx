import {
  Flex,
  GridItem,
  Heading,
  SimpleGrid,
  Spinner,
  Text,
  useMediaQuery,
} from '@chakra-ui/react'
import { FC, useEffect, useState } from 'react'

import BackgroundComponent from '../components/BackgroundComponent'
import FDVStack from '../components/CustomChakraComponents/FDVStack'
import LoadingModal from '../components/LoadingModal'
import NoHeaderTable from '../components/NoHeaderTable'
import useAxios from '../hooks/axiosHook'
import {
  SeasonBirthdayStatsResponse,
  TodaysBirthdaysResponse,
} from '../types/espnApiV2'
import useModal from '../util/useModal'
import DatePicker from './DatePicker'
import moment, { Moment } from 'moment-timezone'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { minWidth } from '../themes/themes'
import ProgressBar from './ProgressBar'

const TodaysBirthdays: FC = () => {
  const isDesktop = useMediaQuery(minWidth)[0]

  const [date, setDate] = useState<Moment>(moment())
  const {
    modal: loadingModal,
    onClose: onCloseLoadingModal,
    onOpen: onOpenLoadingModal,
  } = useModal(<LoadingModal />, 'sm')

  const [{ data, loading, error }, call] = useAxios<
    TodaysBirthdaysResponse.TodaysBirthdaysResponse[]
  >({
    path: 'getTodaysBirthdays',
    method: 'get',
    lazy: true,
    params: {
      date: date.toDate(),
    },
  })

  if (error) {
    console.error(error)
  }

  // create tables based on league
  const tables = data?.reduce((acc, player) => {
    if (!acc[player.League.abbreviation]) {
      acc[player.League.abbreviation] = []
    }
    acc[player.League.abbreviation].push(player)

    return acc
  }, {} as Record<string, TodaysBirthdaysResponse.TodaysBirthdaysResponse[]>)

  const columns = [
    {
      label: 'Player',
      key: 'fullName',
      type: 'string',
      path: (k: string) => k,
      pathKey: 'espnUrl',
      imageSrc: 'imageUrl',
      minWidth: '50px',
    },
    { label: 'Pos', key: 'Position.abbreviation', type: 'string' },
    { label: 'Team', key: 'Team.name', type: 'string' },

    { label: 'Birthday', key: 'birthday', type: 'string' },
    {
      label: 'Game Date',
      key: 'game.date',
      type: 'date',
      dateFormat: 'MM/DD/YYYY hh:mm A',
    },
    { label: 'Game', key: 'game.name', type: 'string' },
  ]

  const CustomTitleComponent: FC = () => {
    return (
      <Flex flexGrow={1} justifyContent={'center'} alignItems={'center'}>
        <ChevronLeftIcon
          onClick={(e) => {
            e.stopPropagation()
            setDate(date.clone().subtract(1, 'day'))
          }}
        />
        <Text
          fontSize="12px"
          letterSpacing="wider"
          textTransform="uppercase"
          textAlign={'center'}
          lineHeight={4}
          p={2}
        >
          {date.format('MM/DD')}
        </Text>
        <ChevronRightIcon
          onClick={(e) => {
            e.stopPropagation()
            setDate(date.clone().add(1, 'day'))
          }}
        />
      </Flex>
    )
  }

  useEffect(() => {
    call('getTodaysBirthdays', 'get', {}, { date: date.toDate() }).catch(
      (e) => {}
    )
  }, [date, call])

  useEffect(() => {
    if (loading) {
      onOpenLoadingModal()
    } else {
      onCloseLoadingModal()
    }
  }, [loading, onCloseLoadingModal, onOpenLoadingModal])
  return (
    <FDVStack w="100%">
      {loadingModal}
      <Heading variant="floating" alignSelf={'center'}>
        Todays Birthdays
      </Heading>
      <SimpleGrid columns={isDesktop ? 2 : 1} spacing={4} w="100%">
        <BackgroundComponent
          title={date.format('MM/DD')}
          isCollapsible
          CustomTitleComponent={CustomTitleComponent}
        >
          <DatePicker date={date} setDate={setDate} displayYear={false} />
        </BackgroundComponent>
        <BackgroundComponent
          title={'2023 Regular Season Stats'}
          //   isCollapsible
          defaultIsOpen={true}
        >
          <SeasonBirthdayStats />
        </BackgroundComponent>
      </SimpleGrid>

      {Object.keys(tables ?? {}).map((league, idx) => {
        return (
          <BackgroundComponent title={league} key={idx}>
            <NoHeaderTable
              columns={columns}
              rows={(tables ?? {})[league]}
              showColumnHeaders={true}
            />
          </BackgroundComponent>
        )
      })}
    </FDVStack>
  )
}

export default TodaysBirthdays

export const SeasonBirthdayStats: FC = () => {
  const isDesktop = useMediaQuery(minWidth)[0]
  const [{ data, loading, error }] =
    useAxios<SeasonBirthdayStatsResponse.SeasonBirthdayStats>({
      path: 'getSeasonBirthdayStats',
      method: 'get',
      skip: false,
    })

  if (error) {
    console.error(error)
  }

  return (
    <Flex
      backgroundColor={'greyBackground'}
      p="5"
      w="100%"
      alignItems={'center'}
      flexDirection={'column'}
    >
      {loading ? <Spinner /> : null}
      {data &&
        Object.keys(data).map((s, idx) => {
          const value: SeasonBirthdayStatsResponse.Stats = data[s]
          const progress = (value.touchdowns / value.games) * 100
          return (
            <SimpleGrid w="100%" columns={2} key={idx}>
              <Flex gap={'4px'} alignItems={'center'}>
                <Text size="sm" minW="max-content">
                  {s}
                </Text>
                <Text size="xs" fontWeight={400} minW="max-content">
                  (Tds / Gms)
                </Text>
              </Flex>
              <SimpleGrid
                gap={isDesktop ? '10px' : '30px'}
                w="100%"
                columns={3}
                justifyItems={'end'}
                alignItems={'center'}
              >
                <Flex w={isDesktop ? '120%' : '100%'} as={GridItem} colSpan={2}>
                  <ProgressBar
                    progress={progress}
                    backgroundColor={'gray.700'}
                    fillColor="linear-gradient(110deg, accentColor 80%, accentColorTwo 90%)"
                  />
                </Flex>
                <Flex gap={'4px'} alignItems={'center'}>
                  <Text size="sm" minW="max-content">
                    {progress}%
                  </Text>
                  <Text size="xs" fontWeight={400} minW="max-content">
                    {`(${value.touchdowns} / ${value.games})`}
                  </Text>
                </Flex>
              </SimpleGrid>
            </SimpleGrid>
          )
        })}
    </Flex>
  )
}
