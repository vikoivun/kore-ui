'use strict';

import React from 'react';
import {Route, Redirect, NotFoundRoute} from 'react-router';
import App from './App';
import SearchPage from './pages/SearchPage';
import AboutPage from './pages/AboutPage';
import SchoolPage from './pages/SchoolPage';
import NotFoundPage from './pages/NotFoundPage';

export default (
  <Route name='app' path='/' handler={App}>
    <Route name='search' path='/etsi-koulua' handler={SearchPage} />
    <Route name='about' path='/tietoa-palvelusta' handler={AboutPage} />
    <Route name='school' path='/koulut/:schoolId' handler={SchoolPage} />
    <Redirect from='/' to='search' />
    <NotFoundRoute handler={NotFoundPage} />
  </Route>
);
