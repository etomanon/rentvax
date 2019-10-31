import styled from "styled-components";
import { display, DisplayProps, space, SpaceProps } from "styled-system";

export const Text = styled.div<DisplayProps & SpaceProps>`
  display: inline-block;
  ${display}
  font-size: 2.2rem;
  color: ${({ theme }) => theme.colors.primary};
  ${space};
`;
