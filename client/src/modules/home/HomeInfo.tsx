import React from 'react'
import { Flex } from '@/components/grid/Flex'
import { Text } from '@/components/text/styled/Text'
import { useTranslation } from 'react-i18next'

export type HomeInfoProps = {
  Icon: React.ReactNode
  title: string
  text: string
  Extra?: React.ReactNode
}

export const HomeInfo = ({ Icon, title, text, Extra }: HomeInfoProps) => {
  const { t } = useTranslation('common')

  return (
    <Flex
      width={[1, 1, 0.33333]}
      mt={['3rem', '3rem', 0]}
      px={3}
      display="flex"
      flexDirection="column"
      alignItems="center"
      textAlign="center"
    >
      {Icon}
      <Text mt="1rem" mb="1.5rem" fontSize={3}>
        {t(title)}
      </Text>
      <Text>
        {t(text)}&nbsp;{Extra}
      </Text>
    </Flex>
  )
}
