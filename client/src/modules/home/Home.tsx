import React from "react";
import { RouteComponentProps } from "react-router-dom";

import { Text } from "../../components/text/Text";

export const Home: React.FC<RouteComponentProps> = () => {
  return (
    <>
      <Text display="block" textAlign="center" mt={2}>
        Stránka pro hodnocení podnájmů
      </Text>
    </>
  );
};
