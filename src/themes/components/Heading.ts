import { defineStyle } from '@chakra-ui/react'

const floating = defineStyle({
  backgroundColor: 'glassBackground', // Adjust the alpha for transparency
  backdropFilter: 'blur(12px)',
  py: '10px',
  px: '30px',
  borderRadius: '80px',
  width: 'fit-content',
  letterSpacing: 'wider',
  textTransform: 'uppercase',
  fontSize: '12px',
  textAlign: 'center',
})

export const Heading = {
  baseStyle: {
    fontFamily: 'primaryFont',
    fontSize: '32px',
  },
  sizes: {
    xs: {
      fontSize: '12px',
    },
    sm: {
      fontSize: '14px',
    },
    md: {
      fontSize: '16px',
    },
    lg: {
      fontSize: '20px',
    },
    xl: {
      fontSize: '24px',
    },
  },
  variants: {
    floating,
    primary: {
      fontFamily: 'primaryFont',
      color: 'primaryColor',
    },
    secondary: {
      fontFamily: 'secondaryFont',
      color: 'secondaryColor',
    },
  },
  defaultProps: {
    variant: 'primary',
    size: ['sm', 'md'],
  },
}
