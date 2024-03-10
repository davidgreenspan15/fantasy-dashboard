import { defineStyle } from '@chakra-ui/react'

const floating = defineStyle({
  button: {
    py: '10px',
    px: '60px',
    borderRadius: '80px',
    backgroundColor: 'transparent', // Adjust the alpha for transparency
    backdropFilter: 'blur(12px)',
    _hover: {
      backgroundColor: 'glassBackground',
    },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '600',
    letterSpacing: 'wider',
  },
  list: {
    p: 0,
    backgroundColor: 'greyBackground', // Adjust the alpha for transparency
    backdropFilter: 'blur(12px)',
    display: 'flex',
    flexDirection: 'column',
  },
  item: {
    backgroundColor: 'transparent', // Adjust the alpha for transparency
    _hover: {
      backgroundColor: 'hoverGlassBackground',
    },
  },
})

export const Menu = {
  baseStyle: {
    fontWeight: '600',
  },
  variants: {
    floating,
  },
}
