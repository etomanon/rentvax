import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { Flex } from "@rebass/grid";

import { Text } from "../../components/text/Text";
import { TextHeader } from "../../components/text/TextHeader";
import { Button } from "../../components/button/styled/Button";

import { HomeImg } from "./styled/Home";

export const Home: React.FC<RouteComponentProps> = () => {
  return (
    <>
      <Flex>
        <Flex mt="10rem" mb="-5rem" mr="auto" pb="10rem" flexDirection="column">
          <TextHeader>Subtitle longer text</TextHeader>
          <Text fontSize={3} mt="auto" mb="2rem" textAlign="center">
            Act now
          </Text>
          <Button variant="filled">Call to Action</Button>
        </Flex>
        <HomeImg />
      </Flex>
    </>
  );
};
