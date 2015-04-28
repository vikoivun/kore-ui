'use strict';

import React from 'react';
import { Route, Redirect } from 'react-router';
import App from './App';
import SearchPage from './pages/SearchPage';
import AboutPage from './pages/AboutPage';

export default (
  <Route name='app' path='/' handler={App}>
    <Route name='search' path='/etsi-koulua' handler={SearchPage} />
    <Route name='about' path='/tietoa-palvelusta' handler={AboutPage} />
    <Redirect from='/' to='search' />
  </Route>
);
