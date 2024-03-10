export const Text = {
  baseStyle: {
    fontFamily: 'primaryFont',
    fontWeight: '600',
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
    primary: {
      fontFamily: 'primaryFont',
    },
    secondary: {
      fontFamily: 'secondaryFont',
    },
  },
  defaultProps: {
    variant: 'primary',
    size: ['xs', 'sm'],
  },
}
