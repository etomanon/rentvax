import React, { useEffect } from "react";
import { RouteComponentProps, useHistory } from "react-router-dom";

import { Flex } from "../../components/grid/Flex";
import { Text } from "../../components/text/styled/Text";
import { TextHeader } from "../../components/text/styled/TextHeader";
import { Place } from "../../components/formik/Place";

import { HomeImg } from "./styled/Home";

export const Home: React.FC<RouteComponentProps> = () => {
  const { push } = useHistory();
  const onSelect = () => {
    push("/search");
  };

  return (
    <>
      <Flex
        flexWrap={["wrap", "nowrap"]}
        width="100%"
        alignContent="flex-start"
      >
        <Flex
          style={{ position: "relative" }}
          width={[1, "auto"]}
          mt={["2rem", "10rem"]}
          mr={[0, "6rem", "auto"]}
          pb="2rem"
          flexDirection="column"
        >
          <TextHeader textAlign="center">Hodnocení podnájmů</TextHeader>
          <Text
            fontSize={3}
            mt={["1rem", "1rem", "15rem"]}
            mb="2rem"
            textAlign="center"
          >
            Najděte adresu
          </Text>
          <Place onSelect={onSelect} />
        </Flex>
        <HomeImg />
      </Flex>
    </>
  );
};
