'use strict';

import React from 'react';
import {Route, Redirect, NotFoundRoute} from 'react-router';
import App from './App';
import SearchPage from './pages/SearchPage';
import AboutPage from './pages/AboutPage';
import SchoolPage from './pages/SchoolPage';
import NotFoundPage from './pages/NotFoundPage';

export default (
  <Route handler={App} name='app' path='/'>
    <Route handler={SearchPage} name='search' path='/etsi-koulua' />
    <Route handler={AboutPage} name='about' path='/tietoa-palvelusta' />
    <Route handler={SchoolPage} name='school' path='/koulut/:schoolId' />
    <Route handler={SchoolPage} name='school-with-year' path='/koulut/:schoolId/vuosi/:year' />
    <Redirect from='/' to='search' />
    <NotFoundRoute handler={NotFoundPage} />
  </Route>
);
