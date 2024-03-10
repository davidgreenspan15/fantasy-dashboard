import { FC } from 'react'
import moment, { Moment } from 'moment-timezone'
import { Flex, Select, Grid, Text, Box } from '@chakra-ui/react'
import { backdropFilter } from '../themes/components/Button'

const DatePicker: FC<{
  date: Moment
  setDate: (date: Moment) => void
  displayYear?: boolean
  minDate?: Moment
  maxDate?: Moment
}> = ({ date, setDate, displayYear = false, minDate, maxDate }) => {
  const startDay = date.clone().startOf('month').startOf('week')
  const endDay = date.clone().endOf('month').endOf('week')
  const daysArray = () => {
    const days: Moment[] = []
    let day = startDay.clone()
    while (day.isBefore(endDay, 'day')) {
      days.push(day.clone())
      day.add(1, 'day')
    }
    return days
  }

  const years = Array(20)
    .fill(0)
    .map((_, i) => moment().year() - 10 + i)

  const months = moment.months()
  return (
    <Box
      w="100%"
      backgroundColor={'greyBackground'}
      backdropFilter={backdropFilter}
    >
      <Flex justifyContent="center" m={4}>
        {displayYear && (
          <Select
            value={date.year()}
            onChange={(e) =>
              setDate(date.clone().year(parseInt(e.target.value)))
            }
            backgroundColor={'greyBackground'}
          >
            {years.map((year) => (
              <option
                key={year}
                value={year}
                style={{ backgroundColor: 'greyBackground' }}
              >
                {year}
              </option>
            ))}
          </Select>
        )}

        <Select
          value={date.month()}
          onChange={(e) => setDate(date.clone().month(e.target.value))}
        >
          {months.map((month, idx) => (
            <option key={month} value={idx}>
              {month}
            </option>
          ))}
        </Select>
      </Flex>
      <Grid templateColumns="repeat(7, 1fr)" gap={1}>
        {moment.weekdaysShort().map((day) => (
          <Text key={day} textAlign="center">
            {day}
          </Text>
        ))}
        {daysArray().map((day) => {
          const isBeforeMinDate = (() => {
            if (minDate) {
              return (
                day.month() === minDate.month() && day.isBefore(minDate, 'date')
              )
            }
            return false
          })()
          const isAfterMaxDate = (() => {
            if (maxDate) {
              return (
                day.month() === maxDate.month() &&
                day.isSameOrAfter(maxDate, 'date')
              )
            }
            return false
          })()
          const isDisabled =
            day.month() !== date.month() || isBeforeMinDate || isAfterMaxDate

          const isSelected = date.isSame(day, 'date')
          return (
            <Text
              key={day.format('DDMMYYYY')}
              textAlign="center"
              backgroundColor={date.isSame(day, 'day') ? 'accentColor' : 'none'}
              color={isDisabled ? 'greyText' : 'white'}
              cursor={isDisabled ? 'not-allowed' : 'pointer'}
              p={2}
              onClick={isDisabled ? () => null : () => setDate(day)}
              borderRadius={10}
              _hover={{
                backgroundColor: isDisabled
                  ? 'none'
                  : isSelected
                  ? 'activeRed'
                  : 'hoverGlassBackground',
                borderRadius: 10,
              }}
            >
              {day.date()}
            </Text>
          )
        })}
      </Grid>
    </Box>
  )
}

export default DatePicker
