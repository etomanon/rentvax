import styled from 'styled-components'
import Apartments from '../pics/apartments.jpg'
import { UserSecret } from '@styled-icons/fa-solid/UserSecret'
import { Github } from '@styled-icons/boxicons-logos/Github'
import { DonateHeart } from '@styled-icons/boxicons-solid/DonateHeart'

export const HomeImg = styled.div`
  width: 100%;
  height: 20rem;
  margin-left: auto;
  border-radius: 4px;
  background-image: url(${Apartments});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  box-shadow: 0px 5px 1rem 0px rgba(0, 0, 0, 0.25);
  border: 2px solid #e0e0e0;
  @media (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    width: 34%;
    margin-top: 5rem;
    margin-right: auto;
    margin-left: auto;
    transform: rotate(-13deg);
    height: 33rem;
  }
  @media (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    margin-top: 7rem;
    width: 35%;
    height: 30rem;
  }
`

export const IconSecret = styled(UserSecret)`
  width: 2rem;
  height: 3rem;
  color: ${(props) => props.theme.colors.primary};
`

export const IconGithub = styled(Github)`
  width: 3rem;
  height: 3rem;
  color: ${(props) => props.theme.colors.secondary};
`
export const IconDonate = styled(DonateHeart)`
  width: 3rem;
  height: 3rem;
  color: ${(props) => props.theme.colors.primary};
`
