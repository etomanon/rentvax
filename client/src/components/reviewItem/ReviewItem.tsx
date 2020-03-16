import React, { useState, useRef, useEffect } from 'react'
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

const isOverflown = ({
  clientWidth,
  clientHeight,
  scrollWidth,
  scrollHeight,
}: HTMLElement) => {
  return scrollHeight > clientHeight || scrollWidth > clientWidth
}

export const ReviewItem: React.FC<ReviewItemProps> = ({
  review: { id, rating, description, user, flat, createdAt, updatedAt },
}) => {
  const refDescription = useRef<HTMLDivElement>(null)
  const [truncated, setTruncated] = useState(true)
  const [overflow, setOverflow] = useState(false)
  const onTruncate = () => {
    setTruncated(prev => !prev)
  }
  const reviewId = `review${id.toString()}`

  useEffect(() => {
    if (refDescription.current) {
      setOverflow(isOverflown(refDescription.current))
    }
  }, [refDescription])

  return (
    <Container id={reviewId}>
      <Flex justifyContent="space-between" mx={1}>
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
        ml={2}
        pr="1.7rem"
        maxHeight={truncated ? '5rem' : 'auto'}
        truncated={truncated}
        ref={refDescription}
      >
        {description}
        <Toggle
          href={`#${reviewId}`}
          onClick={onTruncate}
          truncated={truncated}
          overflow={overflow}
        />
      </Description>
    </Container>
  )
}
