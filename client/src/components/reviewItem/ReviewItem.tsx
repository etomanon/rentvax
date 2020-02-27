import React from 'react'
import { Review } from '@/utils/types/review'
import { Container } from './styled/ReviewItem'
import { Text } from '../text/styled/Text'
import { Stars } from '../stars/Stars'
import { Flex } from '@rebass/grid'
import { timeParse } from '@/utils/func/time'

interface ReviewItemProps {
  review: Review
}

export const ReviewItem: React.FC<ReviewItemProps> = ({
  review: { id, rating, description, user, flat, createdAt, updatedAt },
}) => {
  return (
    <Container>
      <Flex justifyContent="space-between">
        <Stars name={id} rating={rating} />
        <Flex flexDirection="column">
          <Text mt={1} fontSize={1} textAlign="right">
            Uživatel {user.id}
          </Text>
          <Text fontSize={1} textAlign="right">
            {timeParse(updatedAt)}
          </Text>
        </Flex>
      </Flex>

      <Text mt={1}>{description}</Text>
    </Container>
  )
}
