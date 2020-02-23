import React from 'react'
import { useField, FieldInputProps, FieldMetaProps } from 'formik'

import { Input as InputS } from './styled/Input'
import { ErrorMessage } from './styled/ErrorMessage'
import { Flex } from '../grid/Flex'
import { Label } from './styled/Label'

interface Props {
  label: string
  name: string
}

export const Input = ({ label, ...props }: Props) => {
  const [field, meta] = useField(
    props as FieldInputProps<string> & FieldMetaProps<string>
  )
  const isError = Boolean(
    meta.touched && meta.error && typeof meta.error !== 'object'
  )
  return (
    <Flex flexDirection="column" width={1}>
      <Label htmlFor={field.name}>{label}</Label>
      <InputS id={field.name} error={isError} {...field} {...props} />
      {isError && <ErrorMessage>{meta.error}</ErrorMessage>}
    </Flex>
  )
}
