import React from 'react'
import {
  useField,
  FieldInputProps,
  FieldMetaProps,
  useFormikContext,
} from 'formik'

import { ErrorMessage } from './styled/ErrorMessage'
import { Flex } from '../grid/Flex'
import StarRatingComponent from 'react-star-rating-component'
import { Label } from './styled/Label'
import { theme } from '@/theme/theme'
import { RaitingContainer } from './styled/Rating'

interface Props {
  label: string
  name: string
}

export const Rating = ({ label, ...props }: Props) => {
  const { setFieldValue } = useFormikContext()
  const [field, meta] = useField(
    props as FieldInputProps<number> & FieldMetaProps<number>
  )
  const isError = Boolean(
    meta.touched && meta.error && typeof meta.error !== 'object'
  )

  const onStarClick = (nextValue: number) => {
    setFieldValue(field.name, nextValue)
  }

  return (
    <Flex flexDirection="column" width={1} alignItems="center">
      <Label htmlFor={field.name}>{label}</Label>
      <RaitingContainer justifyContent="center" error={isError}>
        <StarRatingComponent
          name={field.name}
          starCount={5}
          value={field.value}
          onStarClick={onStarClick}
          starColor={theme.colors.secondary}
        />
      </RaitingContainer>
      {isError && <ErrorMessage>{meta.error}</ErrorMessage>}
    </Flex>
  )
}
