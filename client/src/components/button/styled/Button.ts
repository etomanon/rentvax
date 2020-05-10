import styled, { css } from 'styled-components'
import { width, WidthProps, space, SpaceProps } from 'styled-system'

interface ButtonProps {
  variant?: 'filled' | 'error'
}

const cssFilled = css`
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  &:hover,
  &:focus {
    background: #fff;
    color: ${({ theme }) => theme.colors.text};
  }
`

const cssError = css`
  background: #fff;
  color: ${({ theme }) => theme.colors.error};
  &:hover,
  &:focus {
    background: ${({ theme }) => theme.colors.error};
    color: #fff;
    border: 2px solid ${({ theme }) => theme.colors.error};
  }
`

const cssDisabled = css`
  background: ${({ theme }) => theme.colors.grey};
  color: #fff;
  border: 2px solid ${({ theme }) => theme.colors.grey};
  cursor: not-allowed;
  &:hover,
  &:focus {
    background: ${({ theme }) => theme.colors.grey};
    color: #fff;
  }
`

export const Button = styled.button<ButtonProps & WidthProps & SpaceProps>`
  display: flex;
  align-items: center;
  padding: 1rem 1.2rem;
  text-transform: uppercase;
  border-radius: 4px;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  background: #fff;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};
  justify-content: center;
  transition: all 0.2s ease-in;
  font-size: 1.4rem;
  box-shadow: 0px 5px 1rem 0px rgba(0,0,0,0.25);
  font-weight: 500;
  &:hover,
  &:focus {
    background: ${({ theme }) => theme.colors.primary};
    color: #fff;
  }
  &:focus {
    outline: 0;
    box-shadow: 0px 1px 4px 0px rgba(0,0,0,0.25);
    transform: translate3d(0, 2px, 0)
  }
  ${(props) => props.variant === 'filled' && cssFilled}
  ${(props) => props.variant === 'error' && cssError}
  ${(props) => props.disabled && cssDisabled}
  ${width};
  ${space};
`
