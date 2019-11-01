import styled, { css } from "styled-components";
import { NavLink as ReactNavLink } from "react-router-dom";
import {
  space,
  SpaceProps,
  flexDirection,
  FlexDirectionProps,
  FontWeightProps,
  fontWeight,
  ColorProps,
  color
} from "styled-system";
import { Building2 } from "styled-icons/remix-fill/Building2";

interface MobileMenuProps {
  active: boolean;
}

export const HeaderTitleWrapper = styled.div`
  display: flex;
  width: auto;
  justify-content: center;
  align-items: center;
  margin-right: auto;
  cursor: pointer;
`;

export const HeaderLogo = styled(Building2)`
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  transition: 0.3s ease-in color;
  ${/* sc-selector */ HeaderTitleWrapper}:hover & {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

export const HeaderWrapper = styled.header<SpaceProps & FlexDirectionProps>`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  max-width: 75em;
  color: ${({ theme }) => theme.colors.text};
  ${space}
  ${flexDirection}
`;

export const Logo = styled.img`
  display: flex;
`;

export const HeaderWrapperLinks = styled.div<MobileMenuProps>`
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.secondary};
  color: #fff;
  transition: all .25s ease-in;
  transform: translate3d(100%, 0, 0);
  height: 100%;
  z-index: 2;
  ${props =>
    props.active &&
    css`
      transform: translate3d(0, 0, 0);
    `}
  @media (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    position: static;
    height: auto;
    width: auto;
    flex-direction: row;
    background: #fff;
    color: ${({ theme }) => theme.colors.secondary};
    transform: translate3d(0, 0, 0);
    padding-right: 1rem;
  }
`;

export const HeaderBurger = styled.div<MobileMenuProps>`
  position: fixed;
  top: 1rem;
  right: 1rem;
  width: 3rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 29;
  @media (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    display: none;
  }
`;

export const HeaderBurgerLine = styled.span<MobileMenuProps>`
  position: absolute;
  height: 2px;
  width: 100%;
  background: ${({ theme }) => theme.colors.primary};
  transition: all 0.25s ease-in;
  border-radius: 4px;
  &:nth-child(1) {
    top: 0;
  }
  &:nth-child(2) {
    top: 50%;
  }
  &:nth-child(3) {
    top: 100%;
  }
  ${props =>
    props.active &&
    css`
      background: #fff;
      &:nth-child(2) {
        opacity: 0;
      }
      &:nth-child(1),
      &:nth-child(2),
      &:nth-child(3) {
        top: 50%;
      }
      &:nth-child(1) {
        transform: rotate(45deg);
      }
      &:nth-child(3) {
        transform: rotate(-45deg);
      }
    `}
`;

export const HeaderNavLink = styled(ReactNavLink).attrs({
  activeClassName: "active-navlink"
})<SpaceProps>`
  color: #fff;
  text-decoration: none;
  transition: 0.3s ease-in color;
  &.${p => p.activeClassName} {
    font-weight: 500;
  }
  &:hover,
  &:focus {
    color: white;
    text-decoration: none;
    outline: none;
  }
  ${space};

  @media (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    color: ${({ theme }) => theme.colors.text};
    &:hover,
    &:focus {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

// eslint-disable-next-line
export const HeaderLink = styled.a<
  FontWeightProps & SpaceProps & ColorProps
  >`
  color: #fff;
  text-decoration: none;
  transition: 0.3s ease-in color;
  &:hover,
  &:focus {
    color: #fff;
    text-decoration: none;
    outline: none;
  }
  ${space};
  ${color};
  ${fontWeight};
  @media (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    color: ${({ theme }) => theme.colors.text};
    &:hover,
    &:focus {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;
