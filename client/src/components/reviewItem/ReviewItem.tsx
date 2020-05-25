import React, { useState, useRef, useEffect } from 'react'
import { Review } from '@/utils/types/review'
import { Container, Description, Toggle } from './styled/ReviewItem'
import { Text } from '../text/styled/Text'
import { Stars } from '../stars/Stars'
import { Flex } from '@rebass/grid'
import { timeParse } from '@/utils/func/time'
import { scrollSmooth } from '@/utils/func/scrollSmooth'
import { Edit } from '@styled-icons/boxicons-solid/Edit'
import { useTheme } from 'styled-components'
import { Tooltip } from '../tooltip/Tooltip'
import { Delete } from '@styled-icons/material/Delete'
import { useApi } from '@/utils/api/useApi'
import { Confirm } from '../confirm/Confirm'
import { useHistory } from 'react-router-dom'
import { RoutePathEnum } from '@/router/routes'
import { useTranslation } from 'react-i18next'

interface ReviewItemProps {
  review: Review
  editable?: boolean
  onDelete?: () => void
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
  review: { id, rating, description, user, updatedAt },
  editable,
  onDelete,
}) => {
  const { t } = useTranslation('common')
  const { push } = useHistory()
  const api = useApi()
  const theme = useTheme()
  const firstUpdate = useRef(true)
  const refContainer = useRef<HTMLDivElement>(null)
  const refDescription = useRef<HTMLDivElement>(null)
  const [truncated, setTruncated] = useState(true)
  const [overflow, setOverflow] = useState(false)
  const onTruncate = () => {
    setTruncated((prev) => !prev)
  }

  const handleDelete = async () => {
    await api({
      method: 'DELETE',
      url: `review/${id}`,
    })
    onDelete && onDelete()
  }

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false
      return
    }
    if (refContainer.current && truncated) {
      scrollSmooth(refContainer.current)
    }
  }, [truncated])

  useEffect(() => {
    if (refDescription.current) {
      setOverflow(isOverflown(refDescription.current))
    }
  }, [refDescription])

  return (
    <Container ref={refContainer}>
      <Flex justifyContent="space-between" mx={1}>
        <Stars rating={rating} />
        <Flex flexDirection="column">
          <Flex mt={1} justifyContent="flex-end" alignItems="center">
            <Text fontSize={1} textAlign="right">
              {t('user')} {user.id}
            </Text>
            {editable && (
              <>
                <Tooltip tooltip={t('edit')}>
                  <Edit
                    style={{
                      marginLeft: '.5rem',
                      color: theme.colors.secondary,
                      cursor: 'pointer',
                    }}
                    width="2.5rem"
                    height="2.5rem"
                    onClick={() => push(`${RoutePathEnum.REVIEW}/${id}`)}
                  />
                </Tooltip>
                <Tooltip tooltip={t('delete')}>
                  <Confirm
                    onConfirm={handleDelete}
                    confirmText={`${t('delete')}?`}
                  >
                    <Delete
                      style={{
                        marginLeft: '.5rem',
                        color: theme.colors.error,
                        cursor: 'pointer',
                      }}
                      width="2.5rem"
                      height="2.5rem"
                    />
                  </Confirm>
                </Tooltip>
              </>
            )}
          </Flex>
          <Text fontSize={1} textAlign="right">
            {timeParse(updatedAt)}
          </Text>
        </Flex>
      </Flex>

      <Description
        mt={1}
        ml={2}
        pr="2.25rem"
        height={truncated ? '2.5rem' : 'auto'}
        truncated={truncated}
        ref={refDescription}
      >
        {description}
        <Toggle
          onClick={onTruncate}
          truncated={truncated}
          isOverflow={overflow}
        />
      </Description>
    </Container>
  )
}
