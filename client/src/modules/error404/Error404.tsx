import React from 'react'
import { RouteComponentProps } from 'react-router-dom'

import { Text } from '../../components/text/styled/Text'
import { useTranslation } from 'react-i18next'

export const Error404: React.FC<RouteComponentProps> = () => {
  const { t } = useTranslation('common')
  return (
    <Text color="primary" fontSize={5} textAlign="center" width={1}>
      {t('notFound')}
    </Text>
  )
}
