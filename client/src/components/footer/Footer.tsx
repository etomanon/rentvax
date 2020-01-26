import React from "react";

import { FooterMain } from "./styled/Footer";
import { useLocation } from "react-router-dom";

export const Footer: React.FC = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/" ? null : (
        <FooterMain id="footer">{new Date().getFullYear()}</FooterMain>
      )}
    </>
  );
};
