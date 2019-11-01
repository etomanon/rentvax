import styled from "styled-components";
import Apartments from "../pics/apartments.jpg";

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
  @media (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    width: 35%;
    margin-top: 5rem;
    margin-right: 5rem;
    transform: rotate(-13deg);
    height: 33rem;
  }
  @media (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    margin-top: 13rem;
    width: 52%;
    height: 40rem;
  }
`;
