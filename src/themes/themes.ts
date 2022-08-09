import { extendTheme } from '@chakra-ui/react'
import { TextStyles } from './compoenents/TextStyles'
import { HeadingStyles } from './compoenents/HeadingStyles'

export const theme = extendTheme({
  colors: {
    primaryColor: '#000000',
    secondaryColor: '#A0AEC0',
    accentColor: '#2C5282',
  },
  components: {
    Text: TextStyles,
    Heading: HeadingStyles,
  },
})
