export enum Sport {
  NFL = 'NFL',
  NBA = 'NBA',
  MLB = 'MLB',
  NHL = 'NHL',
}
export const sportPeriod: (sport: Sport, period: number) => string = (
  sport,
  period
) => {
  if (sport === Sport.NFL || sport === Sport.NBA) {
    if (period <= 4) {
      return `${ordinal(period)} Quarter`
    } else {
      const overtimePeriod = period - 4
      return overtimePeriod === 1
        ? 'Overtime'
        : `${ordinal(overtimePeriod)} Overtime`
    }
  } else if (sport === Sport.NHL) {
    if (period <= 3) {
      return `${ordinal(period)} Period`
    } else {
      const overtimePeriod = period - 3
      return overtimePeriod === 1
        ? 'Overtime'
        : `${ordinal(overtimePeriod)} Overtime`
    }
  } else if (sport === Sport.MLB) {
    return `${ordinal(period)} Inning`
  } else {
    return 'Invalid sport'
  }
}

const ordinal: (n: number) => string = (n) => {
  const s = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  return n + (s[(v - 20) % 10] || s[v] || s[0])
}
