import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { userGet } from "../../redux/user/actions";
import { selectorUser } from "../../redux/user/selectors";

import { Text } from "../../components/text/styled/Text";

export const Dashboard: React.FC<RouteComponentProps> = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectorUser);
  useEffect(() => {
    dispatch(userGet());
  }, [dispatch]);

  return (
    <>
      <Text>Dashboard</Text>
    </>
  );
};
