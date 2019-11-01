import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSwipeable } from "react-swipeable";
import { withRouter, RouteComponentProps } from "react-router-dom";

import { userLogout, userGet } from "../../redux/user/actions";
import { selectorUser } from "../../redux/user/selectors";

import { Text } from "../text/Text";

import {
  HeaderTitleWrapper,
  HeaderLogo,
  HeaderWrapper,
  HeaderWrapperLinks,
  HeaderBurger,
  HeaderBurgerLine,
  HeaderLink,
  HeaderNavLink
} from "./styled/Header";

const HeaderView: React.FC<RouteComponentProps> = ({ history }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectorUser);
  const [active, setActive] = useState(false);
  useEffect(() => {
    dispatch(userGet());
  }, [dispatch]);
  const handlers = useSwipeable({
    onSwipedRight: () => setActive(prev => !prev),
    trackMouse: true
  });
  return (
    <>
      <HeaderBurger active={active} onClick={() => setActive(prev => !prev)}>
        <HeaderBurgerLine active={active} />
        <HeaderBurgerLine active={active} />
        <HeaderBurgerLine active={active} />
      </HeaderBurger>
      <HeaderWrapper
        m={["1rem 0.5rem", "1rem 0.5rem", "1rem auto"]}
        flexDirection={["column", "row"]}
      >
        <HeaderTitleWrapper onClick={() => history.push("/")}>
          <HeaderLogo size="3rem" />
          <Text ml={2} mr={3} fontSize={3} mb={0} style={{ cursor: "pointer" }}>
            Title
          </Text>
        </HeaderTitleWrapper>
        <HeaderWrapperLinks active={active} {...handlers}>
          <HeaderNavLink
            exact
            to="/"
            mr={[0, "4.5rem", "7rem"]}
            mb={[2, 0]}
            onClick={() => setActive(false)}
          >
            Domů
          </HeaderNavLink>
          {user.user ? (
            <>
              <HeaderNavLink
                exact
                to="/dashboard"
                mr={[0, "4.5rem", "7rem"]}
                mb={[2, 0]}
                onClick={() => setActive(false)}
              >
                Dashboard
              </HeaderNavLink>
              {user.user.role !== "user" && (
                <HeaderNavLink
                  to="/download"
                  mr={[0, "4.5rem", "7rem"]}
                  mb={[2, 0]}
                  onClick={() => setActive(false)}
                >
                  Soubory
                </HeaderNavLink>
              )}
              <HeaderLink
                mt={[4, 0]}
                onClick={() => {
                  dispatch(userLogout());
                  setActive(false);
                }}
                href="/api/auth/logout"
              >
                Odhlásit se
              </HeaderLink>
            </>
          ) : (
            <HeaderLink
              onClick={() => setActive(false)}
              href="/api/auth/google"
            >
              Přihlásit se
            </HeaderLink>
          )}
        </HeaderWrapperLinks>
      </HeaderWrapper>
    </>
  );
};

export const Header = withRouter(HeaderView);
