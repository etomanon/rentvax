import React, { useState, useEffect } from 'react'
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
  HeaderLang,
  GoogleLogo,
} from './styled/Header'
import { useSelectorApp } from '@/redux'
import { useTranslation } from 'react-i18next'
import { Flex } from '@rebass/grid'

const HeaderView: React.FC<RouteComponentProps> = ({ history }) => {
  const { t, i18n } = useTranslation('common')
  const user = useSelectorApp((state) => state.user)
  const [active, setActive] = useState(false)
  const handlers = useSwipeable({
    onSwipedRight: () => setActive((prev) => !prev),
    trackMouse: true,
  })
  useEffect(() => {
    document.title = t('title')
  }, [i18n.language, t])

  const isEn = i18n.language.slice(0, 2) === 'en'
  return (
    <>
      <HeaderBurger active={active} onClick={() => setActive((prev) => !prev)}>
        <HeaderBurgerLine active={active} />
        <HeaderBurgerLine active={active} />
        <HeaderBurgerLine active={active} />
      </HeaderBurger>
      <HeaderWrapper
        id="navbar"
        flexDirection={['column', 'row']}
        p={['1rem 0.5rem', '1rem 0.5rem', '1rem 0']}
        mx="auto"
      >
        <HeaderTitleWrapper onClick={() => history.push('/')}>
          <HeaderLogo />
          <Text ml={2} mr={3} fontSize={3} mb={0} style={{ cursor: 'pointer' }}>
            {t('title')}
          </Text>
        </HeaderTitleWrapper>
        <HeaderWrapperLinks active={active} {...handlers}>
          <Flex mr={[0, 0, '4rem']} mb={[2, 2, 0]}>
            <HeaderLang
              pointer
              onClick={() => i18n.changeLanguage(isEn ? 'cs' : 'en')}
            >
              {isEn ? t('cs') : t('en')}
            </HeaderLang>
          </Flex>
          <HeaderNavLink
            exact
            to="/"
            mr={[0, 0, '4rem']}
            mb={[2, 2, 0]}
            onClick={() => setActive(false)}
          >
            {t('home')}
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
                {t('addReview')}
              </HeaderNavLink>
              <HeaderNavLink
                exact
                to={RoutePathEnum.MY_REVIEWS}
                mr={[0, 0, '4rem']}
                mb={[2, 2, 0]}
                onClick={() => setActive(false)}
              >
                {t('myReviews')}
              </HeaderNavLink>
              <HeaderLink
                onClick={() => setActive(false)}
                mt={[4, 4, 0]}
                href="/api/auth/logout"
              >
                {t('logout')}
              </HeaderLink>
            </>
          ) : (
            <>
              <HeaderLink
                onClick={() => setActive(false)}
                href="/api/auth/google"
                mt={[4, 4, 0]}
                logo
              >
                <GoogleLogo /> {t('login')}
              </HeaderLink>
            </>
          )}
        </HeaderWrapperLinks>
      </HeaderWrapper>
    </>
  )
}

export const Header = withRouter(HeaderView)
