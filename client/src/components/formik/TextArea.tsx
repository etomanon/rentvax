import React from 'react'
import { useField, FieldInputProps, FieldMetaProps } from 'formik'

import { TextArea as TextAreaS } from './styled/TextArea'
import { ErrorMessage } from './styled/ErrorMessage'
import { Flex } from '../grid/Flex'
import { Label } from './styled/Label'

interface Props {
  label: string
  name: string
  rows?: number
}

export const TextArea = ({ label, rows, ...props }: Props) => {
  const [field, meta] = useField(
    props as FieldInputProps<string> & FieldMetaProps<string>
  )
  const isError = Boolean(
    meta.touched && meta.error && typeof meta.error !== 'object'
  )
  return (
    <Flex flexDirection="column" width={1}>
      <Label htmlFor={field.name}>{label}</Label>
      <TextAreaS
        id={field.name}
        rows={rows ? rows : 5}
        error={isError}
        {...field}
        {...props}
      />
      {isError && <ErrorMessage>{meta.error}</ErrorMessage>}
    </Flex>
  )
}
