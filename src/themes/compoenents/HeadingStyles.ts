export const HeadingStyles = {
  baseStyle: {
    fontFamily: 'primaryFont',
    fontSize: '32px',
    fontWeight: 600,
  },
  sizes: {
    xs: {
      fontSize: '20px',
    },
    sm: {
      fontSize: '24px',
    },
    md: {
      fontSize: '32px',
    },
    lg: {
      fontSize: '40px',
    },
    xl: {
      fontSize: '48px',
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
