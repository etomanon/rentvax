import styled from 'styled-components'
import {
  space,
  SpaceProps,
  color,
  ColorProps,
  fontWeight,
  FontWeightProps,
  DisplayProps,
  display,
  AlignItemsProps,
  alignItems,
  FlexDirectionProps,
  flexDirection,
  TextAlignProps,
  textAlign,
} from 'styled-system'

interface LinkProps {
  noUnderline?: boolean
}

// eslint-disable-next-line
export const Link = styled.a
  <
  LinkProps &
    FontWeightProps &
    SpaceProps &
    ColorProps &
    DisplayProps &
    AlignItemsProps &
    FlexDirectionProps &
    TextAlignProps
>`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: ${(props) => (props.noUnderline ? 'none' : 'underline')};
  transition: 0.3s ease-in color;
  &:hover,
  &:focus {
    color: ${({ theme }) => theme.colors.secondary};
    /* text-decoration: none; */
    outline: none;
  }
  ${space};
  ${color};
  ${fontWeight};
  ${display};
  ${alignItems};
  ${flexDirection};
  ${textAlign}
`

Link.defaultProps = {
  target: '_blank' as '_blank' | '_self',
  rel: 'noreferrer',
}
