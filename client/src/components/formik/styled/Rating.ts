import { Flex } from '@/components/grid/Flex'
import { Star } from '@styled-icons/entypo/Star'
import styled, { css, ThemedStyledProps, DefaultTheme } from 'styled-components'
import { height, HeightProps } from 'styled-system'

interface Props {
  error?: boolean
}

export const RaitingContainer = styled(Flex)<Props>`
  border-radius: 4px;
  padding: 0.5rem;
  ${(props) =>
    props.error &&
    css`
      border: 2px solid ${props.theme.colors.error};
      border-style: dashed;
    `}
`
interface PropsStar extends HeightProps {
  active: boolean
  disabled?: boolean
}

const iconCss = (props: ThemedStyledProps<PropsStar, DefaultTheme>) => {
  const { secondary, primary } = props.theme.colors
  const { active, disabled } = props
  return css`
    height: 3rem;
    ${height}
    cursor: ${disabled ? 'default' : 'pointer'};
    transition: 0.2s ease-in all;
    color: ${active ? secondary : '#000'};
    border-radius: 0.5rem;
    border: 1px solid transparent;
    &:focus {
      outline: none;
      color: ${primary}
    }
  `
}

export const StarItem = styled(Star)<PropsStar>`
  ${iconCss}
`
