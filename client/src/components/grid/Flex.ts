import styled from 'styled-components'
import { Flex as FlexGrid } from '@rebass/grid'
import {
  display,
  DisplayProps,
  AlignContentProps,
  alignContent,
  textAlign,
  TextAlignProps,
} from 'styled-system'

export const Flex = styled(FlexGrid)<
  DisplayProps & AlignContentProps & TextAlignProps
>`
  ${display}
  ${alignContent}
  ${textAlign}
`
