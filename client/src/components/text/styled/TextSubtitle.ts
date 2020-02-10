import styled from 'styled-components'
import { display, DisplayProps, space, SpaceProps } from 'styled-system'

export const TextSubtitle = styled.div<DisplayProps & SpaceProps>`
  display: inline-block;
  ${display}
  font-size: 1.8rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.secondary};
  ${space};
`
