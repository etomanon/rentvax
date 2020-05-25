import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { Place } from '../../components/formik/Place'
import { Flex } from '../../components/grid/Flex'
import { Text } from '../../components/text/styled/Text'
import { TextSubtitle } from '../../components/text/styled/TextSubtitle'
import { useSelectorApp } from '@/redux'
import { Button } from '@/components/button/styled/Button'
import { useHistory, useLocation } from 'react-router-dom'
import { ApiProps } from '@/utils/api/api'
import { Review } from '@/utils/types/review'
import { ReviewItem } from '@/components/reviewItem/ReviewItem'
import { groupBy } from 'lodash'
import { NativeMap } from '@/utils/types/helpers'
import { RoutePathEnum } from '@/router/routes'
import { Pagination } from '@/components/pagination/Pagination'
import { scrollSmooth } from '@/utils/func/scrollSmooth'
import { Tooltip } from '@/components/tooltip/Tooltip'
import { Box } from '@rebass/grid'
import { QS_FLAT_NAME } from '../flat/Flat'
import { useTranslation } from 'react-i18next'
import { GoogleLogo } from '@/components/header/styled/Header'
import { Link } from '@/components/control/Link'
import { MapMarkerIcon } from '@/components/reviewItem/styled/ReviewItem'
import { ArrowRightIcon } from './styled/Search'

export const QS_ADDRESS = 'address'
export const QS_PLACE_ID = 'place_id'

type ReviewState = NativeMap<Review[]>

export const Search = () => {
  const { t } = useTranslation('common')
  const [initAddress, setInitAddress] = useState<
    | {
        formatted_address: string
        place_id: string
      }
    | undefined
  >(undefined)
  const { search } = useLocation()
  const history = useHistory()
  const firstUpdate = useRef(true)
  const refList = useRef<HTMLDivElement>(null)
  const user = useSelectorApp((state) => state.user)
  const location = useSelectorApp((state) => state.location)
  const [reviews, setReviews] = useState<ReviewState>({})

  useEffect(() => {
    const qsAddress = new URLSearchParams(search).get(QS_ADDRESS)
    const qsPlaceId = new URLSearchParams(search).get(QS_PLACE_ID)
    if (qsAddress && qsPlaceId) {
      setInitAddress({
        formatted_address: qsAddress,
        place_id: qsPlaceId,
      })
    }
  }, [search])

  const apiProps: ApiProps | null = useMemo(() => {
    if (location.address) {
      const { lng, lat } = location.address.latLng
      return {
        url: 'review/distance',
        method: 'POST',
        body: {
          geom: {
            type: 'Point',
            coordinates: [lng, lat],
          },
        },
      }
    }
    return null
  }, [location.address])

  const onLoad = useCallback(
    async (result: Review[]) => {
      setReviews(result ? (groupBy(result, 'flat.name') as ReviewState) : {})
      if (firstUpdate.current) {
        firstUpdate.current = false
        return
      }
      if (refList.current) {
        scrollSmooth(refList.current)
      }
    },
    [refList, firstUpdate]
  )

  const onSelect = useCallback(
    (formatted_address: string, place_id: string) => {
      history.push({
        search:
          '?' +
          new URLSearchParams({
            [QS_ADDRESS]: formatted_address,
            [QS_PLACE_ID]: place_id,
          }).toString(),
      })
    },
    [history]
  )

  return (
    <>
      <Flex width={1} flexDirection="column">
        <Flex width={[1, 0.75, 0.5, 0.333]} flexDirection="column" mx="auto">
          {location.address?.formatted_address && (
            <Flex mb={2} alignItems="center" flexDirection="column">
              <TextSubtitle>{t('nearestReviews')}</TextSubtitle>
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
                {t('addReview')}
              </Button>

              {!user && (
                <Link
                  display="flex"
                  alignItems="center"
                  flexDirection={['column', 'row']}
                  mt={1}
                  mb={3}
                  href="/api/auth/google"
                  target="_self"
                  textAlign="center"
                >
                  <GoogleLogo /> {t('loginToRate')}
                </Link>
              )}
            </Flex>
          )}
          <Place onSelect={onSelect} initAddress={initAddress} />
        </Flex>
        <div ref={refList} />
        {Object.keys(reviews).map((key) => (
          <React.Fragment key={key}>
            <Box mt={4} />
            <Flex width={1} textAlign="center">
              <Tooltip tooltip={t('showOnMap')} fullWidth>
                <TextSubtitle
                  as="a"
                  textAlign="center"
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    key
                  )}`}
                  target="_blank"
                >
                  {key}
                  <MapMarkerIcon />
                </TextSubtitle>
              </Tooltip>
            </Flex>
            <Flex
              mx={-2}
              flexWrap="wrap"
              alignItems="flex-start"
              justifyContent={reviews[key].length > 2 ? 'flex-start' : 'center'}
            >
              {reviews[key].map((r, i) => (
                <Flex
                  key={r.id}
                  mt={2}
                  px={2}
                  width={[1, 1, i < 2 ? 0.5 : 1, i < 2 ? 0.4 : 0.2]}
                >
                  {i < 2 ? (
                    <ReviewItem review={r} />
                  ) : (
                    <Button
                      mt={['0', '0', '1.75rem']}
                      width={1}
                      onClick={() =>
                        history.push({
                          pathname: RoutePathEnum.FLAT,
                          search:
                            '?' +
                            new URLSearchParams({
                              [QS_FLAT_NAME]: key,
                            }).toString(),
                        })
                      }
                    >
                      {t('moreReviews')}
                      <ArrowRightIcon />
                    </Button>
                  )}
                </Flex>
              ))}
            </Flex>
          </React.Fragment>
        ))}
        <Flex mt={3} mb={3} justifyContent="center">
          <Pagination<Review> onLoad={onLoad} take={3} apiProps={apiProps} />
        </Flex>
      </Flex>
    </>
  )
}
