import { Flex, Heading, Text } from '@chakra-ui/react'
import { FC, useEffect, useMemo, useState } from 'react'

import BackgroundComponent from '../components/BackgroundComponent'
import FDVStack from '../components/CustomChakraComponents/FDVStack'
import LoadingModal from '../components/LoadingModal'
import NoHeaderTable from '../components/NoHeaderTable'
import useAxios from '../hooks/axiosHook'
import { TodaysBirthdaysResponse } from '../types/espnApiV2'
import useModal from '../util/useModal'
import DatePicker from './DatePicker'
import moment, { Moment } from 'moment-timezone'

const TodaysBirthdays: FC = () => {
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
      <Flex maxW="500px" justifyContent="center">
        <BackgroundComponent title={date.format('MM/DD')} isCollapsible>
          <DatePicker date={date} setDate={setDate} displayYear={false} />
        </BackgroundComponent>
      </Flex>

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
