import React, { useEffect, useMemo } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { Error404 } from '../modules/error404/Error404'

import { Header } from '../components/header/Header'
import { Footer } from '../components/footer/Footer'
import { WrapperMain } from '../components/wrapper/styled/Wrapper'

import { ScrollToTop } from './ScrollToTop'
import { useSelectorApp } from '@/redux'
import { useDispatch } from 'react-redux'
import { userGet } from '@/redux/user'
import { routes, RoutePermissionEnum } from './routes'

export const Router: React.FC = () => {
  const dispatch = useDispatch()
  const user = useSelectorApp(state => state.user)
  useEffect(() => {
    dispatch(userGet())
  }, [dispatch])

  const routesFiltered = useMemo(
    () =>
      routes.filter(r => !(r.permission === RoutePermissionEnum.USER && !user)),
    [user]
  )
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <WrapperMain
        p={['0 0.5rem', '0 0.5rem', '0 0.5rem', '0']}
        m={['0', '0', '0', '0 auto']}
      >
        <Switch>
          {routesFiltered.map(r => (
            <Route key={r.path} exact path={r.path} component={r.component} />
          ))}

          <Route component={Error404} />
        </Switch>
      </WrapperMain>
      <Footer />
    </BrowserRouter>
  )
}
