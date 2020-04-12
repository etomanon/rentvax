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
import { callApi } from '@/utils/func/callApi'
import { RoutePathEnum } from '@/router/routes'
import { MapMarkerAlt } from '@styled-icons/fa-solid/MapMarkerAlt'

const prague = { lat: 50.0755381, lng: 14.4378005 }

type ReviewState = NativeMap<Review[]>

export const Search = () => {
  const history = useHistory()
  const user = useSelectorApp(state => state.user)
  const location = useSelectorApp(state => state.location)
  const geo = useGeolocation()
  const [reviews, setReviews] = useState<ReviewState>({})

  const loadReviews = useCallback(async () => {
    if (location.address) {
      const { lng, lat } = location.address.latLng
      const reviews = await callApi<Review[]>({
        url: 'review/distance',
        method: 'POST',
        body: JSON.stringify({
          geom: {
            type: 'Point',
            coordinates: [lng, lat],
          },
        }),
      })
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
                onClick={() => history.push(RoutePathEnum.REVIEW)}
                disabled={!user}
              >
                Přidat recenzi
              </Button>
              {!user && (
                <Text mt={1} mb={3}>
                  Pro přidání recenze se musíte přihlásit
                </Text>
              )}
            </Flex>
          )}
          <Place />
        </Flex>
        {Object.keys(reviews).map(key => (
          <React.Fragment key={key}>
            <TextSubtitle
              as="a"
              mt={4}
              textAlign="center"
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                key
              )}`}
              target="_blank"
            >
              {key}
              <MapMarkerAlt
                style={{ marginLeft: '1rem' }}
                width="1.5rem"
                height="2rem"
              />
            </TextSubtitle>
            <Flex mx={-2} flexWrap="wrap" alignItems="flex-start">
              {reviews[key].map(r => (
                <Flex key={r.id} mt={2} px={2} width={[1, 0.5, 0.3333]}>
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
