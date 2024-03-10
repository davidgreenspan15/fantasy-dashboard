import { Heading } from '@chakra-ui/react'
import { FC, useEffect, useState } from 'react'

import BackgroundComponent from '../components/BackgroundComponent'
import FDVStack from '../components/CustomChakraComponents/FDVStack'
import LoadingModal from '../components/LoadingModal'
import NoHeaderTable from '../components/NoHeaderTable'
import SeasonSelector from '../components/SeasonWrapper'
import useAxios from '../hooks/axiosHook'
import { useData } from '../Providers/DataProvider'
import { PlayersResponse } from '../types/espnApiV2'
import useModal from '../util/useModal'

const RosterPage: FC = () => {
  const { team } = useData()

  const {
    modal: loadingModal,
    onClose: onCloseLoadingModal,
    onOpen: onOpenLoadingModal,
  } = useModal(<LoadingModal />, 'sm')

  const [displayYear, setDisplayYear] = useState<string>()
  const [seasonType, setSeasonType] = useState<number>()

  const [{ data, loading, error }, call] = useAxios<PlayersResponse[]>({
    path: 'getRoster',
    method: 'post',
    lazy: true,
  })

  if (error) {
    console.error(error)
  }
  useEffect(() => {
    if (team) {
      call('getRoster', 'post', {
        teamId: team.id,
        displayYear: displayYear,
        seasonType: seasonType,
      })
    }
  }, [displayYear, seasonType, team, call])

  useEffect(() => {
    if (loading) {
      onOpenLoadingModal()
    } else {
      onCloseLoadingModal()
    }
  }, [loading, onCloseLoadingModal, onOpenLoadingModal])
  const tables = data?.reduce((acc, player) => {
    let p = player.positionDisplayName
    if (player.rootParentPositionDisplayName) {
      p = player.rootParentPositionDisplayName
    }

    if (p) {
      if (!acc[p]) {
        acc[p] = [player]
      } else {
        acc[p].push(player)
      }
    }
    return acc
  }, {} as Record<string, PlayersResponse[]>)

  const columns = [
    { label: 'image', key: 'imageUrl', type: 'image', minWidth: '50px' },
    { label: 'Player', key: 'displayName', type: 'string' },
    { label: 'Number', key: 'number', type: 'number' },
    { label: 'Position', key: 'positionDisplayName', type: 'string' },
  ]

  return (
    <FDVStack w="100%">
      {loadingModal}
      <Heading variant="floating" alignSelf={'center'}>
        {team?.displayName} Roster
      </Heading>
      <SeasonSelector
        displayYear={displayYear}
        seasonType={seasonType}
        setDisplayYear={setDisplayYear}
        setSeasonType={setSeasonType}
        teamId={team?.id}
        page="roster"
      />
      {tables
        ? Object.keys(tables).map((k, idx) => {
            return (
              <BackgroundComponent
                title={k}
                key={idx}
                titleBgColor={team?.color}
              >
                <NoHeaderTable
                  columns={columns}
                  rows={tables[k]}
                  showColumnHeaders={true}
                />
              </BackgroundComponent>
            )
          })
        : null}
    </FDVStack>
  )
}

export default RosterPage
