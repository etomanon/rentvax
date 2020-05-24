import styled from 'styled-components'
import { space, SpaceProps } from 'styled-system'

export const WrapperMain = styled.main<SpaceProps>`
  display: flex;
  flex: 1;
  max-width: 75em;
  width: 100%;
  flex-wrap: wrap;
  ${space}
`
