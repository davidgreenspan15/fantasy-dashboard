import { Collapse, Flex, Link, useMediaQuery } from '@chakra-ui/react'
import { FC, useEffect, useRef, useState } from 'react'
import { Link as RRLink } from 'react-router-dom'

import FDVStack from './CustomChakraComponents/FDVStack'
import { minWidth } from '../themes/themes'

const navBarOptions = {
  NFL: {
    options: ['Teams', 'Schedule', 'Scores', 'Stats', 'Draft Board'],
  },
  NBA: {
    options: ['Teams', 'Schedule', 'Scores', 'Stats'],
  },
  MLB: {
    options: ['Teams', 'Schedule', 'Scores', 'Stats'],
  },
  NHL: {
    options: ['Teams', 'Schedule', 'Scores', 'Stats'],
  },
  Tools: {
    options: ['Draft Board', 'SQL Editor', 'Todays Birthdays'],
  },
}
const NavBar: FC<{
  currentKey?: string
  setCurrentKey: (string?: string) => void
}> = ({ currentKey, setCurrentKey }) => {
  const isDesktop = useMediaQuery(minWidth)[0] ? true : false

  const [hoveringMenu, setHoveringMenu] = useState<boolean>(false)
  const [hoveringOnOptionList, setHoveringOnOptionList] =
    useState<boolean>(false)

  const leaveMenuOption = () => {
    setTimeout(() => {
      setHoveringMenu(false)
    }, 1000)
  }

  useEffect(() => {
    if (!hoveringOnOptionList && !hoveringMenu) {
      setCurrentKey(undefined)
    }
  }, [hoveringOnOptionList, hoveringMenu, setCurrentKey])

  return (
    <FDVStack
      w="100%"
      position="relative"
      onMouseLeave={() => leaveMenuOption()}
      zIndex={2}
    >
      <Flex
        alignItems={'center'}
        w="100%"
        justifyContent={isDesktop ? 'flex-start' : 'space-between'}
        p="10px"
        backdropFilter="blur(12px)"
        backgroundColor={'transparent'}
      >
        {Object.keys(navBarOptions).map((key, idx) => {
          return (
            <NavBarButtons
              navBarKey={key}
              key={idx}
              isActive={currentKey === key}
              options={navBarOptions[key].options}
              currentKey={currentKey}
              setCurrentKey={setCurrentKey}
              setHoveringOnOptionList={setHoveringOnOptionList}
            />
          )
        })}
      </Flex>
    </FDVStack>
  )
}

export default NavBar

const NavBarButtons: FC<{
  isActive: boolean
  navBarKey: string
  options: string[]
  currentKey?: string
  setCurrentKey: (key?: string) => void
  setHoveringOnOptionList: (o: boolean) => void
}> = ({
  isActive,
  navBarKey,
  options,
  currentKey,
  setCurrentKey,
  setHoveringOnOptionList,
}) => {
  const menuRef = useRef<HTMLDivElement>(null)
  const isDesktop = useMediaQuery(minWidth)[0] ? true : false

  const offsetLeft = menuRef?.current?.offsetLeft
    ? menuRef.current.offsetLeft - 7
    : 0

  return (
    <>
      <Flex
        pb="2px"
        textDecoration={isActive ? 'underline' : 'none'}
        textUnderlineOffset={isActive ? '5px' : 'inherit'}
        px="20px"
        // onClick={() => setCurrentKey(key)}
        onMouseEnter={() => setCurrentKey(navBarKey)}
        ref={menuRef}
      >
        {navBarKey}
      </Flex>
      <Flex
        position="absolute"
        onMouseLeave={() => setHoveringOnOptionList(false)}
        onMouseEnter={() => setHoveringOnOptionList(true)}
        top="40px"
        left={`${offsetLeft}px`}
        // right={`${offsetRight()}px`}
      >
        <Collapse in={isActive} animateOpacity unmountOnExit>
          <Flex
            flexDirection={isDesktop ? 'row' : 'column'}
            gap={'20px'}
            bg={'white'}
            borderRadius="1px 1px 5px 5px"
            minH={'30px'}
            alignItems={'center'}
            justifyContent={'flex-start'}
            p="8px"
            w={isDesktop ? 'fit-content' : '100%'}
          >
            {options?.map((option, idx) => {
              return (
                <Flex key={idx}>
                  <Link
                    textAlign={'center'}
                    as={RRLink}
                    to={`/${currentKey}/${option}`.toLowerCase()}
                    color="black"
                  >
                    {option}
                  </Link>
                </Flex>
              )
            })}
          </Flex>
        </Collapse>
      </Flex>
    </>
  )
}
