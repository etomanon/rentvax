import React from "react";
import Modal from "styled-react-modal";
import { Flex } from "@rebass/grid";

import { Text } from "../text/Text";
import { Button } from "../button/styled/Button";

interface ConfirmProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  confirmText: string;
  onConfirm: () => void;
  error?: boolean;
}

export const Confirm: React.FC<ConfirmProps> = ({
  open,
  setOpen,
  confirmText,
  onConfirm,
  error
}) => {
  return (
    <Modal
      isOpen={open}
      onBackgroundClick={() => setOpen(prev => !prev)}
      onEscapeKeydown={() => setOpen(false)}
    >
      <Flex
        px={3}
        width={["95%", "35rem"]}
        backgroundColor="#fff"
        alignItems="center"
        justifyContent="space-between"
        flexWrap="wrap"
        style={{ borderRadius: "4px" }}
      >
        <Text width={1} mb={3} mt={3} textAlign="center">
          {confirmText}
        </Text>
        <Button
          width={0.45}
          mb={3}
          variant={error ? "error" : "filled"}
          onClick={() => {
            onConfirm();
            setOpen(false);
          }}
        >
          Ano
        </Button>
        <Button
          width={0.45}
          mb={3}
          onClick={() => {
            setOpen(false);
          }}
        >
          Ne
        </Button>
      </Flex>
    </Modal>
  );
};
