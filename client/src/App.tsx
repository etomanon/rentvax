import React from "react";
import "sanitize.css";
import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { ModalProvider } from "styled-react-modal";
import "react-toastify/dist/ReactToastify.css";

import { GlobalStyles } from "./theme/global";
import { theme } from "./theme/theme";
import { Router } from "./router/Router";
import { configureStore } from "./redux/store";
import { GlobalLoader } from "./components/loader/GlobalLoader";

export const store = configureStore();

const App: React.FC = () => {
  return (
    <>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <ModalProvider>
            <GlobalStyles />
            <GlobalLoader />
            <ToastContainer position="bottom-left" />
            <Router />
          </ModalProvider>
        </ThemeProvider>
      </Provider>
    </>
  );
};

export default App;
