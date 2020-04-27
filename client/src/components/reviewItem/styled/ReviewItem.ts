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
  border: 1px solid ${(props) => props.theme.colors.primary};
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
  ${(props) =>
    !props.truncated &&
    css`
      white-space: normal;
      text-overflow: clip;
    `}
`

export const Toggle = styled.a<{
  truncated: boolean
  isOverflow: boolean
}>`
  display: ${(props) => (props.isOverflow ? 'block' : 'none')};
  position: absolute;
  top: 0;
  right: 2px;
  height: calc(100% - 4px);
  width: 2rem;
  cursor: pointer;
  &::after {
    content: '';
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
    top: ${(props) => (props.truncated ? 0 : '4px')};
    height: 100%;
    width: 2px;
    transition: 0.25s ease-in all;
  }

  ${(props) => {
    const { primary, secondary, grey } = props.theme.colors
    return props.truncated
      ? css`
          &::after {
            background: ${primary};
          }
          &::before {
            content: '';
            position: absolute;
            top: calc(50% - 1px);
            left: 50%;
            transform: translate(-50%, 0);
            width: 100%;
            height: 2px;
            background: ${primary};
            transition: 0.25s ease-in all;
          }
          &:hover {
            &::after {
              background: ${secondary};
            }
            &::before {
              background: ${secondary};
            }
          }
        `
      : css`
          &::after {
            background: ${grey};
          }
          &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 50%;
            transform: translate(-50%, 0);
            width: 0;
            height: 0;
            border-left: 0.8rem solid transparent;
            border-right: 0.8rem solid transparent;
            border-bottom: 0.8rem solid ${grey};
            transition: 0.25s ease-in all;
          }
          &:hover {
            &::after {
              background: ${secondary};
            }
            &::before {
              border-bottom: 0.8rem solid ${secondary};
            }
          }
        `
  }}
`
