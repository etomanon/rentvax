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
  padding: 0.5rem 0;
  flex-direction: column;
`

export const Description = styled(Text)<
  HeightProps & MaxHeightProps & { truncated: boolean }
>`
  position: relative;
  transition: 0.3s height easy-in;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  ${height}
  ${maxHeight}
  ${props =>
    !props.truncated &&
    css`
      white-space: normal;
      text-overflow: clip;
    `}
`

export const Toggle = styled.a<{
  truncated: boolean
  overflow: boolean
}>`
  display: ${props => (props.overflow ? 'static' : 'none')};
  position: absolute;
  top: ${props => (props.truncated ? 0 : '4px')};
  right: 8px;
  width: 4px;
  height: calc(100% - 4px);
  transition: 0.25s ease-in all;

  ${props => {
    const { primary, secondary } = props.theme.colors
    return props.truncated
      ? css`
          background: ${primary};
          &::before {
            position: absolute;
            bottom: -2px;
            left: 50%;
            transform: translate(-50%, 0);
            content: '';
            width: 0;
            height: 0;
            border-left: 0.8rem solid transparent;
            border-right: 0.8rem solid transparent;
            border-top: 0.8rem solid ${primary};
            transition: 0.25s ease-in all;
          }
          &:hover {
            background: ${secondary};
            &::before {
              border-top: 0.8rem solid ${secondary};
            }
          }
        `
      : css`
          background: ${secondary};
          &::before {
            position: absolute;
            top: -2px;
            left: 50%;
            transform: translate(-50%, 0);
            content: '';
            width: 0;
            height: 0;
            border-left: 0.8rem solid transparent;
            border-right: 0.8rem solid transparent;
            border-bottom: 0.8rem solid ${secondary};
            transition: 0.25s ease-in all;
          }
          &:hover {
            background: ${primary};
            &::before {
              border-bottom: 0.8rem solid ${primary};
            }
          }
        `
  }}
`
