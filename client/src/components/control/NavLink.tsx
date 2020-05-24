import styled from 'styled-components'
import { NavLink as ReactNavLink } from 'react-router-dom'
import { space, SpaceProps } from 'styled-system'

export const NavLink = styled(ReactNavLink).attrs({
  activeClassName: 'active-navlink',
})<SpaceProps>`
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  transition: 0.3s ease-in color;
  &.${(p) => p.activeClassName} {
    font-weight: 500;
  }
  &:hover,
  &:focus {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    outline: none;
  }
  ${space};
`
