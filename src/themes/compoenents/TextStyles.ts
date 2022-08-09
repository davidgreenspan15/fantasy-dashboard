export const TextStyles = {
  baseStyle: {
    fontFamily: 'primaryFont',
    fontSize: '32px',
    fontWeight: 600,
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
      color: 'primaryColor',
    },
    secondary: {
      fontFamily: 'secondaryFont',
      color: 'secondaryColor',
    },
  },
  defaultProps: {
    variant: 'primary',
    size: 'md',
  },
}
