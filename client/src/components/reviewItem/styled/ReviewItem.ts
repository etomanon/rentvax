import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  width: 100%;
  border: 1px solid ${props => props.theme.colors.primary};
  border-radius: 4px;
  padding: 0.5rem 1rem;
  flex-direction: column;
`
