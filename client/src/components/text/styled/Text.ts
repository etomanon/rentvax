import styled, { css } from "styled-components";
import {
  display,
  DisplayProps,
  alignItems,
  AlignItemsProps,
  space,
  SpaceProps,
  fontSize,
  FontSizeProps,
  textAlign,
  TextAlignProps,
  fontWeight,
  FontWeightProps,
  color,
  ColorProps,
  width,
  WidthProps
} from "styled-system";

interface TextProps {
  pointer?: boolean;
}

const cssPointer = css`
  cursor: pointer;
  &:hover {
    color: #fff;
    background: ${({ theme }) => theme.colors.primary};
  }
`;

// eslint-disable-next-line
export const Text = styled.div<
  AlignItemsProps &
    WidthProps &
    TextProps &
    DisplayProps &
    SpaceProps &
    FontSizeProps &
    TextAlignProps &
    FontWeightProps &
    ColorProps
>`
  display: inline-block;
  ${display};
  ${alignItems};
  ${space};
  ${fontSize};
  ${textAlign};
  ${fontWeight};
  ${color};
  ${props => props.pointer && cssPointer};
  ${width};
`;
