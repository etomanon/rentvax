import React from 'react'
import { useHistory } from 'react-router-dom'

import { Flex } from '../../components/grid/Flex'
import { Text } from '../../components/text/styled/Text'
import { TextHeader } from '../../components/text/styled/TextHeader'
import { Place } from '../../components/formik/Place'

import { HomeImg, IconSecret, IconGithub, IconDonate } from './styled/Home'
import { RoutePathEnum } from '@/router/routes'
import { QS_ADDRESS, QS_PLACE_ID } from '../search/Search'
import { useTranslation } from 'react-i18next'
import { HomeInfoProps, HomeInfo } from './HomeInfo'
import { Link } from '@/components/control/Link'

const INFO_ITEMS: HomeInfoProps[] = [
  {
    title: 'infoAnonymousTitle',
    Icon: <IconSecret />,
    text: 'infoAnonymousText',
  },
  {
    Icon: <IconGithub />,
    title: 'infoOpenTitle',
    text: 'infoOpenText',
    Extra: <Link href="https://github.com/etomanon/rentvax">GitHub</Link>,
  },
  {
    Icon: <IconDonate />,
    title: 'infoDonateTitle',
    text: 'infoDonateText',
  },
]

export const Home = () => {
  const { t } = useTranslation('common')
  const { push } = useHistory()
  const onSelect = (formatted_address: string, place_id: string) => {
    push({
      pathname: RoutePathEnum.SEARCH,
      search:
        '?' +
        new URLSearchParams({
          [QS_ADDRESS]: formatted_address,
          [QS_PLACE_ID]: place_id,
        }).toString(),
    })
  }

  return (
    <>
      <Flex
        flexWrap={['wrap', 'wrap', 'nowrap']}
        width="100%"
        alignContent="flex-start"
      >
        <Flex
          style={{ position: 'relative' }}
          width={[1, 1, 0.55]}
          mt={['2rem', '2rem', '10rem']}
          mr={[0, 0, '4rem', 'auto']}
          pb="2rem"
          flexDirection="column"
        >
          <TextHeader textAlign="center">{t('header')}</TextHeader>
          <Text fontSize={3} mt="1rem" mb="2rem" textAlign="center">
            {t('search')}
          </Text>
          <Place onSelect={onSelect} placeholder={t('placeholder')} />
        </Flex>
        <HomeImg />
      </Flex>
      <Flex
        flex={1}
        mx={-3}
        width={1}
        mt={[0, 0, '8rem']}
        flexWrap="wrap"
        mb="1rem"
      >
        {INFO_ITEMS.map((i) => (
          <HomeInfo key={i.title} {...i} />
        ))}
      </Flex>
    </>
  )
}
