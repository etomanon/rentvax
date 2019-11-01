import styled from "styled-components";
import { display, DisplayProps, space, SpaceProps } from "styled-system";

export const TextHeader = styled.div<DisplayProps & SpaceProps>`
  display: inline-block;
  ${display}
  font-size: 4rem;
  letter-spacing: 1px;
  color: ${({ theme }) => theme.colors.text};
  ${space};
`;
