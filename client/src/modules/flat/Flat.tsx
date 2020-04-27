import React, { useEffect, useState, useCallback, useRef } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { callApi } from '@/utils/func/callApi'
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

export const QS_FLAT_NAME = 'flatName'

export const Flat = () => {
  const { push } = useHistory()
  const firstUpdate = useRef(true)
  const refList = useRef<HTMLDivElement>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [name, setName] = useState<string | null>(null)
  const [apiProps, setApiProps] = useState<ApiProps | null>(null)
  const { search } = useLocation()
  useEffect(() => {
    const qsName = new URLSearchParams(search).get(QS_FLAT_NAME)
    if (qsName) {
      setName(qsName)
      setApiProps({
        method: 'POST',
        url: '/review/flat-name',
        body: {
          name: qsName,
        },
      })
    } else {
      push(RoutePathEnum.HOME)
    }
  }, [search, push])

  const onLoad = useCallback((response: Review[]) => {
    setReviews(response)
    if (firstUpdate.current) {
      firstUpdate.current = false
      return
    }
    if (refList.current) {
      scrollSmooth(refList.current)
    }
  }, [])

  return (
    <>
      <Flex flexDirection="column" width={1}>
        {name && (
          <Tooltip tooltip={'Zobraz na Google Maps'}>
            <TextSubtitle
              as="a"
              width={1}
              my={1}
              textAlign="center"
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                name
              )}`}
              target="_blank"
            >
              {name}
              <MapMarkerAlt
                style={{ marginLeft: '1rem' }}
                width="1.5rem"
                height="2rem"
              />
            </TextSubtitle>
          </Tooltip>
        )}

        <Flex
          mt={1}
          mx={-2}
          flexWrap="wrap"
          alignItems="flex-start"
          ref={refList}
        >
          {reviews.map((r, i) => (
            <Flex key={r.id} mt={2} px={2} width={[1, 0.5, 0.33333333]}>
              <ReviewItem review={r} />
            </Flex>
          ))}
        </Flex>
        <Flex mt={1} width={1} justifyContent="center">
          <Pagination<Review> apiProps={apiProps} onLoad={onLoad} take={5} />
        </Flex>
      </Flex>
    </>
  )
}