import { extendTheme } from '@chakra-ui/react'

import { HeadingStyles } from './compoenents/HeadingStyles'
import { TextStyles } from './compoenents/TextStyles'
import { VStackStyle } from './compoenents/VStackStyles'

export const theme = extendTheme({
  colors: {
    primaryColor: '#000000',
    secondaryColor: '#A0AEC0',
    accentColor: '#2C5282',
  },
  fonts: {
    primaryFont: 'sans-serif',
  },
  components: {
    Text: TextStyles,
    Heading: HeadingStyles,
    VStack: VStackStyle,
  },
})
