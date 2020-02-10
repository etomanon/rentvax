import { hot } from 'react-hot-loader/root'
import React from 'react'
import 'sanitize.css'
import { ThemeProvider } from 'styled-components'
import { ToastContainer } from 'react-toastify'
import { ModalProvider } from 'styled-react-modal'
import 'react-toastify/dist/ReactToastify.css'

import { GlobalStyles } from './theme/global'
import { theme } from './theme/theme'
import { Router } from './router/Router'
import { GlobalLoader } from './components/loader/GlobalLoader'

const App: React.FC = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <ModalProvider>
          <GlobalStyles />
          <GlobalLoader />
          <ToastContainer position="bottom-left" />
          <Router />
        </ModalProvider>
      </ThemeProvider>
    </>
  )
}

export default hot(App)
