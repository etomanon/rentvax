import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Flex } from "@rebass/grid";
import { useSwipeable } from "react-swipeable";
import { withRouter, RouteComponentProps } from "react-router-dom";

import { userLogout, userGet } from "../../redux/user/actions";
import { selectorUser } from "../../redux/user/selectors";

import { Link } from "../control/Link";
import { NavLink } from "../control/NavLink";
import { Text } from "../text/Text";

import {
  HeaderWrapper,
  HeaderWrapperLinks,
  HeaderBurger,
  HeaderBurgerLine
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
      <HeaderWrapper
        m={["1rem 0.5rem", "1rem 0.5rem", "1rem auto"]}
        flexDirection={["column", "row"]}
      >
        <Flex width={1} justifyContent="center" alignItems="center" mb={3}>
          <Text
            ml={2}
            mr={3}
            fontSize={4}
            mb={0}
            onClick={() => history.push("/")}
            style={{ cursor: "pointer" }}
          >
            Recenze podnájmů
          </Text>
        </Flex>
        <HeaderBurger active={active} onClick={() => setActive(prev => !prev)}>
          <HeaderBurgerLine active={active} />
          <HeaderBurgerLine active={active} />
          <HeaderBurgerLine active={active} />
        </HeaderBurger>
        <HeaderWrapperLinks active={active} {...handlers}>
          <NavLink
            exact
            to="/"
            mr={[0, 3]}
            mb={[2, 0]}
            onClick={() => setActive(false)}
          >
            Domů
          </NavLink>
          {user.user ? (
            <>
              <NavLink
                exact
                to="/dashboard"
                mr={[0, 3]}
                mb={[2, 0]}
                onClick={() => setActive(false)}
              >
                Dashboard
              </NavLink>
              {user.user.role !== "user" && (
                <NavLink
                  to="/download"
                  mr={[0, 3]}
                  mb={[2, 0]}
                  onClick={() => setActive(false)}
                >
                  Soubory
                </NavLink>
              )}
              <Link
                noUnderline
                mt={[4, 0]}
                onClick={() => {
                  dispatch(userLogout());
                  setActive(false);
                }}
                href="/api/auth/logout"
              >
                Odhlásit se
              </Link>
            </>
          ) : (
            <Link
              noUnderline
              onClick={() => setActive(false)}
              href="/api/auth/google"
            >
              Přihlásit se
            </Link>
          )}
        </HeaderWrapperLinks>
      </HeaderWrapper>
    </>
  );
};

export const Header = withRouter(HeaderView);
