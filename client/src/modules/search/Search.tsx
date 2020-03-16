import React, { useState, useEffect, useCallback } from 'react'
import { useGeolocation } from '../../utils/hooks/useGeolocation'
import { Place } from '../../components/formik/Place'
import { Flex } from '../../components/grid/Flex'
import { Text } from '../../components/text/styled/Text'
import { TextSubtitle } from '../../components/text/styled/TextSubtitle'
import { useSelectorApp } from '@/redux'
import { Button } from '@/components/button/styled/Button'
import { useHistory } from 'react-router-dom'
import { api } from '@/utils/api/api'
import { callAsyncAction } from '@/utils/func/callAsyncAction'
import { Review } from '@/utils/types/review'
import { ReviewItem } from '@/components/reviewItem/ReviewItem'
import { groupBy } from 'lodash'
import { NativeMap } from '@/utils/types/helpers'

const prague = { lat: 50.0755381, lng: 14.4378005 }

type ReviewState = NativeMap<Review[]>

export const Search: React.FC = () => {
  const history = useHistory()
  const location = useSelectorApp(state => state.location)
  const geo = useGeolocation()
  const [reviews, setReviews] = useState<ReviewState>({})

  const loadReviews = useCallback(async () => {
    if (location.address) {
      const reviews = await callAsyncAction<Review[]>(
        api<Review[]>({
          url: 'review/flat-name',
          method: 'POST',
          body: JSON.stringify({
            flatName: location.address.formatted_address,
          }),
        })
      )
      setReviews(reviews ? (groupBy(reviews, 'flat.name') as ReviewState) : {})
    }
  }, [location.address])

  useEffect(() => {
    loadReviews()
  }, [location, loadReviews])

  return (
    <>
      <Flex width={1} flexDirection="column">
        <Flex width={[1, 0.75, 0.5, 0.333]} flexDirection="column" mx="auto">
          {location.address?.formatted_address && (
            <Flex mb={2} alignItems="center" flexDirection="column">
              <TextSubtitle>Vybraná adresa</TextSubtitle>
              <Text mt={1} fontWeight={500} textAlign="center">
                {location.address?.formatted_address}
              </Text>
              <Button
                variant="filled"
                width={1}
                my={2}
                onClick={() => history.push('/review')}
              >
                Přidat recenzi
              </Button>
            </Flex>
          )}
          <Place />
        </Flex>
        {Object.keys(reviews).map(key => (
          <React.Fragment key={key}>
            <Text mt={4} textAlign="center">
              Recenze pro
            </Text>
            <Text mt={1} textAlign="center">
              {key}
            </Text>
            <Flex mx={-2} flexWrap="wrap" alignItems="flex-start">
              {reviews[key].map(r => (
                <Flex key={r.id} mt={2} px={2} width={[1, 0.5, 0.3333, 0.25]}>
                  <ReviewItem review={r} />
                </Flex>
              ))}
            </Flex>
          </React.Fragment>
        ))}
      </Flex>
    </>
  )
}
