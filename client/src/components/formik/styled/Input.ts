import styled from 'styled-components'
import { width, WidthProps, space, SpaceProps } from 'styled-system'

export const Input = styled.input<WidthProps & SpaceProps>`
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
`
