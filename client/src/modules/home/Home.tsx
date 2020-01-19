import React from "react";
import { RouteComponentProps } from "react-router-dom";

import { Flex } from "../../components/grid/Flex";
import { Text } from "../../components/text/styled/Text";
import { TextHeader } from "../../components/text/styled/TextHeader";
import { Place } from "../../components/formik/Place";

import { HomeImg } from "./styled/Home";
import { useSelector } from "react-redux";
import { selectorLocation } from "../../redux/location/selectors";

export const Home: React.FC<RouteComponentProps> = () => {
  const location = useSelector(selectorLocation);
  return (
    <>
      <Flex flexWrap={["wrap", "nowrap"]}>
        <Flex
          style={{ position: "relative" }}
          width={[1, "auto"]}
          mt={["2rem", "10rem"]}
          mb={["-5rem", "0"]}
          mr={[0, "6rem", "auto"]}
          pb="10rem"
          flexDirection="column"
        >
          <TextHeader textAlign="center">Hodnocení podnájmů</TextHeader>
          <Text
            fontSize={3}
            mt={["1rem", "1rem", "auto"]}
            mb="2rem"
            textAlign="center"
          >
            Najděte adresu
          </Text>
          <Place />
        </Flex>
        <HomeImg />
      </Flex>
    </>
  );
};
