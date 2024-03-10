import { extendTheme } from '@chakra-ui/react'

import { Heading } from './components/Heading'
import { Text } from './components/Text'
import { VStack } from './components/VStack'
import { Menu } from './components/Menu'
import { Table } from './components/Table'
import { Link } from './components/Link'

export const minWidth = `(min-width: 770px)`

const accentColor = '#4a90e2'
const glassBackground = 'rgba(255, 255, 255, 0.16)'
const hoverGlassBackground = 'rgba(20, 16, 16, 0.16)'
const greyText = 'rgba(255, 255, 255, 0.5)'
const greyBackground = 'rgba(170, 170, 170, .55)'
export const theme = extendTheme({
  colors: {
    accentColor,
    glassBackground,
    hoverGlassBackground,
    greyText,
    greyBackground,
  },
  styles: {
    global: {
      'html, body': {
        position: 'absolute',
        color: 'white',
        width: '100vw',
        height: '100vh',
      },
      '*': {
        fontWight: '600',
        // letterSpacing: 'wider', // or your desired default letter spacing value
      },
    },
  },
  fonts: {
    primaryFont: 'sans-serif',
  },
  components: {
    Text,
    Heading,
    VStack,
    Menu,
    Table,
    Link,
  },
})
