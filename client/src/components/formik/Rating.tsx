import React, { useState } from 'react'
import {
  useField,
  FieldInputProps,
  FieldMetaProps,
  useFormikContext,
} from 'formik'

import { ErrorMessage } from './styled/ErrorMessage'
import { Flex } from '../grid/Flex'
import { Label } from './styled/Label'
import { RaitingContainer, StarItem } from './styled/Rating'

interface Props {
  label: string
  name: string
}

interface IStar {
  id: number
}

export const STARS: IStar[] = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
]

export const Rating = ({ label, ...props }: Props) => {
  const { setFieldValue, setFieldTouched } = useFormikContext()
  const [field, meta] = useField(
    props as FieldInputProps<number> & FieldMetaProps<number>
  )
  const isError = Boolean(
    meta.touched && meta.error && typeof meta.error !== 'object'
  )

  const [hovered, setHovered] = useState(-1)

  const onStarClick = (nextValue: number) => {
    setFieldTouched(field.name, true)
    setFieldValue(field.name, nextValue)
  }

  return (
    <Flex flexDirection="column" width={1} alignItems="center">
      <Label>{label}</Label>
      <RaitingContainer justifyContent="center" error={isError}>
        {STARS.map(({ id }) => (
          <StarItem
            key={id}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                onStarClick(id)
              }
            }}
            active={field.value >= id || hovered >= id}
            onClick={() => onStarClick(id)}
            onMouseEnter={() => setHovered(id)}
            onMouseLeave={() => setHovered(-1)}
          />
        ))}
      </RaitingContainer>
      {isError && <ErrorMessage>{meta.error}</ErrorMessage>}
    </Flex>
  )
}
