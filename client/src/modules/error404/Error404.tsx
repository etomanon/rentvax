import React from "react";
import { RouteComponentProps } from "react-router-dom";

import { Text } from "../../components/text/Text";

export const Error404: React.FC<RouteComponentProps> = () => {
  return (
    <Text display="block" textAlign="center">
      Nenalezeno
    </Text>
  );
};
