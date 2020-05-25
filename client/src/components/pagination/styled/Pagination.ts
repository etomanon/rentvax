import styled, { css, ThemedStyledProps, DefaultTheme } from 'styled-components'
import { ChevronLeft } from '@styled-icons/boxicons-solid/ChevronLeft'
import { ChevronRight } from '@styled-icons/boxicons-solid/ChevronRight'
import { ArrowToLeft } from '@styled-icons/boxicons-solid/ArrowToLeft'
import { ArrowToRight } from '@styled-icons/boxicons-solid/ArrowToRight'
import { WidthProps, HeightProps } from 'styled-system'

export const PaginationWrapper = styled.div`
  display: flex;
  align-items: center;
`

type PaginationNUmber = {
  active?: boolean
}

export const PaginationNumber = styled.button<PaginationNUmber>`
  ${(props) => {
    const { active } = props
    const { secondary } = props.theme.colors
    return css`
      transition: 0.25s ease-in color;
      padding: 0.5rem 1rem;
      border-bottom: 2px solid transparent;
      &:hover {
        color: ${secondary};
      }
      ${active &&
      css`
        cursor: default;
        color: ${secondary};
        border-bottom: 2px solid ${secondary};
      `}
    `
  }}
`

const iconCss = (props: ThemedStyledProps<IconProps, DefaultTheme>) => {
  const { secondary } = props.theme.colors
  return css`
    font-size: 3rem;
    cursor: pointer;
    transition: 0.2s ease-in color;
    &:hover {
      color: ${secondary};
    }
  `
}

type IconProps = WidthProps & HeightProps

export const PaginationPrev = styled(ChevronLeft)<IconProps>`
  ${iconCss}
`
export const PaginationNext = styled(ChevronRight)<IconProps>`
  ${iconCss}
`

export const PaginationFirst = styled(ArrowToLeft)<IconProps>`
  ${iconCss}
`
export const PaginationLast = styled(ArrowToRight)<IconProps>`
  ${iconCss}
`
