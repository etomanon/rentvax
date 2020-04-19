import React, { useEffect, useState, useMemo } from 'react'

import { ApiProps } from '@/utils/api/api'
import { callApi } from '@/utils/func/callApi'
import {
  PaginationWrapper,
  PaginationNumber,
  PaginationPrev,
  PaginationNext,
  PaginationFirst,
  PaginationLast,
} from './styled/Pagination'

type Pagination<T> = {
  result: T[]
  count: number
}

type Props<T> = {
  apiProps: ApiProps | null
  onLoad: (response: T[]) => void
  take: number
}

export const Pagination = <T extends {}>({
  apiProps,
  onLoad,
  take,
}: Props<T>) => {
  const [count, setCount] = useState<number | null>(null)
  const [skip, setSkip] = useState(0)
  useEffect(() => {
    // TODO: Cancel previous call
    const call = async () => {
      if (apiProps) {
        const response = await callApi<Pagination<T>>({
          ...apiProps,
          body: { ...(apiProps.body as object), skip, take },
        })
        if (response) {
          onLoad(response.result)
          setCount(response.count)
        }
      }
    }
    call()
  }, [apiProps, onLoad, skip, take])

  useEffect(() => {
    if (apiProps === null) {
      setCount(null)
      setSkip(0)
      onLoad([])
    }
  }, [apiProps, onLoad])

  const pageActive = useMemo(() => Math.floor(skip / take), [take, skip])
  const pages = useMemo(() => {
    const siblings = [-2, -1, 0, 1, 2]
    return siblings.map(s => pageActive + s)
  }, [pageActive])
  const pageMax = useMemo(() => (count ? Math.ceil(count / take) : 0), [
    take,
    count,
  ])

  return (
    <>
      {pages && (
        <>
          <PaginationWrapper>
            {pageActive > 1 && (
              <PaginationFirst size="2.8rem" onClick={() => setSkip(0)} />
            )}
            {pageActive > 0 && (
              <PaginationPrev
                size="2.5rem"
                onClick={() => setSkip(take * (pageActive - 1))}
              />
            )}
            {pages.map(
              page =>
                page > -1 &&
                page < pageMax && (
                  <PaginationNumber
                    active={page === pageActive}
                    onClick={() => setSkip(take * page)}
                    key={page}
                  >
                    {page + 1}
                  </PaginationNumber>
                )
            )}
            {pageActive + 1 < pageMax && (
              <PaginationNext
                size="2.5rem"
                onClick={() => setSkip(take * (pageActive + 1))}
              />
            )}
            {pageActive + 2 < pageMax && (
              <PaginationLast
                size="2.8rem"
                onClick={() => setSkip((pageMax - 1) * take)}
              />
            )}
          </PaginationWrapper>
        </>
      )}
    </>
  )
}
