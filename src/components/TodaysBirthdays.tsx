import {
  Flex,
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

  const rows = data
    ? Object.keys(data).map((s, idx) => {
        return { title: s, stats: data[s], group: data[s].goals ? 1 : 0 } as {
          title: string
          stats: SeasonBirthdayStatsResponse.Stats
          group: number
        }
      })
    : []

  const sortRowsByGroup = (
    rows: {
      title: string
      stats: SeasonBirthdayStatsResponse.Stats
      group: number
    }[]
  ) => {
    return rows.sort((a, b) => {
      return a.group - b.group
    })
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
      {sortRowsByGroup(rows).map((r, idx) => {
        const value = r.stats
        const progress = Math.round(
          ((value.goals ?? value.touchdowns) / value.games) * 100
        )
        const vegasOdds = Math.round((100 / progress) * 100)
        return (
          <SimpleGrid w="100%" columns={3} key={idx}>
            <Flex
              gap={'4px'}
              alignItems={'center'}
              justifyContent={'flex-start'}
            >
              <Text size="sm" minW="max-content">
                {r.title}
              </Text>
              <Text size="xs" fontWeight={400} minW="max-content">
                ({value.goals ? 'Gls' : 'Tds'} / Gms)
              </Text>
            </Flex>

            <Flex w={isDesktop ? '80%' : '70%'} ml="40px" alignItems={'center'}>
              <ProgressBar
                progress={progress}
                backgroundColor={'gray.700'}
                fillColor="linear-gradient(110deg, accentColor 80%, accentColorTwo 90%)"
              />
            </Flex>
            <SimpleGrid columns={3} justifyItems={'end'}>
              <Text size="sm" minW="fit-content">
                {progress}%
              </Text>
              <Text size="xs" fontWeight={400} minW="fit-content">
                {`(${value.goals ?? value.touchdowns} / ${value.games})`}
              </Text>
              {progress !== 0 && (
                <Text size="xs" fontWeight={400} minW="fit-content">
                  {`+${vegasOdds}`}
                </Text>
              )}
            </SimpleGrid>
          </SimpleGrid>
        )
      })}
    </Flex>
  )
}
