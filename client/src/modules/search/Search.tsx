import React, { useMemo, useState, useRef, useEffect, useCallback } from 'react'
import { GoogleMap, Marker } from '@react-google-maps/api'
import { SearchLoader } from './SearchLoader'
import { useGeolocation } from '../../utils/hooks/useGeolocation'
import { Place } from '../../components/formik/Place'
import { Flex } from '../../components/grid/Flex'
import { Text } from '../../components/text/styled/Text'
import { TextSubtitle } from '../../components/text/styled/TextSubtitle'
import { useResize } from '../../utils/hooks/useResize'
import { useSelectorApp } from '@/redux'
import { Button } from '@/components/button/styled/Button'
import { useHistory } from 'react-router-dom'
import { api } from '@/utils/api/api'
import { callAsyncAction } from '@/utils/func/callAsyncAction'
import { Review } from '@/utils/types/review'
import { ReviewItem } from '@/components/reviewItem/ReviewItem'
import { groupBy } from 'lodash'

const prague = { lat: 50.0755381, lng: 14.4378005 }

export const Search: React.FC = () => {
  const history = useHistory()
  const location = useSelectorApp(state => state.location)
  const locationCenter = location.address?.latLng
  const geo = useGeolocation()
  const { ref, height } = useResize()
  const [reviews, setReviews] = useState<Record<string, Review[]>>({})
  const center = useMemo(() => {
    return locationCenter
      ? locationCenter
      : geo.error
      ? prague
      : geo.latitude && geo.longitude
      ? { lat: geo.latitude, lng: geo.longitude }
      : prague
  }, [geo.error, geo.latitude, geo.longitude, locationCenter])

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
      setReviews(reviews ? (groupBy(reviews, 'flat.name') as any) : {})
    }
  }, [location.address])

  useEffect(() => {
    loadReviews()
  }, [location, loadReviews])

  return (
    <>
      {window.google.maps && (
        <Flex ref={ref} flex="1">
          <GoogleMap
            id="mapId"
            mapContainerStyle={{
              height: height + 'px',
              width: '66.3333%',
            }}
            options={{
              styles: [
                {
                  featureType: 'poi',
                  elementType: 'labels',
                  stylers: [{ visibility: 'off' }],
                },
              ],
            }}
            zoom={16}
            center={center}
          >
            <SearchLoader />
            {center !== prague && (
              <>
                <Marker position={center} />
              </>
            )}
          </GoogleMap>
          <Flex width={0.3333} flexDirection="column" mx={2}>
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

            {Object.keys(reviews).map(key => (
              <React.Fragment key={key}>
                <Text mt={4} textAlign="center">
                  Recenze pro
                </Text>
                <Text mt={1} textAlign="center">
                  {key}
                </Text>
                {reviews[key].map(r => (
                  <Flex key={r.id} mt={2} width={1}>
                    <ReviewItem review={r} />
                  </Flex>
                ))}
              </React.Fragment>
            ))}
          </Flex>
        </Flex>
      )}
    </>
  )
}
