import styled from "styled-components";
import {
  display,
  DisplayProps,
  space,
  SpaceProps,
  textAlign,
  TextAlignProps
} from "styled-system";

type Props = DisplayProps & SpaceProps & TextAlignProps;

export const TextHeader = styled.div<Props>`
  display: inline-block;
  ${display}
  font-size: 4rem;
  letter-spacing: 1px;
  color: ${({ theme }) => theme.colors.text};
  ${space};
  ${textAlign}
`;
