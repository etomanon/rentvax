import styled from "styled-components";
import Apartments from "../pics/apartments.jpg";

export const HomeImg = styled.div`
  width: 52%;
  height: 40rem;
  margin-top: 13rem;
  border-radius: 4px;
  background-image: url(${Apartments});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  transform: rotate(-13deg);
  box-shadow: 0px 5px 1rem 0px rgba(0, 0, 0, 0.25);
  border: 2px solid #e0e0e0;
`;
