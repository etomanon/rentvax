import styled, { css } from 'styled-components'

export const PlacesContainer = styled.div`
  width: 100%;
  position: relative;
`

export const PlaceSuggestionWrapper = styled.div`
  position: absolute;
  width: 100%;
  background: #fff;
  box-shadow: 0px 5px 1rem 0px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  overflow: hidden;
  z-index: 1;
`

interface PlaceSuggestionItemProps {
  active?: boolean
}

export const PlaceSuggestionItem = styled.div<PlaceSuggestionItemProps>`
  font-size: 1.6rem;
  cursor: pointer;
  transition: 0.3s ease-in all;
  padding: 0.5rem 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.greyLight};
  &:hover,
  &:focus {
    background: ${({ theme }) => theme.colors.primary};
    color: #fff;
  }
  ${(props) =>
    props.active &&
    css`
      background: ${({ theme }) => theme.colors.primary};
      color: #fff;
    `}
`
