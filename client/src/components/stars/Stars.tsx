import React from 'react'
import { STARS } from '../formik/Rating'
import { StarItem } from '../formik/styled/Rating'

interface StarsProps {
  rating: number
}

export const Stars: React.FC<StarsProps> = ({ rating }) => {
  return (
    <div>
      {STARS.map(({ id }) => (
        <StarItem key={id} disabled active={rating >= id} height="1.75rem" />
      ))}
    </div>
  )
}
