import React, { useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { Text } from '../../components/text/styled/Text'

export const Dashboard: React.FC<RouteComponentProps> = () => {
  return (
    <>
      <Text>Dashboard</Text>
    </>
  )
}
