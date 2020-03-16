import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { Home } from '../modules/home/Home'
import { Review } from '../modules/review/Review'
import { Error404 } from '../modules/error404/Error404'
import { Search } from '../modules/search/Search'

import { Header } from '../components/header/Header'
import { Footer } from '../components/footer/Footer'
import { WrapperMain } from '../components/wrapper/styled/Wrapper'

import { ScrollToTop } from './ScrollToTop'
import { useSelectorApp } from '@/redux'

export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <WrapperMain
        p={['0 0.5rem', '0 0.5rem', '0 0.5rem', '0']}
        m={['0', '0', '0', '0 auto']}
      >
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/review" component={Review} />
          <Route exact path="/search" component={Search} />
          <Route component={Error404} />
        </Switch>
      </WrapperMain>
      <Footer />
    </BrowserRouter>
  )
}
