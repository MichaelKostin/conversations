'use strict';

import React from 'react';
import { Route, IndexRoute } from 'react-router';
import HomePage from './containers/HomePage';
import NotFound from './components/NotFound';
import App from './components/App';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={HomePage}/>
        <Route path="*" component={NotFound}/>
    </Route>
);
