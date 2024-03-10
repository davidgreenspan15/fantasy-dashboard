import { Flex, FlexProps } from '@chakra-ui/react'
import { FC, PropsWithChildren } from 'react'
import { backdropFilter } from '../themes/components/Button'

export const FloatingContainerClear: FC<PropsWithChildren<FlexProps>> = ({
  children,
  ...rest
}) => {
  return (
    <Flex
      {...rest}
      backgroundColor="glassBackground" // Adjust the alpha for transparency
      borderRadius="40px"
      backdropFilter={backdropFilter}
    >
      {children}
    </Flex>
  )
}

export const FloatingContainerGrey: FC<PropsWithChildren<FlexProps>> = ({
  children,
  ...rest
}) => {
  return (
    <Flex
      {...rest}
      backgroundColor="greyBackground" // Adjust the alpha for transparency
      borderRadius="40px"
      backdropFilter={backdropFilter}
    >
      {children}
    </Flex>
  )
}
