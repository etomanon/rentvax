import React from 'react'
import { Flex } from '@rebass/grid'

import { TextBoxWrapper } from './styled/TextBox'

interface TextBoxProps {
  title: React.ReactElement
  text: React.ReactElement
}

export const TextBox: React.FC<TextBoxProps> = ({ title, text }) => {
  return (
    <TextBoxWrapper p="1rem 1.5rem">
      <Flex width={1} mb="1rem" justifyContent="center">
        {title}
      </Flex>
      <Flex width={1}>{text}</Flex>
    </TextBoxWrapper>
  )
}
