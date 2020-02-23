import { Flex } from '@/components/grid/Flex'
import styled, { css } from 'styled-components'

interface Props {
  error?: boolean
}

export const RaitingContainer = styled(Flex)<Props>`
  ${props =>
    props.error &&
    css`
      border: 2px solid ${props.theme.colors.error};
      border-style: dashed;
    `}
`
