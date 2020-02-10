import styled from 'styled-components'
import {
  space,
  SpaceProps,
  color,
  ColorProps,
  fontWeight,
  FontWeightProps,
} from 'styled-system'

interface LinkProps {
  noUnderline?: boolean
}

// eslint-disable-next-line
export const Link = styled.a<
  LinkProps & FontWeightProps & SpaceProps & ColorProps
>`
  color: ${({ theme }) => theme.colors.text};
  text-decoration: ${props => (props.noUnderline ? 'none' : 'underline')};
  transition: 0.3s ease-in color;
  &:hover,
  &:focus {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    outline: none;
  }
  ${space};
  ${color};
  ${fontWeight};
`
