import { Flex, Select } from '@chakra-ui/react'
import { FC, useEffect, useState } from 'react'

import { useData } from '../Providers/DataProvider'

const SeasonSelector: FC<{
  displayYear?: string
  seasonType?: number
  setDisplayYear: (value: string) => void
  setSeasonType: (value: number) => void
  page: 'schedule' | 'roster'
  teamId?: string
}> = ({
  displayYear,
  seasonType,
  setDisplayYear,
  setSeasonType,
  page,
  teamId,
}) => {
  const [displayYearOptions, setDisplayYearOptions] = useState<
    {
      label: string
      value: string
    }[]
  >()
  const [seasonTypeOptions, setSeasonTypeOptions] = useState<
    {
      label: string
      value: number
    }[]
  >()

  const { league } = useData()

  useEffect(() => {
    const team = league?.Teams.find((t) => t.id === teamId)
    let seasons = team?.GameSeason
    if (page === 'roster') {
      seasons = team?.RosterSeason
    }
    if (seasons) {
      const displayYearOptions = seasons?.displayYears.map((y) => {
        return { label: y, value: y }
      })
      const seasonTypeOptions = seasons.types.map((t) => {
        return { label: t.name, value: t.type }
      })

      setDisplayYearOptions(displayYearOptions)
      setDisplayYear(displayYearOptions[displayYearOptions.length - 1]?.value)
      setSeasonTypeOptions(seasonTypeOptions)
      setSeasonType(seasonTypeOptions[seasonTypeOptions.length - 1]?.value)
    }
  }, [league, page, setDisplayYear, setSeasonType, teamId])
  return (
    <Flex justifyContent={'space-between'}>
      <SelectField
        options={displayYearOptions ?? []}
        value={displayYear}
        setValue={setDisplayYear}
      />
      <SelectField
        options={seasonTypeOptions ?? []}
        value={seasonType}
        setValue={(value) => setSeasonType(parseInt(value))}
      />
    </Flex>
  )
}

export default SeasonSelector

const SelectField: FC<{
  options: { label: string; value: string | number }[]
  value?: string | number
  setValue: (value: string) => void
}> = ({ options, value, setValue }) => {
  return (
    <Select
      value={value}
      onChange={(e) => {
        setValue(e.target.value)
      }}
      width="fit-content"
    >
      {options.map((l, idx) => {
        return (
          <option value={l.value} key={idx}>
            {l.label}
          </option>
        )
      })}
    </Select>
  )
}
