import React from 'react'
import { RouteComponentProps } from 'react-router-dom'

import { Text } from '../../components/text/styled/Text'

export const Error404: React.FC<RouteComponentProps> = () => {
  return (
    <Text color="primary" fontSize={5} textAlign="center" width={1}>
      Nenalezeno
    </Text>
  )
}
