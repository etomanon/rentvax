import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";

const ScrollToTop: React.FC<any> = ({ children, location: { pathname } }) => {
  useEffect(() => {
    document.body.scrollTop = 0;
  }, [pathname]);

  return children || null;
};

export default withRouter(ScrollToTop);
