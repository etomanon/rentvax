import React, { useEffect, useState, useCallback, useRef, useMemo } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { useApi } from '@/utils/api/useApi'
import { Pagination } from '@/components/pagination/Pagination'
import { ApiProps } from '@/utils/api/api'
import { Review } from '@/utils/types/review'
import { Flex, Box } from '@rebass/grid'
import { ReviewItem } from '@/components/reviewItem/ReviewItem'
import { Tooltip } from '@/components/tooltip/Tooltip'
import { MapMarkerAlt } from '@styled-icons/fa-solid/MapMarkerAlt'
import { TextSubtitle } from '@/components/text/styled/TextSubtitle'
import { RoutePathEnum } from '@/router/routes'
import { scrollSmooth } from '@/utils/func/scrollSmooth'
import { useSelectorApp } from '@/redux'
import { Place } from '@/components/formik/Place'
import { useDispatch } from 'react-redux'
import { locationSet } from '@/redux/location'
import { useTranslation } from 'react-i18next'

export const QS_FLAT_NAME = 'flatName'

export const MyReviews = () => {
  const { t } = useTranslation('common')
  const { push } = useHistory()
  const dispatch = useDispatch()
  const firstUpdate = useRef(true)
  const [refresh, setRefresh] = useState(false)
  const refList = useRef<HTMLDivElement>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [apiProps, setApiProps] = useState<ApiProps | null>({
    method: 'POST',
    url: 'review/user',
  })

  useEffect(() => {
    dispatch(locationSet(undefined))
  }, [dispatch])

  useEffect(() => {
    if (refresh) {
      setRefresh(false)
      setApiProps({
        method: 'POST',
        url: 'review/user',
      })
    }
  }, [refresh])

  const onDelete = useCallback(() => {
    setRefresh(true)
  }, [])

  const onLoad = useCallback(
    (response: Review[]) => {
      setReviews(response)
      if (firstUpdate.current) {
        firstUpdate.current = false
        return
      }
      if (refList.current) {
        scrollSmooth(refList.current)
      }
    },
    [firstUpdate]
  )

  return (
    <>
      <Flex flexDirection="column" width={1}>
        <TextSubtitle textAlign="center" mb="0">
          {t('myReviews')}
        </TextSubtitle>
        <Flex flexDirection="column" ref={refList} alignItems="center">
          {reviews.map((r) => (
            <React.Fragment key={r.id}>
              <Box mt={3} mb={1}>
                <Tooltip tooltip={t('showOnMap')}>
                  <TextSubtitle
                    as="a"
                    width={1}
                    my={1}
                    textAlign="center"
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      r.flat.name
                    )}`}
                    target="_blank"
                  >
                    {r.flat.name}
                    <MapMarkerAlt
                      style={{ marginLeft: '1rem' }}
                      width="1.5rem"
                      height="2rem"
                    />
                  </TextSubtitle>
                </Tooltip>
              </Box>
              <Flex width={[1, 0.75, 0.5]}>
                <ReviewItem review={r} editable onDelete={onDelete} />
              </Flex>
            </React.Fragment>
          ))}
        </Flex>
        <Flex mt={1} width={1} justifyContent="center">
          <Pagination<Review> apiProps={apiProps} onLoad={onLoad} take={5} />
        </Flex>
      </Flex>
    </>
  )
}
