import styled, { keyframes, css } from 'styled-components'
import { width, WidthProps, space, SpaceProps } from 'styled-system'

const move = keyframes`
  from {
    transform: translate3D(-100%, 0, 0);
  }

  to {
    transform: translate3D(100%, 0, 0);
  }
`

const cssLocal = css`
  position: static;
  top: auto;
  left: auto;
`

interface LoaderProps {
  static?: boolean
}

export const Loader = styled.div<LoaderProps & SpaceProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 0.6rem;
  background: ${({ theme }) => theme.colors.primary};
  animation: ${move} 1s ease-in infinite;
  z-index: 999;
  ${(props) => props.static && cssLocal}
  ${space};
`

export const LoaderUpload = styled.div<WidthProps & SpaceProps>`
  height: 0.6rem;
  background: ${({ theme }) => theme.colors.primary};
  transition: all 0.2s ease-in;
  ${width};
  ${space};
`
