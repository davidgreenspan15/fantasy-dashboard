import { Flex, Select } from '@chakra-ui/react'
import { FC, useEffect, useState } from 'react'

import { useData } from '../Providers/DataProvider'
import { LeagueWithTeamsResponse } from '../types/espnApiV2'

const SeasonSelector: FC<{
  displayYear?: string
  seasonType?: number
  setDisplayYear: (value: string) => void
  setSeasonType: (value: number) => void
}> = ({ displayYear, seasonType, setDisplayYear, setSeasonType }) => {
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
    const displayYearHash: Record<string, LeagueWithTeamsResponse.Game> = {}
    const seasonTypeHash: Record<string, LeagueWithTeamsResponse.Game> = {}
    league?.Games?.forEach((g) => {
      if (!g.Season) {
      }
      displayYearHash[g.Season.displayYear] = g
      seasonTypeHash[g.Season.type] = g
    })
    const displayYearOptions = Object.keys(displayYearHash).map((k) => {
      return {
        label: displayYearHash[k].Season.displayYear,
        value: displayYearHash[k].Season.displayYear,
      }
    })
    const seasonTypeOptions = Object.keys(seasonTypeHash).map((k) => {
      return {
        label: seasonTypeHash[k].Season.name,
        value: seasonTypeHash[k].Season.type,
      }
    })
    setDisplayYearOptions(displayYearOptions)
    setDisplayYear(displayYearOptions[displayYearOptions.length - 1]?.value)
    setSeasonTypeOptions(seasonTypeOptions)
    setSeasonType(seasonTypeOptions[seasonTypeOptions.length - 1]?.value)
  }, [league, setDisplayYear, setSeasonType])

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
