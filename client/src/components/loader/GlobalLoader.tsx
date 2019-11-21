import React from "react";

import { Loader } from "./styled/Loader";
import { useSelector } from "react-redux";
import { selectorLoading } from "../../redux/loading/selectors";

export const GlobalLoader: React.FC = () => {
  const loading = useSelector(selectorLoading);
  return <>{loading > 0 ? <Loader /> : null}</>;
};
