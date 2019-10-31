import styled from "styled-components";
import {
  space,
  SpaceProps,
  color,
  ColorProps,
  fontWeight,
  FontWeightProps
} from "styled-system";

interface LinkProps {
  noUnderline?: boolean;
}

// eslint-disable-next-line
export const Link = styled.a<
  LinkProps & FontWeightProps & SpaceProps & ColorProps
>`
  color: inherit;
  text-decoration: none;
  text-decoration: ${props => (props.noUnderline ? "none" : "underline")};
  &:hover,
  &:focus {
    color: #fff;
    background: ${({ theme }) => theme.colors.secondary};
    text-decoration: none;
    outline: none;
  }
  ${space};
  ${color};
  ${fontWeight};
`;
