import { Flex, Text } from '@chakra-ui/react'
import { FC, PropsWithChildren } from 'react'
import { backdropFilter } from '../themes/components/Button'

export const hexToRgb = (hex: string, opacity?: number) => {
  // Remove the '#' symbol if it exists.
  hex = hex.replace('#', '')

  // Convert the hex value to a number.
  const num = parseInt(hex, 16)

  // Split the number into three parts, one for each color channel.
  const r = (num >> 16) & 255
  const g = (num >> 8) & 255
  const b = num & 255

  // Return the RGB color code as an array.
  return `rgb(${r} ${g} ${b} / ${opacity ?? 1})`
}
const BackgroundComponent: FC<
  PropsWithChildren<{ title: string; titleBgColor?: string }>
> = ({ title, titleBgColor, children }) => {
  return (
    <Flex
      w="100%"
      flexDirection={'column'}
      alignItems={'center'}
      borderRadius={10}
      overflow={'hidden'}
    >
      <Flex
        backgroundColor={'greyBackground'}
        backdropFilter={backdropFilter}
        w="100%"
        flexDirection={'column'}
        alignItems={'center'}
      >
        <Text
          backgroundColor={titleBgColor ? hexToRgb(titleBgColor, 0.5) : 'unset'}
          // borderBottom={'1px solid'}
          // borderColor={hexToRgb(titleBgColor ?? '#ffffff', 0.5)}
          fontSize="12px"
          w="100%"
          letterSpacing="wider"
          textTransform="uppercase"
          textAlign={'center'}
          lineHeight={4}
          p={2}
        >
          {title}
        </Text>
      </Flex>
      {children}
    </Flex>
  )
}

export default BackgroundComponent
