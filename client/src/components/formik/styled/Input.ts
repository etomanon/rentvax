import styled, { css } from 'styled-components'
import { width, WidthProps, space, SpaceProps } from 'styled-system'

interface Props {
  error?: boolean
}

export const Input = styled.input<WidthProps & SpaceProps & Props>`
  padding: 1rem 1.2rem;
  border-radius: 4px;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  transition: all 0.2s ease-in;
  font-size: 1.6rem;
  width: 100%;
  &:focus {
    outline: none;
    border: 2px solid ${({ theme }) => theme.colors.secondary};
  }
  ${width};
  ${space};

  ${(props) =>
    props.error &&
    css`
      border: 2px solid ${({ theme }) => theme.colors.error};
      border-style: dashed;
    `}
`
