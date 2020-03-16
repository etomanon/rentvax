import React, { useState } from 'react'
import Truncate from 'react-truncate'
import { Review } from '@/utils/types/review'
import { Container, Description, Toggle } from './styled/ReviewItem'
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
  const [truncated, setTruncated] = useState(true)
  const onTruncate = () => {
    setTruncated(prev => !prev)
  }
  return (
    <Container id={id.toString()}>
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

      <Description
        mt={1}
        maxHeight={truncated ? '10rem' : 'auto'}
        overflow="hidden"
      >
        {!truncated && (
          <Toggle href={`#${id}`} onClick={onTruncate} truncated={truncated}>
            Čti méně
          </Toggle>
        )}
        {description}
        <Toggle href={`#${id}`} onClick={onTruncate} truncated={truncated}>
          {truncated ? 'Čti více' : 'Čti méně'}
        </Toggle>
      </Description>
    </Container>
  )
}
