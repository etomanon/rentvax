import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { Flex } from "@rebass/grid";

import { Text } from "../../components/text/styled/Text";
import { TextHeader } from "../../components/text/styled/TextHeader";
import { TextBox } from "../../components/text/TextBox";
import { TextSubtitle } from "../../components/text/styled/TextSubtitle";
import { Button } from "../../components/button/styled/Button";

import { HomeImg } from "./styled/Home";

export const Home: React.FC<RouteComponentProps> = () => {
  return (
    <>
      <Flex flexWrap={["wrap", "nowrap"]}>
        <Flex
          width={[1, "auto"]}
          mt={["2rem", "10rem"]}
          mb="-5rem"
          mr={[0, "6rem", "auto"]}
          pb="10rem"
          flexDirection="column"
        >
          <TextHeader>Subtitle longer text</TextHeader>
          <Text fontSize={3} mt="auto" mb="2rem" textAlign="center">
            Act now
          </Text>
          <Button variant="filled">Call to Action</Button>
        </Flex>
        <HomeImg />
      </Flex>
      <Flex
        flexWrap="wrap"
        mt={["2rem", "8rem", "15rem"]}
        mx={[0, "-1rem", "-5rem"]}
        mb="4rem"
      >
        <Flex px={[0, "1rem", "5rem"]} width={[1, 0.33333]} mb={["2rem", 0]}>
          <TextBox
            title={<TextSubtitle>Subtitle</TextSubtitle>}
            text={
              <Text>
                Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
                lorem ipsum lorem ipsum lorem ipsum lorem ipsum
              </Text>
            }
          />
        </Flex>
        <Flex px={[0, "1rem", "5rem"]} width={[1, 0.33333]} mb={["2rem", 0]}>
          <TextBox
            title={<TextSubtitle>Subtitle</TextSubtitle>}
            text={
              <Text>
                Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
                lorem ipsum lorem ipsum lorem ipsum lorem ipsum
              </Text>
            }
          />
        </Flex>
        <Flex px={[0, "1rem", "5rem"]} width={[1, 0.33333]} mb={["2rem", 0]}>
          <TextBox
            title={<TextSubtitle>Subtitle</TextSubtitle>}
            text={
              <Text>
                Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
                lorem ipsum lorem ipsum lorem ipsum lorem ipsum
              </Text>
            }
          />
        </Flex>
      </Flex>
    </>
  );
};
