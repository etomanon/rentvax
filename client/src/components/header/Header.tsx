import React, { useState } from 'react'
import { useSwipeable } from 'react-swipeable'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import { Text } from '../text/styled/Text'
import { RoutePathEnum } from '@/router/routes'

import {
  HeaderTitleWrapper,
  HeaderLogo,
  HeaderWrapper,
  HeaderWrapperLinks,
  HeaderBurger,
  HeaderBurgerLine,
  HeaderLink,
  HeaderNavLink,
  HeaderBackground,
} from './styled/Header'
import { useSelectorApp } from '@/redux'

const HeaderView: React.FC<RouteComponentProps> = ({ history }) => {
  const user = useSelectorApp((state) => state.user)
  const [active, setActive] = useState(false)
  const handlers = useSwipeable({
    onSwipedRight: () => setActive((prev) => !prev),
    trackMouse: true,
  })
  return (
    <>
      <HeaderBurger active={active} onClick={() => setActive((prev) => !prev)}>
        <HeaderBurgerLine active={active} />
        <HeaderBurgerLine active={active} />
        <HeaderBurgerLine active={active} />
      </HeaderBurger>
      <HeaderBackground />
      <HeaderWrapper
        id="navbar"
        p={['1rem 0.5rem', '1rem 0.5rem', '1rem 0']}
        mx="auto"
        flexDirection={['column', 'row']}
      >
        <HeaderTitleWrapper onClick={() => history.push('/')}>
          <HeaderLogo size="3rem" />
          <Text ml={2} mr={3} fontSize={3} mb={0} style={{ cursor: 'pointer' }}>
            Hodnocení podnájmů
          </Text>
        </HeaderTitleWrapper>
        <HeaderWrapperLinks active={active} {...handlers}>
          <HeaderNavLink
            exact
            to="/"
            mr={[0, 0, '4rem']}
            mb={[2, 2, 0]}
            onClick={() => setActive(false)}
          >
            Domů
          </HeaderNavLink>
          {user ? (
            <>
              <HeaderNavLink
                exact
                to={RoutePathEnum.REVIEW}
                mr={[0, 0, '4rem']}
                mb={[2, 2, 0]}
                onClick={() => setActive(false)}
              >
                Přidat recenzi
              </HeaderNavLink>
              <HeaderNavLink
                exact
                to={RoutePathEnum.MY_REVIEWS}
                mr={[0, 0, '4rem']}
                mb={[2, 2, 0]}
                onClick={() => setActive(false)}
              >
                Moje recenze
              </HeaderNavLink>
              <HeaderLink
                onClick={() => setActive(false)}
                mt={[4, 4, 0]}
                href="/api/auth/logout"
              >
                Odhlásit se
              </HeaderLink>
            </>
          ) : (
            <HeaderLink
              onClick={() => setActive(false)}
              href="/api/auth/google"
            >
              Přihlásit se
            </HeaderLink>
          )}
        </HeaderWrapperLinks>
      </HeaderWrapper>
    </>
  )
}

export const Header = withRouter(HeaderView)
