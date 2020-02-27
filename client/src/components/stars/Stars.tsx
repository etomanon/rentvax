import React from 'react'
import { theme } from '@/theme/theme'
import StarRatingComponent from 'react-star-rating-component'
import { Container } from './styled/Stars'

interface StarsProps {
  name: string | number
  rating: number
}

export const Stars: React.FC<StarsProps> = ({ name, rating }) => {
  return (
    <Container>
      <StarRatingComponent
        name={name + 'rating'}
        starCount={5}
        value={rating}
        starColor={theme.colors.secondary}
      />
    </Container>
  )
}
