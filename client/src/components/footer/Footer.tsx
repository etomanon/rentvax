import React from "react";

import { FooterMain } from "./styled/Footer";

export const Footer: React.FC = () => {
  return (
    <>
      <FooterMain>{new Date().getFullYear()}</FooterMain>
    </>
  );
};
