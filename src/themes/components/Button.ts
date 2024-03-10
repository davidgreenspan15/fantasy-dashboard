import { defineStyle } from '@chakra-ui/react'
export const backdropFilter = 'blur(12px)'

const floating = defineStyle({
  backgroundColor: 'glassBackground', // Adjust the alpha for transparency
  backdropFilter: 'blur(12px)',
  _hover: {
    backgroundColor: 'hoverGlassBackground',
  },
})

export const Button = {
  baseStyle: {
    width: 'fit-content',
  },
  variants: {
    floating,
  },
}
