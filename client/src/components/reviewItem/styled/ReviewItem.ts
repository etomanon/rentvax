import styled, { css } from 'styled-components'
import { Text } from '@/components/text/styled/Text'
import {
  height,
  HeightProps,
  overflow,
  OverflowProps,
  maxHeight,
  MaxHeightProps,
} from 'styled-system'
import { Link } from '@/components/control/Link'

export const Container = styled.div`
  display: flex;
  width: 100%;
  border: 1px solid ${props => props.theme.colors.primary};
  border-radius: 4px;
  padding: 0.5rem 1rem;
  flex-direction: column;
`

export const Description = styled(Text)<
  HeightProps & OverflowProps & MaxHeightProps
>`
  position: relative;
  transition: 0.3s height easy-in;
  min-height: 5rem;
  ${height}
  ${maxHeight}
  ${overflow}
`

export const Toggle = styled(Link).attrs({ noUnderline: true })<{
  truncated: boolean
}>`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 6rem;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  ${props =>
    props.truncated
      ? css`
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.95) 45%,
            rgba(255, 255, 255, 1) 100%
          );
        `
      : css`
          position: static;
          height: auto;
        `}
`
